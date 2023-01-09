import {React, Suspense} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import GUILoading from "./loading/GUILoading";
const Router = () =>{
    return
    (
        <Router>
            <Suspense fallback={<GUILoading/>}>

            </Suspense>
        </Router>
    );
}

export default Router;