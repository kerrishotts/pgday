import log from "../Logger.js";

export default {
    label: "Arraylikes",
    demo: function() {
        var elList = document.querySelectorAll("button");
        log("es5", [].slice.call(elList, 0));
        log("Array.from", Array.from(document.querySelectorAll("button")));
    },
};
