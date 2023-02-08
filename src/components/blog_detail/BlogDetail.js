import { Link, useParams } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getData } from "../../utils/Utilities";
import "./BlogDetail.css";

const BlogDetail = () => {
    const { id } = useParams();
    const blogId = id.toString();

    const data = getData(blogId);

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                <img
                    className="singlePostImg"
                    src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                />
                <div className="singlePostEdit">
                    <IconButton aria-label="settings">
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="settings">
                        <DeleteIcon />
                    </IconButton>
                </div>
                <h1 className="singlePostTitle">
                    {data.title}

                </h1>
                <div className="singlePostInfo">
                    <span>
                        Author:
                        <b className="singlePostAuthor">
                            <Link className="link" to="/posts/username={data.owner}">
                                {data.owner}
                            </Link>
                        </b>
                    </span>
                    <span>{data.posted_time}</span>
                </div>
                <div className="singlePostDesc">
                    <div dangerouslySetInnerHTML={{ __html: data.content }} />
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;