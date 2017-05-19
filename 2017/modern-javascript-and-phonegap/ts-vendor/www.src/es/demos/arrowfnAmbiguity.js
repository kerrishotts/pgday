import log from "../Logger.js";

export default {
    label: "Arrow Function Ambiguity",
    demo: function() {
        log("will not work as expected:",
            [1, 2, 3].map(i => {
                i: i * 2;
            })
        ); // is equivalent to
        log("still nope:",
            [1, 2, 3].map(i => {
                // this, which is
                // obviously not what
                i: i * 2; // we want :-(
            })
        );
        log("good", [1, 2, 3].map(i => ({ i: i * 2 })));
    }
};
