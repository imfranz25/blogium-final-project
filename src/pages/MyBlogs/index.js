/* Module Imports */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Grow, CircularProgress, Tabs, Tab } from '@mui/material';
import { useDispatch } from 'react-redux';

/* Components */
import Blogs from '../../components/Blogs';

function MyBlogs() {
  const [isLoading, setLoading] = useState(true);
  const [tab, setTab] = useState('all');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTabs = (event, newTab) => {
    setTab(newTab);
  };

  useEffect(() => {
    document.title = 'My blogs';
  }, []);

  useEffect(() => {
    setLoading(true);

    // getMyBlogs(navigate);

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
            <>
              <Grid container justifyContent="center">
                <Tabs value={tab} onChange={handleTabs} aria-label="blog tabs">
                  <Tab label="All" value="all" aria-label="all" />
                  <Tab label="Drafts" value="drafts" aria-label="drafts" />
                  <Tab label="Trash" value="deleted" aria-label="trash" />
                </Tabs>
              </Grid>
              <Grid container justifyContent="center">
                <Blogs tab={tab} />
              </Grid>
            </>
          )}
        </Container>
      </Grow>
    </>
  );
}

export default MyBlogs;
