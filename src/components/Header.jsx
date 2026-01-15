// src/components/Header.jsx
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-left">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>

          {isAuthenticated && (
            <NavLink to="/users" className="nav-link">
              Users
            </NavLink>
          )}
        </div>

        <div className="nav-right">
          {!isAuthenticated ? (
            <>
              <Link to="/sign-up" className="btn btn-light">
                Sign up
              </Link>
              <Link to="/login" className="btn btn-success">
                Log in
              </Link>
            </>
          ) : (
            <div className="user-info">
              <span className="username">👤 {user.username}</span>
              <button className="btn btn-danger" onClick={handleLogout}>
                Log out &nbsp;&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10 17l5-5-5-5"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12H3"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
