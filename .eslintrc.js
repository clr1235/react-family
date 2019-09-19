module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        'indent': [1, 2, {'SwitchCase': 1}],  // 警告，2个缩进
        'no-dupe-keys': [1],                  // 警告，禁止在对象字面量中出现重复的键 
        'no-duplicate-case': [1],             // 警告，禁止重复 case 标签
        'no-empty': [1],                      // 警告，禁止空块语句
        'no-negated-in-lhs': [1],             // 警告，禁止在 in 表达式中出现否定的左操作数
        'no-sparse-arrays': [1],              // 警告，禁用稀疏数组
        'no-unreachable': [1],                // 警告，禁止在 return、throw、continue 和 break 语句后出现不可达代码
        'use-isnan': [1],                     // 警告，要求调用 isNaN()检查 NaN
        'accessor-pairs': [1],                // 警告，强制getter/setter成对出现在对象中 
        'default-case': [1],                  // 警告，要求 switch 语句中有 default 分支
        'dot-notation': [1],                  // 警告，要求使用点号
        'dot-location': [1, 'property'],      // 警告，强制在点号之前或之后换行
        'no-else-return': [1],                // 警告，禁止 if 语句中有 return 之后有 else
        'no-empty-pattern': [1],              // 警告，禁止使用空解构模式
        'no-lone-blocks': [1],                // 警告，禁用不必要的嵌套块
        'no-new-wrappers': [1],               // 警告，禁止原始包装实例 
        'no-useless-concat': [1],             // 警告，禁止没有必要的字符拼接
        'no-useless-escape': [1],             // 警告，禁用不必要的转义
        'radix': [1],                         // 警告，要求parseInt必须有基数
        'brace-style': [1, '1tbs'],           // 警告，大括号风格要求
        'comma-spacing': [1],                 // 警告，强制在逗号周围使用空格
        'comma-style': [1],                   // 警告，逗号风格
        'jsx-quotes': [1],                    // 警告，强制在 JSX 属性中使用一致的单引号
        'max-len': [1, 120],                  // 警告，强制行的最大长度 120
        'no-mixed-spaces-and-tabs': [1, "smart-tabs"],      // 警告，禁止使用 空格 和 tab 混合缩进
        'arrow-body-style': [1, 'always'],    // 警告，要求箭头函数体使用大括号
        'arrow-parens': [1],                  // 警告，要求箭头函数的参数使用圆括号 
        'arrow-spacing': [1, {                // 警告，要求箭头函数的箭头之前或之后有空格
        before: true,
        after: true
        }],
        'no-const-assign': [1],               // 警告，不允许改变用const声明的变量
        'no-duplicate-imports': [1],          // 警告，Disallow duplicate imports
                                            
        'comma-dangle': [2, 'never'],         // 错误，禁止末尾逗号
        'no-dupe-args': [2],                  // 错误，禁止在 function 定义中出现重复的参数
        'no-func-assign': [2],                // 错误，禁止对 function 声明重新赋值
        'no-invalid-regexp': [2],             // 错误，禁止在 RegExp 构造函数中出现无效的正则表达式
        'no-irregular-whitespace': [2, {      // 错误，禁止不规则的空白
        skipStrings: true,
        skipComments: true,
        skipRegExps: true,
        skipTemplates: true
        }],
        'no-obj-calls': [2],                  // 错误，禁止将全局对象当作函数进行调用 
        'no-regex-spaces': [2],               // 错误，禁止正则表达式字面量中出现多个空格
        'no-unsafe-finally': [2],             // 错误，禁止在 finally 语句块中出现控制流语句
        'valid-typeof': [2],                  // 错误，强制 typeof 表达式与有效的字符串进行比较
        'block-scoped-var': [2],              // 错误，强制把变量的使用限制在其定义的作用域范围内
        'curly': [2, 'all'],                  // 错误，要求遵循大括号约定
        'eqeqeq': [2],                        // 错误，要求使用 === 和 !==
        'no-floating-decimal': [2],           // 错误，禁止浮点小数
        'no-implied-eval': [2],               // 错误，禁用隐式的eval
        'no-labels': [2],                     // 错误，禁用标签语句
        'no-multi-str': [2],                  // 错误，禁止多行字符串
        'no-native-reassign': [2],            // 错误，禁止对原生对象赋值
        'no-octal': [2],                      // 错误，禁用八进制字面量
        'no-octal-escape': [2],               // 错误，禁止在字符串字面量中使用八进制转义序列
        'no-proto': [2],                      // 错误，禁用__proto__
        'no-redeclare': [2, {                 // 错误，禁止重新声明变量
        builtinGlobals: true
        }],
        'no-return-assign': [2],              // 错误，禁止在返回语句中赋值
        'no-script-url': [2],                 // 错误，禁用 Script URL
        'no-self-assign': [2],                // 错误，禁止自身赋值
        'no-self-compare': [2],               // 错误，禁止自身比较
        'no-throw-literal': [2],              // 错误，限制可以被抛出的异常
        'no-unmodified-loop-condition': [2],  // 错误，禁用一成不变的循环条件
        'no-with': [2],                       // 错误，禁用 with 语句
        'wrap-iife': [2],                     // 错误，需要把立即执行的函数包裹起来
        'no-delete-var': [2],                 // 错误，禁止删除变量
        'no-shadow-restricted-names': [2],    // 错误，关键字不能被遮蔽
        'no-undef': [2],                      // 错误，禁用未声明的变量
        'no-undefined': [2],                  // 错误，不允许使用undefined变量
        'no-use-before-define': [2],          // 错误，禁止定义前使用,
        'callback-return': [2],               // 错误，强制返回callback函数
        'no-new-require': [2]                 // 错误，不允许 new require
    }
};