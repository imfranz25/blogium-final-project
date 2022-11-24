import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';

function LinkButton({ to, linkName, Icon, brand }) {
  return (
    <Button
      component={Link}
      to={to}
      variant="text"
      sx={{ textTransform: 'unset', alignItems: 'center', color: 'white' }}
    >
      {Icon && <Icon sx={{ mr: 0.5 }} />}
      <Typography variant={brand ? 'h6' : 'body2'} noWrap component="div">
        {linkName}
      </Typography>
    </Button>
  );
}

export default LinkButton;
