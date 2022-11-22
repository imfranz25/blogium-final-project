import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import { Container, Avatar, Paper, Grid, Typography, Button } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = () => {};

  const handleSubmit = () => {};

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 5 }}>
        <Avatar>
          <AccountCircleOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Sign-up</Typography>
        <form className="form__auth" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name="firstName"
              handleChange={handleChange}
              label="First Name"
              type="text"
              autoFocus
              half
            />
            <Input name="lastName" handleChange={handleChange} label="Last Name" type="text" half />

            <Input name="email" handleChange={handleChange} label="Email" type="email" autoFocus />
            <Input
              name="password"
              handleChange={handleChange}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            <Input
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              handleChange={handleChange}
            />
            <Grid item sm={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="btn-submit__auth"
                size="large"
                fullWidth
              >
                Sign-up
              </Button>
            </Grid>
            <Grid justifyContent="center" marginTop={3} container>
              <Grid item>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Button>Already have an account?</Button>
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
