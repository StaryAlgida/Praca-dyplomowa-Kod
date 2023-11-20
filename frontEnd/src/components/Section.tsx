// import Login from "./Login";
// import Register from "./Register";

import { useContext, useEffect } from "react";
import MainOffer from "../offerts/MainOffer";
import OffersContext from "../context/OffersContext";
import { useParams } from "react-router-dom";
import PaginationComponent from "./pagination/PaginationComponent";

export default function Section() {
  const { getOffers } = useContext(OffersContext);

  const { page } = useParams();

  useEffect(() => {
    getOffers(page);
  }, [page]);

  return (
    <section className="flex justify-center flex-col">
      <div className="bg-white my-10 rounded-xl">
        <MainOffer title={"Sellers Offers"} />
      </div>
      <PaginationComponent />
    </section>
  );
}
