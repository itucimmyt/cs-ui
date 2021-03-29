import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import LoginLayout from './loginlayout'


const LoginLayoutRoutes = ({component: Component, ...rest}) =>{
    return (
        <Route {...rest} render={props => (
            <LoginLayout>
                <Component {...props} />
            </LoginLayout>
        )} />
    )
}


export default LoginLayoutRoutes