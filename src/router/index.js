import { createBrowserRouter } from 'react-router-dom';

/* Pages */
import Home from '../pages/Home.js';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard/blog',
    element: <Home />,
  },
];

const router = createBrowserRouter(routes);

export default router;
