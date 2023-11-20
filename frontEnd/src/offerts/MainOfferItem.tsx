import { Offer } from "./OffersInterface";

export default function MainOfferItem({ product }: { product: Offer }) {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <div className="flex gap-2 justify-center">
          <p className="bg-blue-200 px-2 rounded-full">#Electronic</p>
          <p className="bg-blue-200 px-2 rounded-full">#Fashion</p>
          <p className="bg-blue-200 px-2 rounded-full">#...</p>
        </div>

        <img
          // src={'prod.imageSrc'}
          alt={"prod.imageAlt"}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href="#">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {product.company_name ? product.company_name : product.username}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium text-gray-900">{product.price}</p>
          <button className="text-sm font-medium text-gray-900 bg-green-200 p-1 px-3 rounded-full">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
