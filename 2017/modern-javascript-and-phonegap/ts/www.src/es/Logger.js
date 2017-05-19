export class Logger {
    constructor(logEl) {
        this._el = logEl;
    }

    log(...text) {
        this._el.innerHTML += text.map(i => i === undefined ? "(undefined)" : i).join(" ") + String.fromCharCode(13) + String.fromCharCode(10);
    }
}

const logger = new Logger(document.getElementById("log"));
export default logger.log.bind(logger);