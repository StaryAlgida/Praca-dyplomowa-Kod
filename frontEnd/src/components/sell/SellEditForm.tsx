import { useContext, useEffect, useState } from "react";
import UserProfileSellContext from "../../context/UserProfileSellContext";

type Id = {
  id: number;
};

export default function SellEditForm(id: Id) {
  const { editSellItem, getSellItemsTitle } = useContext(
    UserProfileSellContext
  );

  const { sellItem } = useContext(UserProfileSellContext);

  const [product_name, setProduct_name] = useState<string | null>(null);
  const [tags, setTags] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [price, setPrice] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    setProduct_name(sellItem.title);
    setPrice(sellItem.price.toString());
    setQuantity(sellItem.quantity.toString());
    setDescription(sellItem.description);
    setTags([
      sellItem.electronics,
      sellItem.fashion,
      sellItem.home_garden,
      sellItem.automotive,
      sellItem.health_beauty,
    ]);
  }, [sellItem]);

  const changeTag = (index: number) => {
    const copy = [...tags];
    if (copy[index]) copy[index] = false;
    else copy[index] = true;
    setTags([...copy]);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          editSellItem(e, id.id);
          setTimeout(getSellItemsTitle, 2000);
        }}
      >
        <div className="flex gap-10 flex-wrap justify-center mt-5">
          <div className="bg-sky-900 p-5 rounded ">
            <h3 className="font-bold text-lg pb-2 border-b-2 mb-2">
              Main Info
            </h3>
            <label htmlFor="product_name">Product name</label>
            <div className="mt-2">
              <input
                id="product_name"
                name="product_name"
                type="text"
                required
                value={product_name ? product_name : ""}
                onChange={(e) => {
                  setProduct_name(e.target.value);
                }}
                className="text-black"
              />
            </div>
            <h3 className="font-bold text-lg pb-2 border-b-2 mb-2 mt-2">
              Category
            </h3>
            <div className="mt-2 flex flex-col ">
              <div>
                <input
                  checked={tags[0] ? true : false}
                  onChange={() => {
                    changeTag(0);
                  }}
                  id="electronics"
                  name="electronics"
                  value="electronics"
                  type="checkbox"
                  className="text-black"
                />
                <label htmlFor="electronics">Electronics</label>
              </div>

              <div>
                <input
                  checked={tags[1] ? true : false}
                  onChange={() => {
                    changeTag(1);
                  }}
                  id="fashion"
                  name="fashion"
                  value="fashion"
                  type="checkbox"
                  className="text-black"
                />
                <label htmlFor="fashion">Fashion</label>
              </div>

              <div>
                <input
                  checked={tags[2] ? true : false}
                  onChange={() => {
                    changeTag(2);
                  }}
                  id="home_garden"
                  name="home_garden"
                  value="home_garden"
                  type="checkbox"
                  className="text-black"
                />
                <label htmlFor="home_garden">Home and garden</label>
              </div>

              <div>
                <input
                  checked={tags[3] ? true : false}
                  onChange={() => {
                    changeTag(3);
                  }}
                  id="automotive"
                  name="automotive"
                  value="automotive"
                  type="checkbox"
                  className="text-black"
                />
                <label htmlFor="automotive">Automotive</label>
              </div>

              <div>
                <input
                  checked={tags[4] ? true : false}
                  onChange={() => {
                    changeTag(4);
                  }}
                  id="health_beauty"
                  name="health_beauty"
                  value="health_beauty"
                  type="checkbox"
                  className="text-black"
                />
                <label htmlFor="health_beauty">Health and beauty</label>
              </div>
            </div>
          </div>
          <div className="bg-sky-900 p-5 rounded">
            <h3 className="font-bold text-lg pb-2 border-b-2 mb-2">
              Price and quantity
            </h3>
            <label htmlFor="price">Price</label>
            <div className="mt-1 mb-2">
              <input
                id="price"
                name="price"
                type="number"
                value={price ? price : ""}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                className="text-black"
              />
            </div>
            <label htmlFor="quantity">Quantity</label>
            <div className="mt-1 mb-2">
              <input
                id="quantity"
                name="quantity"
                type="number"
                value={quantity ? quantity : ""}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                className="text-black"
              />
            </div>
            <label htmlFor="picture">Pictures</label>
            <div className="mt-1 mb-2">
              <input
                id="picture"
                name="picture"
                type="picture"
                // value={product_name ? product_name : ""}
                className="text-black"
              />
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col items-center">
          <div className="bg-sky-900 p-5 rounded flex flex-col">
            <label htmlFor="description">Description</label>
            <textarea
              className="text-black h-40 p-1 sm:w-96"
              name="description"
              value={description ? description : ""}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              id="description"
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col items-center mt-2 gap-3">
          <button type="submit">Save</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </div>
  );
}
