import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export default function RegisterError() {
  const { error } = useContext(AuthContext);
  return (
    <div>
      <p>{error.register}</p>
    </div>
  );
}
