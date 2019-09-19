# react-family
react技术栈

# 开始搭建
## 初始化项目
   npm init
## 安装webpack4.0以上版本
   npm install --save-dev webpack
   npm install --save-dev webpack-cli
### 根据webpack文档编写最基础的配置文件
    新建webpack开发配置文件 touch webpack.dev.config.js

## 安装并创建eslint
   npm install eslint --save-dev
   ./node_modules/.bin/eslint --init
   npm install eslint-plugin-react --save-dev    此命令用于支持react的语法eslint检测

## 安装各种安装包
   npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin clean-webpack-plugin react react-dom  css-loader style-loader less less-loader url-loader file-loader mini-css-extract-plugin
### 安装babel7.0
    npm install --save -dev @babel/core @babel/preset-env @babel/preset-react babel-loader@8.0.0-beta.0 

    yarn add @babel/plugin-proposal-decorators @babel/plugin-proposal-object-rest-spread -D

    并相应的修改.babelrc文件

    "presets": [
        "@babel/preset-react",
        "@babel/preset-env"
    ],

### 安装react
    npm install --save react react-dom react-router-dom
### 安装webpack-dev-server
    修改 webpack.dev.config.js文件，告诉开发服务器在哪里查找文件：
    devServer: {
        contentBase: './dist'
    },

    以上配置告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。

    使用模板html

    html-webpack-plugin 插件 可以指定template模板文件，将会在output目录下，生成html文件，并引入打包后的js.

    yarn add html-webpack-plugin -D

## 配置.babelrc
   在根目录下新建.babelrc文件