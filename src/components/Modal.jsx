import { useEffect, useRef } from "react";
import "./Modal.css";
const Modal = ({ open, onClose, children }) => {
  const overlayRef = useRef(null);
  const mouseDownOnOverlay = useRef(false);

  // 🔒 Блокуємо скрол
  // useEffect(() => {
  //   if (!open) return;

  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [open]);

  // ⌨️ ESC
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onMouseDown={(e) => {
        // 🔥 TRUE тільки якщо натиснули САМЕ НА ФОН
        mouseDownOnOverlay.current = e.target === overlayRef.current;
      }}
      onMouseUp={(e) => {
        // 🔒 Закриваємо ТІЛЬКИ якщо:
        // - mousedown був на overlay
        // - mouseup теж на overlay
        if (
          mouseDownOnOverlay.current &&
          e.target === overlayRef.current
        ) {
          onClose();
        }

        // скидаємо стан
        mouseDownOnOverlay.current = false;
      }}
    >
      <div
        className="modal-window"
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
      >
        {children}

        {/* ❌ КНОПКА ЗАКРИТТЯ */}
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default Modal;
