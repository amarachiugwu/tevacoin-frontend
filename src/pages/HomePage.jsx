import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FooterComponent from '../components/FooterComponent'
import HeaderComponent from '../components/HeaderComponent'
import SidebarComponent from '../components/SidebarComponent'
import { TrendingUp } from 'react-feather';
import { ThreeDots } from 'react-loader-spinner'

import { TevaSwapContract, TevaPrice, minPurchaseEthAmt } from "../constants";
import { useAccount, useContractWrite, useContractRead, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import TevaSwap from "../json/TevaSwap.json"
import { ethers } from "ethers";

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function HomePage() {
  
  const [ethVal, setEthVal] = useState('')
  const [ethToUsdVal, setEthToUsdVal] = useState('')
  const [buyerTevaPurchaseQty, setBuyerTevaPurchaseQty] = useState('');
  const [buyerPrevTevaPurchaseQty, setBuyerPrevTevaPurchaseQty] = useState();
  const [userTevaBalance, setUserTevaBalance] = useState('')
  const [userEthDeposit, setUserEthDeposit] = useState()


  const { address: userAddress, isConnected } = useAccount();
  
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

  const getEthToTevaValue = (buyerEthToUsdVal) => {
    let result = parseInt(buyerEthToUsdVal / TevaPrice);
    return result.toString();
  }

  const getEthToUsdVal = () => {
    axios
    .get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
    {headers: {
      'Retry-After': '120',
      'Access-Control-Allow-Origin': '*' // Allow requests from any origin
    }})
    .then(res => { 

        if(res.data){
          const usdVal = res.data.ethereum.usd;
          setEthToUsdVal(usdVal)
          return usdVal
      }else{
          console.log(res.data);
          return false
      }
        
    })
    .catch(err => {
        console.error(err);
    });
  }

  const { config, error, isError } = usePrepareContractWrite({
      address: TevaSwapContract,
      abi: TevaSwap.abi,
      functionName: 'buyTeva',
      args: [
        ethers.utils.parseUnits(ethers.utils.formatEther((buyerTevaPurchaseQty * 10 ** 18).toString()))
      ],
      overrides: {
        value: ethers.utils.parseUnits(ethers.utils.formatEther((ethVal * 10 ** 18).toString()))
    }
  })
  
  const { data :getUserEthDeposit } = useContractRead({
    address: TevaSwapContract,
    abi: TevaSwap.abi,
    functionName: 'balances',
    args: [userAddress],
  })

  const { data :getUserTevaBalance } = useContractRead({
    address: TevaSwapContract,
    abi: TevaSwap.abi,
    functionName: 'balanceOf',
    args: [userAddress],
  })

  const {
      data: useContractWriteData,
      write: buyTevaWithEth,
      isLoading: isWriteLoading,
      error: waitError,
      isError: iswaitError,
  } = useContractWrite(config)

  const {data: useWaitForTransactionData, isLoading: isWaitLoading} = useWaitForTransaction({
    hash: useContractWriteData?.hash,
    onSuccess(){
        toast('TEV Purchase Successful')
    },
    onError(data){
        toast('ERROR: Something went wrong') 
        console.log(data)
    }

})

  const onSubmit = async(values, { setSubmitting, resetForm }) => {

    setEthVal(values.ETHAmount);
     
  };


  useEffect(() => {
    // console.log("useContractWriteData", useContractWriteData);
    // console.log("useContractWaiteData", useWaitForTransactionData);
    // console.log("getUserEthDeposit", getUserEthDeposit);
    // console.log("getUserTevaBalance", getUserTevaBalance);


    if (buyerTevaPurchaseQty !== buyerPrevTevaPurchaseQty) {

      if (ethVal !== '' ){

        getEthToUsdVal()

        if (ethToUsdVal !== '') {
          const tevaVal = getEthToTevaValue((ethToUsdVal * ethVal))
          setBuyerPrevTevaPurchaseQty(buyerTevaPurchaseQty)
          // console.log(ethers.utils.parseEther(buyerTevaPurchaseQty))
          setBuyerTevaPurchaseQty(tevaVal)

          if (buyerTevaPurchaseQty) {
            buyTevaWithEth?.()
          }
        }

      }
    }

    if (getUserEthDeposit) {
      setUserEthDeposit(ethers.utils.formatEther(getUserEthDeposit))
    }

    if (getUserTevaBalance) {
      setUserTevaBalance(ethers.utils.commify(getUserTevaBalance.toString()))
    }

    // return 

  }, [ethVal, ethToUsdVal, buyerTevaPurchaseQty, userEthDeposit, userTevaBalance])
  
  // , useContractWriteData, useWaitForTransactionData, getUserEthDeposit, getUserTevaBalance

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
                                <h5 style={{textAlign:'center'}}>Buy TEV</h5>
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
                                              <Field type="text" name="ETHAmount" id="ETHAmount" className="form-control" placeholder={`min amount : ${minPurchaseEthAmt} eth`} />
                                              
                                              <button type="submit" className="btn btn-primary-gradien" disabled={isSubmitting || isWriteLoading || isWaitLoading} >
                                          {(isWriteLoading || isWaitLoading) ? "Loading..." : "Buy TEV"}</button>
                                          </div>
                                          <ErrorMessage name="ETHAmount" component="div" style={{color: '#EB844E'}} />

                                      </div>                                  
                                  </Form>
                                )}
                              </Formik>

                            :
                            
                              <p style={{textAlign:'center'}}>Connect wallet to buy Teva</p>
                            
                            }


                            {(iswaitError || isError) && (waitError || error)?.code !== "INVALID_ARGUMENT" && isConnected &&  (
                              <>
                                <p style={{textAlign:'center'}}>Error: Something went wrong 
                                </p>
                                <p style={{textAlign:'center'}}>Reason : {(waitError || error)?.code}</p>
                              </>
                                
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
                                                      
                                                      {!userEthDeposit ? (
                                                        <ThreeDots 
                                                          height="80" 
                                                          width="80" 
                                                          radius="9"
                                                          color="#4fa94d" 
                                                          ariaLabel="three-dots-loading"
                                                          wrapperStyle={{}}
                                                          wrapperClassName=""
                                                          visible={true}
                                                        />
                                                      ) : (
                                                        <>
                                                          <span className="counter">{isConnected  ? userEthDeposit : '-.--' } ETH</span>
                                                          <span><TrendingUp /></span>
                                                        </>
                                                      )}
                                                    </h3>
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
                                                      {!userEthDeposit ? (
                                                        <ThreeDots 
                                                          height="80" 
                                                          width="80" 
                                                          radius="9"
                                                          color="#4fa94d" 
                                                          ariaLabel="three-dots-loading"
                                                          wrapperStyle={{}}
                                                          wrapperClassName=""
                                                          visible={true}
                                                        />
                                                      ) : (
                                                        <>
                                                          <span className="counter">{isConnected  ? userTevaBalance : '-.--' } TEV</span>
                                                          <span><TrendingUp /></span>
                                                        </>
                                                      )}
                                                    </h3>
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