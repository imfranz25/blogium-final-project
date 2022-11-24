import { createBrowserRouter } from 'react-router-dom';

/* Pages */
import PrivateRoutes from '../utils/PrivateRoutes';
import Home from '../pages/Home.js';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import BlogForm from '../pages/BlogForm';
import MyBlogs from '../pages/MyBlogs';
import BlogDetails from '../pages/BlogDetails';

const routes = [
  {
    element: <PrivateRoutes />,
    errorElement: <h1>Page not Found</h1>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/dashboard/blog',
        element: <MyBlogs />,
      },
      {
        path: '/blog/add',
        element: <BlogForm />,
      },
      {
        path: '/:blogId',
        element: <BlogDetails />,
      },
    ],
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />,
  },
];

const router = createBrowserRouter(routes);

export default router;
