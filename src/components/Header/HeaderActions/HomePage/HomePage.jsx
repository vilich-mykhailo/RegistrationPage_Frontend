// src/pages/HomePage.jsx
import "./HomePage.css";
import { NavLink, Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="hero">
      <div className="hero-overlay" />

      <div className="hero-content center">
        <h1 className="hero-title">
          Відчуй близькість природи <br />
          <span>в салонах масажу</span>
        </h1>

        <div className="hero-brand">
          <span className="hero-hash">#ivRoxe</span>
          <span className="hero-name">IvRoxe</span>
        </div>

        <p className="hero-text">
          Розслаб тіло, звільни розум і подбай про фігуру разом з досвідченими
          масажистами.
        </p>
        <NavLink to="/massagePage" className="hero-button">
          Онлайн запис
        </NavLink>
      </div>
    </section>
  );
};

export default HomePage;
