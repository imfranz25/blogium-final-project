/* Module Imports */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Grow, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';

/* Components */
import Blogs from '../../components/Blogs';

function Home() {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Home';
  }, []);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      // getBlogs(navigate);
    };

    fetchData();

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
              <Blogs />
            </Grid>
          )}
        </Container>
      </Grow>
    </>
  );
}

export default Home;
