'use strict';

let webpack           = require('webpack');
let webpackMerge      = require('webpack-merge');
let commonConfig      = require('./webpack.common.js');
let helpers           = require('./helpers');

const METADATA = {
  env: 'development',
  host: 'localhost',
  port: 3000
};

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

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
