import { useEffect, useState } from "react"
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  Users,
  CalendarDays,
  Settings,
} from "lucide-react"

import { Link, useRouterState } from "@tanstack/react-router"
import { getMyMenus } from "#/features/auth/service"
import type { MenuPermission } from "#/features/auth/types"

const ICONS: Record<string, typeof Building2> = {
  user: Users,
  department: Building2,
  position: Briefcase,
}

// Menus that are always visible, not gated by backend role permission.
const STATIC_MENUS = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
]

const STATIC_BOTTOM_MENUS = [
  { title: "Attendance", icon: CalendarDays, href: "/attendance" },
  { title: "Settings", icon: Settings, href: "/settings" },
]

export default function Sidebar() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  const [roleMenus, setRoleMenus] = useState<MenuPermission[]>([])

  useEffect(() => {
    getMyMenus()
      .then(setRoleMenus)
      .catch(() => setRoleMenus([]))
  }, [])

  const dynamicMenus = roleMenus.map((menu) => ({
    title: menu.name,
    icon: ICONS[menu.key] ?? Users,
    href: menu.path,
  }))

  const menus = [...STATIC_MENUS, ...dynamicMenus, ...STATIC_BOTTOM_MENUS]

  return (
    <aside className="w-64 bg-slate-900 text-white shadow-xl transition-colors">
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-2xl font-bold text-cyan-400">HR Management</h1>
        <p className="mt-1 text-sm text-slate-400">Employee Management System</p>
      </div>

      <nav className="mt-6 px-3">
        {menus.map((menu) => {
          const Icon = menu.icon
          const active = pathname === menu.href || pathname.startsWith(menu.href + "/")

          return (
            <Link
              key={menu.href}
              to={menu.href}
              className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                active
                  ? "bg-cyan-500 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
              }`}
            >
              <Icon size={20} />
              <span>{menu.title}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
