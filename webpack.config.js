const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: "./src/index.js",
    frontend: "./src/modules/frontend.js",
    login: "./src/modules/login.js",
    dashboard: "./src/modules/dashboard.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html", 
      chunks: ["index"], 
      title: "Index - Weight tracker",
      
    }),
    new HtmlWebpackPlugin({
      filename: "dashboard.html",
      template: "./src/index.html", 
      chunks: ["dashboard"],
      title: "Dashboard - Weight tracker",
    }),
  ],
  mode: "development",
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    open: "index.html",
    hot: false,
    port: 3000,
    historyApiFallback: true, 
  },
};