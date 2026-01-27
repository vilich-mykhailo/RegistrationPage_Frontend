import "./Favourites.css";

const Favourites = () => {
  return (
    <div className="favourites-container">
      <div className="favourites-card">
        <h1 className="favourites-title">Обране</h1>
        <p className="favourites-text">
          Тут з’являться товари, які ви додасте до обраного ❤️
        </p>
        <p className="favourites-subtext">
          Ви зможете швидко знаходити улюблені позиції та повертатися до них у будь-який момент.
        </p>
        <p className="favourites-hint">
          Поки що цей розділ у розробці ✨
        </p>
      </div>
    </div>
  );
};

export default Favourites;
