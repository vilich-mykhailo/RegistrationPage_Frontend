// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

// ⏱️ скільки дозволено бути офлайн
const OFFLINE_TIMEOUT = 30 * 60 * 1000; // 30 хв

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1️⃣ ФІКСУЄМО МОМЕНТ ЗАКРИТТЯ ВКЛАДКИ
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("lastClosedAt", Date.now());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // 2️⃣ ПЕРЕВІРЯЄМО ПРИ СТАРТІ
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const lastClosedAt = localStorage.getItem("lastClosedAt");

    if (token && storedUser) {
      // якщо вкладку НЕ закривали (перший логін)
      if (!lastClosedAt) {
        setUser(JSON.parse(storedUser));
      } else {
        const offlineTime = Date.now() - Number(lastClosedAt);

        if (offlineTime <= OFFLINE_TIMEOUT) {
          // ✅ повернувся вчасно
          setUser(JSON.parse(storedUser));
        } else {
          // ⛔ був відсутній занадто довго
          logout();
        }
      }
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.removeItem("lastClosedAt"); // 🔥 скидаємо таймер
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("lastClosedAt");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
