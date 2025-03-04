import { useAuth } from '../contexts/authContext/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { userLoggedIn, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  
  return userLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;