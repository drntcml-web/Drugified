import { useAuth } from '@/lib/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Flame, Calendar, LogOut } from 'lucide-react'
import { toast } from '@/components/ui/toaster'

const milestones = [
  { days: 1, label: '1 day', achieved: true },
  { days: 7, label: '1 week', achieved: true },
  { days: 30, label: '1 month', achieved: true },
  { days: 60, label: '2 months', achieved: false },
  { days: 90, label: '3 months', achieved: false },
  { days: 180, label: '6 months', achieved: false },
  { days: 365, label: '1 year', achieved: false },
]

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast('See you soon. Stay strong.')
    navigate('/login')
  }

  const achieved = milestones.filter(m => (user?.daysClean ?? 0) >= m.days)
  const next = milestones.find(m => (user?.daysClean ?? 0) < m.days)

  return (
    <div className="px-4 py-5 flex flex-col gap-5">
      {/* Profile card */}
      <div className="bg-card border rounded-2xl p-5 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-xl font-bold flex items-center justify-center mb-3">
          {user?.avatar}
        </div>
        <h2 className="text-lg font-bold">{user?.name}</h2>
        <p className="text-sm text-muted-foreground">@{user?.username}</p>
        <p className="text-sm mt-2 text-foreground/80">{user?.bio}</p>

        <div className="flex gap-6 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{user?.daysClean}</p>
            <p className="text-xs text-muted-foreground">Days clean</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-muted-foreground">Supporters</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">8</p>
            <p className="text-xs text-muted-foreground">Posts</p>
          </div>
        </div>
      </div>

      {/* Next milestone */}
      {next && (
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Flame size={16} className="text-primary" />
            <span className="text-sm font-semibold">Next milestone: {next.label}</span>
          </div>
          <div className="bg-muted rounded-full h-2">
            <div
              className="bg-primary rounded-full h-2 transition-all"
              style={{ width: `${Math.min(100, ((user?.daysClean ?? 0) / next.days) * 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {next.days - (user?.daysClean ?? 0)} days to go
          </p>
        </div>
      )}

      {/* Milestones */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={16} className="text-primary" />
          <h3 className="font-semibold">Milestones</h3>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {milestones.map(m => (
            <div
              key={m.days}
              className={`rounded-xl p-3 text-center border ${(user?.daysClean ?? 0) >= m.days
                ? 'bg-accent/10 border-accent/30 text-accent'
                : 'bg-muted/40 border-border text-muted-foreground'}`}
            >
              <p className="text-lg">{(user?.daysClean ?? 0) >= m.days ? '🏅' : '🔒'}</p>
              <p className="text-[10px] font-medium mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 w-full py-3 border border-destructive/30 text-destructive rounded-xl text-sm font-medium"
      >
        <LogOut size={14} />
        Sign out
      </button>
    </div>
  )
}
