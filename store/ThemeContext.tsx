import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'blue' | 'green' | 'purple';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themes = {
  light: {
    background: 'bg-white',
    text: 'text-gray-900',
    primary: 'bg-blue-500',
    secondary: 'bg-gray-200',
  },
  dark: {
    background: 'bg-gray-900',
    text: 'text-white',
    primary: 'bg-blue-600',
    secondary: 'bg-gray-700',
  },
  blue: {
    background: 'bg-blue-50',
    text: 'text-blue-900',
    primary: 'bg-blue-500',
    secondary: 'bg-blue-200',
  },
  green: {
    background: 'bg-green-50',
    text: 'text-green-900',
    primary: 'bg-green-500',
    secondary: 'bg-green-200',
  },
  purple: {
    background: 'bg-purple-50',
    text: 'text-purple-900',
    primary: 'bg-purple-500',
    secondary: 'bg-purple-200',
  },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
      <div className={`${themes[theme].background} ${themes[theme].text} min-h-screen`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 