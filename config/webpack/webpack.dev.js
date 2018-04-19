'use strict';

const webpack           = require('webpack');
const webpackMerge      = require('webpack-merge');
const commonConfig      = require('./webpack.common.js');
const helpers           = require('./helpers');

const METADATA = {
  env: 'development',
  host: 'localhost',
  port: 3000
};

module.exports = webpackMerge(commonConfig, {
  devtool: "source-map",

  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:3001/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[name].map'
  },

  plugins: [
    new webpack.DefinePlugin({
      'APP_ENV': METADATA.env,
      'APP_URL': METADATA.host,
      'APP_PORT': METADATA.port
    })
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
