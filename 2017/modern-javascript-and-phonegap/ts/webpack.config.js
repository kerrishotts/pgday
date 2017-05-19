var path = require("path");

module.exports = {
  devtool: "inline-source-map",
  context: path.resolve(__dirname, "www.src"),
  entry: { app: ["./es/index.js"] },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "www", "js")
  },
  module: {
    rules: [ {
        test: /\.([t|j]sx?)$/,
        exclude: /node_modules/,
        loader: "ts-loader",           // or babel-loader
        options: { entryFileIsJs: true } // excl if babel
        } /*, ... other rules as needed */
    ]
  }
}
