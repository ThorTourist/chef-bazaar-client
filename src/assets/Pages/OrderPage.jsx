// src/Pages/OrderPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { api } from "../utils/api";

const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    document.title = "Confirm Order | Local Chef Bazaar";
    api.get(`/api/meals/${id}`).then((r) => setMeal(r.data));
  }, [id]);

  if (!meal) return <div className="p-4">Loading...</div>;
  const totalPrice = Number(meal.price) * Number(quantity);

  const confirmOrder = async () => {
    if (!userAddress) return alert("Please enter delivery address");
    const ok = confirm(
      `Your total price is ${totalPrice}. Do you want to confirm the order?`
    );
    if (!ok) return;

    await api.post("/api/orders", {
      foodId: meal._id,
      mealName: meal.foodName,
      price: meal.price,
      quantity,
      chefId: meal.chefId,
      userAddress,
    });
    alert("Order placed successfully!");
    navigate("/myfoods");
  };

  return (
    <div className="p-4">
      <div className="card bg-base-100 shadow p-4">
        <h3 className="text-xl font-bold mb-3">Confirm your order</h3>
        <div>
          <strong>Meal:</strong> {meal.foodName}
        </div>
        <div>
          <strong>Price:</strong> {meal.price}
        </div>
        <div className="mt-2 flex gap-2 items-center">
          <label className="font-semibold">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="input input-bordered w-24"
          />
        </div>
        <div className="mt-2">
          <label className="font-semibold">Delivery address</label>
          <input
            type="text"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            className="input input-bordered w-full"
            placeholder="House, Road, Area, City"
          />
        </div>
        <div className="mt-3">
          <strong>Total:</strong> {totalPrice}
        </div>
        <button className="btn btn-primary mt-3" onClick={confirmOrder}>
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
