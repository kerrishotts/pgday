import log from "../Logger.js";

export default {
    label: "bad this",
    demo: function() {
        var app = {
            text: "Hello, PG Day Attendees!",
            sayHi: function() {
                log(this.text);
            },
            start: function() {
                setTimeout(this.sayHi, 0);
            }
        }
        app.start();
    }
}