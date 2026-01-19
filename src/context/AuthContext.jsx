// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const OFFLINE_TIMEOUT = 30 * 60 * 1000; // 30 хв

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);   // 👈 ДОДАЛИ TOKEN
  const [loading, setLoading] = useState(true);

  // 1️⃣ Фіксуємо момент закриття вкладки
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("lastClosedAt", Date.now());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // 2️⃣ При старті читаємо з localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const lastClosedAt = localStorage.getItem("lastClosedAt");

    if (savedToken && savedUser) {
      if (!lastClosedAt) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } else {
        const offlineTime = Date.now() - Number(lastClosedAt);

        if (offlineTime <= OFFLINE_TIMEOUT) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        } else {
          logout();
        }
      }
    }

    setLoading(false);
  }, []);

  // 🔹 LOGIN — ТУТ ГОЛОВНА ПРАВКА
  const login = (data) => {
    // data = { token, user }
    setToken(data.token);
    setUser(data.user);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.removeItem("lastClosedAt");
  };

  const logout = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("lastClosedAt");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,                // 👈 ТЕПЕР TOKEN ДОСТУПНИЙ ВСЮДИ
        setUser,
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
