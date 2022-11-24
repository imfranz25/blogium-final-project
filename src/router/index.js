import { createBrowserRouter } from 'react-router-dom';

/* Pages */
import PrivateRoutes from '../utils/PrivateRoutes';
import Home from '../pages/Home.js';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import BlogForm from '../pages/BlogForm';
import MyBlogs from '../pages/MyBlogs';
import BlogDetails from '../pages/BlogDetails';
import Profile from '../pages/Profile';

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
    errorElement: <h1>Page not Found</h1>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/blog/add',
        element: <BlogForm />,
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
        element: <BlogForm />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
