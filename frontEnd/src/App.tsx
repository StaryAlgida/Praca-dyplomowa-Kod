import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
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
