import React from 'react';
import {Route, Navigate} from 'react-router-dom';
import { isLogedIn, log } from '../../utils/Utilities';


function PrivateRoute(params)
{
     let auth = isLogedIn();
     // console.log("test1: "+JSON.stringify(params.children.props));
     return(
          auth ? params.children: <Navigate to = "/login" replace = {true} stat = {{from: params.path}}/>
     );
}

export default PrivateRoute;