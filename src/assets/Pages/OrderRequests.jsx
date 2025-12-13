// src/Pages/OrderRequests.jsx
import React, { useEffect, useState } from "react";
import { api } from "../utils/api";

const OrderRequests = () => {
  const [orders, setOrders] = useState([]);

  const load = async () => {
    const r = await api.get("/api/orders/chef");
    setOrders(Array.isArray(r.data) ? r.data : []);
  };

  useEffect(() => {
    document.title = "Order Requests | Local Chef Bazaar";
    load();
  }, []);

  const update = async (id, next) => {
    await api.patch(`/api/orders/${id}/status`, { next });
    await load();
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-3">Order Requests</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {orders.map((o) => {
          const isCancelled = o.orderStatus === "cancelled";
          const isAccepted = o.orderStatus === "accepted";
          const isDelivered = o.orderStatus === "delivered";
          return (
            <div key={o._id} className="card bg-base-100 shadow p-4">
              <div>
                <strong>Meal:</strong> {o.mealName}
              </div>
              <div>
                <strong>Price:</strong> {o.price}
              </div>
              <div>
                <strong>Qty:</strong> {o.quantity}
              </div>
              <div>
                <strong>User:</strong> {o.userEmail}
              </div>
              <div>
                <strong>Status:</strong> {o.orderStatus}
              </div>
              <div>
                <strong>Payment:</strong> {o.paymentStatus}
              </div>
              <div className="mt-2 flex gap-2">
                <button
                  className="btn btn-sm"
                  disabled={isCancelled || isAccepted || isDelivered}
                  onClick={() => update(o._id, "cancelled")}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  disabled={isCancelled || isAccepted || isDelivered}
                  onClick={() => update(o._id, "accepted")}
                >
                  Accept
                </button>
                <button
                  className="btn btn-sm btn-success"
                  disabled={!isAccepted || isDelivered}
                  onClick={() => update(o._id, "delivered")}
                >
                  Deliver
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderRequests;
