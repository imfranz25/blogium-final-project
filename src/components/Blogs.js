import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, Container } from '@mui/material';
import Blog from './Blog.js';

function Blogs() {
  const blogs = useSelector((state) => {
    return state.blogReducer;
  });

  return !blogs.length ? (
    <Container>
      <Grid justifyContent="center">
        <Typography variant="h6" color="text.secondary">
          No blogs available
        </Typography>
      </Grid>
    </Container>
  ) : (
    <Grid alignItems="stretch" sx={{ my: 5 }} container>
      {blogs.map((blog) => (
        <Grid key={blog.id} xs={12} sm={6} item>
          <Blog blog={blog} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Blogs;
