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

TODO.