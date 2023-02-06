import {React} from "react";
import {Route, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
// import pages
import GUILoading from "../../pages/loading/GUILoading";
import GUILogin from "../../pages/login/GUILogin";
import GUIHome from "../../pages/home/GUIHome";
import Newstory from "../../pages/NewStory/Newstory";
import PrivateRoute from "./PrivateRoute";


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
                    //<PrivateRoute path ="/">
                       <GUIHome/>
                    //</PrivateRoute>
                    // isLogedIn() === true ? <GUIHome/> : <Navigate to = "/login" replace = {true}/>
                }
            />,

            <Route
                path ="/Myblog"
                loader = {
                    (props) => {
                        console.log("GUILoading loader: "+JSON.stringify(props));
                        return props;
                    }
                }
                element = {
                    <GUILoading/> 
                }
            />,
            <Route
                path ="/Newstory"
                loader = {
                    (props) => {
                        console.log("Newstory loader: "+JSON.stringify(props));
                        return props;
                    }
                }
                element = {
                    <Newstory/>
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