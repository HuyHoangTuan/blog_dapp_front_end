import {React} from "react";
import {Route, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
// import pages
import GUILogin from "../../pages/login/GUILogin";
import PrivateRoute from "./PrivateRoute";
import GUIBlog from "../../pages/blog/GUIBlog";


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
                    <PrivateRoute path ="/">
                        <GUIBlog/>
                    </PrivateRoute>
                    // isLogedIn() === true ? <GUIHome/> : <Navigate to = "/login" replace = {true}/>
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
            />,

            <Route
                path ="*"
                loader = {
                    (props) => {
                        console.log("GUIHome loader: "+JSON.stringify(props));
                        return props;
                    }
                }
                element = {
                    <PrivateRoute path ="/">
                        <GUIBlog/>
                    </PrivateRoute>
                    // isLogedIn() === true ? <GUIHome/> : <Navigate to = "/login" replace = {true}/>
                }
            />,

        ]
        
    )
)

export default CustomRouter;