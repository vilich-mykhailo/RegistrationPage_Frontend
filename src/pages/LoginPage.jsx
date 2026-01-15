// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ зберігаємо JWT
      localStorage.setItem("token", data.token);

      // 🔥 ПЕРЕДАЄМО КОРИСТУВАЧА
      login(data.user);

      // 🔥 переходимо на Home
      navigate("/");
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div className="section-login">
      <div className="form-wrapper">
        <h1>Log in</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="form-btn" type="submit">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
