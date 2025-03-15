import { useAuth0 } from "@auth0/auth0-react"
import { Navigate, Outlet } from "react-router-dom"; //render all the child routes of the component, if the user is authenticated

const ProtectedRoute = () => {

    const {isAuthenticated, isLoading} = useAuth0();

    if (isLoading) {
        return null;
      }
    
      if (isAuthenticated) {
        return <Outlet />;
      }
    
      return <Navigate to="/" replace />;

};

export default ProtectedRoute