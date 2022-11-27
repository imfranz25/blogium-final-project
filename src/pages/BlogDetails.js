/* 3rd Party Modules */
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
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

/* Components & Actions */
import { getBlog } from '../actions/blog.action';

/* Global variables */
const URL_BACKEND = process.env.REACT_APP_BACKEND_URL;

function BlogDetails() {
  const params = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    dispatch(getBlog(blogId, navigate));
  }, [blogId, navigate, dispatch]);

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
              image={`${URL_BACKEND}/${blog?.cover_picture_url}`}
              alt={blog.title}
              sx={{ height: '100vh' }}
            />
          </Grid>
          <Grid md={5} item>
            <Grid container>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: red[500], border: '1px solid lightgray' }}
                    src={`${URL_BACKEND}/${blog?.user_id?.profile_picture_url}`}
                    alt={blog.user_id?.first_name?.charAt(0)}
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
