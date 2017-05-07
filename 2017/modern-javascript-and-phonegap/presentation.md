<!-- $size: 16:9 -->
<!-- page_number: true -->
<!-- $theme: elegant -->
<!-- $prism: default -->


![brighter bg](assets/bg.jpg)

<!-- footer: Image by Pete Linforth (https://pixabay.com/en/users/PeteLinforth-202249/), courtesy of Pixabay.com -->

# Modern JavaScript<br/> and PhoneGap <!--{style="color:white"}-->

##### Kerri Shotts &bullet; [@kerrishotts](https://www.twitter.com/kerrishotts) <!--{style="color:white"}-->
<!--{h5:style="color:white"}-->

##### https://kerrishotts.github.io/pgday/ <!--{style="color:white"}-->

---
<!-- template: light -->

<!-- footer:  -->

# About Me

![66%](./assets/portrait.jpg) <!-- {style='float: right'} -->

* Used PhoneGap for over six years
* Authored Five books about PhoneGap
* Apache Cordova committer
* One of many moderators at:
    * [Cordova Google Group](https://groups.google.com/forum/#!forum/phonegap)
    * [PhoneGap Adobe Forums](http://forums.adobe.com/community/phonegap)

---

> > > **2009**

---

<!-- template: dark -->

![bg fit original](./assets/2009-pres.jpg)

# President of the<br/>United States of America <!--{style='text-align:center; color: white; top: 3em;'}-->

---

<!-- footer: By nvog86 - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=20238837 -->

![bg 50% original](./assets/iphone3gs.jpg)

# iPhone 3GS <!--{style='text-align:center; color: white; top: 3em;'}-->

## iOS 3  <!--{style='text-align:center; color: white; position: relative; top: 2.9em;'}-->

---

<!-- footer: By AlvinPing at English Wikipedia, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=8406455 -->

![bg 50% original](./assets/hero.jpg)

# HTC Hero <!--{style='text-align:center; color: white; top: 3em;'}-->

## Android 1.5  <!--{style='text-align:center; color: white; position: relative; top: 2.9em;'}-->

---

<!-- footer: By Ramaksoud2000 via Chris Williams - Wikipedia via GitHub logo.js, Public Domain, https://commons.wikimedia.org/w/index.php?curid=18434372 -->

![bg 40% original](./assets/JavaScript-logo.png)

# ECMAScript 5 <!--{style='text-align:center; color: white; top: -2.1em;'}-->

---

<!-- template: light -->
<!-- footer: -->

# ES5

* The version we all know and love (~ish?)
* Supported by all modern mobile web views^1^
    * iOS 6+, IE 10+, Edge (forever), Android 4.4+
* Lots of good things:
    * `'use strict';`
    * `map`, `reduce`, `Object.create`, `Object.freeze`, `trim`!
    * JSON parsing

<hr>

1.  http://caniuse.com/#feat=es5

---

> > > **2015**

---

<!-- template: dark -->

![bg fit original](./assets/2009-pres.jpg)

# ***Still*** President of the<br/>United States of America <!--{h1:style='text-align:center; color: white; top: 3em;'}-->

---

# Live Long, and Prosper

## R.I.P. Leonard Nimoy

---

# ES2015 / ES6

---

<!-- template: light -->

# ES2015 (ES6)

It had been quite a while, so the list is long...

 Feature                               | Feature <!-- {tr:style='display:none'} -->
:--------------------------------------|:-----------
Block-scoped `let` &amp; `const` <!-- {td:style='width:50%'} --> | Destructuring and named parms
Default parameters                     | Rest and Spread operator (`...`)
`for...of` loops and Iterators         | Arrow functions (`=>`)
Template strings &amp; interpolation   | Improved literals (object, `0b10`)
Generators (`*`/`yield`)               | Symbols, Maps &amp; Sets, Promises
`class` syntactic sugar &amp; `super`  | Modules (`import`, `export`)

<hr>

1: https://github.com/lukehoban/es6features#readme; **not** a complete representation of _all_ features

---

> > > **2016**

---

<!-- template: dark -->

![bg fit original](./assets/2009-pres.jpg)

# We'll miss you! :cry: <!--{h1:style='text-align:center; color: white; top: 3em;'}-->

---

# Brexit

## Wait... what?

---

# ES2016 / ES7

---

<!-- template: light -->

# ES2016 (ES7)

Fewer features, but still important:

|Feature                               <!-- {tr:style='display:none'} -->|
|:--------------------------------------|
|Exponent (`**`)                        |
|`Array.prototype.incudes()`            |

<hr>

Source: http://www.2ality.com/2016/01/ecmascript-2016.html

---

> > > **2017**

---

<!-- template: dark -->

![bg fit original](./assets/2017-pres.jpg)

# W T F ? <!--{h1:style='text-align:center; color: white; top: 3em;'}-->

---

# ES2017

---

<!-- template: light -->

# ES2017

Finally &mdash; proper string padding!

|Feature                               <!-- {tr:style='display:none'} -->|
|:--------------------------------------|
|`async` / `await`                      |
|String padding :wink:                  |
|Shared memory                          |
|Atomics                                |

<hr>

Source: http://www.2ality.com/2016/02/ecmascript-2017.html

---

# ES2018 and beyond

## https://esdiscuss.org

---

<!-- template: dark -->

![bg original](../../_common/assets/picard/pouting.jpg)

# Before we continue...

---

<!-- template: light -->

# Important Caveats

* ES2015+ is **NOT** a performance optimization
  * See https://kpdecker.github.io/six-speed/ (as of 2017-01-04)

![ES 2015+ performance](./assets/es6perf.png)

---

**Webview**
**ES2015+ Perf**
(Not to scale)

![bg original 80%](./assets/perf1.png?a)

<!--


* **WKWebView** (iOS) single-core performance is **excellent**
* Compared to Safari on MBPr\*
    * iPad Pro 12.9&Prime;: roughly equal
    * iPhone 6s: 2&times; slower
    * iPad Mini 4: 2.5&times; slower

* **Android Webview / Chrome** performance is **slow**; by roughly an order of magnitude
* Compared to Chrome on MBPr:
    * OnePlus One: ~10&times; slower
    * Samsung Tab S 8.4&Prime;: ~33&times; slower


<hr>

**Note:** Results _highly sensitive_ to the JavaScript features in use.

-->

---

<!-- template: dark -->

![bg original](../../_common/assets/picard/double-wtf.jpg)

> #### UIWebView strikes again <!--{style='text-align:center; color: white; position: absolute; left: 0; right: 0; top: 2in;'}-->

---

<!-- template: light -->

<!-- footer: UIWebView's performance is highly dependent upon language features in use. -->

![bg original 95%](./assets/perf2.png)

<!--

# Webviews &amp; Performance (2)

* UIWebView: *ugh*
    * "Slower than molasses in January"
    * e.g: ~75&times; slower on an iPad Pro 12.9&Prime;
    * No JIT :cry:

-->

---

<!-- footer: -->

# Important Caveats, continued

* May require a build step
* Debugging can be "fun"
* Some of the syntax can be a little _sharp_ &mdash; handle with care

---

<!-- template: light -->

# Euuuuggghhhh!!!

## Way to crush my dreams!

---

# Not really....

* Micro-benchmarks aren't the entire story
	* Engines are continually improving

* Actual performance deltas are highly variable 
	* Depends on platform and the language features in use

* Lots of benefits:
	* Expressive and concise
	* Less boilerplate
	* `padStart` and `padEnd`! :wink:

---

# What's to like?

## A quick intro to ES2015+

---

# Dang it, _this!_

<div style='font-size:95%'>

```javascript <!-- highlight=3,6 number -->
var app = {
  text: "Hello, PG Day Attendees!",
  sayHi: function() { alert(this.text); },
  start: function() {
    document.querySelector("#clickme")
      .addEventListener("click", this.sayHi, false);
  }
}

app.start();
```

</div>

---

![bg original](../../_common/assets/picard/brain-freeze.jpg)

<div style="position: absolute; top: 60%; width: 90%; height: 40%; left: 5%; right: 5%; background-color: rgba(255,255,255,1); border-radius: 0.5em; border: 1px solid rgba(0,0,0,0.25); display: flex; flex-direction: column;">
  <div style="line-height: 3.5em; padding: 0.5em; margin: auto; width: 100%;">undefined</div>
  <div style="border-top: 1px solid rgba(0,0,0,0.25); color: hsl(220, 75%, 60%); text-align: right; padding: 0.5em">Close</div>
</div>

<!--
# ![center 250%](./assets/alert-undefined.png)
-->

---

# Arrow functions

<div style='font-size:85%'>

```javascript <!-- number highlight=3,6 -->
class App {
  constructor() { this.text = "Hello, PG Day Attendees!"; }
  sayHi() { alert(this.text); }
  start() {
    document.querySelector("#clickme")
      .addEventListener("click",() => this.sayHi(), false);
  }
}
const app = new App();
app.start();
```

</div>

<hr>

Line 6 ES5 equivalent: `.addEventListener("click", (function() { this.sayHi(); }).bind(this), false)`

---

![bg original](../../_common/assets/picard/picard-day.jpg)

<div style="position: absolute; top: 60%; width: 90%; height: 40%; left: 5%; right: 5%; background-color: rgba(255,255,255,1); border-radius: 0.5em; border: 1px solid rgba(0,0,0,0.25); display: flex; flex-direction: column;">
  <div style="padding: 0.5em; margin: auto; width: 100%; line-height: 3.5em">Hello, PG Day Attendees!</div>
  <div style="border-top: 1px solid rgba(0,0,0,0.25); color: hsl(220, 75%, 60%); text-align: right; padding: 0.5em">Close</div>
</div>

<!--
# ![center 250%](./assets/alert-correct.png)
-->


---

# Template Strings

Single quotes, double quotes, and now... backticks!? Just after I remapped underscore to the backtick, no less!

```javascript
function sayHello(name) {
  return `Hello, ${name}!`;
}

sayHello("World");  // Hello, World!
```

---

# Template Strings

Complex expressions (*use with care*):

```javascript
function sayComplexHello(name) {
  return `Hello, ${name ? name : "Jane Doe"}!`;
}

sayComplexHello("Alex");    // Hello, Alex!
sayComplexHello();          // Hello, Jane Doe!
```

---

# Promises, Promises

More concise with arrow functions:

```javascript
function getPos(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve, reject, options);
  });
}
```

---

# Promises, Promises, Promises

Easier-to-read `then` and `catch`:

```javascript
getPos.then(pos => {
  console.log(JSON.stringify(pos);
}).catch(err => {
  console.error(err);
});
```

---

# Destructuring

Do be careful with how far you nest, though.

```javascript
function gotPos(data) {
  let {timestamp, coords:{latitude, longitude}} = data;
  console.log(`${latitude},${longitude}@${timestamp}`);
}
function gotError(err) {
    console.log(`Error ${err.code}: ${err.message}`);
}
getPos().then(gotPos).catch(gotError);
```

---

# Destructuring

Not just for objects; arrays work too:

```javascript
function divide(a, b) {
  if (b === 0) {
    return [undefined, new Error("Divide by zero")];
  } else {
    return [a / b, null];
  }
}
let [results, error] = someFunction();
```

---

# async / await (ES2017)

```javascript
async function start() {
  try {
    let pos = await getPos(),
        {coords:{latitude, longitude}} = pos;
    console.log(`${latitude}, ${longitude}`);
  } catch(err) {
    console.log(`Error ${err.code}: ${err.message}`);
  }
}
```

<hr>

**Note**: `async` poisons the call tree; all callers must also be `async` or treat the response like a `promise`.

---

# Array-like conversion

If only I had a &euro; for every time I've written:

```javascript
var elList = document.querySelectorAll("a"),
    elArr = [].slice.call(elList, 0);
```

---

# Array-like conversion

Using the standard library:

```javascript
let elArr = Array.from(document.querySelectorAll("a"));
```

Using the spread operator:

```javascript
let elArr = [...document.querySelectorAll("a")];
```

---

# Rest

Easy variable arguments:
```javascript
function sum(start = 0, ...nums) {
  return nums.reduce((acc, val) => acc + val, start);
}
console.log(sum(1, 5, 10, 99)); /* 115 */
```

<!--

---

# Spread/Rest is awesome (...) (2)

Easy sprintf-like:
```javascript
function sprintf(str, ...replacements) {
    return str.match(/\%[0-9]+/g)
        .reduce((a, v) => a.replace(v, 
                            replacements[v.substr(1)]), str);
}
console.log(sprintf ("%1, %0", "world", "hello"));
```
&rArr; Hello, world

-->

---

# Named Parameters & Defaults

```javascript
function getPicture({quality = 50, width = 512, 
                     height = 512} = {}) {
  return new Promise((resolve, reject) => {
    navigator.camera.getPicture(resolve, reject, {
      allowEdit: false,
      correctOrientation: true,
      quality, 
      targetWidth: width, targetHeight: height,      
    });
  });
}
```

---

# Named Parameters & Defaults

```javascript
// use all the defaults
getPicture().then(/*...*/);

// specify only quality
getPicture({quality:75}).then(/*...*/);

// specify only height & width
getPicture({height: 1024, width: 1024}).then(/*...*/)
```

---

# Modules

Static Analysis, FTW!

math.js:

```javascript
export function add(a, b) { return a+b; }
```

index.js:
```javascript
import {add} from "./math.js";
console.log(add(4, 3));      // 7
```

---

# Cool! Where can I use it?

---

# Native support is a moving target

|     OS             |   ES2015   |   ES2016   |   ES2017   |
|-------------------:|-----------:|-----------:|-----------:|
| Android (Chrome)   |  97% (51+) | 100% (55+) |  53% (56+) |
|  Windows (Edge 15) |      100%  |      100%  |       39%  |
|  Windows (Edge 14) |       93%  |         -  |         -  |
|           iOS 10.3 |      100%  |      100%  |       98%  |
|            iOS 10  |      100%  |       61%  |       42%  |
|            iOS  9  |       54%  |         -  |         -  |

<hr>

**Sources**: [ES2015](http://kangax.github.io/compat-table/es6/), [ES2016+](http://kangax.github.io/compat-table/es2016plus/)

---

# The Rise of the Transpilers

These can all transpile ES2015+\* (feature support may vary)

* [Babel](https://babeljs.io) (n&eacute;e es6to5)
* [TypeScript](https://www.typescriptlang.org)
* [Bubl&eacute;](https://buble.surge.sh) \*\*
* [Traceur](https://github.com/google/traceur-compiler)

<hr>

&nbsp;\* **Note:** Not every ES2015+ feature can be transpiled effectively (if at all), such as proxies, shared memory, atomics, built-in subclassing, and tail call elimination. Also, most transpilers need [core-js](https://github.com/zloirock/core-js) to polyfill the standard library.
\*\* Doesn't attempt to transform non-performant or non-trivial ES6 features; _also very young_

---

> ### Remember module support?

---

<!-- template: dark -->

![bg original](../../_common/assets/picard/sigh.jpg)

> ### No Implementation! :scream: <!--{style='text-align:center; color: white; position: absolute; left: 0; right: 0; top: 2in;'}-->

---

<!-- template: light -->

# I lie...

Browsers have _finally_ started shipping implementations:

* Live:
	* Safari 10.1, iOS 10.3
* Behind a flag
	* Edge 15
	* Firefox 54
	* Chrome and Android WebView 60

<hr>

Source: http://caniuse.com/#feat=es6-module

---

# Native Modules

`js/index.js`: 
```javascript
import Game from "./Game.js";
const game = new Game();
game.start();
```

`index.html`: 
```html
<script type="module" src="./js/index.js"></script>
```

---

# There's always a catch

* No "bare" `import`!
	* Must include the path
	* Must include the extension
	* No aliases

A lot of existing ES2015+ imports **do not work in the browser as-is.**

---
<!-- template: dark -->

![bg original](../../_common/assets/picard/yay.jpg)

> ### But we can fix that... <!--{style='text-align:center; color: white; position: absolute; left: 0; right: 0; top: 2in;'}-->


---
<!-- template: light -->

# Module support using Bundling :shopping:

Dependency management & `import`/`export` (and CommonJS, AMD, etc.) support

* [Webpack](https://webpack.js.org)
* [JSPM](http://jspm.io)
* [Browserify](http://browserify.org)

---

# Execution Options

* Manual
    * Just run each tool's CLI... _every time_...
    * Error prone &mdash; you might forget!
* Automatic
    * Task runners (`gulp`, `grunt`, etc.)
    * `npm` scripts
    * Plugin or Project hooks

---

# Automating with npm scripts

<!-- * Determine ES2015+ code location -->

* Pick your bundler and transpiler

    * Bundler: Webpack 2

    * Transpilers: TypeScript &amp; Babel (showing both configs)

* Install Webpack & Transpiler

* Configure Webpack & Transpiler

* Add scripts to `package.json`

---

# Install Webpack

Easy (assuming `package.json` exists):

```sh cli prompt=$
npm install --save-dev webpack
```

---

# Install Transpiler

Typescript:
``` sh cli prompt=$ output=2
npm install --save-dev ts-loader typescript core-js
```

Babel:

```sh cli prompt=$ output=2-4
npm install --save-dev babel-loader babel-core 
  babel-polyfill babel-preset-es2015 
  babel-preset-es2016 babel-preset-es2017 
  babel-plugin-transform-runtime
```

<hr> 

**Note:** `core-js` is a standard library polyfill; depending on your feature use and targets you may not need it.

---

# Configure Transpiler

<div style="columns: 2">

```javascript
// tsconfig.json
{ "compilerOptions": {
    "allowJs": true,
    "target": "es5",
    "module": "es2015", // DCR
    "lib": ["es2015", ...]
    "inlineSourceMap": true
  },
  "include": 
    ["www.src/es/**/*"]
}
```
<!-- {style="font-size:80%"} -->

```javascript
// .babelrc
{ "presets": [
    ["es2015", { 
      "loose": true,
      "modules": false // DCR
    }], 
    "es2016", "es2017"
  ], 
  "plugins":["transform-runtime"]
}
```
<!-- {style="font-size:80%"} -->

</div>

<hr>

\* Don't forget to import `core-js`(ts)/`babel-polyfill` in your `index.?s` if targeting older runtimes. DCR = tree shaking

---

# webpack.config.js

```javascript
module.exports = {
  devtool: "inline-source-map",
  context: path.resolve(__dirname, "www.src"), 
  entry: "./es/index.js",
  output: { 
    filename: "bundle.js", path: 
    path.resolve(__dirname, "www", "js")
  },
  module: { /*...*/ } 
}
```

---

# webpack.config.js (2)

```javascript
module: {
  rules: [ { 
      test: /\.([t|j]sx?)$/,
      exclude: /node_modules/,
      loader: "ts-loader",           // or babel-loader
      options: { entryFileIsJs: true } // excl if babel
    } /*, ... other rules as needed */ 
  ] 
}
```


---

# npm Scripts

```javascript
"scripts": {
  "sim:ios": "webpack -d && cordova emulate ios",
  "run:ios": "webpack -d && cordova run ios",
  "build:ios": "webpack -d && cordova build ios",
  "build:ios:rel": "webpack -p && cordova build ios --release"
}
```
<!-- {style='font-size:89%;'} -->

`-d`: debug
`-p`: production

```sh prompt=$ cli
npm run build:ios
```
<!-- {style='font-size:90%;'} -->

---

# npm Scripts

Simple watch (requires `http-server`, `npm-run-all`), browser testing only (no Cordova/plugin support):

```javascript
"scripts": {
  "_watch:webpack": "webpack -d -w",
  "_watch:serve": "http-server -p 8080 -c-1 www",
  "watch": "run-p _watch:*"
}

```
<!-- {style='font-size:90%;'} -->

```sh prompt=$ cli
npm run watch
```
<!-- {style='font-size:90%;'} -->


---

# Automating with Plugin Hooks

[cordova-plugin-webpack-transpiler](https://github.com/kerrishotts/cordova-plugin-webpack-transpiler) transforms at `prepare`-time.

```sh <!-- prompt=$ output=2,3 cli -->
cordova plugin add cordova-plugin-webpack-transpiler
  --variable CONFIG=typescript|babel|...
```
<!-- {style='font-size:89%'} -->

Executes when `prepare` is called: `build`, `run`, `emulate`, etc.

```sh <!-- prompt=$ cli -->
cordova build ios                # debug mode
cordova build ios --release      # production mode
cordova run ios --notransform    # skip transform/bundling
```
<!-- {style='font-size:89%'} -->

---

# Automating with Templates

 Template | Author | Bundler | Transpiler | Frameworks | Automation
---------:|:------:|:-------:|:----------:|:----------:|:----------:
[cordova-template-webpack-ts-scss](https://github.com/kerrishotts/cordova-template-webpack-ts-scss)| Me | Webpack | TypeScript | Vanilla | `cordova`
[cordova-template-webpack-babel-scss](https://github.com/kerrishotts/cordova-template-webpack-babel-scss)| Me | Webpack | Babel | Vanilla | `cordova`
[cordova-template-framework7-vue-webpack](https://www.npmjs.com/package/cordova-template-framework7-vue-webpack)| centrual | Webpack | Babel | Vue, F7 | `cordova`
[phonegap-template-react-hot-loader](https://www.npmjs.com/package/phonegap-template-react-hot-loader)| devgeeks | Webpack | Babel | React | `npm`
[phonegap-vueify](https://www.npmjs.com/package/phonegap-vueify)| lemaur | Browserify | Babel | Vue | `npm`

<!--{table:style="font-size:77%"}-->


<hr>

Automation: "cordova" = Cordova hooks; "npm" = npm scripts

---

# Linting

`eslint` works just fine with ES2015! (`tslint` for Typescript)

```sh <!-- cli prompt=$ -->
npm install --save-dev eslint
```
<!-- {style='font-size:90%'} -->

`package.json`:
```json5
"scripts": {
  "lint": "eslint www.src/es"
}

```
<!-- {style='font-size:90%'} -->

```sh <!-- prompt=$ cli output=2 -->
npm run lint    # or, write a plugin/project-level hook! ;-)
```
<!-- {style='font-size:90%'} -->

---

# Tests

```sh <!-- cli prompt=$ -->
npm install --save-dev mocha chai
npm install --save-dev ts-node           # for TypeScript
npm install --save-dev babel-register    # for Babel
```
<!-- {style='font-size:90%'} -->

Add `test` to `package.json:scripts`\*

```javascript
"test": "mocha" // TypeScript (needs ./test/_bootstrap.js)
"test": "mocha --compilers js:babel-register"     // Babel
```
<!-- {style='font-size:90%'} -->

```sh <!-- cli prompt=$ -->
npm test
```
<!-- {style='font-size:90%'} -->

<hr>

\* Assumes tests are in `./test`
\_bootstrap.js: `require("ts-node").register();`

---

# Code coverage (Babel)

First, `npm install --save-dev instanbul cross-env nyc`

```javascript
{ // .babelrc
  "presets": ["es2015", ...],
  "plugins": [...],
  "env": { 
    "cover": {
      "plugins": ["transform-es2015-modules-commonjs",
                  "istanbul"]
    }
  } 
}
```
<!-- {style='font-size:85%'} -->

---

# Code coverage (Babel)

```javascript
// package.json
"nyc": {
  "require": ["babel-register"], 
  "reporter": ["text", "html"],
  "sourceMap": false, 
  "instrument": false
},
"scripts": { //...,
  "cover": "cross-env NODE_ENV=cover nyc npm test"
}
```
<!-- {style='font-size:90%'} -->

---

# Tips

* ES5 still works
* Use ES2015+ as needed and when you're ready
* `var` is alive and well
  *  Use where performance is critical (e.g., tight nested loops)
* Declare `const`/`let` at the top of each scope
  * Benefits Chrome's optimizer
  * Good practice anyway
* Arrow functions aren't drop-in

---

# Tips

* Minify & remove dead code for release builds
  * Reduces bundle sizes and startup time
* Split code bundles
  * Vendor code can be separately bundled
  * Easier to blacklist in debuggers
* Use `WKWebView` on iOS for best performance

---

# Resources

* https://esdiscuss.org
* [ECMAScript 2015 Support in Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_2015_support_in_Mozilla)
* [ES2015 Compatibility Table](http://kangax.github.io/compat-table/es6/)
* [2ality - JavaScript and more](http://2ality.com)
* [Can I Use](http://caniuse.com)
* [WebKit Feature Status](https://webkit.org/status/)
* [Chrome Platform Status](https://www.chromestatus.com/features)

---

<!-- template: dark -->

![bg original](../../_common/assets/picard/tongue.jpg)

> ### That's all, folks! <!--{style='text-align:right; color: white; position: absolute; left: 0; right: 0; top: 2in;'}-->

---

<!-- template: light -->


#  Thanks!

#### [@kerrishotts](https://www.twitter.com/kerrishotts)

#### https://kerrishotts.github.io/pgday/

---

###### *This slide intentionally left blank*