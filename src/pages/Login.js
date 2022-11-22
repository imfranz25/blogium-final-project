import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import { Container, Avatar, Paper, Grid, Typography, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const initialLoginState = {
  email: '',
  password: '',
  confirmPassword: '',
};

function Login() {
  const [loginFormData, setLoginFormData] = useState(initialLoginState);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginFormData);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ my: 10 }}>
      <Paper elevation={3} sx={{ p: 5 }}>
        <Grid container sx={{ justifyContent: 'center' }}>
          <Avatar sx={{ backgroundColor: 'red' }}>
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        <Typography variant="h5" sx={{ textAlign: 'center', py: 3 }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
            <Grid item sm={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </Grid>
            <Grid justifyContent="center" marginTop={3} container>
              <Grid item>
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  <Button sx={{ textTransform: 'unset' }}>Don't have an account?</Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
