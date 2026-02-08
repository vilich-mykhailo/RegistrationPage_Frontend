// ResetPasswordPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPasswordPage.css";

function ResetPasswordPage() {
  const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true); // loading token check
  const [submitting, setSubmitting] = useState(false); // loading submit
  const [validToken, setValidToken] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const hasEnglishLetters = /[A-Za-z]/.test(password);
  const onlyLatinCharset =
    /^[A-Za-z0-9^_!@#$%^&*()+=\-[\]\\';,/{}|":<>?]+$/.test(password);

  const passwordMismatch = submitAttempted && password !== confirmPassword;

  // ===== PASSWORD RULES =====
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
    /^[A-Za-z0-9^_!@#$%^&*()+=\-[\]\\';,/{}|\":<>?]+$/.test(password);

  const isPasswordValid =
    passwordRules.length &&
    passwordRules.upper &&
    passwordRules.lower &&
    passwordRules.number &&
    passwordRules.symbol &&
    onlyEnglishLetters;

  const passwordsMatch =
    isPasswordValid &&
    password === confirmPassword &&
    confirmPassword.length > 0;

  const confirmInvalid =
    submitAttempted &&
    isPasswordValid && // 🔥 важливо
    !passwordsMatch;

  const passwordInvalid = submitAttempted && !isPasswordValid;
  // 🔥 CHECK TOKEN ON MOUNT
  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.get(
          `${API}/api/auth/check-reset-token/${token}`,
        );

        setValidToken(Boolean(res.data.valid));
      } catch {
        setValidToken(false);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [token]);

  // 🔄 LOADING TOKEN CHECK
  if (loading) {
    return (
      <div className="securemail-password-activation-wrapper">
        <div className="securemail-password-activation-card">
          <p>Перевіряємо посилання...</p>
        </div>
      </div>
    );
  }

  // ❌ INVALID TOKEN
  if (!validToken) {
    return (
    <div className="activation-wrapper">
      <div className="activation-card">
        <div className="activation-icon">🎉</div>

          <h1 className="activation-title">
            Посилання недійсне
          </h1>

          <p className="activation-text">
            Це посилання вже використано або термін його дії закінчився.
          </p>

          <button
            className="registration-submit-btn registration-btn"
            onClick={() => navigate("/forgot-password")}
          >
            Запросити нове
          </button>
        </div>
      </div>
    );
  }

  // ===== SUBMIT =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setError("");

    if (!isPasswordValid) {
      setError("Пароль не відповідає вимогам безпеки");
      return;
    }

    if (!passwordsMatch) {
      setError("Паролі не співпадають");
      return;
    }

    try {
      setSubmitting(true);

      await axios.post(`${API}/api/auth/reset-password/${token}`, { password });

      setSuccess(true);
    } catch (e) {
      setError(e.response?.data?.message || "Помилка зміни пароля");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ SUCCESS
  if (success) {
    return (
    <div className="activation-wrapper page">
      <div className="activation-card">
        <div className="activation-icon">🎉</div>

          <h1 className="activation-title">
            Пароль змінено
          </h1>

           <p className="activation-text">
            Тепер ви можете увійти з новим паролем
          </p>

          <button
            className="registration-submit-btn registration-btn"
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
    <div className="securemail-password-activation-wrapper">
      <div className="securemail-password-activation-card">
        <h1 className="securemail-password-activation-title">Новий пароль</h1>

        <form onSubmit={handleSubmit} noValidate>
          {/* PASSWORD */}
          <div className="securemail-password-password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Новий пароль"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (submitAttempted) setSubmitAttempted(false);
              }}
              className={`login-form-input ${
                submitAttempted &&
                (!isPasswordValid ||
                  (isPasswordValid &&
                    confirmPassword.length > 0 &&
                    password !== confirmPassword))
                  ? "input-error"
                  : ""
              }`}
              required
            />

            <button
              type="button"
              className="securemail-password-toggle-password"
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
          {submitAttempted && !isPasswordValid && (
            <p className="securemail-password-error">
              Пароль не відповідає вимогам безпеки
            </p>
          )}
          {/* HINTS */}
          <div className="securemail-password-reset-password-hints">
            <div className="securemail-password-password-hints">
              <p
                className={
                  passwordRules.length ? "ok" : submitAttempted ? "error" : ""
                }
              >
                • Щонайменше 8 символів
              </p>

              <p
                className={
                  passwordRules.upper ? "ok" : submitAttempted ? "error" : ""
                }
              >
                • Одна велика літера
              </p>

              <p
                className={
                  passwordRules.lower ? "ok" : submitAttempted ? "error" : ""
                }
              >
                • Одна мала літера
              </p>

              <p
                className={
                  passwordRules.number ? "ok" : submitAttempted ? "error" : ""
                }
              >
                • Одна цифра
              </p>

              <p
                className={
                  passwordRules.symbol ? "ok" : submitAttempted ? "error" : ""
                }
              >
                • Один спеціальний символ
              </p>

              <p
                className={
                  hasEnglishLetters ? "ok" : submitAttempted ? "error" : ""
                }
              >
                • Є латинські літери (A–Z)
              </p>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="securemail-password-password-field securemail-password-input-down">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Підтвердіть пароль"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (submitAttempted) setSubmitAttempted(false);
              }}
              className={`login-form-input ${
                submitAttempted &&
                isPasswordValid &&
                confirmPassword.length > 0 &&
                password !== confirmPassword
                  ? "input-error"
                  : ""
              }`}
              required
            />

            <button
              type="button"
              className="securemail-password-toggle-password"
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

          {/* ERRORS */}

          {submitAttempted &&
            isPasswordValid &&
            confirmPassword.length > 0 &&
            !passwordsMatch && (
              <p className="securemail-password-error">Паролі не співпадають</p>
            )}

          {submitAttempted &&
            isPasswordValid &&
            confirmPassword.length === 0 && (
              <p className="securemail-password-error">Підтвердіть пароль</p>
            )}

          {/* SUBMIT */}
          <button
            className="registration-submit-btn registration-btn"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Збереження..." : "Зберегти пароль"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
