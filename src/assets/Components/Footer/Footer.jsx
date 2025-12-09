import React from "react";
import logoImg from "../../images/logo.png";

// import { FaFacebook, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { NavLink } from "react-router";
import { FaFacebook, FaXTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#5c5cc4] text-neutral-content px-4 sm:px-6 md:px-20 py-6 flex flex-col md:flex-row md:justify-between items-center gap-6">
        {/* Logo Section */}
        <aside className="flex flex-col md:flex-row items-center gap-2">
          <NavLink
            to="/home"
            className="btn btn-ghost text-lg sm:text-xl font-bold text-white flex items-center gap-2"
          >
            <img className="h-6 w-6 sm:h-8 sm:w-8" src={logoImg} alt="Logo" />
            Local Chef Bazaar
          </NavLink>
        </aside>

        {/* Social Media Section */}
        <nav className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
          <h6 className="text-white text-sm md:text-base mb-2 md:mb-0">
            Follow us:
          </h6>
          <div className="flex gap-3 md:gap-4">
            {/* X Logo */}
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <FaXTwitter size={24} className="hover:text-gray-200" />
            </a>

            {/* YouTube / Telegram */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={24} className="hover:text-gray-200" />
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={24} className="hover:text-gray-200" />
            </a>
          </div>
        </nav>
      </footer>

      {/* Copyright */}
      <div>
        <p className="bg-[#001931] text-white text-center text-sm sm:text-base py-2">
          © {new Date().getFullYear()} Local Chef Bazaar. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
