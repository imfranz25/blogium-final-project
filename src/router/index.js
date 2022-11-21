import { createBrowserRouter, Link } from 'react-router-dom';
import App from '../App';

const routes = [
  {
    path: '/',
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
        <Link to="app">App</Link>
      </div>
    ),
  },
  {
    path: 'about',
    element: <div>About</div>,
  },
  {
    path: 'app',
    element: <App />,
  },
];

const router = createBrowserRouter(routes);

export default router;
