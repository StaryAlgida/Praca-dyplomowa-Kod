import { ReactNode, createContext, useState } from "react";
import { PublicInfo } from "../interfaces/ProfileInterface";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Offers } from "../interfaces/OffersInterface";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

interface ProfileContextData {
  userData: PublicInfo;
  items: Offers;
  pages: number;
  getPublicInfo: (username: string) => void;
  getUserOffers: (username: string, page: string | undefined) => void;
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
  items: {
    count: 0,
    next: "",
    previous: "",
    results: [
      {
        username: "",
        company_name: "",
        id: -1,
        title: "",
        electronics: false,
        fashion: false,
        home_garden: false,
        automotive: false,
        health_beauty: false,
        price: "",
        picture: "",
        quantity: 0,
        description: "",
      },
    ],
  },
  pages: 0,
  getPublicInfo: async () => {},
  getUserOffers: async () => {},
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

  const [items, setItems] = useState<Offers>({
    count: 0,
    next: "",
    previous: "",
    results: [
      {
        username: "",
        company_name: "",
        id: -1,
        title: "",
        electronics: false,
        fashion: false,
        home_garden: false,
        automotive: false,
        health_beauty: false,
        price: "",
        picture: "",
        quantity: 0,
        description: "",
      },
    ],
  });

  const [pages, setPages] = useState<number>(1);

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

  const getUserOffers = async (username: string, page: string | undefined) => {
    try {
      const response = await client.get(
        `profiles/${username}/items/?p=${page}`
      );
      setItems({ ...response.data });
      setPages(Math.ceil(response.data.count / 12));
      console.log(response);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
      }
    }
  };

  const contextData = { userData, items, pages, getPublicInfo, getUserOffers };

  return (
    <ProfileContext.Provider value={contextData}>
      {children}
    </ProfileContext.Provider>
  );
};
