import "core-js";

import letAndConst from "./demos/letAndConst.js";
import badThis from "./demos/badThis.js";
import arrowfns from "./demos/arrowfns.js";
import arrowfnQuirks from "./demos/arrowfnQuirks.js";
import arrowfnReturns from "./demos/arrowfnReturns.js";
import arrowfnAmbiguity from "./demos/arrowfnAmbiguity.js";
import templateStrings from "./demos/templateStrings.js";
import promisesPromises from "./demos/promises.js";
import destructuring from "./demos/destructuring.js";
import asyncAwait from "./demos/async.js";
import arrayLikes from "./demos/arraylikes.js";
import rest from "./demos/rest.js";
import namedParms from "./demos/namedparms.js";

class Demo {
    constructor() {
        document.addEventListener("deviceready", () => this.start(), false);

        this.demos = [
            letAndConst,
            badThis,
            arrowfns,
            arrowfnQuirks,
            arrowfnReturns,
            arrowfnAmbiguity,
            templateStrings,
            promisesPromises,
            destructuring,
            asyncAwait,
            arrayLikes,
            rest,
            namedParms
        ];
    }
    start() {
        const container = document.getElementById("demos");
        container.appendChild(this.demos.reduce((a, c) => {
            let el = document.createElement("button");
            el.textContent = c.label;
            el.addEventListener("click", c.demo, false);
            a.appendChild(el);
            return a;
        }, document.createDocumentFragment()))
    }
}

let demo = new Demo();
