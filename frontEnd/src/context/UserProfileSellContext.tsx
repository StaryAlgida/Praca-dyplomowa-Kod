import axios from "axios";
import { ReactNode, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

interface SellItems {
  name: string;
  price: number;
  quantity: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pictures: any;
  description: string;
}

interface UserProfileSellContextData {
  sellItems: SellItems[];
  addItemToSell: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const UserProfileSellContext = createContext<UserProfileSellContextData>({
  sellItems: [
    { name: "", price: 0, quantity: 0, pictures: null, description: "" },
  ],
  addItemToSell: async () => {},
});

export default UserProfileSellContext;

export const UserProfileSellProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const navigate = useNavigate();
  const [sellItems, setSellItems] = useState<SellItems[]>([]);
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

      if (response.status === 201) {
        console.log("ok");
        navigate("/");
      }
      // console.log(
      //   electronics,
      //   " ",
      //   fashion,
      //   " ",
      //   home_garden,
      //   " ",
      //   automotive,
      //   " ",
      //   health_beauty
      // );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
      }
    }
  };

  const contextData = {
    sellItems,
    addItemToSell,
  };

  return (
    <UserProfileSellContext.Provider value={contextData}>
      {children}
    </UserProfileSellContext.Provider>
  );
};
