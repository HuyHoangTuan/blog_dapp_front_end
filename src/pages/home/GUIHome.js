import { useState, useEffect } from "react";
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "./css/GUIHome.css";
import axios from "axios";
import BlogCard from "../../components/blog_card/BlogCard";
const GUIHome = () => {

  const [blogs, setBlogs] = useState([{
    externalUrl: "https://ipfs.io/ipfs/Qmd7DuscoYu3bqBavGxcxvoR1yZDhp8B4sNncyorZphucM",
    owner_of: "xxxx"
  }]);

  // const [blogsContent, setBlogsContent] = useState();

  // const fetchBlogsContent = async () => {

  //   const limit5 = blogs?.slice(0, 5);
  //   let contentBlog = [];

  //   if (limit5) {
  //     limit5.map(async (blog) => {
  //       if (blog) {
  //         const { externalUrl, owner_of } = blog;
  //         const res = await axios.get(externalUrl);
  //         const text = res.data.text.toString();
  //         const title = res.data.title;
  //         contentBlog.push({ title, text, owner_of, externalUrl });
  //       }
  //     });
  //   }

  //   setBlogsContent(contentBlog);

  // };

  // useEffect(() => {
  //   if (blogs && !blogsContent) {
  //     fetchBlogsContent();
  //   }
  // }, []);

  const blogsContent = ['1', '2', '2', '2', '2', '2', '2']

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="home_container">
      <div className="home_header">Recommended Blogs</div>
      {/* <div className="home_blogs">
        {blogsContent &&
          blogsContent.map((blog, i) => {
            return (
              <BlogCard
                id={blog}
              />
            );
          })}
      </div> */}

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(blogsContent).map((blog, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <BlogCard
              id={blog}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default GUIHome;
