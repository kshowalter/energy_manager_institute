var path = require('path');
var webpack = require('webpack');
//var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    bundle: ['./client/app.js'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    sourceMapFilename: '[file].map', //Filename
    publicPath: '/'
  },

  //plugins: [
  //  new webpack.DefinePlugin({
  //    'process.env.NODE_ENV': JSON.stringify('dev')
  //  })
  //],
  devtool: 'cheap-module-eval-source-map',


  module: {
    loaders: [
      {
        test: /\.js$/,
        include: /client/,
        //exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.md$/,
        include: /page/,
        //exclude: /node_modules/,
        loader: 'markdown_loader'
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ]

  }

};
