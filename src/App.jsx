import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Clubs from "./pages/Clubs";
import MyActivities from "./pages/MyActivities";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import { defaultEvents, defaultClubs } from "./data/events";

function AppRoutes({ onLogout, onLogin }) {
  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === "/login";

  return (
    <>
      {!isAuthPage && <Navbar onLogout={onLogout} />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login onLogin={onLogin} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/my-activities" element={<MyActivities />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

function App() {
  const [, setIsLoggedIn] = useState(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return Boolean(user && user.loggedIn);
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const existingEvents = localStorage.getItem("events");
    if (!existingEvents) {
      localStorage.setItem("events", JSON.stringify(defaultEvents));
    }

    const existingClubs = localStorage.getItem("clubs");
    if (!existingClubs) {
      localStorage.setItem("clubs", JSON.stringify(defaultClubs));
    }
  }, []);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  }

  return (
    <BrowserRouter>
      <AppRoutes onLogout={handleLogout} onLogin={handleLogin} />
    </BrowserRouter>
  );
}

export default App;
