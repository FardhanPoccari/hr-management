import { Link, Outlet } from '@tanstack/react-router'

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white">
        <div className="border-b border-slate-700 p-5">
          <h1 className="text-xl font-bold">HR Management</h1>
        </div>

        <nav className="flex flex-col gap-2 p-4">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/users">Users</Link>
          <Link to="/departments">Departments</Link>
          <Link to="/positions">Positions</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1">
        {/* Navbar */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
          <h2 className="text-xl font-semibold">Dashboard</h2>

          <div className="font-medium">
            Admin
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}