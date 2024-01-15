import { useContext, useEffect } from "react";
import PhoneSVG from "./svg/PhoneSVG";
import UserProfileContext from "../context/UserProfileContext";
import { Link } from "react-router-dom";

// interface UserInfo

export default function UserProfile() {
  const {
    getPublicInfo,
    getSellHistory,
    getBuyHistory,
    mainUserInfo,
    username,
    sellHistory,
    buyHistory,
  } = useContext(UserProfileContext);

  useEffect(() => {
    getPublicInfo();
    getSellHistory();
    getBuyHistory();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex m-10">
        <img
          src={`http://127.0.0.1:8000${mainUserInfo.profile_picture}`}
          alt="profile picture"
          className="w-40"
        />
        <div className="ml-6 mt-8 text-xl">
          <h1>
            {!mainUserInfo.first_name || !mainUserInfo.last_name
              ? username
              : `${mainUserInfo.first_name} ${mainUserInfo.last_name}`}
          </h1>
          {mainUserInfo.contact_email || mainUserInfo.phone_number ? (
            <h2 className="font-bold">Contanct</h2>
          ) : (
            <></>
          )}
          {mainUserInfo.contact_email ? (
            <p>{mainUserInfo.contact_email}</p>
          ) : (
            <></>
          )}
          {mainUserInfo.phone_number ? (
            <p className="flex">
              {" "}
              <PhoneSVG /> {mainUserInfo.phone_number}{" "}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="mt-10 mb-10 flex flex-col 2xl:grid  2xl:grid-cols-2 2xl:grid-rows-1 gap-5">
        <div>
          <h2 className="font-semibold text-2xl">Sold</h2>
          <table className="border-collapse table-auto w-full text-sm mt-3">
            <thead className="bg-slate-600">
              <tr>
                <th className="font-semibold border-b dark:border-slate-300 p-4 pl-8 pt-0 pb-3 text-white text-left">
                  Product
                </th>
                <th className="font-semibold border-b dark:border-slate-300 p-4 pl-8 pt-0 pb-3 text-white text-left">
                  Quantity
                </th>
                <th className="font-semibold border-b dark:border-slate-300 p-4 pl-8 pt-0 pb-3 text-white  text-left">
                  Price
                </th>
                <th className="font-semibold border-b dark:border-slate-300 p-4 pl-8 pt-0 pb-3 text-white  text-left">
                  Total
                </th>
                <th className="font-semibold border-b dark:border-slate-300 p-4 pl-8 pt-0 pb-3 text-white  text-left">
                  Date
                </th>
                <th className="font-semibold border-b dark:border-slate-300 p-4 pl-8 pt-0 pb-3 text-white  text-left">
                  Buyer
                </th>
                <th className="font-semibold border-b dark:border-slate-300 p-4 pl-8 pt-0 pb-3 text-white  text-left">
                  Shipping
                </th>
              </tr>
            </thead>
            <tbody className="dark:bg-slate-800">
              {sellHistory.results.map((e) => {
                return (
                  <tr key={e.shipping_id}>
                    <td className="border-b border-slate-700 p-4 pl-8 hover:text-amber-400 hover:font-semibold transition ease-in-out text-slate-200 ">
                      <Link to={`/offer/${e.item_id}`}>{e.title}</Link>
                    </td>
                    <td className="border-b border-slate-700 p-4 pl-8 text-slate-200">
                      {e.quantity}
                    </td>
                    <td className="border-b border-slate-700 p-4 pl-8 text-slate-200">
                      {e.price} PLN
                    </td>
                    <td className="border-b border-slate-700 p-4 pl-8 text-slate-200">
                      {e.price * e.quantity} PLN
                    </td>
                    <td className="border-b border-slate-700 p-4 pl-8 text-slate-200">
                      {e.date.split("T")[0]}
                    </td>
                    <td className="border-b border-slate-700 p-4 pl-8 text-slate-200 hover:text-amber-400 hover:font-semibold transition ease-in-out">
                      {"buyer_name" in e ? (
                        <Link to={`/profile/${e.buyer_name}/1`}>
                          {e.buyer_name}
                        </Link>
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="border-b border-slate-700 p-4 pl-8 text-slate-200">
                      {e.shipping_id}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          <h2 className="font-semibold text-2xl">Bought</h2>
          <table className="border-collapse table-auto w-full text-sm mt-3">
            <thead className="bg-slate-600">
              <tr>
                <th className="font-semibold border-b dark:border-slate-300 p-4 pl-8 pt-0 pb-3 text-white text-left">
                  Product
                </th>
                <th className="font-semibold border-b dark:border-slate-300 p-4 pl-8 pt-0 pb-3 text-white text-left">
                  Quantity
                </th>
                <th className="font-semibold border-b dark:border-slate-300 p-4 pl-8 pt-0 pb-3 text-white text-left">
                  Price
                </th>
                <th className="font-semibold border-b dark:border-slate-300 p-4 pl-8 pt-0 pb-3 text-white text-left">
                  Total
                </th>
                <th className="font-semibold border-b dark:border-slate-300 p-4 pl-8 pt-0 pb-3 text-white text-left">
                  Date
                </th>
                <th className="font-semibold border-b dark:border-slate-300 p-4 pl-8 pt-0 pb-3 text-white text-left">
                  Seller
                </th>
                <th className="font-semibold border-b dark:border-slate-300 p-4 pl-8 pt-0 pb-3 text-white text-left">
                  Shipping
                </th>
              </tr>
            </thead>
            <tbody className="dark:bg-slate-800">
              {buyHistory.results.map((e) => {
                return (
                  <tr key={e.shipping_id}>
                    <td className="border-b border-slate-700 p-4 pl-8 hover:text-amber-400 hover:font-semibold transition ease-in-out text-slate-200">
                      <Link to={`/offer/${e.item_id}`}>{e.title}</Link>
                    </td>
                    <td className="border-b border-slate-700 p-4 pl-8 text-slate-200">
                      {e.quantity}
                    </td>
                    <td className="border-b border-slate-700 p-4 pl-8 text-slate-200">
                      {e.price} PLN
                    </td>
                    <td className="border-b border-slate-700 p-4 pl-8 text-slate-200">
                      {e.price * e.quantity} PLN
                    </td>
                    <td className="border-b border-slate-700 p-4 pl-8 text-slate-200">
                      {e.date.split("T")[0]}
                    </td>
                    <td className="border-b border-slate-700 p-4 pl-8 text-slate-200 hover:text-amber-400 hover:font-semibold transition ease-in-out">
                      {"seller_name" in e ? (
                        <Link to={`/profile/${e.seller_name}/1`}>
                          {e.seller_name}
                        </Link>
                      ) : (
                        "Error"
                      )}
                    </td>
                    <td className="border-b  border-slate-700 p-4 pl-8 text-slate-200">
                      {e.shipping_id}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
