

import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import RootLayout from "../Layouts/RootLayout/RootLayout";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      
    ],
  },
]);
