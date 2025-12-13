import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../Firebase/firebase.init";
import Swal from "sweetalert2";

const storage = getStorage(app);

const Signup = () => {
  const { signupUser, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;
    const photoFile = e.target.photo.files[0];

    try {
      let photoURL = "";
      if (photoFile) {
        const storageRef = ref(
          storage,
          `profile_pics/${email}_${photoFile.name}`
        );
        await uploadBytes(storageRef, photoFile);
        photoURL = await getDownloadURL(storageRef);
      }

      await signupUser(email, password, name, photoURL, address);

      Swal.fire({
        icon: "success",
        title: "Account created!",
        text: "Your account has been created successfully.",
      });

      e.target.reset();
      setPreview(null);
      navigate("/home");
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Signup failed",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    setLoading(true);
    googleLogin()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Google Signup successful!",
        });
        navigate("/home");
      })
      .catch((err) => {
        setError(err.message);
        Swal.fire({
          icon: "error",
          title: "Google Signup failed",
          text: err.message,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
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
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-20 h-20 rounded-full object-cover mx-auto"
            />
          )}
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="grow border-gray-300" />
          <span className="mx-2 text-gray-400">or</span>
          <hr className="grow border-gray-300" />
        </div>

        <button
          onClick={handleGoogleSignup}
          className="flex items-center justify-center border border-gray-300 py-3 rounded-lg gap-2 hover:bg-gray-100 transition w-full disabled:opacity-50"
          disabled={loading}
        >
          Sign up with Google
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

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
