import React, { Fragment, Component } from 'react';
import classNames from 'classnames';
import { observer } from "mobx-react";
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import Loadable from 'global-components/Loadable';

// const Home = Loadable({
//   loader: () => import('pages/Home')
// })

const Home = () => {
  return <div>home页面</div>
}
const Page1 = () => {
  return <div>page1----页面</div>
}
const Page2 = () => {
  return <div>page222----页面</div>
}


export default class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Fragment>
        <ul>
          <li><Link to="/">home</Link></li>
          <li><Link to="/page1">page1</Link></li>
          <li><Link to="/page2">page2---</Link></li>
        </ul>
        <Switch>
          <Route exact path="/" component={Home}/> 
          <Route path="/page1" component={Page1}/> 
          <Route path="/page2" component={Page2}/> 
        </Switch>
      </Fragment>
    )
  }
}