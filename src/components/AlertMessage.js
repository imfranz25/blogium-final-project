import React from 'react';
import { Snackbar, Alert } from '@mui/material';

function AlertMessage({ message, isOpen, handleClose, type = 'error' }) {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AlertMessage;
