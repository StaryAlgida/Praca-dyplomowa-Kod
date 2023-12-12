import { Link, useParams } from "react-router-dom";

export default function Button({
  pagenum,
  category = "",
}: {
  pagenum: number;
  category: string;
}) {
  const def =
    "relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex";
  const clicked =
    "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
  const { page } = useParams();

  return (
    <Link
      to={`${category}/${pagenum}`}
      aria-current="page"
      className={page ? (parseInt(page) === pagenum ? clicked : def) : ""}
    >
      {pagenum}
    </Link>
  );
}
