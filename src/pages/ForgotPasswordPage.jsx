// src/pages/ForgotPasswordPage.jsx
import { useState } from "react";
import axios from "axios";
import "./ForgotPasswordPage.css";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });

      // ✅ якщо дійшли сюди — пошта ІСНУЄ і лист надіслано
      setSuccess(true);
    } catch (e) {
      if (e.response?.data?.message === "EMAIL_NOT_FOUND") {
        setMessage(
          <>
            ❌ Акаунт не знайдено.
            <br />
            Перевірте email або зареєструйтесь
          </>,
        );
      } else {
        setMessage("Сталася помилка. Спробуйте пізніше.");
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

          <p className="success-text">
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
        <h1>Забули пароль?</h1>
        <p>Введіть email — ми надішлемо інструкцію</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);

              // 🔥 при вводі — прибираємо помилку
              if (message) setMessage("");
            }}
            className={message ? "input-error" : ""}
            required
          />

          {message && <p className="error">{message}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Надсилання..." : "Надіслати"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
