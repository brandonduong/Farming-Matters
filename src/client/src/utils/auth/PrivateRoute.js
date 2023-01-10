import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks";

export const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    
    if (isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };