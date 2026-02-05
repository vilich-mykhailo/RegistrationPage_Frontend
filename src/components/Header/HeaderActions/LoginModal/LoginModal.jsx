import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./LoginModal.css";
import LoginPage from "../../../../pages/Login/LoginPage";

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="login-overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="login-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <button className="login-close" onClick={onClose}>
              ✕
            </button>

<LoginPage
  onSuccess={onClose}
  onSignup={() => {
    onClose();
    setTimeout(() => {
      navigate("/sign-up");
    }, 400);
  }}
  onForgotPassword={() => {
    onClose();
    setTimeout(() => {
      navigate("/forgot-password");
    }, 400);
  }}
/>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal; // 🔥 ОБОВʼЯЗКОВО
