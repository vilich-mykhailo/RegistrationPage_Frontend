// src/pages/ForgotPasswordPage.jsx //
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
    await axios.post(
      "http://localhost:5000/api/auth/forgot-password",
      { email }
    );

    setSuccess(true); // 🔥 показуємо success-екран
  } catch {
    setMessage("Сталася помилка. Спробуйте пізніше.");
  } finally {
    setLoading(false);
  }
};
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
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Надсилання..." : "Надіслати"}
          </button>
        </form>

        {message && <p className="info">{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
