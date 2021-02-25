const webpack = require('webpack')
const { merge: webpackMerge } = require('webpack-merge')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const commonConfig = require('./webpack.common.js')

module.exports = webpackMerge(commonConfig, {
  mode: 'production',

  devtool: 'source-map',

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin()
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.APP_ENV': JSON.stringify('production')
    })
  ]
})
