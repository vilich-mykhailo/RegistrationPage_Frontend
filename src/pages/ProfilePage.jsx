import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

import "./ProfilePage.css";

const ProfilePage = () => {
  const [dateError, setDateError] = useState(false);
  const { token, setUser, user } = useAuth();
  const [successMessage, setSuccessMessage] = useState(false);
  const [savedProfile, setSavedProfile] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
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
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    birth_date: "",
    gender: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [emailForm, setEmailForm] = useState({
    newEmail: "",
    confirmEmail: "",
  });

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

    // тільки цифри і крапки для дати
    if (name === "birth_date") {
      value = value.replace(/[^\d.]/g, "");

      // перевірка валідності дати
      if (value.length === 10) {
        setDateError(!isValidDate(value));
      } else {
        setDateError(false);
      }
    }

    const updatedProfile = {
      ...profile,
      [name]: value,
    };

    setProfile(updatedProfile);

    // 🔥 dirty-логіка з захистом
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
          {/* PASSWORD BLOCK */}
          <div className="profile-card">
            <h3 className="profile-title">Пароль</h3>

            <form className="profile-form">
              <input
                type="password"
                placeholder="Новий пароль*"
                value={passwordForm.password}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, password: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Повторіть пароль*"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value,
                  })
                }
              />

              <button type="button" className="profile-btn disabled">
                ЗБЕРЕГТИ
              </button>
            </form>
          </div>

          {/* EMAIL BLOCK */}
          <div className="profile-card">
            <h3 className="profile-title">Електронна пошта</h3>

            <form className="profile-form">
              <input
                placeholder="Нова пошта*"
                value={emailForm.newEmail}
                onChange={(e) =>
                  setEmailForm({ ...emailForm, newEmail: e.target.value })
                }
              />

              <input
                placeholder="Повторіть нову пошту"
                value={emailForm.confirmEmail}
                onChange={(e) =>
                  setEmailForm({
                    ...emailForm,
                    confirmEmail: e.target.value,
                  })
                }
              />

              <button type="button" className="profile-btn disabled">
                ЗБЕРЕГТИ
              </button>
            </form>
          </div>
        </div>
      </div>
      {successMessage && (
        <div className="success-toast">✅ Дані успішно збережено</div>
      )}
    </section>
  );
};

export default ProfilePage;
