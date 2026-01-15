// src/components/SuccessModal/SuccessModal.jsx
import { useNavigate } from "react-router-dom";
import "./SuccessModal.css";

const SuccessModal = ({ name }) => {
  const navigate = useNavigate();

  return (
    <div className="success-screen">
      <div className="success-card">
        <h2>🥳 Вітаємо! 🥳</h2>
        <p>🔥 {name}, реєстрація пройшла успішно 🔥</p>

        <button className="form-btn" onClick={() => navigate("/login")}>
          УВІЙТИ
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
