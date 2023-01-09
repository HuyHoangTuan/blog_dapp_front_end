import {React, Suspense} from "react";
import {BrowserRouter as Router, Routes, Route, useParams, createBrowserRouter, createRoutesFromElements, Navigate} from 'react-router-dom';
import { isLogedIn } from "../../utils/Utilities";

// import pages
import GUILoading from "../../pages/loading/GUILoading";
import GUILogin from "../../pages/login/GUILogin";
import GUIHome from "../../pages/home/GUIHome";


const CustomRouter = createBrowserRouter(
    createRoutesFromElements(
        [
            <Route
                path ="/"
                loader = {
                    (props) => {
                        console.log("GUIHome loader: "+JSON.stringify(props));
                        return props;
                    }
                }
                element = {
                    isLogedIn() === true ? <GUIHome/> : <Navigate to = "/login" replace = {true}/>
                }
            />,

            <Route
                path ="/login"
                loader = {
                    (props) => {
                        console.log("GUILogin loader: "+JSON.stringify(props));
                        return props;
                    }
                }
                element = {
                    <GUILogin/>
                }
            />

        ]
        
    )
)

export default CustomRouter;