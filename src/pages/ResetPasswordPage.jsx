// src/pages/ResetPasswordPage.jsx //
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPasswordPage.css";

function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const passwordRules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };

  const hasPassword = password.length > 0;
  const hasLetters = /[A-Za-z]/.test(password);
  const onlyEnglishLetters =
    /^[A-Za-z0-9^_!@#$%^&*()+=\-[\]\\';,/{}|":<>?]+$/.test(password);

  const isPasswordValid =
    passwordRules.length &&
    passwordRules.upper &&
    passwordRules.lower &&
    passwordRules.number &&
    passwordRules.symbol &&
    onlyEnglishLetters;
  const passwordsMatch =
    password === confirmPassword && confirmPassword.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setLoading(true);

    if (!isPasswordValid) {
      setLoading(false);
      return;
    }

    if (!passwordsMatch) {
      setConfirmPasswordError("Паролі не співпадають");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password },
      );
      setSuccess(true);
    } catch (e) {
      setError(e.response?.data?.message || "Посилання недійсне або застаріле");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SUCCESS SCREEN
  ========================= */
  if (success) {
    return (
      <div className="activation-wrapper">
        <div className="activation-card">
          <div className="activation-icon">🎉</div>

          <h1 className="activation-title">Пароль успішно змінений</h1>

          <p className="activation-text">
            Тепер ви можете увійти з новим паролем
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

  /* =========================
     FORM
  ========================= */
  return (
    <div className="activation-wrapper">
      <div className="activation-card">
        <h1 className="activation-title">Новий пароль</h1>

        <form onSubmit={handleSubmit}>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Новий пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                /* 👁 */
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
                /* 🚫👁 */
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
          <div className="reset-password-hints">
            <div className="password-hints">
              <p className={passwordRules.length ? "ok" : ""}>
                • Щонайменше 8 символів
              </p>
              <p className={passwordRules.upper ? "ok" : ""}>
                • Одна велика літера
              </p>
              <p className={passwordRules.lower ? "ok" : ""}>
                • Одна мала літера
              </p>
              <p className={passwordRules.number ? "ok" : ""}>• Одна цифра</p>
              <p className={passwordRules.symbol ? "ok" : ""}>
                • Один спеціальний символ
              </p>
              <p
                className={
                  !hasPassword || !hasLetters
                    ? ""
                    : onlyEnglishLetters
                      ? "ok"
                      : "error"
                }
              >
                • Англійські літери (A–Z)
              </p>
            </div>
          </div>
          {/* ❌ Пароль невалідний (після спроби сабміту) */}
          {submitAttempted && !isPasswordValid && (
            <p className="error">Пароль не відповідає вимогам безпеки</p>
          )}

          {/* ❌ Backend помилка */}
          {error && <p className="error">{error}</p>}
          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Підтвердіть пароль"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (confirmPasswordError) {
                  setConfirmPasswordError("");
                }
              }}
              required
            />

            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? (
                /* 👁 */
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
                /* 🚫👁 */
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
          {confirmPasswordError && (
            <p className="error">{confirmPasswordError}</p>
          )}
          <button className="form-btn" type="submit" disabled={loading}>
            {loading ? "Збереження..." : "Зберегти пароль"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
