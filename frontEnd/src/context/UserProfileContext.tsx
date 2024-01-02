import React, { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  Errors,
  JwtPayload,
  LoggedUserInfo,
  PrivateInfo,
  UserProfileContextData,
  History,
} from "../interfaces/UserProfileInterfaces";
// import { jwtDecode } from "jwt-decode";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

const UserProfileContext = createContext<UserProfileContextData>({
  mainUserInfo: {
    company_name: "",
    first_name: "",
    last_name: "",
    contact_email: "",
    phone_number: "",
    profile_picture: "",
  },
  soldInfo: null,
  boughtInfo: null,
  username: "",
  userPrivateIfno: null,
  error: { error: "", id: [] },
  sellHistory: {
    count: 0,
    next: "",
    previous: "",
    results: [
      {
        title: "",
        price: 0,
        quantity: 0,
        date: "",
        shipping_id: 0,
        buyer_id: 0,
        buyer_name: "",
        item_id: 0,
      },
    ],
  },
  buyHistory: {
    count: 0,
    next: "",
    previous: "",
    results: [
      {
        title: "",
        price: 0,
        quantity: 0,
        date: "",
        shipping_id: 0,
        seller_id: 0,
        seller_name: "",
        item_id: 0,
      },
    ],
  },
  getPublicInfoForm: () => {},
  publickInfoUpdate: async () => {},
  updatePrivateInfo: async () => {},
  getPrivateInfo: () => {},
  changePassword: async () => {},
  getPublicInfo: () => {},
  resetError: () => {},
  getSellHistory: () => {},
  getBuyHistory: () => {},
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
  return "";
}

export default UserProfileContext;

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const Links = {
    profile: "profile/",
    update_info: "profile/update/info",
    update_login: "profile/update/login",
    update_password: "profile/update/password",
    sell_history: "profile/history/sell",
    buy_history: "profile/history/buy",
  };

  const navigate = useNavigate();
  const username = getUser();
  const authTokens = JSON.parse(localStorage.getItem("authTokens") as string);
  const [mainUserInfo, setMainUserInfo] = useState<LoggedUserInfo>({
    company_name: "",
    first_name: "",
    last_name: "",
    contact_email: "",
    phone_number: "",
    profile_picture: "",
  });
  const [error, setError] = useState<Errors>({ error: "", id: [] });

  const [userPrivateIfno, setUserPrivateIfno] = useState<PrivateInfo>({
    email: "",
    username: "",
  });

  const [sellHistory, setSellHistory] = useState<History>({
    count: 0,
    next: "",
    previous: "",
    results: [
      {
        title: "",
        price: 0,
        quantity: 0,
        date: "",
        shipping_id: 0,
        buyer_id: 0,
        buyer_name: "",
        item_id: 0,
      },
    ],
  });

  const [buyHistory, setBuyHistory] = useState<History>({
    count: 0,
    next: "",
    previous: "",
    results: [
      {
        title: "",
        price: 0,
        quantity: 0,
        date: "",
        shipping_id: 0,
        seller_id: 0,
        seller_name: "",
        item_id: 0,
      },
    ],
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
        const response = await client.put(Links.update_info, formData, {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        if (response.status === 200) {
          navigate("/profile");
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          localStorage.removeItem("authTokens");
          navigate("/login");
        }
        console.log(err.response);
      }
    }
  };

  const getPublicInfo = async () => {
    try {
      const response = await client.get(Links.profile, {
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
        if (err.response?.status === 401) {
          localStorage.removeItem("authTokens");
          navigate("/login");
        }
        console.log("err");
      }
    }
  };

  const getPublicInfoForm = async () => {
    try {
      const response = await client.get(Links.update_info, {
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
        if (err.response?.status === 401) {
          localStorage.removeItem("authTokens");
          navigate("/login");
        }
        console.log(err);
      }
    }
  };

  const getPrivateInfo = async () => {
    try {
      const response = await client.get(Links.update_login, {
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
        if (err.response?.status === 401) {
          localStorage.removeItem("authTokens");
          navigate("/login");
        }
        console.log("get error: ", err);
      }
    }
  };

  const updatePrivateInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("login_email") as string;
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;

      const response = await client.put(
        Links.update_login,
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
        if (err.response?.status === 401) {
          localStorage.removeItem("authTokens");
          navigate("/login");
        }
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
        Links.update_password,
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
        if (err.response?.status === 401) {
          localStorage.removeItem("authTokens");
          navigate("/login");
        }
        if (err.response?.status === 400) {
          setError({
            error: err.response.data.error,
            id: err.response.data.id.map(Number),
          });
        }
      }
    }
  };

  const getSellHistory = async () => {
    try {
      const response = await client.get(Links.sell_history, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      setSellHistory({ ...response.data });
      console.log("sell_history: ", response);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
      }
    }
  };

  const getBuyHistory = async () => {
    try {
      const response = await client.get(Links.buy_history, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      setBuyHistory({ ...response.data });
      console.log("buy_history: ", response);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
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
    sellHistory,
    buyHistory,
    publickInfoUpdate,
    getPublicInfo,
    getPublicInfoForm,
    getPrivateInfo,
    updatePrivateInfo,
    changePassword,
    resetError,
    getSellHistory,
    getBuyHistory,
  };

  return (
    <UserProfileContext.Provider value={contextData}>
      {children}
    </UserProfileContext.Provider>
  );
};
