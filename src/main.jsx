import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./assets/Routes/Router.jsx";
import { RouterProvider } from "react-router/dom";
import AuthProvider from "./assets/Context/AuthContext.jsx";

// Stripe setup
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51SddIRAuAgeAOlosPEucMVomoTYDKw6uidpBJO2TCohPCCRp0YjCABL51zvGJVQX0NiB2dsVB9IIZXtJBaqBeIXm00OKFrNhSm"
); // your publishable key

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
      </Elements>
    </AuthProvider>
  </StrictMode>
);
