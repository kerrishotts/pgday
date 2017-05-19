var path = require("path");
var webpack = require("webpack");

module.exports = {
  devtool: "inline-source-map",
  context: path.resolve(__dirname, "www.src"),
  entry: { app: ["./es/index.js"],
      vendor: ["core-js"]
},
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
  },
      plugins: [
  	new webpack.optimize.CommonsChunkPlugin({
      name: "vendor", filename: "vendor.js"})
  ]
}
