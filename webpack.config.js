const webpack = require("webpack");
const path = require("path");

const config = {
  entry: ["./src/index.js", "./src/styles.scss"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [],
      },
      {
        test: /\.scss?$/,
        exclude: /node_modules/,
        type: "asset/resource",
        generator: {
          filename: "css/styles.css",
        },
        use: ["sass-loader"],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
};

module.exports = config;
