import { useState } from "react";
import SuccessModal from "../../components/SuccessModal/SuccessModal";
import "./RegistrationPage.css";

const RegistrationPage = () => {
const API =
  process.env.REACT_APP_API_URL || "http://localhost:5000";


  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredName, setRegisteredName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const passwordMismatch =
    submitAttempted &&
    password &&
    confirmPassword &&
    password !== confirmPassword;

  // ===== VALIDATION =====
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /\d/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      englishOnly: /^[\x00-\x7F]*$/.test(password),
    };
  };

  const passwordRules = validatePassword(password);

  const hasPassword = password.length > 0;
  const hasLetters = /[A-Za-z\u0400-\u04FF]/.test(password);
  const onlyEnglishLetters = /^[\x00-\x7F]*$/.test(password);

  const isPasswordValid = Object.values(passwordRules).every(Boolean);

  // ===== SUBMIT =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    const newErrors = {};
    // 🔴 Імʼя
    if (!username.trim()) {
      newErrors.username = "Імʼя не може бути порожнім";
    }
    // 🔴 Email
    if (!email.trim()) {
      newErrors.email = "Email не може бути порожнім";
    } else if (!email.includes("@")) {
      newErrors.email = "Email має виглядати як name@example.com";
    } else if (!validateEmail(email)) {
      newErrors.email = "Email має виглядати як name@example.com";
    }

    if (!passwordRules.englishOnly) {
      newErrors.password =
        "Використовуйте лише англійські літери, цифри та символи.";
    } else if (!isPasswordValid) {
      newErrors.password =
        "Пароль повинен містити щонайменше 8 символів, одну велику та малу літеру, цифру і спеціальний символ";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Паролі не співпадають";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (isLoading) return;

    setErrors({});
    setIsLoading(true); // 🔥 ВМИКАЄМО LOADING

    const startTime = Date.now(); // ⏱️ старт таймера
    try {
      const res = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      // 🔥 ЧЕКАЄМО, ЩОБ МИНУЛО МІНІМУМ 1 СЕКУНДА
      const elapsed = Date.now() - startTime;
      const delay = Math.max(1000 - elapsed, 0);
      await new Promise((resolve) => setTimeout(resolve, delay));
      if (!res.ok) {
        if (data.message === "Електронна пошта вже існує") {
          setErrors({ email: data.message });
        } else {
          setErrors({ general: data.message });
        }
        return;
      }

      // ✅ УСПІХ → показуємо success-екран
      setRegisteredName(username); // 🔥 зберігаємо імʼя
      setShowSuccessModal(true);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch {
      setErrors({ general: "Помилка сервера. Спробуйте пізніше." });
    } finally {
      setIsLoading(false); // 🔥 ВИМИКАЄМО LOADING
    }
  };

  // ===== SUCCESS SCREEN =====
  if (showSuccessModal) {
    return (
      <div className="section-done">
        <SuccessModal name={registeredName} />
      </div>
    );
  }

  // ===== REGISTRATION FORM =====
  return (
    <div className="registration-section">
      <div className="registration-wrapper">
        <h1 className="registration-title">Реєстрація</h1>

        <form className="registration-form" onSubmit={handleSubmit} noValidate>
          <div className="registration-field">
            <input
              type="text"
              placeholder="Імʼя користувача*"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);

                if (submitAttempted) setSubmitAttempted(false);

                if (errors.username) {
                  setErrors((prev) => {
                    const copy = { ...prev };
                    delete copy.username;
                    return copy;
                  });
                }
              }}
              className={`registration-input ${
                errors.username ? "input-error" : ""
              }`}
            />
            {errors.username && (
              <p className="registration-error">{errors.username}</p>
            )}
          </div>

          <div className="registration-field">
            <input
              type="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                if (submitAttempted) setSubmitAttempted(false);

                if (errors.email) {
                  setErrors((prev) => {
                    const copy = { ...prev };
                    delete copy.email;
                    return copy;
                  });
                }
              }}
              className={`registration-input ${
                errors.email ? "input-error" : ""
              }`}
            />
            {errors.email && (
              <p className="registration-error">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="registration-field">
            <div className="registration-password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Пароль*"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (submitAttempted) setSubmitAttempted(false);
                  if (errors.password) {
                    setErrors((prev) => ({ ...prev, password: null }));
                  }
                }}
                className={`registration-input ${
                  errors.password || passwordMismatch
                    ? "input-error input-shake"
                    : ""
                }`}
              />

              <button
                type="button"
                className="registration-toggle-password"
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

            {/* PASSWORD HINTS */}
            <div className="registration-reset-password-hints">
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
                    !hasPassword || !hasLetters
                      ? ""
                      : onlyEnglishLetters
                        ? "ok"
                        : submitAttempted
                          ? "error"
                          : ""
                  }
                >
                  • Англійські літери (A–Z)
                </p>
              </div>
            </div>

            {errors.password && (
              <p className="registration-error">{errors.password}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="registration-field">
            <div className="registration-password-field">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Підтвердіть пароль*"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (submitAttempted) setSubmitAttempted(false);
                  if (errors.confirmPassword) {
                    setErrors((prev) => ({ ...prev, confirmPassword: null }));
                  }
                }}
                className={`registration-input ${
                  errors.confirmPassword || passwordMismatch
                    ? "input-error"
                    : ""
                }`}
              />

              <button
                type="button"
                className="registration-toggle-password"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
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

            {errors.confirmPassword && (
              <p className="registration-error ">{errors.confirmPassword}</p>
            )}
          </div>

          {errors.general && (
            <p className="registration-error registration-general-error">
              {errors.general}
            </p>
          )}

          <button
            className="registration-submit-btn registration-btn"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Реєстрація..." : "Зареєструватись"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
