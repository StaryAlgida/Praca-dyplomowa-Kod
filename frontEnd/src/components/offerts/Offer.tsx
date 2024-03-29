import { StarIcon } from "@heroicons/react/20/solid";
import { useContext, useEffect, useState } from "react";
import OffersContext from "../../context/OffersContext";
import { useParams } from "react-router-dom";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Offer() {
  const { item, getOffer, buyOffer } = useContext(OffersContext);
  const { id } = useParams();

  const [amount, setAmount] = useState("");

  useEffect(() => {
    getOffer(id);
  }, []);

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={item.picture}
              alt="Product picture"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="mt-4 lg:mt-0">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {item.title}
              </h1>
            </div>

            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {item.price} PLN
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form
              onSubmit={(e) => buyOffer(id ? id : "", item.price, e)}
              className="mt-10"
            >
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 pl-2">
                  Amount
                </h3>

                <p>
                  {item.quantity === 0 ? (
                    <input
                      className="border-2 border-sky-500 rounded-xl px-3 w-32"
                      max={item.quantity}
                      min={1}
                      value={0}
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                      placeholder="0"
                      disabled
                      type="number"
                      name="amount"
                    />
                  ) : (
                    <input
                      className="border-2 border-sky-500 rounded-xl px-3 w-32"
                      max={item.quantity}
                      min={1}
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                      placeholder="0"
                      required
                      type="number"
                      name="amount"
                    />
                  )}{" "}
                  / {item.quantity}
                </p>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <table className="table-auto">
                  <thead>
                    <tr>
                      <th>
                        <h2>Summary</h2>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Amount: </td>
                      <td className="pl-4">{amount === "" ? 0 : amount}</td>
                    </tr>
                    <tr>
                      <td>Price for one piece: </td>
                      <td className="pl-4">{item.price} PLN</td>
                    </tr>
                    <tr>
                      <td>
                        <h3 className="font-bold text-xl">Totla price:</h3>
                      </td>
                      <td className="pl-4">
                        {Number(item.price) * Number(amount)} PLN
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {item.quantity === 0 ? (
                <button
                  disabled
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-400 px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sold out
                </button>
              ) : (
                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Buy
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          {/* Options */}

          {/*  */}
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="font-bold text-xl">Description</h3>

              <div className="space-y-6 pt-5">
                <p className="text-base text-gray-900">{item.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
