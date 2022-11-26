import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Card, CardMedia, Container, Grid, CardContent, Button } from '@mui/material';
import { red } from '@mui/material/colors';
import ImageIcon from '@mui/icons-material/Image';
import LoadingButton from '@mui/lab/LoadingButton';

/* Components */
import Input from '../components/Input';
import { updatePassword, updateUser } from '../actions/auth.action';

const imageMimeType = /image\/(png|jpg|jpeg)/i;
const initialPasswordChange = {
  password: '',
  confirm_password: '',
  old_password: '',
};

function Profile() {
  const userToken = localStorage.getItem('token');
  const URL_BACKEND = process.env.REACT_APP_BACKEND_URL;
  const userData = jwtDecode(userToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [userFormData, setUserFormData] = useState(userData);
  const [userPassState, setUserPassState] = useState({ ...initialPasswordChange });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* File */
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(`${URL_BACKEND}/${userData?.profile_picture_url}`);

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
    setUserFormData({ ...userFormData, [e.target.name]: e.target.files[0] });
  };

  useEffect(() => {
    document.title = 'Profile';
  }, []);

  const handleChangePassword = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(updatePassword(userPassState, navigate));
    setLoading(false);
  };

  const handleUserDataSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(updateUser(userFormData, navigate));
    setLoading(false);
  };

  const handleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePassChange = (e) => {
    setUserPassState({ ...userPassState, [e.target.name]: e.target.value });
  };

  const handleUserChange = (e) => {
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
  };

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
    <>
      <Grid container>
        <CardMedia
          component="img"
          height="270"
          image={`https://i.picsum.photos/id/122/4147/2756.jpg?hmac=-B_1uAvYufznhjeA9xSSAJjqt07XrVzDWCf5VDNX0pQ`}
          sx={{ zIndex: 'modal' }}
        />

        <Container sx={{ mt: -10, zIndex: 'tooltip', mb: 10 }}>
          <Grid justifyContent="center" sx={{ zIndex: 'tooltip' }} container>
            <Avatar
              sx={{
                bgcolor: red[500],
                border: '1px solid lightgray',
                width: { xs: 100, md: 150 },
                height: { xs: 100, md: 150 },
                mt: -2,
              }}
              src={fileDataURL}
              alt={userData?.first_name?.charAt(0)}
            />
          </Grid>
          <Card sx={{ zIndex: 'modal', mt: -12 }}>
            <Grid container sx={{ justifyContent: 'center', mb: 3, mt: 15 }}>
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

            <CardContent sx={{ px: 5, mb: 3, display: 'flex', justifyContent: 'center' }}>
              <Grid sx={{ maxWidth: 550 }} container>
                <form onSubmit={handleUserDataSubmit}>
                  <Grid item xs={12} sx={{ px: 5 }}>
                    <Grid container spacing={2}>
                      <Input
                        name="first_name"
                        handleChange={handleUserChange}
                        label="First Name"
                        type="text"
                        value={userFormData.first_name}
                        autoFocus
                        half
                      />
                      {/* prettier-ignore */}
                      <Input 
                        name="last_name" 
                        handleChange={handleUserChange} 
                        label="Last Name"
                        value={userFormData.last_name} 
                        type="text" 
                        half 
                      />
                      {/* prettier-ignore */}
                      <Input 
                        name="email" 
                        handleChange={handleUserChange} 
                        value={userFormData.email}
                        label="Email" 
                        type="email" 
                      />
                      {/* prettier-ignore */}
                      <Input 
                        name="username" 
                        handleChange={handleUserChange} 
                        value={userFormData.username}
                        label="Username" 
                        type="text" 
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ my: 5 }}>
                      <LoadingButton
                        type="submit"
                        loading={isLoading}
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ textTransform: 'unset' }}
                        fullWidth
                      >
                        Update Details
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </form>
                <form onSubmit={handleChangePassword}>
                  <Grid item xs={12} sx={{ px: 5 }}>
                    <Grid container spacing={2}>
                      <Input
                        name="old_password"
                        handleChange={handlePassChange}
                        type={showOldPassword ? 'text' : 'password'}
                        handleShowPassword={handleShowOldPassword}
                        label="Current Password"
                      />
                      <Input
                        name="password"
                        handleChange={handlePassChange}
                        handleShowPassword={handleShowNewPassword}
                        label="New Password"
                        type={showNewPassword ? 'text' : 'password'}
                      />
                      <Input
                        name="confirm_password"
                        handleChange={handlePassChange}
                        type={showConfirmPassword ? 'text' : 'password'}
                        handleShowPassword={handleShowConfirmPassword}
                        label="Confirm Password"
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ my: 5 }}>
                      <LoadingButton
                        type="submit"
                        loading={isLoading}
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ textTransform: 'unset' }}
                        fullWidth
                      >
                        Update Password
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Grid>
    </>
  );
}

export default Profile;
