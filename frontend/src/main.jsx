import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

//custom
import Register from "../components/Register.jsx";
import Login from "../components/Login.jsx";

//built in
import { createBrowserRouter, RouterProvider } from "react-router-dom";
let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
