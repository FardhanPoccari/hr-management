import { useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from '@tanstack/react-router'

import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { isAuthenticated } from '#/features/auth/auth'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: '/login' })
      return
    }
    setChecked(true)
  }, [])

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">
        <span className="text-slate-500 dark:text-slate-400">Loading...</span>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-slate-100 transition-colors dark:bg-slate-950">
      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
