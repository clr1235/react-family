import React, {Fragment, useState} from 'react';
import {Button} from 'antd';
import { isArray } from 'util';

const Home = (props, ref) => {
  //声明一个新的叫做count的state变量
  const [count, setCount] = useState(0);
  /*
    调用useState方法会返回一对值：当前状态和一个让你更新它的函数（类似于setState,但是它不会把新的state和旧的state进行合并）
    useState 唯一的参数就是初始 state。可以是任何对象
    这个初始 state 参数只有在第一次渲染时会被用到。
  */ 
  // 你可以在一个组件中多次使用 State Hook
  
  const isDataType = (data) => {
    let toString = Object.prototype.toString;
    toString.call(data)
    let type = toString.call(data).split(' ')[1].split(']')[0];
    return type;
  }

  /**
   * object.__proto__指向object的原型，构造函数都有一个prototype属性指向原型，而object是构造函数
   * 原型.custructor指向构造函数
   * 
   */


  return (
    <Fragment>
      <p>you click {count} times</p>
      <Button onClick={() => setCount(count + 1)}>
        click me
      </Button>
      <Button onClick={() => {
        console.log(isDataType(void(0)), 'type===');
      }}>
        看下类型
      </Button>
    </Fragment>
  )
}

Home.propTypes = {

}

Home.defaultProps = {

}

export default Home;