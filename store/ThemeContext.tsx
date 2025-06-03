import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Theme = 'light' | 'dark';

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
    text: 'text-gray-100',
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

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const router = useRouter();

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Set default theme based on route
      const defaultTheme = router.pathname === '/' ? 'dark' : 'light';
      setTheme(defaultTheme);
      document.documentElement.classList.toggle('dark', defaultTheme === 'dark');
    }
  }, [router.pathname]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 