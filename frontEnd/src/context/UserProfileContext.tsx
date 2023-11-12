import React, { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import { jwtDecode } from "jwt-decode";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

interface Errors {
  error: string;
  id: number[];
}

interface JwtPayload {
  user_id: number;
  username: string;
}

interface LoggedUserInfo {
  company_name: string;
  first_name: string;
  last_name: string;
  contact_email: string;
  phone_number: string;
}

interface PrivateInfo {
  email: string;
  username: string;
}

interface UserProfileContextData {
  mainUserInfo: LoggedUserInfo;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  soldInfo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  boughtInfo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  username: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userPrivateIfno: any;
  error: Errors;
  getPublicInfoForm: () => void;
  publickInfoUpdate: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  getPrivateInfo: () => void;
  resetPrivateInfo: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  changePassword: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  getPublicInfo: () => void;
  resetError: () => void;
}

const UserProfileContext = createContext<UserProfileContextData>({
  mainUserInfo: {
    company_name: "",
    first_name: "",
    last_name: "",
    contact_email: "",
    phone_number: "",
  },
  soldInfo: null,
  boughtInfo: null,
  username: null,
  userPrivateIfno: null,
  error: { error: "", id: [] },
  getPublicInfoForm: () => {},
  publickInfoUpdate: async () => {},
  resetPrivateInfo: async () => {},
  getPrivateInfo: () => {},
  changePassword: async () => {},
  getPublicInfo: () => {},
  resetError: () => {},
});
// e: React.FormEvent<HTMLFormElement>
function getUser() {
  const storedTokens = localStorage.getItem("authTokens");
  if (storedTokens) {
    const decodedUser = jwtDecode(storedTokens) as JwtPayload;

    if (decodedUser) {
      return decodedUser?.username;
    }
  }
  return null;
}

export default UserProfileContext;

// start
export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const username = getUser();
  const authTokens = JSON.parse(localStorage.getItem("authTokens") as string);
  const [mainUserInfo, setMainUserInfo] = useState<LoggedUserInfo>({
    company_name: "",
    first_name: "",
    last_name: "",
    contact_email: "",
    phone_number: "",
  });
  const [error, setError] = useState<Errors>({ error: "", id: [] });

  const [userPrivateIfno, setUserPrivateIfno] = useState<PrivateInfo>({
    email: "",
    username: "",
  });

  const publickInfoUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const contact_email = formData.get("contact_email") as string;
      const phone_number = formData.get("phone_number") as string;
      const company_name = formData.get("company_name") as string;
      const first_name = formData.get("first_name") as string;
      const last_name = formData.get("last_name") as string;
      if (
        !contact_email &&
        !phone_number &&
        !company_name &&
        !first_name &&
        !last_name
      ) {
        console.log("you change nothing");
      } else {
        const response = await client.put(
          "/profile/updateinfo/",
          {
            username,
            contact_email,
            phone_number,
            company_name,
            first_name,
            last_name,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokens.access}`,
            },
          }
        );
        if (response.status === 200) {
          navigate("/profile");
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
      }
    }
  };

  const getPublicInfo = async () => {
    try {
      const response = await client.get("profile/info", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      if (response.status === 200) {
        setMainUserInfo(response.data);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("err");
      }
    }
  };

  const getPublicInfoForm = async () => {
    try {
      const response = await client.get("/profile/updateinfo/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      if (response.status === 200) {
        setMainUserInfo({ ...response.data });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
      }
    }
  };

  const getPrivateInfo = async () => {
    try {
      const response = await client.get("profile/privinfoupdate", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      if (response.status === 200) {
        setUserPrivateIfno({ ...response.data });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("get error: ", err);
      }
    }
  };

  const resetPrivateInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("login_email") as string;
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;

      const response = await client.put(
        "profile/privinfoupdate",
        { email, username, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      if (response.status === 200) {
        navigate("/profile");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          if (err.response.data.username) {
            setError({ error: err.response.data.username[0], id: [1] });
          } else if (err.response.data.email) {
            setError({ error: err.response.data.email[0], id: [0] });
          } else {
            setError({
              error: err.response.data.error,
              id: err.response.data.id.map(Number),
            });
          }
        }
      }
    }
  };

  const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const old_password = formData.get("old_password") as string;
      const password = formData.get("new_passowrd") as string;
      const confirm_password = formData.get("repeat_passowrd") as string; //poprawić password

      const response = await client.put(
        "profile/passwordupdate",
        { old_password, password, confirm_password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      if (response.status === 200) {
        navigate("/profile");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          setError({
            error: err.response.data.error,
            id: err.response.data.id.map(Number),
          });
        }
      }
    }
  };

  const resetError = () => {
    setError({ error: "", id: [] });
  };

  const contextData = {
    mainUserInfo: mainUserInfo,
    username: username,
    userPrivateIfno: userPrivateIfno,
    soldInfo: null,
    boughtInfo: null,
    error: error,
    publickInfoUpdate,
    getPublicInfo,
    getPublicInfoForm,
    getPrivateInfo,
    resetPrivateInfo,
    changePassword,
    resetError,
  };

  return (
    <UserProfileContext.Provider value={contextData}>
      {children}
    </UserProfileContext.Provider>
  );
};
