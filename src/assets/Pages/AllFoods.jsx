import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const AllFoods = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/meals?limit=20&sort=asc")
      .then((res) => res.json())
      .then((data) => {
        // ✅ works for both array OR { meals: [] }
        if (Array.isArray(data)) {
          setMeals(data);
        } else if (Array.isArray(data.meals)) {
          setMeals(data.meals);
        } else {
          setMeals([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching meals:", err);
        setMeals([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-4">Loading meals...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Foods</h1>

      {meals.length === 0 && (
        <p className="text-center text-gray-500">No foods available</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="card bg-base-200 shadow-md hover:shadow-lg"
          >
            <figure>
              <img
                src={
                  meal.image && meal.image.startsWith("http")
                    ? meal.image
                    : "https://via.placeholder.com/400x300?text=No+Image"
                }
                alt={meal.name || "Food image"}
                className="h-48 w-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=Image+Error";
                }}
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{meal.name}</h2>

              <p className="text-sm text-gray-600">
                Chef: {meal.createdBy || "Unknown"}
              </p>

              <p className="text-sm">Price: ৳{meal.price}</p>

              <p className="text-sm">Category: {meal.category || "N/A"}</p>

              <p className="text-sm line-clamp-3">{meal.description}</p>

              <div className="card-actions justify-end">
                <Link
                  to={`/details/${meal._id}`}
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFoods;
