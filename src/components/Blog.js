import { useState } from 'react';
import { red } from '@mui/material/colors';
import moment from 'moment/moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  CardActions,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';

function Blog({ blog, action }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  /* Concat -> backend url + image path */
  const URL_BACKEND = process.env.REACT_APP_BACKEND_URL;
  const userProfile = blog.user_id?.profile_picture_url;
  const profileImage = `${URL_BACKEND}/${userProfile}`;
  const blogImage = `${URL_BACKEND}/${blog.cover_picture_url}`;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = blog?.id;
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'right',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'left',
        horizontal: 'left',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <VisibilityIcon sx={{ mr: 1 }} />
        View
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <EditIcon sx={{ mr: 1 }} />
        Edit
      </MenuItem>
      <MenuItem sx={{ color: 'red' }} onClick={handleMenuClose}>
        <DeleteOutlineIcon sx={{ mr: 1 }} />
        Delete
      </MenuItem>
    </Menu>
  );

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500], border: '1px solid lightgray' }}
            src={profileImage}
            alt={blog.user_id?.first_name?.charAt(0)}
          />
        }
        action={
          action && (
            <IconButton aria-label="settings" onClick={handleProfileMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          )
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
        <Button
          size="small"
          color="primary"
          sx={{ textTransform: 'unset' }}
          component={Link}
          to={`/${blog.id}`}
        >
          Read More
        </Button>
      </CardActions>
      {renderMenu}
    </Card>
  );
}

export default Blog;
