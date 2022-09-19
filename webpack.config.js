// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const CopyFilePlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const ZipPlugin = require("zip-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MergeJsonPlugin = require("merge-json-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";

const packageJson = require("./package.json");

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  devtool: "cheap-module-source-map", //参考になったページ: https://stackoverflow.com/questions/48047150/chrome-extension-compiled-by-webpack-throws-unsafe-eval-error
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new MergeJsonPlugin({
      force: false,
      groups: [
        {
          files: [
            "./src/manifest.json",
          ],
          transform: (outputJson) => {
            outputJson.version = packageJson.version;
            return outputJson;
          },
          to: "manifest.json",
        },
      ],
    }),
    new CopyFilePlugin(
      {
        patterns: [
          {
            from: "**/*.png",
            to: "./icons",
            context: "src/icons",
            noErrorOnMissing: true,
          },
          {
            from: "*.js",
            to: "./",
            context: "src",
            globOptions: {
              gitignore: false,
              ignore: [
                "**/index.js"
              ]
            },
            noErrorOnMissing: true,
          },
          {
            from: "**/*.json",
            to: "./",
            context: "src",
            noErrorOnMissing: true,
            globOptions: {
              gitignore: false,
              ignore: [
                "**/manifest.json"
              ]
            }
          },
          {
            from: "**/*",
            to: "./fonts",
            context: "src/fonts",
            noErrorOnMissing: true,
          }
        ]
      }
    ),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new ZipPlugin({
      filename: `mynewtab_${packageJson.version}`
    }),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /tailwind\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          stylesHandler,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
