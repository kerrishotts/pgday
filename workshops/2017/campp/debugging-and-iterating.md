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
$ cordova platform add --save ios android browser
$ cordova plugin add --save --link /path/to/your/plugin
```

Note that we added the plugin using `--link`. This makes it easier to change code in your native IDE and have those changes reflect back to your plugin project.

If you want to see the prime plugin's example project, it's available here: <https://github.com/kerrishotts/cordova-plugin-example-isprime/tree/master/example>

One you have your example project configured, you need to launch your project in your IDE. Make sure to `cordova prepare` first, but then you should be able to open your project in your desired IDE.

```bash
# for iOS (requires a Mac)
$ open platforms/ios/example.xcworkspace

# for Android
$ TODO

# for Windows
> TODO
```

You may also need to debug the JavaScript side of things, in which case, you can connect Google Chrome to your Android apps and Safari to your iOS apps. (TODO: add link)

So, before we continue, you may be asking just what gets linked? Here's what happens:

* app's `plugins/<your-plugin>` is symlinked to your plugin
* Native code is symlinked in app's `platforms/` ()

Exceptions &amp; notes:
* Run `cordova clean android` if the Android compiler complains after you make changes
* `plugin.xml` changes require an `plugin rm` &amp; `add`
* Changes to your plugin's `www` require an `plugin rm` &amp; `add` as well
* `platform rm` &amp; `add` won't preserve `--link`s ([CB-12597](https://issues.apache.org/jira/browse/CB-12597))


