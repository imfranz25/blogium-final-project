import { Outlet, Navigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

const PrivateRoutes = () => {
  let token = localStorage.getItem('blogiumUser');

  return token ? (
    <>
      <Navigation />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
