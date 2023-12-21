import { useContext, useEffect, useState } from "react";
import UserProfileContext from "../../context/UserProfileContext";
import OffersContext from "../../context/OffersContext";

export default function ShippingFomr() {
  const { getPublicInfo, mainUserInfo } = useContext(UserProfileContext);
  const { shippingFormSend, itemData } = useContext(OffersContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    houseNumber: "",
  });

  useEffect(() => {
    getPublicInfo();
  }, []);

  useEffect(() => {
    console.log("item data shipping: ", itemData);
  }, [itemData]);

  useEffect(() => {
    const copy = { ...data };
    copy.firstName = mainUserInfo.first_name;
    copy.lastName = mainUserInfo.last_name;
    copy.phone = mainUserInfo.phone_number;

    setData({ ...copy });
  }, [mainUserInfo]);

  return (
    <div className="flex justify-center">
      <form
        onSubmit={shippingFormSend}
        className="bg-white w-500 px-5 py-5 my-8 rounded-2xl shadow-2xl"
      >
        <div className="space-y-12 ">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Shipping info
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Where you want to deliver the parcel.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={data.firstName}
                    onChange={(e) =>
                      setData({ ...data, firstName: e.target.value })
                    }
                    name="first_name"
                    id="first-name"
                    autoComplete="given-name"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={data.lastName}
                    onChange={(e) =>
                      setData({ ...data, lastName: e.target.value })
                    }
                    name="last_name"
                    id="last-name"
                    autoComplete="family-name"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone number
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    value={data.phone}
                    onChange={(e) =>
                      setData({ ...data, phone: e.target.value })
                    }
                    name="phone_number"
                    type="phone"
                    autoComplete="phone"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="PL">Poland</option>
                    <option value="EN">England</option>
                    <option value="USA">USA</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={data.street}
                    onChange={(e) =>
                      setData({ ...data, street: e.target.value })
                    }
                    name="street_address"
                    id="street-address"
                    autoComplete="street-address"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={data.city}
                    onChange={(e) => setData({ ...data, city: e.target.value })}
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={data.state}
                    onChange={(e) =>
                      setData({ ...data, state: e.target.value })
                    }
                    name="region"
                    id="region"
                    autoComplete="address-level1"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={data.zip}
                    onChange={(e) => setData({ ...data, zip: e.target.value })}
                    name="zip_code"
                    id="postal-code"
                    autoComplete="postal-code"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="house_number"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  House / premises number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={data.houseNumber}
                    onChange={(e) =>
                      setData({ ...data, houseNumber: e.target.value })
                    }
                    name="house_premises_num"
                    id="house_number"
                    autoComplete="house_number"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="mt-6 flex items-center justify-start gap-x-6">
          <p>Total price: </p>
        </div> */}
        <div className="mt-3 flex items-center  justify-between">
          <p className="">
            Total price: {parseInt(itemData.price) * parseInt(itemData.amount)}{" "}
            PLN
          </p>
          <div className="flex gap-x-4">
            <button
              type="reset"
              className="text-sm px-2 py-2 rounded-md font-semibold leading-6 text-gray-900 transition duration-300 hover:bg-slate-800 hover:text-white"
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Buy
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
