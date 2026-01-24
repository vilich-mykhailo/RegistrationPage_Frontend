import { useState } from "react";

function Modal({ open, onClose, children }) {
  const [mouseDownInside, setMouseDownInside] = useState(false);

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      onMouseUp={() => {
        // закриваємо тільки якщо клік почався НЕ у вікні
        if (!mouseDownInside) {
          onClose();
        }
        setMouseDownInside(false);
      }}
    >
      <div
        className="modal-window activation-card"
        onMouseDown={() => setMouseDownInside(true)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
