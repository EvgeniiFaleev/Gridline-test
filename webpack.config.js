const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  let isProd = false;

  if (env.production) isProd = env.production;
  return {

    entry: './src/index.tsx',
    output: {
      publicPath: '/',
      filename: 'script/main.[hash].js',
      path: path.resolve(__dirname, 'build'),
    },
    plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin({
      template: 'src/index.html',
    }), new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
    })],
    resolve: {
      alias: {
        '@ui': path.resolve(__dirname, 'src/ui'),
        '@lib': path.resolve(__dirname, 'src/lib'),
        '@flights': path.resolve(__dirname, 'src/features/flights'),
        '@features': path.resolve(__dirname, 'src/features'),
        '@images': path.resolve(__dirname, 'src/ui/assets/images'),
        '@store': path.resolve(__dirname, 'src/lib/store'),
        '@api': path.resolve(__dirname, 'src/api'),
        '@icons': path.resolve(__dirname, 'src/ui/assets/icons'),
      },
      extensions: ['.js', '.jsx', '.scss', '.css', '.img', '.png',
        '.svg', '.ts', '.tsx'],

    },
    devServer: {
      historyApiFallback: true,
      port: 9000,
      open: true,
      hot: true,
    },
    devtool: isProd
      ? false
      : 'source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          use: ['babel-loader', 'ts-loader'],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../', // specify path to external
            // resources of css file. It adds to output path of file
            // loader
            },
          }, // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: /\.module\.\w+$/i, // enable module css for
                // files with name filename.module.
                localIdentName: '[name]__[local]___[hash:base64:5]', // classNames based on hash and name
              },
            },
          }, // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }],
        },
        {
          test: /\.(png|jpe?g|gif|svg|img)$/,
          loader: 'file-loader',
          options: {
            outputPath: 'assets/images',
            name: '[name][contenthash].[ext]',
          },
        }, {
          test: /\.(ttf|woff|gif|woff2|eot)$/,
          loader: 'file-loader',
          options: {
            outputPath: 'assets/fonts',
            name: '[name][contenthash].[ext]',
          },
        },
      ],
    },
  };
};
