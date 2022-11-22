import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import { Container, Avatar, Paper, Grid, Typography, Button } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ImageIcon from '@mui/icons-material/Image';

const initialSignUpState = {
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  password: '',
  confrim_password: '',
  profile_picture_url: '',
};

function SignUp() {
  const [signUpFormState, setSignUpFormState] = useState(initialSignUpState);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setSignUpFormState({ ...signUpFormState, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signUpFormState);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ my: 10 }}>
      <Paper elevation={5} sx={{ p: 5 }}>
        <Grid container sx={{ justifyContent: 'center' }}>
          <Avatar sx={{ backgroundColor: 'blue' }}>
            <AccountCircleOutlinedIcon />
          </Avatar>
        </Grid>
        <Typography variant="h5" sx={{ textAlign: 'center', py: 3 }}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container sx={{ justifyContent: 'center', mb: 3 }}>
            <Avatar
              alt="Remy Sharp"
              src="https://mui.com/static/images/avatar/1.jpg"
              sx={{ width: { xs: 100, md: 150 }, height: { xs: 100, md: 150 } }}
            />
          </Grid>
          <Grid container sx={{ justifyContent: 'center', mb: 3 }}>
            <Button
              variant="outlined"
              startIcon={<ImageIcon />}
              component="label"
              sx={{ textTransform: 'unset' }}
            >
              Upload Picture
              <Input name="profile_picture_url" handleChange={handleChange} type="file" hidden />
            </Button>
          </Grid>
          <Grid container spacing={2}>
            <Input
              name="first_name"
              handleChange={handleChange}
              label="First Name"
              type="text"
              autoFocus
              half
            />
            {/* prettier-ignore */}
            <Input 
              name="last_name" 
              handleChange={handleChange} 
              label="Last Name" 
              type="text" 
              half 
            />
            {/* prettier-ignore */}
            <Input 
              name="email" 
              handleChange={handleChange} 
              label="Email" 
              type="email" 
              autoFocus 
            />
            <Input
              name="password"
              handleChange={handleChange}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            <Input
              name="confirm_password"
              label="Confirm Password"
              handleChange={handleChange}
              type={showConfirmPassword ? 'text' : 'password'}
              handleShowPassword={handleShowConfirmPassword}
            />
            <Grid item sm={12}>
              <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                Sign-up
              </Button>
            </Grid>
            <Grid justifyContent="center" marginTop={3} container>
              <Grid item>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Button sx={{ textTransform: 'unset' }}>Already have an account?</Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default SignUp;
