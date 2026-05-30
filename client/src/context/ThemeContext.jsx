import {
  createContext,
  useState,
  useEffect,
} from "react";

export const ThemeContext =
  createContext();

export const ThemeProvider = ({
  children,
}) => {
  const [darkMode,
    setDarkMode] =
    useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem(
        "darkMode"
      );

    if (savedTheme) {
      setDarkMode(
        JSON.parse(
          savedTheme
        )
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(
        darkMode
      )
    );

    if (darkMode) {
      document.body.classList.add(
        "dark-mode"
      );
    } else {
      document.body.classList.remove(
        "dark-mode"
      );
    }
  }, [darkMode]);

  const toggleTheme =
    () => {
      setDarkMode(
        (prev) => !prev
      );
    };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};