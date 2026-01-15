import { useState } from "react";
import SuccessModal from "../components/SuccessModal/SuccessModal";
import "./RegistrationPage.css";

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredName, setRegisteredName] = useState("");

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
  const onlyEnglishLetters = !/[А-Яа-яІіЇїЄєҐґ]/.test(password);

  const isPasswordValid = Object.values(passwordRules).every(Boolean);

  // ===== SUBMIT =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = "Введіть коректну email-адресу (має містити @)";
    }

    if (!passwordRules.englishOnly) {
      newErrors.password =
        "Використовуйте лише англійські літери, цифри та символи.";
    } else if (!isPasswordValid) {
      newErrors.password =
        "Пароль повинен містити щонайменше 8 символів, одну велику та малу літеру, цифру і спеціальний символ";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || { general: data.message });
        return;
      }

      // ✅ УСПІХ → показуємо success-екран
      setRegisteredName(username); // 🔥 зберігаємо імʼя
      setShowSuccessModal(true);
      setUsername("");
      setEmail("");
      setPassword("");
      setShowSuccessModal(true);
    } catch {
      setErrors({ general: "Помилка сервера. Спробуйте пізніше." });
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
    <div className="section-RegistrationPage">
      <div className="form-wrapper">
        <h1>Реєстрація</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Імʼя користувача"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <div className="field">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="field">
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

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

            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          {errors.general && <p className="error">{errors.general}</p>}

          <button className="form-btn" type="submit">
            Створити акаунт
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
