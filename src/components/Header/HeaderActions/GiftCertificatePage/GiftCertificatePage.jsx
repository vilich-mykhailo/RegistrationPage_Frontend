import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GiftCertificatePage.css";

const PRESET_PRICES = [500, 800, 1000, 1500, 2000];

const GiftCertificatePage = () => {
  const [price, setPrice] = useState(1000);
  const [customPrice, setCustomPrice] = useState("");
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  const handleAdd = () => {
    setAdded(true);
  };

  const finalPrice = customPrice ? Number(customPrice) : price;

  return (
    <section className="gift">
      <div className="gift__container">
        {/* LEFT */}
        <div className="gift__product">
          <h1 className="gift__title">Подарунковий сертифікат на масаж</h1>
          {/* <p className="gift__subtitle">
            Універсальний подарунок, який дарує турботу, спокій і час для себе
          </p> */}

          <div className="gift__image">
            <img src="/images/certificates.png" alt="Gift certificate" />
          </div>

          <h3 className="gift__section-title">Оберіть суму сертифіката</h3>

          <div className="gift__prices">
            {PRESET_PRICES.map((p) => (
              <button
                key={p}
                className={`price-tile ${finalPrice === p ? "active" : ""}`}
                onClick={() => {
                  setPrice(p);
                  setCustomPrice("");
                }}
              >
                <span className="price-value">{p}</span>
                <span className="price-currency">грн</span>
              </button>
            ))}
          </div>

          <div className="gift__custom">
            <span className="custom-label">або введіть свою суму:</span>
            <input
              type="text"
              placeholder="Наприклад, 1250"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
            />
          </div>

          <div className="gift__action">
            {!added ? (
              <button className="gift__btn" onClick={handleAdd}>
                ДОДАТИ В КОШИК — {finalPrice} грн
              </button>
            ) : (
              <button
                className="gift__btn filled"
                onClick={() => navigate("/cart")}
              >
                ПЕРЕГЛЯНУТИ КОШИК
              </button>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <aside className="gift__terms">
          <div className="gift__motivation">
            <h3>Подарунок, який дійсно запам’ятається</h3>
            <p>
              Подарунковий сертифікат на масаж — це не просто річ, а турбота,
              яку відчувають тілом. Це час для себе, глибоке розслаблення,
              зняття напруги та відновлення внутрішнього балансу.
            </p>
            <p>
              Такий подарунок доречний завжди — для близької людини, колеги або
              навіть для себе. Без зайвих питань, без ризику не вгадати — лише
              приємні емоції та користь.
            </p>
          </div>
          <h2>Умови використання</h2>
          <ul>
            <li>
              Сертифікат дійсний протягом <strong>12 місяців</strong>.
            </li>
            <li>
              Якщо вартість послуги перевищує номінал — різницю можна доплатити.
            </li>
            <li>Якщо вартість послуги менша — залишок не повертається.</li>
            <li>
              Сертифікат можна отримати <strong>у салоні</strong> або
              <strong> PDF-файлом на email</strong>.
            </li>
            <li>Сертифікат не іменний — його можна передарувати.</li>
            <li>
              Ідеально підходить для подарунку без привʼязки до конкретної дати.
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
};

export default GiftCertificatePage;
