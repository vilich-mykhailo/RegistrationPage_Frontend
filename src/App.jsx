import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import Contacts from "./pages/Contacts";
import AccountActivationPage from "./pages/AccountActivationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import PasswordChangedSuccess from "./pages/PasswordChangedSuccess";
import EmailChangedSuccess from "./pages/EmailChangedSuccess";
import EmailChangedInvalid from "./pages/EmailChangedInvalid";
import Messages from "./pages/pages-icon/Messages";
import Cart from "./pages/pages-icon/Cart";
import Favourites from "./pages/pages-icon/Favourites";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

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
        <Contacts />
      </ProtectedRoute>
    }
  />

  <Route
    path="/favourites"
    element={
      <ProtectedRoute>
        <Favourites />
      </ProtectedRoute>
    }
  />

  <Route
    path="/messages"
    element={
      <ProtectedRoute>
        <Messages />
      </ProtectedRoute>
    }
  />

  <Route
    path="/cart"
    element={
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    }
  />

  {/* 🌍 PUBLIC */}
  <Route path="/sign-up" element={<RegistrationPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/activate/:token" element={<AccountActivationPage />} />
  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
  <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
  <Route path="/password-changed-success" element={<PasswordChangedSuccess />} />
  <Route path="/email-changed-success" element={<EmailChangedSuccess />} />
  <Route path="/email-changed-invalid" element={<EmailChangedInvalid />} />

  {/* ❌ 404 */}
  <Route path="*" element={<NotFoundPage />} />
</Routes>

      </main>
    </>
  );
}

export default App;
