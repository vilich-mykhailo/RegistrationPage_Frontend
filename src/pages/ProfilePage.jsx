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

  const token = localStorage.getItem("token");
  const [successMessage, setSuccessMessage] = useState(false);
  const [savedProfile, setSavedProfile] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [passwordRequestSuccess, setPasswordRequestSuccess] = useState(false);
  const [emailRequestSuccess, setEmailRequestSuccess] = useState(false);

  const closeEmailModal = () => {
    setShowEmailForm(false);
    setEmailRequestSuccess(false);
    setError("");
    setLoading(false);
    setEmailForm({ newEmail: "", confirmEmail: "" }); // 🔥 ОЧИСТКА ПОЛІВ
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

  const isValidDate = (value) => {
    // формат ДД.ММ.РРРР
    const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    const match = value.match(regex);

    if (!match) return false;

    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);

    const date = new Date(year, month - 1, day);

    // перевірка, що дата реально існує
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // ❌ не можна в майбутньому
    if (date > today) return false;

    // 🔹 (опціонально) не старше 120 років
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
    let { name, value } = e.target;

    // 🔥 для дати — дозволяємо тільки цифри і крапки
    if (name === "birth_date") {
      value = value.replace(/[^\d.]/g, "");

      // перевіряємо тільки коли введено 10 символів (ДД.ММ.РРРР)
      if (value.length === 10) {
        setDateError(!isValidDate(value));
      } else {
        setDateError(false); // поки вводить — не лякаємо
      }
    }

    const updatedProfile = {
      ...profile,
      [name]: value,
    };

    setProfile(updatedProfile);

    // dirty-логіка
    let isDifferent = false;
    if (savedProfile) {
      isDifferent =
        JSON.stringify(updatedProfile) !== JSON.stringify(savedProfile);
    }

    setIsDirty(isDifferent);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
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

      setIsDirty(false); // 🔥 кнопка знову стає неактивна

      setSuccessMessage(true);

      // автоматично ховаємо через 3 секунди
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
    } catch (err) {
      console.error("PROFILE SAVE ERROR:", err);
      alert("Помилка збереження ❌");
    }
  };

  return (
    <section className="profile-section">
      <div className="profile-container">
        {/* LEFT BLOCK — PERSONAL INFO */}
        <div className="profile-card">
          <h3 className="profile-title">Персональна інформація</h3>

          <form onSubmit={handleProfileSubmit} className="profile-form">
            <input
              name="first_name"
              placeholder="Ім'я*"
              value={profile.first_name}
              onChange={handleProfileChange}
            />

            <input
              name="last_name"
              placeholder="Прізвище*"
              value={profile.last_name}
              onChange={handleProfileChange}
            />

            <input value={user?.email || ""} disabled placeholder="E-mail" />

            <div className="date-field">
              <input
                type="text"
                name="birth_date"
                placeholder="ДД.ММ.РРРР"
                value={profile.birth_date || ""}
                onChange={handleProfileChange}
                className={`profile-input ${dateError ? "input-error" : ""}`}
              />

              {dateError && (
                <p className="error-text">Невірна дата. Формат: ДД.ММ.РРРР</p>
              )}
            </div>

            <select
              name="gender"
              value={profile.gender || ""}
              onChange={handleProfileChange}
            >
              <option value="">Оберіть стать</option>
              <option value="male">Чоловіча</option>
              <option value="female">Жіноча</option>
              <option value="other">Інша</option>
            </select>

            <input
              name="phone"
              placeholder="Номер телефона"
              value={profile.phone}
              onChange={handleProfileChange}
            />

            <button
              type="submit"
              className={`profile-btn ${!isDirty || dateError ? "disabled" : ""}`}
              disabled={!isDirty || dateError}
            >
              ЗБЕРЕГТИ
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

            <button className="security-form-btn" onClick={closePasswordModal}>
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
              className="security-form-btn"
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

            <button className="security-form-btn" onClick={closeEmailModal}>
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

                if (
                  !emailForm.newEmail ||
                  emailForm.newEmail !== emailForm.confirmEmail
                ) {
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
                className="security-email-form-btn"
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
