---
title: Publishing Your Plugin
description: Creating a Modern PhoneGap Plugin Workshop
layout: page
links:
    Up: index.html
    Previous: debugging-and-iterating.html
    Continue: hooks.html
---

Once your plugin has been built, documented, and tested, it's easy to publish it. Plugins are published to the npm repository, but you'll need a `package.json` file to do so.

We already have one for our demo plugin, but if you didn't, `plugman` can create it for you, based on `plugin.xml`:

```sh
$ plugman createpackagejson .
```

> **Note:** If you used the PhoneGap Plugin Template, `package.json` is already there &mdash; you'll need to update it.

Then once you've verified that `package.json` is correct, you can publish simply by doing this:

```sh
$ npm publish
```

And voil&agrave;! You've published a plugin!

> **Note**: You should review your `.npmignore` file _first_ so that you don't force your users to download unnecessary files.

Now comes the hard part: spreading the word and supporting it!