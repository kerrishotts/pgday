<!-- $size: 16:9 -->
<!-- page_number: false -->
<!-- $theme: elegant -->
<!-- $prism: okaidia -->


![bg o30%](assets/bg.jpg)

<!-- footer: Photo by AlexanderStein (https://pixabay.com/en/users/AlexanderStein-45237/), courtesy of Pixabay.com-->

# Creating a Modern PhoneGap Plugin <!--{style="color: white; font-size: 2.5em"}-->

#### Kerri Shotts ([@kerrishotts](https://www.twitter.com/kerrishotts))
#### Jesse MacFadyen ([@purplecabbage](https://www.twitter.com/purplecabbage))

###### Slides at https://goo.gl/2xVAwZ
###### Based on [PGDay EU 2016 plugin workshop](http://purplecabbage.github.io/slides/pgd16Plugins/index.html) by Jesse

---
<!-- template: default -->
<!-- footer: -->

# About Kerri

![75%](./assets/kerrishotts.jpg) <!-- {style='float: right'} -->


* Used PhoneGap for six+ years
* Author of five books about PhoneGap
* IT Consultant for eight years
* Apache Cordova committer
* One of several moderators:
    * [Adobe PhoneGap Forums](http://forums.adobe.com/community/phonegap)
    * [Google Cordova Group](https://groups.google.com/forum/#!forum/phonegap)
* [@kerrishotts](https://www.twitter.com/kerrishotts)

---

# About Jesse

![33%](./assets/purplecabbage.jpg) <!-- {style='float: right'} -->

* PhoneGap Developer since 2008
* Apache Cordova committer
* At Adobe for nearly 6 years now
* [@purplecabbage](https://www.twitter.com/purplecabbage)

---

# What is a Cordova Plugin?

_noun_ A mystical collection of machine incantations which grant access to amazing and magical capabilities

## ahem... <!-- {style='text-align: center'} -->

_noun_ A module consisting of code and settings extending the essential functionality of Cordova with the goal of providing access to device capabilities, enhancing existing capabilities, or improving the developer's workflow

---

# What can plugins do?

* Anything native code can do
* Active in the following contexts:
    * run time
    * build time
    * install time
* Two sources of Plugins
  * Core &mdash; used to be built in pre-3.x (Undergoing audit: [CB-12708](https://issues.apache.org/jira/browse/CB-12708))
  * Community &mdash; people like you!

---

# Plugins at Run Time

![bg o20%](./assets/pics/running-573762_1920.jpg)
<!-- footer: Photo by skeeze (https://pixabay.com/en/users/skeeze-272447/), courtesy of Pixabay.com-->

Full access to the native SDK and device features. Some examples:

* Push Notifications: [PhoneGap](https://github.com/phonegap/phonegap-plugin-push), [Pushwoosh](https://github.com/Pushwoosh/pushwoosh-phonegap-3.0-plugin), [AeroGear](https://github.com/aerogear/aerogear-cordova-push), [OneSignal](https://github.com/onesignal/OneSignal-Cordova-SDK)
* Storage Plugins: [Native Storage](https://github.com/TheCocoaProject/cordova-plugin-nativestorage), [SQLite](https://github.com/litehelpers/Cordova-sqlite-storage), [SQLite 2](https://github.com/nolanlawson/cordova-plugin-sqlite-2)
* Social Plugins: [Email](https://github.com/hypery2k/cordova-email-plugin), [X SocialSharing](https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin)
* Audio Plugins: [DBMeter](https://github.com/akofman/cordova-plugin-dbmeter), [Native Audio](https://github.com/floatinghotpot/cordova-plugin-nativeaudio), [Media Picker](https://github.com/an-rahulpandey/cordova-plugin-mediapicker)
* Misc: [Barcode Scanner](https://github.com/phonegap/phonegap-plugin-barcodescanner), [In App Purchase](https://github.com/j3k0/cordova-plugin-purchase), [Google Maps](https://github.com/mapsplugin/cordova-plugin-googlemaps), [Vuforia](https://github.com/mattrayner/cordova-plugin-vuforia) (AR), [Microsoft ACE](https://github.com/Microsoft/ace) (native controls), [Tesseract](https://github.com/jcesarmobile/cordova-plugin-tesseract-ocr) (OCR, iOS)
* Creative Cloud: [Auth](https://github.com/CreativeSDK/phonegap-plugin-csdk-user-auth), [Asset Browser](https://github.com/CreativeSDK/phonegap-plugin-csdk-asset-browser), [Image Editor](https://github.com/CreativeSDK/phonegap-plugin-csdk-image-editor), [Send to Desktop](https://github.com/CreativeSDK/phonegap-template-csdk-send-to-desktop)
<!--{ul:style="font-size:0.95em"}-->

---

![bg o20%](./assets/pics/architecture-1836443_1920.jpg)
<!-- footer: Photo by Pexels (https://pixabay.com/en/users/Pexels-2286921/), courtesy of Pixabay.com-->

# Plugins at Build Time

Full access to the build-time environment and Cordova project. Some examples:

* Transpile and Bundle ES2015+: [Webpack &amp; Transpiler plugin](https://github.com/kerrishotts/cordova-plugin-webpack-transpiler)
* Pre-process CSS files (SASS, less, auto-prefixer)
* Check code quality (eslint, tslint, jshint)
* Etc.

---

![bg o20%](./assets/pics/head-19901_1920.jpg)
<!-- footer: Photo by PublicDomainPictures (https://pixabay.com/en/users/PublicDomainPictures-14/), courtesy of Pixabay.com-->

# Plugins at Install Time

Full access to the Cordova project and environment at install time. Some ideas:

* Configure the project environment
* Bundle other plugins
* Provide tests for another plugin...
    * [cordova-plugin-test-framework](https://github.com/apache/cordova-plugin-test-framework)

## *Plugin-ception :fireworks:* <!-- {h2:style='text-align:center'} -->

---
<!--footer: -->

# The Core Plugins

Core Cordova Plugins (used to be built-in pre-3.x) (Audit: [CB-12708](https://issues.apache.org/jira/browse/CB-12708))

 Plugin              | Plugin          | Plugin <!-- {thead:style='display:none'} -->
:--------------------|:----------------|:----------------
 battery-status      | camera          | console
 contacts            | device          | device-motion
 device-orientation  | dialogs         | file
 file-transfer       | geolocation     | globalization
 inappbrowser        | media           | media-capture
 network-information | ~~splashscreen~~ | statusbar
 vibration           | whitelist

---

# Community Plugins

Devoloped and supported by the community &mdash; like you!

|                         Repository | Plugins                 |
|-----------------------------------:|:------------------------|
| https://cordova.apache.org/plugins | ~2,211 plugins &amp; templates (excl. core) |
| http://www.plugreg.com             | ~1,592 plugins (excl. core) |
| http://plugins.telerik.com/cordova | ~77 plugins             |

---

# Managing Plugins

---

# npm

Plugins are typically downloaded from npm:

```sh <!-- cli output=2,4-5,7-8 prompt=$ -->
cordova plugin add [--save] cordova-plugin-device

cordova plugin ls                                # or list
cordova-plugin-device 1.1.1 "Device"

cordova plugin rm [--save] cordova-plugin-device # or remove
```
<!-- {style='font-size:85%'} -->

<hr>

**Note:** `--save` persists the plugin to `config.xml` so that plugins can be easily restored (done at `prepare`-time) 
**7.x:** `--save` is the default in `cordova@7.0.0`; `--nosave` will turn it off
**7.x:** Fetching via npm is now the default; if a plugin doesn't have `package.json` adding will fail. Use `--nofetch` for those plugins.


---

# Git

Plugins can also be installed from a Git repository.

```sh <!-- cli prompt=$ output=2 -->
cordova plugin add http://github.com/apache/cordova-plugin-device

cordova plugin rm cordova-plugin-device
```
<!-- {style='font-size:80%'} -->

Specify a branch: (useful for testing pre-release/edge plugins):

```sh <!-- cli output=2 prompt=$ -->
cordova plugin add http://github.com/apache/cordova-plugin-device
  #branch
```
<!-- {style='font-size:79%'} -->

<hr>

**Note:** Use the plugin's identifier when removing &mdash; not the URL.

---

# Local Filesystem

Or install from the local file system &mdash; very useful for plugin development.

```sh <!-- cli prompt=$ output=2 -->
cordova plugin add [--save] [--link] /path/to/plugin

cordova plugin rm [--save] cordova-plugin-device
```
<!-- {style='font-size:90%'} -->

**Note**: `--link` is useful when developing plugins

<hr>

**Tip:** Adding a plugin to a child project (relative to the plugin) may automatically symlink the plugin
**Note:** Careful with parent plugins and child projects &mdash; easy to get circular references in the file system
**Windows:** May need to be admin to create links

---

# Finding Plugins

* Cordova Plugin Search: https://cordova.apache.org/plugins
* npm: https://www.npmjs.com/search?q=ecosystem:cordova
* Or, if the CLI is more your thing:

    ```sh <!-- cli prompt=$ output=3-9 -->
    npm install -g npms-cli
    npms search cordova-plugin device --size=5
    ┌────────────────────────────────────────────────────────────────────────────────
    │ Package                                                                        
    ├────────────────────────────────────────────────────────────────────────────────
    │ cordova-plugin-device • https://github.com/apache/cordova-plugin-device        
    │ Cordova Device Plugin                                                          
    │ updated 2 months ago by shazron                                                
    ├────────────────────────────────────────────────────────────────────────────────
    ```
<!-- {style='font-size:75%'} -->



---

![bg o40%](./assets/pics/little-791331_1920.jpg)
<!-- footer: Photo by kaboompics (https://pixabay.com/en/users/kaboompics-1013994/), courtesy of Pixabay.com-->


# Crossing the bridges

---
<!--footer: -->

# Know your Bridges

Allows communication between native code and web view contexts.

* iOS

* Android

* Browser/Windows is an exception...
  * Careful, the bridge is a **mirage**! :desert:
  * JavaScript is **native** :fireworks:
  * `cordova.exec` uses a proxy to keep things consistent
  * [full docs](https://cordova.apache.org/docs/en/latest/guide/platforms/win8/plugin.html#creating-a-windows-plugin-in-javascript)

---

<!-- footer: -->

![bg fit original](assets/ios-bridge.png?c)

---

![bg fit original](assets/android-bridge.png?c)

---

![bg fit original](assets/proxy-bridge.png?d)

---

![bg o20%](./assets/pics/x-ray-237402_1920.jpg)
<!-- footer: Photo by dcondrey (https://pixabay.com/en/users/dcondrey-122249/), courtesy of Pixabay.com-->



# Plugin X-ray

---

<!-- footer: -->

# The Stuff Plugins are Made of

 Ingredients  | Ingredients <!-- {thead:style='display:none'} -->
:------------:|:------------------:
Metadata      | Documentation _^s^_
Native Code \*| JavaScript \*
Tests _^s^_   | Hooks \*
Typings \*    | TLC \* _^s^_

**\*** Optional
**_^s^_** Optional but highly suggested

---
<!--footer: -->

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
<!-- {table:style='font-size:75%; line-height: 0.965;'} -->
<!-- {table:class='no-border'} -->

<hr> 

(representational; not every file is included here); Ex: [Device Plugin](https://github.com/apache/cordova-plugin-device)


---

# Metadata

<div style="columns: 2">

<div>

### plugin.xml
  
**id**, **version**, author, license, name, description, repo, issue, keywords, platform (&amp; assets), dependencies, engines, preferences, hooks, info, etc.

</div>

<div style="-webkit-column-break-before: always; break-before: column">
  
### package.json

**name**, **version**, author, license, description, repository, issue, keywords, platforms, dependencies

</div>

</div>

Note: **bold is required**; otherwise optional, but most are used

<hr>

**Note:** `package.json` can be generated by `plugman`

---

## Example Metadata (plugin.xml)

```xml <!--number -->
<?xml version="1.0" encoding="UTF-8"?>
<plugin xmlns="http://apache.org/cordova/ns/plugins/1.0"
  xmlns:android="http://schemas.android.com/apk/res/android"
  id="cordova-plugin-device" version="1.1.5-dev">
  <name>Device</name>
  <description>Cordova Device Plugin</description>
  <license>Apache 2.0</license>
  <keywords>cordova,device</keywords>
  <repo>https://git-wip-us.apache.org/repos/asf/
    cordova-plugin-device.git</repo>
  <issue>https://issues.apache.org/jira/browse/CB/
    component/12320648</issue>
```
<!-- {style="font-size: 79%"} -->

<hr>

[Device Plugin's Metadata](https://github.com/apache/cordova-plugin-device/blob/master/plugin.xml)

---

## npm Metadata Example (package.json)

```javascript <!--number-->
{ "name": "cordova-plugin-device",
  "author": "Apache Software Foundation",
  "license": "Apache-2.0",
  "version": "1.1.5-dev",
  "description": "Cordova Device Plugin",
  "types": "./types/index.d.ts",
  "cordova": { 
    "id": "cordova-plugin-device",
    "platforms": ["android", "ios", "windows", "wp8", ... ] },
  "repository": { "type": "git", "url": "https://..." },
  "keywords": ["cordova", "device", "ecosystem:cordova", 
               "cordova-ios", "cordova-android", ... ],
```
<!-- {style='font-size:78%'} -->

<hr>

[Device Plugin's package.json](https://github.com/apache/cordova-plugin-device/blob/master/package.json)


---

# JavaScript Modules

Automatically injected into your consumer's `index.html`. [^docs^](https://cordova.apache.org/docs/en/latest/plugin_ref/spec.html#js-module)

```xml
<js-module src="www/device.js" name="device">
  [<children/>]
</js-module>
```
<!--{style="font-size:90%;"}-->

Children                       | Description
:------------------------------|:------------------------------
`<clobbers target="device" />` | overwrites `window.device`
`<merges target="device" />`   | merges with `window.device`
`<runs />`                     | runs, but doesn't export 
<!--{table:style="font-size:90%;"}-->

* Unless necessary, target `cordova.plugins.yourPlugin`

---

# Platform Support

Use `<platform>` tags: [^docs^](https://cordova.apache.org/docs/en/latest/plugin_ref/spec.html#platform)

```xml
<platform name="android">
  ...
</platform>
<platform name="ios">
  ...
</platform>
```

<hr>

**Note:** You should also indicate platform support in `packge.json`:`cordova.platforms`

---

## Assets and Native Code

```xml <!-- number -->
<platform name="android">
  <source-file src="src/android/Device.java" 
    target-dir="src/org/apache/cordova/device" />
</platform>
<platform name="ios">
  <header-file src="src/ios/CDVDevice.h" />
  <source-file src="src/ios/CDVDevice.m" />
  <framework src="libz.tbd" />
</platform>    
```

<!-- {style="font-size:90%"} -->

<hr>

Other asset tags: `asset`, `resource-file`, `lib-file`; [full docs](https://cordova.apache.org/docs/en/latest/plugin_ref/spec.html)
**Note:** You can include third-party libraries; iOS supports Cocoapods, and Android supports AARs with Gradle.
**Bug:** On iOS hidden (dot) files may not be copied. See [CB-10135](https://issues.apache.org/jira/browse/CB-10135)

---

# Plugin Class Mapping

  * Android ([Geolocation](https://github.com/apache/cordova-plugin-geolocation/blob/96f0830caab4d48a01d97db1d9ec3f4c52b95be3/plugin.xml#L45))
    ```xml
    <config-file target="res/xml/config.xml" parent="/*">
      <feature name="Geolocation">
        <param name="android-package" 
          value="org.apache.cordova.geolocation.Geolocation" /> 
      </feature>
    </config-file>
    ```
    <!--{style="font-size:80%"}-->
  * iOS ([Geolocation](https://github.com/apache/cordova-plugin-geolocation/blob/96f0830caab4d48a01d97db1d9ec3f4c52b95be3/plugin.xml#L93))
    ```xml
    <config-file target="config.xml" parent="/*">
      <feature name="Geolocation">
        <param name="ios-package" value="CDVLocation"/>
      </feature>
    </config-file>
    ```
    <!--{style="font-size:80%"}-->

<!--{ul:style="font-size:85%"}-->

---

# Manifest Modifications

* `config-file`^1^ [^docs^](https://cordova.apache.org/docs/en/latest/plugin_ref/spec.html#config-file)
  * Adds elements to manifests / plist or platform `config.xml`
    ```xml <!-- number -->
    <config-file target="AndroidManifest.xml" parent="/*">
      <uses-permission android:name=
        "android.permission.WRITE_EXTERNAL_STORAGE" />
    </config-file>
    ```
    <!--{style="font-size:80%"}-->

    ```xml <!-- number -->
    <config-file target="*-Info.plist" 
      parent="NSLocationWhenInUseUsageDescription">
      <string>$GEOLOCATION_USAGE_DESCRIPTION</string>
    </config-file>
    ```
    <!--{style="font-size:80%"}-->

<hr>

1: [android, file transfer](https://github.com/apache/cordova-plugin-file-transfer/blob/ac2ae8ba2edc099dcde49cd66b810eb225e04d3d/plugin.xml#L50); [ios, geolocation](https://github.com/apache/cordova-plugin-geolocation/blob/96f0830caab4d48a01d97db1d9ec3f4c52b95be3/plugin.xml#L103); [windows, geolocation](https://github.com/apache/cordova-plugin-geolocation/blob/96f0830caab4d48a01d97db1d9ec3f4c52b95be3/plugin.xml#L218)

---

# Manifest Modifications (2)

* `edit-config`[^1^](https://github.com/manugando/cordova-plugin-transparent-status-bar/blob/25c0f913260334ac0d518077c9efd1f66447b107/plugin.xml#L26) [^docs^](https://cordova.apache.org/docs/en/latest/plugin_ref/spec.html#edit-config)
  * Edits attributes of existing elements in manifests
  ```xml <!-- number -->
  <edit-config file="AndroidManifest.xml" 
    target="/manifest/application/activity     \
      [@android:name='MainActivity']" 
    mode="merge">
    <activity android:theme="@style/AppTheme" />
  </edit-config>
  ```
  <!--{style="font-size:90%"}-->

---

<!--

# Dependencies ( &lt; cordova@6.1.0)

Before `cordova@6.1.0`, `plugin.xml` managed dependencies:

* plugin dependencies[^1^](https://github.com/apache/cordova-plugin-file-transfer/blob/ac2ae8ba2edc099dcde49cd66b810eb225e04d3d/plugin.xml#L32) [^docs^](https://cordova.apache.org/docs/en/latest/plugin_ref/spec.html#dependency)
  ```xml
  <dependency id="cordova-plugin-file" version="^4.0.0" />
  ```
  <!-- {style='font-size:80%'} ->
* platform &amp; tool dependencies[^2^](https://github.com/apache/cordova-plugin-inappbrowser/blob/92ca973b3da3c79fd4bba1e1ca8a12c75a1b6260/plugin.xml#L32) [^docs^](https://cordova.apache.org/docs/en/latest/plugin_ref/spec.html#engines-and-engine)
  ```xml
  <engines>
    <engine name="cordova" version=">=3.1.0" />
  </engines>
  ```
  <!-- {style='font-size:80%'} ->
  
<hr>

**Note**: don't forget about XML entities! So "&lt;" becomes "`&lt;`"

---

-->

# Dependencies (cordova@6.1.0+)

Dependencies are managed in `package.json`: [^docs^](https://cordova.apache.org/docs/en/latest/guide/hybrid/plugins/index.html#specifying-cordova-dependencies)

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
<!-- {style='font-size:90%'} -->

---

# Documentation

Documentation is absolutely critical!

* Location of documentation
    * English goes in `README.md` (plugin root)
    * Other languages in `docs/[locale]/README.md`
* Provide examples, constants, errors that can be thrown, etc.

---

# Creating and Publishing Plugins

###### :euro: And getting rich, maybe? :euro: 
###### Or maybe not...

---


![bg o60%](./assets/pics/fractal-1120769_1920.jpg)
<!-- footer: Photo by PeteLinforth (https://pixabay.com/en/users/PeteLinforth-202249/), courtesy of Pixabay.com-->

# Demo Time

## [cordova-plugin-example-isprime](https://github.com/kerrishotts/cordova-plugin-example-isprime)


---
<!-- footer: -->


# plugman

[plugman](https://github.com/apache/cordova-plugman) is a `node` library that manages plugins in your projects. `cordova-cli`, `phonegap-cli`, etc., use `plugman` internally.

It is also used to create an initial plugin project:

```sh <!-- cli prompt=$ output=4-6 -->
npm install -g plugman
mkdir isprime
plugman create --name IsPrime
               --plugin_id cordova-plugin-example-isprime
               --plugin_version 0.0.1
               --path .
```
<!-- {style='font-size:75%'} -->

---

# phonegap-plugin-template

Or, use PhoneGap's plugin template to create a plugin: https://github.com/phonegap/phonegap-plugin-template

```sh <!-- prompt=$ cli output=2-3,5-7 -->
npm i -g https://github.com/phonegap/phonegap-plugin-template

#parms: path name plugin-id
phonegap-plugin-create isprime IsPrime
  cordova-plugin-example-isprime  
? license[MIT] [enter]
```
<!-- {style='font-size:80%'} -->

Creates `docs`, `src/android`, `src/ios`, `www`, `plugin.xml`, `package.json`, and `README.md` (as well as some dot files)

---

![bg original fit](./assets/javascript-block.png?b)

---

# Your Plugin's JS API

```javascript
// www/isPrime.js
var exec = cordova.require("cordova/exec"), 
    SERVICE = "IsPrime";
module.exports = function isPrime(successFn, failureFn, 
  candidate) {
  // ensure the arguments are of the correct types
  if (typeof successFn !== "function") throw new Error("!");
  /* etc. */
  var arg = { isPrime: false, candidate: candidate, ... };
  /* pass the call over the cordova bridge */
  exec(successFn, failureFn, SERVICE, "isPrime", [arg]);
}
```
<!-- {style='font-size:90%'} -->

---

![bg original fit](./assets/native-block.png?b)

<!--footer: -->

---

# Your Native Code (iOS)

```c
#import <Cordova/CDV.h>
@interface CDVIsPrime : CDVPlugin
@end
@implementation CDVIsPrime
- (void)isPrime:(CDVInvokedUrlCommand*)command {
  NSMutableDictionary* result = [[command argumentAtIndex:0] mutableCopy];
  NSMutableArray* factors = result[@"factors"];
  int64_t candidate = [result[@"candidate"] longLongValue];
  /* let there be a miracle: calculate if prime is a candidate */
  CDVPluginResult* r = [CDVPluginResult 
    resultWithStatus:CDVCommandStatus_OK messageAsDictionary: result];
  [self.commandDelegate sendPluginResult:r callbackId:command.callbackId];
}
@end
```
<!-- {style='font-size:74%'} -->

---

# Your Native Code (Android)

```java
package com.example.isprime; /* omitting imports */
public class IsPrime extends CordovaPlugin {
  @Override
  public boolean execute(String action, JSONArray args, 
    CallbackContext callbackContext) throws JSONException {
    if ("isPrime".equals(action)) {
      this.isPrime(args.getJSONObject(0), callbackContext);
    } else { return false; }
    return true;
  }
  private void isPrime(JSONObject result, CallbackContext callbackContext) 
    throws JSONException {
	/* magic incantation: determine if candidate is prime */
    PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, result);
    callbackContext.sendPluginResult(pluginResult);
  }
}
```
<!-- {style='font-size:65%'} -->

---

# Your Native Code (Browser / Win)

```javascript
//src/[browser|windows]/yourPluginProxy.js
function isPrime(successFn, failureFn, args) {
  var result = args[0],
      candidate = result.candidate;
  /* magic! calculate if candidate is prime */
  successFn(result);
}

module.exports = { isPrime: isPrime };

require("cordova/exec/proxy").add("IsPrime", module.exports);
```
<!-- {style='font-size:90%'} -->

---

# Plugin Class Mapping (iOS)

Remember the JS API's call to `cordova.exec` and plugin class mapping in `plugin.xml`?

![iOS Status Bar Plugin Class Mapping](./assets/ios-plugin-class-map.png)

---

# Plugin Class Mapping (Android)

![iOS Status Bar Plugin Class Mapping](./assets/android-plugin-class-map.png)

---

# Triggering callback more than once

```objectivec
// iOS
CDVPluginResult* r=[CDVPluginResult resultWithStatus:CDVCommandStatus_OK 
  messageAsDictionary:result];
[r setKeepCallbackAsBool:YES];
```
<!-- {style='font-size:75%'} -->
```java

// Android
PluginResult r = new PluginResult(PluginResult.Status.OK, result);
r.setKeepCallback(true);
```
<!-- {style='font-size:75%'} -->
```javascript

// Browser / Windows
successFn(result, {keepCallback: true});
```
<!-- {style='font-size:75%'} -->

<hr>

[iOS StatusBar example](https://github.com/apache/cordova-plugin-statusbar/blob/95eb824d0ac37b542ffc2dad38d00c11dd1f660b/src/ios/CDVStatusBar.m#L157)

---

# Things your plugin should do

* If your plugin does a lot of work, use a background thread
* You should respond to `pause` and `resume` events
	* Respect the Android lifecycle! [^docs^](https://cordova.apache.org/docs/en/latest/guide/platforms/android/plugin.html#launching-other-activities)
* You should respond to `onDestroy` and `onReset` as well
	* `onDestroy` occurs when the plugin is about to go away
	* `onReset` occurs when the web view is about to navigate
	* Great for cleaning up background operations

---


<!--footer: -->

![bg original fit](./assets/tests-block.png?b)

---


# Testing plugins

`cordova-medic` is a test tool designed to run all the core Cordova plugin tests as part of Cordova's continuous integration system

* Tests are written in Jasmine 2.0
* Tests run asynchonously
* Plugins have a dependent test plugin which is installed separately (usually in `/tests` by convention)

* Many of these pieces of `cordova-medic` are reusable, so Jesse spun them into another purpose-based tool...

--- 

## cordova-paramedic

> n. *provides advanced levels of care at the point of illness or injury, including out-of-hospital treatment, and diagnostic services*

```sh <!-- cli prompt=$ output=3-4 -->
npm i -D cordova-paramedic
npm i -D https://github.com/apache/cordova-paramedic.git
```
<!-- {style='font-size:90%'} -->

Then:

```sh <!-- cli prompt=$ output=2 -->
./node_modules/cordova-paramedic/main.js --platform ios 
  --plugin .
```
<!-- {style='font-size:90%'} -->

Repo &amp; docs: https://github.com/apache/cordova-paramedic

---

## cordova-paramedic

Or, just use an npm script in `package.json`:

```json
"scripts": {
    "test:ios": "cordova-paramedic --platform ios     \
      --plugin .",
}
```

And then:

```sh <!-- cli prompt=$ -->
npm run test:ios
```

---

## Automates Jasmine Tests

* Creates a new project (in temporary location)
* Adds the platform specified (`ios`, `android`, `windows`, etc.)
* Installs the `cordova-plugin-test-framework` plugin
* Installs the plugin specified (in `.`) (current working directory)
* Installs the plugin's tests (in `./tests`)
* Sets  start page to `cordova-plugin-test-framework`'s test runner
* Creates a local server to listen for results
* Exits with success/fail based on results
<!-- {ul:style='font-size:90%'} -->

<hr>

**Note**: Only supports npm-published platforms

---

## How to write tests

* Copy a core plugin's tests – we all do it!
* Create a `tests` folder in your plugin's repository
* Add a `package.json` file (shouldn't be complex)
* Add a `plugin.xml` file (doesn't need to be complex) [^eg^](https://github.com/apache/cordova-plugin-statusbar/blob/95eb824d0ac37b542ffc2dad38d00c11dd1f660b/tests/plugin.xml)

    ```xml
    <plugin xmlns="http://apache.org/cordova/ns/plugins/1.0"
    xmlns:android="http://schemas.android.com/apk/res/android"
    id="cordova-plugin-statusbar-tests" version="2.2.3-dev">
      <name>Cordova StatusBar Plugin Tests</name>
      <license>Apache 2.0</license>
      <js-module src="tests.js" name="tests"></js-module>
    </plugin>
    ```

<!--{style='font-size:80%'}-->

---

## Testing Tips

* Automate as much as you can (`exports.defineAutoTests`)
* For tests that can't be automated, use manual tests (`exports.defineManualTests`)
* Don't forget to accept &amp; call `done` in your `it` tests when working with callbacks and promises.
* If you've got similar tests, you can build them programatically
* For native UI, you can use Appium
* [Travis CI example](https://github.com/kerrishotts/cordova-plugin-example-isprime/blob/master/.travis.yml) (iOS &amp; Android only)

---

![bg o60%](./assets/pics/beetle-1142373_1920.jpg)

<!-- footer: Photo by ROverhate (https://pixabay.com/en/users/ROverhate-1759589/), courtesy of Pixabay.com-->

# Debugging &amp; Iterating

--- 

<!--footer:-->

# Debugging &amp; Iterating

* Create an example app that uses your plugin
    ```cli <!-- number prompt=$ -->
    cordova create hello com.example.hello hello
    cd hello
    cordova platform add ios android browser
    cordova plugin add --link /path/to/plugin
    ```
    <!--{style="font-size:80%"}-->
    
    * `--link` &mdash; can simplify dev workflow
    * If you change your example's `www`, be sure to `prepare`

---

## IDEs &amp; Debugging

* iOS: Xcode / Safari
  ```sh <!-- cli prompt=$ -->
  open ./platforms/ios/*.xcworkspace
  ```

* Android: Android Studio / Google Chrome
  ```sh <!-- cli prompt=$ -->
  open -a "Android Studio" "./platforms/android/"
  ```
  
* Windows (universal): Visual Studio
  ```sh <!-- cli prompt=> -->
  start .\platforms\windows\CordovaApp.sln
  ```

---

![bg o20%](./assets/pics/chain-1662735_1920.jpg)
<!-- footer: Photo by bernswaelz (https://pixabay.com/en/users/bernswaelz-1728198/), courtesy of Pixabay.com-->


# What gets --linked?

* app's `plugins/<your-plugin>` is symlinked to your plugin
* Native code in symlinked in app's `platforms/`

Exceptions &amp; notes:
* `cordova clean android` if the build complains
* `plugin.xml` changes require a `plugin rm` &amp; `add`
* Changes to your plugin's `www` require an `rm` &amp; `add` as well
* `platform rm` &amp; `add` won't preserve `--link`s ([CB-12597](https://issues.apache.org/jira/browse/CB-12597))

---

<!--footer: -->

# Publishing your plugin

* Generate / update `package.json`

  * `plugman` can generate it based on `plugin.xml` for you:

    ```sh <!-- cli prompt=$ -->    
    plugman createpackagejson .
    ```

* Once `package.json` is correct, publish via:
    ```sh <!-- cli prompt=$ -->    
    npm publish
    ```
    
###### **IMPORTANT:**

* Don't forget `.npmignore`!
* If you used the PhoneGap Plugin Template, `package.json` is already there &mdash; you'll need to update it.

---

![bg o60%](./assets/pics/blur-1867166_1920.jpg)
<!-- footer: Photo by Pexels (https://pixabay.com/en/users/Pexels-2286921/), courtesy of Pixabay.com-->


# Tips &amp; Tricks

---

<!--footer:-->


# JavaScript API

* Promisify your API
* Preprocess arguments in JavaScript
    * convert to appropriate types
    * throw type-mismatch errors, etc.
* Transpile ES2015+ to ES5
* Stick to the `cordova.plugins` namespace
    * Unless creating a polyfill; **window** is crowded!
* Return useful error messages to error callbacks

---


# Native

* Return useful error information
* Use background threads for processing
  * [iOS documentation](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/plugin.html#threading)
  * [Android documentation](https://cordova.apache.org/docs/en/latest/guide/platforms/android/plugin.html#threading)
* Avoid init at app startup unless necessary, but if you need to start up at start, you can:
    ```xml
    <param name="onload" value="true" />
    ```
* Override `onReset` to clean up when web view navigates [^eg^](https://github.com/apache/cordova-plugin-statusbar/blob/master/src/ios/CDVStatusBar.m#L153) [^ios^](https://github.com/apache/cordova-ios/blob/636113f047ee2c7dae742dff2beafae2121ceb62/CordovaLib/Classes/Public/CDVPlugin.m#L154)
[^android^](https://github.com/apache/cordova-android/blob/master/framework/src/org/apache/cordova/CordovaPlugin.java#L348)
---

# Native (Android)

* Override `pluginInitialize` for plugin initialization logic [^code^](https://github.com/apache/cordova-android/blob/master/framework/src/org/apache/cordova/CordovaPlugin.java#L72)

* Runtime Permission Requests (Marshmallow) [^docs^](https://cordova.apache.org/docs/en/latest/guide/platforms/android/plugin.html#runtime-permissions-cordova-android-500)
  * `cordova.requestPermission()` [^code^](https://github.com/apache/cordova-android/blob/master/framework/src/org/apache/cordova/CordovaPlugin.java#L397)
  * `cordova.hasPermission()` [^code^](https://github.com/apache/cordova-android/blob/master/framework/src/org/apache/cordova/CordovaPlugin.java#L407)
  * Override `onRequestPermissionResult` [^code^](https://github.com/apache/cordova-android/blob/master/framework/src/org/apache/cordova/CordovaPlugin.java#L418)
* Don't forget Android activity lifecycle [^docs^](https://cordova.apache.org/docs/en/latest/guide/platforms/android/plugin.html#launching-other-activities) [^code^](https://github.com/apache/cordova-android/blob/master/framework/src/org/apache/cordova/CordovaPlugin.java#L178)

---

# Native (iOS)

* Use `pluginInitialize` for plugin initialization logic [^eg^](https://github.com/apache/cordova-plugin-statusbar/blob/master/src/ios/CDVStatusBar.m#L107) [^code^](https://github.com/apache/cordova-ios/blob/636113f047ee2c7dae742dff2beafae2121ceb62/CordovaLib/Classes/Public/CDVPlugin.m#L83)
* If memory is getting low, `onMemoryWarning` is called [^code^](https://github.com/apache/cordova-ios/blob/636113f047ee2c7dae742dff2beafae2121ceb62/CordovaLib/Classes/Public/CDVPlugin.m#L149)
* If app is going to be terminated, `onAppTerminate` is called [^code^](https://github.com/apache/cordova-ios/blob/636113f047ee2c7dae742dff2beafae2121ceb62/CordovaLib/Classes/Public/CDVPlugin.m#L144)
* You can respond to `pause`, `resume`, etc. [^code^](https://github.com/apache/cordova-ios/blob/636113f047ee2c7dae742dff2beafae2121ceb62/CordovaLib/Classes/Public/CDVPlugin.m#L123), but you have to register for notifications in `pluginInitialize`
* If you need to handle URLs, override `handleOpenURL` [^code^](https://github.com/apache/cordova-ios/blob/636113f047ee2c7dae742dff2beafae2121ceb62/CordovaLib/Classes/Public/CDVPlugin.m#L130)
* Never, _ever_ call JavaScript that triggers blocking UI (e.g. `alert`)

<!--{ul^1:style="font-size:95%"}-->

---


# Miscellaneous

* Don't forget the `browser` platform!
    * Useful when testing on the desktop
    * Mock results if no equivalent browser support

---

![bg o20%](./assets/pics/hook-1943675_1920.jpg)
<!-- footer: Photo by Tama66 (https://pixabay.com/en/users/Tama66-1032521/), courtesy of Pixabay.com-->

# Hook

*noun* A piece of code that hooks into a Cordova process in order to perform some action on behalf of the plugin; see [dev guide](https://cordova.apache.org/docs/en/latest/guide/appdev/hooks/).

Possibilities:

* Create entitlements as needed
* Transform code (transpile, version # replacement, etc.)
* Create launch images and icons
* Check plugin versions and warn if out-of-date
* **Note:** NOT supported by PhoneGap Build

---
<!-- footer -->

# Hook Tips

* **Don't be evil!** Your hook executes on your user's machine!
* `before_prepare` plugin hooks not run on discovery; run the `cordova` command again
* `events.emit("verbose", ...)` and `--verbose` are your friends when troubleshooting

---

![bg o20%](./assets/pics/board-928381_1920.jpg)
<!-- footer: Photo by geralt (https://pixabay.com/en/users/geralt-9301/), courtesy of Pixabay.com-->

# Homework

* Create a new plugin and add it to a Cordova project.
  * Apple Pencil / Stylus support (pressure, tilt)
  * Audio/video processing
  * Faster computation (compared to JavaScript)
* Extend and/or improve an existing plugin
  * Core plugins should adhere to specs when they are available
  * Translate API docs if you know a language other than English
  * Add and improve tests and examples


---
<!--footer: -->

# Questions?

## Thanks!

#### Jesse ([@purplecabbage](https://www.twitter.com/purplecabbage)) &bullet; Kerri ([@kerrishotts](https://www.twitter.com/kerrishotts))

###### Slides available at: https://goo.gl/2xVAwZ

###### Based on Jesse's [PG Day 2016 EU plugin workshop](http://purplecabbage.github.io/slides/pgd16Plugins/index.html)


---

###### This slide intentionally left blank