import log from "../Logger.js";

export default {
    label: "Named Parms",
    demo: async function() {
        function getPicture({ quality = 50, width = 512, height = 512 } = {}) {
            return new Promise((resolve, reject) => {
                navigator.camera.getPicture(resolve, reject, {
                    allowEdit: false,
                    correctOrientation: true,
                    quality,
                    targetWidth: width,
                    targetHeight: height,
                });
            });
        }
        await getPicture();

        await getPicture({quality:75});

        await getPicture({height: 1024, width: 1024});
    }
};
