---
title: Creating a Plugin (2)
description: Creating a Modern PhoneGap Plugin Workshop
layout: page
links:
    Up: index.html
    Previous: creating-1.html
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
    * This method of batching is extremely naive. A better way would be to use `requestAnimationFrame` and execute as many calculations as possible in, say, 10 - 12 milliseconds. I live this as an exercise for you.

