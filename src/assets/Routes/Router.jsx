import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Home from "../Pages/Home";
import Signup from "../Pages/SignUp";
import Login from "../Pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import AddFood from "../Pages/AddFood";
import MyFood from "../Pages/MyFood";
import AllFoods from "../Pages/AllFoods";
import Details from "../Pages/Details";
import OrderPage from "../Pages/OrderPage";

// ✅ new imports
import Profile from "../Pages/Profile";
import MyReviews from "../Pages/MyReviews";
import OrderRequests from "../Pages/OrderRequests";
import ManageUsers from "../Pages/Admin/ManageUsers";
import ManageRequests from "../Pages/Admin/ManageRequests";
import DashboardLayout from "../Layouts/DashboardLayout";
import CheckoutPage from "../Pages/CheckoutPage";

// ✅ Stripe checkout page


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
      { path: "/allfoods", element: <AllFoods /> },

      {
        path: "/details/:id",
        element: (
          <ProtectedRoute>
            <Details />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addfood",
        element: (
          <ProtectedRoute>
            <AddFood />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myfoods",
        element: (
          <ProtectedRoute>
            <MyFood />
          </ProtectedRoute>
        ),
      },

      // ✅ Direct access to profile/reviews/orderrequests if needed
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myreviews",
        element: (
          <ProtectedRoute>
            <MyReviews />
          </ProtectedRoute>
        ),
      },
      {
        path: "/orderrequests",
        element: (
          <ProtectedRoute>
            <OrderRequests />
          </ProtectedRoute>
        ),
      },

      // ✅ Admin routes
      {
        path: "/admin/users",
        element: (
          <ProtectedRoute>
            <ManageUsers />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/requests",
        element: (
          <ProtectedRoute>
            <ManageRequests />
          </ProtectedRoute>
        ),
      },

      // ✅ Stripe checkout route
      {
        path: "/checkout/:orderId",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // ✅ Dashboard layout with nested routes
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "profile", element: <Profile /> },
      { path: "myreviews", element: <MyReviews /> },
      { path: "orderrequests", element: <OrderRequests /> },
      { path: "myfoods", element: <MyFood /> },
      { path: "addfood", element: <AddFood /> },
      { path: "admin/users", element: <ManageUsers /> },
      { path: "admin/requests", element: <ManageRequests /> },
      // later: { path: "admin/stats", element: <PlatformStats /> }
    ],
  },
]);
