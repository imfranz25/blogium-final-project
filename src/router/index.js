import { createBrowserRouter } from 'react-router-dom';

/* Pages */
import PrivateRoutes from '../utils/PrivateRoutes';
import Home from '../pages/Home.js';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';

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
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'dashboard/blog',
        element: <h1>blogggg</h1>,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
