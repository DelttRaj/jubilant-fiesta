const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require("webpack");
const { defineConfig } = require("@vue/cli-service");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = defineConfig({
  mode: "production",
  context: __dirname,
  entry: [
    path.resolve(__dirname, "scripts/aem.js"),
    path.resolve(__dirname, "scripts/delayed.js"),
    path.resolve(__dirname, "scripts/scripts.js"),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/build/",
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
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
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
            {
              source: path.resolve(__dirname, "./", "manifest.json"),
              destination: path.resolve(__dirname, "build", "manifest.json"),
            },
            {
              source: path.resolve(__dirname, "./", "favicon.ico"),
              destination: path.resolve(__dirname, "build", "favicon.ico"),
            },
          ],
          delete: [path.resolve(__dirname, "build", "head.html")],
        },
      },
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
    }),
    new InjectManifest({
      swSrc: "./scripts/serviceworker/src-sw.js",
      swDest: "sw.js",
      exclude: [/head\.html$/],
    }),
  ],
  resolve: {
    alias: {
      "@blocks": path.resolve(__dirname, "blocks"),
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
});
