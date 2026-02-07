// src/pages/HomePage.jsx
import "./HomePage.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import MassagePickerModal from "./MassagePickerModal/MassagePickerModal";
import { contactsInfo } from "../../../../data/massageData";

/* ===== Види масажу ===== */
const types = [
  {
    title: "Все тіло",
    type: "body",
    img: "/images/HomePage/massage-type/massage-type-1.png",
    areas: ["Спина", "Ноги", "Обличчя", "Шия"],
    desc: "Глибокий масаж усього тіла для повного розслаблення.",
  },
  {
    title: "Спина та шия",
    type: "back",
    img: "/images/HomePage/massage-type/massage-type-2.png",
    areas: ["Спина", "Шия"],
    desc: "Зняття напруги та мʼязових затисків.",
  },
  {
    title: "Ноги та сідниці",
    type: "legs",
    img: "/images/HomePage/massage-type/massage-type-3.png",
    areas: ["Ноги", "Сідниці"],
    desc: "Покращення тонусу та кровообігу.",
  },
  {
    title: "Обличчя",
    type: "face",
    img: "/images/HomePage/massage-type/massage-type-4.png",
    areas: ["Обличчя"],
    desc: "Делікатний масаж для релаксу та сяйва шкіри.",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [isMassageOpen, setMassageOpen] = useState(false);
  const [selectedMassage, setSelectedMassage] = useState("");

  return (
    <section className="home-page-container">
      <section className="hero">
        <div className="hero-overlay" />

        <div className="hero-content center">
          <h1 className="hero-title">
            Місце, де тіло вчиться розслаблятися знову
          </h1>

          <div className="hero-brand">
            <span className="hero-hash">#WarmTouch</span>
          </div>

          <p className="hero-text">
            Зніми напругу з тіла, звільни голову від зайвого та подбай про себе
            з досвідченими майстрами.
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
            <button
              className="circle-btn"
              onClick={() => navigate("/certificates")}
            >
              ПЕРЕГЛЯНУТИ
            </button>
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

      <section id="massage-types" className="massage-type">
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

      <section id="teams" className="team">
        <div className="team__container">
          <h2 className="team__title">Наша команда масажистів</h2>
          <p className="team__subtitle">
            Досвід, освіта та уважне ставлення до кожного гостя — основа нашої
            роботи
          </p>

          <div className="team__grid">
            {/* 1 */}
            <article className="team__card">
              <div className="team__image">
                <img
                  src="/images/HomePage/teams/teams-1.png"
                  alt="Олена Кравчук"
                />
              </div>
              <h3 className="team__name">Андрій Данильчук</h3>
              <span className="team__age">32 роки</span>
              <p className="team__edu">
                Медична освіта, сертифікований масажист
              </p>
              <p className="team__desc">
                Спеціалізується на лікувальному та релаксаційному масажі. Вміє
                точно відчувати напругу в тілі та працювати з нею делікатно, але
                ефективно.
              </p>
              <span className="team__card__line" />
            </article>

            {/* 2 */}
            <article className="team__card">
              <div className="team__image">
                <img
                  src="/images/HomePage/teams/teams-2.png"
                  alt="Андрій Мельник"
                />
              </div>
              <h3 className="team__name">Віктор Власюк</h3>
              <span className="team__age">30 років</span>
              <p className="team__edu">
                Освіта з фізичної реабілітації, спортивний масаж
              </p>
              <p className="team__desc">
                Працює з глибокими мʼязами, відновленням після навантажень та
                хронічними затисками. Його масаж — це баланс сили й контролю.
              </p>
              <span className="team__card__line" />
            </article>

            {/* 3 */}
            <article className="team__card">
              <div className="team__image">
                <img
                  src="/images/HomePage/teams/teams-3.png"
                  alt="Марія Савчук"
                />
              </div>
              <h3 className="team__name">Олена Власова</h3>
              <span className="team__age">25 років</span>
              <p className="team__edu">
                Косметолог, спеціаліст з масажу обличчя
              </p>
              <p className="team__desc">
                Проводить масажі обличчя, лімфодренаж та ліфтинг-процедури.
                Працює мʼяко, точно та з увагою до кожної деталі.
              </p>
              <span className="team__card__line" />
            </article>

            {/* 4 */}
            <article className="team__card">
              <div className="team__image">
                <img
                  src="/images/HomePage/teams/teams-4.png"
                  alt="Ірина Бойко"
                />
              </div>
              <h3 className="team__name">Сергій Бардаков</h3>
              <span className="team__age">33 років</span>
              <p className="team__edu">
                Дипломований спеціаліст з лімфодренажу
              </p>
              <p className="team__desc">
                Допомагає зняти набряки, втому та відновити легкість у тілі. Її
                підхід — спокій, ритм і повна увага до самопочуття гостя.
              </p>
              <span className="team__card__line" />
            </article>
          </div>
          <section className="team-about">
            <div className="team-about__container">
              {/* LEFT — IMAGE */}
              <div className="team-about__image">
                <img
                  src="/images/HomePage/teams/teams.png"
                  alt="Команда масажистів IvRoxe"
                />
              </div>

              {/* RIGHT — CONTENT */}
              <div className="team-about__content">
                <h2 className="team-about__title">
                  Команда, яка постійно розвивається
                </h2>

                <p>
                  Ми — команда сертифікованих масажистів, яких об’єднує любов до
                  своєї справи та повага до кожного гостя. Для нас масаж — це не
                  набір технік, а тонка робота з тілом, самопочуттям і
                  внутрішнім станом людини.
                </p>

                <p>
                  Кожен спеціаліст постійно навчається, відвідує профільні
                  курси, майстер-класи та практикує нові методики. Ми
                  вдосконалюємо навички, обмінюємося досвідом всередині команди
                  та стежимо за сучасними підходами у сфері масажу та
                  реабілітації.
                </p>

                <p>
                  Саме тому наші процедури поєднують професіоналізм, безпеку та
                  індивідуальний підхід — щоб кожен візит приносив відчутний
                  результат і справжній відпочинок.
                </p>
              </div>
            </div>
          </section>
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
      <section className="contact-booking">
        <div className="contact-booking__container">
          {/* LEFT — CONTACTS */}
          <div className="contact-info">
            <h2 className="contact-info__title">Контакти</h2>

            <ul className="contact-info__list">
              {/* ADDRESS */}
              <li>
                <span className="label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 22s7-7.4 7-12a7 7 0 1 0-14 0c0 4.6 7 12 7 12z"
                      stroke="#9bcf6a"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="12"
                      cy="10"
                      r="2.5"
                      stroke="#9bcf6a"
                      strokeWidth="1.5"
                    />
                  </svg>
                  {contactsInfo.items.find((i) => i.id === "address").label}
                </span>
                <p>
                  {contactsInfo.items.find((i) => i.id === "address").value}
                </p>
              </li>

              {/* PHONE */}
              <li>
                <span className="label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7l.5 2.7a2 2 0 0 1-.5 1.8l-1.3 1.3a16 16 0 0 0 6.1 6.1l1.3-1.3a2 2 0 0 1 1.8-.5l2.7.5a2 2 0 0 1 1.7 2z"
                      stroke="#9bcf6a"
                      strokeWidth="1.5"
                    />
                  </svg>
                  {contactsInfo.items.find((i) => i.id === "phone").label}
                </span>
                <p>{contactsInfo.items.find((i) => i.id === "phone").value}</p>
              </li>

              {/* EMAIL */}
              <li>
                <span className="label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                      stroke="#9bcf6a"
                      strokeWidth="1.5"
                    />
                    <path d="M3 7l9 6 9-6" stroke="#9bcf6a" strokeWidth="1.5" />
                  </svg>
                  {contactsInfo.items.find((i) => i.id === "email").label}
                </span>
                <p>{contactsInfo.items.find((i) => i.id === "email").value}</p>
              </li>

              {/* TIME */}
              <li>
                <span className="label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="#9bcf6a"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M12 7v5l3 2"
                      stroke="#9bcf6a"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  {contactsInfo.items.find((i) => i.id === "time").label}
                </span>
                <p>{contactsInfo.items.find((i) => i.id === "time").value}</p>
              </li>
            </ul>
          </div>

          {/* RIGHT — BOOKING */}
          <div className="booking">
            <h2 className="booking__title">Залиште турботу про себе нам</h2>

            <form className="booking__form">
              <input type="text" placeholder="Ваше імʼя" />
              <input type="tel" placeholder="Номер телефону" />
              <input type="email" placeholder="Email" />
              <button
                type="button"
                className={`booking-button ${
                  selectedMassage ? "selected" : ""
                }`}
                onClick={() => setMassageOpen(true)}
              >
                <p>{selectedMassage || "Оберіть вид масажу"}</p>
              </button>
              <input type="hidden" name="massageType" value={selectedMassage} />

              <textarea placeholder="Примітка або побажання (необовʼязково)" />

              <div className="booking__confirm">
                <span>Отримати підтвердження:</span>
              </div>

              <button type="submit" className="booking__btn">
                ЗАПИСАТИСЬ
              </button>
            </form>
          </div>
        </div>
        <MassagePickerModal
          isOpen={isMassageOpen}
          onClose={() => setMassageOpen(false)}
          onSelect={(massage) => {
            setSelectedMassage(massage);
            setMassageOpen(false);
          }}
        />
      </section>
    </section>
  );
};

export default HomePage;
