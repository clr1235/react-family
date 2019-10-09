# react-family
react技术栈

# 开始搭建
## 初始化项目
   npm init -y
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
    babel 升级到 7.0.0 版本之后， @babel/preset-stage-0 被废弃，用到的插件需要自己进行安装。

    npm install --save -dev @babel/core @babel/preset-env @babel/preset-react babel-loader@8.0.0-beta.0 

    yarn add @babel/plugin-proposal-decorators @babel/plugin-proposal-object-rest-spread -D

    并相应的修改.babelrc文件

    "presets": [
        "@babel/preset-react", // 可以在项目中使用 react 语法
        "@babel/preset-env"   // 可以在项目中使用所有 ECMAScript 标准里的最新特性
    ],

    npm install --save-dev @babel/plugin-transform-runtime  支持开发环境的修饰符转义
    npm install --save @babel/runtime                       支持生产环境

    安装相关插件：

    @babel/plugin-proposal-decorators：可以在项目中使用装饰器语法。

    @babel/plugin-proposal-class-properties：可以在项目中使用新的 class 属性语法。

    @babel/plugin-transform-runtime：使用此插件可以直接使用 babel-runtime 中的代码对 js 文件进行转换，避免代码冗余。

    @babel/runtime-corejs2：配合 babel-plugin-transform-runtime 插件成对使用

    @babel/plugin-syntax-dynamic-import：可以在项目中使用 import() 这种语法

    @babel/plugin-proposal-export-namespace-from：可以使用 export * 这种命名空间的方式导出模块

    @babel/plugin-proposal-throw-expressions：可以使用异常抛出表达式

    @babel/plugin-proposal-logical-assignment-operators：可以使用逻辑赋值运算符

    @babel/plugin-proposal-optional-chaining：可以使用可选链的方式访问深层嵌套的属性或者函数 ?.

    @babel/plugin-proposal-pipeline-operator：可以使用管道运算符 |>

    @babel/plugin-proposal-nullish-coalescing-operator：可以使用空值合并语法 ??

    @babel/plugin-proposal-do-expressions：可以使用 do 表达式（可以认为是三元运算符的复杂版本）

    @babel/plugin-proposal-function-bind：可以使用功能绑定语法 obj::func

### 安装css相关loader
    css-loader：处理 css 文件中的 url() 等。
    
    style-loader：将 css 插入到页面的 style 标签。

    less-loader：是将 less 文件编译成 css

    postcss-loader：可以集成很多插件，用来操作 css。我们这里使用它集成 autoprefixer 来自动添加前缀

### 配置样式相关loader
    由于 React 无法直接使用类似 Vue 中 scope 这种局部作用变量，所以我们可以使用 webpack 提供的 CSS Module。

    由于等会儿会使用 antd，所以引入 antd 时需要开启 less 的 javascript 选项，所以要将 less-loader 中的属性 javascriptEnabled 
    设置为 true。

### 添加其它模块解析loader
    npm install file-loader csv-loader xml-loader html-loader markdown-loader --save-dev    


### 安装react
    npm install --save react react-dom react-router-dom

    yarn add react-loadable    使用react-loadable实现代码分割

### 安装webpack-dev-server
    修改 webpack.dev.config.js文件，告诉开发服务器在哪里查找文件：
    devServer: {
        contentBase: './dist'
    },

    以上配置告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。

    使用模板html

    html-webpack-plugin 插件 可以指定template模板文件，将会在output目录下，生成html文件，并引入打包后的js.

    yarn add html-webpack-plugin -D

    npm install friendly-errors-webpack-plugin --save-dev 插件可以在命令行展示更友好的提示更能

    npm install clean-webpack-plugin --save-dev

## 配置.babelrc
   在根目录下新建.babelrc文件
   
   [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": true
      }
    ]


### 引入antd
    安装 antd 相关插件：
    npm install antd moment --save

    安装 babel-plugin-import 对组件进行按需加载：
    npm install babel-plugin-import --save-dev