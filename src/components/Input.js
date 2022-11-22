import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Input({ half, name, handleChange, label, autoFocus, type, handleShowPassword, hidden }) {
  let inputProps = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={handleShowPassword}>
          {type === 'password' ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </InputAdornment>
    ),
  };

  if (name === 'profile_picture_url') {
    inputProps = { accept: 'image/jpg' };
  }

  if (name !== 'password' && name !== 'confirm_password') {
    inputProps = {};
  }

  return (
    <Grid item xs={half ? 6 : 12} md={half ? 6 : 12} sx={hidden && { display: 'none' }}>
      <TextField
        variant="outlined"
        size="small"
        name={name}
        onChange={handleChange}
        label={label}
        autoFocus={autoFocus}
        type={type}
        className="input-field__auth"
        fullWidth
        required
        InputProps={inputProps}
      />
    </Grid>
  );
}

export default Input;
