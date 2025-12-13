// src/Layouts/DashboardLayout.jsx
import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router";
import { api } from "../utils/api";

const DashboardLayout = () => {
  const [me, setMe] = useState(null);

  useEffect(() => {
    api.get("/api/auth/me").then((r) => setMe(r.data));
  }, []);

  if (!me) return <div className="p-4">Loading...</div>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-base-200 p-4">
        <h2 className="text-lg font-bold mb-4">Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <NavLink to="/profile" className="btn btn-sm btn-ghost">
            My Profile
          </NavLink>

          {/* User links */}
          {me.role === "user" && (
            <>
              <NavLink to="/myfoods" className="btn btn-sm btn-ghost">
                My Orders
              </NavLink>
              <NavLink to="/myreviews" className="btn btn-sm btn-ghost">
                My Reviews
              </NavLink>
              <NavLink to="/favorites" className="btn btn-sm btn-ghost">
                Favorite Meals
              </NavLink>
            </>
          )}

          {/* Chef links */}
          {me.role === "chef" && (
            <>
              <NavLink to="/addfood" className="btn btn-sm btn-ghost">
                Create Meal
              </NavLink>
              <NavLink to="/myfoods" className="btn btn-sm btn-ghost">
                My Meals
              </NavLink>
              <NavLink to="/orderrequests" className="btn btn-sm btn-ghost">
                Order Requests
              </NavLink>
            </>
          )}

          {/* Admin links */}
          {me.role === "admin" && (
            <>
              <NavLink to="/admin/users" className="btn btn-sm btn-ghost">
                Manage Users
              </NavLink>
              <NavLink to="/admin/requests" className="btn btn-sm btn-ghost">
                Manage Requests
              </NavLink>
              <NavLink to="/admin/stats" className="btn btn-sm btn-ghost">
                Platform Statistics
              </NavLink>
            </>
          )}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
