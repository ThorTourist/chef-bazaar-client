// src/Pages/Admin/ManageUsers.jsx
import React, { useEffect, useState } from "react";
import { api } from "../../utils/api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    document.title = "Manage Users | Local Chef Bazaar";
    api
      .get("/api/admin/users")
      .then((r) => setUsers(Array.isArray(r.data) ? r.data : []));
  }, []);
  const makeFraud = async (email) => {
    await api.patch("/api/admin/users/fraud", { email });
    const r = await api.get("/api/admin/users");
    setUsers(Array.isArray(r.data) ? r.data : []);
    alert("User marked as fraud");
  };
  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-3">Manage Users</h3>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.status}</td>
                <td>
                  {u.role !== "admin" && u.status !== "fraud" && (
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => makeFraud(u.email)}
                    >
                      Make Fraud
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageUsers;
