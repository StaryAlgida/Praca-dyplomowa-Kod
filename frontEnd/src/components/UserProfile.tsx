import PhoneSVG from "./svg/PhoneSVG";

export default function UserProfile() {
  return (
    <section>
      <div className="flex m-10">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="profile picture"
          className="w-40"
        />
        <div className="ml-6 mt-8 text-xl">
          <h1>Imie Nazwisko</h1>
          <h2 className="font-bold">Contanct</h2>
          <p>e@mail.com</p>
          <p className="flex">
            <PhoneSVG /> +45 555 455 555
          </p>
        </div>
      </div>
      <div className="ml-10 mr-10 mt-10 grid grid-cols-2 grid-rows-1 gap-3">
        <div className="border-r-2 border-sky-500">Sold</div>
        <div>Bought</div>
      </div>
    </section>
  );
}
