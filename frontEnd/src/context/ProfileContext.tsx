import { ReactNode, createContext, useState } from "react";
import { PublicInfo } from "../interfaces/ProfileInterface";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

interface ProfileContextData {
  userData: PublicInfo;
  getPublicInfo: (username: string) => void;
}

const ProfileContext = createContext<ProfileContextData>({
  userData: {
    username: "",
    company_name: "",
    first_name: "",
    last_name: "",
    contact_email: "",
    phone_number: "",
    profile_picture: "",
  },
  getPublicInfo: async () => {},
});

export default ProfileContext;

export const ProfileContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const Links = {
    public_info: "profiles/",
  };
  const [userData, setUserData] = useState<PublicInfo>({
    username: "",
    company_name: "",
    first_name: "",
    last_name: "",
    contact_email: "",
    phone_number: "",
    profile_picture: "",
  });
  const nav = useNavigate();

  const getPublicInfo = async (username: string) => {
    try {
      const response = await client.get(`${Links.public_info}${username}`);
      setUserData({ ...response.data });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) nav("/");
      }
    }
  };

  const contextData = { userData, getPublicInfo };

  return (
    <ProfileContext.Provider value={contextData}>
      {children}
    </ProfileContext.Provider>
  );
};
