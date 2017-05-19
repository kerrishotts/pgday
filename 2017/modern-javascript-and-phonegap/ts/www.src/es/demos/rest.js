import log from "../Logger.js";

export default {
    label: "Rest",
    demo: function() {
        function sum(start = 0, ...nums) {
            return nums.reduce((acc, val) => acc + val, start);
        }
        log(sum(1, 5, 10, 99));
    },
};
