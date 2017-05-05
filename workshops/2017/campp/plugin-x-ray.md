---
title: Plugin X-Ray
description: Creating a Modern PhoneGap Plugin Workshop
layout: page
links:
    Up: index.html
    Previous: managing-plugins.html
    Continue: creating.html
---

So, what's in a plugin anyway? Plugins consist of several things:

* metadata (cordova, npm)
* documentation
* JavaScript code
* native code (iOS, Android, etc.)
* tests
* TypeScript types
* hooks

Aside from the metadata, everything else is optional &mdash; you should only include what you need in order to make your plugin function as desired. If you don't need JavaScript code, don't include it. If you aren't using hooks, then you don't need those either. Although documentation and tests aren't required, both are highly suggested as they can help the user better understand your plugin, and provide your user with some assurance that the plugin will work correctly.

A plugin is typically structured as follows:

Plugin Structure                                       | Description
:------------------------------------------------------|:----------------------------------
cordova-plugin-*your-plugin*/                          | Plugin root
&nbsp;&nbsp; package.json                              | npm metadata
&nbsp;&nbsp; plugin.xml                                | Plugin metadata and configuration
&nbsp;&nbsp; README.md                                 | English documentation
&nbsp;&nbsp; doc/_locale_                              | Documentation other than English
&nbsp;&nbsp; tests/                                    | *Please add tests!*
&nbsp;&nbsp; types/                                    | TypeScript typings
&nbsp;&nbsp; src/_platform_                            | Platform-specific native code
&nbsp;&nbsp;&nbsp;&nbsp; android/                      | Native Android code
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *YourPlugin*.java |
&nbsp;&nbsp;&nbsp;&nbsp; ios/                          | Native iOS code
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CDV*YourPlugin*.h |
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CDV*YourPlugin*.m |
&nbsp;&nbsp; www/                                      | JavaScript code &amp; web assets
&nbsp;&nbsp;&nbsp;&nbsp; *yourPlugin*.js               | API for JavaScript consumers

> **Note:** the structure above is representational. For a good example, see the [Device Plugin](https://github.com/apache/cordova-plugin-devicehttps://github.com/apache/cordova-plugin-device).

When providing documentation, the convention is to provide the English translation in `README.md` in your plugin's root directory. Other translations go in `docs/[local]/README.md`. Be sure to provide examples, constants, errors that can be thrown, etc. so that the user has an idea how to properly utilize your plugin.


# Metadata

Metadata controls a lot of aspects of your plugin, including how people find your plugin, but also how your plugin is configured, and how it affects your consumer's app. There are two types of metadata:

* Plugin metadata is stored in `plugin.xml`. You can think of this as an analogue to an app's `config.xml`. Plugin metadata controls lots of things, such as id, version, author, license, name, description, repo, issue, keywords, platform (&amp; assets), dependencies, engines, preferences, hooks, info, and more.

* npm metadata is stored in `package.json`. This is required for publishing your plugin to npm. It is focused mostly on presentation aspects of your plugin, including things such as name, version, author, license, description, repository, issue, keywords, platforms, and dependencies.

  > **Note:** The `package.json` file can be automatically generated when it comes time to publish. We'll go over this later. Once you have one, though, you'll end up manually modifying this file.

## Descriptive metadata

Descriptive metadata includes things like the name of the plugin, the version, the repository where it is located, and so on. In `plugin.xml`, an example looks like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<plugin xmlns="http://apache.org/cordova/ns/plugins/1.0" xmlns:android="http://schemas.android.com/apk/res/android"
  id="cordova-plugin-device" version="1.1.5-dev">
  <name>Device</name>
  <description>Cordova Device Plugin</description>
  <license>Apache 2.0</license>
  <keywords>cordova,device</keywords>
  <repo>https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git</repo>
  <issue>https://issues.apache.org/jira/browse/CB/component/12320648</issue>
```

> **Note:** The complete plugin metadata used in this section is from the [Device Plugin's Metadata](https://github.com/apache/cordova-plugin-device/blob/master/plugin.xml).

The equivalent `package.json` metadata looks like this:

```javascript
{
  "name": "cordova-plugin-device",
  "author": "Apache Software Foundation",
  "license": "Apache-2.0",
  "version": "1.1.5-dev",
  "description": "Cordova Device Plugin",
  "types": "./types/index.d.ts",
  "cordova": {
    "id": "cordova-plugin-device",
    "platforms": ["android", "ios", "windows", "wp8", ... ] },
  "repository": { "type": "git", "url": "https://..." },
  "keywords": ["cordova", "device", "ecosystem:cordova", "cordova-ios", "cordova-android", ... ],
```

> **Note:** The sample is from the [Device Plugin's package.json](https://github.com/apache/cordova-plugin-device/blob/master/package.json) file.

> **Tip:** You'll want to specify what platforms are supported in your plugin using the `cordova.platforms` key &mdash; this is used by the Cordova plugin search page to indicate what platforms your plugin supports.

## Asset and code metadata

With the preamble out of the way, the plugin's metadata typically moves on to defining the JavaScript entry point, native code files, and other assets.

### JavaScript modules

Typically run-time plugins will provide some sort of JavaScript API that the consumer's app can interact with. This isn't a hard-and-fast rule, however, since some plugins can operate independently and don't return data to the app's webview. [(docs)](https://cordova.apache.org/docs/en/latest/plugin_ref/spec.html#js-module)

To specify a module, the following pattern is used (note the path to the source file, and a unique name for the file):
```xml
<js-module src="www/device.js" name="device">
  [<children/>]
</js-module>
```

You can then replace `[<children/>]` with any of the following, depending upon your API's needs:

Children                       | Description
:------------------------------|:------------------------------
`<clobbers target="device" />` | overwrites `window.device`
`<merges target="device" />`   | merges with `window.device`
`<runs />`                     | runs, but doesn't export

It is important to point out that by specifying one or more JavaScript modules, references will be automatically injected into your consumer's `index.html` file.

> **Tip:** Unless necessary, target `cordova.plugins.yourPlugin`. Polyfills and implementations of standards are example exceptions.

### Assets and native code

Run-time plugins will also often provide native code and other assets (such as images and such). Because these are often platform-specific and we don't want to copy unnecessary files to each platform, `<platform>` tags are used to indicate which assets go to which platforms. [(docs)](https://cordova.apache.org/docs/en/latest/plugin_ref/spec.html)

Here's an example:

```xml
<platform name="android">
  <source-file src="src/android/Device.java" target-dir="src/org/apache/cordova/device" />
</platform>
<platform name="ios">
    <header-file src="src/ios/CDVDevice.h" />
    <source-file src="src/ios/CDVDevice.m" />
    <framework src="libz.tbd" />
</platform>
```

> **Note:** the above example comes from the [Device Plugin](https://github.com/apache/cordova-plugin-device/blob/master/plugin.xml) plugin metadata.

There are several additional tags that you can use: `<asset>`, `<resource-file>`, and `lib-file`. See the [docs](https://cordova.apache.org/docs/en/latest/plugin_ref/spec.html) for the low-down.

> **Tip:** You can include third-party libraries: iOS supports Cocoapods, and Android supports AARs with Gradle.

> **Bug:** On iOS hidden (dot) files may not be copied. See [CB-10135](https://issues.apache.org/jira/browse/CB-10135)

### Plugin class mapping

The plugin metadata also maps calls from your JavaScript APIs to your native code, like so:

  * Android ([Geolocation](https://github.com/apache/cordova-plugin-geolocation/blob/96f0830caab4d48a01d97db1d9ec3f4c52b95be3/plugin.xml#L45))
    ```xml
    <config-file target="res/xml/config.xml" parent="/*">
      <feature name="Geolocation">
        <param name="android-package"
          value="org.apache.cordova.geolocation.Geolocation" />
      </feature>
    </config-file>
    ```

  * iOS ([Geolocation](https://github.com/apache/cordova-plugin-geolocation/blob/96f0830caab4d48a01d97db1d9ec3f4c52b95be3/plugin.xml#L93))
    ```xml
    <config-file target="config.xml" parent="/*">
      <feature name="Geolocation">
        <param name="ios-package" value="CDVLocation"/>
      </feature>
    </config-file>
    ```

> **Tip:** Use `<param name="onload" value="true" />` to initialize your plugin at startup &mdash; use only if necessary

## Manifest modifications

Often times you'll need to modify the consumer app's configuration files. Sometimes this will be the app's `config.xml` file, but other times you may need to modify a plist or `AndroidManifest.xml` file.

There are two types of modifications: insertion of elements to the manifest via `config-file`, or additions of attributes to existing elements via `edit-config`. For example:

<!--[windows, geolocation](https://github.com/apache/cordova-plugin-geolocation/blob/96f0830caab4d48a01d97db1d9ec3f4c52b95be3/plugin.xml#L218) -->

* `config-file` [(docs)](https://cordova.apache.org/docs/en/latest/plugin_ref/spec.html#config-file)
  * From [File Transfer plugin for Android](https://github.com/apache/cordova-plugin-file-transfer/blob/ac2ae8ba2edc099dcde49cd66b810eb225e04d3d/plugin.xml#L50):
    ```xml
    <config-file target="AndroidManifest.xml" parent="/*">
      <uses-permission android:name=
        "android.permission.WRITE_EXTERNAL_STORAGE" />
    </config-file>
    ```
  * From [Geolocation plugin for iOS](https://github.com/apache/cordova-plugin-geolocation/blob/96f0830caab4d48a01d97db1d9ec3f4c52b95be3/plugin.xml#L103)
    ```xml
    <config-file target="*-Info.plist"
      parent="NSLocationWhenInUseUsageDescription">
      <string>$GEOLOCATION_USAGE_DESCRIPTION</string>
    </config-file>
    ```
* `edit-config` [(docs)](https://cordova.apache.org/docs/en/latest/plugin_ref/spec.html#edit-config)
  * From [Transparent Status Bar plugin for Android](https://github.com/manugando/cordova-plugin-transparent-status-bar/blob/25c0f913260334ac0d518077c9efd1f66447b107/plugin.xml#L26):
    ```xml
    <edit-config file="AndroidManifest.xml"
        target="/manifest/application/activity[@android:name='MainActivity']"
        mode="merge">
        <activity android:theme="@style/AppTheme" />
    </edit-config>
    ```

## Dependencies

Sometimes you'll need to specify dependencies for a plugin as well. This can be done in one of two ways: using `plugin.xml` or using `package.json` (preferred since 6.1.0).

Using `plugin.xml`:

* plugin dependencies ([eg](https://github.com/apache/cordova-plugin-file-transfer/blob/ac2ae8ba2edc099dcde49cd66b810eb225e04d3d/plugin.xml#L32), [docs](https://cordova.apache.org/docs/en/latest/plugin_ref/spec.html#dependency))
  ```xml
  <dependency id="cordova-plugin-file" version="^4.0.0" />
  ```
* platform &amp; tool dependencies([eg](https://github.com/apache/cordova-plugin-inappbrowser/blob/92ca973b3da3c79fd4bba1e1ca8a12c75a1b6260/plugin.xml#L32), [docs](https://cordova.apache.org/docs/en/latest/plugin_ref/spec.html#engines-and-engine))
  ```xml
  <engines>
    <engine name="cordova" version=">=3.1.0" />
  </engines>
  ```

Using `package.json` [(docs)](https://cordova.apache.org/docs/en/latest/guide/hybrid/plugins/index.html#specifying-cordova-dependencies):

```javascript
"engines": {
  "cordovaDependencies": {
    "2.0.0": { // plugin version (applies to any ver 2+)
      "cordova-plugin-console": ">1.0.0",
      "cordova": ">6.0.0" // cordova-cli above version 6
    }
  }
}
```

# What about the rest?

Well, sometimes it helps to actually see everything in action. So, we're going to create an actual plugin in the next step, and you'll be able to see how we put everything together.