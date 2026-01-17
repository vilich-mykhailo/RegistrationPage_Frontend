import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import AccountActivationPage from "./pages/AccountActivationPage";

function App() {
  return (
    <>
      <Header />

      <main >
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
          <Route
            path="/activate/:token"
            element={<AccountActivationPage />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
