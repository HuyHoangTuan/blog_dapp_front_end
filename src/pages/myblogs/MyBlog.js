import "./MyBlog.css";
import {
    convertMillisToString,
    getAccounts,
    getData,
    getMyBlogs,
} from "../../utils/Utilities";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArticleIcon from "@mui/icons-material/Article";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useState } from "react";
import { getAllPublishedBlogs, getListUriOfAddress, getMedalOf } from "../../utils/Abi";
import { useEffect } from "react";
import { retrieveConternFromIPFS } from "../../utils/Utilities";
const MyBlog = () => {
    let params = useParams();
    let account = params.id;

    // let loaderData = useLoaderData();
    // console.log(loaderData);
    let [uriList, setUriList] = useState([]);
    let [blogList, setBlogList] = useState([]);
    let [totalMedals, setTotalMedals] = useState(0);
    // let [listMedal, setListMedal] = useState([]);
    let cloneData = async () => {
        let data = await getListUriOfAddress(account);
        setBlogList([]);
        setUriList(data);
    };

    useEffect(() => {
        cloneData();
    }, []);

    useEffect(() => {
        cloneData();
    }, [account]);

    useEffect(() => {
        let decodeData = async () => {
            let mirrorBlogList = [];
            let mirrorTotalMedal = 0;
            // console.log(uriList);
            for (let i = 0; i < uriList.length; i++) {
                let func = async () => {
                    let data = await retrieveConternFromIPFS(uriList[i]);
                    // console.log(data);
                    if (data != null) {
                        data.uri = uriList[i];

                        let countMedals = async () => {

                            let medal = await getMedalOf(uriList[i]);
                            data.totalMedals = Number(medal);
                            mirrorTotalMedal += Number(medal);
                            // totalMedals+=medal;
                        }

                        await countMedals();


                        mirrorBlogList.push(data);

                    }
                };
                await func();

            }
            mirrorBlogList.sort((a, b) => {

                if (a.totalMedals === b.totalMedals) {
                    // console.log(a.posted_time+ " -- "+b.posted_time);
                    return - a.posted_time + b.posted_time;
                }

                // console.log(a);
                // console.log(b);
                // console.log(-a.totalMedals + b.totalMedals);
                return -a.totalMedals + b.totalMedals;
            });
            setTotalMedals(mirrorTotalMedal);
            setBlogList(mirrorBlogList);
        };
        decodeData();
    }, [uriList]);

    useEffect(() => {
        // console.log(blogList);
        // console.log(`MyBlogs: ${blogList.length}`)
    }, [blogList]);

    const navigate = useNavigate();

    return (
        <div className="my_container">
            <div className="my_header">
                {
                    (account == getAccounts()[0]) ? "My Blogs" : `${account.slice(0, 15)}...`
                }
            </div>
            <div className="my_statistic">
                <Box sx={{ minWidth: 200, maxWidth: 500, bgcolor: "#e5e4e2" }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ArticleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Blogs" sx={{ width: 70 }} />
                                <ListItemText primary={blogList.length} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <WorkspacePremiumIcon />
                                </ListItemIcon>
                                <ListItemText primary="Medals" sx={{ width: 70 }} />
                                <ListItemText primary={totalMedals} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </div>
            <div className="my_blogs">
                <TableContainer sx={{ maxWidth: "90%" }} component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead sx={{ bgcolor: "#e5e4e2" }}>
                            <TableRow>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="left">TITLE</TableCell>
                                <TableCell align="left">POSTED TIME</TableCell>
                                <TableCell align="right">MEDALS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {blogList.map((row, index) => {
                                // let id = index;
                                // console.log(row.posted_time);
                                // const row = getData(id);
                                return (
                                    <TableRow
                                        key={index}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            onClick={() => {
                                                navigate(`/blog/${row.uri}`);
                                            }}
                                        >
                                            <div className="blog_title">{row.title}</div>
                                        </TableCell>
                                        <TableCell align="left">
                                            {convertMillisToString(row.posted_time)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.totalMedals == null ? 0 : row.totalMedals}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default MyBlog;
