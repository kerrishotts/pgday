import log from "../Logger.js";

export default {
    label: "Promises, promises",
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

        getPos()
            .then(pos => {
                console.log(JSON.stringify(pos));
            })
            .catch(err => {
                console.error(err);
            });
    },
};
