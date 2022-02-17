const path = require("path");

const webpack = require("webpack");

module.exports = () => ({
  mode: "production",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
  },
  entry: ["./client/src/start.tsx"],
  output: {
    path: path.resolve(__dirname, "client", "build"),
    filename: "bundle.js",
  },

  performance: {
    hints: false,
  },
  devServer: {
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
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
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
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
});
