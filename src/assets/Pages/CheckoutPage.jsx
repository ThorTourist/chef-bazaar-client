import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router";


// Load your Stripe publishable key (pk_test_... from dashboard)
const stripePromise = loadStripe(
  "pk_test_51SddIRAuAgeAOlosPEucMVomoTYDKw6uidpBJO2TCohPCCRp0YjCABL51zvGJVQX0NiB2dsVB9IIZXtJBaqBeIXm00OKFrNhSm"
);

const CheckoutPage = () => {
  const { orderId } = useParams();

  // You can fetch the order details here if needed
  const order = {
    _id: orderId,
    mealName: "Sample Meal",
    price: 20,
    quantity: 1,
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm order={order} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
