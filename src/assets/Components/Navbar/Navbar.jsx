
import { Link, NavLink } from "react-router";
import logoImg from "../../images/logo.png";
// import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {


  const links = (
    <>
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `m-2 font-semibold ${isActive ? "underline underline-offset-4" : ""}`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/allbooks"
        className={({ isActive }) =>
          `m-2 font-semibold ${isActive ? "underline underline-offset-4" : ""}`
        }
      >
        All Food Items
      </NavLink>

      <NavLink
        to="/addbook"
        className={({ isActive }) =>
          `m-2 font-semibold ${isActive ? "underline underline-offset-4" : ""}`
        }
      >
        Add Food
      </NavLink>

      <NavLink
        to="/myfoodlist"
        className={({ isActive }) =>
          `m-2 font-semibold ${isActive ? "underline underline-offset-4" : ""}`
        }
      >
        My Foods
      </NavLink>

      {/* <NavLink
        to="/myprofile"
        className={({ isActive }) =>
          `m-2 font-semibold ${isActive ? "underline underline-offset-4" : ""}`
        }
      >
        My Profile
      </NavLink> */}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-2 lg:px-10">
      {/* Left side */}
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-[999]"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <NavLink
            to="/home"
            className="btn btn-ghost text-lg lg:text-xl inter text-purple-800 font-bold"
          >
            <img className="h-15 w-15" src={logoImg} alt="logo" />
            Local Chef Bazaar
          </NavLink>
        </div>
      </div>

      {/* Center - Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Right side: login/logout */}
      {/* Right side: login/logout */}
      <div className="navbar-end flex items-center gap-2">
        
          <div className="flex gap-2 flex-wrap">
            <Link to="/login" className="btn btn-sm btn-outline">
              Login
            </Link>
            <Link to="/signup" className="btn btn-sm btn-primary">
              Sign Up
            </Link>
          </div>
        
      </div>
    </div>
  );
};

export default Navbar;
