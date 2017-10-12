---
title: Debugging and Iterating
description: Creating a Modern PhoneGap Plugin Workshop
layout: page
links:
    Up: index.html
    Previous: testing.html
    Continue: publishing.html
---

Chances are pretty good you'll need to debug your plugin interactively. To do this easily, you'll want to build an example app that uses your plugin. For example:

```bash
$ cordova create hello com.example.hello hello
$ cd hello
$ cordova platform add --save ios android windows browser
$ cordova plugin add --save /path/to/your/plugin
```

If you want to see the prime plugin's example project, it's available here: <https://github.com/kerrishotts/cordova-plugin-example-isprime/tree/master/example>

> **Note**: In order to run on Windows 10 as a UWP app, you need to add `<preference name="windows-target-version" value="10.0" />` and execute on a version of Windows with Edge 15 or better.

One you have your example project configured, you need to launch your project in your IDE. Make sure to `cordova prepare` first, but then you should be able to open your project in your desired IDE.

```bash
# for iOS (requires a Mac); launches Xcode
$ open platforms/ios/example.xcworkspace

# for Android; launches Android Studio
$ open -a "Android Studio" "./platforms/android/"

# for Windows; launches Visual Studio
> start .\platforms\windows\CordovaApp.sln
```

You may also need to debug the JavaScript side of things, in which case, you can connect Google Chrome to your Android apps and Safari to your iOS apps. Visual Studio can be used to debug Windows apps.

* iOS (see [Enabling Web Inspector](https://developer.apple.com/library/content/documentation/AppleApplications/Conceptual/Safari_Developer_Guide/GettingStarted/GettingStarted.html))
    * On your device:
        * **Settings** > **Safari** > **Advanced**
        * Turn Web Inspector to _ON_
    * On your development machine:
        * **Safari** \| **Preferences...** \| **Advanced**
        * CHECK **Show Develop menu in menu bar**
        * Attach your iPhone or iPad to your computer
            * You may be prompted to trust the machine &mdash; do so.
        * Once a context is available:
            * **Develop** \| Your device \| App
* Android (see [Get Started with Remote Debugging Android Devices](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/))
    * On your device:
        * Enable developer mode (see [Enable developer options](https://developer.android.com/studio/debug/dev-options.html))
            * **Settings** > **About phone**
            * Tap **Build number** seven times
            * Go back; **Developer options** should be near the bottom
        * **Settings** > **Developer Options** > **Enable USB Debugging**
    * On your development machine:
        * Launch Chrome (should be v32 or better)
        * Navigate to [chrome://inspect](chrome://inspect)
        * Ensure **Discover USB Devices** is checked
        * Connect your Android device
            * You may have to accept the "Allow USB Debugging" permission on your device
        * Once a context is available:
            * Click the link under the desired device and app.
* Windows
    * Use Visual Studio.

If you need to make changes to your plugin code, you'll need to do so in the IDE. Don't forget to copy those changes back to your plugin project!

