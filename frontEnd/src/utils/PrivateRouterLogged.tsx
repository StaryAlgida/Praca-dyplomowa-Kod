import { Navigate } from "react-router-dom";
import { ReactNode, useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRouteLogged = ({ children, ...rest }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/profile/" /> : children;
};

export default PrivateRouteLogged;
