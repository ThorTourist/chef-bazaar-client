import React, { useEffect, useState } from "react";
import { api } from "../utils/api";

const MyFood = () => {
  const [me, setMe] = useState(null);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    document.title = "My Foods";

    api.get("/api/auth/me").then((r) => setMe(r.data));

    api.get("/api/orders/my").then((r) => {
      const data = r.data;
      setOrders(Array.isArray(data) ? data : []);
    });

    api.get("/api/favorites").then((r) => {
      const data = r.data;
      setFavorites(Array.isArray(data) ? data : []);
    });
  }, []);

  const removeFav = async (id) => {
    await api.delete(`/api/favorites/${id}`);
    const updated = await api.get("/api/favorites");
    setFavorites(Array.isArray(updated.data) ? updated.data : []);
    alert("Meal removed from favorites successfully.");
  };

  if (!me) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold">My Orders</h3>
      <div className="grid md:grid-cols-3 gap-4 mt-2">
        {Array.isArray(orders) &&
          orders.map((o) => (
            <div key={o._id} className="card bg-base-100 shadow p-4">
              <div>Meal: {o.mealName}</div>
              <div>Status: {o.orderStatus}</div>
              <div>Price: {o.price}</div>
              <div>Qty: {o.quantity}</div>
              <div>Chef: {o.chefId}</div>
              <div>Payment: {o.paymentStatus}</div>
              {o.orderStatus === "accepted" &&
                o.paymentStatus === "Pending" && (
                  <button
                    className="btn btn-sm btn-primary mt-2"
                    onClick={() => alert("Redirect to Stripe (to implement)")}
                  >
                    Pay
                  </button>
                )}
            </div>
          ))}
      </div>

      <h3 className="text-lg font-bold mt-6">Favorite Meals</h3>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Meal</th>
              <th>Chef</th>
              <th>Price</th>
              <th>Date Added</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(favorites) &&
              favorites.map((f) => (
                <tr key={f._id}>
                  <td>{f.mealName}</td>
                  <td>{f.chefName}</td>
                  <td>{f.price}</td>
                  <td>
                    {f.addedTime ? new Date(f.addedTime).toLocaleString() : ""}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => removeFav(f._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFood;
