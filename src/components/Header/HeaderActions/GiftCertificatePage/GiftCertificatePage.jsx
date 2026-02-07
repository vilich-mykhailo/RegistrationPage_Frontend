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

          {/* <h3 className="gift__section-title">Оберіть суму сертифіката</h3> */}

          {/* <div className="gift__prices">
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
          </div> */}

          {/* <div className="gift__custom">
            <span className="custom-label">або введіть свою суму:</span>
            <input
              type="text"
              placeholder="Наприклад, 1250"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
            />
          </div> */}

          {/* <div className="gift__action">
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
          </div> */}
        </div>

        {/* RIGHT */}
        <aside className="gift__terms">
  <div className="gift__motivation">
    <h3>Подарунок, який відчувається, а не просто дарується</h3>
    <p>
      Подарунковий сертифікат на масаж — це увага, турбота і час для себе.
      Це можливість зупинитись, розслабитись і відновити баланс тіла та думок
      у спокійній, комфортній атмосфері.
    </p>
    <p>
      Такий подарунок завжди доречний — для близької людини, колеги або навіть
      для себе. Без ризику не вгадати, без зайвих питань — лише приємні
      відчуття та реальна користь.
    </p>
  </div>

  <div className="gift__benefits">
    <h3>Вигода та зручність</h3>
    <ul>
      <li>✔ Не потрібно обирати конкретну процедуру — отримувач зробить це сам</li>
      <li>✔ Підходить для будь-якої події або без привʼязки до дати</li>
      <li>✔ Можливість доплатити різницю, якщо обрана послуга дорожча</li>
      <li>✔ Швидке оформлення — ідеально для подарунку “в останній момент”</li>
    </ul>
  </div>

  <div className="gift__conditions">
    <h2>Умови використання</h2>
    <ul>
      <li>
        Сертифікат дійсний протягом <strong>12 місяців</strong> з дати покупки.
      </li>
      <li>
        Якщо вартість послуги перевищує номінал сертифіката — різницю можна
        доплатити.
      </li>
      <li>
        Якщо вартість послуги менша — залишок не повертається.
      </li>
      <li>
        Сертифікат не іменний — його можна передарувати.
      </li>
    </ul>
  </div>

</aside>

      </div>
    </section>
  );
};

export default GiftCertificatePage;
