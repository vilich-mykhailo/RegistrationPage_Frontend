import "./Messages.css";

const Messages = () => {
  return (
    <div className="messages-container">
      <div className="messages-card">
        <h1 className="messages-title">Повідомлення</h1>

        <p className="messages-text">
          Тут ви будете отримувати всі важливі повідомлення:
        </p>

        <ul className="messages-list">
          <li>оновлення статусу замовлень</li>
          <li>персональні знижки та акції</li>
          <li>новини та оновлення сервісу</li>
        </ul>

        <p className="messages-hint">
          Наразі цей розділ ще в розробці 🚀
        </p>
      </div>
    </div>
  );
};

export default Messages;
