---
title: Plugin Tips
description: Creating a Modern PhoneGap Plugin Workshop
layout: page
links:
    Up: index.html
    Previous: hooks.html
    Continue: homework.html
---

So, we're close to the end &mdash; how about a few sage words of advice?

# JavaScript API

* Promisify your API
* Pre-process arguments in JavaScript
    * convert to appropriate types
    * throw type-mismatch errors, etc.
* Transpile ES2015+ to ES5 (not all targets support ES2015 natively, and ES is continuing to evolve yearly, anyway)
* Stick to the `cordova.plugins` namespace
    * Unless creating a polyfill; **window** is crowded!
* Return useful error messages to error callbacks

# Native

* Return useful error information
* Use background threads for processing
  * [iOS documentation](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/plugin.html#threading)
  * [Android documentation](https://cordova.apache.org/docs/en/latest/guide/platforms/android/plugin.html#threading)
* Avoid init at app startup unless necessary
    ```xml
    <param name="onload" value="false" /> <!-- false is the default -->
    ```

# Android

* Override `pluginInitialize` for plugin initialization logic [(code)](https://github.com/apache/cordova-android/blob/master/framework/src/org/apache/cordova/CordovaPlugin.java#L72)
* Runtime Permission Requests (Marshmallow) [(docs)](https://cordova.apache.org/docs/en/latest/guide/platforms/android/plugin.html#runtime-permissions-cordova-android-500)
  * `cordova.requestPermission()` [(code)](https://github.com/apache/cordova-android/blob/master/framework/src/org/apache/cordova/CordovaPlugin.java#L397)
  * `cordova.hasPermission()` [(code)](https://github.com/apache/cordova-android/blob/master/framework/src/org/apache/cordova/CordovaPlugin.java#L407)
  * Override `onRequestPermissionResult` [(code)](https://github.com/apache/cordova-android/blob/master/framework/src/org/apache/cordova/CordovaPlugin.java#L418)
* Don't forget Android activity lifecycle [(docs)](https://cordova.apache.org/docs/en/latest/guide/platforms/android/plugin.html#launching-other-activities) [(code)](https://github.com/apache/cordova-android/blob/master/framework/src/org/apache/cordova/CordovaPlugin.java#L143)

# iOS

* Use `pluginInitialize` for plugin initialization logic [(eg)](https://github.com/apache/cordova-plugin-statusbar/blob/master/src/ios/CDVStatusBar.m#L107) [(code)](https://github.com/apache/cordova-ios/blob/636113f047ee2c7dae742dff2beafae2121ceb62/CordovaLib/Classes/Public/CDVPlugin.m#L83)
* If memory is getting low, `onMemoryWarning` is called [(code)](https://github.com/apache/cordova-ios/blob/636113f047ee2c7dae742dff2beafae2121ceb62/CordovaLib/Classes/Public/CDVPlugin.m#L149)
* If app is going to be terminated, `onAppTerminate` is called [(code)](https://github.com/apache/cordova-ios/blob/636113f047ee2c7dae742dff2beafae2121ceb62/CordovaLib/Classes/Public/CDVPlugin.m#L144)
* You can respond to `pause`, `resume`, etc. [(code)](https://github.com/apache/cordova-ios/blob/636113f047ee2c7dae742dff2beafae2121ceb62/CordovaLib/Classes/Public/CDVPlugin.m#L123), but you have to register for notifications in `pluginInitialize`
* If you need to handle URLs, override `handleOpenURL` [(code)](https://github.com/apache/cordova-ios/blob/636113f047ee2c7dae742dff2beafae2121ceb62/CordovaLib/Classes/Public/CDVPlugin.m#L130)
* Never, _ever_ call JavaScript that triggers blocking UI (e.g. `alert`)


# Miscellaneous

* Don't forget the `browser` platform!
    * Useful when testing on the desktop
    * Mock results if no equivalent browser support
