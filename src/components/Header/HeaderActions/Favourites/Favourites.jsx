import { useState } from "react";
import "./Favourites.css";
import { useFavourites } from "../../../../context/FavouritesContext";
import LoginModal from "../LoginModal/LoginModal";

const Favourites = () => {
  const { favourites, toggleFavourite } = useFavourites();
  const [isLoginOpen, setLoginOpen] = useState(false);

  const isEmpty = favourites.length === 0;

  return (
    <>
      <section className="favourites-page">
        <h1 className="favourites-title">Обране</h1>

        {isEmpty ? (
          <div className="favourites-empty">
            <span className="favourites-empty-icon">❤️</span>

            <p className="favourites-empty-text">
              Ви ще не додали жодного масажу до обраного
            </p>

            <p className="favourites-empty-hint">
              Зберігайте улюблені процедури, щоб швидко повертатися до них ✨
            </p>
          </div>
        ) : (
          <div className="favourites-list">
            {favourites.map((item) => (
              <div key={item.title} className="massage-card">
                <div className="massage-info">
                  <h3>{item.title}</h3>
                  <span className="price">{item.price}</span>
                  <p>{item.desc}</p>

                  <div className="tags">
                    <button
                      className="fav-btn active"
                      onClick={() => toggleFavourite(item)}
                      aria-label="Remove from favourites"
                    >
                      ❤
                    </button>

                    {item.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ✅ КНОПКА ЗАРЕЗЕРВУВАТИ */}
                <button
                  type="button"
                  className="reserve-btn"
                  onClick={() => setLoginOpen(true)}
                >
                  ЗАРЕЗЕРВУВАТИ
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* LOGIN MODAL */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
      />
    </>
  );
};

export default Favourites;
