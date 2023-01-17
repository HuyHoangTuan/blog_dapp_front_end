import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './css/GUILogin.css'

// Utility
import { isMetaMaskInstalled } from "../../utils/Utilities";
const login_btn = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translateX(-50%)"
}

const GUILogin = () =>
{
      // url params
      let params = useParams();

      // ref
      let btn_login_ref = useRef();
      // variations
      let btn_login_text = "Connect to MetaMask";
      let isAvailableMetaMask = isMetaMaskInstalled();
      // console.log("GUILogin params: "+JSON.stringify(params));
      
      if(isAvailableMetaMask === false)
      {
            btn_login_text = "Click here to install MetaMask";
      }

      let handleClickLoginBtn = async () =>{
            let btn_login = btn_login_ref.current;
            if(isAvailableMetaMask)
            {
                  btn_login.innerText = "Connecting";
                  btn_login.disabled = true;
                  
                  let func_connect = async () => {
                        let output = {};
                        try 
                        {
                              let {ethereum} = window;
                              output = await ethereum.request(
                                    {
                                          method: 'eth_requestAccounts'
                                    }
                              );
                        }
                        catch(e)
                        {
                              output = e;
                        }
                        return output
                  }

                  let res = await func_connect();

                  if(res.code === 4001)
                  {
                        btn_login.innerText = "Failed to connecto to MetaMask"
                        btn_login.disabled = true;

                        let func_reconnect = () => {
                              btn_login.innerText = "Trying to reconnect";
                              btn_login.disabled = true;
                              // func_reconnect();
                        };
                        
                        setTimeout(() => {
                              func_reconnect();

                        }, 3000);
                        
                  }
                  else
                  {
                        btn_login.innerText = "Connected";
                        btn_login.disabled = true;
                  }
            }
            else
            {

            }
      }
      useEffect(() => {

      });
      
      return(
            <>
                  <div className="login-container">
                        <>

                              <Button 
                                    style ={login_btn}
                                    variant="primary"
                                    size = 'lg'
                                    onClick={handleClickLoginBtn}
                                    ref={btn_login_ref}
                              >
                                    {btn_login_text}
                              </Button>
                        </>
                  </div>
                  
            </>
            
      );
}

export default GUILogin;