<!-- $size: 16:9 -->
<!-- page_number: true -->
<!-- $theme: gaia -->
<!-- template: invert -->

# Creating Modern PhoneGap Plugins
#### PhoneGap Day EU 2017

<center> 
Jesse MacFadyen (@purplecabbage)

Kerri Shotts (@kerrishotts)

http://www.slidedeck.com/kerrishotts/slides
</center>

---

# About Jesse

* PhoneGap Developer since 2008
* Apache Cordova committer
* at Adobe for nearly 6 years now
* @purplecabbage

---

# About Kerri

* Used PhoneGap for six+ years
* Author of five books about PhoneGap
* Apache Cordova comitter
* @kerrishotts

---

# Who has used Cordova plugins?

* Everyone -- just about everything is a plugin now.
* Since 3.0 (ages ago!)

---

# Managing Remote Plugins

## NPM

```bash
$ cordova plugin add --save cordova-plugin-device
$ cordova plugin ls
    > cordova-plugin-device 1.1.1 "Device"
$ cordova plugin rm --save cordova-plugin-device
```

## GitHub

```bash
$ cordova plugin add --save \
  http://github.com/apache/cordova-plugin-device
$ cordova plugin rm --save cordova-plugin-device
```

---

# Managing Local Plugins

```bash
$ cordova plugin add --save path/to/cordova-plugin-device [--link]
$ cordova plugin rm --save cordova-plugin-device
```

* Use `--link` when developing plugins
	* Changes are reflected automatically!
	* No need to `rm` and `add` again.

---

# Finding Plugins

* https://cordova.apache.org/plugins
* https://plugins.cordova.io
* https://www.npmjs.com/search?q=ecosystem:cordova
* Or, if the CLI is more your thing:

    ```bash
    $ npm install -g npms-cli
    $ npms search cordova-plugin native --size=5
    ┌─────────────────────────────────────────────────────────────────────────────────────────────────┬─────────┬────────────┬─────────────┬───────┐
    │ Package                                                                                         │ Quality │ Popularity │ Maintenance │ Score │
    ├─────────────────────────────────────────────────────────────────────────────────────────────────┼─────────┼────────────┼─────────────┼───────┤
    │ cordova-plugin-device • https://github.com/apache/cordova-plugin-device                         │         │            │             │       │
    │ Cordova Device Plugin                                                                           │   95    │     33     │     100     │  75   │
    │ updated 2 months ago by shazron                                                                 │         │            │             │       │
    ├─────────────────────────────────────────────────────────────────────────────────────────────────┼─────────┼────────────┼─────────────┼───────┤
    ```

---

# "Core" Plugins

 Plugin              | Plugin          | Plugin
:--------------------|:----------------|:----------------
 battery-status      | camera          | console
 contacts            | device          | device-motion
 device-orientation  | dialogs         | file
 file-transfer       | geolocation     | globalization
 inappbrowser        | media           | media-capture
 network-information | splashscreen    | statusbar
 vibration           | whitelist
 
Some plugins are internal to a platform, and others are "lab" plugins.

---

# Community Plugins

#### https://cordova.apache.org/plugins
#### ~1,960 plugins (– core)

#### http://www.plugreg.com
#### ~1,592 plugins (– core)

#### http://plugins.telerik.com/cordova
#### ~77 plugins

---

# Creating Plugins

## `plugin.xml` defines your plugin

* A "plugin id" for registration, discover, `add` and `rm`
* A version number, author, repository – similar to `package.json`
* A list of supported platforms
	* Native headers, source files, resources, JavaScript files, etc.
* Configuration preferences, permissions 
* `js-modules`: the entry point for the plugin
* Hooks

---

# Quick Plugin Walkthrough
## [cordova-plugin-device](http://github.com/apache/cordova-plugin-device)

---

# Who has used `plugman`?

* Everyone! You just might not know it.
* `plugman` is a `node` library that manages plugins in your Cordova and PhoneGap projects
* `cordova-cli`, `phonegap-cli`, etc., use `plugman` internally

```bash
$ npm install -g plugman
$ plugman install --plugin cordova-plugin-device --platform ios --project .
```

---

# `plugman` can create plugins, too!

```bash
$ plugman create --name PluginName --plugin_id cordova-plugin-plugin-name \
  --plugin_version 0.0.1 --path .
```

* Can pass `--variable-name=value` pair string to define additional data like author, etc.

---

# Dependencies

* Plugins can depend upon other plugins

    ```xml
    <dependency id="cordova-plugin-device"></dependency>
    <dependency id="cordova-plugin-console"></dependency>
    ```

<!-- make sure to include an example with version information -->

---

# Plugin Functionality

```javascript
cordova.exec(successFn, failureFn, "PluginName", "pluginMethod", [<args>]);
```

```xml
<!-- in plugin.xml -->
<feature name="PluginName">
    <param name="ios-package" value="CDVPluginClass" />
    <param name="onload" value="true" />
</feature>
```

```objc
// in CDVPluginClass.m
- (void) pluginMethod:(CDVInvokedUrlCommand*)command {
    // do something useful
}
```

---

# Example

```javascript
cordova.exec(null, null, "StatusBar", "styleDefault", []);
```

```xml
<!-- in plugin.xml -->
<feature name="StatusBar">
    <param name="ios-package" value="CDVStatusBar">
    <param name="onload" value="true">
</feature>
```

```objc
// in CDVStatusBar.m
- (void) styleDefault:(CDVInvokedUrlCommand*)command {
    [self setStyleForStatusBar:UIStatusBarStyleDefault];
}
```

---

# Returning data back to JavaScript

```objc
// in CDVStatusBar.m
(void)fireTappedEvent {

    if (_eventsCallbackId == nil) { return; }

    NSDictionary* payload = @{@"type": @"tap"};

    CDVPluginResult* result = [CDVPluginResult 
        resultWithStatus:CDVCommandStatus_OK  
        messageAsDictionary:payload];

    [result setKeepCallbackAsBool:YES];

    [self.commandDelegate sendPluginResult:result 
        callbackId:_eventsCallbackId];
}
```

---

# A Walk through the iOS Bridge

---

# Publishing your plugin

* `npm` is the home of all core Cordova plugins
* If you want to publish to `npm`, you'll need a `package.json`
* `plugman` can do that for you too!

    ```bash
    $ plugman createpackagejson path/to/my/plugin
    $ npm publish
    ```

---

# What can plugins do?

* Anything you can do with native code, and more!
* Can add functionality at various times:
    * runtime
    * build time
    * install time

---

# Plugins at runtime

* Expose native device features
    * Push notifications
    * Native social network sharing 
* Use native UI Widgets
    * [Microsoft ACE](https://github.com/Microsoft/ace)
* Provide hooks for quality assurance, logging, etc.
* Analytics
* Faster computations

---

# Plugins at build time

* Could transpile ES2017 or Typescript to ES5
* SASS/less pre-processing
* Image inlining / webpack
* ... or code analysis
    * code coverage,
    * linting,
    * quality checks
* Can even modify the project itself
    * [cordova-plugin-ios-launch-screen](https://github.com/kerrishotts/cordova-plugin-ios-launch-screen/tree/2.0.0) proof of concept

---

# Plugins at install time

* Could bundle other plugins
* Or, could provide tests for another plugin...

<center>
<h1><em>Plugin-ception</em></h1>
</center>

---

# A more complex plugin demo

## [phonegap-plugin-sidebar](http://github.com/purplecabbage/phonegap-plugin-sidebar)

### This plugin includes a demo

#### Demo issue with statusbar and sidebar

---

# Note how that demo was installed!

## The `--link` in the demo instructions was _important_

---

# Testing plugins

`cordova-medic` is a test tool designed to run all the core Cordova plugin tests as part of Cordova's continuous integration system

* Tests are written in Jasmine 2.0
* Tests run asynchonously
* Plugins have a dependent test plugin which is installed separately
    * Usually in `/tests` by convention 

* [cordova-plugin-device](http://github.com/apache/cordova-plugin-device)

* Many of these pieces of `cordova-medic` are reusable, so Jesse spun them into another purpose-based tool...

--- 

# `cordova-paramedic`

## provides advanced levels of care at the point of illness or injury, including out-of-hospital treatment, and diagnostic services

```bash
$ cordova-paramedic --platform ios --plugin .
```

---

# Automates Jasmine Tests

* Creates a new project (in temporary location)
* Adds the platform specified (`ios`, `android`, `windows`, etc.)
* Installs the `cordova-plugin-test-framework` plugin
* Installs the plugin specified (in `.`)
* Installs the plugin's tests (in `./tests`)
* Sets the start page to `cordova-plugin-test-framework`'s test runner page
* Creates a local server to listen for results posted from the runner
* Exists with success/fail based on results

---

# Caveats

* Only supports npm-published platforms

```bash
# this is going to fail at the moment
$ cordova-paramedic --platform /path/to/cordova-ios --plugin .
```

---

# How to write tests

* Copy a core plugin – we all do it!
* Create a `tests` folder in your plugin's repository
* Add a `plugin.xml` file

---

# Debugging native code in Xcode

--- 

# Debugging Windows JS Code in Visual Studio

## (note to self: start your VM!)

---

# The Windows Bridge

* There isn't one
* JavaScript is a first-class citizen
* Windows `exec` uses a proxy
* [cordova-plugin-device](http://github.com/apache/cordova-plugin-device)

---

# Publishing your plugin

* `npm publish`
* Shine! Profit!

---

# Docs

* You should include documentation so that users know how to use your plugin
* Look at any of the "core" plugins for best practices
* Convention:
    * English docs in the root `README.md` file
    * Translations in the `docs/` folder

---

# Hooks

## Great guide here:

### https://cordova.apache.org/docs/en/latest/guide/appdev/hooks/


## Cool example:

### https://github.com/stevengill/es6-phonegap

---

# Homework

* Extend a plugin – Remix it, remux it, etc.
* For example, the globalization plugin's API is asynchronous, which is really irritating.
    * All the formatting / globalization information could be determined up-front, and then the API could be synchronous!

* https://github.com/apache/cordova-plugin-globalization

---

# Questions?

## https://www.twitter.com/purplecabbage

## https://www.twitter.com/kerrishotts

---

# A few more things...

* Some platforms support plugins that are separate projects
* Some plugins reference third-party libraries
* Cocoapod support is now in iOS
* Gradle support exists in Android; plugins can actually be AARs