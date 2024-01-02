import { useContext, useEffect } from "react";
import ProfileContext from "../context/ProfileContext";
import PhoneSVG from "./svg/PhoneSVG";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { getPublicInfo, userData } = useContext(ProfileContext);
  const { username } = useParams();

  useEffect(() => {
    if (username) getPublicInfo(username);
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex m-10">
        <img
          src={`${userData.profile_picture}`}
          alt="profile picture"
          className="w-40"
        />
        <div className="ml-6 mt-8 text-xl">
          <h1>
            {!userData.first_name || !userData.last_name
              ? userData.username
              : `${userData.first_name} ${userData.last_name}`}
          </h1>
          {userData.contact_email || userData.phone_number ? (
            <h2 className="font-bold">Contanct</h2>
          ) : (
            <></>
          )}
          {userData.contact_email ? <p>{userData.contact_email}</p> : <></>}
          {userData.phone_number ? (
            <p className="flex">
              {" "}
              <PhoneSVG /> {userData.phone_number}{" "}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
