// src/Pages/MyReviews.jsx
import React, { useEffect, useState } from "react";
import { api } from "../utils/api";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [editing, setEditing] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const load = async () => {
    const r = await api.get("/api/reviews/my");
    setReviews(Array.isArray(r.data) ? r.data : []);
  };

  useEffect(() => {
    document.title = "My Reviews | Local Chef Bazaar";
    load();
  }, []);

  const startEdit = (rv) => {
    setEditing(rv);
    setRating(rv.rating);
    setComment(rv.comment);
  };

  const saveEdit = async () => {
    await api.patch(`/api/reviews/${editing._id}`, { rating, comment });
    setEditing(null);
    setRating(5);
    setComment("");
    await load();
    alert("Review updated");
  };

  const remove = async (id) => {
    if (!confirm("Delete this review?")) return;
    await api.delete(`/api/reviews/${id}`);
    await load();
    alert("Review deleted");
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-3">My Reviews</h3>
      <div className="space-y-2">
        {reviews.map((rv) => (
          <div
            key={rv._id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <div>
                <strong>Meal ID:</strong> {rv.foodId}
              </div>
              <div>
                <strong>Rating:</strong> {rv.rating}★
              </div>
              <div>
                <strong>Comment:</strong> {rv.comment}
              </div>
              <div className="text-xs text-gray-500">
                {new Date(rv.date).toLocaleString()}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-sm btn-outline"
                onClick={() => startEdit(rv)}
              >
                Update
              </button>
              <button
                className="btn btn-sm btn-error"
                onClick={() => remove(rv._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="mt-4 border p-4 rounded">
          <h4 className="font-semibold">Edit Review</h4>
          <div className="flex gap-2 items-center mt-2">
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="input input-bordered w-24"
            />
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="input input-bordered flex-1"
            />
            <button className="btn btn-sm btn-primary" onClick={saveEdit}>
              Save
            </button>
            <button className="btn btn-sm" onClick={() => setEditing(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
