/* 3rd party Modules */
import moment from 'moment/moment';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { red } from '@mui/material/colors';
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

function Blog({ blog, action }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

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
    // deleteBlog(blog.id);
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
      <MenuItem component={Link} to={`/${blog.id}`}>
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
    <Card sx={{ maxWidth: 345, height: '100%' }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500], border: '1px solid lightgray' }}
            src={blog.owner?.profilePicture}
            alt={blog.owner?.firstName?.charAt(0)}
          />
        }
        action={
          action && (
            <IconButton aria-label="settings" onClick={handleProfileMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={`${blog.owner?.userName} ${blog.is_draft ? '[Draft]' : ''}`}
        subheader={moment(blog.createdAt).fromNow()}
      />
      <CardMedia component="img" height="194" image={blog.blogCover} alt={blog.title} />
      <CardContent>
        <Typography variant="body1" color="text.secondary" sx={{ my: 1 }}>
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40 }}>
          {blog.description.length >= 80
            ? blog.description.substring(0, 80).trim() + '...'
            : blog.description}
        </Typography>
      </CardContent>
      {!blog.deleted_at && (
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
      )}
      {renderMenu}
      {confirmDialog}
    </Card>
  );
}

export default Blog;
