import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";

export default function PreviousButton() {
  const { page } = useParams();
  return (
    <Link
      to={
        page
          ? parseInt(page) - 1 !== 0
            ? `/${parseInt(page) - 1}`
            : `/${page}`
          : ""
      }
      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
    >
      <span className="sr-only">Previous</span>
      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
    </Link>
  );
}
