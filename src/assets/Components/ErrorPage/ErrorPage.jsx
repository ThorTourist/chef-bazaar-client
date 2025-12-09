// pages/ErrorPage/ErrorPage.jsx
import React from "react";
import { Navigate, useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-9xl font-bold text-red-500">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2 text-center">
        Oops! The page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate("/home")}
        className="mt-6 btn btn-primary"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
