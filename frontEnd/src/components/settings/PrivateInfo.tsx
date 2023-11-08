import { useContext, useEffect, useState } from "react";
import UserProfileContext from "../../context/UserProfileContext";

export default function PrivateInfo() {
  const {
    resetError,
    getPrivateInfo,
    resetPrivateInfo,
    error,
    userPrivateIfno,
  } = useContext(UserProfileContext);

  const [email, setEmail] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    getPrivateInfo();
    resetError();
  }, []);

  useEffect(() => {
    setEmail(userPrivateIfno.email);
    setUser(userPrivateIfno.username);
  }, [userPrivateIfno]);

  const okClass = "text-black";
  const errorClass = "text-black border-2 border-rose-500";

  return (
    <div className="bg-gray-800 text-white p-3 mx-10 mb-10 rounded-lg shadow-2xl">
      <form onSubmit={resetPrivateInfo}>
        <h2 className="font-bold text-xl">Change login details</h2>
        {error.error ? <p className="text-red-700">{error.error}</p> : <></>}
        <div className="flex gap-10 flex-wrap justify-center mt-5">
          <div className="bg-sky-900 p-5 rounded ">
            <h3 className="font-bold text-lg pb-2 border-b-2 mb-2">
              Login Data
            </h3>
            <label htmlFor="login_email">E-mail *</label>
            <div className="mt-2">
              <input
                id="login_email"
                name="login_email"
                type="email"
                autoComplete="email"
                required
                className={
                  error.id.includes(0) || error.id.includes(-1)
                    ? errorClass
                    : okClass
                }
                value={email ? email : ""}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <label htmlFor="username">User name *</label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                className={
                  error.id.includes(1) || error.id.includes(-1)
                    ? errorClass
                    : okClass
                }
                value={user ? user : ""}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            <h3 className="font-bold text-lg pb-2 border-b-2 mb-2 mt-3">
              To confirm changes
            </h3>
            <label htmlFor="password">Password *</label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                required
                autoComplete="current-passowrd"
                type="password"
                className={
                  error.id.includes(2) || error.id.includes(-2)
                    ? errorClass
                    : okClass
                }
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button type="submit">Save</button>
          <button
            type="reset"
            onClick={() => {
              setEmail("");
              setUser("");
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
