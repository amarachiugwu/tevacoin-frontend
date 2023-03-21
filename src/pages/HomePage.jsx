import React from 'react'
import FooterComponent from '../components/FooterComponent'
import HeaderComponent from '../components/HeaderComponent'
import SidebarComponent from '../components/SidebarComponent'
import { TrendingUp } from 'react-feather';


function HomePage() {
  return (
    <>
        <HeaderComponent />
        <div className="page-body-wrapper">
          <SidebarComponent />

          
<div className="page-body">
                    
                    {/*  Container-fluid starts */}
                
                    <div className="container-fluid">
                        <div className="row">
                            
                            <div className="col-sm-12 col-lg-8 col-xl-6 xl-50 col-md-12 box-col-12" style={{margin : '20px auto 0'}}>
                                <div className="card height-equal">
                                    
                                    <div className="card-header">
                                        <h5>ETH Amount</h5>
                                    </div>
                                    <form className="form-inline" >
                                        <div className="contact-form card-body">
                                        
                                            <div className="input-group">
                                                <input type="text" name="ETHAmount" id="ETHAmount" className="form-control" placeholder="eg : 1" />
                                                
                                                <button type="submit" className="btn btn-primary-gradien" >Buy TEV</button>
                                            </div>

                                            <p id="error_msg" style={{color: '#EB844E'}}></p>

                                        </div>
                                    </form>

                                </div>
                            </div>

                            <div className="col-lg-12 xl-100" style={{margin : '20px auto 0'}}>
                                <div className='row'>

                                    <div className="col-xl-6 xl-50 col-md-6 box-col-6">
                                        <div className="card">
                                            <div className="card-body tag-card">
                                                <div className="progressbar-widgets">
                                                    <div className="media media-widgets">
                                                        <div className="media-body">
                                                            <p className="mb-0">Total ETH Spent</p>
                                                            <h3 className="mt-0 mb-0 f-w-600">
                                                              {/* <span className="counter">{(amountInvested / 1000000000000000000).toString()} ETH</span> */}
                                                              <span><TrendingUp /></span></h3>
                                                        </div>
                                                    </div>
                                                    <div className="progress sm-progress-bar progress-animate">
                                                       
                                                    </div>
                                                    <span className="tag-content-secondary tag-hover-effect"><TrendingUp /></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-6 xl-50 col-md-6 box-col-6">
                                        <div className="card">
                                            <div className="card-body tag-card">
                                                <div className="progressbar-widgets">
                                                    <div className="media media-widgets">
                                                        <div className="media-body">
                                                            <p className="mb-0">TEV Acquired</p>
                                                            <h3 className="mt-0 mb-0 f-w-600">
                                                              {/* <span className="counter">{Math.floor(TEVAmount / 1000000000000000000).toString()} TEV</span> */}
                                                              <span><TrendingUp /></span></h3>
                                                        </div>
                                                    </div>
                                                    <div className="progress sm-progress-bar progress-animate">
                                                       
                                                    </div>
                                                    <span className="tag-content-secondary tag-hover-effect"><TrendingUp /></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  Container-fluid Ends */}
                </div>
          
          <FooterComponent />
        </div>
    </>
  )
}

export default HomePage