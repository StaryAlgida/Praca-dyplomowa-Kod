import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserProfileProvider } from "./context/UserProfileContext";

function App() {
  return (
    <>
      <AuthProvider>
        <UserProfileProvider>
          <Header />
        </UserProfileProvider>
        <Outlet />
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
