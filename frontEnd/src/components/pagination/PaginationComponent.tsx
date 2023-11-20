import Button from "./Button";
import { useContext } from "react";
import OffersContext from "../../context/OffersContext";
import NextButton from "./NextButton";
import PreviousButton from "./PreviousButton";
import { useParams } from "react-router-dom";

export default function PaginationComponent() {
  const { items, pages } = useContext(OffersContext);
  const { page } = useParams();

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">
              {page
                ? parseInt(page) * 12 > items.count
                  ? items.count
                  : parseInt(page) * 12
                : ""}
            </span>{" "}
            of <span className="font-medium">{items.count}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <PreviousButton />
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {/* <Button pagenum={1} />
            <Button pagenum={2} /> */}

            {Array.from({ length: pages }, (_, index) => (
              <Button key={`pag${index + 1}`} pagenum={index + 1} />
            ))}

            <NextButton />
          </nav>
        </div>
      </div>
    </div>
  );
}
