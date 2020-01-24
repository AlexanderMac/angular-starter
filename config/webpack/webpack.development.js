const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    contentBase: helpers.root('public'),
    compress: true,
    port: 3001,
    historyApiFallback: true,
    stats: 'errors-only'
  }
});
