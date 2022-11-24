import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import Blog from './Blog.js';

function Blogs({ ownBlog, action }) {
  const blogs = useSelector((state) => {
    return state.blogReducer;
  });

  return !blogs.length ? (
    <Grid justifyContent="center" sx={{ my: 10 }}>
      <Typography variant="h6" color="text.secondary" textAlign="center">
        {ownBlog ? "You don't have any a blogs" : 'No blogs available'}
      </Typography>
    </Grid>
  ) : (
    <Grid container>
      {blogs.map((blog) => (
        <Grid key={blog.id} xs={12} sm={6} md={4} xlg={3} sx={{ p: 3 }} item>
          <Blog blog={blog} action={action} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Blogs;
