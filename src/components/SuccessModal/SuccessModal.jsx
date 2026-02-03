// src/components/SuccessModal/SuccessModal.jsx
import { useNavigate } from "react-router-dom";
import "./SuccessModal.css";

const SuccessModal = ({ name }) => {
  const navigate = useNavigate();

  return (
    <div className="success-screen">
      <div className="success-card">
        <h2 className="success-title">Майже готово 🚀</h2>
        <div className="success-info">
          <p>{name}, перевірте пошту 📩</p>
          <p>Ми надіслали лист для активації акаунту.</p>
          <p className="success-hint">
            Якщо листа немає — перевірте папку <b>«Спам»</b>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
