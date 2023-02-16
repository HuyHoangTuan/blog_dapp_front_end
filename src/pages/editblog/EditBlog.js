import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./EditBlog.css";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addFileToIPFS, getAccounts, makeIPFSData, retrieveConternFromIPFS } from '../../utils/Utilities';
import { useEffect } from 'react';
import { useRef } from 'react';
import { editBlog } from '../../utils/Abi';
import Button from '@mui/material/Button';


const EditBlog = () => {
    const { id } = useParams();
    const blogId = id.toString();
    const navigate = useNavigate();
    const [title, setTitle] = useState("Title ...");
    const [body, setBody] = useState("Body ...");
    const [disabledBtn, setDisabledBtn] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const titleRef = useRef();
    const bodyRef = useRef();
    const [data, setData] = useState(
        {
            title: "",
            content: "",
            owner: ["anonymous"],
            hidden: false,
            posted_time: new Date().getTime()
        }
    );

    useEffect(() => {
        let cloneData = async () => {
            let ipfsData = await retrieveConternFromIPFS(blogId);
            setData(ipfsData);
            setTitle(ipfsData.title);
            setBody(ipfsData.content);
            setSelectedImage(ipfsData.image);
            if (ipfsData.owner[0] != await getAccounts()[0]) {
                navigate(`/blog/${blogId}`);
            }
        }
        cloneData();
    }, []);

    useEffect(() => {
        console.log("Did reset title and body!");
        titleRef.current.value = title;
        bodyRef.current.value = body;
    }, [title, body]);

    async function convertImgToBase64(img) {
        if (img == null) {
            setSelectedImage(null);
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImage(reader.result)
        }
        reader.readAsDataURL(img);
    }

    async function submit(e) {
        e.preventDefault();
        setDisabledBtn(true);
        let new_data = makeIPFSData(
            {
                title: titleRef.current.value,
                content: bodyRef.current.value,
                owner: data.owner,
                hidden: false,
                posted_time: data.posted_time,
                image: selectedImage
            }
        );
        let res = await addFileToIPFS("blog.json", new_data);
        let new_uri = res.cid.toString();
        if (blogId == new_uri) {
            setDisabledBtn(false);
            return;
        };
        console.log("old", blogId);
        console.log("new", new_uri);
        await editBlog(blogId, new_uri);
        alert(`Your blog is edited successfully: ${new_uri}`);

        navigate(`/blog/${new_uri}`);
    }


    return (
        <div className="editBlog">
            <div className='edit'>
                <h2>Edit your blog</h2>
                <div className='importImg'>
                    <input
                        type="file"
                        name="myImage"
                        onChange={(event) => {
                            convertImgToBase64(event.target.files[0]);
                        }}
                    />
                    {selectedImage && (
                        <div>
                            <img alt="not fount" width={"250px"} src={selectedImage} />
                            <br />
                            <Button sx={{ marginTop: "4px", maxWidth: "80px", color: "red", fontSize: "17px" }} color="primary"
                                onClick={() => {
                                    convertImgToBase64(null)
                                }} >
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                    autoComplete="off"
                    onSubmit={(e) => submit(e)}
                >
                    <div>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Blog title"
                            multiline
                            required
                            maxRows={4}
                            inputRef={titleRef}
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Blog body"
                            multiline
                            required
                            minRows={18}
                            inputRef={bodyRef}
                        />
                        <div className='save'>
                            <button className='saveButton' disabled={disabledBtn}>Save</button>
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    );
};

export default EditBlog;