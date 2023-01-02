/* 3rd Party Modules */
import moment from 'moment';
import { debounce } from 'lodash';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

/* Components & Styles */
import LinkButton from '../LinkButton';
import { Search, SearchIconWrapper, StyledInputBase, paperPropStyles } from './style';

/* Action Type -> Dispatch Logout */
import { Card, Typography } from '@mui/material';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const searchResult = useSelector((state) => {
    return state.searchReducer;
  });

  const clearSearchResult = () => {
    // dispatch({ type: CLEAR, payload: [] });
  };

  const handleSearch = debounce(() => {
    // searchBlog(e.target.value);
  }, 500);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('blogiumUser'));

      if (!userData) {
        navigate('/login');
      }

      /* Set user data & image once location changed */
      setUser(userData);
      setProfileImage(userData?.profilePicture);
    } catch (e) {
      localStorage.clear();
      navigate('/');
    }
  }, [location, navigate]);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={paperPropStyles}
    >
      <MenuItem component={Link} to="/dashboard/profile" onClick={handleMenuClose}>
        <AccountCircle sx={{ mr: 1 }} />
        Profile
      </MenuItem>
      <MenuItem component={Link} to="/dashboard/blog" onClick={handleMenuClose}>
        <AllInboxIcon sx={{ mr: 1 }} />
        My blogs
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <LogoutIcon sx={{ mr: 1 }} />
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <LinkButton to="/" linkName="Blogium" brand />
          <LinkButton to="/" linkName="Home" Icon={HomeIcon} />
          <LinkButton to="/blog/add" linkName="Add Blog" Icon={PostAddIcon} />
          <LinkButton to="/dashboard/blog" linkName="My Blogs" Icon={AllInboxIcon} />
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              autoComplete="off"
              placeholder="Search by title"
              onChange={handleSearch}
              onFocus={handleSearch}
              inputProps={{ 'aria-label': 'search' }}
            />
            {searchResult.length > 0 && (
              <Card sx={{ position: 'absolute', width: '100%', mt: 1, zIndex: 99999 }}>
                {searchResult.map((blog) => (
                  <MenuItem
                    key={blog.id}
                    component={Link}
                    to={`/${blog.id}`}
                    onClick={clearSearchResult}
                    sx={{ borderBottom: '1px solid lightgray', py: 1 }}
                  >
                    <Grid
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mr: 5,
                      }}
                    >
                      <Avatar
                        alt={blog?.first_name}
                        src={blog.profile_picture_url}
                        sx={{
                          backgroundColor: 'purple',
                          border: '1px solid lightgray',
                        }}
                      >
                        {blog?.first_name?.charAt(0)}
                      </Avatar>
                      <Typography variant="caption">{blog?.user_id?.username}</Typography>
                    </Grid>
                    <Grid>
                      <Typography variant="body1">{blog.title}</Typography>
                      <Typography variant="caption">
                        Created:
                        {moment(blog.createdAt).format('M/D/YYYY')}
                      </Typography>
                    </Grid>
                  </MenuItem>
                ))}
              </Card>
            )}
          </Search>
          <Box>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar
                alt={user?.firstName}
                src={profileImage}
                sx={{
                  mx: 1,
                  width: { xs: 35, md: 40 },
                  height: { xs: 35, md: 40 },
                  backgroundColor: 'purple',
                }}
              >
                {user?.firstName?.charAt(0)}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}

export default Navigation;
