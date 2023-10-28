import { Link } from "react-router-dom";

export default function NotLogged() {
  return (
    <>
      <Link to="/login">
        <button className="px-2 py-1 font-medium text-sm mr-3 bg-white rounded hover:bg-gray-200">
          Login
        </button>
      </Link>
      <Link to="/register">
        <button className="px-2 py-1 font-medium bg-indigo-500 text-gray-300 text-sm rounded hover:bg-indigo-600">
          Singin
        </button>
      </Link>
    </>
  );
}
