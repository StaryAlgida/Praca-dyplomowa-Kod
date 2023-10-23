import { useEffect } from "react";
import Header from "./components/Header";

function App() {
  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
  }, []);
  return (
    <>
      <Header />
      {/* <TestComponent /> */}
    </>
  );
}

export default App;
