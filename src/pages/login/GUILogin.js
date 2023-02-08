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
import {isMetaMaskInstalled } from "../../utils/Utilities";
import { useLocation, useNavigate } from "react-router-dom";

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
      // let params = useNavigate();
      // console.log("test1: "+JSON.stringify(params));

      // ref
      let btnLoginRef = useRef();
      let metaMaskOnboardingRef = useRef();

      // variations
      const CONNECTING = "Connecting";
      const INSTALL_METAMASK = "Install Metamask";
      const INSTALLING_METAMASK = "Installing Metamask";
      const CONNECT = "Connect";
      const CONNECTED = "Connected";


      let [isAvailableMetaMask, setAvaiableMetatMask] = useState(false);
      let [accounts, setAccounts] = useState([]);
      let [btnLoginText, setBtnLoginText]  = useState(CONNECT);
      let [metaMaskRes, setMetaMaskRes] = useState({});
      let [alertInfo, setAlertInfo] = useState({isShowAlert: false, message: ''});
      
      // navigate - redirect
      let navigate = useNavigate();
      let location = useLocation();
      let prevPath = "/";
      if(location.state != null && location.state.from != null)
      {
            prevPath = location.state.from;
      }

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
                  metaMaskOnboardingRef.current.startOnboarding();
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

      // useEffect
      // every re-render
      useEffect(() => {
            // passing to next frame to process
            setTimeout(() => {
                  setAvaiableMetatMask(isMetaMaskInstalled());
            }, 0);

            let localAccounts = JSON.parse(sessionStorage.getItem("accounts"));
            if(localAccounts == null || (localAccounts != null && localAccounts.length === 0))
            {
                  sessionStorage.setItem("accounts", JSON.stringify([]));
            }
            else
            {
                  setTimeout(() => {
                        setAccounts(localAccounts);
                  },0);
            }
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
                        btnLogin.disabled = true;
                        break;

                  case INSTALLING_METAMASK:
                        btnLogin.disabled = true;
                        break;

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
            // console.log(metaMaskRes);
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
                        let accounts = metaMaskRes;
                        setAccounts(accounts);
                        break;
            }
      }, [metaMaskRes]) ;

      useEffect(() => {
            if(accounts.length > 0)
            {
                  console.log("cached accounts: "+JSON.stringify(accounts));
                  sessionStorage.setItem("accounts", JSON.stringify(accounts));
                  // let func = async () => {

                  //       await publishBlog("huyht5");
                  //       await getListUriOfAddress(getAccounts()[0]);
                  // }
                  // func();
                  navigate(
                        prevPath,
                        {
                              state: {
                                    from:"/login"
                              }
                        }
                  )
                  
            }
      }, [accounts]);

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