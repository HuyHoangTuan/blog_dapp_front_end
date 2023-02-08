import { Routes, Route, Navigate } from "react-router-dom";

import "./GUIBlog.css";
import Menubar from "../../components/menu_bar/MenuBar";
import SearchBar from "../../components/search_bar/SearchBar";
import Newstory from "../NewStory/Newstory"
import GUILoading from "../loading/GUILoading";
import GUIHome from "../home/GUIHome";
import BlogDetail from "../../components/blog_detail/BlogDetail";
import MyBlog from "../myblogs/MyBlog";

const GUIBlog = () => {
    return (
        <div className="blog_page">
            <div className="menu_bar">
                <Menubar />
            </div>
            <div className="main">
                <Routes>
                    <Route path="/" element={<GUIHome />} />
                    <Route path="/newStory" element={<Newstory />} />
                    <Route path="/myBlogs" element={<MyBlog />} />
                    <Route path="/blog/:id" element={<BlogDetail />} />
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