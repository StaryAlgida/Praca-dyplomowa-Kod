import { useContext, useEffect } from "react";
import PhoneSVG from "./svg/PhoneSVG";
import UserProfileContext from "../context/UserProfileContext";

// interface UserInfo

export default function UserProfile() {
  const { getPublicInfo, mainUserInfo, username } =
    useContext(UserProfileContext);

  useEffect(() => {
    getPublicInfo();
  }, []);

  return (
    <section>
      <div className="flex m-10">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="profile picture"
          className="w-40"
        />
        <div className="ml-6 mt-8 text-xl">
          <h1>
            {!mainUserInfo.first_name || !mainUserInfo.last_name
              ? username
              : `${mainUserInfo.first_name} ${mainUserInfo.last_name}`}
          </h1>
          {mainUserInfo.contact_email || mainUserInfo.phone_number ? (
            <h2 className="font-bold">Contanct</h2>
          ) : (
            <></>
          )}
          {mainUserInfo.contact_email ? (
            <p>{mainUserInfo.contact_email}</p>
          ) : (
            <></>
          )}
          {mainUserInfo.phone_number ? (
            <p className="flex">
              {" "}
              <PhoneSVG /> {mainUserInfo.phone_number}{" "}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="ml-10 mr-10 mt-10 grid grid-cols-2 grid-rows-1 gap-3">
        <div className="border-r-2 border-sky-500">Sold</div>
        <div>Bought</div>
      </div>
    </section>
  );
}
