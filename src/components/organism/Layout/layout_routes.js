import React from 'react'
import { PrivateRoute } from "react-auth-kit";
import MainLayout from './layout'


const LayoutRoutes = ({ component: Component, ...rest }) => {
    return (
        <PrivateRoute {...rest} component={props => (
            <MainLayout>
                <Component {...props} />
            </MainLayout>
        )} />
    )
}

export default LayoutRoutes