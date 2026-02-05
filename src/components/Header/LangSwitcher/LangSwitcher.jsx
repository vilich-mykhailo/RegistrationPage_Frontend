import { useState, useRef, useEffect } from "react";
import './LangSwitcher.css'
const LangSwitcher = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // закриття при кліку поза блоком
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="nav-item nav-lang" ref={ref}>
      <button className="lang-current" onClick={() => setOpen(!open)}>
        UA <span className={`arrow ${open ? "open" : ""}`}>▾</span>
      </button>

      <ul className={`lang-dropdown ${open ? "show" : ""}`}>
        <li>ENG</li>
        <li>PL</li>
        <li>RUS</li>
      </ul>
    </div>
  );
};

export default LangSwitcher;
