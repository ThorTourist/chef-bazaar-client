import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ order }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    // Step 1: Create payment intent on backend
    const res = await fetch(
      "http://localhost:3000/api/payments/create-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ orderId: order._id }),
      }
    );
    const { clientSecret } = await res.json();

    // Step 2: Confirm payment with Stripe.js
    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card: cardElement },
      }
    );

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    // Step 3: Confirm payment in backend
    await fetch("http://localhost:3000/api/payments/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        orderId: order._id,
        transactionId: paymentIntent.id,
        amount: order.price * order.quantity,
      }),
    });

    setMessage("Payment successful!");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-2 border rounded" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-primary w-full"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </form>
  );
};

export default CheckoutForm;
