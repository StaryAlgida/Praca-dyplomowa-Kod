import { useContext, useEffect, useState } from "react";
import UserProfileSellContext from "../../context/UserProfileSellContext";
import SellEditForm from "./SellEditForm";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { TitleId } from "./Interfaces";

export default function SellEdit() {
  const { getSellItemInfo, getSellItemsTitle, titles } = useContext(
    UserProfileSellContext
  );
  const [openFomr, setOpenForm] = useState(
    [...Array(Object.values(titles).length)].map(() => false)
  );

  useEffect(() => {
    getSellItemsTitle();
  }, []);

  const openForm = (index: number, id: number) => {
    const copy = [...openFomr];
    if (copy[index]) copy[index] = false;
    else {
      copy.fill(false);
      copy[index] = true;
      getSellItemInfo(id);
    }
    setOpenForm([...copy]);
  };

  return (
    <>
      <h2 className="font-bold text-xl">Edit offer</h2>
      <div className="mt-3 border-t-4">
        {Object.values(titles).map((t: TitleId, index) => {
          return (
            <div className="mb-2 mt-2 border-b-2 border-gray-500" key={index}>
              <div className="grid grid-cols-2">
                <p className="ml-5">{t.title}</p>
                <div className="flex gap-5 mb-1">
                  <button
                    onClick={() => {
                      openForm(index, t.id);
                    }}
                    className=" flex gap-1 font-bold px-4 py-1 rounded bg-green-500 hover:bg-green-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                  >
                    Edit
                    {openFomr[index] ? (
                      <ChevronUpIcon
                        className="mt-1 h-5 w-5 text-white font"
                        aria-hidden="true"
                      />
                    ) : (
                      <ChevronDownIcon
                        className="mt-1 h-5 w-5 text-white font"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                  <button className="font-bold px-4 py-1 rounded bg-red-500 hover:bg-red-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                    Delete
                  </button>
                </div>
              </div>
              {openFomr[index] ? <SellEditForm id={t.id} /> : <></>}
            </div>
          );
        })}
      </div>
    </>
  );
}
