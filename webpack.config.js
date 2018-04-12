const { resolve } = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const isAOT = process.env.AOT === 'true';

module.exports = {
  entry: './src/main.ts',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'build.js',
    publicPath: '/'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts', '.less', '.html']
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      isAOT
        ? {
            test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
            loader: '@ngtools/webpack'
          }
        : {
            test: /\.ts$/,
            use: [
              'ts-loader',
              'angular2-template-loader',
              'angular-router-loader'
            ]
          },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: resolve(__dirname, 'src', 'index.html')
    })
  ].concat(
    isAOT
      ? [
          new AngularCompilerPlugin({
            tsConfigPath: './tsconfig.json',
            mainPath: './src/main.ts',
            sourceMap: true
          })
        ]
      : []
  ),
  devServer: {
    port: 3000,
    inline: true,
    contentBase: './build',
    historyApiFallback: true
  }
};
