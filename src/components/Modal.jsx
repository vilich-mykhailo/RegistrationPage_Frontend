import { useEffect } from "react";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  // 🔒 Блокуємо скрол фону
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // ⌨️ Закриття по ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // ❌ не закривати при кліку всередині
      >
        {children}

        {/* ❌ ЄДИНА КНОПКА ЗАКРИТТЯ — У КУТІ МАЛОГО ВІКНА */}
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default Modal;
