import React from "react";
import logoImg from "../../images/logo.png";
import { NavLink } from "react-router";

import { FaEnvelope, FaFacebook, FaPhone, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#5c5cc4] text-white px-4 sm:px-6 md:px-20 py-8">
      <div className="flex flex-col md:flex-row md:justify-between gap-8">
        {/* Logo & About */}
        <div className="flex flex-col items-start gap-3">
          <NavLink
            to="/home"
            className="flex items-center gap-2 text-lg sm:text-xl font-bold"
          >
            <img className="h-8 w-8 sm:h-10 sm:w-10" src={logoImg} alt="Logo" />
            Local Chef Bazaar
          </NavLink>
          <p className="text-sm sm:text-base max-w-xs">
            Connecting you with fresh, home-cooked meals from trusted local
            chefs. Taste the love in every bite!
          </p>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col gap-2">
          <h6 className="font-semibold text-white text-base mb-2">
            Contact Us
          </h6>
          <p className="flex items-center gap-2 text-sm sm:text-base">
            <FaMapMarkerAlt /> 123 Chef Street, Dhaka, Bangladesh
          </p>
          <p className="flex items-center gap-2 text-sm sm:text-base">
            <FaPhone /> +880 1234 567890
          </p>
          <p className="flex items-center gap-2 text-sm sm:text-base">
            <FaEnvelope /> support@localchefbazaar.com
          </p>
        </div>

        {/* Working Hours */}
        <div className="flex flex-col gap-2">
          <h6 className="font-semibold text-white text-base mb-2">
            Working Hours
          </h6>
          <p className="text-sm sm:text-base">Mon - Fri: 9:00 AM - 8:00 PM</p>
          <p className="text-sm sm:text-base">Sat - Sun: 10:00 AM - 6:00 PM</p>
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-2">
          <h6 className="font-semibold text-white text-base mb-2">Follow Us</h6>
          <div className="flex gap-4">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <FaXTwitter size={24} className="hover:text-gray-200" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={24} className="hover:text-gray-200" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={24} className="hover:text-gray-200" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 border-t border-white/20 pt-4">
        <p className="text-center text-sm sm:text-base">
          © {new Date().getFullYear()} Local Chef Bazaar. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
