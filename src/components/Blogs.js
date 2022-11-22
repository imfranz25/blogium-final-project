import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import Blog from './Blog.js';

function Blogs() {
  const blogs = useSelector((state) => {
    return state.blogs;
  });

  return (
    <Grid alignItems="stretch" sx={{ my: 5 }} container>
      {blogs.map((blog) => (
        <Grid key={blog._id} xs={12} sm={6} item>
          <Blog blog={blog} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Blogs;
