import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function GUILogin()
{
      let params = useParams();
      // console.log("GUILogin params: "+JSON.stringify(params));

      useEffect(() => {

      });

      return(
            <div>
                  Login Page
            </div>
      );
}

export default GUILogin;