import { Link } from 'react-router-dom';
import { Typography, Button, Avatar } from '@mui/material';
import blogiumLogo from '../assets/images/blogium.png';

function LinkButton({ to, linkName, Icon, brand }) {
  return (
    <Button
      component={Link}
      to={to}
      variant="text"
      sx={{
        textTransform: 'unset',
        alignItems: 'center',
        color: 'white',
        display: { xs: brand ? 'none' : '', sm: 'inline-flex' },
      }}
    >
      {Icon && <Icon sx={{ mr: 0.5 }} />}
      {brand && <Avatar alt="Blogium" src={blogiumLogo} sx={{ mr: 1 }} />}
      <Typography
        variant={brand ? 'h6' : 'body2'}
        noWrap
        component="div"
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        {linkName}
      </Typography>
    </Button>
  );
}

export default LinkButton;
