import { useEffect, useState } from "react";
import { Offer } from "../interfaces/OffersInterface";
import { v1 as uuidv1 } from "uuid";
import Tags from "./Tags";
import { Link } from "react-router-dom";

type NestedArray = [string, unknown, string];
type ArrayOfNestedArrays = NestedArray[];

export default function MainOfferItem({ product }: { product: Offer }) {
  const [data, setData] = useState<[string, unknown, string][]>([]);

  const addId = () => {
    const copy = Object.entries(product);
    const copy2: ArrayOfNestedArrays = [["", false, ""]];
    for (let i = 0; i < 10; i++) {
      switch (copy[i][0]) {
        case "electronics":
          copy2.push([...copy[i], uuidv1()]);
          break;
        case "fashion":
          copy2.push([...copy[i], uuidv1()]);
          break;
        case "home_garden":
          copy2.push([...copy[i], uuidv1()]);
          break;
        case "automotive":
          copy2.push([...copy[i], uuidv1()]);
          break;
        case "health_beauty":
          copy2.push([...copy[i], uuidv1()]);
          break;
        default:
          break;
      }
      setData([...copy2]);
    }
  };
  useEffect(() => {
    addId();
  }, []);

  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <div className="flex gap-2 justify-center py-1">
          {data.map((item) => {
            return <Tags key={item[2]} item={item} />;
          })}
        </div>

        <img
          src={product.picture}
          alt={"prod.imageAlt"}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to={`/offer/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {product.company_name ? product.company_name : product.username}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium text-gray-900">
            {product.price} PLN
          </p>
          <button className="text-sm font-medium text-gray-900 bg-green-200 p-1 px-3 rounded-full">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
