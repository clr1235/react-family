import React, { Fragment, Component } from 'react';
import classNames from 'classnames';
import { observer } from "mobx-react";
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import Loadable from 'global-components/Loadable';

import {Layout, Menu, Breadcrumb, Icon} from 'antd';

import './less/index.less';

const { SubMenu } = Menu;
const MenuItem = Menu.Item;
const { Header, Content, Sider } = Layout;


// const Home = Loadable({
//   loader: () => import('pages/Home')
// })


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const menu = [{
      key: '1',
      navName: 'nav1'
    }, {
      key: '2',
      navName: 'nav2'
    }, {
      key: '3',
      navName: 'nav3'
    }]
    
    return (
      <Layout>
        <Header className="global_header">
          <div className="global_logo">logo</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{
              lineHeight: '64px'
            }}
          >
            {
              menu.map((nav) => {
                return (
                  <MenuItem key={nav.key}>
                    {nav.navName}
                  </MenuItem>
                )
              })
            }
          </Menu>
        </Header>
        <Layout>
          <Sider width={200}> 
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    subnav 1
                  </span>
                }
              >
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="laptop" />
                    subnav 2
                  </span>
                }
              >
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="notification" />
                    subnav 3
                  </span>
                }
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>   
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}