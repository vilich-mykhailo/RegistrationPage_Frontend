// src/pages/ForgotPasswordPage.jsx
import { useState } from "react";
import axios from "axios";
import "./ForgotPasswordPage.css";

function ForgotPasswordPage() {
    const API =
  process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isEmailValid = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ❌ пусте поле
    if (!email.trim()) {
      setError("Введіть email, щоб ми могли надіслати інструкцію");
      return;
    }

    // ❌ невалідний email
    if (!isEmailValid(email)) {
      setError("Схоже, це не email. Перевірте адресу");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API}/api/auth/forgot-password`, {
        email,
      });

      setSuccess(true);
    } catch (e) {
      if (e.response?.data?.message === "EMAIL_NOT_FOUND") {
        setError(
          <>
            ❌ Акаунт не знайдено.
            <br />
            Перевірте email або зареєструйтесь
          </>,
        );
      } else {
        setError("Сталася помилка. Спробуйте пізніше.");
      }
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SUCCESS SCREEN
  ========================= */
  if (success) {
    return (
      <div className="auth-screen">
        <div className="auth-card">
          <div className="success-icon">📩</div>

          <h1>Перевірте пошту</h1>

          <p className="success-text auth-card-text">
            Ми надіслали лист із посиланням для зміни пароля.
            <br />
            Якщо листа немає — перевірте папку <b>«Спам»</b>.
          </p>
        </div>
      </div>
    );
  }

  /* =========================
     FORM
  ========================= */
  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="success-icon">🥲</div>

        <h1>Забули пароль?</h1>
        <p className="auth-card-text">
          Введіть email — ми надішлемо інструкцію
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            className={`auth-input ${error ? "input-error" : ""}`}
          />

          {error && <p className="forgot-password-error">{error}</p>}

          <button
            type="submit"
            className="activation-submit-btn activation-btn"
            disabled={loading}
          >
            {loading ? "Надсилання..." : "Надіслати"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
