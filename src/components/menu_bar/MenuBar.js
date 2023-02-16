import "./MenuBar.css";
import { useNavigate } from "react-router-dom";
// import { useMoralis } from "react-moralis";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import Logout from "@mui/icons-material/Logout";
import RateReviewIcon from "@mui/icons-material/RateReview";
import logo from "../../images/logo.png";
import { getAccounts } from "../../utils/Utilities";
import { logOut } from "../../utils/Utilities";
const Menubar = () => {


    const navigate = useNavigate();

    const onClickLogOut = () => {
        logOut();
        navigate("/login");
    };  

    return (
        <div className="menubar">
            <img className="logo" src={logo}></img>
            <div className="menu">
                <div className="menuItems" onClick={() => { navigate('/') }}>
                    <HomeIcon sx={{ fontSize: 35 }}/>
                </div>
                <div className="menuItems" onClick={() => { navigate(`/myBlogs/${getAccounts()[0]}`) }}>
                    <BookIcon sx={{ fontSize: 30 }}/>
                </div>
                <div className="menuItems" onClick={() => { navigate('/newblog') }}>
                    <RateReviewIcon sx={{ fontSize: 30 }}/>
                </div>
            </div>
            <div className="logout" onClick={onClickLogOut}>
                <Logout sx={{ fontSize: 30 }}/>
            </div>
        </div>
    );
};

export default Menubar;