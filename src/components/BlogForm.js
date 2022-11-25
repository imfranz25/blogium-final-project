import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Container, Paper, Grid, Typography, Button, CardMedia } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ImageIcon from '@mui/icons-material/Image';

/* Components & Actions */
import Input from './Input';
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

  const handleSubmit = (e) => {
    setLoading(true);

    if (isEdit) {
      dispatch(updateBlog(blogFormState, navigate));
    } else {
      dispatch(createBlog(blogFormState, navigate));
    }

    setLoading(false);
  };

  const handleDraft = (e) => {
    setLoading(true);
    dispatch(draftBlog(blogFormState, navigate));
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ my: 10 }}>
      <Paper elevation={5} sx={{ p: 5 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', py: 3 }}>
          {isEdit ? 'Edit blog' : 'Add Blog'}
        </Typography>
        <form encType="multipart/form-data">
          <Grid container sx={{ justifyContent: 'center', mb: 3 }}>
            <CardMedia
              sx={{ border: '1px solid gray', borderRadius: '2%' }}
              component="img"
              alt="green iguana"
              height="200"
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
                  onClick={handleDraft}
                  loading={loading}
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                >
                  Save to Draft
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
