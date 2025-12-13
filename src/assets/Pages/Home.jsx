import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../utils/api";

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    document.title = "Home | Local Chef Bazaar";

    // Fetch meals
    api
      .get("/api/meals", { params: { page: 1, limit: 6, sort: "asc" } })
      .then((r) => setMeals(r.data?.meals || []))
      .catch(() => setMeals([]));

    // Fetch reviews for the first meal if available
    api
      .get("/api/meals", { params: { page: 1, limit: 1 } })
      .then(async (r) => {
        const meals = Array.isArray(r.data?.meals) ? r.data.meals : [];
        if (meals.length > 0) {
          const firstId = meals[0]._id;
          const rv = await api.get(`/api/reviews/${firstId}`);
          setReviews(Array.isArray(rv.data) ? rv.data.slice(0, 6) : []);
        }
      })
      .catch(() => setReviews([]));
  }, []);

  return (
    <div className="p-4">
      <div className="text-center bg-base-200 p-8 rounded">
        <h1 className="text-2xl font-bold">Fresh, homemade meals — near you</h1>
        <p>Discover local chefs and taste the difference.</p>
        <Link to="/allfoods" className="btn btn-primary mt-3">
          Explore meals
        </Link>
      </div>

      <h3 className="mt-6 font-semibold">Today’s meals</h3>
      <div className="grid md:grid-cols-3 gap-4 mt-2">
        {meals.map((m) => (
          <div key={m._id} className="card bg-base-100 shadow">
            <figure>
              <img
                src={m.foodImage}
                alt={m.foodName}
                className="h-40 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h4 className="card-title">{m.foodName}</h4>
              <p>Chef: {m.chefName}</p>
              <Link to={`/details/${m._id}`} className="btn btn-sm btn-outline">
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mt-6 font-semibold">Customer reviews</h3>
      <div className="space-y-2">
        {reviews.map((rv) => (
          <div key={rv._id} className="border p-3 rounded">
            <strong>{rv.reviewerName}</strong> — {rv.comment}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
