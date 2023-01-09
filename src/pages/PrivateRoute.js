import React from 'react';
import {Route, createRoutesFromElements} from 'react-router-dom';
import { isLogedIn } from '../utils/Utilities';

function PrivateRoute(params)
{
    let path = params.location || null;
    let element = params.element || null;
    if(path == null || element == null)
    {
        return null;
    }

    let preloader = params.preloader || null;

    if(isLogedIn() === true)
    {
        element = element;
    }
    else
    {
        // todo: login page
        // element = 
        // path = 
    }

    return createRoutesFromElements(
        <Route
            path = {path}
            element = {<element/>}
            loader = {() => { preloader && preloader()}}
        />
    );
}
const PrivateRoute = createRoutesFromElements(

)