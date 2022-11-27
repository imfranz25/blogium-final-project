import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { createBlog, draftBlog, updateBlog } from '../actions/blog.action.js';

/* Global Variables */
const imageMimeType = /image\/(png|jpg|jpeg)/i;

function Form({ isEdit, initialBlogState }) {
  const dispatch = useDispatch();
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
      const URL_BACKEND = process.env.REACT_APP_BACKEND_URL;
      setBlogFormState(initialBlogState);
      setFileDataURL(`${URL_BACKEND}/${initialBlogState.cover_picture_url}`);
    }
  }, [initialBlogState, isEdit]);

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
    setBlogFormState({ ...blogFormState, [e.target.name]: e.target.files[0] });
  };

  const handleChange = (e) => {
    setBlogFormState({ ...blogFormState, [e.target.name]: e.target.value });
  };

  const handleAlertClose = () => {
    setAlertState(false);
  };

  const alertHandler = (res) => {
    setAlertType(res.type);
    setAlertMessage(res.message);
    setAlertState(true);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    let res;
    setLoading(true);

    if (isEdit) {
      res = await dispatch(updateBlog(blogFormState, navigate));
    } else {
      res = await dispatch(createBlog(blogFormState, navigate));
    }

    if (res?.type !== 'error') {
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }

    alertHandler(res);
  };

  const handleDraft = async (e) => {
    setLoading(true);

    /* Submit draft blog */
    const res = await dispatch(draftBlog(blogFormState, navigate));

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
              <Input
                name="cover_picture_url"
                handleChange={imageChangeHandler}
                type="file"
                hidden
              />
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
