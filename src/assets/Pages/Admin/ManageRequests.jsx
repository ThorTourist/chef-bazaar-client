// src/Pages/Admin/ManageRequests.jsx
import React, { useEffect, useState } from "react";
import { api } from "../../utils/api";

const ManageRequests = () => {
  const [reqs, setReqs] = useState([]);
  const load = async () => {
    const r = await api.get("/api/admin/requests");
    setReqs(Array.isArray(r.data) ? r.data : []);
  };
  useEffect(() => {
    document.title = "Manage Requests | Local Chef Bazaar";
    load();
  }, []);
  const act = async (id, action) => {
    await api.patch(`/api/admin/requests/${id}`, { action });
    await load();
    alert(action === "approve" ? "Request approved" : "Request rejected");
  };
  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-3">Manage Requests</h3>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Status</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reqs.map((r) => (
              <tr key={r._id}>
                <td>{r.userName}</td>
                <td>{r.userEmail}</td>
                <td>{r.requestType}</td>
                <td>{r.requestStatus}</td>
                <td>{new Date(r.requestTime).toLocaleString()}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-success"
                    disabled={r.requestStatus !== "pending"}
                    onClick={() => act(r._id, "approve")}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    disabled={r.requestStatus !== "pending"}
                    onClick={() => act(r._id, "reject")}
                  >
                    Reject
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
export default ManageRequests;
