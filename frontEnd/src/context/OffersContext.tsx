import axios from "axios";
import { BuyItemData, Offer, Offers } from "../interfaces/OffersInterface";
import { ReactNode, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

interface OffersContextData {
  items: Offers;
  item: Offer;
  pages: number;
  itemData: BuyItemData | null;
  getOffers: (page: string | undefined) => void;
  getOffer: (id: string | undefined) => void;
  buyOffer: (
    id: string,
    price: string,
    e: React.FormEvent<HTMLFormElement>
  ) => void;
  shippingFormSend: (e: React.FormEvent<HTMLFormElement>) => void;
  offersCategory: (category: string, page: string) => void;
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
  itemData: {
    id: "",
    amount: "",
    price: "",
  },
  getOffers: async () => {},
  getOffer: async () => {},
  buyOffer: () => {},
  shippingFormSend: async () => {},
  offersCategory: async () => {},
});

export default OffersContext;

export const OffersProvider = ({ children }: { children: ReactNode }) => {
  const authTokens = JSON.parse(localStorage.getItem("authTokens") as string);
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

  const [itemData, setItemData] = useState<BuyItemData | null>(
    JSON.parse(localStorage.getItem("itemData") as string)
  );

  const getOffers = async (page: string | undefined) => {
    try {
      const response = await client.get(`offer/?p=${page}`);
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
      const response = await client.get(`offer/${id}/`);
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

  const buyOffer = (
    id: string,
    price: string,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (authTokens) {
      const formData = new FormData(e.currentTarget);
      const newAmount = formData.get("amount") as string;
      const data = { id, amount: newAmount, price };
      localStorage.setItem("itemData", JSON.stringify(data));
      nav(`/shipping`);
    } else {
      nav("/login");
    }
  };

  const shippingFormSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(itemData);

    try {
      if (itemData) {
        const formData = new FormData(e.currentTarget);
        formData.append("amount", itemData.amount);
        formData.append("item_id", itemData.id);
        const response = await client.post(
          `offer/buy/${itemData.id}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokens.access}`,
            },
          }
        );
        console.log("shipping response: ", response.data);
        // localStorage.removeItem("itemData");
        nav("/profile");
      } else nav("/");
    } catch (err) {
      localStorage.removeItem("itemData");
      if (axios.isAxiosError(err)) {
        console.log(err);
      }
    }
  };

  const offersCategory = async (category: string, page: string) => {
    try {
      const response = await client.get(`/offer/${category}?p=${page}`);
      if (response.status === 200) {
        console.log(response);

        setItems({ ...response.data });
        setPages(Math.ceil(response.data.count / 12));
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404 || err.response?.status === 500) {
          nav("/error/404");
        }
        console.log(err);
      }
    }
  };
  // const offerBuy = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData(e.currentTarget);
  //     const response = await client.post(`/offer/buy/${id}`, formData, {
  //       headers: {
  //         Authorization: `Bearer ${authTokens.access}`,
  //       },
  //     });
  //     console.log(response);
  //   } catch (err) {
  //     if (axios.isAxiosError(err)) {
  //       console.log(err);
  //     }
  //   }
  // };

  const contextData = {
    items,
    item,
    pages,
    itemData,
    getOffers,
    getOffer,
    buyOffer,
    shippingFormSend,
    offersCategory,
  };

  return (
    <OffersContext.Provider value={contextData}>
      {children}
    </OffersContext.Provider>
  );
};
