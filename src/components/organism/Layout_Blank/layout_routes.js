import React from 'react'
import { PrivateRoute } from "react-auth-kit";
import MainLayout from './layout'


const LayoutRoutes = ({ component: Component, ...rest }) => {
    return (
        <PrivateRoute {...rest} render={props => (
            <MainLayout>
                <Component {...props} />
            </MainLayout>
        )} />
    )
}

export default LayoutRoutes