import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

interface AuthContextData {
  userLog: boolean;
  registerUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({
  userLog: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerUser: async (e: React.FormEvent<HTMLFormElement>) => {},
});

export default AuthContext;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;
      const password2 = formData.get("password2") as string;
      const email = formData.get("email") as string;
      console.log(formData);

      // console.log(`${username}, ${password}, ${password2}, ${email}`);

      const response = await client.post("/api/register", {
        username,
        password,
        password2,
        email,
      });

      const data = response.data;
      console.log("data: ", data);

      if (response.status == 201) {
        const login = await client.post("/api/login", {
          email,
          password,
        });
        const loginData = response.data;
        console.log("loginData: ", loginData);

        if (login.status == 200) {
          setIsLogged(true);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          navigate("/profile");
        } else {
          console.log("Login error");
        }
      } else {
        console.log(response.status);
        console.log("Register error!");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status == 500) {
          //   setErrorRegister({ error: ["Register error!"] });
          console.log("Register error!");
        } else {
          console.log("Error: ", err.response?.data);
        }
      }
      console.log(err);
      console.log("end error message");
    }
  };

  const contextData = {
    userLog: isLogged,
    registerUser: registerUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
