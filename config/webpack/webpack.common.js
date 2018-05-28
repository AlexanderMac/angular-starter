'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const webpack              = require('webpack');
const CleanPlugin          = require('clean-webpack-plugin');
const HtmlPlugin           = require('html-webpack-plugin');
const ProgressBarPlugin    = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NotifierPlugin       = require('webpack-notifier');
const helpers              = require('./helpers');

module.exports = {
  stats: { children: false },

  entry: {
    polyfills: './src/app/polyfills.ts',
    vendor: './src/app/vendor.ts',
    app: './src/app/main.ts'
  },

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    sourceMapFilename: '[name].map'
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.pug$/,
        loaders: [
          'raw-loader',
          'pug-html-loader'
        ]
      },
      {
        test: /\.css$/,
        loader: 'raw-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?minify'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?minify',
          'stylus-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },

  plugins: [
    new CleanPlugin(['dist'], {
      root: helpers.root(),
      verbose: false,
      dry: false
    }),

    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)/,
      helpers.root('src', 'app')
    ),

    new HtmlPlugin({
      template: 'src/public/index.pug'
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    }),

    new ProgressBarPlugin({
      format: 'Build [:bar] :percent (:elapsed seconds)',
      clear: false,
    }),

    new NotifierPlugin({
      title: 'app',
      excludeWarnings: true,
      skipFirstNotification: true
    })
  ]
};
