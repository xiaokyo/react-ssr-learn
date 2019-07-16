const path = require ('path');
// const {CleanWebpackPlugin} = require ('clean-webpack-plugin');
const devMode = process.env.NODE_ENV == 'development' ? true : false;

const nodeExternals = require ('webpack-node-externals');

module.exports = {
  mode: process.env.NODE_ENV,
  target: 'node',
  entry: [path.join (__dirname, '../src/server/index.js')],
  output: {
    path: path.join (__dirname, '../dist/server'),
    filename: 'server.js',
    publicPath: '/',
  },
  externals: [nodeExternals ()],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  // plugins: [new CleanWebpackPlugin ()],
};
