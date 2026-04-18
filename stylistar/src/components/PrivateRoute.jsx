import { Navigate, useLocation } from "react-router-dom";
import isAuthenticated from "../utils/isAuthenticated";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const next = `${location.pathname}${location.search}${location.hash}`;
  const loginPath = `/login?next=${encodeURIComponent(next)}`;

  return isAuthenticated() ? children : <Navigate to={loginPath} replace />;
};

export default PrivateRoute;
