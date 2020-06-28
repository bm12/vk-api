const path = require('path');
const dotenv = require('dotenv');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const cssLoaders = ({ isModules = true } = {}) => {
  const loaders = [];

  loaders.push(isDev ? 'style-loader' : MiniCssExtractPlugin.loader);

  loaders.push({
    loader: 'css-loader',
    options: {
      modules: isModules && ({
        localIdentName: `${isDev ? '[folder]_[local]_' : ''}[hash:base64:6]`,
      }),
      importLoaders: 1,
    },
  });
  loaders.push('postcss-loader');

  return loaders;
};

const sassLoader = () => [
  ...cssLoaders(),
  'sass-loader',
];

const getFilename = (ext) => `[name].[hash:8].${ext}`;

const fileLoader = (folder) => {
  const filenamePrefix = isDev ? '[name].' : '';
  return ({
    loader: 'file-loader',
    options: {
      name: `assets/${folder}/${filenamePrefix}[contentHash:8].[ext]`,
    },
  });
};

const envFilePath = isDev
  ? path.relative(__dirname, '.env.local')
  : path.relative(__dirname, '.env');

dotenv.config({ path: envFilePath });

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: {
    bundle: './src/index.jsx',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.json', '.jsx'],
  },
  output: {
    filename: getFilename('js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, 'static'),
    watchContentBase: true,
    historyApiFallback: true,
    hot: isDev,
    open: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './static/index.html',
      filename: path.resolve(__dirname, 'dist', 'index.html'),
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPlugin({
      filename: getFilename('css'),
    }),
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
      'ACCESS_TOKEN',
    ]),
    new BundleAnalyzerPlugin({
      analyzerMode: isProd ? 'static' : 'disabled',
      openAnalyzer: false,
      defaultSizes: 'gzip',
      reportFilename: 'webpack-bundle-analyzer-report.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              cache: true,
            },
          },
        ],
      },
      {
        test: /\.global\.p?css$/,
        use: cssLoaders({ isModules: false }),
      },
      {
        test: /\.p?css$/,
        exclude: /\.global\.p?css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s(a|c)ss$/,
        use: sassLoader(),
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [fileLoader('images')],
      },
      {
        test: /\.(ttf|eot|wotf|wotf2)$/,
        use: [fileLoader('fonts')],
      },
    ],
  },
};
