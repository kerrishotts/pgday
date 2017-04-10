---
title: Plugin Hooks
description: Creating a Modern PhoneGap Plugin Workshop
layout: page
links:
    Up: index.html
    Previous: publishing.html
    Continue: tips.html
---

Hooks aren't solely related to plugins &mdash; Cordova projects can have project-level hooks too. Plus, hooks can be pretty advanced, so they're a little beyond our scope in this workshop. Even so, I wanted to mention them so you would be aware of them in case you ever need to add them to your plugin.

# What is a hook?

> *noun* A piece of code that hooks into a Cordova process in order to perform some action on behalf of the plugin; see [dev guide](https://cordova.apache.org/docs/en/latest/guide/appdev/hooks/).

Hooks can execute at many different times (triggered by a Cordova CLI command), but you'll usually use an `after_plugin_install` hook or a `before_prepare`, `after_prepare`, or `before_build` hook. Hooks run within your consumer's development environment, so you do need to be very careful with what your hook does &mdash; please, don't be evil.

So what might you use a hook to accomplish?

* Create entitlements as needed
* Transform code (transpile, version # replacement, etc.)
* Create launch images and icons
* Check plugin versions and warn if out-of-date

I should note, however, that hooks are NOT supported by PhoneGap Build, so if you need to support PGB, either make the hook a value-add, or don't use hooks at all.

If you want an example a plugin that uses hooks, check out one of my plugins: [cordova-plugin-webpack-transpiler](https://github.com/kerrishotts/cordova-plugin-webpack-transpiler)
