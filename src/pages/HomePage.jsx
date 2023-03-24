import React, { useState } from 'react'
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FooterComponent from '../components/FooterComponent'
import HeaderComponent from '../components/HeaderComponent'
import SidebarComponent from '../components/SidebarComponent'
import { TrendingUp } from 'react-feather';

import { TevaSwapContract } from "../constants";
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import TevaSwap from "../json/TevaSwap.json"
import { utils } from "ethers";

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function HomePage() {

  const [buyerTevaPurchaseQty, setBuyerTevaPurchaseQty] = useState(0);
  const [buyerEthToWeiVal, setBuyerEthToWeiVal] = useState(0)

  const {userAddress, isConnected } = useAccount();
  
  const initialValues = {
    ETHAmount: '',
  };

  const validationSchema = Yup.object().shape({
    
    ETHAmount: Yup.string()
      .required('ETH Amount canonot be zero')
      .test(
      'is-decimal',
      'Enter a valid ETH amount',
      value => (value + "")
      .match(/^[0-9]\d*(\.\d+)?$/)
      ),
  });

  const getEthToWeiValue = (ethVal) => {
    var weiVal = ethVal;
    weiVal =  parseFloat(weiVal.value);
    weiVal = weiVal * 1000000000000000000;
    return weiVal.toString();
  }

  const getEthToUsdVal = (setSubmitting, resetForm) => {
    axios
    .get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
    .then(res => { 
        console.log(res.data);

        if(res.data){
          setSubmitting(false);
          resetForm();
          console.log(res.data.ethereum.usd);
          return res.data.ethereum.usd
      }else{
          console.log(res.data);
          setSubmitting(false);
          return false
      }
        
    })
    .catch(err => {
        console.error(err);
    });
  }

  const getEthToTevaValue = (buyerEthToUsdVal) => {
    let result = parseInt(buyerEthToUsdVal / 0.3);
    // return result.toString();
    return result;
  }

  const { config, error, isError } = usePrepareContractWrite({
      address: TevaSwapContract,
      abi: TevaSwap.abi,
      functionName: 'buyTeva',
      args: [
        buyerTevaPurchaseQty
      ],
      overrides: {
        from: userAddress,
        value: buyerEthToWeiVal.toString()
    }
  })

  const {
      data: BuyTevaData,
      write,
      isLoading: BuyTevaLoading,
      error: waitError,
      isError: iswaitError,
  } = useContractWrite(config)


  const {isLoading: BuyTevaLoader} = useWaitForTransaction({
    hash: BuyTevaData?.hash,
    onSuccess(){
        toast('TEV Purchase Successful')
    },
    onError(data){
        toast('ERROR: Something went wrong') 
        console.log(data)
    }

})


// const contractCaller = async () => {
//   console.log('hello')
//   BuyTevaWrite()
// }

  const onSubmit = (values, { setSubmitting, resetForm }) => {

    let ethVal = values.ETHAmount;
    let buyerEthToUsdVal = ethVal * getEthToUsdVal(setSubmitting, resetForm);
    let ethToWei = getEthToWeiValue(ethVal);

    if(isNaN(ethToWei)){
      ethToWei = '0';
    }
    setBuyerEthToWeiVal(ethToWei)

    let TevaPurchaseQty = getEthToTevaValue(buyerEthToUsdVal);

    if(isNaN(TevaPurchaseQty)){
      TevaPurchaseQty = '0';
    }
    setBuyerTevaPurchaseQty(TevaPurchaseQty)

    
    write?.()
    console.log('hello')

            
  };


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
                                <h5>Buy TEV</h5>
                            </div>

                            {isConnected  ? 
                            
                              <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                              >

                                {({ isSubmitting }) => (
                                    <Form className="form-inline" >  
                                      <div className="contact-form card-body">
                                      
                                          <div className="input-group">
                                              <Field type="text" name="ETHAmount" id="ETHAmount" className="form-control" placeholder="eg : 1" />
                                              
                                              <button type="submit" className="btn btn-primary-gradien" disabled={isSubmitting || BuyTevaLoading || BuyTevaLoader} >
                                          {(BuyTevaLoading || BuyTevaLoader) ? "Loading..." : "Buy TEV"}</button>
                                          </div>
                                          <ErrorMessage name="ETHAmount" component="div" style={{color: '#EB844E'}} />

                                      </div>                                  
                                  </Form>
                                )}
                              </Formik>

                            :
                            
                              <p>Connect wallet to buy Teva</p>
                            
                            }


                            {(iswaitError || isError) && (
                                <p>Error: {(waitError  || error)?.message}</p>
                            )}

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
                                                      <span className="counter">{utils.formatEther(buyerEthToWeiVal)} ETH</span>
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
                                                      <span className="counter">{utils.formatEther(buyerTevaPurchaseQty)} TEV</span>
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