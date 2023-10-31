import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export default function LoginError() {
  const { error } = useContext(AuthContext);

  return (
    <div>
      <p>{error.login}</p>
    </div>
  );
}
