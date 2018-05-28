'use strict';

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
  mode: 'production',

  devtool: 'source-map',

  optimization: {
    minimize: true
  }
});
