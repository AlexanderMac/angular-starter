'use strict';

const webpack           = require('webpack');
const webpackMerge      = require('webpack-merge');
const commonConfig      = require('./webpack.common.js');
const helpers           = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: "source-map",

  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:3001/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[name].map'
  },

  devServer: {
    historyApiFallback: true,
    compress: true,
    port: 3001
  }
});
