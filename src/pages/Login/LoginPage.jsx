// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./LoginPage.css";

const LoginPage = () => {
  const API =
  process.env.REACT_APP_API_URL || "http://localhost:5000";
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const isEmailValid = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const SESSION_DURATION = 24 * 60 * 60 * 1000;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!email.trim()) {
      setErrors({ email: "Введіть коректну email-адресу (має містити @)" });
      return;
    }

    if (!isEmailValid(email)) {
      setErrors({ email: "Email має виглядати як name@example.com" });
      return;
    }
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message === "EMAIL_NOT_FOUND") {
          setErrors({ email: "Користувач з такою поштою не зареєстрований" });
        } else if (data.message === "WRONG_PASSWORD") {
          setErrors({ password: "Невірний пароль" });
        } else {
        setErrors({ general: data.message || "Помилка входу" });
      }
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("expiresAt", Date.now() + SESSION_DURATION);

      login(data.user);
      navigate("/");
    } catch {
      setErrors({ general: "Помилка сервера. Спробуйте пізніше." });
    }
  };

  return (
    <div className="login-form-section">
      <div className="login-form-wrapper">
        <h1 className="login-form-title">Вхід</h1>

        <form className="login-form-form" onSubmit={handleSubmit} noValidate>
          <div className="login-form-field">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors((prev) => {
                    const copy = { ...prev };
                    delete copy.email;
                    return copy;
                  });
                }
              }}
              className={`login-form-input ${
                errors.email ? "input-error" : ""
              }`}
              required
            />

            {errors.email && <p className="login-form-error">{errors.email}</p>}
                      {errors.general && (
            <p className="login-form-error login-form-general-error">
              {errors.general}
            </p>
          )}
          </div>

          <div className="login-form-field">
            <div className="login-form-password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Пароль"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);

                  if (errors.password) {
                    setErrors((prev) => {
                      const copy = { ...prev };
                      delete copy.password;
                      return copy;
                    });
                  }
                }}
                className={`login-form-input ${
                  errors.password ? "input-error" : ""
                }`}
                required
              />

              <button
                type="button"
                className="securemail-password-toggle-password"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="3" y1="21" x2="21" y2="3" />
                  </svg>
                )}
              </button>
            </div>

            {errors.password && (
              <p className="login-form-error">{errors.password}</p>
            )}
          </div>

          <div className="login-form-forgot-password">
            <button
              type="button"
              className="login-form-forgot-link"
              onClick={() => navigate("/forgot-password")}
            >
              Забули пароль?
            </button>
          </div>

          <button className="login-form-submit-btn login-btn" type="submit">
            Увійти
          </button>


        </form>
      </div>
    </div>
  );
};

export default LoginPage;
