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

  const addItemToSell = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const product_name = formData.get("product_name") as string;

      const electronics = formData.get("electronics") as string;
      const fashion = formData.get("fashion") as string;
      const home_garden = formData.get("home_garden") as string;
      const automotive = formData.get("automotive") as string;
      const health_beauty = formData.get("health_beauty") as string;

      const price = formData.get("price") as string;
      const quantity = formData.get("quantity") as string;
      const picture = formData.get("picture") as string;

      const description = formData.get("description") as string;

      const response = await client.post("/sell/add", {
        product_name,
        tags: [electronics, fashion, home_garden, automotive, health_beauty],
        price,
        quantity,
        picture,
        description,
      });

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
