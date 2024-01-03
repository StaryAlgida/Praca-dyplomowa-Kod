import MainOfferItem from "./MainOfferItem";
import { Offers } from "../interfaces/OffersInterface";

interface OfferProps {
  title: string;
  items: Offers;
}

export default function MainOffer({ title, items }: OfferProps): JSX.Element {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        {title}
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {items.results.map((product) => (
          <MainOfferItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
