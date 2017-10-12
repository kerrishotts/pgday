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
$ cordova plugin add cordova-plugin-device

$ cordova plugin ls                                # or list
cordova-plugin-device 1.1.1 "Device"

$ cordova plugin rm cordova-plugin-device   # or remove
```

> **Note:** As of Cordova 7.x, `--save` is implied, so plugins automatically get saved to your project configuration. Use `--nosave` to disable if needed.

> **Important:** Fetching via npm is now the default as of Cordova 7.x; if a plugin doesn't have `package.json` adding will fail. Use `--nofetch` for those plugins.

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
$ cordova plugin add [--save] /path/to/plugin

$ cordova plugin rm [--save] cordova-plugin-device
```

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