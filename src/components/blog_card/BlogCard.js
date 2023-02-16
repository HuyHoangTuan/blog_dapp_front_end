import "./BlogCard.css";
import { useNavigate } from "react-router-dom";

import { convertMillisToString, getAccounts, getData, retrieveConternFromIPFS } from '../../utils/Utilities'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { getMedalOf, giveMedalTo } from "../../utils/Abi";
import image from "../../images/image1.jpeg"

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const BlogCard = ({ id }) => {

  // let data = getData(id);
  const [data, setData] = useState(
    {
      title: "",
      content: "",
      num_medals: 0,
      owner: [""],
      posted_time: 0,
      hidden: false
    }
  );
  const [medal, setMedal] = useState(0);

  let cloneData = async () => {
    let blogdata = await retrieveConternFromIPFS(id);
    if (blogdata != null) {
      setData(blogdata);
    }
  }

  let getMedal = async () => {
    let medalBlog = await getMedalOf(id);
    setMedal(medalBlog);
  }

  useEffect(() => {
    cloneData();
    getMedal();
  }, []);

  const navigate = useNavigate();

  const length = 100;
  const strippedHtml = data.content.replace(/<[^>]+>/g, '');
  const trimmedString = strippedHtml.length > 100 ?
    strippedHtml.substring(0, length) :
    strippedHtml;

  const account = `${data.owner[0].slice(4, 5)}`.toUpperCase();

  const giveMedal = () => {
    let func = async () => {
      let res = await giveMedalTo(id);
      setMedal(parseInt(medal) + 1);
    }
    func();
  };

  const goToDetail = () => {
    navigate(`/blog/${id}`);
  };

  return (
    <>
      {
        (data.title != "") && (
          <Card sx={{ maxWidth: "84%", bgcolor: "#e5e4e2", marginLeft: "8%", borderRadius: "10px", marginBottom: "30px" }}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: "75%" }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: "#243A73" }} aria-label="recipe">
                      {account}
                    </Avatar>
                  }
                  title={data.owner[0]}
                  subheader={convertMillisToString(data.posted_time)}
                />
                <CardContent>
                  <Box >
                    <Typography gutterBottom variant="h6" component="div" marginBottom={"10px"}>
                      {data.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {trimmedString}...
                    </Typography>
                  </Box>
                </CardContent>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: "20%", marginTop: 5, maxHeight: 145 }}
                image={data.image == null ? image : data.image}
                alt=""
              />
            </Box>

            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites" onClick={giveMedal}
                disabled={data.owner[0] == getAccounts()[0] ? true : false}
              >
                <FavoriteIcon sx={{ color: "red" }} />
                <div className="num_medals">{medal}</div>
              </IconButton>
              <Box width="100%" display={'flex'} justifyContent="flex-end">
                <Button size="small" onClick={goToDetail}>See more</Button>
              </Box>

            </CardActions>
          </Card>
        )
      }
    </>
  );
};

export default BlogCard;