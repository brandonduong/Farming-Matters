import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth/hooks';

export const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isActiveSession, isDenied } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  } else if (!isActiveSession || isDenied) {
    return <Navigate to="/denied" replace />;
  }

  return children;
};
