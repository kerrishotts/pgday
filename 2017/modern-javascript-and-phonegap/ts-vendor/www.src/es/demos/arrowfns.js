import log from "../Logger.js";

export default {
    label: "Arrow Functions",
    demo: function() {
        class App {
            constructor() {
                this.text = "Hello, PG Day Attendees!";
            }
            sayHi() { log(this.text); }
            start() {
                setTimeout(() => this.sayHi(), 0);
            }
        }
        (new App).start();
    }
}