import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

const PrivateRoute = () => {
  const { userLoggedIn, chekingStatus } = useAuthStatus();
  if (chekingStatus) {
    return <Spinner />;
  }
  return userLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
