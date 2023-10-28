import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.xsrfHeaderName = "X-CSRFToken";
// axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

interface AuthContextData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authTokens: any;
  // errorLogIn: { [key: string]: string } | null;
  // errorSignUp: { [key: string]: string[] } | null;
  loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  // signupUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  authTokens: null,
  // errorLogIn: null,
  // errorSignUp: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loginUser: async (e: React.FormEvent<HTMLFormElement>) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // signupUser: async (e: React.FormEvent<HTMLFormElement>) => {},
  logoutUser: () => {},
});

export default AuthContext;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const storedTokens = localStorage.getItem("authTokens");
    if (storedTokens) {
      const decodedUser = jwtDecode(storedTokens);
      if (decodedUser) {
        return decodedUser;
      }
    }
    return null;
  });
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens") as string)
      : null
  );

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const response = await client.post("/api/token/", { username, password });
    const data = await response.data;
    console.log("response: ", response);

    console.log("data: ", data);

    if (response.status == 200) {
      localStorage.setItem("authTokens", JSON.stringify(data));
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      navigate("/profile");
    } else {
      alert("Login Error!");
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("authTokens");
    setAuthTokens(null);
    setUser(null);
    navigate("/login");
  };

  const updateToken = async () => {
    const response = await client.post("/api/token/refresh/", {
      refresh: authTokens?.refresh,
    });

    const data = response.data;
    if (response.status == 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const REFRESH_INTERVAL = 1000 * 60 * 4; // 4 minutes
    const interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [authTokens]);

  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
