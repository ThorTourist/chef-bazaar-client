import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import logoImg from "../../images/logo.png";
import { AuthContext } from "../../Context/AuthContext";

// helper function for initials
const getShortName = (name) => {
  if (!name) return "";
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

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

      {/* Show Add Food only if Chef or Admin */}
      {(user?.role === "Chef" || user?.role === "Admin") && (
        <NavLink
          to="/addfood"
          className={({ isActive }) =>
            `m-2 font-semibold ${
              isActive ? "underline underline-offset-4" : ""
            }`
          }
        >
          Add Food
        </NavLink>
      )}

      {/* Show My Foods only if Chef */}
      {user?.role === "Chef" && (
        <NavLink
          to="/myfoods"
          className={({ isActive }) =>
            `m-2 font-semibold ${
              isActive ? "underline underline-offset-4" : ""
            }`
          }
        >
          My Foods
        </NavLink>
      )}

      {/* Show Manage Users only if Admin */}
      {user?.role === "Admin" && (
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `m-2 font-semibold ${
              isActive ? "underline underline-offset-4" : ""
            }`
          }
        >
          Manage Users
        </NavLink>
      )}

      {/* Show Requests only if Admin */}
      {user?.role === "Admin" && (
        <NavLink
          to="/admin/requests"
          className={({ isActive }) =>
            `m-2 font-semibold ${
              isActive ? "underline underline-offset-4" : ""
            }`
          }
        >
          Requests
        </NavLink>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-2 lg:px-10">
      <div className="navbar-start flex items-center gap-2">
        <NavLink
          to="/home"
          className="btn btn-ghost text-lg lg:text-xl font-bold flex items-center gap-2"
        >
          <img className="h-8 w-8" src={logoImg} alt="logo" />
          Local Chef Bazar
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end flex items-center gap-2">
        {user ? (
          <div className="flex items-center gap-2 max-w-[180px] md:max-w-full overflow-hidden">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-10 h-10 rounded-full object-cover border-2 border-purple-500 flex-shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-semibold">
                {getShortName(user.displayName || user.email.split("@")[0])}
              </div>
            )}

            <div className="flex flex-col truncate">
              <span className="text-sm font-semibold text-purple-700 truncate">
                {user.displayName || user.email.split("@")[0]}
              </span>
              <span className="text-xs text-gray-500 truncate">
                {user.role || "User"}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="btn btn-outline btn-sm text-purple-700 flex-shrink-0"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2 flex-wrap">
            <Link to="/login" className="btn btn-sm btn-outline">
              Login
            </Link>
            <Link to="/signup" className="btn btn-sm btn-primary">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
