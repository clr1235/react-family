import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';


import Home from 'pages/Home/index';
import Page1 from 'pages/Page1/index';

const routes = [{
  path: "/home",
  component: Home
},{
  path: "/page1",
  component: Page1
}]

export default routes;