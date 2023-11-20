import { Link, Outlet } from "react-router-dom";
import { UserProfileSellProvider } from "../context/UserProfileSellContext";

export default function Sell() {
  return (
    <section>
      <div className="mx-20 flex gap-10 mt-10">
        <Link to="/sell">Add</Link>
        <Link to="/sell/edit">Edit</Link>
        <Link to="/sell/info">Info</Link>
      </div>
      <div className="  bg-gray-800 text-white p-3 mx-20 mb-10 rounded-lg shadow-2xl">
        {/* <h2 className="font-bold text-xl">Change account details</h2>
      <div className="grid grid-cols-2 gap-20">
        <SellEditElements />
        <SellForm />
      </div> */}
        <UserProfileSellProvider>
          <Outlet />
        </UserProfileSellProvider>
      </div>
    </section>
  );
}
