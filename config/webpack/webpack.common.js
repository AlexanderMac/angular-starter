'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const Webpack              = require('webpack');
const CleanPlugin          = require('clean-webpack-plugin');
const HtmlPlugin           = require('html-webpack-plugin');
const ProgressBarPlugin    = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NotifierPlugin       = require('webpack-notifier');
const helpers              = require('./helpers');

module.exports = {
  stats: {
    assets: false,
    builtAt: false,
    children: false,
    chunks: true,
    chunkGroups: false,
    chunkModules: false,
    chunkOrigins: false,
    cachedAssets: false,
    depth: false,
    entrypoints: false,
    timings: false,
    hash: false,
    modules: false,
    version: false
  },

  performance: {
    hints: false
  },

  resolve: {
    extensions: ['.js', '.ts'],
    symlinks: true,
    modules: [
      helpers.root('src', 'app'),
      'node_modules'
    ],
    mainFields: ['browser', 'module', 'main']
  },

  entry: {
    polyfills: './src/app/polyfills.ts',
    main: './src/app/main.ts'
  },

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js'
  },

  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendors',
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
        parser: {
          system: true
        }
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: [
          'awesome-typescript-loader',
          'angular2-template-loader'
        ]
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.pug$/,
        exclude: /(node_modules)/,
        use: [
          'raw-loader',
          'pug-html-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'raw-loader',
          MiniCssExtractPlugin.loader,
          'css-loader?minify'
        ]
      },
      {
        test: /\.styl$/,
        exclude: /(node_modules)/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?minify',
          'stylus-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: 'file-loader?name=images/[name].[ext]'
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },

  plugins: [
    new CleanPlugin(['dist'], {
      root: helpers.root(),
      verbose: false,
      dry: false
    }),

    // To hide `Critical dependency: the request of a dependency is an expression` warning
    new Webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)/,
      helpers.root('src', 'app')
    ),

    new HtmlPlugin({
      template: 'src/public/index.pug'
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash].css',
      chunkFilename: 'css/[name]-[hash].css'
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
