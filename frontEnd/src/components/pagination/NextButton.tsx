import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";

interface NextButtonProps {
  category: string;
  pages: number;
}

export default function NextButton({
  category,
  pages,
}: NextButtonProps): JSX.Element {
  const { page } = useParams();
  return (
    <Link
      to={
        page
          ? parseInt(page) + 1 <= pages
            ? `${category}/${parseInt(page) + 1}`
            : `${category}/${page}`
          : ""
      }
      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
    >
      <span className="sr-only">Next</span>
      <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
    </Link>
  );
}
