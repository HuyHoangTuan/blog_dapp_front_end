import Grid from '@mui/material/Grid';
import "./css/GUIHome.css";
import BlogCard from "../../components/blog_card/BlogCard";
import { getListBlogs } from "../../utils/Utilities";
import { getAllPublishedBlogs } from '../../utils/Abi';
import { useState } from 'react';
import { useEffect } from 'react';

const GUIHome = () => {
  const [uriList, setUriList] = useState([]);

  let cloneData = async () => {
    let data = await getAllPublishedBlogs();
    setUriList(data);
  };

  useEffect(() => {
    cloneData();
  }, []);

  // console.log(blogsContent);
  // const blogsContent = async () => {
  //   return await getAllPublishedBlogs();
  // }

  return (
    <div className="home_container">
      <div className="home_header">Recommended Blogs</div>
      <div className="home_blogs">
        {/* {blogsContent &&
          blogsContent.map((blog, i) => {
            return (
              <BlogCard
                id={blog}
              />
            );
          })} */}
        <Grid container columns={{ xs: 1, sm: 1, md: 1 }}>
          {uriList.map((blog, index) => {
            return (
              <Grid item xs={1} sm={1} md={1} key={index}>
                <BlogCard
                  id={blog}
                />
              </Grid>
            )
          })}

          {/* {Array.from(uriList).map((blog, index) => (
            <Grid item xs={1} sm={1} md={1} key={index}>
              <BlogCard
                id={blog}
              />
            </Grid>
          ))} */}
        </Grid>
      </div>


    </div>
  );
};

export default GUIHome;