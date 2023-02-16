import { Link, useParams } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { convertMillisToString, getAccounts, getData, makeIPFSData, retrieveConternFromIPFS } from "../../utils/Utilities";
import "./BlogDetail.css";
import image from "../../images/image1.jpeg"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const BlogDetail = () => {
    const { id } = useParams();
    // console.log("test1: "+id);
    // const blogId = id.toString();
    // console.log(getAccounts()[0]);
    const [data, setData] = useState(
        {
            title: "",
            content: "",
            owner:["anonymous"],
            hidden: false,
            posted_time: new Date().getTime()
        }
    );

    const user = getAccounts();
    
    useEffect(() => {
        let cloneData = async () => {
            let ipfsData = await retrieveConternFromIPFS(id);
            setData(ipfsData);
        }
        cloneData();
    }, []);

    useEffect(() => {

    }, [data]);

    const navigate = useNavigate();
    const editBlog = () => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                <img
                    className="singlePostImg"
                    src={data.image == null ? image : data.image}
                    alt=""
                />
                <div className="singlePostEdit">
                    {
                        (data.owner[0] == user[0]) && (
                            <IconButton aria-label="settings" onClick={editBlog}>
                                <EditIcon />
                            </IconButton>
                        )
                    }

                </div>
                <h1 className="singlePostTitle">
                    {data.title}
                </h1>
                <div className="singlePostInfo">
                    <span>
                        Author:
                        <b className="singlePostAuthor">
                            <Link className="link" to={`/myBlogs/${data.owner[0]}`}>
                                {data.owner[0] != null ? data.owner[0].substring(0, 15) : ""}...
                            </Link>
                        </b>
                    </span>
                    <span>{convertMillisToString(data.posted_time)}</span>
                </div>
                <div className="singlePostDesc">
                    <div dangerouslySetInnerHTML={{ __html: data.content }} />
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;