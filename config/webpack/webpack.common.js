'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

let webpack           = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let helpers           = require('./helpers');

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
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
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
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('src', 'app')
    ),

    new HtmlWebpackPlugin({
      template: 'src/public/index.html'
    })
  ]
};
