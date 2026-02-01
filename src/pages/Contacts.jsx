// src/pages/Contacts.jsx
import "./Contacts.css";

const Contacts = () => {
  return (
    <div className="contacts-container">
      <div className="contacts-card">
        <span className="contacts-card-icon">🏬</span>
        <h1 className="contacts-title">Контакти магазину</h1>

        <p className="contacts-text">
          Якщо у вас виникли питання або потрібна допомога- ми завжди на
          звʼязку 📞
        </p>

        <div className="contacts-list">
          <a
            href="https://t.me/vilich_m"
            target="_blank"
            rel="noopener noreferrer"
            className="contacts-btn"
          >
            💬 Написати в Telegram
          </a>
        </div>

        <p className="contacts-hint">
          Сторінка в розробці ✨
          <br /> Незабаром тут зʼявиться онлайн-чат та форма зворотного звʼязку.
        </p>
      </div>
    </div>
  );
};

export default Contacts;
