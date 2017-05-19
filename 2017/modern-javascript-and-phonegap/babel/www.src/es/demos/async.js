import log from "../Logger.js";

export default {
    label: "Async",
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
        async function start() {
            try {
                let pos = await getPos(),
                    { coords: { latitude, longitude } } = pos;
                log(`${latitude}, ${longitude}`);
            } catch (err) {
                log(`Error received! ${err}`);
            }
        }
        start();
    }
};
