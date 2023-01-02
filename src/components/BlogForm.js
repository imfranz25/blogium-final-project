import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import ImageIcon from '@mui/icons-material/Image';
import {
  Container,
  Paper,
  Grid,
  Typography,
  Button,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

/* Components & Actions */
import Input from './Input';
import AlertMessage from '../components/AlertMessage';
import defaultCover from '../assets/images/default-cover.jpg';
import createBlog from '../pages/AddBlog/api';

/* Global Variables */
const imageMimeType = /image\/(png|jpg|jpeg)/i;

function Form({ isEdit, initialBlogState }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [blogFormState, setBlogFormState] = useState(initialBlogState);
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(defaultCover);
  const [openDialog, setOpenDialog] = useState(false);

  /* Alert Message */
  const [alertState, setAlertState] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    if (isEdit) {
      setBlogFormState(initialBlogState);
      setFileDataURL(initialBlogState?.blogCover);
    }
  }, [initialBlogState, isEdit]);

  useEffect(() => {
    let fileReader;
    let isCancel = false;

    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
          setBlogFormState({ ...blogFormState, blogCover: result });
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
  };

  const handleChange = (e) => {
    setBlogFormState({ ...blogFormState, [e.target.name]: e.target.value });
  };

  const handleAlertClose = () => {
    setAlertState(false);
  };

  const alertHandler = (response) => {
    setAlertType(response.type);
    setAlertMessage(response.message);
    setAlertState(true);
  };

  const handleSubmit = async () => {
    let response = {};
    setLoading(true);

    try {
      if (isEdit) {
        // updateBlog(blogFormState);
      } else {
        response = await createBlog(blogFormState);
      }
    } catch (error) {
      response.type = 'error';
      response.message = error.message;
      setLoading(false);

      if (error.message === 'Invalid session token') {
        localStorage.clear();
      }
    }

    if (response.type !== 'error') {
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }

    alertHandler(response);
  };

  const handleDraft = async () => {
    setLoading(true);

    /* Submit draft blog */
    // const res = await draftBlog(blogFormState);
    const res = {};

    if (res?.type !== 'error') {
      setTimeout(() => {
        navigate('/dashboard/blog');
      }, 500);
    }

    alertHandler(res);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const confirmDialog = (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Save to Drafts</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to save this blog as a draft?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <LoadingButton onClick={handleDraft} loading={loading} autoFocus>
          Yes
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );

  return (
    <Container component="main" maxWidth="sm" sx={{ my: 2 }}>
      {confirmDialog}
      <AlertMessage
        isOpen={alertState}
        message={alertMessage}
        handleClose={handleAlertClose}
        type={alertType}
      />
      <Paper elevation={0} sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', py: 3 }}>
          {isEdit ? 'Edit blog' : 'Add Blog'}
        </Typography>
        <form encType="multipart/form-data">
          <Grid container sx={{ justifyContent: 'center', mb: 3 }}>
            <CardMedia
              sx={{ border: '2px dashed lightgray', borderRadius: '2%' }}
              component="img"
              alt="green iguana"
              height="300"
              image={fileDataURL}
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
              <Input name="blogCover" handleChange={imageChangeHandler} type="file" hidden />
            </Button>
          </Grid>
          <Grid container spacing={2}>
            <Input
              name="title"
              handleChange={handleChange}
              label="Blog Title"
              type="text"
              value={blogFormState?.title}
              autoFocus
            />
            <Input
              name="description"
              handleChange={handleChange}
              label="Description"
              type="text"
              value={blogFormState?.description}
              multiline
              rows={8}
            />
            <Grid item xs={12}>
              <LoadingButton
                onClick={handleSubmit}
                loading={loading}
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                {isEdit ? 'Update' : 'Submit'}
              </LoadingButton>
            </Grid>
            {!isEdit && (
              <Grid item xs={12}>
                <LoadingButton
                  onClick={handleOpenDialog}
                  loading={loading}
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                >
                  Save to Drafts
                </LoadingButton>
              </Grid>
            )}
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Form;
