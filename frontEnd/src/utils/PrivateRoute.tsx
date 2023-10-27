import { Navigate } from "react-router-dom";
import { ReactNode, useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children, ...rest }: { children: ReactNode }) => {
  const { userLog } = useContext(AuthContext);
  return !userLog ? <Navigate to="/register" /> : children;
};

export default PrivateRoute;
