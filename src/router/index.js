import { createBrowserRouter } from 'react-router-dom';

/* Pages */
import PrivateRoutes from '../utils/PrivateRoutes';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import AddBlog from '../pages/AddBlog';
import UpdateBlog from '../pages/UpdateBlog';
import MyBlogs from '../pages/MyBlogs';
import BlogDetails from '../pages/BlogDetails';
import Profile from '../pages/Profile';
// import PageNotFound from '../pages/PageNotFound';

const routes = [
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <PrivateRoutes />,
    // errorElement: <PageNotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/blog/add',
        element: <AddBlog />,
      },
      {
        path: '/:blogId',
        element: <BlogDetails />,
      },
      {
        path: '/dashboard/blog',
        element: <MyBlogs />,
      },
      {
        path: '/dashboard/profile',
        element: <Profile />,
      },
      {
        path: '/dashboard/blog/:blogId',
        element: <UpdateBlog />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
