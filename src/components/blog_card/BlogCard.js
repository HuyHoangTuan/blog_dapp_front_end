import "./BlogCard.css";
import { useNavigate } from "react-router-dom";

import { getData } from '../../utils/Utilities'

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

  let data = getData(id);

  const navigate = useNavigate()

  const length = 150;
  const trimmedString = data.content.length > 150 ?
    data.content.substring(0, length) :
    data.content;

  const account = `${data.owner.slice(0, 1)}`.toUpperCase();

  const goToDetail = () => {
    navigate(`/blog/${id}`);
  };

  return (
    <Card sx={{ maxWidth: "90%", bgcolor: "#DCDCDC", marginLeft: "5%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#243A73" }} aria-label="recipe">
            {account}
          </Avatar>
        }
        title={data.title}
        subheader={data.posted_time}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {trimmedString}...
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon sx={{ color: "red" }} />
          <div className="num_medals">{data.num_medals}</div>
        </IconButton>
        <Box width="100%" display={'flex'} justifyContent="flex-end">
          <Button size="small" onClick={goToDetail}>See more</Button>
        </Box>

      </CardActions>
    </Card>
  );
};

export default BlogCard;