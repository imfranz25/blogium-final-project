/* 3rd Party Libraries */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Avatar, Paper, Grid, Typography, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

/* Components & Actions */
import Input from '../components/Input';
import AlertMessage from '../components/AlertMessage';
import { loginUser } from '../actions/auth.action.js';

/* Global Variable(s) */
const initialLoginState = {
  email: '',
  password: '',
  confirmPassword: '',
};

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [loginFormData, setLoginFormData] = useState(initialLoginState);
  const [showPassword, setShowPassword] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleAlertClose = () => {
    setAlertState(false);
  };

  const handleChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    /* Check user Credentials */
    const res = await dispatch(loginUser(loginFormData, navigate));

    setAlertType(res.type);
    setAlertMessage(res.message);
    setAlertState(true);
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'Login';
  }, []);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <Container component="main" maxWidth="xs" sx={{ my: 10 }}>
      <AlertMessage
        isOpen={alertState}
        message={alertMessage}
        handleClose={handleAlertClose}
        type={alertType}
      />
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
              <LoadingButton
                type="submit"
                loading={loading}
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
                fullWidth
              >
                Login
              </LoadingButton>
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
