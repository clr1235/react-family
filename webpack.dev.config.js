const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//__dirname  总是指向被执行 js 文件的绝对路径

// webpack 入口文件所在目录
const STATIC_ROOT_DIR = path.resolve(
  __dirname
);

// console.log(STATIC_ROOT_DIR, 'STATIC_ROOT_DIR-=-=-=-=-')

const PATH_ALIAS = {
  'components': path.resolve(STATIC_ROOT_DIR, 'static/components'),
  'pages': path.resolve(STATIC_ROOT_DIR, 'static/pages'),
  'router': path.resolve(STATIC_ROOT_DIR, 'static/router'),
}

module.exports = {

  entry: './index.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: PATH_ALIAS
  },
  devServer: {
    contentBase: './dist',
    // overlay: {
    //   warnings: true,
    //   errors: true
    // },
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/react'],
          plugins: [
            [
              "@babel/plugin-proposal-decorators", 
              { "legacy": true }
            ]
          ]
        }
      },
      exclude: /(node_modules|bower_components)/,
    }]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './dist/index.html')
    })
  ]

}