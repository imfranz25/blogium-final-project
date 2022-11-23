import * as React from 'react';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment/moment';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

function Blog({ blog }) {
  const URL_BACKEND = process.env.REACT_APP_BACKEND_URL;
  const userProfile = blog.user_id?.profile_picture_url;
  const profileImage = `${URL_BACKEND}/${userProfile}`;
  const blogImage = `${URL_BACKEND}/${blog.cover_picture_url}`;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500], border: '1px solid black' }}
            src={profileImage}
            alt={blog.user_id.first_name.charAt(0)}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={blog.user_id?.username}
        subheader={moment(blog.createdAt).fromNow()}
      />
      <CardMedia component="img" height="194" image={blogImage} alt={blog.title} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {blog.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" sx={{ textTransform: 'unset' }}>
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}

export default Blog;
