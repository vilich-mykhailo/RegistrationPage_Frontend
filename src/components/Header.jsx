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
                Реєстрація
              </Link>
              <Link to="/login" className="btn btn-success">
                Увійти
              </Link>
            </>
          ) : (
            <div className="user-info">
              <span className="username">👤 {user.username}</span>
<button className="logout-btn" onClick={handleLogout}>
  <span>Вийти</span>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <path d="M10 17l5-5-5-5" />
    <path d="M15 12H3" />
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
