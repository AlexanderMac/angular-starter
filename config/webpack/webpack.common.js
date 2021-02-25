process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const NotifierPlugin = require('webpack-notifier')
const helpers = require('./helpers')

module.exports = {
  stats: 'errors-only',

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
    path: helpers.root('public'),
    publicPath: '/',
    filename: '[name]-[contenthash].js',
    chunkFilename: '[name]-[contenthash].js',
    sourceMapFilename: '[file].map[query]'
  },

  module: {
    rules: [
      {
        test: /[\\/\\]@angular[\\/\\]core[\\/\\].+\.js$/,
        parser: {
          system: true
        }
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false
            }
          },
          'pug-html-loader'
        ],
        exclude: /(node_modules)/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ],
        exclude: /(node_modules)/
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
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['!css/*', '!fonts/*', '!images/*']
    }),

    // To hide `Critical dependency: the request of a dependency is an expression` warning
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)/,
      helpers.root('src', 'app')
    ),

    new webpack.DefinePlugin({
      SRVC_TYPE: JSON.stringify(process.env.SRVC_TYPE || 'local-storage')
    }),

    new HtmlPlugin({
      template: 'src/public/index.pug'
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash].css',
      chunkFilename: 'css/[name]-[contenthash].css'
    }),

    new ProgressBarPlugin({
      format: 'Build [:bar] :percent (:elapsed seconds)',
      clear: false
    }),

    new NotifierPlugin({
      title: 'app',
      excludeWarnings: true,
      skipFirstNotification: true
    })
  ]
}
