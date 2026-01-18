// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const SESSION_DURATION = 24 * 60 * 60 * 1000; // 1 день

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({}); // 🔥 очищаємо перед сабмітом

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // 🔴 логіка помилок
        if (data.message === "Невірний пароль") {
          setErrors({ password: data.message });
        } else if (data.message === "Користувача не знайдено") {
          setErrors({ email: data.message });
        } else {
          setErrors({ general: data.message });
        }
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("expiresAt", Date.now() + SESSION_DURATION);

      login(data.user);
      navigate("/");
    } catch (error) {
      setErrors({ general: "Помилка сервера. Спробуйте пізніше." });
    }
  };

  return (
    <div className="section-login">
      <div className="form-wrapper">
        <h1>Вхід</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors((prev) => ({ ...prev, email: null }));
                }
              }}
              className={errors.email ? "input-error" : ""}
              required
            />

            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="field">
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Пароль"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors((prev) => ({ ...prev, password: null }));
                  }
                }}
                className={errors.password ? "input-error" : ""}
                required
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  /* 👁 ВІДКРИТЕ ОКО */
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
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  /* 🚫👁 ПЕРЕКРЕСЛЕНЕ ОКО */
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
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="3" y1="21" x2="21" y2="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="forgot-password">
            <button
              type="button"
              className="forgot-link"
              onClick={() => navigate("/forgot-password")}
            >
              Забули пароль?
            </button>
          </div>

          <button className="form-btn" type="submit">
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
