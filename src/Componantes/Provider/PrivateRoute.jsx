import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AllContext } from "./AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AllContext);
  const location = useLocation();

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" state={location.pathname } />;
  }

  return children;
};

export default PrivateRoute;
