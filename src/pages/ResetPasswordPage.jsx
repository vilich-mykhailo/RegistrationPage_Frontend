// ResetPasswordPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPasswordPage.css";

function ResetPasswordPage() {
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
    password === confirmPassword && confirmPassword.length > 0;

  const passwordInvalid = submitAttempted && !isPasswordValid;
  const confirmInvalid = submitAttempted && !passwordsMatch;
  // 🔥 CHECK TOKEN ON MOUNT
  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/auth/check-reset-token/${token}`,
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
      <div className="securemail-password-activation-wrapper">
        <div className="securemail-password-activation-card">
          <div className="securemail-password-activation-icon">❌</div>

          <h1 className="securemail-password-activation-title">
            Посилання недійсне
          </h1>

          <p className="securemail-password-activation-text">
            Це посилання вже використано або термін його дії закінчився.
          </p>

          <button
            className="reset-password-submit-btn reset-password-btn"
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

      await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password },
      );

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
      <div className="securemail-password-activation-wrapper">
        <div className="securemail-password-activation-card">
          <div className="securemail-password-activation-icon">🎉</div>

          <h1 className="securemail-password-activation-title">
            Пароль змінено
          </h1>

          <p className="securemail-password-activation-text">
            Тепер ви можете увійти з новим паролем
          </p>

          <button
            className="reset-password-submit-btn reset-password-btn"
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
          
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
