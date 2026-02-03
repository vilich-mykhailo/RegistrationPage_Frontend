// src/pages/AccountActivationPage.jsx
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AccountActivationPage.css";

function AccountActivationPage() {
    const API =
  process.env.REACT_APP_API_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const { token } = useParams(); // ✅ ОДИН РАЗ, ЗОВНІ
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const activateAccount = async () => {
      const start = Date.now();

      try {
        await axios.get(`${API}/api/auth/activate/${token}`);

        const elapsed = Date.now() - start;
        const delay = Math.max(1000, 1000 - elapsed);

        setTimeout(() => {
          setStatus("success");
        }, delay);
      } catch (e) {
        const elapsed = Date.now() - start;
        const delay = Math.max(2000, 2000 - elapsed);

        setTimeout(() => {
          setStatus("error");
        }, delay);
      }
    };

    activateAccount();
  }, [token]);

  if (status === "loading") {
    return (
      <div className="activation-wrapper">
        <div className="activation-card">
          <div className="activation-icon">⏳</div>
          <h1 className="activation-title">Активація акаунту...</h1>
          <p className="activation-text">Будь ласка, зачекайте</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="activation-wrapper">
        <div className="activation-card">
          <div className="activation-icon">❌</div>
          <h1 className="activation-title">Помилка активації</h1>
          <p className="activation-text">Посилання недійсне або застаріле</p>
          <button
            className="activation-submit-btn activation-btn"
            onClick={() => navigate("/login")}
          >
            До входу
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="activation-wrapper">
      <div className="activation-card">
        <div className="activation-icon">🎉</div>

        <h1 className="activation-title">Реєстрація успішна</h1>
        <p className="activation-text">Ваш акаунт успішно активовано.</p>

        <Link to="/login" className="activation-submit-btn activation-btn">
          Увійти
        </Link>
      </div>
    </div>
  );
}

export default AccountActivationPage;
