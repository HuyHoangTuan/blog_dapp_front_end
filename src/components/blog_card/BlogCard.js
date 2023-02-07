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

// const BlogCard = ({ text, title, ownerOf, externalUrl }) => {

//   let data = getData();

//   console.log(data);

//   const length = 100;
//   const trimmedString = data.content.length > 100 ?
//     data.content.substring(0, length) :
//     data.content;

//   const account = `${ownerOf.slice(0, 4)}...${ownerOf.slice(38)}`;

//   const navigate = useNavigate();

//   const clickHandler = () => {
//     const lastSegment = externalUrl.split("/").pop();
//     navigate(`/blog/${lastSegment}`);
//   };

//   return (
//     <div className="blog" onClick={clickHandler}>
//       <div className="blog_leftSide">
//       <div className="blogger">
//           <span className="blogger_name">{data.owner}</span>
//           <span className="blogger_date">{data.posted_time}</span>
//       </div>
//       <div className="blog_title">
//           <h3>{data.title}</h3>
//       </div>
//       <div className="blog_content">
//           <p>{trimmedString}...</p>
//       </div>
//       </div>
//       <div className="blog_rightSide">
//         <div>
//           <img
//             className="blog_image"
//             src="https://ipfs.moralis.io:2053/ipfs/QmWEsG4ayh75BMk2H1CowAdALPjsi3fD7CSZ6qxNM1yNnz/image/moralis.png"
//             alt=""
//           />
//         </div>
//       </div>

//       <Card border="secondary" style={{ width: '18rem' }}>
//         <Card.Header>Header</Card.Header>
//         <Card.Body>
//           <Card.Title>Secondary Card Title</Card.Title>
//           <Card.Text>
//             Some quick example text to build on the card title and make up the
//             bulk of the card's content.
//           </Card.Text>
//         </Card.Body>
//       </Card>
//       <br />

//     </div>
//   );
// };

// export default BlogCard;



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

  let data = getData();
  // console.log(data);

  const length = 100;
  const trimmedString = data.content.length > 100 ?
    data.content.substring(0, length) :
    data.content;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, bgcolor: "#F7EFE5" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#674188" }} aria-label="recipe">
            R
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={data.title}
        subheader={data.posted_time}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {trimmedString}...
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
          <div class="num_medals">{data.num_medals}</div>
        </IconButton>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default BlogCard;