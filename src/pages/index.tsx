import { Layout, Menu, Breadcrumb } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import Routers from '../route';
import Login from './user';
import Main from './main';
import './index.less';
import Cookies from 'js-cookie';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface Props {
  history: any;
}

export default function MainPage(props: Props) {
  const TokenKey = 'x-access-token';
  useEffect(() => {
    console.log(props);
    if (!Cookies.get(TokenKey)) {
      props.history.push('/user');
    }
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/user" render={() => <Login />} />
        <Route path="/" render={() => <Main />} />
      </Switch>
    </Router>
  );
}
