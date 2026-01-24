import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./ResetPasswordPage.css";

function PasswordChangedSuccess() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // 🔥 АВТОМАТИЧНИЙ LOGOUT ПРИ ЗАВАНТАЖЕННІ СТОРІНКИ
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    logout();
  }, [logout]);

  return (
    <div className="activation-wrapper">
      <div className="activation-card">
        <div className="activation-icon">🎉</div>

        <h1 className="activation-title">Пароль успішно змінений</h1>

        <p className="activation-text">
          З міркувань безпеки ваш сеанс було завершено.
          <br />
          Увійдіть з новим паролем.
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

export default PasswordChangedSuccess;
