import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// bootstrap
import Button from 'react-bootstrap/Button';
import Alert from "react-bootstrap/Alert";
// css
import './css/GUILogin.css'

// metamask
import MetaMaskOnboarding from '@metamask/onboarding';

// Utility
import { isMetaMaskInstalled } from "../../utils/Utilities";

// inline_style
const login_btn = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translateX(-50%)"
}

const GUILogin = () =>
{
      // url params
      // let params = useParams();

      // ref
      let btnLoginRef = useRef();
      let metaMaskOnboardingRef = useRef();

      // variations
      const CONNECTING = "Connecting";
      const INSTALL_METAMASK = "Install Metamask";
      const INSTALLING_METAMASK = "Installing Metamask";
      const CONNECT = "Connect";
      const CONNECTED = "Connected";

      let [btnLoginText, setBtnLoginText]  = useState(CONNECT);
      let [isAvailableMetaMask, setAvaiableMetatMask] = useState(false);
      let [metaMaskRes, setMetaMaskRes] = useState({});
      let [alertInfo, setAlertInfo] = useState({isShowAlert: false, message: ''});
      // console.log("GUILogin params: "+JSON.stringify(params));
      
      

      // handle connect to metamask
      // let handleClickLoginBtn = async () =>{
      //       let btn_login = btn_login_ref.current;
            
      //       let _handleAvailableMetaMask = async () => {
      //             btn_login.innerText = "Connecting";
      //             btn_login.disabled = true;
                  
      //             let func_connect = async () => {
      //                   let output = {};
      //                   try 
      //                   {
      //                         let {ethereum} = window;
      //                         output = await ethereum.request(
      //                               {
      //                                     method: 'eth_requestAccounts'
      //                               }
      //                         );
      //                   }
      //                   catch(e)
      //                   {
      //                         output = e;
      //                   }
      //                   return output
      //             }

      //             let res = await func_connect();
      //             console.log(res);
      //             if(res.code === 4001)
      //             {
      //                   btn_login.innerText = "Failed to connecto to MetaMask"
      //                   btn_login.disabled = true;

      //                   let func_reconnect = () => {
      //                         btn_login.innerText = "Trying to reconnect";
      //                         btn_login.disabled = true;
      //                         // func_reconnect();
      //                   };
                        
      //                   setTimeout(() => {
      //                         func_reconnect();

      //                   }, 3000);
                        
      //             }
      //             else
      //             {
      //                   // todo: redirect to main page
      //                   btn_login.innerText = "Connected";
      //                   btn_login.disabled = true;
      //             }
      //       }

      //       let _handleUnAvailableMetaMask = async () => {

      //       }
      //       if(isAvailableMetaMask)
      //       {
      //             _handleAvailableMetaMask();
      //       }
      //       else
      //       {
      //             _handleUnAvailableMetaMask();
      //       }
      // }

      // for handle click
      const _handleClickLoginBtn = function() 
      {
            // let btnLogin = btnLoginRef.current;

            const _handleAvailableMetaMask = async function()
            {
                  setBtnLoginText(CONNECTING);
                  let {ethereum} = window;
                  ethereum
                        .request({
                              method: 'eth_requestAccounts'
                        })
                        .then((res) => {
                              setMetaMaskRes(res);
                        })
                        .catch((e) => {
                              setMetaMaskRes(e);
                        });
            }

            const _handleUnAvailableMetaMask = function()
            {
                  setBtnLoginText(INSTALLING_METAMASK);
            }

            if(isAvailableMetaMask === true)
            {
                  _handleAvailableMetaMask();
            }
            else
            {
                  _handleUnAvailableMetaMask();
            }
      }

      // close alert
      const _handleClickCloseAlertBtn = function()
      {
            setAlertInfo(
                  {
                        isShowAlert: false,
                        message: ''
                  }
            );

            if(isAvailableMetaMask === isMetaMaskInstalled())
            {
                  if(isAvailableMetaMask === false)
                  {
                        setBtnLoginText(INSTALL_METAMASK);
                        if(metaMaskOnboardingRef.current == null)
                        {
                              metaMaskOnboardingRef.current = new MetaMaskOnboarding();
                        }
                  }     
                  else
                  {
                        setBtnLoginText(CONNECT);
                  }
            }
            else
            {
                  setAvaiableMetatMask(isMetaMaskInstalled());
            }
      }

      // every re-render
      useEffect(() => {
            setAvaiableMetatMask(isMetaMaskInstalled());
      }, []);
      
      // for every re-render, only perform when isAvailableMetaMask was changed
      useEffect(() => {
            if( isAvailableMetaMask === true)
            {
                  setBtnLoginText(CONNECT);
            }
            else
            {
                  setBtnLoginText(INSTALL_METAMASK);
                  if(metaMaskOnboardingRef.current == null)
                  {
                        metaMaskOnboardingRef.current = new MetaMaskOnboarding();
                  }
            }
      }, [isAvailableMetaMask]);

      // for every re-render, only perform when btnLoginText was changed
      useEffect(() => {
            let btnLogin = btnLoginRef.current;
            switch (btnLoginText)
            {
                  case CONNECTING:
                  case INSTALLING_METAMASK:
                  case CONNECTED:
                        btnLogin.disabled = true;
                        break;

                  default:
                        btnLogin.disabled = false;
                        break;
            }

            btnLogin.innerText = btnLoginText;
      }, [btnLoginText]);

      useEffect(() => {
            let code = metaMaskRes.code;
            let message = metaMaskRes.message;

            switch (code)
            {
                  case 4001:
                        setAlertInfo(
                              {
                                    isShowAlert: true,
                                    message: message
                              }
                        );
                        break;
                  
                  default:
                        setAlertInfo(
                              {
                                    isShowAlert: false,
                                    message: ""
                              }
                        );
                        break;
            }
      }, [metaMaskRes]) ;
      return(
            <>
                  <Alert
                        show = {alertInfo.isShowAlert}
                        variant = 'danger'
                        onClose={_handleClickCloseAlertBtn}
                        dismissible
                  >
                        <Alert.Heading>
                              Something's wrong!
                        </Alert.Heading>
                        <p>
                              {alertInfo.message}
                        </p>
                  </Alert>
                  <div className="login-container">
                        <Button 
                              style ={login_btn}
                              variant="primary"
                              size = 'lg'
                              onClick={_handleClickLoginBtn}
                              ref={btnLoginRef}
                        >
                        </Button>
                  </div>
            </>
            
      );
}

export default GUILogin;