import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToSection = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return; // ⛔️ ВАЖЛИВО: без hash — нічого не робимо

    const id = hash.replace('#', '');
    const element = document.getElementById(id);

    if (element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 50);
    }
  }, [hash]);

  return null;
};

export default ScrollToSection;
