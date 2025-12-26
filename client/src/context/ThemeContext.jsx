import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  // LOCKED TO DARK MODE ONLY - Do not change
  const [theme] = useState('dark')

  useEffect(() => {
    // Force dark mode always
    document.documentElement.classList.add('dark')
    localStorage.setItem('toolie-theme', 'dark')
  }, [])

  // Disabled theme toggle - always returns dark mode
  const toggleTheme = () => {
    console.warn('Theme toggle is disabled. App is locked to dark mode only.')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
