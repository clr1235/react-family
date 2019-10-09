const path = require('path');
//__dirname  总是指向被执行 js 文件的绝对路径

// webpack 入口文件所在目录
const src_ROOT_DIR = path.resolve(
  __dirname
);

const appPublic = path.resolve(__dirname, '../public')


module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),   // yarn build 命令打包之后会在此处生成用于输出
    filename: 'public/js/[name]-[hash:8].js',
    publicPath: '/'
  },
  // 设置别名
  resolve: {
    extensions: ['.js', '.jsx', '.json']
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
    }, {
      //解析图片资源
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader'
      ]
    }, {
      // 解析字体
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader'
      ]
    }, {
      // 解析数据资源
      test: /\.(csv|tsv)$/,
      use: [
        'csv-loader'
      ]
    }, {
      // 解析数据资源
      test: /\.xml$/,
      use: [
        'xml-loader'
      ]
    }, {
      // 解析 MakeDown 文件
      test: /\.md$/,
      use: [
        'html-loader',
        'markdown-loader'
      ]
    }]
  },
  

}