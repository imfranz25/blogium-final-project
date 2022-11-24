/* 3rd party Modules */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Paper, Grid, Typography, Button, CardMedia } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ImageIcon from '@mui/icons-material/Image';

/* Components & Actions */
import Input from '../components/Input';
import { createBlog, draftBlog, getBlog, updateBlog } from '../actions/blog.action.js';
import defaultCover from '../assets/images/default-cover.jpg';

/* Global Variables */
const imageMimeType = /image\/(png|jpg|jpeg)/i;
const initialBlogForm = {
  title: '',
  description: '',
  cover_picture_url: '',
};

function BlogForm() {
  const params = useParams();
  const blogId = params.blogId;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [blogFormState, setBlogFormState] = useState(initialBlogForm);
  const [isEdit, setEdit] = useState(false);
  const [blogFound, setBlogFound] = useState(true);
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(defaultCover);
  const existingBlog = useSelector((state) => {
    return state.blogReducer[0] || { ...initialBlogForm };
  });

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

  useEffect(() => {
    if (existingBlog.title !== '') {
      setBlogFormState({ ...existingBlog });
    }
  }, [existingBlog]);

  useEffect(() => {
    if (blogId) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [blogId]);

  useEffect(() => {
    if (isEdit) {
      dispatch(getBlog(blogId, navigate));
    }
  }, [isEdit, dispatch, navigate, blogId]);

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

  const handleChange = (e) => {
    setBlogFormState({ ...blogFormState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true);

    if (isEdit) {
      dispatch(updateBlog(existingBlog.id, blogFormState, navigate));
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
    <>
      {blogFound ? (
        <>
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
                    value={isEdit ? existingBlog?.title : ''}
                    autoFocus
                  />
                  <Input
                    name="description"
                    handleChange={handleChange}
                    label="Description"
                    type="text"
                    value={isEdit ? existingBlog?.description : ''}
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
                      Submit
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
        </>
      ) : (
        <Typography>BLog Not Found</Typography>
      )}
    </>
  );
}

export default BlogForm;
