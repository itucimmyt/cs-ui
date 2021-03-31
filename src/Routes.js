import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "page/Login";
import Home from "page/Home";
import Dashboard from "page/Dashboard"
import InstancePage from "page/Instances"
import Callback from "page/Callback"
import MainLayout from 'components/organism/Layout'
import BlankLayout from 'components/organism/Layout_Blank'
import LoginLayout from 'components/organism/LoginLayout'

const Routes = () => {
  return (
    <Router>
        <MainLayout path={"/"} component={Home} loginPath={"/login"} exact />     
        <BlankLayout path={"/dashboard"} component={Dashboard} loginPath={"/login"} exact />  
        <MainLayout path={"/sm/:route?"} component={Home} loginPath={"/login"} exact />   
        <LoginLayout path={"/login"} component={Login} exact />
        <LoginLayout path={"/callback"} component={Callback} exact />
    </Router>
  );
};

export default Routes;
