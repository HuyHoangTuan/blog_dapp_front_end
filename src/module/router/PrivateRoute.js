import React from 'react';
import {Navigate} from 'react-router-dom';
import { isLogedIn } from '../../utils/Utilities';


function PrivateRoute(params)
{
     let auth = isLogedIn();
     // console.log("test1: "+JSON.stringify(params.children.props));
     return(
          auth ? params.children: <Navigate to = "/login" replace = {true} state = {{from: params.path}}/>
     );
}

export default PrivateRoute;