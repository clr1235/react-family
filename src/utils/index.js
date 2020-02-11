require('es6-promise').polyfill();
require('isomorphic-fetch');
import {
  minBy,
  keys,
  each,
  assign,
  isEmpty
} from 'lodash';
import Cookies from 'js-cookie';
import {
  getPhonePattern,
  EMAIL,
  IP
} from '@js-tob-common/static-data/common-pattern.js';

import SignInInvalidDialog from '../components/SignInInvalidDialog';

const VHOST_PATTRTN = /^\/([a-zA-Z\-0-9]+)\//i;

const TYPES = [
  'Array',
  'Object',
  'Function',
  'String',
  'Number',
  'Null',
  'Undefined',
  'Boolean',
  'RegExp',
  'GeneratorFunction',
  'Promise'
];
let resume_name_reg = /^[\u4e00-\u9fa5a-zA-Z|()（）\-\s]+$/;
let utils = {
  type(d) {
    return Object.prototype.toString.call(d).slice(8, -1).toLowerCase();
  },
  // 校验简历名称如果不符合规则则显示匿名
  validateResumerName(name) {
    if (resume_name_reg.test(name)) {
      return name
    }
    return "匿名"
  },
  getAssetsDomain(domains) {
    if (!domains.length) {
      return '/';
    }
    domains = domains.map(function(d) {
      return {
        domain: d,
        count: localStorage.getItem(d) * 1 || 0
      }
    });
    let got = minBy(domains, 'count');
    localStorage.setItem(got.domain, (got.count || 0) + 1);
    return got.domain;
  },
  // 深度遍历
  deepEach(data, childKey, fn, init) {
    let results = init || [];
    each(data, (it) => {
      if (fn(it) === true) {
        results.push(it);
      }
      let child = it[childKey];
      if (utils.isArray(child) || utils.isObject(child)) {
        utils.deepEach(child, childKey, fn, results);
      }
    });
    return results;
  },
  /**
   * 把 object 参数转为 URL 查询字符串
   */
  params(obj) {
    let __prefix = arguments[1];
    if (
      (!__prefix && !utils.isObject(obj)) ||
      (__prefix && !utils.isObject(obj) && !utils.isArray(obj))
    ) {
      return '';
    }
    let res = [];
    each(obj, (value, key) => {
      /**
       * 使用 Object.create(null) 创建的object没有 hasOwnProperty
       * 方法，不能直接使用 hasOwnProperty 判断某个对象拥有某个非原型链属性
       */
      if (obj.hasOwnProperty && !obj.hasOwnProperty(key)) {
        return;
      }
      key = __prefix ? `${__prefix}[${key}]` : key;
      if (utils.isObject(value) || utils.isArray(value)) {
        !isEmpty(value) && res.push(utils.params(value, key));
      } else if (value !== void(0)) {
        res.push(key + '=' + encodeURIComponent(value));
      }
    });
    return res.join('&');
  },
  fetch(url, options) {
    options = options || {};
    options.method = (options.method || 'get').toUpperCase();
    options.credentials = options.credentials || 'include';
    options.dataType = options.dataType || 'json';
    options.jsonify = options.jsonify !== false;
    // csrf token头
    options.headers = {
      ...(options.headers || {}),
      'Frsc': '1',
      'X-XSRF-TOKEN': Cookies.get('tob_csrf_token'),
      'X-VHOST': (url.match(VHOST_PATTRTN) || [])[1]
    };
    let onComplete = options.onComplete;
    if (options.method === 'POST') {
      let body = options.body || {};
      // api开头的接口只能使用 form-data 的方式发送数据
      if (/^\/api\//.test(url)) {
        options.jsonify = false;
      }
      if (options.jsonify !== true) {
        options.body = utils.params(body);
        options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      } else {
        options.headers['content-type'] = 'application/json';
        options.body = JSON.stringify(body);
      }
    }
    return fetch(url, options).then(function(response) {
      if (response.status >= 200 && response.status < 300) {
        let data = response[options.dataType]();
        return data.then(function(data) {
          // 单点登录, 强制下线
          if (data.err_no * 1 === 1590000403) {
            return SignInInvalidDialog.show();
          }
          if (data.err_no * 1 ||
            (data.err_no !== '0' && data.err_no && data.err_no.length)) {
            let err = new Error(data.err_msg);
            err.response = data;
            throw err;
          }
          data.headers = response.headers;
          utils.isFunction(onComplete) && onComplete(null, data);
          return data;
        });
      }
      //var error = new Error(response.statusText);
      let error = new Error("系统繁忙，请稍后重试！");
      error.response = response;
      throw error;
    }).catch(function(error) {
      utils.isFunction(onComplete) && onComplete(error);
      throw error;
    });
  },
  // 数字格式化
  formatNumer(number) {
    number = number * 1;
    const isNegative = number < 0;
    if (!utils.isNumber(number)) {
      return '';
    }
    number = Math.abs(number).toString().split('.');
    let intPart = number[0] || '0';
    let floatPart = number[1] || '';
    return (isNegative ? '-' : '') + intPart.split('').reverse().join('')
      .replace(/(\d{3})/g, '$1,').split('')
      .reverse().join('').replace(/^,/, '') + (
        floatPart ? '.' + floatPart : ''
      );
  },
  /*
   *  将数字类型转成带两位小数的浮点型
   *  x: number
   *  作者：郑世楠
   */
  toDecimal2(num) {
    let str = num.toString();
    let re = /([0-9,]+.[0-9]{2})[0-9]*/;
    if (str.includes('.')) {
      return str.replace(re, "$1")
    }
    return `${str}.00`
  },
  /**
   * 将函数参数转换为数组
   */
  argumentsToArray(args, start, end) {
    if (!arguments.length) {
      return [];
    }
    start = start || 0;
    end = end || args.length;
    try {
      return Array.prototype.slice.call(args, start, end);
    } catch (e) {
      let result = [];
      for (let i = start; i < end; i++) {
        result.push(args);
      }
      return result;
    }
  },
  /**
   * 阿拉伯数字转换为中文数字
   */
  convertNumber2Chinese(number) {
    let CHINESE = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿', '十亿', '百亿', '千亿', '万亿'];
    let NUMBER_MAPS = {
      0: '零',
      1: '一',
      2: '二',
      3: '三',
      4: '四',
      5: '五',
      6: '六',
      7: '七',
      8: '八',
      9: '九'
    };
    number = number.toString().split('');
    return number.map((v, i) => {
      return (
        number.length === 2 && v * 1 === 1 && !i ? '' : NUMBER_MAPS[v]
      ) + (
        v * 1 === 0 ? '' : CHINESE[number.length - 1 - i]
      );
    }).join('').replace(/零+$|(零)+/g, '$1');
  },
  /**
   * 获取字符串长度,区分中英文
   * 英文字母大小写以及阿拉伯数字都是占一个字符
   * 汉语占两个字符
   */
  getStrLength(str) {
    if (typeof str === 'string') {
      if (str.length) {
        let len = 0;
        for (let i = 0; i < str.length; i++) {
          if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
            len += 2;
          } else {
            len++;
          }
        }
        return len;
      }
      return 0;
    }
    return null;
  },
  //回滚动态效果
  scrollToTop(distance, time) {
    distance = distance || 80;
    time = time || 10;
    setTimeout(() => {
      //获取滚动条高度（兼容写法）
      let scrolltop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
      if (scrolltop > 0) {
        document.body.scrollTop = document.documentElement.scrollTop = scrolltop - distance;
        utils.scrollToTop();
      }
    }, time);
  },
  //滚动到页面底部动态效果
  scrollToButtom(distance, time) {
    distance = distance || 80;
    time = time || 10;
    setTimeout(() => {
      //获取滚动条高度（兼容写法）
      let scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
      //整个网页的高度
      let scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
      //可见区域高度
      let pageHeight = window.innerHeight;
      if (typeof pageHeight !== "number") {
        if (document.compatMode === "CSS1Compat") {
          pageHeight = document.documentElement.clientHeight;
        } else {
          pageHeight = document.body.clientHeight;
        }
      }
      if (scrollTop + pageHeight + 20 < scrollHeight) {
        document.body.scrollTop = document.documentElement.scrollTop = scrollTop + distance;
        utils.scrollToButtom();
      }
    }, time);
  },
  //半角转换为全角
  ToDBC(txtstring) {
    let tmp = "";
    for (var i = 0; i < txtstring.length; i++) {
      if (txtstring.charCodeAt(i) === 32) {
        tmp = tmp + String.fromCharCode(12288);
      }
      if (txtstring.charCodeAt(i) < 127) {
        tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i) + 65248);
      }
    }
    return tmp;
  },
  //全角转换为半角
  ToCDB(str) {
    let tmp = "";
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) === 12288) {
        tmp += String.fromCharCode(str.charCodeAt(i) - 12256);
        continue;
      }
      if (str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375) {
        tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
      } else {
        tmp += String.fromCharCode(str.charCodeAt(i));
      }
    }
    return tmp
  },
  //获取具体层级路由
  getActiveKey(path, level = 2, defaultContext = '') {
    path = path.split('/');
    return '' + (path[+level] || defaultContext);
  },
  // 判断是否是 NaN
  isNan(d) {
    return isNaN(d) && this.isNumber(d);
  },
  /**
   * E小宝是否安装
   * sessionStorage中 @j-eai参数 1: 安装 0:未来安装
   *
   * 1200毫秒，检测4次。
   * 入口处都需要检测，不排除用户在新Tab中禁止插件
   */
  _babyTimer: null,
  _babyTimeCount: 1500,
  // 检查E小宝是否安装：在app入口处执行
  ckInstallEBaby() {
    let install = 0;
    clearTimeout(utils._babyTimer);
    // 查看是否检测完毕
    if (!utils._babyTimeCount || utils._babyTimeCount < 0) {
      return false;
    }
    // 在范围内重复去检测是否安装e小宝
    utils._babyTimer = setTimeout(() => {
      if (window['j-eai']) {
        install = 1;
        utils._babyTimeCount = 1200;
      } else {
        utils._babyTimeCount -= 300;
        utils.ckInstallEBaby();
      }
      window.sessionStorage.setItem('@j-eai', install);
    }, 300)
  },
  /**
   * @return {boolean} true: 安装 false: 未安装
   */
  isInstallEBaby() {
    return !!(window['j-eai'] || +window.sessionStorage.getItem('@j-eai'))
  },
  /**
   * 预留地域参数以防以后会增加其他地方
   * @param  {[type]}  number 需要验证的手机号码
   * @param  {String}  area   地域，默认是中国大陆
   * @return {Boolean}        [description]
   *
   * 预留地域参数以防之后添加其他地域
   */
  isMobilePhone(number, area = 'zh-CN') {
    return getPhonePattern(area).test(number);
  },
  // 邮箱验证
  isEmail(email) {
    return EMAIL.test(email);
  },
  // IP 地址验证
  isIP(ip) {
    return IP.test(ip);
  },
  //隐藏滚动条
  hiddenScroll() {
    const htmlDom = document.querySelector("html") || {};
    const headerDom = document.querySelector(".homepage-fixed") || {};
    const htmlWidth = htmlDom.clientWidth;
    const headerWidth = headerDom.clientWidth;
    const htmlClassList = htmlDom.classList;
    //关闭页面滚动条
    htmlClassList && htmlClassList.add("html-overflow-hidden");
    //消除页面抖动
    if (htmlWidth) {
      htmlDom.style.width = htmlWidth + 'px';
    }
    if (headerWidth) {
      (headerDom.style || {}).width = headerWidth + 'px';
    }
  },
  //打开滚动条
  showScroll() {
    const htmlDom = document.querySelector("html") || {};
    const headerDom = document.querySelector(".homepage-fixed") || {};
    const htmlClassList = htmlDom.classList;
    //打开页面滚动条样式
    htmlClassList && htmlClassList.remove("html-overflow-hidden");
    //清空内联width样式
    (htmlDom.style || {}).width = "";
    (headerDom.style || {}).width = "";
  }
};
// fetch.post 快捷方法
utils.fetch.post = function(url, data, options) {
  return utils.fetch(url, assign(options || {}, {
    method: 'POST',
    body: data
  }));
};
// 数据类型判断
TYPES.forEach(item => {
  utils[`is${item}`] = function(args) {
    return Object.prototype.toString.call(args) === `[object ${item}]`;
  };
});
// for (let i = TYPES.length; i--;) {
//   let t = TYPES[i];
//   utils['is' + t] = function(d) {
//     return Object.prototype.toString.call(d) === '[object ' + t + ']';
//   };
// }
// 是否是微信客户端
utils.isWechat = /micromessenger/i.test(navigator.userAgent);
// 微信分享
utils.wechatShare = function(shareInfo, onloadBack, shareList = [
  "onMenuShareTimeline",
  "onMenuShareAppMessage",
  "onMenuShareQQ",
  "onMenuShareWeibo",
  "onMenuShareQZone"
], custom = {}, readyCallBack) {
  // 引入微信文件添加到head
  let wecharScript = document.createElement('script');

  wecharScript.setAttribute('src', 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js');
  document.head.appendChild(wecharScript);
  // 微信分享测试的时候需要设置 appid,appsecret 公众平台测试帐号的信息，传给后端的匹配地址一定要是完整链接并去掉#后面的内容
  // 开发-》开发者工具-〉公众平台测试帐号-》配置
  wecharScript.onload = function() {
    // 可能给小程序使用
    onloadBack && onloadBack(window.wx);
    utils.fetch.post('/api/weixin/getSignature', {
      url: location.href.replace(/#.+$/, "")
      // appid: 'wx49d0ed9f26b22ece',
      // appsecret: '5b551687c168b9f8eeb07908a685ec52'
    }).then(({
      results
    }) => {
      // jsApiList会修改数组中的内容所以需要结构一份新的出来使用
      // 传入的在ready中使用
      window.wx.config({
        debug: false,
        appId: results.appId,
        timestamp: results.timestamp,
        nonceStr: results.nonceStr,
        signature: results.signature,
        jsApiList: [...shareList]
      })
      const customList = Object.keys(custom)
      window.wx.ready(function() {
        shareList.forEach((item) => {
          if (customList.includes(item)) {
            // console.log('===', item, custom[item])
            window.wx[item](custom[item]);
          } else {
            // console.log(item, shareInfo)
            window.wx[item](shareInfo);
          }

        })
        readyCallBack && readyCallBack()
      })
    })
  }
}
// 文本换行符替换
utils.replaceBr = function(text) {
  return text.replace(/[\n|\r]/g, '<br>');
}
// 文本空格符替换
utils.replaceSpace = function(text) {
  return text.replace(/\s/g, '&nbsp;');
}
// 是否是新人才库使用用户
utils.isNewTalent = function() {
  let isNewTalent = Cookies.get("tob_is_newtalent");

  return !!isNewTalent;
}
// 替换新人才库链接
utils.replaceArchivesLink = function(link) {
  if (utils.isNewTalent()) {
    return (link || '').replace(/library/, 'personal');
  }
  return link;
}

utils.urlEncode = function(param) {
  let paramStr = '';

  Object.keys(param).forEach((item) => {
    paramStr += `&${item}=${param[item]}`;
  })
  return paramStr.substr(1);
}

export default utils;
