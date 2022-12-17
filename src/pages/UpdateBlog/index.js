/* 3rd party Modules */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';

/* Actions & Components */
import BlogForm from '../../components/BlogForm';

function UpdateBlog() {
  const params = useParams();
  const blogId = params.blogId;
  const navigate = useNavigate();
  const existingBlog = useSelector((state) => {
    return state.blogReducer[0];
  });

  useEffect(() => {
    document.title = 'Update blog';
  }, []);

  useEffect(() => {
    if (blogId) {
      // getBlog(blogId);
    }
  }, [navigate, blogId]);

  return (
    <>
      {existingBlog ? (
        <BlogForm isEdit={true} initialBlogState={existingBlog} />
      ) : (
        <Grid justifyContent="center" sx={{ my: 10 }}>
          <Typography variant="h6" color="text.secondary" textAlign="center">
            Blog not found
          </Typography>
        </Grid>
      )}
    </>
  );
}

export default UpdateBlog;
