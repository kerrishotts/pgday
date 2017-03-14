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

![75%](./assets/portrait.jpg) <!-- {style='float: right'} -->

* Used PhoneGap for over six years
* Authored Five books about PhoneGap
* Apache Cordova committer
* One of many moderators at:
    * [Cordova Google Group](https://groups.google.com/forum/#!forum/phonegap)
    * [PhoneGap Adobe Forums](http://forums.adobe.com/community/phonegap)
* I love retro technology and ST:TNG :wink:
---

# Modern JavaScript Versions

---

# Remember ECMAScript 5?

Release year: 2009

* The version we all know and love (~ish?)
* Supported by all modern mobile web views^1^
    * iOS 6+, IE 10+, Edge (forever), Android 4.4+
* Reasonably modern (`map`, `reduce`, getters/setters, etc.)

<hr>

1.  http://caniuse.com/#feat=es5

---

## Things have changed a lot since then...

# ES2015 and beyond

---

<div style='font-size:125%'>

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

</div>

<hr>

1. https://github.com/lukehoban/es6features#readme; the list here is not a complete representation of _all_ features
2. http://www.2ality.com/2016/01/ecmascript-2016.html
3. http://www.2ality.com/2016/02/ecmascript-2017.html

---

<!-- template: dark -->

![bg original](../../_common/assets/picard/pouting.jpg)

## Before we go any further...

# Some Very Important Caveats!

---

<!-- template: light -->


# Caveats

* ***NOT*** a performance optimization
* Typically requires a build step
* Debugging can be interesting
* Some of the syntax is a little _sharp_ &mdash; use with care


   <!--
   * Source maps _help_, but sometimes quirky
   * Getting better
   -->

<!--

* Best iOS performance requires `WKWebView`

   * `UIWebView` performance is _abysmal_
   -->



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
      <th align="right">Performance Change from ES5</th><th>Chrome 55</th><th>Edge 15</th><th>Safari 10</th>
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

# So, why bother?

* Don't let those numbers scare you!
    * Micro-benchmarks don't always reflect the real world
    * Performance is steadily improving
* Frameworks are becoming increasingly dependant on ES2015
* Arrow functions, template strings, async/await
* More expressive &amp; less boilerplate

---

<!--
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
-->
<!-- {table:style='font-size:70%'} -->

<!--
| iPhone 6s        | 2474| Safari 10  |  reg  |  41 552 (2.49) |  43 811 (2.63) |  42 912 (2.57) |
|                  |     |            |  min  |  41 773 (2.50) |  41 285 (2.48) |  41 411 (2.47) |
-->

# Webviews &amp; Performance

* `WKWebView` (iOS) single-core performance is impressive
    * iPad Pro 12.9&Prime; can rival a MacBook Pro (Late 2014, 2.2GHz i7)
    * iPhone 6s is about half that; iPad Mini 4 is 2.5x slower
* Android Web View / Chrome is "meh"
    * OnePlus One is about 10%; Samsung Tab S 8.4&Prime; about 3%.
* `UIWebView`: ...


<hr>

**Note:** Of course, this is _highly sensitive_ to the ES2015+ features that you use. MacBook Pro: Late 2014, 2.2GHz i7 16GB RAM <!--; _GB4_ = Geekbench 4 single-core score; _min_ = minified & dead code removed -->

---

<!-- template: dark -->

![bg original](../../_common/assets/picard/double-wtf.jpg)

> #### UIWebView strikes again <!--{style='text-align:center; color: white; position: absolute; left: 1in; right: 1in; top: 2in;'}-->

---

<!-- template: light -->

# Webviews &amp; Performance (2)

* `UIWebView`: *ugh*
    * 1% on an iPad Pro 12.9&Prime;
    * No JIT :cry:

<hr>

**Note:** Of course, this is _highly sensitive_ to the ES2015+ features that you use. MacBook Pro: Late 2014, 2.2GHz i7 16GB RAM <!--; _GB4_ = Geekbench 4 single-core score; _min_ = minified & dead code removed -->

---

# A whirlwind tour

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

<div style="position: absolute; top: 60%; width: 90%; height: 40%; left: 5%; right: 5%; background-color: rgba(255,255,255,0.85); border-radius: 0.5em; border: 1px solid rgba(0,0,0,0.25); display: flex; flex-direction: column;">
  <div style="line-height: 3.5em; padding: 0.5em; margin: auto; width: 100%;">undefined</div>
  <div style="border-top: 1px solid rgba(0,0,0,0.25); color: hsl(220, 75%, 60%); text-align: right; padding: 0.5em">Close</div>
</div>

<!--
# ![center 250%](./assets/alert-undefined.png)
-->

---

# Arrow functions (=>) & Classes

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

<div style="position: absolute; top: 60%; width: 90%; height: 40%; left: 5%; right: 5%; background-color: rgba(255,255,255,0.85); border-radius: 0.5em; border: 1px solid rgba(0,0,0,0.25); display: flex; flex-direction: column;">
  <div style="padding: 0.5em; margin: auto; width: 100%; line-height: 3.5em">Hello, PG Day Attendees!</div>
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
<!-- {style='font-size:82.5%'} -->

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
  } catch (err) { alert (err); }
}
```
<!-- {style='font-size:85%'} -->

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
function getPos(opts) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, opts);
  });
}
async function start() {
  try {
    const {timestamp, coords:{latitude, longitude}} = await getPos();
    console.log(`At ${latitude}, ${longitude} on ${timestamp}`);
  } catch(err) {
    console.log(`Error ${err.code}: ${err.message}`);
  }
}
```
<!-- {style='font-size:80%'} -->

---

### File Transfer with ES2017

<div style='font-size:84%'>


```javascript
function uploadFile({source, target, options} = {}) {
  return new Promise((resolve, reject) => (new FileTransfer()).
    upload(url, to, resolve, reject, options));
}
async function start() {
  try {
   const {responseCode, response, bytesSent} = uploadFile({
      url: "cdvfile://localhost/persistent/test.txt",
      to:  "http://www.example.com/upload.php",
      options: { mimeType: "text/plain",
                 fileKey:  "file", fileName: "test" }});
  } catch (err) { /* do something with the error */ }
}
```

</div>


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

---

### Easy wrappers for Cordova plugin APIs!

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

<hr>

\* Applies to Cordova plugin APIs that use the success, error form; could be made more generic


---

# Where can I use this now?

-->

---

# Native support is a moving target

<div style='font-size: 125%'>

|     OS             |   ES2015   |   ES2016   |   ES2017   |
|-------------------:|-----------:|-----------:|-----------:|
| Android (Chrome)   |  97% (51+) | 100% (55+) |  53% (56+) |
|           Edge 15  |      100%  |      100%  |       39%  |
|           Edge 14  |       93%  |         -  |         -  |
|           iOS 11\* |      100%  |      100%  |       98%  |
|            iOS 10  |      100%  |       61%  |       42%  |
|            iOS  9  |       54%  |         -  |         -  |

</div>

<hr>

\* Based on current status in Safari Technological Preview 11
**Note**: Some of the tests are based on existence, not completeness. **Sources**: [ES2015](http://kangax.github.io/compat-table/es6/), [ES2016](http://kangax.github.io/compat-table/es2016plus/), [ES2017](http://kangax.github.io/compat-table/esnext/)

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

&nbsp;\* **Note:** Not every ES2015+ feature can be transpiled effectively (if at all), such as proxies, shared memory, atomics, built-in subclassing, and tail call elimination. Also, most transpilers need [core-js](https://github.com/zloirock/core-js) to polyfill the standard library.
\*\* Doesn't attempt to transform non-performant or non-trivial ES6 features; _also very young_

---

> ### Remember module syntax?

---

<!-- template: dark -->

![bg original](../../_common/assets/picard/sigh.jpg)

> ### No Implementation! :scream: <!--{style='text-align:center; color: white; position: absolute; left: 1in; right: 1in; top: 2in;'}-->

---
<!-- template: light -->

![bg original](../../_common/assets/picard/yay.jpg)

> ### But we can fix that... <!--{style='text-align:center; color: white; position: absolute; left: 1in; right: 1in; top: 2in; text-shadow: 0 0 10px black'}-->


---

# Module support using Bundling :shopping:

Dependency management & `import`/`export` (and CommonJS, AMD, etc.) support

* [Webpack](https://webpack.js.org)
* [JSPM](http://jspm.io)
* [Browserify](http://browserify.org)

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

<!-- * Determine ES2015+ code location -->

* Install Webpack & Transpiler

* Configure Webpack & Transpiler

* Add build scripts to `package.json`

---

<!--

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

<!-- {ul^4:class='no_bullets'} --

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

<!-- {ul^5:class='no_bullets'} --
<!-- {ul^5:style='font-size:80%'} --

</div>

---

-->

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

```javascript
// tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,
    "target": "es5",        // es2015, es5, es3
    "module": "es2015",     // required for tree shaking
    "lib": ["es6", ...]     // Features you're using*
    "inlineSourceMap": true
  },
  "include": ["www(.src)/(es|ts)/**/*"] // adjust as appropriate
}
```
<!-- {style="font-size:79%"} -->

<hr>

\* Don't forget to import `core-js` in your `index.?s` if targeting older runtimes.

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
  ], "plugins": ["transform-runtime"] // reduces repetition
}
```
<!-- {style="font-size:83%"} -->

<hr>

\* Don't forget to import `babel-polyfill` in your `index.js` if targeting older runtimes.


---

# Configure Webpack

```javascript
// Create `webpack.config.js`:
module.exports = {
  devtool: "inline-source-map",
  context: path.resolve(__dirname, "www.src"), // if sibling, use   __dirname, "www"
  entry: "./" + path.join("(e|t)s", "index.(j|t)s"), // will fail without ./!
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
<!-- {style='font-size:65%;'} -->

---

# Add run script to package.json

```javascript
"scripts": {
  "build:ios": "webpack && cordova build ios"
}
```

<br/>

```sh host=dev cli
npm run build:ios
```

---

# Magic!

[cordova-plugin-webpack-transpiler](https://github.com/kerrishotts/cordova-plugin-webpack-transpiler) can do this on `prepare`.

```sh <!-- host=dev output=2,3 cli -->
cordova plugin add --save \ 
  cordova-plugin-webpack-transpiler \
  --variable CONFIG=typescript|babel
```
<!-- {style='font-size:90%'} -->

Templates work too:

* Typescript: [cordova-template-webpack-ts-scss](https://github.com/kerrishotts/cordova-template-webpack-ts-scss)
* Babel: [cordova-template-webpack-babel-scss](https://github.com/kerrishotts/cordova-template-webpack-babel-scss)

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

`npm install --save-dev cross-env nyc`, then:

```javascript
// package.json
"nyc": {
  "require": ["babel-register"], "reporter": ["text", "html"],
  "sourceMap": false, "instrument": false
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
                # project-level hook! ;-)
```
<!-- {style='font-size:90%'} -->

---

# Tips

---

# Tips

* You don't have to convert overnight &mdash; a little at a time is fine
* Use `for...of` instead of `for...in & hasOwnProperty()`
* Don't assume `=>` functions are drop-in replacements
  * Careful using arrow functions with `describe` & `it` in your tests
* `var` hasn't gone away
* Try to declare `let`/`const` at the top of each scope (for Chrome's benefit)

---

# Tips (2)

* Use `var` instead of `let` where performance is critical (e.g., tight, nested loops)
* ***Do*** minify & tree shake &mdash; reduces file size and startup time
  * Don't count on minified code as a performance optimization (results highly variable)

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

<!-- template: dark -->

![bg original](../../_common/assets/picard/tongue.jpg)

> ### And we're done! <!--{style='text-align:center; color: white; position: absolute; left: 1in; right: 1in; top: 2in;'}-->

---

<!-- template: light -->


#  Thanks!

###### https://github.com/kerrishotts/pgday/2017/modern-javascript-and-phonegap

###### [@kerrishotts](https://www.twitter.com/kerrishotts)

---

# This slide intentionally left blank