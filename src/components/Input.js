import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Input({
  value,
  half,
  name,
  handleChange,
  label,
  autoFocus,
  type,
  handleShowPassword,
  hidden,
  multiline,
  rows = 1,
}) {
  let inputProps = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={handleShowPassword}>
          {type === 'password' ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </InputAdornment>
    ),
  };
  let fileProps = {};
  const isFileInput = type === 'file';

  if (isFileInput) {
    fileProps = { accept: 'image/*' };
  }

  if (name !== 'password' && name !== 'confirm_password' && name !== 'old_password') {
    inputProps = {};
  }

  return (
    <Grid item xs={half ? 6 : 12} md={half ? 6 : 12} sx={hidden && { display: 'none' }}>
      <TextField
        autoComplete="off"
        variant="outlined"
        size="small"
        name={name}
        onChange={handleChange}
        label={label}
        autoFocus={autoFocus}
        type={type}
        required={!isFileInput}
        InputProps={inputProps} // props for text/password input
        inputProps={fileProps} // propsfor file input
        multiline={multiline}
        rows={rows}
        value={value}
        fullWidth
      />
    </Grid>
  );
}

export default Input;
