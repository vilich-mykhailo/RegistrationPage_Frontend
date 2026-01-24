import { useNavigate } from "react-router-dom";
import "./ResetPasswordPage.css";

function EmailChangedInvalid() {
  const navigate = useNavigate();

  return (
    <div className="activation-wrapper">
      <div className="activation-card">
        <div className="activation-icon">❌</div>

        <h1 className="activation-title">Посилання недійсне</h1>

        <p className="activation-text">
          Це посилання застаріле або вже використане.
        </p>

        <button
          className="activation-button"
          onClick={() => navigate("/login")}
        >
          До входу
        </button>
      </div>
    </div>
  );
}

export default EmailChangedInvalid;
