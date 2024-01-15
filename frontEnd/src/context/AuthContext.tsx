import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

interface Error {
  login: string;
  register: string;
  regId: number[];
}

interface AuthContextData {
  user: unknown;
  authTokens: unknown;
  error: Error;
  loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  registerUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  logoutUser: () => void;
  toastifyOk: (message: string) => void;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  authTokens: null,
  error: { login: "", register: "", regId: [] },
  loginUser: async () => {},
  registerUser: async () => {},
  logoutUser: () => {},
  toastifyOk: () => {},
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
  const [error, setError] = useState({ login: "", register: "", regId: [] });

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const response = await client.post("/api/token/", { email, password });
      const data = await response.data;
      console.log(data);

      if (response.status == 200) {
        setError({ login: "", register: "", regId: [] });
        localStorage.setItem("authTokens", JSON.stringify(data)); //<------- zapisany token
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        navigate("/profile");
        toastifyOk("Logged");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError({
            login: "Bad email or passowrd.",
            register: "",
            regId: [],
          });
        }
        if (err.response?.status === 400) {
          setError({
            login: "Email and passowrd are required",
            register: "",
            regId: [],
          });
        }
      }
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("authTokens");
    setAuthTokens(null);
    setUser(null);
    navigate("/login");
  };

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;
      const confirm_password = formData.get("password2") as string;

      const response = await client.post("/register/", {
        email,
        username,
        password,
        confirm_password,
      });
      if (response.status === 201) {
        navigate("/login");
        setError({ login: "", register: "", regId: [] });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          console.log(err.response?.data.id);

          setError({
            login: "",
            register: err.response?.data.error,
            regId: err.response?.data.id,
          });
        }
      }
    }
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

  const toastifyOk = (message: string) =>
    toast(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

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
    registerUser: registerUser,
    toastifyOk,
    error: error,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

// function getKeys(Obj: AxiosError): number[] {
//   const response = Obj.response?.data;
//   const id: number[] = [];
//   let keys: string[];
//   if (response) {
//     keys = Object.keys(response);
//     keys.forEach((key) => {
//       switch (key) {
//         case "email":
//           id.push(0);
//           break;
//         case "username":
//           id.push(1);
//           break;
//         default:
//           break;
//       }
//     });
//   }
//   return id;
// }
