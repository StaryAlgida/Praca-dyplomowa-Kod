import { useParams } from "react-router-dom";
import PaginationComponent from "../pagination/PaginationComponent";
import MainOffer from "../../offerts/MainOffer";
import { useContext, useEffect } from "react";
import OffersContext from "../../context/OffersContext";

export default function Category() {
  const { category, page } = useParams();
  const { offersCategory } = useContext(OffersContext);

  useEffect(() => {
    if (category && page) offersCategory(category, page);
  }, [category, page]);

  return (
    <>
      <div className="bg-white my-10  flex justify-center flex-col">
        <MainOffer title={category ? category : ""} />
      </div>
      <PaginationComponent category={category ? `/${category}` : ""} />
    </>
  );
}
