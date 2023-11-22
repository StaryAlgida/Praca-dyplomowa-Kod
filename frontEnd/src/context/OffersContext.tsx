import axios from "axios";
import { Offer, Offers } from "../offerts/OffersInterface";
import { ReactNode, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

interface OffersContextData {
  items: Offers;
  item: Offer;
  pages: number;
  getOffers: (page: string | undefined) => void;
  getOffer: (id: string | undefined) => void;
}

const OffersContext = createContext<OffersContextData>({
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
  item: {
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
  pages: 0,
  getOffers: async () => {},
  getOffer: async () => {},
});

export default OffersContext;

export const OffersProvider = ({ children }: { children: ReactNode }) => {
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
  const [item, setItem] = useState<Offer>({
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
  });
  const [pages, setPages] = useState<number>(1);
  const nav = useNavigate();

  const getOffers = async (page: string | undefined) => {
    try {
      const response = await client.get(`offers/?p=${page}`);
      console.log(response.data);
      if (response.status === 200) {
        setItems(response.data);
        setPages(Math.ceil(response.data.count / 12));
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          nav("/error/404");
        }
        if (err.code === "ERR_NETWORK") {
          nav("/error/404n");
        }
      }
    }
  };

  const getOffer = async (id: string | undefined) => {
    try {
      const response = await client(`offer/${id}/`);
      console.log(response);
      if (response.status === 200) {
        setItem(response.data);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          nav("/error/404");
        }
        console.log(err);
      }
    }
  };

  const contextData = {
    items,
    item,
    pages,
    getOffers,
    getOffer,
  };

  return (
    <OffersContext.Provider value={contextData}>
      {children}
    </OffersContext.Provider>
  );
};
