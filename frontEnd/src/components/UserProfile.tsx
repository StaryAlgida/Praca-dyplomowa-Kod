import { useContext, useEffect } from "react";
import PhoneSVG from "./svg/PhoneSVG";
import UserProfileContext from "../context/UserProfileContext";

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
    <section>
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
      <div className="ml-10 mr-10 mt-10 grid grid-cols-2 grid-rows-1 gap-3">
        <div className="border-r-2 border-sky-500">
          <h2 className="font-semibold text-2xl">Sold</h2>
          <table className="table-auto">
            <thead>
              <tr>
                <th>Product name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {sellHistory.results.map((e) => {
                return (
                  <tr key={e.shipping_id}>
                    <td>{e.title}</td>
                    <td>{e.quantity}</td>
                    <td>{e.price}</td>
                    <td>{parseFloat(e.price) * parseInt(e.quantity)}</td>
                    <td>{e.date}</td>
                  </tr>
                );
              })}
              {/* <tr>
                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td>Malcolm Lockyer</td>
                <td>1961</td>
              </tr>
              <tr>
                <td>Witchy Woman</td>
                <td>The Eagles</td>
                <td>1972</td>
              </tr>
              <tr>
                <td>Shining Star</td>
                <td>Earth, Wind, and Fire</td>
                <td>1975</td>
              </tr> */}
            </tbody>
          </table>
        </div>
        <div>
          <h2 className="font-semibold text-2xl">Bought</h2>
          <table className="table-auto">
            <thead>
              <tr>
                <th>Product name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Date</th>
                <th>Buyer</th>
                <th>Shipping</th>
              </tr>
            </thead>
            <tbody>
              {buyHistory.results.map((e) => {
                return (
                  <tr key={e.shipping_id}>
                    <td>{e.title}</td>
                    <td>{e.quantity}</td>
                    <td>{e.price}</td>
                    <td>{parseFloat(e.price) * parseInt(e.quantity)}</td>
                    <td>{e.date}</td>
                    <td>buyer: {}</td>
                    <td>shipping: {e.shipping_id}</td>
                  </tr>
                );
              })}
              {/* <tr>
                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td>Malcolm Lockyer</td>
                <td>1961</td>
              </tr>
              <tr>
                <td>Witchy Woman</td>
                <td>The Eagles</td>
                <td>1972</td>
              </tr>
              <tr>
                <td>Shining Star</td>
                <td>Earth, Wind, and Fire</td>
                <td>1975</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
