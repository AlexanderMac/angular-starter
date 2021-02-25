const webpack = require('webpack')
const { merge: webpackMerge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

module.exports = webpackMerge(commonConfig, {
  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    contentBase: helpers.root('public'),
    compress: true,
    port: 3001,
    historyApiFallback: true,
    stats: 'errors-only'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.APP_ENV': JSON.stringify('development')
    })
  ]
})
