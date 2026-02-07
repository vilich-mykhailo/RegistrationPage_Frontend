import { useState, useEffect } from "react";
import { TABS, DATA } from "../../../../../data/massageData";
import "./MassagePickerModal.css";

const MassagePickerModal = ({ isOpen, onClose, onSelect, selectedMassage }) => {
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (isOpen) setActiveTab("all");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-picker-overlay" onClick={onClose}>
      <div
        className="modal-picker"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="modal-picker-title">Оберіть вид масажу</h3>

        {/* Tabs */}
        <div className="modal-picker-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`modal-picker-tab ${
                activeTab === tab.id ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="modal-picker-list">
          {DATA[activeTab].map((item) => (
            <div key={item.title} className="modal-picker-card">
              <div className="modal-picker-info">
                <h3>{item.title}</h3>
                <span className="modal-picker-price">{item.price}</span>
                <p>{item.desc}</p>

                <div className="modal-picker-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="modal-picker-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className={`modal-picker-btn ${
                  selectedMassage === item.title ? "selected" : ""
                }`}
                onClick={() => onSelect(item.title)}
              >
                {selectedMassage === item.title ? "ОБРАНО" : "ОБРАТИ"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MassagePickerModal;
