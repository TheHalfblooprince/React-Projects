// 1. Create a ThemeContext.js file
import { createContext, useContext, useEffect, useState } from 'react';

// Create context
const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
  isDark: true
});

// Create custom hook for using the theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};


export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize theme from localStorage or use dark as default
  const [theme, setTheme] = useState('dark');
  
  // Function to toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };
  
  // Effect to update localStorage and document class when theme changes
  useEffect(() => {
    // Save to localStorage whenever theme changes
    localStorage.setItem('theme', theme);
    
    // Update the HTML document class for Tailwind
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  // Effect to initialize theme from localStorage or system preference
  useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // If no theme in localStorage, check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);
  
  // Context value
  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};