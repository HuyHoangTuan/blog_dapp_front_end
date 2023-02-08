import Grid from '@mui/material/Grid';
import "./MyBlog.css";
import BlogCard from "../../components/blog_card/BlogCard";
import { getMyBlogs } from "../../utils/Utilities";
const MyBlog = () => {

  const blogsContent = getMyBlogs();

  return (
    <div className="home_container">
      <div className="home_header">My Blogs</div>
      <div className="home_blogs">
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 1, md: 1 }}>
          {Array.from(blogsContent).map((blog, index) => (
            <Grid item xs={1} sm={1} md={1} key={index}>
              <BlogCard
                id={blog}
              />
            </Grid>
          ))}
        </Grid>
      </div>


    </div>
  );
};

export default MyBlog;
