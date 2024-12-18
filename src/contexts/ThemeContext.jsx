import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: 'system',
  setThemeMode: (mode) => {},
});

export const ThemeProvider = ({ children }) => {
  const storedTheme = localStorage.getItem('themeMode') || 'system';
  const [theme, setTheme] = useState(storedTheme);

  const setThemeMode = (mode) => {
    setTheme(mode);
    if (mode === 'system') {
      localStorage.removeItem('themeMode');
    } else {
      localStorage.setItem('themeMode', mode);
    }
  };

  useEffect(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.remove('theme-light', 'theme-dark');
    if (theme === 'system') {
      if (systemPrefersDark) {
        document.body.classList.add('theme-dark');
      } else {
        document.body.classList.add('theme-light');
      }
    } else {
      document.body.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);