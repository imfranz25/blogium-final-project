import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';
import { Typography, Grid, Card, CardHeader, CardMedia, CardContent, Avatar } from '@mui/material';

/* Components & Actions */
import { getBlog } from '../actions/blog.action';

function BlogDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogReducer[0]);
  const blogId = params.blogId;
  const URL_BACKEND = process.env.REACT_APP_BACKEND_URL;

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

  return !blog ? (
    blogNotfound
  ) : (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500], border: '1px solid lightgray' }}
            src={`${URL_BACKEND}/${blog?.user_id?.profile_picture_url}`}
            alt={blog.user_id?.first_name?.charAt(0)}
          />
        }
        title={blog.user_id?.username}
        subheader={moment(blog.createdAt).fromNow()}
      />
      <CardMedia
        component="img"
        height="194"
        image={`${URL_BACKEND}/${blog?.cover_picture_url}`}
        alt={blog.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {blog.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BlogDetails;
