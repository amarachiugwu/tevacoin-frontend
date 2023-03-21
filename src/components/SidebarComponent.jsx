

import React from 'react';
import { Home, Send, Twitter } from 'react-feather';
import { Link } from 'react-router-dom';


export default function SidebarComponent() {

  return(
    <>
    {/* // <!-- Page Sidebar Start--> */}
        <div className="page-sidebar iconcolor-sidebar">
          <div className="main-header-left d-none d-lg-block">
            <div className="logo-wrapper"><a href="index.html"><img src="assets/images/creative-logo.png" alt=""/></a></div>
          </div>
          <div className="sidebar custom-scrollbar">
            <ul className="sidebar-menu">
              <li><Link className="sidebar-header" to="/home" rel="noreferrer"><Home /><span>Home</span></Link></li>
              <li><a className="sidebar-header" href="/" target="_blank" rel="noreferrer"><Send /><span>Telegram</span></a></li>
              <li><a className="sidebar-header" href="/" target="_blank" rel="noreferrer"><Twitter /><span>Twitter</span></a></li>
              </ul>
          </div>
        </div>
        {/* <!-- Page Sidebar Ends--> */}
    
    </>
            
  )
}