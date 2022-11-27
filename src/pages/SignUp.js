/* 3rd party Modules */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Avatar, Paper, Grid, Typography, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ImageIcon from '@mui/icons-material/Image';

/* Components & Actions */
import Input from '../components/Input';
import AlertMessage from '../components/AlertMessage';
import { signUpUser } from '../actions/auth.action.js';

/* Global Variables */
const imageMimeType = /image\/(png|jpg|jpeg)/i;
const initialSignUpState = {
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  password: '',
  confirm_password: '',
  profile_picture_url: '',
};

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signUpFormState, setSignUpFormState] = useState(initialSignUpState);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* File */
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  /* Alert Message */
  const [alertState, setAlertState] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const imageChangeHandler = (e) => {
    const file = e.target.files[0];

    if (!file) {
      alert('No file selected');
      return;
    }
    if (!file.type.match(imageMimeType)) {
      alert('Image type is not valid');
      return;
    }

    setFile(file);
    setSignUpFormState({ ...signUpFormState, [e.target.name]: e.target.files[0] });
  };

  const handleAlertClose = () => {
    setAlertState(false);
  };

  const handleChange = (e) => {
    setSignUpFormState({ ...signUpFormState, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    /* Submit user details to back-end */
    const res = await dispatch(signUpUser(signUpFormState, navigate));

    setAlertType(res.type);
    setAlertMessage(res.message);
    setAlertState(true);

    if (res?.type === 'error') {
      setLoading(false);
    } else {
      setTimeout(() => {
        navigate('/login');
      }, 500);
    }
  };

  useEffect(() => {
    document.title = 'Sign Up';
  }, []);

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <Container component="main" maxWidth="sm" sx={{ my: 10 }}>
      <AlertMessage
        isOpen={alertState}
        message={alertMessage}
        handleClose={handleAlertClose}
        type={alertType}
      />
      <Paper elevation={5} sx={{ p: 5 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', py: 3 }}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container sx={{ justifyContent: 'center', mb: 3 }}>
            <Avatar
              alt="Blogium"
              src={fileDataURL}
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
              <Input
                name="profile_picture_url"
                handleChange={imageChangeHandler}
                type="file"
                hidden
              />
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
            />
            {/* prettier-ignore */}
            <Input 
              name="username" 
              handleChange={handleChange} 
              label="Username" 
              type="text" 
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
            <Grid item xs={12}>
              <LoadingButton
                type="submit"
                loading={loading}
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Sign-up
              </LoadingButton>
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
