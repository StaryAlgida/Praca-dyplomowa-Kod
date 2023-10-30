import { Navigate } from "react-router-dom";
import { ReactNode, useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);
  return !user ? <Navigate to="/" /> : children;
};

export default PrivateRoute;
