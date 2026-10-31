import { createContext, useState, useEffect } from "react";

// ThemeContext lets us share the dark/light theme across all components
// This demonstrates useContext from the React syllabus
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  // Load saved theme from localStorage, default to "light"
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "light";
  });

  // Toggle between light and dark theme
  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  // Apply theme class to the body element whenever theme changes
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
