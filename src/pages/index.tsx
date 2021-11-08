import { Layout, Menu, Breadcrumb } from 'antd';
import React, { useEffect, useState } from "react"
import { HashRouter as Router, Redirect, Switch, Route } from "react-router-dom"
import Routers from "../route"
import Login from "./user"
import Main from "./main"
import './index.less';
import Cookies from 'js-cookie'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface Props {
  history: History
}

export default function MainPage(props: Props) {
  const TokenKey = 'x-access-token'
  const [isShow, setIsShow] = useState(false)
  useEffect(() => {
    if (!Cookies.get(TokenKey)) {
      window.location.href = 'http://localhost:8000/#/login'
    } else {
      setIsShow(true)
    }
  }, [])
  return (
    <Router>
      <Switch>
        <Route exact path='/login' render={() => <Login />} />
        <Route path='/' render={() => <Main />} />
      </Switch>
    </Router>
  );
}