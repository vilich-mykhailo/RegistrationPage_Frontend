// src/pages/HomePage.jsx
import "./HomePage.css";
import { NavLink, useNavigate  } from "react-router-dom";

/* ===== Види масажу ===== */
const types = [
  {
    title: "Все тіло",
    type: "body",
    img: "/images/image-offers-1.png",
    areas: ["Спина", "Ноги", "Обличчя", "Шия"],
    desc: "Глибокий масаж усього тіла для повного розслаблення.",
  },
  {
    title: "Спина та шия",
    type: "back",
    img: "/images/image-offers-2.png",
    areas: ["Спина", "Шия"],
    desc: "Зняття напруги та мʼязових затисків.",
  },
  {
    title: "Ноги та сідниці",
    type: "legs",
    img: "/images/image-offers-3.png",
    areas: ["Ноги", "Сідниці"],
    desc: "Покращення тонусу та кровообігу.",
  },
  {
    title: "Обличчя",
    type: "face",
    img: "/images/image-offers-4.png",
    areas: ["Обличчя"],
    desc: "Делікатний масаж для релаксу та сяйва шкіри.",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <section className="home-page-container">
      <section className="hero">
        <div className="hero-overlay" />

        <div className="hero-content center">
          <h1 className="hero-title">
            Відчуй близькість природи <br />
            <span>в салонах масажу</span>
          </h1>

          <div className="hero-brand">
            <span className="hero-hash">#ivRoxe</span>
            <span className="hero-name">IvRoxe</span>
          </div>

          <p className="hero-text">
            Розслаб тіло, звільни розум і подбай про фігуру разом з досвідченими
            масажистами.
          </p>
          <NavLink to="/massagePage" className="hero-button">
            Онлайн запис
          </NavLink>
        </div>
      </section>
      <div className="services-line">
        <div className="services-track">
          <span>Спортивний масаж</span>
          <span>Лікувальний масаж банками</span>
          <span>Лімфодренажний масаж</span>
          <span>Антицелюлітний масаж</span>
          <span>Пресотерапія</span>
          <span>Масаж релаксаційний</span>
          <span>Фітобочка</span>
          <span>Масаж гарячим камінням</span>
          <span>Масаж в 4 руки</span>
          <span>Масаж обличчя Кобідо</span>

          {/* дубль для безшовної анімації */}
          <span>Спортивний масаж</span>
          <span>Лікувальний масаж банками</span>
          <span>Лімфодренажний масаж</span>
          <span>Антицелюлітний масаж</span>
          <span>Пресотерапія</span>
          <span>Масаж релаксаційний</span>
          <span>Фітобочка</span>
          <span>Масаж гарячим камінням</span>
          <span>Масаж в 4 руки</span>
          <span>Масаж обличчя Кобідо</span>
        </div>
      </div>
      <section className="offers">
        <div className="offers-grid">
          {/* TOP LEFT – IMAGE */}
          <div className="offer image image-1" />

          {/* TOP RIGHT – VOUCHER */}
          <div className="offer content">
            <span className="badge">ПОДАРУНОК ІЗ ТУРБОТОЮ</span>
            <h2 className="badge-title">Подарунковий сертифікат на масаж</h2>
            <p className="badge-text">
              простий спосіб подарувати спокій, відновлення та приємні відчуття
            </p>
            <button className="circle-btn">ПРИДБАТИ</button>
          </div>

          {/* BOTTOM RIGHT – ACTION */}
          <div className="offer content">
            <span className="badge">АКЦІЯ МІСЯЦЯ</span>
            <h2 className="badge-title">Масаж релаксаційний для двох</h2>
            <p className="badge-text">
              розслабляючий масаж усієї задньої поверхні тіла для двох
            </p>
            <div className="price-accent">
              1099 грн <span>1450 грн</span>
            </div>
            <button className="circle-btn">ЗАРЕЗЕРВУВАТИ</button>
          </div>

          {/* BOTTOM LEFT – PROMO */}
          <div className="offer image image-2">
            {/* <div className="promo">
              <h3>
                РЕЛАКС
                <br />
                ДЛЯ ДВОХ
              </h3>
              <div className="price">
                <span className="new">299 zł</span>
                <span className="old">340 zł</span>
              </div>
              <span className="promo-code">З КОДОМ: RAZEM</span>
            </div> */}
          </div>
        </div>
        {/* <div className="offer image image-2">
          <div className="promo">
            <h3>
              РЕЛАКС
              <br />
              ДЛЯ ДВОХ
            </h3>
            <div className="price">
              <span className="new">299 zł</span>
              <span className="old">340 zł</span>
            </div>
            <span className="promo-code">З КОДОМ: RAZEM</span>
          </div>
        </div> */}
      </section>
      <div className="services-line">
        <div className="services-track">
          <span>Спортивний масаж</span>
          <span>Лікувальний масаж банками</span>
          <span>Лімфодренажний масаж</span>
          <span>Антицелюлітний масаж</span>
          <span>Пресотерапія</span>
          <span>Масаж релаксаційний</span>
          <span>Фітобочка</span>
          <span>Масаж гарячим камінням</span>
          <span>Масаж в 4 руки</span>
          <span>Масаж обличчя Кобідо</span>

          {/* дубль для безшовної анімації */}
          <span>Спортивний масаж</span>
          <span>Лікувальний масаж банками</span>
          <span>Лімфодренажний масаж</span>
          <span>Антицелюлітний масаж</span>
          <span>Пресотерапія</span>
          <span>Масаж релаксаційний</span>
          <span>Фітобочка</span>
          <span>Масаж гарячим камінням</span>
          <span>Масаж в 4 руки</span>
          <span>Масаж обличчя Кобідо</span>
        </div>
      </div>

      <section className="massage-type">
        <h2 className="massage-type__title">Види масажу</h2>

        <div className="massage-type__grid">
  {types.map((item) => (
    <article
      key={item.title}
      className="massage-type__card"
      onClick={() => navigate(`/massage/${item.type}`)}
    >
      <div className="massage-type__image">
        <img src={item.img} alt={item.title} />
      </div>

      <h3 className="massage-type__card-title">{item.title}</h3>

      <div className="massage-type__tags">
        {item.areas.map((area) => (
          <span key={area} className="massage-type__tag">
            {area}
          </span>
        ))}
      </div>

      <p className="massage-type__desc">{item.desc}</p>

      <span className="massage-type__line" />
    </article>
  ))}
</div>
      </section>
    </section>
  );
};

export default HomePage;
