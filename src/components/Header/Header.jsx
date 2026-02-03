import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaUser,
  FaBalanceScale,
  FaHeart,
  FaRegCommentDots,
  FaShoppingCart,
} from "react-icons/fa";
import logo from "../../assets/logo2.png";
import "./Header.css";

const Header = () => {
  const { user, isAuthenticated } = useAuth();
  const getDisplayName = (user) => {
    const name =
      user.first_name?.trim() || user.email?.split("@")[0] || "Профіль";

    return name.length > 10 ? name.slice(0, 10) + "…" : name;
  };

  return (
    <header className="header">
      <nav className="nav">
        {/* Left side */}
        <div className="nav-left">
          {/* LOGO */}
          <NavLink to="/" className="nav-logo">
            <img src={logo} alt="MyShop logo" />
          </NavLink>

          <NavLink to="/" className="nav-link">
            Home
          </NavLink>

          {isAuthenticated && (
            <NavLink to="/users" className="nav-link">
              Contacts
            </NavLink>
          )}
        </div>

        {/* Right side */}
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
            <div className="header-icons">
              <Link to="/profile" className="icon-item">
                <FaUser />
                <span>
                  <span>{getDisplayName(user)}</span>
                </span>
              </Link>

              <Link to="/favourites" className="icon-item">
                <FaHeart />
                <span>Обране</span>
              </Link>

              <Link to="/messages" className="icon-item">
                <FaRegCommentDots />
                <span>Повідомлення</span>
              </Link>

              <Link to="/cart" className="icon-item cart">
                <FaShoppingCart />
                <span>Кошик</span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
