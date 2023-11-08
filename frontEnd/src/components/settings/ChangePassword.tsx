import { useContext, useEffect } from "react";
import UserProfileContext from "../../context/UserProfileContext";

export default function ChangePassword() {
  const { resetError, changePassword, error } = useContext(UserProfileContext);

  useEffect(() => {
    resetError();
  }, []);

  const okClass = "text-black";
  const errorClass = "text-black border-2 border-rose-500";
  return (
    <div className="bg-gray-800 text-white p-3 mx-10 mb-10 rounded-lg shadow-2xl">
      <form onSubmit={changePassword}>
        <h2 className="font-bold text-xl">Change account password</h2>
        {error.error ? <p className="text-red-700">{error.error}</p> : <></>}
        <div className="flex gap-10 flex-wrap justify-center mt-5">
          <div className="bg-sky-900 p-5 rounded ">
            <h3 className="font-bold text-lg pb-2 border-b-2 mb-2">
              New password
            </h3>
            <label htmlFor="old_password">Old password *</label>
            <div className="mt-2 mb-2">
              <input
                id="old_password"
                name="old_password"
                type="password"
                required
                autoComplete="current-password"
                className={
                  error.id.includes(0) || error.id.includes(-2)
                    ? errorClass
                    : okClass
                }
              />
            </div>
            <label htmlFor="new_passowrd">New password *</label>
            <div className="mt-2 mb-2">
              <input
                id="new_passowrd"
                name="new_passowrd"
                type="password"
                required
                className={
                  error.id.includes(1) || error.id.includes(-1)
                    ? errorClass
                    : okClass
                }
              />
            </div>
            <label htmlFor="repeat_passowrd">Repeat new password *</label>
            <div className="mt-2">
              <input
                id="repeat_passowrd"
                name="repeat_passowrd"
                required
                type="password"
                className={
                  error.id.includes(2) || error.id.includes(-1)
                    ? errorClass
                    : okClass
                }
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button type="submit">Save</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </div>
  );
}
