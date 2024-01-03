// import Login from "./Login";
// import Register from "./Register";

import { useContext, useEffect } from "react";
import MainOffer from "../offerts/MainOffer";
import OffersContext from "../context/OffersContext";
import { useParams } from "react-router-dom";
import PaginationComponent from "./pagination/PaginationComponent";

export default function Section() {
  const { getOffers, items, pages } = useContext(OffersContext);

  const { page } = useParams();

  useEffect(() => {
    getOffers(page);
  }, [page]);

  return (
    <>
      <div className="bg-white my-10  flex justify-center flex-col">
        <MainOffer title={"Sellers Offers"} items={items} />
      </div>
      <PaginationComponent category={""} items={items} pages={pages} />
    </>
  );
}
