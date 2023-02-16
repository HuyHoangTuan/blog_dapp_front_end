import { Routes, Route } from "react-router-dom";

import "./GUIBlog.css";
import Menubar from "../../components/menu_bar/MenuBar";
import SearchBar from "../../components/search_bar/SearchBar";
import GUIHome from "../home/GUIHome";
import MyBlog from "../myblogs/MyBlog";
import BlogDetail from "../blog_detail/BlogDetail";
import PostBlog from "../postblog/PostBlog";
import EditBlog from "../editblog/EditBlog";
import { getListUriOfAddress } from "../../utils/Abi";
const GUIBlog = () => {
    return (
        <div className="blog_page">
            <div className="menu_bar">
                <Menubar />
            </div>
            <div className="main">
                <Routes>
                    <Route path="/" element={<GUIHome />} />
                    <Route path="/newblog" element={<PostBlog />} />
                    <Route 
                        path="/myBlogs/:id" 
                        element={<MyBlog />} 
                    />
                    <Route path="/blog/:id" element={<BlogDetail />} />
                    <Route path="/edit/:id" element={<EditBlog />} />
                    {/* <Route path="/*" element={<Navigate to="/" />} /> */}
                </Routes>
            </div>
            <div className="search_bar">
                <SearchBar />
            </div>
        </div>
    )
};

export default GUIBlog;