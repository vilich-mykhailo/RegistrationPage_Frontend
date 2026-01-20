import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./ResetPasswordPage.css";

function EmailChangedSuccess() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // 🔥 LOGOUT ПІСЛЯ ЗМІНИ ПОШТИ
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    logout();
  }, [logout]);

  return (
    <div className="activation-wrapper">
      <div className="activation-card">
        <div className="activation-icon">📩</div>

        <h1 className="activation-title">Пошту успішно змінено</h1>

        <p className="activation-text">
          З міркувань безпеки вас було вийдено з акаунту.
          <br />
          Увійдіть з новою електронною поштою.
        </p>

        <button
          className="activation-button"
          onClick={() => navigate("/login")}
        >
          Увійти
        </button>
      </div>
    </div>
  );
}

export default EmailChangedSuccess;
