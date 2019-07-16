const path = require ('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const {CleanWebpackPlugin} = require ('clean-webpack-plugin');
const devMode = process.env.NODE_ENV == 'development' ? true : false;

module.exports = {
  mode: process.env.NODE_ENV,
  entry: [path.join (__dirname, '../src/client/index.js')],
  output: {
    path: path.join (__dirname, '../dist'),
    filename: 'assets/bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'entry',
                },
              ],
              '@babel/preset-react',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin ({
      filename: devMode ? 'index.html' : 'app.html',
      template: path.join (__dirname, '../public/index.html'),
    }),
    new CleanWebpackPlugin (),
  ],
  devServer: {
    contentBase: path.join (__dirname, '../dist'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on
  },
};
