const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
/**
 * 由于运行在 Node.js 之上的 Webpack 是单线程模型的，所以Webpack 需要处理的事情需要一件一件的做，不能多件事一起做。
我们需要Webpack 能同一时间处理多个任务，发挥多核 CPU 电脑的威力，HappyPack 就能让 Webpack 做到这点，它把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。
 */
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const devMode = process.env.NODE_ENV !== 'production'
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigBase = {
  entry: {
    pc: resolve('../src/index.js')
  },
  output: {
    path: resolve('../dist/assets'),
    filename: devMode ? 'js/[name].[hash].js' : 'js/[name].[contenthash].js',
    chunkFilename: devMode ? 'chunks/[name].[hash:4].js':'chunks/[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: { // 减少使用别名提高编译速速

    }
  },
  optimization: { //webpack4  开始增加的优化属性
    
  }
}

module.exports = webpackConfigBase