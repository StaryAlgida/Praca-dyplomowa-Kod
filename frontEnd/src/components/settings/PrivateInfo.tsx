export default function PrivateInfo() {
  return (
    <div className="bg-gray-800 text-white p-3 mx-10 mb-10 rounded-lg shadow-2xl">
      <form>
        <h2 className="font-bold text-xl">Change login details</h2>
        <div className="flex gap-10 flex-wrap justify-center mt-5">
          <div className="bg-sky-900 p-5 rounded ">
            <h3 className="font-bold text-lg pb-2 border-b-2 mb-2">
              Login Data
            </h3>
            <label htmlFor="login_email">E-mail</label>
            <div className="mt-2">
              <input
                id="login_email"
                name="login_email"
                type="email"
                autoComplete="email"
                className="text-black"
              />
            </div>
            <label htmlFor="username">User name</label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                className="text-black"
              />
            </div>
            <h3 className="font-bold text-lg pb-2 border-b-2 mb-2 mt-3">
              To confirm changes
            </h3>
            <label htmlFor="password">Password</label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                required
                autoComplete="current-passowrd"
                type="password"
                className="text-black"
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
