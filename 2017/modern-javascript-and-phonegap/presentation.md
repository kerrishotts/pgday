<!-- $size: 16:9 -->
<!-- page_number: true -->
<!-- $theme: elegant -->
<!-- $prism: default -->


![bg](assets/bg.jpg)

<!-- footer: Image by Pete Linforth (https://pixabay.com/en/users/PeteLinforth-202249/), courtesy of Pixabay.com -->

# Modern JavaScript and PhoneGap

## PhoneGap Day EU 2017

###### Kerri Shotts &bullet; [@kerrishotts](https://www.twitter.com/kerrishotts)

---
<!-- template: light -->

<!-- footer: https://github.com/kerrishotts/pgday/2017/modern-javascript-and-phonegap -->

# Hi!

![50%](./assets/portrait.jpg) <!-- {style='float: right'} -->

* Used PhoneGap for over six years
* Authored Five books about PhoneGap
* Apache Cordova committer
* One of many moderators:
    * [Cordova Google Group](https://groups.google.com/forum/#!forum/phonegap)
    * [PhoneGap Adobe Forums](http://forums.adobe.com/community/phonegap)
* I love retro technology! :-)

---

# Modern JavaScript Versions

---

# Remember ECMAScript 5?

Release year: 2009

* The version we all know and love (~ish?)
* Supported by all modern mobile web views^1^
    * iOS 6+, IE 10+, Edge (forever), Android 4.4+
* Reasonably modern (`map`, `reduce`, getters/setters, etc.)
* Things have changed a lot since then...

<hr>

1.  http://caniuse.com/#feat=es5

---

Version| Feature                               | Feature <!-- {tr:style='display:none'} -->
------:|:--------------------------------------|:-----------
2015^1^|Block-scoped `let` & `const` <!-- {td:style='width:45%'} --> | Destructuring and named parms
       |Default parameters                     | Rest and Spread operator (`...`)
       |`for...of` loops and Iterators         | Arrow functions (`=>`)
       |Template strings & interpolation       | Improved literals (object, `0b10`)
       |Generators (`*`/`yield`)               | Symbols, Maps & Sets, Promises
       |`class` syntactic sugar & `super`      | Modules (`import`, `export`)
2016^2^|Exponent (`**`)                        | `Array.prototype.incudes()`
2017^3^|`async` / `await`                      | String padding :wink:
       |Shared memory                          | Atomics
<!-- {table:style='font-size:83.25%'} -->

<hr>

1. https://github.com/lukehoban/es6features#readme; the list here is not a complete representation of _all_ features
2. http://www.2ality.com/2016/01/ecmascript-2016.html
3. http://www.2ality.com/2016/02/ecmascript-2017.html

---

## Before we go any further...

# Some Very Important Caveats!

---

# Caveats

* ***NOT*** a performance optimization
* Adds a build step
* Debugging can be... interesting

   <!--
   * Source maps _help_, but sometimes quirky
   * Getting better
   -->

* Best iOS performance requires `WKWebView`

   <!--
   * `UIWebView` performance is _abysmal_
   -->
   
* May need some time to use effectively

---

<style>
    td.bad {
        background-color: hsl(45, 75%, 50%) !important;
    }
    td.abysmal {
        background-color: hsl(350, 75%, 50%) !important;
        color: white !important;
    }
    td.good {
        background-color: hsl(140, 100%, 33%) !important;
    }
    td.great {
        background-color: hsl(140, 75%, 50%) !important;
        color: white !important;
    }
</style>

<table style="font-size:82%; text-align: center">
  <thead>
    <tr>
      <th align="right">Performance Change</th><th>Chrome 55</th><th>Edge 15</th><th>Safari 10</th>
    </tr>
  </thead>
  <tbody>
    <tr><th align="right">Arrow functions  </th><td>N/C</td><td class="good">+1.2x</td><td>N/C</td></tr>
    <tr><th align="right">let compound     </th><td class="bad">-1.6x</td><td>N/C</td><td>N/C</td></tr>
    <tr><th align="right">Classes          </th><td>N/C</td><td class="bad">-1.5x</td><td>N/C</td></tr>
    <tr><th align="right">super            </th><td class="bad">-4x</td><td class="bad">-1.7x</td><td class="abysmal">-15x</td></tr>
    <tr><th align="right">Destructuring    </th><td class="abysmal">-16x</td><td class="abysmal">-53x</td><td class="abysmal">-23x</td></tr>
    <tr><th align="right">for ... of array </th><td class="abysmal">-17x</td><td class="bad">-7x</td><td class="bad">-1.3x</td></tr>
    <tr><th align="right">for ... of object</th><td class="bad">-1.8x</td><td class="bad">-4x</td><td class="bad">-2.3x</td></tr>
    <tr><th align="right">Map &amp; Set    </th><td class="bad">-4x</td><td class="abysmal">-23x</td><td class="bad">-8x</td></tr>
    <tr><th align="right">rest             </th><td class="good">+1.3x</td><td class="great">+14x</td><td class="abysmal">-33x</td></tr>
    <tr><th align="right">spread           </th><td class="abysmal">-22x</td><td class="bad">-1.7x</td><td class="bad">-5x</td></tr>
    <tr><th align="right">Template string  </th><td class="bad">-1.2x</td><td class="good">+1.4x</td><td class="abysmal">-18x</td></tr>
  </tbody>
</table>

<hr>

Source: https://kpdecker.github.io/six-speed/ (2017/01/04) | N/C: "no change"

---

# Don't Despair!

Don't let those numbers scare you!

* Micro-benchmarks don't always reflect the real world
* Performance is steadily improving
* Capable of running an emulator at full tilt
    * ... on iOS using `WKWebView` (JIT compilation FTW)

---

## Some unscientific numbers

|     Device               | GB4 | Web View   | Mode  | ES6 IPF (mips) | ES5 IPF (mips) | ES3 IPF (mips) |
|-------------------------:|----:|:----------:|:-----:|---------------:|---------------:|---------------:|
| MacBook Pro              | 3574| Safari 10  |  reg  |` 75650 (4.51)` |` 79783 (4.75)` |` 78381 (4.67)` |
|                          |     |            |  min  |` 72167 (4.30)` |` 80301 (4.77)` |` 72953 (4.35)` |
| iPad&nbsp;Pro&nbsp;12.9" | 3000| Safari 10  |  reg  |` 81344 (4.88)` |` 81720 (4.89)` |` 83584 (5.01)` |
|                          |     |            |  min  |` 80542 (4.83)` |` 72315 (4.34)` |` 81182 (4.87)` |
| iPad Mini 4              | 1638| Safari 10  |  reg  |` 32791 (1.97)` |` 36222 (2.17)` |` 39195 (2.35)` |
|                          |     |            |  min  |` 36501 (2.19)` |` 38676 (2.32)` |` 36715 (2.20)` |
| Tab S 8.4"               |  783| Chrome 54  |  reg  |`  2614 (0.13)` |`  3350 (0.17)` |`  2394 (0.11)` |
|                          |     |            |  min  |`  2847 (0.14)` |`  3557 (0.19)` |`  1950 (0.09)` |
| iPad&nbsp;Pro&nbsp;12.9" | 3000| UIWebView  |  reg  |`   100 (0.01)` |`   100 (0.01)` |`   100 (0.01)` |
|                          |     |            |  min  |`   100 (0.01)` |`   100 (0.01)` |`   100 (0.01)` |
<!-- {table:style='font-size:70%'} -->

<!--
| iPhone 6s        | 2474| Safari 10  |  reg  |  41 552 (2.49) |  43 811 (2.63) |  42 912 (2.57) |
|                  |     |            |  min  |  41 773 (2.50) |  41 285 (2.48) |  41 411 (2.47) |
-->


<hr>

**Note:** Of course, this is _highly sensitive_ to the ES2015+ features that you use.
MacBook Pro: Late 2014, 2.2GHz i7 16GB RAM; _GB4_ = Geekbench 4 single-core score; _min_ = minified & dead code removed

---

# A whirlwind tour

---

# Dang it, _this!_

<div style='font-size:95%'>

```javascript <!-- highlight=3,6 number -->
var app = {
  text: "Hello, PhoneGap Day Attendees!",
  sayHi: function() { alert(this.text); },
  start: function() {
    document.getElementById("clickme")
      .addEventListener("click", this.sayHi, false);
  }
}

app.start();
```

</div>

---

# Wah wah :no_entry_sign:

<div style="position: absolute; top: 30%; width: 90%; height: 40%; left: 5%; right: 5%; background-color: white; border-radius: 0.5em; border: 1px solid rgba(0,0,0,0.25); display: flex; flex-direction: column; box-shadow: 0 0 20px 0 rgba(0,0,0,0.1);">
  <div style="padding: 0.5em; margin: auto; width: 100%;">undefined</div>
  <div style="border-top: 1px solid rgba(0,0,0,0.25); color: hsl(220, 75%, 60%); text-align: right; padding: 0.5em">Close</div>
</div>

<!--
# ![center 250%](./assets/alert-undefined.png)
-->

---

# Arrow functions (=>) & Classes

<div style='font-size:75%'>

```javascript <!-- number highlight=7,9 -->
class App {
  constructor({text = "Hello, world!"} = {}) {
    this.text = text;
  }
  start() {
    document.getElementById("clickme")
        .addEventListener("click", () => this.sayHi(), false);
  }
  sayHi() { alert(this.text); }
}
const app = new App({text: "Hello, PhoneGap Day Attendees!"});
app.start();
```

</div>

<hr>

ES5 equivalent: `(function() { this.sayHi(); }).bind(this)`

---

# Hi! :tada:

<div style="position: absolute; top: 30%; width: 90%; height: 40%; left: 5%; right: 5%; background-color: white; border-radius: 0.5em; border: 1px solid rgba(0,0,0,0.25); display: flex; flex-direction: column; box-shadow: 0 0 20px 0 rgba(0,0,0,0.1);">
  <div style="padding: 0.5em; margin: auto; width: 100%;">Hello, PhoneGap Day Attendees!</div>
  <div style="border-top: 1px solid rgba(0,0,0,0.25); color: hsl(220, 75%, 60%); text-align: right; padding: 0.5em">Close</div>
</div>

<!--
# ![center 250%](./assets/alert-correct.png)
-->

---

# Array-like conversion

ES5 requires `slice`:

```javascript
var elList = document.querySelectorAll("a"),
    elArr = [].slice.call(elList, 0);
```

ES2015+ (with the standard library):

```javascript
let elArr = Array.from(document.querySelectorAll("a"));
```

---

# Spread/Rest is awesome (...)

Even shorter than `Array.from`:

```javascript
let elArr = [...document.querySelectorAll("a")];
```

Easy variadic arguments:
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

# Destructuring

```javascript
[a, b] = [b, a]  // swap!
```
<!-- {style='font-size:90%'} -->

"Multiple return values":

```javascript
function duplicate(str) {
  return {result: str + str, 
          error: !str ? "no string" : null};
}

let {result, error} = someFunction("abc");
let {result:r, error:err} = someFunction("acb"); // you can rename
let {result} = someFunction("abc");              // or even ignore!
```
<!-- {style='font-size:80%'} -->

---

# Named Parameters & Defaults

```javascript
class Button {
  constructor({type = "default", text = "", 
               x = 0, y = 0, w = 100, h = 44} = {}) {
    this.type = type;
    this.text = text;
    this.frame = {x, y, w, h};
    this.bounds = {x: 0, y: 0, w, h};
  }
}
let button = new Button ({type: "round", text: "Click me",
                          x: 100, y: 100});
```
<!-- {style='font-size:90%'} -->

---

# Template Strings

```javascript
let x = 4, y = 10;
console.log(`x + y => ${x} + ${y} => ${x + y}`); 
```

&rArr; x + y => 4 + 10 => 14

Multi-line strings (preserving &crarr;):

```javascript
let template=`<ul>
    <li><span></span></li>
</ul>`;
```

---

<!--

# Sets and Maps

Easy Dedup:

```Javascript
function dedup (arr = []) {
    return Array.from(new Set(arr));
}
```

---

-->

# Promises, promises

Hopefully already familiar to you...

```javascript
function requestFileSystem({type = window.PERSISTENT, 
                            quota = 5 * 1024 * 1024} = {}) {
  return new Promise((resolve, reject) => {
    window.requestFileSystem(type, quota, resolve, reject);
  });
}
```
<!-- {style='font-size:90%'} -->

But ES2017 has something better...

---

# async / await

```javascript
async function readFile(name) {
  const fs = await requestFileSystem({
    type: window.PERSISTENT, quota: 10 * 1024 * 1024});
  return await readFile(await fs.getFile(name));
}
async function start() {
  try {
    const data = await readFile("poem.txt");
    readPoemAloud(data);
  } catch (err) { 
    alert (err); 
  }
}
```
<!-- {style='font-size:80%'} -->

<!--
    async declares that a function is asynchronous -- that it will use await.
    note: async does tend to poison the call chain -- all functions in the call
          stack MUST be async or treat return value as a promise.
    await waits for a promise to resolve
    return value of async function IS a promise
    errors and rejections can be handled with try/catch
-->

<!--

---

# Classes

```javascript
const _BUTTON_TYPE = Symbol("Button Type");
class Button extends Widget {
    constructor({type = "rounded", frame} = {}) {
        super({frame});
        this[_BUTTON_TYPE] = type;
    }
    get buttonType() {
        return this[_BUTTON_TYPE];
    }
    set buttonType(type) {
        this[_BUTTON_TYPE] = type;
    }
}
```
<!-- {style='font-size:75%'} -->

-->

---

# Modules

Static Analysis, FTW!

:page_facing_up: math.js:

```javascript
export function add(a, b) { 
    return a+b; 
}
```
<!-- {style='font-size:90%'} -->

:page_facing_up: index.js:
```javascript
import {add} from "math.js";
console.log(add(4, 3)); /* 7 */
```
<!-- {style='font-size:90%'} -->

---

# PhoneGap Examples

---

### Geolocation with ES2017

```javascript
function getLoc(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(p => resolve(p), 
      reject, options);
  });
}
async function start() {
  try {
    const {timestamp, coords:{latitude, longitude}} = await getLoc();
    console.log(`At ${latitude}, ${longitude} on ${timestamp}`);
  } catch(err) {
    console.log(`Error ${err.code}: ${err.message}`);
  }
}
```
<!-- {style='font-size:75%'} -->

---

### File Transfer with ES2017

```javascript
function uploadFile({source, target, options} = {}) {
  return new Promise((resolve, reject) => (new FileTransfer()).
    upload(url, to, resolve, reject, options));
}
async function start() {
  try {
   const {responseCode, response, bytesSent} = uploadFile({
      url: "cdvfile://localhost/persistent/test.txt",
      to: "http://www.example.com/upload.php",
      options: { mimeType: "text/plain",
                  fileKey: "file", fileName: "test" }});
  } catch (err) { /* do something with the error */ }
}
```

<!-- {style='font-size:80%'} -->

<!--

---

### Do you sense a pattern?

```javascript
function promisify(fn, thisArg = this, {split = 0} = {}) {
  return function __promisified__(...args) {
    const afterArgs = args.splice(split), beforeArgs = args;
    return new Promise((resolve, reject) => {
      try {
        fn.apply(thisArg, beforeArgs.concat(resolve, reject, 
          ...afterArgs));
      } catch (err) { resolve(err); }
    });
  }
}
```

--> 

<!-- {style='font-size:90%'} -->

<!-- 
---

### Easy wrappers for Cordova plugin APIs! \*

```javascript
const getLoc = promisify(
  navigator.geolocation.getCurrentPosition, 
  navigator.geolocation // "this" arg
);
const {timestamp, coords:{latitude, longitude}} = await getLoc();

const ft = new FileTransfer();
// upload signature: url, to [split], success, error, options
const uploadFile = promisify(ft.upload, ft, {split: 2});
const r = await uploadFile(url, to, options);
```
-->

<!-- {style='font-size:85%'} -->

<!--

<hr>

\* Applies to Cordova plugin APIs that use the success, error form; could be made more generic

---

-->

# Where can I use this now?

---

# Native support (%coverage)

|     OS             |   ES2015   |   ES2016   |   ES2017   |
|-------------------:|-----------:|-----------:|-----------:|
| Android (Chrome)   |  97% (51+) | 100% (55+) |  53% (56+) |
|           Edge 15  |      100%  |      100%  |       39%  |
|           Edge 14  |       93%  |         -  |         -  |
|           iOS 11\* |      100%  |      100%  |       98%  |
|            iOS 10  |      100%  |       61%  |       42%  |
|            iOS  9  |       54%  |         -  |         -  |

<hr>

\* Based on current status in Safari Technological Preview 11
**Note**: Some of the tests based on existence, not completeness.
**Sources**: [ES2015](http://kangax.github.io/compat-table/es6/), [ES2016](http://kangax.github.io/compat-table/es2016plus/), [ES2017](http://kangax.github.io/compat-table/esnext/)

---

## But, I want it everywhere!

# ES2015+ &rArr; ES5 :smile: :dancer:

## or, *The Rise of the Transpilers*

---

# Common Transpilers

These can all transpile ES2015\* (feature support may vary)

* [Babel](https://babeljs.io) (n&eacute;e es6to5)
* [TypeScript](https://www.typescriptlang.org)
* [Bubl&eacute;](https://buble.surge.sh) \*\*
* [Traceur](https://github.com/google/traceur-compiler)

<hr>

&nbsp;\* **Note:** Not every ES2015+ feature can be transpiled effectively (if at all), such as proxies, shared memory, atomics, built-in subclassing, and tail call elimination
&nbsp;\* **Note:** Most transpilers need [core-js](https://github.com/zloirock/core-js) to polyfill the standard library.
\*\* Doesn't attempt to transform non-performant or non-trivial ES6 features; _also very young_

---

# Re: Module syntax

_No implementation!_ :scream: <!-- {p^0:style='font-size:300%; text-align: center'} --> 


## But we can fix that... <!-- {h2^0:style='font-size:200%; text-align: center'} --> 

---

# Module support using Bundling :shopping:

Dependency management & `import`/`export` (and CommonJS, AMD, etc.) support

Bundler                              | Babel | Bubl&eacute; | Coffee | Typescript | Traceur |
------------------------------------:|:-----:|:------------:|:------:|:---------:|:---------:
[Webpack](https://webpack.js.org)    |&check;| &check;      | &check;| &check; | &check;
[JSPM](http://jspm.io)               |&check;| &mdash;      | &mdash;| &check; | &check;
[Browserify](http://browserify.org)  |&check;| &check;      | &check;| &check; | &check;

Plugins exist for just about every transpiler if you look hard enough.

---

# PhoneGap Integration

* Manual
    * Just run each tool's CLI... _every time_...
    * Error prone &mdash; you might forget!
* Automatic
    * `gulp` / `grunt` task runners
    * `npm run` scripts
    * Plugin / Project hooks

---

# Setting up (npm run scripts)

* Determine ES2015+ code location

* Install Webpack & Transpiler

* Configure Webpack & Transpiler

* Add build scripts to `package.json`

---

<div style="columns:2">

## Sibling Structure

* :file_folder: `project-root/`
    * :page_facing_up: `config.xml`
    * :file_folder: `www/`
        * :page_facing_up: `index.html`
        * :file_folder: `(ts|es)/`
            * :page_facing_up: `index.(ts|js)`
        * :file_folder: `js/`
            * :page_facing_up: `bundle.js` &larr; (gen)

<!-- {ul^4:class='no_bullets'} -->

## External Structure

* :file_folder: `project-root/`
    * :page_facing_up: `config.xml`
    * :file_folder: `www.src/`
        * :page_facing_up: `index.html`
        * :file_folder: `(ts|es)/`
            * :page_facing_up: `index.(ts|js)`
    * :file_folder: `www/`
        * :page_facing_up: `index.html` &larr; (copied)
        * :file_folder: `js/`
            * :page_facing_up: `bundle.js` &larr; (gen)

<!-- {ul^5:class='no_bullets'} -->
<!-- {ul^5:style='font-size:80%'} -->

</div>

---

# Install Webpack & Transpiler

```sh cli host=dev
npm install --save-dev webpack
```
<!-- {style='font-size:69%'} -->

Typescript:
``` sh cli host=dev output=2
npm install --save-dev ts-loader typescript core-js
```
<!-- {style='font-size:69%'} -->

Babel:

```sh cli host=dev output=2,3
npm install --save-dev babel-loader babel-core babel-polyfill \
  babel-preset-es2015 babel-preset-es2016 babel-preset-es2017 \ 
  babel-plugin-transform-runtime
```
<!-- {style='font-size:69%'} -->

<hr> 

**Note:** `core-js` is a standard library polyfill; depending on your feature use and targets you may not need it.

---

# Configure TypeScript

Create `tsconfig.json`:

```javascript
{
  "compilerOptions": {
    "allowJs": true,
    "target": "es5",        // es2015, es5, es3
    "module": "es2015",     // required for tree shaking
    "inlineSourceMap": true
  },
  "include": [
    "www.src/es/**/*"       // or www/es/**/* if sibling
  ]                           // "ts" if using typescript features
}
```
<!-- {style="font-size:79%"} -->

---

# Configure Babel

Create `.babelrc`:

```javascript
{
  "presets": [ 
    ["es2015", { 
      "loose": true,   // best performance
      "modules": false // required for tree shaking
    }], "es2016", "es2017"
  ],
  "plugins": ["transform-runtime"] // reduces repetition in bundle
}
```
<!-- {style="font-size:83%"} -->

---

# Configure Webpack

Create `webpack.config.js`:

```javascript
module.exports = {
  devtool: "inline-source-map",
  context: path.resolve(__dirname, "www.src"), // if sibling, use   __dirname, "www"
  entry: "./" + path.join("es", "index.js"),   // will fail without ./!; ts if typescript
  output: { filename: "bundle.js",
            path: path.resolve(__dirname, "www", "js") },
  module: { loaders: [{
              test: /\.(ts|js|jsx)$/,          // remove ts for babel
              loader: 'ts-loader',             // or babel-loader
              exclude: /node_modules/,
              options: { entryFileIsJs: true } // only for js with typescript
          }] 
  } 
}
```
<!-- {style='font-size:62%;'} -->

---

# Add run script to package.json
(assuming `cordova` and `webpack` are installed locally)

```json5
"scripts": {
    "build:ios": 
         "webpack && cordova build ios"
}
```
<!-- {style='font-size:90%'} -->

<br/>

```sh host=dev cli
npm run build:ios
```
<!-- {style='font-size:90%'} -->

<hr> 

Note: if using _sibling_ layout, you might want to delete the duplicate code in the platform `www/es` folders. Otherwise, you'll end up copying your ES2015+ code _and_ the resulting bundle to the app bundle.

---

# Magic!

[cordova-plugin-webpack-transpiler](https://github.com/kerrishotts/cordova-plugin-webpack-transpiler) can do this on `prepare`.

```sh <!-- host=dev output=2,3 cli -->
cordova plugin add --save \ 
  cordova-plugin-webpack-transpiler \
  --variable CONFIG=typescript|babel
```
<!-- {style='font-size:90%'} -->

Or, you can use templates, too:

* Typescript: [cordova-template-webpack-ts-scss](https://github.com/kerrishotts/cordova-template-webpack-ts-scss)
* Babel: [cordova-template-webpack-babel-scss](https://github.com/kerrishotts/cordova-template-webpack-babel-scss)

<hr>

Fork, translate, and/or improve it: https://github.com/kerrishotts/cordova-plugin-webpack-transpiler
    
---

# What about tests?

# ... and code coverage?

# ... and linting?

---

# Tests

```sh <!-- cli host=dev -->
npm install --save-dev mocha chai
npm install --save-dev ts-node        # for TypeScript
npm install --save-dev babel-register # for Babel
```
<!-- {style='font-size:80%'} -->

Add `test` to `package.json:scripts`\*

```javascript
"test": "mocha" // TypeScript (need ./test/_bootstrap.js)
"test": "mocha --compilers js:babel-register"   // Babel
```
<!-- {style='font-size:90%'} -->

Then `npm test`

<hr>

\* Assumes tests are in `./test`
\_bootstrap.js: `require("ts-node").register();`

---

# Code coverage (Babel)

`npm install --save-dev instanbul`, then in `.babelrc`:

```javascript
{ 
  "presets": ["es2015", ...],
  "plugins": ["transform-es2015-modules-commonjs", ...]
  "env": { 
    "test": {
      "plugins": ["istanbul"]
    }
  } 
}
```
<!-- {style='font-size:90%'} -->

---

# Code coverage (Babel, 2)

`npm install --save-dev cross-env nyc` and configure (in `package.json`):

```javascript
"nyc": {
  "require": ["babel-register"],
  "reporter": ["text", "html"],
  "sourceMap": false,
  "instrument": false // instanbul instrumented already
}
```
<!-- {style='font-size:75%'} -->

And create a `npm run` script:

```javascript
"cover": "cross-env NODE_ENV=test nyc npm test"
```
<!-- {style='font-size:80%'} -->

---

# Linting

`eslint` works just fine with ES2015! (`tslint` for Typescript)

```sh <!-- cli host=dev -->
npm install --save-dev eslint
```
<!-- {style='font-size:90%'} -->

:page_facing_up: `package.json`:
```json5
"scripts": {
    "lint": "eslint www.src test"
}
```
<!-- {style='font-size:90%'} -->

```sh <!-- host=dev cli output=2 -->
npm run lint    # or, write a plugin /
                # project-lvel hook! ;-)
```
<!-- {style='font-size:90%'} -->

---

# Tips

---

# Tips

* You don't have to convert overnight &mdash; a little at a time is fine
* `var` hasn't gone away
* Don't get carried away &mdash; eye-strain alert!
    * True especially with descructuring and template strings
* Use `for...of` instead of `for...in & hasOwnProperty()`
* Don't assume `=>` functions are drop-in replacements
* Careful using arrow functions with `describe` & `it` in your tests

---

# Tips (2)

* Try to declare `let`/`const` at the top of each scope (for Chrome's benefit)
* Use `var` instead of `let` in tight, nested loops where performance is critical
* ***Do*** minify & tree shake &mdash; reduces file size and startup time
* Don't count on minified code as a performance optimization (results highly variable)
* **Do** use `const` to identify unchanging _references_
    * But don't think of the variable as _immutable_ &mdash; it isn't

<!--

---

# Tips (3)


* Chrome likes to _deopt_ for seemingly odd reasons
    * The inspector will indicate `[deopt]` and the reason

    Reason                              | Workaround
    :-----------------------------------|:-----------------------------------
    Declaration not at top (TDZ issues) | Move declaration to top of function
    Compound assignments                | Use `var` in declaration instead

-->

<!-- {table:style='font-size:80%'} -->

<!--
* Not ES2015+ Specific:
   * Don't use clamped arrays -- *really* slow in Chrome
   * Assigning empty array is faster than `arr.length = 0`
-->

---

#  Thanks!

###### https://github.com/kerrishotts/pgday/2017/modern-javascript-and-phonegap

###### [@kerrishotts](https://www.twitter.com/kerrishotts)

---

# This slide intentionally left blank