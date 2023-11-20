import axios from "axios";
import { ReactNode, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ItemInfo, Titles } from "../components/sell/Interfaces";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

interface UserProfileSellContextData {
  sellItem: ItemInfo;
  titles: Titles;
  addItemToSell: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  getSellItemsTitle: () => void;
  getSellItemInfo: (index: number) => void;
  editSellItem: (
    e: React.FormEvent<HTMLFormElement>,
    index: number
  ) => Promise<void>;
  deleteSellItem: (index: number) => void;
}

const UserProfileSellContext = createContext<UserProfileSellContextData>({
  sellItem: {
    title: "",
    electronics: false,
    fashion: false,
    home_garden: false,
    automotive: false,
    health_beauty: false,
    price: 0,
    quantity: 0,
    description: "",
  },
  titles: { 0: { title: "", id: -1 } },
  addItemToSell: async () => {},
  getSellItemsTitle: () => {},
  getSellItemInfo: () => {},
  editSellItem: async () => {},
  deleteSellItem: () => {},
});

export default UserProfileSellContext;

export const UserProfileSellProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const navigate = useNavigate();
  const [sellItem, setSellItem] = useState<ItemInfo>({
    title: "",
    electronics: false,
    fashion: false,
    home_garden: false,
    automotive: false,
    health_beauty: false,
    price: 0,
    quantity: 0,
    description: "",
  });

  const [titles, setTitles] = useState<Titles>({ 0: { title: "", id: -1 } });

  const authTokens = JSON.parse(localStorage.getItem("authTokens") as string);

  const addItemToSell = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const title = formData.get("product_name") as string;

      const electronics = formData.get("electronics") ? true : false;
      const fashion = formData.get("fashion") ? true : false;
      const home_garden = formData.get("home_garden") ? true : false;
      const automotive = formData.get("automotive") ? true : false;
      const health_beauty = formData.get("health_beauty") ? true : false;

      const price = formData.get("price") as string;
      const quantity = formData.get("quantity") as string;
      const picture = formData.get("picture") as string;

      const description = formData.get("description") as string;

      const response = await client.post(
        "/sell/add",
        {
          title,
          electronics,
          fashion,
          home_garden,
          automotive,
          health_beauty,
          price,
          quantity,
          picture,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("ok");
        navigate("/");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
      }
    }
  };

  const getSellItemsTitle = async () => {
    try {
      const response = await client.get("/sell/add", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      setTitles(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
      }
    }
  };

  const getSellItemInfo = async (index: number) => {
    try {
      const response = await client.get(`sell/itemInfo/${index}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      setSellItem(response.data[0]);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
      }
    }
  };

  const editSellItem = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const title = formData.get("product_name") as string;

      const electronics = formData.get("electronics") ? true : false;
      const fashion = formData.get("fashion") ? true : false;
      const home_garden = formData.get("home_garden") ? true : false;
      const automotive = formData.get("automotive") ? true : false;
      const health_beauty = formData.get("health_beauty") ? true : false;

      const price = formData.get("price") as string;
      const quantity = formData.get("quantity") as string;
      const picture = formData.get("picture") as string;

      const description = formData.get("description") as string;

      const response = await client.put(
        `sell/itemInfo/${id}`,
        {
          title,
          electronics,
          fashion,
          home_garden,
          automotive,
          health_beauty,
          price,
          quantity,
          picture,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      console.log(response);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
      }
    }
  };

  const deleteSellItem = async (index: number) => {
    try {
      const response = await client.delete(`sell/itemInfo/${index}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      console.log(response);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
      }
    }
  };

  const contextData = {
    sellItem,
    titles,
    addItemToSell,
    getSellItemsTitle,
    getSellItemInfo,
    editSellItem,
    deleteSellItem,
  };

  return (
    <UserProfileSellContext.Provider value={contextData}>
      {children}
    </UserProfileSellContext.Provider>
  );
};
