import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Signup = () => {
  const { registerUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const address = e.target.address.value;
    const password = e.target.password.value;

    // Password Validation
    if (!/[A-Z]/.test(password))
      return setError("At least one uppercase letter.");
    if (!/[a-z]/.test(password))
      return setError("At least one lowercase letter.");
    if (password.length < 6) return setError("Password must be 6+ characters.");

    registerUser(email, password, name, photo, address)
      .then(() => {
        setSuccess("Account created successfully!");
        navigate("/home");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Your Account
        </h1>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="border p-3 rounded-lg"
            required
          />
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            className="border p-3 rounded-lg"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="border p-3 rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="border p-3 rounded-lg w-full"
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 mt-4 text-center">{success}</p>
        )}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
