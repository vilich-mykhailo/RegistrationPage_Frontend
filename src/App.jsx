import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import AccountActivationPage from "./pages/AccountActivationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          {/* 🔐 PROTECTED */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            }
          />

          {/* 🌍 PUBLIC */}
          <Route path="/sign-up" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/activate/:token" element={<AccountActivationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
