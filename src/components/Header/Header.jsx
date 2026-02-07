import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LangSwitcher from "./LangSwitcher/LangSwitcher";
import { useState } from "react";
import {
  FaUser,
  FaBalanceScale,
  FaHeart,
  FaRegCommentDots,
  FaShoppingCart,
} from "react-icons/fa";
import "./Header.css";
import LoginModal from "./HeaderActions/LoginModal/LoginModal";

const Header = () => {
  const { user, isAuthenticated } = useAuth();
  const [isLoginOpen, setLoginOpen] = useState(false);
  const getDisplayName = (user) => {
    const name =
      user.first_name?.trim() || user.email?.split("@")[0] || "Профіль";

    return name.length > 10 ? name.slice(0, 10) + "…" : name;
  };
  return (
    <>
      <header className="header">
        <nav className="nav">
          {/* Left side */}
          <div className="nav-left">
            {/* <NavLink to="/about" className="nav-link">
            Про нас
          </NavLink> */}
            <NavLink to="/#massage-types" className="nav-link">
              Види масажу
            </NavLink>
            <NavLink to="/certificates" className="nav-link">
              Сертифікати
            </NavLink>
            <NavLink to="/#teams" className="nav-link">
              Команда
            </NavLink>
            <NavLink to="/contacts" className="nav-link">
              Контакти
            </NavLink>
            <NavLink to="/faq" className="nav-link">
              FAQ
            </NavLink>
          </div>
          <div className="nav-center">
            <NavLink
              to="/"
              className="nav-logo"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img src="/images/HomePage/logo/logo.png" alt="MyShop logo" />
            </NavLink>
          </div>
          {/* Right side */}
          <div className="nav-right">
            {!isAuthenticated ? (
              <>
                <div className="nav-info">
                  <span className="nav-item">
                    <span className="icon">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22s7-7.2 7-13a7 7 0 1 0-14 0c0 5.8 7 13 7 13Z"
                          stroke="#6AA84F"
                          stroke-width="2"
                          stroke-linejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="9"
                          r="2.5"
                          stroke="#6AA84F"
                          stroke-width="2"
                        />
                      </svg>
                    </span>
                    Луцьк
                  </span>

                  <a href="tel:+48733661128" className="nav-item">
                    <span className="icon">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22 16.9v3a2 2 0 0 1-2.2 2
                            19.8 19.8 0 0 1-8.6-3
                            19.5 19.5 0 0 1-6-6
                            19.8 19.8 0 0 1-3-8.6
                            A2 2 0 0 1 4.1 2h3
                            a2 2 0 0 1 2 1.7
                            c.1 1 .4 2 .7 2.9
                            a2 2 0 0 1-.5 2.1L8 9
                            a16 16 0 0 0 7 7
                            l.3-1.3
                            a2 2 0 0 1 2.1-.5
                            c.9.3 1.9.6 2.9.7
                            a2 2 0 0 1 1.7 2Z"
                          stroke="#6AA84F"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="header-number">+48 733 661 128</span>
                  </a>

                  <LangSwitcher />
                </div>
                {/* <Link to="/sign-up" className="btn btn-light">
                Реєстрація
              </Link> */}
                <button
                  className="btn btn-success book-btn"
                  onClick={() => setLoginOpen(true)}
                >
                  УВІЙТИ
                </button>
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
      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
};

export default Header;
