"use client"
import { Moon, Sun } from "react-feather"
import { useTheme } from "../../contexts/ThemeContext"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-muted hover:bg-muted-foreground/10 transition-colors"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-300" /> : <Moon className="h-5 w-5 text-primary" />}
    </button>
  )
}

export default ThemeToggle

