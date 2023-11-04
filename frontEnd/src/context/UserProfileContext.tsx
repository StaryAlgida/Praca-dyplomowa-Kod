import React, { createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import { jwtDecode } from "jwt-decode";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

interface Error {
  message: string;
  response: number;
}

interface JwtPayload {
  user_id: number;
  username: string;
}

interface UserProfileContextData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainUserInfo: any; //
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  soldInfo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  boughtInfo: any;
  error: Error;
  publickInfoUpdate: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const UserProfileContext = createContext<UserProfileContextData>({
  mainUserInfo: null,
  soldInfo: null,
  boughtInfo: null,
  error: { message: "", response: 0 },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  publickInfoUpdate: async (e: React.FormEvent<HTMLFormElement>) => {},
});

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

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const username = getUser();

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
        const authTokens = JSON.parse(
          localStorage.getItem("authTokens") as string
        );

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

  const contextData = {
    mainUserInfo: null,
    soldInfo: null,
    boughtInfo: null,
    error: { message: "", response: 0 },
    publickInfoUpdate: publickInfoUpdate,
  };

  return (
    <UserProfileContext.Provider value={contextData}>
      {children}
    </UserProfileContext.Provider>
  );
};
