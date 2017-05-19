import log from "../Logger.js";

export default {
    label: "Arrow Function Returns",
    demo: function() {
        log("implicit return", [1, 2, 3].map(i => i * 2));
        log("explicit return",
            [1, 2, 3].map(i => {
                let x = Math.floor(Math.random() * 100);
                return i * x;
            })
        );
    },
};
