import React from "react";
import GuiLoading from "../loading/css/GUILoading.css"
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { isMetaMaskInstalled } from "../../utils/Utilities";

const Load_btl = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translateX(-50%)"
    }

class GUILoading extends React.Component
{
    constructor(props) {
      super(props);
      this.state = {isToggleOn: true};
  
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
    }
  
    render() {
      return (
<>
                  <div classname = "load-btn">
                  <div className="load-container">

                        <>

                              <Button 
                                    style ={Load_btl}
                                >
                                    chán mãi ko viết được
                                
                              </Button>
                        </>
                  </div>
                  </div>
            </>
      );
    }
  }

export default GUILoading;