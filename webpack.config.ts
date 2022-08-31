import "dotenv/config";

import { resolve } from "path";

import Dotenv from "dotenv-webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { Configuration as WebpackConfiguration, ResolvePluginInstance } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

import stanTitlesData from "./data.json";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const TITLE = "Stan TV Coding Challenge";

const config: Configuration = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: process.env.PORT,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }

      if (!devServer.app) {
        throw new Error("express application is not defined");
      }

      devServer.app.get("/getStanTitles", async (_, response) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        response.json(stanTitlesData);
      });

      return middlewares;
    },
    static: "./dist",
  },
  devtool: "inline-source-map",
  entry: "./src/index.tsx",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(eot|otf|ttf|woff2?)$/i,
        type: "asset/resource",
      },
      {
        generator: {
          filename: "[name][ext]",
        },
        test: /\.(gif|jpe?g|png|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  optimization: {
    usedExports: true,
  },
  output: {
    clean: true,
    filename: "app.js",
    path: resolve(__dirname, "dist"),
    publicPath: "/*",
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      inject: false,
      template: "./src/index.html",
      title: TITLE,
      xhtml: true,
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    plugins: [new TsconfigPathsPlugin() as ResolvePluginInstance],
  },
};

export default config;
