

import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <span className="logo"></span>
        <span className="brand">Task Manager</span>
      </div>

      {/* CENTER */}
      <div className="nav-links">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => isActive ? "active" : ""}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/create"
          className={({ isActive }) => isActive ? "active" : ""}
        >
          Create Task
        </NavLink>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <div className="user-info">
          {email}
          <span className="role">({role})</span>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;