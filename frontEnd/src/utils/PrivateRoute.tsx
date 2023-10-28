import { Navigate } from "react-router-dom";
import { ReactNode, useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children, ...rest }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);
  return !user ? <Navigate to="/" /> : children;
};

export default PrivateRoute;
