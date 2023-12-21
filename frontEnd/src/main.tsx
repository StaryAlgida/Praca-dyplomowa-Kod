// import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
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
import Sell from "./components/Sell.tsx";
import SellAdd from "./components/sell/SellAdd.tsx";
import SellEdit from "./components/sell/SellEdit.tsx";
import SellInfo from "./components/sell/SellInfo.tsx";
import { OffersProvider } from "./context/OffersContext.tsx";
import ErrorPage from "./components/errors/ErrorPage.tsx";
import Offer from "./offerts/Offer.tsx";
import Category from "./components/category/Category.tsx";
import ShippingFomr from "./components/Shipping/ShippingForm.tsx";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "*", element: <ErrorPage /> },
      { path: "/error/:code", element: <ErrorPage /> },
      {
        index: true,
        path: "/",
        element: <Navigate to="/1" />,
      },
      {
        path: "/offer/:id",
        element: (
          <OffersProvider>
            <Offer />
          </OffersProvider>
        ),
      },
      {
        path: "/:page",
        element: (
          <OffersProvider>
            <Section />
          </OffersProvider>
        ),
      },
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
        path: "/sell",
        element: (
          <PrivateRoute>
            {/* <UserProfileSellProvider> */}
            <Sell />
            {/* </UserProfileSellProvider> */}
          </PrivateRoute>
        ),
        children: [
          { path: "/sell", element: <SellAdd /> },
          { path: "/sell/edit", element: <SellEdit /> },
          { path: "/sell/info", element: <SellInfo /> },
        ],
      },
      {
        path: "/:category", //!!!!!
      },
      {
        path: "/:category/:page",
        element: (
          <OffersProvider>
            <Category />
          </OffersProvider>
        ),
      },
      {
        path: "/shipping",
        element: (
          <PrivateRoute>
            <UserProfileProvider>
              <OffersProvider>
                <ShippingFomr />
              </OffersProvider>
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
          { path: "/settings", element: <MainInfo /> },
          { path: "/settings/privateinfo", element: <PrivateInfo /> },
          { path: "/settings/changepassword", element: <ChangePassword /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
