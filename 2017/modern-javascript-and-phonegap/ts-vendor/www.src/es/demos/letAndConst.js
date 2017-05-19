import log from "../Logger.js";

export default {
    label: "Let and Const",
    demo: function() {
        const SECONDS_IN_A_MINUTE = 60;
        const HELLO = "Hiya";

        let i = SECONDS_IN_A_MINUTE;
        for (let i = 0; i < 10; i++) {
            log(HELLO, i); // Hiya 0... Hiya 99
        }
        log("60?", i); // 60
        const DEFAULT_OPTIONS = {
            quality: 50,
        };

        DEFAULT_OPTIONS.quality = 100;
        log("100?", DEFAULT_OPTIONS.quality); // 100
    },
};
