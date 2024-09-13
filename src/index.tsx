import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
// import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/themes/vela-blue/theme.css";
import "/node_modules/primeflex/primeflex.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import "primeicons/primeicons.css";
import Profile from "./pages/Profile/Profile";
import Transfer from "./pages/Transfer/Transfer";
import TechnicalSupport from "./pages/TechnicalSupport/TechnicalSupport";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/inicio",
    element: <Home />,
  },
  {
    path: "/transfer",
    element: <Transfer />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/support",
    element: <TechnicalSupport />,
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
