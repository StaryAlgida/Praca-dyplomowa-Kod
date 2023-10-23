import { useEffect } from "react";
import Header from "./components/Header";
import Section from "./components/Section";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
  }, []);
  return (
    <>
      <Header />
      <Section />
      <Footer />
    </>
  );
}

export default App;
