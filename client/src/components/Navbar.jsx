import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useContext,
} from "react";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  ThemeContext,
} from "../context/ThemeContext";

function Navbar() {
  const {
    user,
    logout,
  } = useContext(
    AuthContext
  );

  const {
    darkMode,
    toggleTheme,
  } = useContext(
    ThemeContext
  );

  const navigate =
    useNavigate();

  const handleLogout =
    () => {
      logout();

      navigate(
        "/login"
      );
    };

  return (
    <nav className="navbar navbar-dark bg-dark shadow-sm">
      <div className="container">

        <Link
          className="navbar-brand fw-bold"
          to="/dashboard"
        >
          🚀 Community Forum
        </Link>

        <div className="d-flex align-items-center gap-2">

          {user && (
            <Link
              to="/profile"
              className="btn btn-outline-light btn-sm"
            >
              👤 Profile
            </Link>
          )}

          <button
            className="btn btn-warning btn-sm"
            onClick={
              toggleTheme
            }
          >
            {darkMode
              ? "☀️ Light"
              : "🌙 Dark"}
          </button>

          <span className="text-light">
            👤 {user?.name || "Guest"}
          </span>

          {user && (
            <button
              className="btn btn-outline-light btn-sm"
              onClick={
                handleLogout
              }
            >
              <i className="bi bi-box-arrow-right me-1"></i>
              Logout
            </button>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;