'use strict';

const webpack           = require('webpack');
const webpackMerge      = require('webpack-merge');
const commonConfig      = require('./webpack.common.js');
const helpers           = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: "source-map",

  devServer: {
    historyApiFallback: true,
    compress: true,
    port: 3001
  }
});
