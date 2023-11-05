import { Link, Outlet } from "react-router-dom";
import { UserProfileProvider } from "../context/UserProfileContext";
import { useState } from "react";

export default function Settings() {
  const [buttons, setButtons] = useState<boolean[]>([true, false, false]);
  const clicked = "hover:bg-slate-500 p-1 bg-grey";
  const noClicked = "hover:bg-slate-500 p-1";

  function buttonClick(num: number): void {
    if (!buttons[num]) {
      const buttonsCopy = [...buttons];
      buttons.fill(false);
      buttons[num] = true;
      setButtons(buttonsCopy);
      console.log("Zmienia kolor: ", buttons);
    }
  }

  return (
    <section>
      <div className="flex gap-3 mx-10 mt-10 pb-2">
        <Link
          to="/settings/publicinfo"
          onClick={() => buttonClick(0)}
          className={buttons[0] ? clicked : noClicked}
        >
          Publick Info
        </Link>
        <Link
          to="/settings/privateinfo"
          onClick={() => buttonClick(1)}
          className={buttons[1] ? clicked : noClicked}
        >
          Private Info
        </Link>
        <Link
          to="/settings/changepassword"
          onClick={() => buttonClick(2)}
          className={buttons[2] ? clicked : noClicked}
        >
          Change password
        </Link>
      </div>
      <UserProfileProvider>
        <Outlet />
      </UserProfileProvider>
    </section>
  );
}
