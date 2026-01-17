// src/pages/AccountActivationPage.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./AccountActivationPage.css";

function AccountActivationPage() {
  const { token } = useParams(); // ✅ ОДИН РАЗ, ЗОВНІ
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const activateAccount = async () => {
      try {
        await axios.get(
          `http://localhost:5000/api/auth/activate/${token}`
        );
        setStatus("success");
      } catch (e) {
        setStatus("error");
      }
    };

    activateAccount();
  }, [token]);

  if (status === "loading") {
    return <h2>⏳ Активація акаунту...</h2>;
  }

  if (status === "error") {
    return (
      <>
        <h2>❌ Помилка активації</h2>
        <p>Посилання недійсне або застаріле</p>
      </>
    );
  }

return (
  <div className="activation-wrapper">
    <div className="activation-card">
      <div className="activation-icon">🎉</div>

      <h1 className="activation-title">Реєстрація успішна</h1>
      <p className="activation-text">
        Ваш акаунт успішно активовано.
      </p>

      <Link to="/login" className="activation-button">
        Увійти
      </Link>
    </div>
  </div>
);
}

export default AccountActivationPage;
