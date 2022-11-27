import React from 'react';
import { Snackbar, Alert } from '@mui/material';

function AlertMessage({ message, isOpen, handleClose, type = 'error' }) {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ zIndex: 999999999999 }}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: 300 }} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AlertMessage;
