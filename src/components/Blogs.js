import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import Blog from './Blog.js';

function Blogs({ action, tab }) {
  let noBlogMessage = 'No blogs available';
  let haveAction = false;
  const blogs = useSelector((state) => {
    if (tab === 'drafts') {
      haveAction = true;
      noBlogMessage = 'No drafted blogs';
      return state.blogReducer.filter((blog) => {
        return blog.is_draft === true && blog.deleted_at === null;
      });
    }

    if (tab === 'deleted') {
      noBlogMessage = 'No deleted blogs';
      return state.blogReducer.filter((blog) => blog.deleted_at !== null);
    }

    if (tab === 'all') {
      haveAction = true;
      noBlogMessage = "You don't have any posted blogs";
      return state.blogReducer.filter((blog) => blog.deleted_at === null);
    }

    return state.blogReducer;
  });

  return !blogs.length ? (
    <Grid justifyContent="center" sx={{ my: 10 }}>
      <Typography variant="h6" color="text.secondary" textAlign="center">
        {noBlogMessage}
      </Typography>
    </Grid>
  ) : (
    <Grid container>
      {blogs.map((blog) => (
        <Grid key={blog.id} xs={12} sm={6} md={4} xlg={3} sx={{ p: 3 }} item>
          <Blog blog={blog} action={haveAction} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Blogs;
