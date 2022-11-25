/* 3rd party Modules */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';

/* Actions & Components */
import BlogForm from '../components/BlogForm';
import { getBlog } from '../actions/blog.action.js';

function UpdateBlog() {
  const params = useParams();
  const blogId = params.blogId;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const existingBlog = useSelector((state) => {
    return state.blogReducer[0];
  });

  useEffect(() => {
    if (blogId) {
      dispatch(getBlog(blogId, navigate));
    }
  }, [dispatch, navigate, blogId]);

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
