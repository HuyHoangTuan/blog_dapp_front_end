import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./PostBlog.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addFileToIPFS, getAccounts, makeIPFSData } from '../../utils/Utilities';
import { publishBlog } from '../../utils/Abi';
import { useEffect } from 'react';
import { useRef } from 'react';
import Button from '@mui/material/Button';

const PostBlog = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [disabledBtn, setDisabledBtn] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const titleRef = useRef();
    const bodyRef = useRef();
    const btnRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        setDisabledBtn(false);
        // btnRef.current.disabled = disabledBtn;
    }, []);

    useEffect(() => {

    }, [disabledBtn])

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
        // btnRef.current.disabled = true;

        let currentTime = new Date().getTime();
        let data = makeIPFSData(
            {
                title: titleRef.current.value,
                content: bodyRef.current.value,
                owner: [getAccounts()[0]],
                hidden: false,
                posted_time: currentTime,
                image: selectedImage
            }
        );
        let res = await addFileToIPFS("blog.json", data);
        let uri = res.cid.toString();
        await publishBlog(uri);

        // setDisabledBtn(true);


        alert(`Successfully publish a blog with uri: ${uri}`);

        // setTitle("");
        // setBody("");
        navigate(`/blog/${uri}`);

    }

    return (
        <div className="postBlog">
            <div className='create'>
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
                            minRows={15}
                            inputRef={bodyRef}
                        />
                        <div className='publish'>
                            <button className='publishButton'
                                ref={btnRef}
                            >
                                Publish
                            </button>
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    );
};

export default PostBlog;