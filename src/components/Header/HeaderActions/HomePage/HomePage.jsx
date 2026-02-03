// src/pages/HomePage.jsx
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-card">
        <span className="home-card-icon">🛍️</span>
        <h1 className="home-title">Головна сторінка</h1>

        <p className="home-text">
          Тут буде відображатися каталог товарів та рекомендовані позиції
        </p>

        <p className="home-hint">
          Сторінка зараз у розробці ✨ <br />Скоро тут з’явиться повноцінний магазин.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
