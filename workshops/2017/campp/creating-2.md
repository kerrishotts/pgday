---
title: Creating a Plugin (2)
description: Creating a Modern PhoneGap Plugin Workshop
layout: page
links:
    Up: index.html
    Previous: creating.html
    Continue: creating-3.html
---

Now we need to write some native code for each platform our plugin supports. Our "prime" plugin supports four platforms: `browser`, `ios`, `android`, and `windows` (not WP8).

Let's start with the `browser` and `windows` platforms, since that code will be the most familiar, since it's all JavaScript.

> **Note:** You _can_ use managed code in Windows plugins, but we've not done so for this project. As such, the Windows plugin won't see a calculation benefit over the browser.

# Browser &amp; Windows Code

The code for the `browser` platform is located at `src/browser/isPrimeProxy.js`. Windows code is located at `src/windows/isPrimeProxy.js`. In our case, the code is identical, but this may not be so for plugins you develop.

> **Note:** There's a good reason these files have a `Proxy` suffix; we'll cover that shortly.

1. First, we need to write some boilerplate code:

    ```javascript
    function isPrime(successFn, failureFn, args) {
        /* our algorithm will go here */
    }

    module.exports = {
        isPrime: isPrime
    };

    require("cordova/exec/proxy").add("IsPrime", module.exports);
    ```

    * Notice that the `isPrime` method takes arguments in the same order as the `exec` call from our public-facing API. The only difference is the missing "service" and "action" arguments.
    * The method is then exported using `module.exports`.
    * And here's the reason why we use `Proxy` as a filename suffix: Cordova proxies requests internally so that our public-facing API stays the same for all platforms. But we have to tell Cordova how to proxy our methods, and that's what the `require` line is doing. Note that "IsPrime" matches the `SERVICE` constant in our public API.

2. Next, we can write our algorithm:

    ```javascript
    function isPrime(successFn, failureFn, args) {
        var result = args[0],
            candidate = result.candidate,
            half = Math.floor(candidate / 2);
        for (var i = 2; i <= halfN; i++) {
            result.progress = ((i + 1) / half) * 100;
            if (candidate % i === 0) {
                result.factors.push(i);
            }
            if (i % 1000) {
                successFn(result, {keepCallback: true});  // post progress
            }
        }
        result.complete = true;
        result.progress = 100;
        result.isPrime = result.factors.length === 0;
        if (!result.isPrime) {
            result.factors.push(candidate); // we can divide by ourselves
            result.factors.unshift(1);      // and by one
        }
        successFn(result);
    }
    ```

    * Arguments to our method are in an array; we have to index it to get the results object that our public API created.
    * We directly call a callback to report success or failure to our plugin's consumer.
        * Progress is reported frequently, but it calls the success callback to report the progress. To work, we need to tell Cordova to keep the callback alive using `{keepCallback: true}`.
        * When the calculation is complete, we don't need to keep the callback alive, so just passing the result is sufficient.

3. You could use this plugin now, but there's a glaring problem: while the calculation is underway, the browser freezes. This is far from what we want. Let's address that by batching up our calculation and using `setTimeout`:

    ```javascript
    function isPrimeBatch(result, startAt, batchSize, endAt) {
        var stopAt = Math.min(startAt + batchSize - 1, endAt),
            candidate = result.candidate;
        if (candidate === 2) {
            return;
        }
        for (var i = startAt; i <= stopAt; i++) {
            if ((candidate % i) === 0) {
                result.factors.push(i);
            }
        }
        result.progress = ((i + 1) / endAt) * 100;
        return i + 1;
    }

    function isPrime(successFn, failureFn, args) {
        var result = args[0],
            candidate = result.candidate,
            half = Math.floor(candidate / 2),
            batchSize = 10000,
            cur = 2;

        setTimeout(function runBatch() {
            cur = isPrimeBatch(result, cur, batchSize, half);
            if (!cur || cur > half) {
                result.complete = true;
                result.progress = 100;
                result.isPrime = result.factors.length === 0;
                if (!result.isPrime) {
                    result.factors.push(candidate); // we can divide by ourselves
                    result.factors.unshift(1);      // and by one
                }
                successFn(result);
            } else {
                successFn(result, {keepCallback: true});  // post progress
                setTimeout(runBatch, 0);
            }
        }, 0);
    }
    ```

    * This method is a _lot_ slower, but the browser remains responsive during the calculation.
    * As a benefit, our progress reporting works correctly too (the prior code would never have actually issued visible progress reports).
    * This method of batching is extremely naive. A better way would be to use `requestAnimationFrame` and execute as many calculations as possible in, say, 10 - 12 milliseconds. I leave this as an exercise for you.

# iOS Native Code

Now we may be getting into some unfamiliar territory &mdash; especially if you aren't familiar with Objective-C. Our file will be in `src/ios/CDVIsPrime.m`.

> **Tip:** It is the iOS convention to use three-letter prefixes when using Objective-C. `CDV` here stands for "Cordova".

> **Note:** You can also write plugins using Swift, but as I'm more comfortable with Objective-C, that's what I used.

1. Let's get the preamble out of the way:

    ```objc
    #import <Cordova/CDV.h>

    @interface CDVIsPrime : CDVPlugin
    @end

    @implementation CDVIsPrime
    - (void)isPrime:(CDVInvokedUrlCommand*)command
    {
    }
    @end
    ```

    * We're defining both the interface and the implementation in a single file. You'll often see this split out into two files: a header file (`.h`) and a module file (`.m`). (Note: Swift doesn't have this kind of distinction.)
    * Our plugin's class is called `CDVIsPrime`, and it extends `CDVPlugin` (provided by Cordova).
    * Our methods are inside the @implementation, and named to match the "action" we use in our consumer API.

2. Next, we're going to avoid the issue we had with our browser version and we're going to do the calculation in background mode from the beginning. This is really easy to do:

    ```objc
    - (void)isPrime:(CDVInvokedUrlCommand*)command
    {
        [self.commandDelegate runInBackground:^{
            /* our algorithm goes here */
        }];
    }
    ```
3. We're going to need to extract our incoming result object, and set up some local variables:

    ```objc
        NSMutableDictionary* result = [[command argumentAtIndex: 0] mutableCopy];
        NSMutableArray* factors = result[@"factors"];
        int64_t candidate = [result[@"candidate"] longLongValue];
        int64_t half = candidate / 2;
        NSTimeInterval now = [[NSDate date] timeIntervalSince1970];
        NSTimeInterval cur = now;
    ```

    * The `command` passed to us contains all the arguments provided to our consumer API. We extract these by calling `argumentAtIndex`.
    * JSON objects are passed as `NSDictionary` objects, but these are immutable by default. We need it to be mutable, so we call `mutableCopy` and store the result in an `NSMutableDictionary`.
    * The syntax `@"key"` is a peculiar quirk of Objective-C. It's an `NSString` literal.
    * We need an integer type that will support JavaScript's integers &mdash; `int64_t` fits that bill. `longLongValue` is used to retrieve the candidate from the JSON object.
    * The `NSTimeInterval` variables are so we can track how long it has been since we last reported our calculation's progress.

4.  Now we can focus on our algorithm:

    ```objc
        if (candidate == 2) { // [1]
            result[@"progress"] = @(100); // [5]
            result[@"complete"] = @(YES); // [5]
            result[@"isPrime"] = @(YES);
        } else {
            for (int64_t i = 2; i<=half; i++) {
                result[@"progress"] = @(((double)i / (double)half)*100);
                if ((candidate % i) == 0) {
                    [factors addObject:@(i)];
                }
                if (i % 1000 == 0) {
                    cur = [[NSDate date] timeIntervalSince1970];
                    if (cur - now > 1) { // [6]
                        now = cur;
                        // [2]
                        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:result];
                        // [3]
                        [pluginResult setKeepCallbackAsBool:YES];
                        // [4]
                        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                    }
                }
            }
            result[@"progress"] = @(100);
            result[@"complete"] = @(YES);
            if (factors.count == 0) {
                result[@"isPrime"] = @(YES);
            } else {
                [factors insertObject:@(1) atIndex:0];
                [factors addObject:@(candidate)];
            }
        }
        // [2]
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:result];
        // [4]
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    ```

    1. First, if the candidate is `2`, we just bail and say, yes, it's prime. Otherwise the logic is identical to the browser and Windows version.
    2. We can prepare a result by calling `[CDVPluginResult resultWithStatus: messageAsDictionary:]` (there are overloads for other types if you need them).
        * The status indicates if the success or failure callback will be called. `CDVCommandStatus_ERROR` will trigger the failure callback instead.
        * For more info, [see the documentation](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/plugin.html#ios-cdvpluginresult-message-types).
    3. Like the browser version, we have to tell Cordova to keep the callback alive if we're not done with it yet.
    4. We pass the result back by calling `sendPluginResult: callbackId:`.
    5. Confused by the `@()`? It's shorthand for boxing a primitive into an object &mdash; `NSDictionary` requires its contents to be objects. And yes, the booleans are strange ("YES" means true, and "NO" means false).
    6. We report progress roughly every second; reporting too often slows our progress (and can make it worse than the browser version!)


