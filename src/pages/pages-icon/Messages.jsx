import "./Messages.css";

const Messages = () => {
  return (
    <div className="messages-container">
      <div className="messages-card">
        <span className="messages-card-icon">🔔</span>
        <h1 className="messages-title">Повідомлення</h1>

        <p className="messages-text">
          Тут ви будете отримувати всі важливі повідомлення:
        </p>
        <p className="messages-hint">
          Наразі цей розділ ще в розробці 🚀
        </p>
      </div>
    </div>
  );
};

export default Messages;
