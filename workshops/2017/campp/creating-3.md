---
title: Creating a Plugin (3)
description: Creating a Modern PhoneGap Plugin Workshop
layout: page
links:
    Up: index.html
    Previous: creating-2.html
    Continue: creating-4.html
---

Now that we've written some native code, it's a good idea to cover some of the things that make our plugin even better.

# iOS

Our plugin runs in a background thread, but if the Cordova webview navigates to another page, the plugin will still be busy calculating a result that can never be returned. Or, if the user backgrounds the app, it'd be a good idea to immediately stop the calculation, and then resume it when the user comes back to our app, right?

To accomplish this, we need to do several things: we need to listen to the `pause` and `resume` events, and also intercept `onReset` when the webview navigates. But to actually make the calculation something we can stop and resume at will, we need to make our plugin use `NSOperation`.

1. First, let's define the `NSOperation`. We're using the same file (`CDVIsPrime.m`) for simplicity, but typically you'd break this out into its own files.

    ```objc
    typedef void (^KASResultCallback)(NSDictionary*);   // [1]

    @interface KASIsPrimeOperation : NSOperation    // [2]
    @property BOOL isPaused;
    @end

    @implementation KASIsPrimeOperation
    NSMutableDictionary* _result;   // [3]
    KASResultCallback _progress;
    KASResultCallback _completion;
    @synthesize isPaused;

    // [4]
    - (id) initWithDictionary:(NSMutableDictionary *) dict progress:(KASResultCallback)progress completion:(KASResultCallback)completion {
        self = [super init];
        if (self) {
            _result = dict;
            _progress = progress;
            _completion = completion;
            isPaused = false;

            self.queuePriority = NSOperationQueuePriorityLow;
            self.qualityOfService = NSOperationQualityOfServiceUserInitiated;
        }
        return self;

    }

    // [5]
    - (id) initWithCommand:(CDVInvokedUrlCommand*) command progress:(KASResultCallback)progress completion:(KASResultCallback)completion
    {
        NSMutableDictionary* result = [[command argumentAtIndex: 0] mutableCopy];
        return [self initWithDictionary:result progress:progress completion:completion];
    }

    // [6]
    - (KASIsPrimeOperation *)createNewOperation {
        return [[KASIsPrimeOperation alloc] initWithDictionary:_result progress:_progress completion:_completion];
    }

    // [7]
    - (void) main {
        NSMutableDictionary *result = _result;
        NSMutableArray* factors = result[@"factors"];
        int64_t candidate = [result[@"candidate"] longLongValue];
        int64_t half = candidate / 2;
        NSTimeInterval now = [[NSDate date] timeIntervalSince1970];
        NSTimeInterval cur = now;

        if (self.isCancelled) { // [8]
            return;
        }

        if (candidate == 2) {
            result[@"progress"] = @(100);
            result[@"complete"] = @(YES);
            result[@"isPrime"] = @(YES);
        } else {
            uint64_t startAt = 2;
            if (result[@"cur"] != nil) {
                startAt = [result[@"cur"] longLongValue];
            }
            for (int64_t i = startAt; i<=half; i++) {
                if ((candidate % i) == 0) {
                    // [9]
                    if ([factors indexOfObjectPassingTest:^BOOL(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
                        return [obj longLongValue] == i;
                    }] == NSNotFound) {
                        [factors addObject:@(i)];
                    }
                }
                if (i % 10000 == 0) {
                    if (self.isCancelled) { // [8]
                        result[@"cur"] = @(i);
                        break;
                    }
                    cur = [[NSDate date] timeIntervalSince1970];
                    if (cur - now > 1) {
                        now = cur;
                        result[@"progress"] = @(((double)i / (double)half)*100);
                        _progress(result); // [10]
                    }
                }
            }
            if (!self.isCancelled) {
                result[@"progress"] = @(100);
                result[@"complete"] = @(YES);
                if (factors.count == 0) {
                    // no factors, so we're prime
                    result[@"isPrime"] = @(YES);
                } else {
                    // we are divisible by ourselves and 1
                    [factors insertObject:@(1) atIndex:0];
                    [factors addObject:@(candidate)];
                }
            }
        }

        if (!self.isCancelled) { // [11]
            _completion(result);
        }

    }
    @end
    ```

    1. This funny looking type definition is just so we can easily refer to blocks taking an `NSDictionary` as an argument without typing all of this out every time we need it.
    2. We extend `NSOperation` with our class, `KASIsPrimeOperation`. (Note: I'm using _my_ initials now, since this a separate class.)
    3. We'll need to keep some internal state, including the result object and progress and success blocks.
    4. Initialize our instance with the dictionary and callbacks. We also set some quality of service options.
    5. This is a convenience method that extracts the result object out of the plugin command.
    6. Once cancelled, `NSOperations` can't be resumed, so if we're pausing our calculation in order to resume it later, we need a way to create a new operation from our current one.
    7. This should look mostly familiar &mdash; it's largely the same algorithm as our prior version.
    8. We check in a couple of locations whether or not we've been cancelled (otherwise, the operation would run to completion).
    9. A quirk of our implementation: if we're resumed, we may not be exactly on the same number we were when we paused (because we infer it from the last reported progress). Duplicates are unlikely, but just in case, we check anyway.
    10. We call our stored `_progress` block when we need to report. The callback will be defined later, and will handle the actual communication with the plugin.
    11. When done, we can call our `_completion` block when done, but we shouldn't do it if we've been cancelled.

2. To use the new operation we need to build an `NSOperationQueue` and manage it. We'll need to modify our existing `CDVIsPrime` class quite a bit.

    ```objc
    @implementation CDVIsPrime
    NSOperationQueue* _opq;

    - (void) _initOperationQueue
    {
        _opq = [[NSOperationQueue alloc] init];
        _opq.name = @"QPrime";
        _opq.maxConcurrentOperationCount = 1;
        _opq.qualityOfService = NSQualityOfServiceUserInitiated;
    }

    - (void) _stopQueue
    {
        [_opq cancelAllOperations];
    }

    - (void) dispose
    {
        [self _stopQueue];
        _opq = nil;
    }

    - (void) onReset
    {
        [self _stopQueue];
        [self _initOperationQueue];
    }

    - (void)pluginInitialize
    {
        [self _initOperationQueue];
    }
    ```

    * We create a private variable to manage our operation queue.
    * Then we create two methods to manage it. `initOperationsQueue` does as the name will suggest: it will create the queue, give it a name, and assign some quality of service levels.
    * `_stopQueue`, on the other hand, cancels any running operations.
    * `dispose` and `onReset` are added in order to stop the queue when either action occurs. Because `onReset` means that the webview navigation has changed, we create a new operation queue so that we're ready in case we're called again.
    * Finally, `pluginInitialize` is called when our plugin starts up for the first time, and it creates our operation queue.

3. So far we've handled the reset case, but now we need to handle `pause` and resume`:

    ```objc
    - (void)pluginInitialize
    {
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onPause) name:UIApplicationDidEnterBackgroundNotification object:nil];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onResume) name:UIApplicationWillEnterForegroundNotification object:nil];
        [self _initOperationQueue];
    }

    - (void) onPause
    {
        _opq.suspended = YES;
        if (_opq.operations.count > 0) {
            for (KASIsPrimeOperation* op in _opq.operations) {
                KASIsPrimeOperation* newOp = [op createNewOperation];
                [op cancel];
                [_opq addOperation:newOp];              // so this will pick back up where we left off when resumed
            }
        }
    }

    - (void) onResume
    {
        _opq.suspended = NO;
    }
    ```

    * We've expanded `pluginInitialize` &mdash; in order to respond to `pause` and `resume`, we have to listen for certain notifications.
    * In `onPause` we suspend the queue, and if any operations are in progress, we recreate them from their last reported state and add them back to the operation queue. Because the queue is suspended, those operations won't actually begin.
    * In `onResume` we resume the queue, which will automatically start any pending operations.

4. But we've not actually done anything to trigger an operation. So let's take care of that:

    ```objc
    - (void)isPrime:(CDVInvokedUrlCommand*)command
    {
        KASIsPrimeOperation* op = [[KASIsPrimeOperation alloc] initWithCommand:command progress:^(NSDictionary* result) {
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:result];
            [pluginResult setKeepCallbackAsBool:YES];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        } completion:^(NSDictionary* result) {
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:result];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }];

        [_opq addOperation:op];
    }
    ```

    * This looks a bit painful, but it's not really that scary. Objective-C and the iOS SDK are just really verbose.
    * First, we create an operation. We pass the incoming arguments (in `command`), and also pass two blocks that will handle progress and completion reporting. These are just functions, and they're serving the same purpose as if you were passing functions around in JavaScript.
    * Once we have the operation, we add it to our operation queue. The calculation will begin on its own.

# Android

Like the iOS plugin, our Android plugin runs in a background thread currently. If the user switches to another app, our plugin may continue to run in the background, usurping valuable battery power. It would be nice if we responded to `pause` and `resume` events appropriately in order to avoid this. Or, if the app navigates to a new top-level page, we should also stop processing, since the callback would now be invalid.

To do this we need to create a custom `ThreadPoolExecutor` so that we can inspect currently executing tasks and pause and resume them as needed. We also need a custom `Runnable` that makes it easy for us to copy a task's current state and create a new `Runnable` that starts where the old one left off.

Unlike the iOS example where we could get by using a single file, Java requires that we use three. So let's get started!

## InspectableThreadPoolExecutor

We need a thread pool that lets us inspect the currently running tasks, not just the pending tasks. To do this, we can extend `ThreadPoolExecutor` as follows:

```java
// InspectableThreadPoolExecutor.java
package com.kerrishotts.example.isprime;

import java.util.ArrayList;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

class InspectableThreadPoolExecutor extends ThreadPoolExecutor {

    private ArrayList<Runnable> _tasks;

    public InspectableThreadPoolExecutor(int corePoolSize, int maximumPoolSize, int keepAliveTime,
                                         TimeUnit unit, BlockingQueue<Runnable> workQueue) {
        super(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue);
        _tasks = new ArrayList<Runnable>(maximumPoolSize);
    }

    public ArrayList<Runnable> getAllTasks() {
        ArrayList<Runnable> arr = new ArrayList<Runnable>(_tasks.size() + getQueue().size());
        arr.addAll(_tasks);
        arr.addAll(getQueue());
        return arr;
    }

    @Override
    protected void beforeExecute(Thread t, Runnable r) {
        super.beforeExecute(t, r);
        _tasks.add(r);
    }

    @Override
    protected void afterExecute(Runnable r, Throwable t) {
        super.afterExecute(r, t);
        _tasks.remove(r);
    }
}
```

All this does is create an array of `Runnable` tasks. Before a task starts executing, it is added to the list. When it finishes executing, it is removed.

A new method is added, `getAllTasks` that returns all currently executing and pending tasks as a list of `Runnable` tasks. This lets us recreate the state of the pool should we shut it down on a `pause` event.

## IsPrimeRunnable

Next we need to extract the `IsPrime` method from `IsPrime.java` into another file, called `IsPrimeRunnable.java`. This new class will implement `Runnable`. Let's take a look:

```java
package com.kerrishotts.example.isprime;

import java.util.GregorianCalendar;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class IsPrimeRunnable implements Runnable {

    // [1]
    private final JSONObject _result;
    private final CallbackContext _context;
    private volatile long _lastCandidateFactor = 0;

    // [2]
    public IsPrimeRunnable(final JSONObject result, final CallbackContext callbackContext) {
        _result = result;
        _context = callbackContext;
        _lastCandidateFactor = 2; // this is where we start checking -- not one or zero.
    }

    // [3]
    private IsPrimeRunnable(final JSONObject result, final CallbackContext callbackContext, long lastCandidateFactor) {
        _result = result;
        _context = callbackContext;
        _lastCandidateFactor = lastCandidateFactor; // start from last checked candidate
    }

    // [4]
    public IsPrimeRunnable copy() {
        return new IsPrimeRunnable(_result, _context, _lastCandidateFactor);
    }

    // [5]
    public void run() {
        try {
            JSONArray factors = _result.getJSONArray("factors");
            long candidate = _result.getLong("candidate");
            long half = candidate / 2;
            long now = (new GregorianCalendar()).getTimeInMillis();
            long cur = now;

            // [6]
            long start = _lastCandidateFactor;

            if (candidate == 2) {
                /* snip */
            } else {
                if (start <= 2) { // [6]
                    factors.put(1);
                }
                for (long i = start; i<=half; i++) { // [6]
                    if (i % 1000 == 0) {
                        /* snip */

                        // check if we've been interrupted, [7]
                        if (Thread.currentThread().isInterrupted()) {
                            throw new InterruptedException();
                        }
                    }
                    /* snip */

                    // [8]
                    _lastCandidateFactor = i;
                }
                /* snip */
            }
            /* snip */
        } catch (JSONException e) {
            /* snip */
        } catch (InterruptedException e) {
            // do nothing; we'll get taken care of later, [7]
        }
    }
}
```

1. Instances of this new class need to keep the result object and the callback handy. Instances also need a way of keeping track of the last tried candidate factor.
2. This is the normal way we'll construct an instance, which means the last candidate factor tried will be set to 2. We can't set this to zero, or we'll end up dividing by zero later.
3. Should the task need to be restarted, we can pass in a last tried candidate factor, and the process will continue from there.
4. When restarted, we copy the state from the previous running and queued tasks and create new instances in a new pool.
5. This function doesn't change very much. The only things that change are #6, #7, and #8. The logic, however, remains the same.
6. We need to be able to start at an arbitrary number -- the last tried candidate factor. This will normally be 2, except if we've been restarted.
7. Operations in progress won't stop automatically &mdash; we have to check to see if we should stop. That's what we do when we check `Thread.currentThread().isInterrupted()`. If we should stop, we throw an exception which stops the calculation.
8. We have to be sure to record how far along in the calculation we've progressed.

## Changes to IsPrime.java

Now we need to change `IsPrime.java` to respond to our new events and properly use our new thread pool. Here's the new code:

```java
// IsPrime.java
package com.kerrishotts.example.isprime;

import java.util.ArrayList;
import java.util.concurrent.BlockingQueue;
import java.util.List;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.SuppressLint;

public class IsPrime extends CordovaPlugin {

    // [1]
    public static final int START_THREADS = 0;
    public static final int MAX_THREADS = 8;
    public static final int KEEP_ALIVE = 1000;

    // [2]
    private InspectableThreadPoolExecutor _pool;
    private BlockingQueue<Runnable> _q;
    private ArrayList<Runnable> _pausedTasks;

    // [3]
    private void _initPool() {
        _q = new ArrayBlockingQueue<Runnable>(MAX_THREADS);
        _pool = new InspectableThreadPoolExecutor(START_THREADS, MAX_THREADS, KEEP_ALIVE, TimeUnit.MILLISECONDS, _q);
    }

    // [4]
    private void _destroyPool() {
        if (_pool != null) {
            _pool.shutdownNow();
        }
    }

    // [5]
    private void _pausePool() {
        _pausedTasks = new ArrayList<Runnable>(MAX_THREADS);
        _pausedTasks.addAll(_pool.getAllTasks());
        _pool.shutdownNow();
    }

    // [6]
    private void _restartPool() {
        _initPool();
        Runnable[] arr = _pausedTasks.toArray(new Runnable[0]);
        for (int i = 0; i < arr.length; i++) {
            _pool.execute(((IsPrimeRunnable)arr[i]).copy());
        }

        _pausedTasks = null;
    }

    // [7]
    @Override
    public void initialize(org.apache.cordova.CordovaInterface cordova, org.apache.cordova.CordovaWebView webView) {
        super.initialize(cordova, webView);
        _initPool();
    }

    // [8]
    @Override
    public void onDestroy() {
        _destroyPool();
    }

    // [9]
    public void onReset() {
        _destroyPool();
        _initPool();
    }

    // [10]
    @Override
    public void onPause(boolean multitasking) {
        _pausePool();
    }

    // [11]
    @Override
    public void onResume(boolean multitasking) {
        _restartPool();
    }

    @Override
    public boolean execute(String action, final JSONArray args, final CallbackContext callbackContext) throws JSONException {
        /* snip */
    }

    // [12]
    private void isPrime(final JSONObject result, final CallbackContext callbackContext) throws JSONException {
        _pool.execute(new IsPrimeRunnable(result, callbackContext));
    }
}
```

1. No magic numbers! So constants instead. ;-) We need to indicate the minimum number of threads, the maximum number of threads, and how long we're willing to keep an idle thread alive. The latter is in milliseconds.
2. Next, we need an instance of our `InspectableThreadPoolExecutor`, a work queue for it, and also an array ready to hold any paused tasks.
3. `_initPool` creates the new work queue and a new instance of `InspectableThreadPoolExecutor`, using our constants defined in #1.
4. `_destroyPool` will shut down any running tasks.
5. `_pausePool` gets a list of all running and pending tasks from our thread pool, stores them, and then shuts the pool down. Running tasks will eventually stop when they next check if they've been interrupted.
6. `_resumePool` takes the list of all paused tasks, copies them to a new `IsPrimeRunnable` instance, and then adds them to a new thread pool. This effectively resumes the tasks.
7. `initialize` is called when the plugin is initialized by Cordova. We call `_initPool` here so we have an initial thread pool to work with.
8. `onDestroy` is called when everything is shutting down, which makes this a good place to destroy the pool.
9. `onReset` is called when Cordova navigates to a new top-level page. As such, we need to stop existing tasks and also create a new pool.
10. When `pause` is received, we need to pause the pool.
11. When `resume` is received, we call `_restartPool` to resume the pool.
12. We create a new `IsPrimeRunnable` instance and tell the pool to start executing it.

## plugin.xml changes

We're mostly done, but we need to add a couple of lines to the `<plugin name="android"` tag in `plugin.xml`:

```xml
<source-file src="src/android/InspectableThreadPoolExecutor.java" target-dir="src/com/kerrishotts/example/isprime" />
<source-file src="src/android/IsPrimeRunnable.java" target-dir="src/com/kerrishotts/example/isprime" />
```

<em>Et voil&agrave;</em>! we've created a pausable plugin!