import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { red } from '@mui/material/colors';
import moment from 'moment/moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

/* Actions */
import { deleteBlog } from '../actions/blog.action';

function Blog({ blog, action }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
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

  const handleOpenDialog = () => {
    setAnchorEl(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    setOpenDialog(false);
    dispatch(deleteBlog(blog.id, navigate));
  };

  const menuId = blog?.id;
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <VisibilityIcon sx={{ mr: 1 }} />
        View
      </MenuItem>
      <MenuItem component={Link} to={`/dashboard/blog/${blog.id}`}>
        <EditIcon sx={{ mr: 1 }} />
        Edit
      </MenuItem>
      <MenuItem sx={{ color: 'red' }} onClick={handleOpenDialog}>
        <DeleteOutlineIcon sx={{ mr: 1 }} />
        Delete
      </MenuItem>
    </Menu>
  );

  const confirmDialog = (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Title: {blog?.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this blog?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleDelete} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
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
      {confirmDialog}
    </Card>
  );
}

export default Blog;
