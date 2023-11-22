import { useContext, useEffect, useState } from "react";
import UserProfileContext from "../../context/UserProfileContext";

export default function MainInfo() {
  const { resetError, publickInfoUpdate, getPublicInfoForm, mainUserInfo } =
    useContext(UserProfileContext);

  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [company, setCompany] = useState<string | null>(null);
  const [first, setFirst] = useState<string | null>(null);
  const [last, setLast] = useState<string | null>(null);

  useEffect(() => {
    getPublicInfoForm();
    resetError();
  }, []);

  useEffect(() => {
    setEmail(mainUserInfo.contact_email);
    setPhone(mainUserInfo.phone_number);
    setCompany(mainUserInfo.company_name);
    setFirst(mainUserInfo.first_name);
    setLast(mainUserInfo.last_name);
    console.log(mainUserInfo);
  }, [mainUserInfo]);

  return (
    <div className="bg-gray-800 text-white p-3 mx-10 mb-10 rounded-lg shadow-2xl">
      <form onSubmit={publickInfoUpdate} encType="multipart/form-data">
        <h2 className="font-bold text-xl">Change account details</h2>
        <div className="flex gap-10 flex-wrap justify-center mt-5">
          <div className="bg-sky-900 p-5 rounded ">
            <h3 className="font-bold text-lg pb-2 border-b-2 mb-2">
              Contact data
            </h3>
            <label htmlFor="contact_email">Contact email</label>
            <div className="mt-2">
              <input
                id="contact_email"
                name="contact_email"
                type="email"
                value={email ? email : ""}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoComplete="email"
                className="text-black"
              />
            </div>
            <label htmlFor="phone_number">Phone number</label>
            <div className="mt-2">
              <input
                id="phone_number"
                name="phone_number"
                type="phone"
                className="text-black"
                value={phone ? phone : ""}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="bg-sky-900 p-5 rounded">
            <h3 className="font-bold text-lg pb-2 border-b-2 mb-2">
              Seller details
            </h3>
            <label htmlFor="company_name">Company name</label>
            <div className="mt-2">
              <input
                id="company_name"
                name="company_name"
                type="text"
                className="text-black"
                value={company ? company : ""}
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
              />
            </div>
            <label htmlFor="first_name">First name</label>
            <div className="mt-2">
              <input
                id="first_name"
                name="first_name"
                type="text"
                className="text-black"
                value={first ? first : ""}
                onChange={(e) => {
                  setFirst(e.target.value);
                }}
              />
            </div>
            <label htmlFor="last_name">Last name</label>
            <div className="mt-2">
              <input
                id="last_name"
                name="last_name"
                type="text"
                className="text-black"
                value={last ? last : ""}
                onChange={(e) => {
                  setLast(e.target.value);
                }}
              />
            </div>
            <label htmlFor="profile_picture">Profile picture</label>
            <div className="mt-2">
              <input
                id="profile_picture"
                name="profile_picture"
                type="file"
                accept="image/*"
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
