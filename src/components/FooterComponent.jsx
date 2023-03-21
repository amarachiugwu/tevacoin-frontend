

import React from 'react';

export default function FooterComponent() {

  return(
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 footer-copyright">
            <p className="mb-0">Copyright 2023 © Teva Group All rights reserved.</p>
          </div>
          <div className="col-md-6">
            <p className="pull-right mb-0">Teva Group Team<i className="fa fa-heart"></i></p>
          </div>
        </div>
      </div>
    </footer>        
  )
}