// ProfilePage.jsx //
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./ProfilePage.css";
import "./ResetPasswordPage.css";
import Modal from "../components/Modal.jsx";

const ProfilePage = () => {
  const [dateError, setDateError] = useState(false);
  const { user, login, logout } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [savedOnce, setSavedOnce] = useState(false);
  const token = localStorage.getItem("token");
  const [successMessage, setSuccessMessage] = useState(false);
  const [savedProfile, setSavedProfile] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [passwordRequestSuccess, setPasswordRequestSuccess] = useState(false);
  const [emailRequestSuccess, setEmailRequestSuccess] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [dateTouched, setDateTouched] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  

  const closeEmailModal = () => {
    setShowEmailForm(false);
    setEmailRequestSuccess(false);
    setError("");
    setLoading(false);
    setEmailForm({ newEmail: "", confirmEmail: "", password: "" }); // 🔥 ОЧИСТКА ПОЛІВ
  };
  const closePasswordModal = () => {
    setShowPasswordForm(false);
    setPasswordRequestSuccess(false);
    setError("");
    setLoading(false);
    setSubmitAttempted(false);
    setConfirmPasswordError("");
    setShowPassword(false);
    setShowConfirmPassword(false);

    // 🔥 ОЧИСТКА ФОРМИ
    setPasswordForm({
      oldPassword: "",
      password: "",
      confirmPassword: "",
    });
  };

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const passwordRules = {
    length: passwordForm.password.length >= 8,
    upper: /[A-Z]/.test(passwordForm.password),
    lower: /[a-z]/.test(passwordForm.password),
    number: /\d/.test(passwordForm.password),
    symbol: /[^A-Za-z0-9]/.test(passwordForm.password),
  };

  const hasPassword = passwordForm.password.length > 0;
  const hasLetters = /[A-Za-z]/.test(passwordForm.password);
  const onlyEnglishLetters =
    /^[A-Za-z0-9^_!@#$%^&*()+=\-[\]\\';,/{}|":<>?]+$/.test(
      passwordForm.password,
    );

  const isPasswordValid =
    passwordRules.length &&
    passwordRules.upper &&
    passwordRules.lower &&
    passwordRules.number &&
    passwordRules.symbol &&
    onlyEnglishLetters;

  const passwordsMatch =
    passwordForm.password === passwordForm.confirmPassword &&
    passwordForm.confirmPassword.length > 0;
  const formatPhone = (value, prevValue = "") => {
    // якщо користувач СТИРАЄ — нічого не форматуємо
    if (value.length < prevValue.length) {
      return value;
    }

    // залишаємо тільки цифри
    let digits = value.replace(/\D/g, "");

    // якщо все стерли — пусто
    if (digits.length === 0) {
      return "";
    }

    // 🔥 перша цифра → одразу +38(0 + ЦЯ ЦИФРА
    if (digits.length === 1) {
      return `+38(0${digits[0]}`;
    }

    // якщо почали з 0 — український номер
    if (digits.startsWith("0")) {
      digits = "38" + digits;
    }

    // якщо не починається з 38 — підставляємо
    if (!digits.startsWith("38")) {
      digits = "38" + digits;
    }

    // обмежуємо довжину (38 + 10 цифр)
    digits = digits.slice(0, 12);

    let formatted = "+38(0";

    const rest = digits.slice(3); // після 380

    // оператор
    if (rest.length >= 1) formatted += rest.slice(0, 2); // XX

    // 🔥 закриваємо дужку і ставимо дефіс
    if (rest.length >= 3) formatted += ")-" + rest.slice(2, 5); // )-XXX

    // далі стандартні блоки
    if (rest.length >= 6) formatted += "-" + rest.slice(5, 7); // -XX
    if (rest.length >= 8) formatted += "-" + rest.slice(7, 9); // -XX

    return formatted;
  };

  const isValidPhone = (value) => {
    const regex = /^\+38\(0\d{2}\)-\d{3}-\d{2}-\d{2}$/;
    return regex.test(value);
  };

  const isValidDate = (value) => {
    const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    const match = value.match(regex);

    if (!match) return false;

    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);

    const date = new Date(year, month - 1, day);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date > today) return false;

    const minYear = today.getFullYear() - 120;
    if (year < minYear) return false;

    return true;
  };

  const [profile, setProfile] = useState({
    first_name: "...",
    last_name: "...",
    phone: "...",
    address: "...",
    birth_date: "...",
    gender: "...",
  });

  const [emailForm, setEmailForm] = useState({
    newEmail: "",
    confirmEmail: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const loadedProfile = {
          first_name: res.data.first_name || "",
          last_name: res.data.last_name || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
          birth_date: res.data.birth_date
            ? res.data.birth_date.slice(0, 10).split("-").reverse().join(".")
            : "",

          gender: res.data.gender || "",
        };

        setProfile(loadedProfile);
        setSavedProfile(loadedProfile); // 👈 ЗАПАМʼЯТОВУЄМО ЯК ЗБЕРЕЖЕНИЙ СТАН
        setIsDirty(false); // 👈 кнопка одразу неактивна
      })
      .catch((err) => console.error("PROFILE LOAD ERROR:", err));
  }, [token]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    // 🔥 АВТОФОРМАТУВАННЯ ТЕЛЕФОНУ
    if (name === "phone") {
      updatedValue = formatPhone(value, profile.phone);

      // якщо редагують після помилки — ховаємо її
      if (phoneTouched) {
        setPhoneError(false);
      }
    }

    // 🔥 для дати — як уже зробили
    if (name === "birth_date" && dateTouched) {
      setDateError(false);
    }

    const updatedProfile = {
      ...profile,
      [name]: updatedValue,
    };

    setProfile(updatedProfile);

    // dirty-логіка
    let isDifferent = false;
    if (savedProfile) {
      isDifferent =
        JSON.stringify(updatedProfile) !== JSON.stringify(savedProfile);
    }

    setIsDirty(isDifferent);
    setSavedOnce(false);
  };

  const handleDateBlur = () => {
    setDateTouched(true);

    const value = profile.birth_date;

    if (!value || value === "") {
      setDateError(false);
      return;
    }

    if (value.length < 10) {
      setDateError(true);
      return;
    }

    if (!isValidDate(value)) {
      setDateError(true);
    } else {
      setDateError(false);
    }
  };

  const handlePhoneBlur = () => {
    setPhoneTouched(true);

    const value = profile.phone;

    if (!value || value === "") {
      setPhoneError(false);
      return;
    }

    if (!isValidPhone(value)) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true); // 🔥 почали зберігати
      setSavedOnce(false);
      const formattedProfile = {
        ...profile,
        birth_date: profile.birth_date
          ? profile.birth_date.split(".").reverse().join("-") // 12.03.1998 → 1998-03-12
          : null,
      };

      const res = await axios.put(
        "http://localhost:5000/api/auth/profile",
        formattedProfile,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const updated = {
        first_name: res.data.first_name || "",
        last_name: res.data.last_name || "",
        phone: res.data.phone || "",
        address: res.data.address || "",
        birth_date: res.data.birth_date
          ? res.data.birth_date.slice(0, 10).split("-").reverse().join(".")
          : "",
        gender: res.data.gender || "",
      };

      // 🔥 ОНОВЛЮЄМО USER В AUTH CONTEXT (ДЛЯ ХЕДЕРА)
      const updatedUser = {
        ...user,
        first_name: updated.first_name,
        last_name: updated.last_name,
      };

      // зберігаємо в context + localStorage
      login(updatedUser);

      setProfile(updated);
      setSavedProfile(updated);
      setIsDirty(false);

      // 🔥 показуємо "ЗБЕРЕЖЕНО"
      setSavedOnce(true);

      setSuccessMessage(true);
      // автоматично ховаємо через 3 секунди
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
    } catch (err) {
      console.error("PROFILE SAVE ERROR:", err);
      alert("Помилка збереження ❌");
    } finally {
      setIsSaving(false); // 🔥 завжди прибираємо loading
    }
  };

  return (
    <section className="profile-section">
      <div className="profile-container">
        {/* LEFT BLOCK — PERSONAL INFO */}
        <div className="profile-card">
          <h3 className="profile-title">👤 Персональна інформація</h3>

          <form onSubmit={handleProfileSubmit} className="profile-form">
            {/* ІМʼЯ */}
            <div className="profile-field">
              <span className="profile-icon">👤</span>
              <input
                name="first_name"
                placeholder="Ім'я*"
                value={profile.first_name}
                onChange={handleProfileChange}
              />
            </div>

            {/* ПРІЗВИЩЕ */}
            <div className="profile-field">
              <span className="profile-icon">🧑‍💼</span>
              <input
                name="last_name"
                placeholder="Прізвище*"
                value={profile.last_name}
                onChange={handleProfileChange}
              />
            </div>

            {/* EMAIL (READONLY) */}
            <div className="profile-field">
              <span className="profile-icon">📧</span>
              <input value={user?.email || ""} disabled placeholder="E-mail" />
            </div>

            {/* ДАТА НАРОДЖЕННЯ */}
            <div className="profile-field date-field">
              <div className="date-input-wrapper">
                <span className="profile-icon">📅</span>

                <input
                  type="text"
                  name="birth_date"
                  placeholder="ДД.ММ.РРРР"
                  value={profile.birth_date || ""}
                  onChange={handleProfileChange}
                  onBlur={handleDateBlur}
                  className={`profile-input ${
                    dateError && dateTouched ? "input-error" : ""
                  }`}
                />
              </div>

              {dateError && dateTouched && (
                <p className="date-error-text">
                  Невірний формат дати. Використовуйте ДД.ММ.РРРР
                </p>
              )}
            </div>

            {/* СТАТЬ */}
            <div className="profile-field custom-select">
              <span className="profile-icon">⚧️</span>

              <div
                className={`select-display ${genderOpen ? "open" : ""}`}
                onClick={() => setGenderOpen((prev) => !prev)}
              >
                {profile.gender === "male"
                  ? "Чоловіча"
                  : profile.gender === "female"
                    ? "Жіноча"
                    : profile.gender === "other"
                      ? "Інша"
                      : "Оберіть стать"}

                <span className="custom-arrow">▾</span>
              </div>

              {genderOpen && (
                <div className="select-dropdown">
                  <div
                    className="select-option"
                    onClick={() => {
                      setProfile({ ...profile, gender: "male" });
                      setGenderOpen(false);
                      setIsDirty(true);
                      setSavedOnce(false);
                    }}
                  >
                    Чоловіча
                  </div>

                  <div
                    className="select-option"
                    onClick={() => {
                      setProfile({ ...profile, gender: "female" });
                      setGenderOpen(false);
                      setIsDirty(true);
                      setSavedOnce(false);
                    }}
                  >
                    Жіноча
                  </div>

                  <div
                    className="select-option"
                    onClick={() => {
                      setProfile({ ...profile, gender: "other" });
                      setGenderOpen(false);
                      setIsDirty(true);
                      setSavedOnce(false);
                    }}
                  >
                    Інша
                  </div>
                </div>
              )}
            </div>

            {/* ТЕЛЕФОН */}
            <div className="profile-field">
              <span className="profile-icon">📞</span>

              <input
                name="phone"
                placeholder="+38(0__)-___-__-__"
                value={profile.phone}
                onChange={handleProfileChange}
                onBlur={handlePhoneBlur}
                className={`profile-input ${
                  phoneError && phoneTouched ? "input-error" : ""
                }`}
              />
            </div>

            {phoneError && phoneTouched && (
              <p className="date-error-text">
                Необхідно вказати номер у форматі: +38(097)-777-77-77
              </p>
            )}

            {/* КНОПКА */}
            <button
              type="submit"
              className={`profile-btn ${!isDirty || dateError || isSaving ? "disabled" : ""}`}
              disabled={!isDirty || dateError || isSaving}
            >
              {isSaving
                ? "ЗБЕРІГАЄТЬСЯ..."
                : savedOnce
                  ? "ЗБЕРЕЖЕНО ✓"
                  : "ЗБЕРЕГТИ"}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN */}
        <div className="profile-right">
          {/* SECURITY ACTIONS */}
          <div className="profile-card security-card">
            <h3 className="profile-title">Безпека</h3>
            <div
              className="security-item"
              onClick={() => {
                setShowPasswordForm(true);
                setShowEmailForm(false);

                // 🔥 повний reset перед відкриттям
                setPasswordForm({
                  oldPassword: "",
                  password: "",
                  confirmPassword: "",
                });

                setSubmitAttempted(false);
                setConfirmPasswordError("");
                setError("");
                setPasswordRequestSuccess(false);
              }}
            >
              <div className="security-icon">🔑</div>
              <div className="security-text">
                <div className="security-title">Змінити пароль</div>
                <div className="security-subtitle">
                  Оновіть пароль для підвищення безпеки
                </div>
              </div>
              <div className="security-arrow">›</div>
            </div>
            <div
              className="security-item"
              onClick={() => {
                setShowEmailForm(true);
                setShowPasswordForm(false);

                setEmailForm({ newEmail: "", confirmEmail: "" });
                setError("");
                setEmailRequestSuccess(false);
              }}
            >
              <div className="security-icon">✉️</div>
              <div className="security-text">
                <div className="security-title">Змінити електронну пошту</div>
                <div className="security-subtitle">
                  Змінити адресу для входу в акаунт
                </div>
              </div>
              <div className="security-arrow">›</div>
            </div>
            {/* 🔴 LOGOUT */}{" "}
            <div className="security-item logout-item" onClick={() => logout()}>
              {" "}
              <div className="security-icon logout-icon">🚪</div>{" "}
              <div className="security-text">
                {" "}
                <div className="security-title logout-title">
                  Вийти з акаунта
                </div>{" "}
                <div className="security-subtitle logout-subtitle">
                  {" "}
                  Завершити поточну сесію{" "}
                </div>{" "}
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
      {successMessage && (
        <div className="success-toast">✅ Дані успішно збережено</div>
      )}
      {/* ===== PASSWORD MODAL (RESET STYLE) ===== */}
      <Modal
        open={showPasswordForm}
        onClose={() => {
          setShowPasswordForm(false);
          setPasswordRequestSuccess(false);

          // 🔥 ЧИСТИМО ВСЕ
          setPasswordForm({
            oldPassword: "",
            password: "",
            confirmPassword: "",
          });

          setSubmitAttempted(false);
          setConfirmPasswordError("");
          setError("");
          setShowPassword(false);
          setShowConfirmPassword(false);
        }}
      >
        {passwordRequestSuccess ? (
          /* 🔥 SUCCESS SCREEN */

          <div>
            <div className="activation-icon">📩</div>
            <h1 className="activation-title">Перевірте пошту</h1>
            <p className="activation-text">
              Ми надіслали лист для підтвердження зміни пароля.
              <br />
              Якщо листа немає — перевірте папку <b>«Спам»</b>.
            </p>

            <button
              className="security-password-submit-btn security-password-btn"
              onClick={closePasswordModal}
            >
              Готово
            </button>
          </div>
        ) : (
          /* 🔐 ФОРМА ЗМІНИ ПАРОЛЯ */
          <form
            className="security-reset-form"
            onSubmit={async (e) => {
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
                  "http://localhost:5000/api/auth/request-change-password",
                  {
                    oldPassword: passwordForm.oldPassword,
                    newPassword: passwordForm.password,
                  },
                  { headers: { Authorization: `Bearer ${token}` } },
                );

                // 🔥 ПОКАЗУЄМО SUCCESS ЕКРАН
                setPasswordRequestSuccess(true);

                // чистимо форму
                setPasswordForm({
                  oldPassword: "",
                  password: "",
                  confirmPassword: "",
                });
              } catch (e) {
                setError(e.response?.data?.message || "Помилка зміни пароля");
              } finally {
                setLoading(false);
              }
            }}
          >
            {/* 🔹 СТАРИЙ ПАРОЛЬ */}
            <div className="security-password-field">
              <input
                type="password"
                placeholder="Старий пароль*"
                value={passwordForm.oldPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    oldPassword: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* 🔹 НОВИЙ ПАРОЛЬ */}
            <div className="security-password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Новий пароль*"
                value={passwordForm.password}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    password: e.target.value,
                  })
                }
                required
              />
              <button
                type="button"
                className="security-toggle-password"
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

            {/* 🔹 ПРАВИЛА ПАРОЛЯ (ЯК У RESET) */}
            <div className="security-reset-password-hints">
              <div className="security-password-hints">
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

            {submitAttempted && !isPasswordValid && (
              <p className="error">Пароль не відповідає вимогам безпеки</p>
            )}

            {error && <p className="error">{error}</p>}

            {/* 🔹 ПІДТВЕРДЖЕННЯ */}
            <div className="security-password-field">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Підтвердіть пароль*"
                value={passwordForm.confirmPassword}
                onChange={(e) => {
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value,
                  });
                  if (confirmPasswordError) setConfirmPasswordError("");
                }}
                required
              />

              <button
                type="button"
                className="security-toggle-password"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
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

            <button
              className="security-password-submit-btn security-password-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Надсилання..." : "Змінити пароль"}
            </button>
          </form>
        )}

        {/* ❌ КНОПКА ЗАКРИТТЯ */}
        <button className="modal-close" onClick={closePasswordModal}>
          ✕
        </button>
      </Modal>

      {/* ===== EMAIL MODAL ===== */}
      <Modal
        open={showEmailForm}
        onClose={closeEmailModal} // 🔥 ОТ ТУТ ГОЛОВНИЙ ФІКС
      >
        {emailRequestSuccess ? (
          /* 🔥 SUCCESS SCREEN */
          <div>
            <div className="activation-icon">📩</div>
            <h1 className="activation-title">Перевірте пошту</h1>
            <p className="activation-text">
              Ми надіслали лист на <b>вашу нову електронну адресу</b> для
              підтвердження зміни пошти.
              <br />
              Якщо листа немає — перевірте папку <b>«Спам»</b>.
            </p>

            <button
              className="security-email-submit-btn security-email-btn"
              onClick={closeEmailModal}
            >
              Готово
            </button>
          </div>
        ) : (
          /* ✉️ FORM */
          <>
            <h1 className="activation-title">Зміна електронної пошти</h1>

            <form
              className="security-email-reset-form"
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                setError("");

                if (!emailForm.password) {
                  setError("Введіть пароль для підтвердження");
                  setLoading(false);
                  return;
                }

                if (!emailForm.newEmail || !emailForm.confirmEmail) {
                  setError("Заповніть всі поля");
                  setLoading(false);
                  return;
                }

                if (emailForm.newEmail !== emailForm.confirmEmail) {
                  setError("Пошти не співпадають");
                  setLoading(false);
                  return;
                }

                try {
                  if (!token) {
                    setError("Сесія закінчилась. Увійдіть знову.");
                    setLoading(false);
                    return;
                  }

                  await axios.post(
                    "http://localhost:5000/api/auth/request-change-email",
                    {
                      newEmail: emailForm.newEmail,
                      confirmEmail: emailForm.confirmEmail,
                      password: emailForm.password, // 🔥 ОЦЕ ГОЛОВНЕ
                    },
                    {
                      headers: { Authorization: `Bearer ${token}` },
                    },
                  );

                  // 🔥 показуємо success-екран
                  setEmailRequestSuccess(true);

                  // чистимо форму
                  setEmailForm({ newEmail: "", confirmEmail: "" });
                } catch (e) {
                  setError(e.response?.data?.message || "Помилка зміни пошти");
                } finally {
                  setLoading(false);
                }
              }}
            >
              <div className="security-email-password-field">
                <input
                  type="password"
                  placeholder="Пароль*"
                  value={emailForm.password}
                  onChange={(e) =>
                    setEmailForm({ ...emailForm, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="security-email-password-field">
                <input
                  type="email"
                  placeholder="Нова пошта*"
                  value={emailForm.newEmail}
                  onChange={(e) =>
                    setEmailForm({ ...emailForm, newEmail: e.target.value })
                  }
                  required
                />
              </div>
              <div className="security-email-password-field">
                <input
                  type="email"
                  placeholder="Повторіть нову пошту*"
                  value={emailForm.confirmEmail}
                  onChange={(e) =>
                    setEmailForm({
                      ...emailForm,
                      confirmEmail: e.target.value,
                    })
                  }
                  required
                />
              </div>
              {error && <p className="error">{error}</p>}

              <button
                className="security-email-submit-btn security-email-btn"
                type="submit"
                disabled={loading}
              >
                {loading ? "Надсилання..." : "Зберегти пошту"}
              </button>
            </form>
            <button className="modal-close" onClick={closeEmailModal}>
              ✕
            </button>
          </>
        )}
      </Modal>
    </section>
  );
};

export default ProfilePage;
