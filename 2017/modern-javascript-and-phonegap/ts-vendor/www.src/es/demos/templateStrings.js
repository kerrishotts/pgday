import log from "../Logger.js";

export default {
    label: "Template Strings",
    demo: function() {
        function sayHelloAndGoodbye(name) {
            return `Hello, ${name},
Goodbye, ${name}`;
        }
        log(sayHelloAndGoodbye("World"));
        function sayComplexHello(name) {
            return `Hello, ${name ? name : "Jane Doe"}!`;
        }

        log(sayComplexHello("Alex")); // Hello, Alex!
        log(sayComplexHello());
    }
};
