import React from "react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div>
      <div className="w-full bg-linear-to-br from-indigo-50 to-purple-100 py-5 px-6 flex justify-center items-center">
        <div className="max-w-4xl text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800">
            Welcome to <span className="text-indigo-600">Book Haven</span>
          </h1>

          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Discover your next favorite book in our curated library. Explore,
            manage, and enjoy a world of stories.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/books"
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Browse Books
            </Link>

            <Link
              to="/about"
              className="px-6 py-3 rounded-xl border border-slate-400 text-slate-700 font-semibold hover:bg-slate-100 transition"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
