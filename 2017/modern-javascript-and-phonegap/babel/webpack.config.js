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
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        loader: "babel-loader",           // or babel-loader
        } /*, ... other rules as needed */
    ]
  }
}
