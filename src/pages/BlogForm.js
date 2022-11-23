/* 3rd party Modules */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Typography, Button, CardMedia } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ImageIcon from '@mui/icons-material/Image';

/* Components & Actions */
import Navigation from '../components/Navigation';
import Input from '../components/Input';
import { createBlog } from '../actions/blog.action.js';

/* Global Variables */
const imageMimeType = /image\/(png|jpg|jpeg)/i;
const initialBlogForm = {
  title: '',
  description: '',
  cover_picture_url: '',
};

function BlogForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [blogFormState, setBlogFormState] = useState(initialBlogForm);

  /* File */
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(
    `https://elementor.com/marketing/wp-content/uploads/sites/9/2021/12/2021_10_blog_cover_21-Profitable-Website-Ideas-for-Your-Side-Business-in-2022_1200_630-.jpg`
  );

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
    e.preventDefault();
    setLoading(true);
    dispatch(createBlog(blogFormState, navigate));
    setLoading(false);
  };

  return (
    <>
      <Navigation />
      <Container component="main" maxWidth="sm" sx={{ my: 10 }}>
        <Paper elevation={5} sx={{ p: 5 }}>
          <Typography variant="h5" sx={{ textAlign: 'center', py: 3 }}>
            Add Blog
          </Typography>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                label="BLog Title"
                type="text"
                autoFocus
              />
              {/* prettier-ignore */}
              <Input 
                name="description" 
                handleChange={handleChange} 
                label="Description" 
                type="text" 
                multiline
                rows={8}
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
                  Submit
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default BlogForm;
