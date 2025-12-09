import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Home from "../Pages/Home";
import Signup from "../Pages/SignUp";
import Login from "../Pages/Login";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      {
        path: "/addfood",
        element: (
          <ProtectedRoute>
            {/* <AddFood /> */}
          </ProtectedRoute>
        ),
      },
      {
        path: "/myfoods",
        element: (
          <ProtectedRoute>
            {/* <MyFood /> */}
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
