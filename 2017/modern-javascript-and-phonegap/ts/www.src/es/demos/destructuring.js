import log from "../Logger.js";

export default {
    label: "Destructuring",
    demo: function() {
        function getPos(options) {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    resolve,
                    reject,
                    options
                );
            });
        }
        function gotPos(data) {
            let { timestamp, coords: { latitude, longitude } } = data;
            log(`${latitude},${longitude}@${timestamp}`);
        }
        function gotError(err) {
            log(`Error received! ${err}`);
        }
        getPos().then(gotPos).catch(gotError);

        function divide(a, b) {
            if (b === 0) {
                return [undefined, new Error("Divide by zero")];
            } else {
                return [a / b, null];
            }
        }
        let [results, error] = divide(10, 0);
        log(results, error);
    },
};
