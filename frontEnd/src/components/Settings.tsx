import { Link, Outlet } from "react-router-dom";

export default function Settings() {
  return (
    <section>
      <div className="flex gap-3 mx-10 mt-10 pb-2">
        <Link to="/settings/publicinfo" className="hover:bg-slate-500 p-1">
          Publick Info
        </Link>
        <Link to="/settings/privateinfo" className="hover:bg-slate-500 p-1">
          Private Info
        </Link>
        <Link to="/settings/changepassword" className="hover:bg-slate-500 p-1">
          Change password
        </Link>
      </div>
      <Outlet />
    </section>
  );
}
