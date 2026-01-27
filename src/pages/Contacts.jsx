// src/pages/Contacts.jsx
import "./Contacts.css";

const Contacts = () => {
  return (
    <div className="contacts-container">
      <div className="contacts-card">
        <h1 className="contacts-title">Контакти магазину</h1>

        <p className="contacts-text">
          Якщо у вас виникли питання або потрібна допомога — ми завжди на звʼязку 📞
        </p>

        <div className="contacts-list">
          <div className="contact-item">
            <span className="contact-label">📍 Адреса:</span>
            <span className="contact-value">
              м. Київ, вул. Хрещатик, 21
            </span>
          </div>

          <div className="contact-item">
            <span className="contact-label">📞 Телефон:</span>
            <span className="contact-value">
              +38 (097) 732-29-70
            </span>
          </div>

          <div className="contact-item">
            <span className="contact-label">✉️ Email:</span>
            <span className="contact-value">
              support@myshop.ua
            </span>
          </div>

          <div className="contact-item">
            <span className="contact-label">🕘 Графік роботи:</span>
            <span className="contact-value">
              Пн–Пт: 9:00 – 18:00<br />
              Сб: 10:00 – 15:00<br />
              Нд: вихідний
            </span>
          </div>
        </div>

        <p className="contacts-hint">
          Сторінка в розробці ✨ Незабаром тут зʼявиться онлайн-чат та форма зворотного звʼязку.
        </p>
      </div>
    </div>
  );
};

export default Contacts;
