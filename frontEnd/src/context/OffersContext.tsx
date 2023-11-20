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
  getOffer: (index: number) => void;
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
  });
  const [pages, setPages] = useState<number>(1);
  const nav = useNavigate();

  const checkPage = () => {};

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

  const getOffer = async () => {
    try {
      console.log("ok");
    } catch (err) {
      if (axios.isAxiosError(err)) {
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
