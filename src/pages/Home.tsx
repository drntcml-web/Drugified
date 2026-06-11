import { useAuth } from '@/lib/AuthContext'
import { Flame, TrendingUp, Heart, Users } from 'lucide-react'
import { useState } from 'react'
import { toast } from '@/components/ui/toaster'

const moods = ['😔', '😐', '🙂', '😊', '😄']

export default function Home() {
  const { user } = useAuth()
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [checkedIn, setCheckedIn] = useState(false)

  const handleCheckIn = () => {
    if (selectedMood === null) return
    setCheckedIn(true)
    toast('Check-in saved! Keep going.')
  }

  return (
    <div className="px-4 py-5 flex flex-col gap-5">
      {/* Greeting */}
      <div>
        <p className="text-sm text-muted-foreground">Good morning,</p>
        <h1 className="text-2xl font-bold">{user?.name}</h1>
      </div>

      {/* Streak card */}
      <div className="bg-primary rounded-2xl p-5 text-primary-foreground flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">Days clean</p>
          <p className="text-5xl font-bold">{user?.daysClean}</p>
          <p className="text-sm opacity-80 mt-1">Keep it up — you're doing amazing.</p>
        </div>
        <Flame size={48} className="opacity-70" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: TrendingUp, label: 'Streak', value: `${user?.daysClean}d` },
          { icon: Heart, label: 'Supporters', value: '12' },
          { icon: Users, label: 'Community', value: '248' },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-card border rounded-xl p-3 text-center">
            <Icon size={18} className="mx-auto mb-1 text-primary" />
            <p className="text-lg font-bold">{value}</p>
            <p className="text-[10px] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Daily check-in */}
      <div className="bg-card border rounded-2xl p-4">
        <p className="font-semibold mb-1">Daily check-in</p>
        <p className="text-sm text-muted-foreground mb-3">How are you feeling today?</p>
        {checkedIn ? (
          <p className="text-sm text-accent font-medium">You've checked in today. Stay strong!</p>
        ) : (
          <>
            <div className="flex gap-3 mb-4">
              {moods.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedMood(i)}
                  className={`text-2xl transition-transform ${selectedMood === i ? 'scale-125' : 'opacity-60'}`}
                >
                  {m}
                </button>
              ))}
            </div>
            <button
              onClick={handleCheckIn}
              disabled={selectedMood === null}
              className="w-full py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium disabled:opacity-40"
            >
              Save check-in
            </button>
          </>
        )}
      </div>

      {/* Motivational quote */}
      <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4">
        <p className="text-sm font-medium text-accent">Today's reminder</p>
        <p className="text-sm mt-1 text-foreground italic">
          "Recovery is not a race. You don't have to feel guilty if it takes you longer than you thought it would."
        </p>
      </div>
    </div>
  )
}
