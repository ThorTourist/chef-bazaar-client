import { useState } from "react";

const AddFood = () => {
  const [formData, setFormData] = useState({
    foodName: "",
    chefName: "",
    foodImage: "", // URL will be stored here
    price: "",
    rating: "",
    ingredients: "",
    estimatedDeliveryTime: "",
    chefExperience: "",
  });

  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Image upload handler (ImgBB)
  const handleImageUpload = async (file) => {
    if (!file) return;

    setUploading(true);

    const imageData = new FormData();
    imageData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`,
        {
          method: "POST",
          body: imageData,
        }
      );

      const data = await res.json();

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          foodImage: data.data.url, // auto-fill URL
        }));
      }
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  // 🔹 Existing submit logic (UNCHANGED)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.foodName,
          image: formData.foodImage,
          price: Number(formData.price),
          category: "Custom",
          description: `Chef: ${formData.chefName}, Experience: ${formData.chefExperience}, Delivery: ${formData.estimatedDeliveryTime}`,
          rating: Number(formData.rating),
          ingredients: formData.ingredients
            ? formData.ingredients.split(",").map((i) => i.trim())
            : [],
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ Meal created successfully!`);
        setFormData({
          foodName: "",
          chefName: "",
          foodImage: "",
          price: "",
          rating: "",
          ingredients: "",
          estimatedDeliveryTime: "",
          chefExperience: "",
        });
      } else {
        setMessage(data.message || "❌ Error creating meal");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Food</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="foodName"
          placeholder="Food Name"
          value={formData.foodName}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="chefName"
          placeholder="Chef Name"
          value={formData.chefName}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        {/* Image URL input (existing) */}
        <input
          type="text"
          name="foodImage"
          placeholder="Food Image URL"
          value={formData.foodImage}
          onChange={handleChange}
          className="input input-bordered w-full"
         
        />

        {/* Image upload option */}
        <input
          type="file"
          accept="image/*"
          className="input input-bordered w-full"
          onChange={(e) => handleImageUpload(e.target.files[0])}
        />

        {uploading && (
          <p className="text-sm text-blue-500">Uploading image...</p>
        )}

        {formData.foodImage && (
          <img
            src={formData.foodImage}
            alt="Preview"
            className="w-full h-40 object-cover rounded"
          />
        )}

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          value={formData.ingredients}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="estimatedDeliveryTime"
          placeholder="Estimated Delivery Time"
          value={formData.estimatedDeliveryTime}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="chefExperience"
          placeholder="Chef Experience"
          value={formData.chefExperience}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={uploading}
        >
          Add Meal
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default AddFood;
