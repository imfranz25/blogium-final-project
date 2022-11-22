/* Module Imports */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Grow, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';

/* Components */
import Blogs from '../components/Blogs';
import Navigation from '../components/Navigation';

/* Actions */
import { getBlogs } from '../actions/blog.action.js';

function Home() {
  const [isLoading, setLoading] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    dispatch(getBlogs(navigate));
    setLoading(false);
  }, [dispatch, navigate]);

  return (
    <>
      <Navigation />
      <Grow in>
        <Container>
          {isLoading ? (
            <Grid container justifyContent="center">
              <CircularProgress sx={{ py: 10 }} />
            </Grid>
          ) : (
            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} md={8}>
                <Blogs />
              </Grid>
            </Grid>
          )}
        </Container>
      </Grow>
    </>
  );
}

export default Home;
