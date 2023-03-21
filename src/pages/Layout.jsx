import React from 'react'
import { Outlet, useLocation } from "react-router-dom";
import HomePage from './HomePage';


export default function Layout(props) {
    let location = useLocation()

    return (
        <div className="page-wrapper">

            <Outlet />
            <>
            {location.pathname === '/home' ? '' : <HomePage/>}
            </>
            
        </div>
    )
}
