import { useEffect, useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { LogOut, Moon, Sun, UserCircle } from "lucide-react"

import { getUser, clearSession } from "#/features/auth/auth"

export default function Topbar() {
  const navigate = useNavigate()

  const [darkMode, setDarkMode] = useState(false)
  const [userName, setUserName] = useState("Admin")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light"

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
      setDarkMode(true)
    } else {
      document.documentElement.classList.remove("dark")
      setDarkMode(false)
    }

    const user = getUser()
    if (user) {
      setUserName(user.name)
    }
  }, [])

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }

    setDarkMode(!darkMode)
  }

  const handleLogout = () => {
    clearSession()
    navigate({ to: "/login" })
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900">
      <div>
        <h2 className="text-2xl font-bold text-slate-700 dark:text-white">Dashboard</h2>
      </div>

      <div className="flex items-center gap-5">
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {darkMode ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-slate-700" />
          )}
        </button>

        <div className="flex items-center gap-2">
          <UserCircle size={24} className="text-slate-700 dark:text-white" />
          <span className="font-medium text-slate-700 dark:text-white">{userName}</span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  )
}
