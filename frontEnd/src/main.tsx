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
            <UserProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
