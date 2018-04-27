'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const webpack            = require('webpack');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const NotifierPlugin     = require('webpack-notifier');
const helpers            = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/app/polyfills.ts',
    'vendor': './src/app/vendor.ts',
    'app': './src/app/main.ts'
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.pug$/,
        loader: ['raw-loader', 'pug-html-loader?pretty']
      },
      {
        test: /\.css$/,
        loader: 'raw-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?minify'
        })
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minify', 'stylus-loader']
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: helpers.root(),
      verbose: false,
      dry: false
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)/,
      helpers.root('src', 'app')
    ),

    new ExtractTextPlugin('css/[name].css'),

    new HtmlWebpackPlugin({
      template: 'src/public/index.html'
    }),

    new NotifierPlugin({
      title: 'app',
      excludeWarnings: true,
      skipFirstNotification: true
    })
  ]
};
