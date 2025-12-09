import { Link, NavLink } from "react-router";
import logoImg from "../../images/logo.png";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

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
        to="/allfoods"
        className={({ isActive }) =>
          `m-2 font-semibold ${isActive ? "underline underline-offset-4" : ""}`
        }
      >
        All Foods
      </NavLink>

      <NavLink
        to="/addfood"
        className={({ isActive }) =>
          `m-2 font-semibold ${isActive ? "underline underline-offset-4" : ""}`
        }
      >
        Add Food
      </NavLink>

      <NavLink
        to="/myfoods"
        className={({ isActive }) =>
          `m-2 font-semibold ${isActive ? "underline underline-offset-4" : ""}`
        }
      >
        My Foods
      </NavLink>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-2 lg:px-10">
      <div className="navbar-start flex items-center gap-2">
        <NavLink
          to="/home"
          className="btn btn-ghost text-lg lg:text-xl font-bold flex items-center gap-2"
        >
          <img className="h-8 w-8" src={logoImg} alt="logo" /> Local Chef Bazar
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end flex items-center gap-2">
        {user ? (
          <>
            <span>Welcome, {user.displayName}</span>
            <button className="btn btn-sm btn-outline" onClick={logoutUser}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-sm btn-outline">
              Login
            </Link>
            <Link to="/signup" className="btn btn-sm btn-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
