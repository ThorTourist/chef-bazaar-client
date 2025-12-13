// src/Pages/Details.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { api } from "../utils/api";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    document.title = "Meal Details | Local Chef Bazaar";
    api.get(`/api/meals/${id}`).then((r) => setMeal(r.data));
    api
      .get(`/api/reviews/${id}`)
      .then((r) => setReviews(Array.isArray(r.data) ? r.data : []));
  }, [id]);

  const addFavorite = async () => {
    if (!meal) return;
    await api.post("/api/favorites", {
      mealId: meal._id,
      mealName: meal.foodName,
      chefId: meal.chefId,
      chefName: meal.chefName,
      price: meal.price,
    });
    alert("Added to favorites");
  };

  const submitReview = async () => {
    await api.post("/api/reviews", { foodId: id, rating, comment });
    const r = await api.get(`/api/reviews/${id}`);
    setReviews(Array.isArray(r.data) ? r.data : []);
    setComment("");
    alert("Review submitted successfully!");
  };

  if (!meal) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <div className="grid md:grid-cols-2 gap-4">
        <img
          src={meal.foodImage}
          alt={meal.foodName}
          className="w-full h-64 object-cover rounded"
        />
        <div>
          <h2 className="text-2xl font-bold">{meal.foodName}</h2>
          <p>
            <strong>Chef:</strong> {meal.chefName} ({meal.chefId})
          </p>
          <p>
            <strong>Price:</strong> {meal.price}
          </p>
          <p>
            <strong>Rating:</strong> {meal.rating}
          </p>
          <p>
            <strong>Ingredients:</strong>{" "}
            {Array.isArray(meal.ingredients)
              ? meal.ingredients.join(", ")
              : meal.ingredients}
          </p>
          <p>
            <strong>Estimated Delivery:</strong> {meal.estimatedDeliveryTime}
          </p>
          <p>
            <strong>Chef Experience:</strong> {meal.chefExperience}
          </p>
          <div className="mt-3 flex gap-2">
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/order/${meal._id}`)}
            >
              Order Now
            </button>
            <button className="btn btn-outline" onClick={addFavorite}>
              Favorite
            </button>
          </div>
        </div>
      </div>

      <h3 className="mt-6 font-semibold">Reviews</h3>
      <div className="space-y-2 mt-2">
        {reviews.map((rv) => (
          <div key={rv._id} className="border p-3 rounded">
            <strong>{rv.reviewerName}</strong> — {rv.comment} ({rv.rating}★)
            <div className="text-xs text-gray-500">
              {new Date(rv.date).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border p-4 rounded">
        <h4 className="font-semibold">Give Review</h4>
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
            placeholder="Write your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="input input-bordered flex-1"
          />
          <button className="btn btn-sm btn-primary" onClick={submitReview}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
