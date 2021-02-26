const webpack = require('webpack')
const { merge: webpackMerge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

module.exports = webpackMerge(commonConfig, {
  mode: 'production',

  devtool: 'source-map',

  optimization: {
    minimize: true
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.APP_ENV': JSON.stringify('production')
    })
  ]
})
