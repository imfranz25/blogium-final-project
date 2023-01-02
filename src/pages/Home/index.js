/* Module Imports */
import { useEffect, useState } from 'react';
import { Container, Grid, Grow, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';

/* Components */
import Blogs from '../../components/Blogs';

/* Actions & Constants */
import { FETCH_ALL } from '../../constants/actionTypes';
import getBlogs from './api';

const fetchBlogs = async (dispatch) => {
  const response = await getBlogs();
  dispatch({ type: FETCH_ALL, payload: response.blogs });
};

function Home() {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Home';
  }, []);

  useEffect(() => {
    setLoading(true);

    try {
      fetchBlogs(dispatch);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }, [dispatch]);

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
              <Blogs />
            </Grid>
          )}
        </Container>
      </Grow>
    </>
  );
}

export default Home;
