---
title: Testing Your Plugin
description: Creating a Modern PhoneGap Plugin Workshop
layout: page
links:
    Up: index.html
    Previous: bridges.html
    Continue: debugging-and-iterating.html
---

It's incredibly important to verify that your plugin works correctly, not just for your own piece of mind and future maintainability, but also so your consumer can have some trust that your plugin does what it claims to do.

Thankfully, writing and executing tests isn't too difficult. In fact, the tooling for testing our plugins came from the need to test Cordova's own plugins. `cordova-medic` is a test tool designed to run all the core Cordova plugin tests for continuous integration. Many of these pieces of `cordova-medic` are reusable, so Jesse spun them into another purpose-based tool named [cordova-paramedic](https://github.com/apache/cordova-paramedic).

# cordova-paramedic

> Paramedic &bullet; _noun_ provides advanced levels of care at the point of illness or injury, including out-of-hospital treatment, and diagnostic services

Once you have tests written and placed in your plugin's `tests/` directory, cordova-paramedic` does the following for you:
* Creates a new project (in temporary location)
* Adds the requested platform (`ios`, `android`, `windows`, etc.)
* Installs the `cordova-plugin-test-framework` plugin
* Installs your plugin (in `.`) (current working directory)
* Installs your plugin's tests (in `./tests`)
* Sets the temporary project's start page to `cordova-plugin-test-framework`'s test runner
* Creates a local server to listen for results
* Exits with success/fail based on results

All of this makes testing your plugins really simple. Before we go any further, though, let's install it.

```sh
$ npm install cordova-paramedic
```

In order to use this, though, we need to add some scripts to our `package.json` file. They look like this:

```json
  "scripts": {
    "test:android": "cordova-paramedic --cleanUpAfterRun --verbose --platform android --plugin .",
    "test:browser": "cordova-paramedic --cleanUpAfterRun --verbose --platform browser --plugin .",
    "test:ios": "cordova-paramedic --cleanUpAfterRun --verbose --platform ios --plugin .",
    "test:windows": "cordova-paramedic --cleanUpAfterRun --verbose --platform windows --plugin ."
  }
```

With this in place, we can test a plugin just by executing `npm run test:ios` (or whichever platform you need to test with).

> **Note**: In order to test, you'll to have the SDKs properly installed.

# How to write tests

The easiest way is probably to copy a core plugin's tests. The structure is already present, and you know the tests work. You can then adapt things as necessary.

If you want to write your own from scratch, you need to do the following:

* Create a `tests` folder in your plugin's repository
* Add a `plugin.xml` file (doesn't need to be complex) [eg](https://github.com/apache/cordova-plugin-statusbar/blob/95eb824d0ac37b542ffc2dad38d00c11dd1f660b/tests/plugin.xml)

    ```xml
    <plugin xmlns="http://apache.org/cordova/ns/plugins/1.0" xmlns:android="http://schemas.android.com/apk/res/android"
    id="cordova-plugin-example-isprime-tests" version="0.0.1">
        <name>Cordova Is Prime Plugin Tests</name>
        <license>Apache 2.0</license>
        <js-module src="tests.js" name="tests"></js-module>
    </plugin>
    ```
* Add your tests in `tests/tests.js`.

There are two types of tests that you should be familiar with: _automatic_ and _manual_ tests.

## Automatic tests

Automatic tests run automatically when the temporary project is launched. Your automatic tests should be exported as follows:

```javascript
exports.defineAutoTests = function () {
    /* your tests */
}
```

Here's a snippet from our prime plugin's test script ([full version](https://github.com/kerrishotts/cordova-plugin-example-isprime/blob/master/tests/tests.js)):

```javascript
exports.defineAutoTests = function () {
    describe("IsPrime (cordova.plugins.kas.isPrime)", function () {
        it("should exist", function () {
            expect(cordova.plugins.kas.isPrime).toBeDefined();
        });
        it("should be a function", function () {
            expect(typeof cordova.plugins.kas.isPrime === "function").toBe(true);
        });
        it("should throw with no arguments", function() {
            expect(function() {
                cordova.plugins.kas.isPrime();
            }).toThrowError("Success callback must be a function");
        });
        it("should throw if callbacks aren't functions", function() {
            expect(function() {
                cordova.plugins.kas.isPrime(undefined, function() {}, 23);
            }).toThrowError("Success callback must be a function");
            expect(function() {
                cordova.plugins.kas.isPrime(function() {}, undefined, 23);
            }).toThrowError("Failure callback must be a function");
        });
        it("should throw if candidate isn't a number", function() {
            expect(function() {
                cordova.plugins.kas.isPrime(function() {}, function() {}, "23");
            }).toThrowError("Candidate must be a number");
        });
        it("should return a Promise if given one argument that is a number", function() {
            expect(cordova.plugins.kas.isPrime(23) instanceof Promise).toBe(true);
        });
        /* ... more tests in this category ... */
    });
    /* ... more tests ... */
};
```

## Manual tests

Manual tests are excellent for tests that require user interaction or tests that are hard to write verification routines for. These are controlled by a simple user interface in the temporary project. You can then tap on tests, have them run, and verify that they did what you want.

Manual tests are exported on `exports.defineManualTests`. Here's a simple example from our prime plugin's test script:

```javascript
exports.defineManualTests = function (contentEl, createActionButton) {
    var actionsDiv = [
        "<h2>Actions</h2>",
        "<p>Click a button to run a test</p>",
        "<div id='simple'></div>"
    ].join("");
    function renderActions() {
        contentEl.innerHTML = actionsDiv;
    }
    // We need to wrap this code due to Windows security restrictions
    // see http://msdn.microsoft.com/en-us/library/windows/apps/hh465380.aspx#differences for details
    if (window.MSApp && window.MSApp.execUnsafeLocalFunction) {
        MSApp.execUnsafeLocalFunction(renderActions);
    } else {
        renderActions();
    }
    createActionButton("Is 49 Prime?", function () {
        cordova.plugins.kas.isPrime(49)
            .then(function (result) {
                alert(result.isPrime);
            }).catch(function (err) {
                alert("Error: " + err.message);
            });
    }, "simple");
};
```

# Testing Tips

It's a good idea to automate as much as you possibly can; this will make it much easier to verify your plugin's correctness as you add more functionality or fix bugs later on. If you can't, then use a manual test, but try and think if there's a way to automate it.

As with any Jasmine test, be sure to call `done()` when you're using callbacks or promises. Here's an example:

```javascript
it("Checking " + key + (typeof expectedResult === "string" ? " has factors " + expectedResult : " is a prime"), function (done) {
    try {
        cordova.plugins.kas.isPrime(function win(result) {
            if (result.complete) {
                if (typeof expectedResult === "string") {
                    expect(result.isPrime).toBe(false);
                    expect(result.factors.join(", ")).toBe(expectedResult);
                } else {
                    expect(result.isPrime).toBe(expectedResult);
                }
                done();
            }
        }, function fail(err) {
            expect("this should never happen").toBe("but it did:" + JSON.stringify(err));
            done();
        }, Number(key));
    } catch (err) {
        expect("this is embarrasing").toBe(err.message);
        done();
    }
}, 120000);
```

The above example also demonstrates two more useful tips:

* If you have a test that will run for some time, pass in a longer timeout as the last parameter to `it()`. Otherwise your tests will fail due to timeouts.
* If you have a lot of similar tests, they can be built programmatically. For example, the following code uses the above example to generate many similar tests:
    ```javascript
    function runChecks(tests) {
        Object.keys(tests).forEach(function (key) {
            var expectedResult = tests[key];
            it("Checking " + key + (typeof expectedResult === "string" ? " has factors " + expectedResult : " is a prime"), function (done) {
                try {
                    cordova.plugins.kas.isPrime(function win(result) {
                        if (result.complete) {
                            if (typeof expectedResult === "string") {
                                expect(result.isPrime).toBe(false);
                                expect(result.factors.join(", ")).toBe(expectedResult);
                            } else {
                                expect(result.isPrime).toBe(expectedResult);
                            }
                            done();
                        }
                    }, function fail(err) {
                        expect("this should never happen").toBe("but it did:" + JSON.stringify(err));
                        done();
                    }, Number(key));
                } catch (err) {
                    expect("this is embarrasing").toBe(err.message);
                    done();
                }
            }, 120000);
        });
    }

    /* ... */

    describe("Quick Tests", function () {
        var tests = {
            2: true,
            3: true,
            4: "1, 2, 4",
            5: true,
            6: "1, 2, 3, 6",
            7: true,
            8: "1, 2, 4, 8",
            9: "1, 3, 9",
            10: "1, 2, 5, 10",
            11: true,
            12: "1, 2, 3, 4, 6, 12",
            13: true,
            14: "1, 2, 7, 14",
            15: "1, 3, 5, 15",
            49: "1, 7, 49",
        };
        runChecks(tests);
    });
    ```