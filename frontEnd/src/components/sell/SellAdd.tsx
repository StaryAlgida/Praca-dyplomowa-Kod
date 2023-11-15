import { useContext } from "react";
import UserProfileSellContext from "../../context/UserProfileSellContext";

export default function SellAdd() {
  const { addItemToSell } = useContext(UserProfileSellContext);
  return (
    <>
      <h2 className="font-bold text-xl">Add offer</h2>
      <form onSubmit={addItemToSell}>
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
                className="text-black"
              />
            </div>
            <h3 className="font-bold text-lg pb-2 border-b-2 mb-2 mt-2">
              Category
            </h3>
            <div className="mt-2 flex flex-col ">
              <div>
                <input
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
                className="text-black"
              />
            </div>
            <label htmlFor="quantity">Quantity</label>
            <div className="mt-1 mb-2">
              <input
                id="quantity"
                name="quantity"
                type="number"
                className="text-black"
              />
            </div>
            <label htmlFor="picture">Pictures</label>
            <div className="mt-1 mb-2">
              <input
                id="picture"
                name="picture"
                type="picture"
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
              id="description"
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col items-center mt-2 gap-3">
          <button type="submit">Save</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </>
  );
}
