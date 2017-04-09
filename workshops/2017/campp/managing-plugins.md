---
title: Managing Plugins
description: Creating a Modern PhoneGap Plugin Workshop
layout: page
links:
    Up: index.html
    Previous: what-is-a-plugin.html
    Continue: plugin-x-ray.html
---

Whether you are using a core or community plugin or you're developing your own, the commands for adding plugins to your projects remain the same. In order to support various workflows and local development, plugins can be installed from a variety of sources.

# Installing from npm

Plugins are typically downloaded from npm:

```sh
$ cordova plugin add --save cordova-plugin-device

$ cordova plugin ls                                # or list
cordova-plugin-device 1.1.1 "Device"

$ cordova plugin rm --save cordova-plugin-device   # or remove
```

For Cordova CLI versions prior to 7.0.0, you'll typically want to use the `--save` switch, since this persists the plugin and version to your app's `config.xml`. This lets you easily restore plugins later (at `prepare`-time).

For Cordova CLI versions after 7.0.0, plugins are automatically saved to your project's configuration. You'll need to use the `--nosave` switch in order to disable this feature.

# Installing from Git

Plugins can also be installed from a Git repository:

```sh
$ cordova plugin add https://github.com/apache/cordova-plugin-device

$ cordova plugin rm cordova-plugin-device
```

> **Note:** When removing a plugin you will use the plugin's ID, _not the plugin's URL_.

It's useful to specify a branch when testing pre-release plugins, or when testing new features that haven't landed on _master_:

```sh
$ cordova plugin add http://github.com/apache/cordova-plugin-device#branch
```

# Installing from the local file system

Plugins can also be installed from the local file system &mdash; which is very useful during development and testing:

```sh
$ cordova plugin add --save [--link] /path/to/plugin

$ cordova plugin rm --save cordova-plugin-device
```

The `--link` switch is most useful when developing plugins &mdash; it will link various parts of the plugin in your app's structure to the plugin's native code. This makes it easier to develop the plugin, since changes made in the app project can be reflected back to the plugin.

> **Note:** Not _everything_ is linked; we'll cover this later.

> **Tip:** Adding a plugin to a child project (relative to the plugin) automatically symlinks the plugin

> **Warning:** Careful with parent plugins and child projects &mdash; some tools choke on circular references in the file system

# Finding plugins

There are several ways you can find plugins:

* Cordova Plugin Search: <https://cordova.apache.org/plugins>
* npm: <https://www.npmjs.com/search?q=ecosystem:cordova>
* Or, if the CLI is more your thing:

    ```sh
    $ npm install -g npms-cli
    $ npms search cordova-plugin device --size=5
    ┌────────────────────────────────────────────────────────────────────────────────
    │ Package
    ├────────────────────────────────────────────────────────────────────────────────
    │ cordova-plugin-device • https://github.com/apache/cordova-plugin-device
    │ Cordova Device Plugin
    │ updated 2 months ago by shazron
    ├────────────────────────────────────────────────────────────────────────────────
    ```