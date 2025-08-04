import { Navigate, Outlet } from 'react-router-dom';

const isLoggedIn = () => {
  return !!localStorage.getItem('currentUser');
};

const ProtectedRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to='/auth/login' replace />;
};

export default ProtectedRoute;
