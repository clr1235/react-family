const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

//__dirname  总是指向被执行 js 文件的绝对路径

// webpack 入口文件所在目录
const src_ROOT_DIR = path.resolve(
  __dirname
);

const appPublic = path.resolve(__dirname, '../public')

// console.log(src_ROOT_DIR, 'src_ROOT_DIR-=-=-=-=-')

const PATH_ALIAS = {
  'components': path.resolve(src_ROOT_DIR, '../src/components'),
  'pages': path.resolve(src_ROOT_DIR, '../src/pages'),
  'router': path.resolve(src_ROOT_DIR, '../src/router'),
  'global-components': path.resolve(src_ROOT_DIR, '../src/global/components')
}

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),   // yarn build 命令打包之后会在此处生成用于输出
    filename: 'public/js/[name]-[hash:8].js',
    publicPath: '/'
  },
  //设置开发模式
  mode: 'development',
  devtool: 'inline-source-map',
  // 设置别名
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: PATH_ALIAS
  },
  //配置webpack-dev-server
  devServer: {
    contentBase: appPublic,
    overlay: {
      warnings: true,
      errors: true
    },
    hot: true,
    host: 'localhost',
    port: 8000,
    // 打印信息
    stats: 'errors-only',
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
      test: /\.(css|less)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'style-loader'
        }, 
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: true,
            localIdentName: '[local].[hash:8]'
          }
        }, 
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer()]
          }
        },
        {
          loader: 'less-loader',
          options: {
              javascriptEnabled: true
          }
        }
      ]
    }, {
      test: /\.(css|less)$/,
      include: /node_modules/,
      use: [{
              loader: 'style-loader'
          },
          {
              loader: 'css-loader',
              options: {}
          },
          {
              loader: 'postcss-loader',
              options: {
                  plugins: () => [autoprefixer()]
              }
          },
          {
              loader: 'less-loader',
              options: {
                  javascriptEnabled: true
              }
          }
      ]
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
  
  plugins:[
    /**html-webpack-plugin 插件有两个作用
     * 可以将public目录下的文件夹拷贝到dist输出文件夹下
     * 可以自动将dist下的js文件引入到html文件中
    **/
    new HtmlWebpackPlugin({
      title: 'webapck 开发环境配置',
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      minify: { //压缩html文件
        removeComments: true, //移除html中的注释
        collapseWhitespace: true, //删除空白符和换行符
        minifyCSS: true //压缩内敛css
      },
      // hash: true
    }),
    //friendly-errors-webpack-plugin 插件可以在命令行展示更有好的提示功能
    new FriendlyErrorsWebpackPlugin(),
    //启动热加载
    new webpack.HotModuleReplacementPlugin(),
    // 用法：new CleanWebpackPlugin(paths [, {options}])
    new CleanWebpackPlugin({
      verbose: false,  //开启在控制台输出信息
      root: path.resolve(__dirname, '../dist')   // 根目录
    }), 
  ]

}