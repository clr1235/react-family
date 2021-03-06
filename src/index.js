import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react'
import { BrowserRouter } from 'react-router-dom';

import { ConfigProvider } from 'antd';
//国际化
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';

import GlobalStore from './globalStore';
import App from './app.js';

ReactDOM.render(
  <Provider globalStore={GlobalStore}>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
);



