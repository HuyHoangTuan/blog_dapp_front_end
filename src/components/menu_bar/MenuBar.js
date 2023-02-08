import "./MenuBar.css";
import { useNavigate } from "react-router-dom";
// import { useMoralis } from "react-moralis";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import Logout from "@mui/icons-material/Logout";
import RateReviewIcon from "@mui/icons-material/RateReview";
// import logo from "../images/m.png";

const Menubar = () => {

    const logOut = () => {
        console.log("Log out!")
    };
    const navigate = useNavigate()

    return (
        <div className="menubar">
            <img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRetcb6__A8ysu5BpdtjjLDja0ritjT8UeTNg&usqp=CAU"></img>
            <div className="menu">
                <div className="menuItems" onClick={() => { navigate('/') }}>
                    <HomeIcon sx={{ fontSize: 35 }}/>
                </div>
                <div className="menuItems" onClick={() => { navigate('/myBlogs') }}>
                    <BookIcon sx={{ fontSize: 30 }}/>
                </div>
                <div className="menuItems" onClick={() => { navigate('/newStory') }}>
                    <RateReviewIcon sx={{ fontSize: 30 }}/>
                </div>
            </div>
            <div className="logout" onClick={logOut}>
                <Logout sx={{ fontSize: 30 }}/>
            </div>
        </div>
    );
};

export default Menubar;