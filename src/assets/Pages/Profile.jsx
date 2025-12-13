// src/Pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { api } from "../utils/api";

const Profile = () => {
  const [me, setMe] = useState(null);
  useEffect(() => {
    document.title = "Profile | Local Chef Bazaar";
    api.get("/api/auth/me").then((r) => setMe(r.data));
  }, []);

  const sendRequest = async (type) => {
    await api.post("/api/requests", { requestType: type });
    alert(`Request to be ${type} submitted!`);
  };

  if (!me) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <div className="card bg-base-100 shadow p-4">
        <div className="flex items-center gap-3">
          <img
            src={me.image}
            alt={me.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold">{me.name}</div>
            <div className="text-sm">{me.email}</div>
          </div>
        </div>
        <div className="mt-3">
          <div>
            <strong>Role:</strong> {me.role}
          </div>
          <div>
            <strong>Status:</strong> {me.status}
          </div>
          {me.role === "chef" && (
            <div>
              <strong>Chef ID:</strong> {me.chefId}
            </div>
          )}
          <div>
            <strong>Address:</strong> {me.address}
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          {me.role !== "chef" && me.role !== "admin" && (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => sendRequest("chef")}
            >
              Be a Chef
            </button>
          )}
          {me.role !== "admin" && (
            <button
              className="btn btn-sm btn-outline"
              onClick={() => sendRequest("admin")}
            >
              Be an Admin
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
