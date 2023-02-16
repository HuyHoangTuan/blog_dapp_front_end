import {React} from "react";
import {Route, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
// import pages
import GUILogin from "../../pages/login/GUILogin";
import PrivateRoute from "./PrivateRoute";
import GUIBlog from "../../pages/blog/GUIBlog";
import { _getNodeIPFS } from "../../utils/Utilities";


const CustomRouter = createBrowserRouter(
    createRoutesFromElements(
        [
            <Route
                path ="/login"
                loader = {
                    async (props) => {
                        await _getNodeIPFS();
                        console.log("GUILogin loader: "+JSON.stringify(props));
                        return props;
                    }
                }
                element = {
                    <GUILogin/>
                }
            />,

            <Route
                path ="/*"
                loader = {
                    async (props) => {
                        let ipfs_node = await _getNodeIPFS();
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
        
    ),
    {
        basename: "/blog_dapp_front_end"
    }
)

export default CustomRouter;