/* Module Imports */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Grow, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';

/* Components */
import Blogs from '../components/Blogs';

/* Actions */
import { getMyBlogs } from '../actions/blog.action.js';

function MyBlogs() {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    dispatch(getMyBlogs(navigate));
    setLoading(false);
  }, [dispatch, navigate]);

  return (
    <>
      <Grow in>
        <Container>
          {isLoading ? (
            <Grid container justifyContent="center">
              <CircularProgress sx={{ py: 10 }} />
            </Grid>
          ) : (
            <Grid container justifyContent="center">
              <Blogs ownBlog={true} action={true} />
            </Grid>
          )}
        </Container>
      </Grow>
    </>
  );
}

export default MyBlogs;
