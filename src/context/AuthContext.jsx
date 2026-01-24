// AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const OFFLINE_TIMEOUT = 30 * 60 * 1000; // 30 хв

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    try {
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

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

  // 2️⃣ ПЕРЕВІРКА ПРИ СТАРТІ
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const lastClosedAt = localStorage.getItem("lastClosedAt");

    // 🔥 БЕЗПЕЧНИЙ PARSE
    let parsedUser = null;
    try {
      parsedUser = storedUser ? JSON.parse(storedUser) : null;
    } catch {
      parsedUser = null;
    }

    if (token && parsedUser) {
      if (!lastClosedAt) {
        setUser(parsedUser);
      } else {
        const offlineTime = Date.now() - Number(lastClosedAt);

        if (offlineTime <= OFFLINE_TIMEOUT) {
          setUser(parsedUser);
        } else {
          logout(); // ❌ сесія прострочена
        }
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.removeItem("lastClosedAt");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
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
