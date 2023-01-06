/* 3rd Party Modules */
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { red } from '@mui/material/colors';
import {
  Typography,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Container,
} from '@mui/material';

/* Global variables */
import { FETCH } from '../../constants/actionTypes';
import getBlog from './api';

function BlogDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogReducer[0]);
  const blogId = params.blogId;

  const blogNotfound = (
    <Grid justifyContent="center" sx={{ my: 10 }}>
      <Typography variant="h6" color="text.secondary" textAlign="center">
        Blog not found
      </Typography>
    </Grid>
  );

  const fetchBlog = async (dispatch, id) => {
    const response = await getBlog(id);
    dispatch({ type: FETCH, payload: response.blog });
  };

  useEffect(() => {
    try {
      fetchBlog(dispatch, blogId);
    } catch (error) {
      console.log(error);
    }
  }, [blogId, dispatch]);

  useEffect(() => {
    document.title = blog?.title || 'Blog';
  }, [blog]);

  return !blog ? (
    blogNotfound
  ) : (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ my: { xs: 5, md: 8 }, width: 1200 }}>
        <Grid container>
          <Grid md={7} item>
            <CardMedia
              component="img"
              image={blog?.blogCover}
              alt={blog?.title}
              sx={{ height: '100vh' }}
            />
          </Grid>
          <Grid md={5} item>
            <Grid container>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: red[500], border: '1px solid lightgray' }}
                    src={blog?.owner?.profilePicture}
                    alt={blog?.owner?.firstName?.charAt(0)}
                  />
                }
                title={blog.user_id?.username}
                subheader={
                  <>
                    <Typography variant="body6" color="text.secondary">
                      Posted on: {moment(blog.createdAt).format('M/D/YYYY h:mm A')}
                    </Typography>
                  </>
                }
              />
            </Grid>
            <CardContent>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                {blog.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="justify">
                {blog.description}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default BlogDetails;
