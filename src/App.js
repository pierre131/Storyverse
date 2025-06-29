import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebase-config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import EditStory from "./pages/EditStory";
import StoryDetails from "./pages/StoryDetails";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { useTranslation } from "react-i18next";

function AppContent() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { i18n, t } = useTranslation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsub();
  }, []);

  return (
    <Router>
      <nav className="navbar">
        <div className="nav-left">
          {user && <Link to="/">{t("home")}</Link>}
          {!user && <Link to="/signin">{t("sign_in")}</Link>}
          {!user && <Link to="/signup">{t("sign_up")}</Link>}
          {user && (
            <button onClick={() => signOut(auth)} className="nav-btn">
              🚪 {t("sign_out")}
            </button>
          )}
        </div>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <button onClick={toggleTheme} className="toggle-btn">
            {darkMode ? "🌞" : "🌙"}
          </button>
          <button onClick={() => i18n.changeLanguage("ar")}>🇸🇾</button>
          <button onClick={() => i18n.changeLanguage("en")}>🇬🇧</button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditStory /></ProtectedRoute>} />
        <Route path="/story/:id" element={<ProtectedRoute><StoryDetails /></ProtectedRoute>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      <ToastContainer position="top-center" />
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

