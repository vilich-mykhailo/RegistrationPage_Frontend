/* MassagePage.jsx */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../../LoginModal/LoginModal";
import { useParams } from "react-router-dom";



import "./MassagePage.css";

import { TABS, DATA } from "../../../../../data/massageData";

/* ===== COMPONENT ===== */
const MassagePage = () => {
  const { type } = useParams();
  const [activeTab, setActiveTab] = useState("all");
  const [isLoginOpen, setLoginOpen] = useState(false); // 🔥


useEffect(() => {
  if (type && DATA[type]) {
    setActiveTab(type);
  } else {
    setActiveTab("all");
  }
}, [type]);
  return (
    <>
    <section className="massage-page page page-enter">
      <h2 className="massage-title">
        Від візиту вас відокремлює лише один крок —
        <br /> кнопка записатися!
      </h2>

      {/* Tabs */}
      <div className="massage-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`massage-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="massage-list">
        {DATA[activeTab].map((item, index) => (
          <div key={index} className="massage-card">
            <div className="massage-info">
              <h3>{item.title}</h3>
              <span className="price">{item.price}</span>
              <p>{item.desc}</p>

              <div className="tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

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
    </section>
    <LoginModal
  isOpen={isLoginOpen}
  onClose={() => setLoginOpen(false)}
/>
</>
  );
};

export default MassagePage;
