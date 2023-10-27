import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  // useEffect(() => {
  //   console.log(import.meta.env.VITE_API_URL);
  // }, []);

  // const [currentUser, setCurrentUser] = useState();

  return (
    <>
      <AuthProvider>
        <Header />
        <Outlet />
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
