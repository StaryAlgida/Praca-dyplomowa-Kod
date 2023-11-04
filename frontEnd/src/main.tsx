// import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import Section from "./components/Section.tsx";
import UserProfile from "./components/UserProfile.tsx";
import PrivateRoute from "./utils/PrivateRoute.tsx";
import PrivateRouteLogged from "./utils/PrivateRouterLogged.tsx";
import Settings from "./components/Settings.tsx";
import PrivateInfo from "./components/settings/PrivateInfo.tsx";
import MainInfo from "./components/settings/MainInfo.tsx";
import ChangePassword from "./components/settings/ChangePassword.tsx";
import { UserProfileProvider } from "./context/UserProfileContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Section /> },
      {
        path: "/login",
        element: (
          <PrivateRouteLogged>
            <Login />
          </PrivateRouteLogged>
        ),
      },
      {
        path: "/register",
        element: (
          <PrivateRouteLogged>
            <Register />
          </PrivateRouteLogged>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <UserProfileProvider>
              <UserProfile />
            </UserProfileProvider>
          </PrivateRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        ),
        children: [
          { path: "/settings/privateinfo", element: <PrivateInfo /> },
          { path: "/settings/publicinfo", element: <MainInfo /> },
          { path: "/settings/changepassword", element: <ChangePassword /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
