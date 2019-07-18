const path = require('path');

module.exports = {
  mode: 'production',
  target: 'web',
  entry: "./src/wtc-controller-carousel.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'wtc-controller-carousel.es5.js',
    library: 'WTCCarousel'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: [["@babel/env", {
            "targets": {
              "browsers": ["last 2 versions", "ie >= 11"]
            },
            useBuiltIns: "usage",
            corejs: 3
          }]]
        }
      }
    ]
  }
}