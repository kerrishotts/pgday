---
title: Creating a Modern PhoneGap Plugin
description: PhoneGap Day EU 2017 Workshop
layout: page
links:
    Start: what-is-a-plugin.html
    Slides: https://github.com/kerrishotts/pgday/raw/master/2017/creating-a-modern-phonegap-plugin/presentation.pdf
---

Creating a PhoneGap plugin doesn’t have to be scary, and it isn’t all that difficult! In this workshop you’ll learn how to create a simple plugin, how to structure your plugin for multi-platform support, how to add it to your projects, and how to test it thoroughly using Cordova’s plugin testing framework.

> **Note:** Presentation and Workshop based in part on [PGDay EU 2016 plugin workshop](http://purplecabbage.github.io/slides/pgd16Plugins/index.html) by Jesse

## Presenters

### About Kerri

* Used PhoneGap for six+ years
* Author of five books about PhoneGap
* IT Consultant for eight years
* Apache Cordova committer
* One of several moderators:
    * [Adobe PhoneGap Forums](http://forums.adobe.com/community/phonegap)
    * [Google Cordova Group](https://groups.google.com/forum/#!forum/phonegap)
* [@kerrishotts](https://www.twitter.com/kerrishotts)

### About Jesse

* PhoneGap Developer since 2008
* Apache Cordova committer
* At Adobe for nearly 6 years now
* [@purplecabbage](https://www.twitter.com/purplecabbage)

## Prerequisites

The following prerequisites are required. Versions used for testing follow.

* Cordova or PhoneGap CLI installed
* Native SDKs installed as needed
* Comfortable with terminal and CLI
* Enough knowledge of the native SDKs to be dangerous

Versions tested with:

* iOS
    * macOS Sierra (10.12.4)
    * Xcode 8.3.1
    * Cordova CLI 7.0.0
    * `cordova-ios` 4.3.1

* Android
    * macOS Sierra (10.12.4)
    * Java JDK 1.8.0.102
    * Android Studio 2.3.1
    * Android API Level 25 (7.1.1 Nougat)
    * Android SDK Tools 26.0.1
    * Android Platform-Tools 25.0.5
    * Android Build-Tools 25
    * Cordova CLI 7.0.0
    * `cordova-android` 6.2.2

* Windows 10 UWP
    * Windows 10 Pro (v1703, build 15063.138)
    * Cordova CLI 7.0.0
    * `cordova-windows` 5.0.0

* Browser
    * Google Chrome 58.0.3029.81
    * Cordova CLI 7.0.0
    * `cordova-browser` 4.1.0

## Let's get started!

1. [What is a plugin?](what-is-a-plugin.md) &mdash; What a plugin is; what plugins can do; plugin categories
2. [Managing plugins](managing-plugins.md) &mdash; Installing from npm, git, local file system; finding plugins
3. [Plugin X-Ray](plugin-x-ray.md) &mdash; What's inside a plugin (metadata, documentation, structure, etc.)
4. [Creating a plugin (four parts)](creating.md) &mdash; Creating a plugin scaffold; JS API; native code; class mapping
5. [Know your bridges](bridges.md) &mdash; iOS, Android, Browser &amp; Windows
6. [Testing](testing.md) &mdash; Testing your plugin with cordova-paramedic, Jasmine; tips
7. [Debugging and Iterating](debugging-and-iterating.md) &mdash; Linking your plugin; using the native SDK's IDEs
8. [Publishing](publishing.md) &mdash; Publishing to npm
9. [Hooks](hooks.md) &mdash; What a hook is, what hooks can do, and ideas
10. [Tips](tips.md) &mdash; Useful tips to remember
11. [Homework](homework.md) &mdash; Using what you've learned; ideas

## Our Final Plugin

You can see code for the final plugin created for this workshop at <https://github.com/kerrishotts/cordova-plugin-example-isprime>.

## Sources

* Jesse's [PGDay EU 2016 plugin workshop](http://purplecabbage.github.io/slides/pgd16Plugins/index.html)
* [Cordova documentation](https://cordova.apache.org/docs/en/latest/)
* Cordova source code
    * [cordova-ios](https://github.com/apache/cordova-ios)
    * [cordova-android](https://github.com/apache/cordova-android)
    * [cordova-browser](https://github.com/apache/cordova-browser)
    * [cordova-windows](https://github.com/apache/cordova-windows)
* Various plugins:
    * [Device Plugin](https://github.com/apache/cordova-plugin-device)
    * [Geolocation Plugin](https://github.com/apache/cordova-plugin-geolocation)
    * [File Transfer Plugin](https://github.com/apache/cordova-plugin-file-transfer)
    * [Status Bar Plugin](https://github.com/apache/cordova-plugin-statusbar)
* Templates:
    * [PhoneGap Plugin Template](https://github.com/phonegap/phonegap-plugin-template)