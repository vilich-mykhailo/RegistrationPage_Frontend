import "./Messages.css";

const messagesData = [
  {
    id: 1,
    title: "🌸 Весняна пропозиція",
    text: "Отримайте -15% на будь-який масаж цієї весни 🌿 Промокод: SPRING15",
    date: "03.03.2026",
    unread: true,
  },
  {
    id: 2,
    title: "🎁 Подарунок для вас",
    text: "Ми підготували для вас приємний бонус — безкоштовний арома-ритуал до наступного візиту.",
    date: "26.02.2026",
    unread: true,
  },
  {
    id: 3,
    title: "💆 Нагадування про турботу",
    text: "Ви давно не були у нас. Саме час подарувати тілу розслаблення та баланс 🤍",
    date: "14.02.2026",
    unread: false,
  },
  {
    id: 4,
    title: "✅ Запис підтверджено",
    text: "Ваш запис на масаж успішно підтверджено. Чекаємо вас у зручний для вас час.",
    date: "02.02.2026",
    unread: false,
  },
];

const Messages = () => {
  return (
    <section className="messages-page">
      <div className="messages-container">
        <h1 className="messages-title">Повідомлення</h1>

        <div className="messages-list">
          {messagesData.map((msg) => (
            <div
              key={msg.id}
              className={`message-card ${msg.unread ? "unread" : ""}`}
            >
              <div className="message-header">
                <h3>{msg.title}</h3>
                <span className="message-date">{msg.date}</span>
              </div>

              <p className="message-text">{msg.text}</p>

              {msg.unread && <span className="message-dot" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Messages;
