const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webpack = require("webpack");
import HtmlWebPackPlugin from "html-webpack-plugin";

module.exports = () => ({
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
  },
  entry: ["./client/src/start.tsx"],
  output: {
    path: path.resolve(__dirname, "client", "build"),
    filename: "bundle.js",
    publicPath: "/",
  },

  performance: {
    hints: false,
  },
  devServer: {
    // hot: false,
    // liveReload: false,
    static: {
      directory: path.join(__dirname, "client", "public"),
    },
    compress: true,
    proxy: {
      "/": {
        target: "http://localhost:3001",
      },

      "/socket.io": {
        target: "http://localhost:3001",
        ws: true,
      },
    },
    port: "3000",
  },
  module: {
    rules: [
      {
        test: /\.(woff2|woff|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|mp3)$/i,
        type: "asset/resource",
      },
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
      "process.env.production": JSON.stringify(process.env.production),
    }),
    new HtmlWebPackPlugin({
      template: "./client/index.html",
      filename: "./index.html",
    }),
  ],
});
