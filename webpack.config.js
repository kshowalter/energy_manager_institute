var path = require('path');
var webpack = require('webpack');
//var webpack = require('webpack');
//var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  entry: {
    bundle: ['./src/app.js'],
  },
  output: {
    //path: path.resolve(__dirname, 'public'),
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: '[name].js'
  },

  //plugins: [
  //  new webpack.DefinePlugin({
  //    'process.env.NODE_ENV': JSON.stringify('dev')
  //  })
  //],
  devtool: 'eval-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000
  },
  plugins: [
    new webpack.IgnorePlugin(/jsdom/),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new BundleAnalyzerPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': '"production"'
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /client/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ]

  }

};
