import { Link } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="notfound-container page">
      <div className="notfound-card">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-text">
          Сторінку не знайдено 😕
        </p>
        <p className="notfound-subtext">
          Можливо, ви перейшли за неправильним посиланням або сторінка була видалена.
        </p>

        <Link to="/" className="notfound-submit-btn notfound-btn">
          НА ГОЛОВНУ
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
