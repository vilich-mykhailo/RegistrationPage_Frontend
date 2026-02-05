import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./components/Header/HeaderActions/HomePage/HomePage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/Login/LoginPage";
import Contacts from "./components/Header/HeaderActions/Contacts/Contacts";
import AccountActivationPage from "./pages/RegistrationPage/AccountActivationPage/AccountActivationPage";
import ForgotPasswordPage from "./pages/Login/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./pages/Login/ForgotPasswordPage/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PasswordChangedSuccess from "./pages/ProfilePage/PasswordChange/PasswordChangedSuccess";
import EmailChangedSuccess from "./pages/EmailChange/EmailChangedSuccess";
import EmailChangedInvalid from "./pages/EmailChange/EmailChangedInvalid";
import Messages from "./components/Header/HeaderActions/Messages/Messages";
import Cart from "./components/Header/HeaderActions/Cart/Cart";
import Favourites from "./components/Header/HeaderActions/Favourites/Favourites";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import MassagePage from "./components/Header/HeaderActions/HomePage/MassagePage/MassagePage";

function App() {
  return (
    <>
    <Header />

      <main>
<Routes>
  {/* 🔐 PROTECTED */}
  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <ProfilePage />
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
  <Route path="/" element={<HomePage />} />
<Route path="/contacts" element={<Contacts />} />
<Route path="/massagePage" element={<MassagePage />} />
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
