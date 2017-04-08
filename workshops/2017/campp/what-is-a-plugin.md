---
title: What is a Plugin?
description: Creating a Modern PhoneGap Plugin Workshop
layout: page
links:
    Up: index.html
    Continue: managing-plugins.html
---

Let's start with a definition:

> _noun_ A mystical collection of machine incantations which grant access to amazing and magical capabilities

_Woops!_ That's not quite right. However, from the outside, plugins can appear to be almost magical things that are hard to understand. As such, one might shy away from trying to build them, or one might start and get frustrated in the attempt and give up.

But plugins are anything but magical. Here's a better definition:

> _noun_ A module consisting of code and settings extending the essential functionality of Cordova with the goal of providing access to device capabilities, enhancing existing capabilities, or improving the developer's workflow

Plugins cover a huge swath of the technical landscape. They can do all sorts of things at various times, and chances are they can do more than you may have initially thought.

# What can plugins do?

A plugin can do anything that native code could do within the same context. There are various contexts in which a plugin can operate, mainly "install time", "build time", and "run time". Most developers are probably most familiar with the latter context, and most plugins provide their functionality within that context. For example, a plugin that operates in the run time context can use the native SDK's functionality (including widgets, low-level functionality, etc.), whereas a plugin that operates in either the install or build time context can use Cordova's Node environment.

## Plugins at run time

These plugins have full access to the native SDK and device features. Some examples:

* Push Notifications: [PhoneGap](https://github.com/phonegap/phonegap-plugin-push), [Pushwoosh](https://github.com/Pushwoosh/pushwoosh-phonegap-3.0-plugin), [AeroGear](https://github.com/aerogear/aerogear-cordova-push), [OneSignal](https://github.com/onesignal/OneSignal-Cordova-SDK)
* Storage Plugins: [Native Storage](https://github.com/TheCocoaProject/cordova-plugin-nativestorage), [SQLite](https://github.com/litehelpers/Cordova-sqlite-storage), [SQLite 2](https://github.com/nolanlawson/cordova-plugin-sqlite-2)
* Social Plugins: [Email](https://github.com/hypery2k/cordova-email-plugin), [X SocialSharing](https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin)
* Audio Plugins: [DBMeter](https://github.com/akofman/cordova-plugin-dbmeter), [Native Audio](https://github.com/floatinghotpot/cordova-plugin-nativeaudio), [Media Picker](https://github.com/an-rahulpandey/cordova-plugin-mediapicker)
* Misc: [Barcode Scanner](https://github.com/phonegap/phonegap-plugin-barcodescanner), [In App Purchase](https://github.com/j3k0/cordova-plugin-purchase), [Google Maps](https://github.com/mapsplugin/cordova-plugin-googlemaps), [Vuforia](https://github.com/mattrayner/cordova-plugin-vuforia) (AR), [Microsoft ACE](https://github.com/Microsoft/ace) (native controls), [Tesseract](https://github.com/jcesarmobile/cordova-plugin-tesseract-ocr) (OCR, iOS)
* Creative Cloud: [Auth](https://github.com/CreativeSDK/phonegap-plugin-csdk-user-auth), [Asset Browser](https://github.com/CreativeSDK/phonegap-plugin-csdk-asset-browser), [Image Editor](https://github.com/CreativeSDK/phonegap-plugin-csdk-image-editor), [Send to Desktop](https://github.com/CreativeSDK/phonegap-template-csdk-send-to-desktop)

## Plugins at build time

These plugins have full access to the build-time environment and Cordova project. Some examples:

* Transpile and Bundle ES2015+: [Webpack &amp; Transpiler plugin](https://github.com/kerrishotts/cordova-plugin-webpack-transpiler)
* Pre-process CSS files (SASS, less, auto-prefixer)
* Check code quality (eslint, tslint, jshint)

## Plugins at install time

These plugins have full access to the Cordova project and environment at install time. Some ideas:

* Configure the project environment
* Bundle other plugins
* Provide tests for another plugin...*Plugin-ception :fireworks:*
    * [cordova-plugin-test-framework](https://github.com/apache/cordova-plugin-test-framework)

# Plugin Categories

There are two categories of plugins: _core_ and _community_. The former are generally plugins that were originally core functionality &mdash; that is, they were built-in to Cordova and later split out so that they could be maintained separately and receive updates without having to update all of Cordova. The latter are plugins developed and supported by the community themselves.

There are twenty core plugins:

 Plugin              | Plugin          | Plugin
:--------------------|:----------------|:----------------
 battery-status      | camera          | console
 contacts            | device          | device-motion
 device-orientation  | dialogs         | file
 file-transfer       | geolocation     | globalization
 inappbrowser        | media           | media-capture
 network-information | ~~splashscreen~~ | statusbar
 vibration           | whitelist

There are many, many more community plugins:

|                         Repository | Plugins                 |
|-----------------------------------:|:------------------------|
| https://cordova.apache.org/plugins | ~2,066 plugins &amp; templates (excl. core) |
| http://www.plugreg.com             | ~1,592 plugins (excl. core) |
| http://plugins.telerik.com/cordova | ~77 plugins             |

