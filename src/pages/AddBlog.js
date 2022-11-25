/* Actions & Components */
import BlogForm from '../components/BlogForm';

function AddBlog() {
  const initialBlogState = {
    title: '',
    description: '',
    cover_picture_url: '',
  };

  return (
    <>
      <BlogForm isEdit={false} initialBlogState={initialBlogState} />
    </>
  );
}

export default AddBlog;
