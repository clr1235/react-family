const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

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
  //设置生产模式
  mode: 'production',
  devtool: 'hidden-source-map',
  // 设置别名
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: PATH_ALIAS
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
          // loader: 'style-loader'
          loader: MiniCssExtractPlugin.loader
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
        // loader: 'style-loader'
        loader: MiniCssExtractPlugin.loader
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

  plugins: [
    //friendly-errors-webpack-plugin 插件可以在命令行展示更有好的提示功能
    new FriendlyErrorsWebpackPlugin(),

    /**
     * 生产环境相关配置
     */
    new MiniCssExtractPlugin({
      filename: 'public/styles/[name].[contenthash:8].css',
      chunkFilename: 'public/styles/[name].[contenthash:8].chunk.css'
    }),
    new webpack.DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // 使用clean-webpack-plugin 清理 dist 目录
    new CleanWebpackPlugin({
      verbose: false,  //开启在控制台输出信息
      root: path.resolve(__dirname, '../dist')   // 根目录
    }),


  ],

  optimization: {
    //打包压缩js/css文件
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            // 在UglifyJs删除没有用到的代码时不输出警告
            warnings: true,
            // 删除所有的 `console` 语句，可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true,
          },
          output: {
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(css|less)/,
          chunks: 'all',
          enforce: true,
          // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
          reuseExistingChunk: true
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
          reuseExistingChunk: true
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: true

  },

  //添加 stats 配置过滤打包时出现的一些统计信息。
  stats: {
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  },
  //添加 performance 配置关闭性能提示
  performance: {
    hints: false
  }

}