import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { Home, Rss, Bell, BookOpen, User, History } from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'
import { cn } from '@/lib/cn'

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/feed', icon: Rss, label: 'Feed' },
  { to: '/social-history', icon: History, label: 'History' },
  { to: '/alerts', icon: Bell, label: 'Alerts' },
  { to: '/resources', icon: BookOpen, label: 'Resources' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export default function AppShell() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b px-4 py-3 flex items-center justify-between">
        <span className="font-bold text-primary text-lg tracking-tight">Drugified</span>
        <button onClick={() => navigate('/profile')} className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
          {user?.avatar ?? '?'}
        </button>
      </header>

      {/* Page content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-40">
        <div className="max-w-lg mx-auto flex">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => cn(
                'flex-1 flex flex-col items-center py-2 gap-0.5 text-[10px] font-medium transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
