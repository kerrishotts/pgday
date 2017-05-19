import log from "../Logger.js";

export default {
    label: "Arrow Function Quirks",
    demo: function() {
        log("No parms", [1, 2, 3].map(() => Math.floor(Math.random() * 100)));
        log("Two parms", [1, 2, 3].map((i, idx) => i * idx));
        log("One parm", [1, 2, 3].map(i => i * 2));
    }
}