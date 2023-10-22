import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
  }, []);
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

export default App;
