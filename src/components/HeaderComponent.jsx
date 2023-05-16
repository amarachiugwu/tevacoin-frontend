import React from 'react';
import $ from 'jquery';
import {ConnectButton} from '@rainbow-me/rainbowkit';


export default function HeaderComponent() {

  const SideBarToggle = () => {
    $('.page-sidebar').toggleClass('open');
    $('.page-main-header').toggleClass('open');
  }

  return(
    <div className="page-main-header">
        <div className="main-header-right row">
          <div className="main-header-left d-lg-none">
            <div className="logo-wrapper"><a href="/index"><img width="35" height="35" src="../assets/images/creative-logo1.png" alt=""/></a></div>
          </div>
          
          <div className="mobile-sidebar d-block" style={{float:'left'}}>
            <div className="media-body text-right switch-sm">
              <label className="switch">
                <input  type="checkbox" id="sidebar-toggle" onClick={() => SideBarToggle() } />
                    <span className="switch-state"></span>
              </label>
            </div>
          </div>
            
          <div className="nav-right col pull-right right-menu" style={{float:'left'}}>
            <ConnectButton 
              label="Connect"
              accountStatus={"avatar"} // full, address, or avatar
              chainStatus={"icon"} // full, icon, or none
              showBalance={false} // true or false
            />
          </div>
          
          
        </div>
    </div>
  )
}