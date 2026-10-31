import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
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

// Inner component that knows the current route via useLocation
function AppRoutes({ onLogout, onLogin }) {
  const location = useLocation();
  // Don't show top navbar on Landing and Login pages (they have their own headers)
  const isAuthPage = location.pathname === "/" || location.pathname === "/login";

  return (
    <>
      {!isAuthPage && <Navbar onLogout={onLogout} />}

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login onLogin={onLogin} />} />

        {/* Portal app pages */}
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

// Main App component - sets up routing, theme, and loads default data
function App() {
  const [, setIsLoggedIn] = useState(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return Boolean(user && user.loggedIn);
    } catch {
      return false;
    }
  });

  // Load default data on first visit
  useEffect(() => {
    // Only load default events if no events exist in localStorage
    const existingEvents = localStorage.getItem("events");
    if (!existingEvents) {
      localStorage.setItem("events", JSON.stringify(defaultEvents));
    }

    // Only load default clubs if no clubs exist in localStorage
    const existingClubs = localStorage.getItem("clubs");
    if (!existingClubs) {
      localStorage.setItem("clubs", JSON.stringify(defaultClubs));
    }
  }, []);

  // Handle login
  function handleLogin() {
    setIsLoggedIn(true);
  }

  // Handle logout
  function handleLogout() {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes onLogout={handleLogout} onLogin={handleLogin} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

