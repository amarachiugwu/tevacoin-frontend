import React from 'react';
import $ from 'jquery';


export default function HeaderComponent() {

  const SideBarToggle = () => {
    $('.page-sidebar').toggleClass('open');
    $('.page-main-header').toggleClass('open');
  }

  return(
    <div className="page-main-header">
        <div className="main-header-right row">
          <div className="main-header-left d-lg-none">
            <div className="logo-wrapper"><a href="index.html"><img src="../assets/images/creative-logo1.png" alt=""/></a></div>
          </div>
          <div className="mobile-sidebar d-block">
            <div className="media-body text-right switch-sm">
              <label className="switch">
                <input  type="checkbox" id="sidebar-toggle" onClick={() => SideBarToggle() } />
                    <span className="switch-state"></span>
              </label>
            </div>
          </div>

          
          <div className="nav-right col pull-right right-menu">
           
          </div>
          
        </div>
    </div>
  )
}