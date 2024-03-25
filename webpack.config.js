const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  mode: "production",
  entry: [
    path.resolve(__dirname, "scripts/aem.js"),
    path.resolve(__dirname, "scripts/delayed.js"),
    path.resolve(__dirname, "scripts/scripts.js"),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "blocks"),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-syntax-dynamic-import",
              "@vue/babel-plugin-jsx",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "./head.html",
      template: "./head.template.html",
      inject: "body",
      scriptLoading: "module",
      publicPath: "./build/",
    }),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            {
              source: path.resolve(__dirname, "build", "head.html"),
              destination: path.resolve(__dirname, "./", "head.html"),
            },
          ],
          delete: [path.resolve(__dirname, "build", "head.html")],
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@blocks": path.resolve(__dirname, "blocks"),
    },
  },
};
console.log("Info about module ", module.rules);