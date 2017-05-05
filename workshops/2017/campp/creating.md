---
title: Creating a Plugin
description: Creating a Modern PhoneGap Plugin Workshop
layout: page
links:
    Up: index.html
    Previous: plugin-x-ray.html
    Continue: creating-2.html
---

So far we've discussed a plugin's metadata and documentation, but there is a lot more to most plugins. In this section, we'll cover how to create a plugin's scaffold using some tools, and also write some JavaScript and native code.

# Our plugin

We're creating what would seem to be a simple plugin with a simple purpose: a plugin to determine if a number is prime, and if it isn't, to return the factors.

> **Note:** This isn't terribly fancy when it comes to visuals or even a lot of native SDK use &mdash; but it does allow us to cover the creation process, and demonstrate some important ideas.

If you're not familiar with the concept of primes, or if it's been awhile since your last mathematics class, here's a quick refresher:

* Prime numbers are divisible only by themselves and one
* Zero and one are not prime numbers ([Why?](http://mathforum.org/library/drmath/view/57036.html))
* Negative numbers are not prime ([-ish](https://primes.utm.edu/notes/faq/negative_primes.html))

Checking if a number is prime requires one to determine if the number can be divided by anything other than itself and one. This is pretty simple for small numbers &mdash; we can do those in our head. But what about large numbers? Unless you want to try every combination by hand, you're going to want a computer.

There are _lots_ of algorithms that can be used to determine if a number is prime, and you can implement them with JavaScript &mdash; no plugins needed. That said, we can calculate faster using native code. If we were only interested in returning `true` or `false`, we could choose a fast algorithm, but this plugin will also return the factors, and so we have to perform a division with each number from two to half our candidate number.

The final code for this plugin is available at <https://github.com/kerrishotts/cordova-plugin-example-isprime>.

# Creating a plugin structure

There are two tools that you can use to create a plugin's directory structure for you. Of course, if you wish, you can also create the structure manually.

[plugman](https://github.com/apache/cordova-plugman) is a node library that manages plugins in your Cordova and PhoneGap projects. `cordova-cli`, `phonegap-cli`, etc., use `plugman` internally.

It can also used to create an initial plugin project:

```sh
$ npm install -g plugman
$ mkdir isprime
$ plugman create --name IsPrime --plugin_id cordova-plugin-example-isprime --plugin_version 0.0.1 --path .
```

Alternatively, you can use PhoneGap's plugin template to create a plugin (see <https://github.com/phonegap/phonegap-plugin-template>):

```sh
$ npm i -g https://github.com/phonegap/phonegap-plugin-template
  # phonegap-plugin-create arguments: path name plugin-id
$ phonegap-plugin-create isprime IsPrime cordova-plugin-example-isprime
? license[MIT] [enter]
```

The template will creates `docs`, `src/android`, `src/ios`, `www`, `plugin.xml`, `package.json`, and `README.md` (as well as some dot files).

You can use whatever tool you like, or you can build your structure from scratch.

# Metadata

We need to build our metadata for our plugin. Oftentimes this will be done in stages, but we'll just show the final result.

## Plugin metadata

Let's go over `plugin.xml` [(complete file)](https://github.com/kerrishotts/cordova-plugin-example-isprime/blob/master/plugin.xml).

* First, we have the typical preamble that you would expect in a plugin -- we define the name, description, links to repositories, etc.

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <plugin xmlns="http://cordova.apache.org/ns/plugins/1.0" id="cordova-plugin-example-isprime" version="0.0.1">
        <name>IsPrime</name>
        <author>Kerri Shotts</author>
        <description>
            Checks if a number is prime, and if not, returns the corresponding factors.
            Used for PhoneGap Day EU 2017 "Creating Modern PhoneGap Plugins" workshop;
            not intended for production use (there are better ways to find primes!)
        </description>
        <license>MIT</license>
        <repo>https://github.com/kerrishotts/cordova-plugin-example-isprime.git</repo>
        <issue>https://github.com/kerrishotts/cordova-plugin-example-isprime/issues</issue>
        <keywords>
        prime, pgday, eu, 2017, example, cordova, phonegap, cordova:ecosystem, phonegap:ecosystem
        </keywords>
    ```

* Next we define the JavaScript module that our consumers will use when interfacing with our plugin.

    ```xml
        <js-module src="www/isPrime.js" name="isPrime">
            <clobbers target="cordova.plugins.kas.isPrime" />
        </js-module>
    ```

    * Our JavaScript code will be located at `www/isPrime.js`
    * The unique name for the module will be `isPrime` (this doesn't really matter unless you include multiple modules and need to reference them using `cordova.require`)
    * Our module will _clobber_ `cordova.plugins.kas.isPrime`. This is where our public JavaScript API will be exposed.
        * There is no official standard for this; some plugins will pollute the global namespace, while others will use `phonegap.plugins` or something else.
        * I do suggest keeping to the `cordova.plugins.*` space unless you are writing a polyfill or writing a plugin that conforms to a standard that uses a different space.
        * I used my initials solely to avoid conflicts with other plugins. This is solely up to you.

* Our plugin will also consist of native code, so we need to specify where those files are, and how they map. Don't worry too much about the mapping process yet &mdash; we'll cover that in a little bit. For now, just pay attention to the source file paths, since this is where we'll need to place our native code.

    ```xml
        <platform name="android">
            <config-file target="res/xml/config.xml" parent="/*">
                <feature name="IsPrime" >
                    <param name="android-package" value="com.kerrishotts.example.isprime.IsPrime"/>
                </feature>
            </config-file>
            <source-file src="src/android/IsPrime.java" target-dir="src/com/kerrishotts/example/isprime" />
        </platform>

        <platform name="ios">
            <config-file target="config.xml" parent="/*">
                <feature name="IsPrime">
                    <param name="ios-package" value="CDVIsPrime"/>
                </feature>
            </config-file>
            <source-file src="src/ios/CDVIsPrime.m" />
        </platform>

        <platform name="browser">
            <js-module src="src/browser/IsPrimeProxy.js" name="IsPrimeProxy">
                <runs />
            </js-module>
        </platform>

        <platform name="windows">
            <js-module src="src/windows/IsPrimeProxy.js" name="IsPrimeProxy">
                <runs />
            </js-module>
            <!-- if using managed code in next section -->
            <framework src="src/windows/IsPrimeRuntimeComponent/IsPrimeRuntimeComponent/bin/Release/IsPrimeRuntimeComponent.winmd" custom="true"/>
        </platform>
    </plugin>
    ```

## npm metadata

Let's go over `package.json` [(complete file)](https://github.com/kerrishotts/cordova-plugin-example-isprime/blob/master/package.json):

* First you have the typical preamble, just like with `plugin.xml`:

    ```json
    {
    "name": "cordova-plugin-example-isprime",
    "description": "Checks if a number is prime, and if not, returns the corresponding factors. Used for PhoneGap Day EU 2017 'Creating Modern PhoneGap Plugins' workshop; not intended for production use (there are better ways to find primes!)",
    "author": "Kerri Shotts",
    "license": "MIT"
    "version": "0.0.1",
    "homepage": "https://github.com/kerrishotts/cordova-plugin-example-isprime",
    "repository": {
        "type": "git",
        "url": "https://github.com/kerrishotts/cordova-plugin-example-isprime.git"
    },
    "bugs": {
        "url": "https://github.com/kerrishotts/cordova-plugin-example-isprime/issues"
    },
    ```

* Next we specify the plugin's ID and what platforms it supports:

    ```json
    "cordova": {
        "id": "cordova-plugin-example-isprime",
        "platforms": [ "browser", "ios", "android", "windows" ]
    },
    ```

* The keywords specified indicate that the plugin is part of the Cordova and PhoneGap ecosystems, and also include other keywords that users might search for.

    ```json
    "keywords": [ "ecosystem:cordova", "ecosystem:phonegap", "cordova",
        "phonegap", "pgday", "eu", "2017", "example", "prime" ],
    ```

* The plugin requires `cordova-cli@6.0.0` or better

    ```json
    "engines": {
        "cordova": ">=6.0.0"
    }
    }
    ```

# Documentation

Like your metadata, chances are good you'll write your documentation in stages, and make considerable revisions. Here, we're just linking to the final version, since it's a bit long.

[Full plugin documentation](https://github.com/kerrishotts/cordova-plugin-example-isprime/blob/master/README.mdn])

# Writing your JavaScript API

JavaScript should be placed within the `www` directory. Typically the name of your file will be a camel-cased variation of the name of your plugin, but this is by convention only.

> **Important:** The path of this file must match with your JavaScript module specified in `plugin.xml`.

The API for our prime plugin is simple -- one function called `isPrime`. The parameters include the candidate number, a success callback, and a failure callback. The success callback will be triggered on a recurring basis to update your code regarding the progress of the calculation. (When using promises, an optional progress callback is used instead). If something happens, the failure callback will be triggered instead.

In our API, we've done the following:

* If available, and called correctly, we will use promises
* Most error checking occurs in our JavaScript API
* Callbacks are wrapped with `setTimeout` just in case a consumer tries to use `alert` (or other blocking code) on iOS.

Let's take a look at our API. I've placed some comments of the form `// [#]` at particular points of interest. The complete JavaScript file is at <https://github.com/kerrishotts/cordova-plugin-example-isprime/blob/master/www/isPrime.js>.

```javascript
var exec = cordova.require("cordova/exec"), // [1]
    SERVICE = "IsPrime"; // [2]

function tick(fn, thisArg) { // [3]
    return function() {
        setTimeout(fn.apply(thisArg, arguments), 0);
    };
}
```

1. `exec` is used to pass a request to the native side of Cordova. You can use `cordova.exec` if you prefer, but this works too.
2. Although not a big deal for this plugin, it's a good idea to define your plugin's service name -- you need to use it in every method your plugin calls `exec`.
3. iOS doesn't appreciate it when calls from the native side into JavaScript block, so we this method, which wraps function calls with `setTimeout`.

```javascript
module.exports = function isPrime(successFn, failureFn, candidate) { // [1]
```

1. To export your methods to your consumer, you need to explicitly export them using `module.exports`. APIs that have more than one method will typically use a dictionary.

```javascript
    if (typeof successFn === "number" && typeof candidate === "undefined") { //[1]
        if (typeof Promise === "undefined") {
            // [2]
            throw new Error("Native promises aren't supported in this environment");
        }
        var progressFn = failureFn;    // [3]
        return new Promise(function (resolve, reject) {
            try {
                isPrime(function(result) {
                    if (typeof progressFn === "function") { // [4]
                        progressFn(result);
                    }
                    if (result.complete) { // [5]
                        resolve(result);
                    }
                }, reject, successFn); // [3]
            } catch (err) {
                reject(err);
            }
        });
    }
```

> **Note:** We're using one level of recursion here &mdash; we're essentially implementing the callback pattern under the hood.

1. If the function's argument types match this pattern, we can assume the user is trying to call us using the `Promise` pattern. If they were using the callback pattern, `successFn` would be a function, and `candidate` would be defined.
2. All modern webviews support promises, but it never hurts to check.
3. Our plugin can return progress results while the calculation is ongoing. We can't complete the promise to do that, so if the user passes a function in the `failureFn` argument, we assume that to be a progress handler. Likewise, later, we pass `successFn` to `isPrime` &mdash; which may not initially make sense, _except_ that arguments would be shifted because of the different call pattern.
4. We don't want the progres handler to be _required_, so make sure it's a function before calling it.
5. We know the calculation is complete when our success callback is called with `result.complete` set to `true`. We can then safely resolve the promise.

```javascript
    if (typeof successFn !== "function") {
        throw new Error("Success callback must be a function");
    }
    if (typeof failureFn !== "function") {
        throw new Error("Failure callback must be a function");
    }
    if (typeof candidate !== "number") {
        throw new Error("Candidate must be a number");
    }
```

I like to check that the provided arguments are of the correct type before calling `exec`. Here we make sure that the callbacks are the correct type (functions), and that the candidate is a number.

> **Note:** This routine doesn't bother to coerce the candidate, but if one wanted to, this is where I would do it.

```javascript
    if (candidate < 2) {
        throw new Error("Candidate must be a positive whole number greater than 1");
    }
    if (candidate > Math.pow(2, 53) - 1) {
        throw new Error("Candidate must be within JavaScript's safe integer limit of 2^53-1");
    }
    if (candidate !== Math.floor(candidate)) {
        throw new Error("Candidate must be an integer");
    }
```

In the above section, we check that the candidate is valid. If it's less than two, not an integer, or outside of JavaScript's integer range, we throw an error.

```javascript
    var result = {
        isPrime: false,
        candidate: candidate,
        factors: [],
        progress: 0,
        complete: false
    };

    exec(tick(successFn), tick(failureFn), SERVICE, "isPrime", [result]);
};
```

At this point we build up a `result` dictionary that will be passed to the native side with `exec`. I did this so there was no need to write a lot of native code to build up the same dictionary.

The signature for `exec` is as follows:

* success callback function
* failure callback function
* plugin service name (the same for all methods supported by the plugin)
* the specific native method we need to call
* arguments to pass to the native method

> **Note:** Notice that the argument we're passing to the native side is enclosed by an array! `exec` is not variadic.

Our JavaScript API is complete. It will work the same on every platform our plugin supports, meaning that users don't have to change the way they call our plugin.

Next up, we need to write some native code.