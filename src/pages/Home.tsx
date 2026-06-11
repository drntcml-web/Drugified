import { useAuth } from '@/lib/AuthContext'
import { Heart, Users, ShieldCheck } from 'lucide-react'
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
    toast('Check-in saved. You showed up today — that matters.')
  }

  const isNew = (user?.daysClean ?? 0) === 0

  return (
    <div className="px-4 py-5 flex flex-col gap-5">
      {/* Greeting */}
      <div>
        <p className="text-sm text-muted-foreground">Welcome back,</p>
        <h1 className="text-2xl font-bold">{user?.name || 'Friend'}</h1>
      </div>

      {/* Hero card */}
      {isNew ? (
        <div className="bg-primary rounded-2xl p-5 text-primary-foreground">
          <p className="text-sm opacity-80 mb-1">Your journey starts today</p>
          <p className="text-3xl font-bold">Day 1 begins now.</p>
          <p className="text-sm opacity-80 mt-2">
            Every step forward, no matter how small, is progress. You're not alone.
          </p>
        </div>
      ) : (
        <div className="bg-primary rounded-2xl p-5 text-primary-foreground flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Days clean</p>
            <p className="text-5xl font-bold">{user?.daysClean}</p>
            <p className="text-sm opacity-80 mt-1">Keep going — one day at a time.</p>
          </div>
          <ShieldCheck size={48} className="opacity-70" />
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3">
        {[
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
        <p className="text-sm text-muted-foreground mb-3">How are you feeling right now?</p>
        {checkedIn ? (
          <p className="text-sm text-accent font-medium">Checked in. You showed up — that's everything.</p>
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
      <div className="bg-primary/8 border border-primary/20 rounded-2xl p-4">
        <p className="text-sm font-medium text-primary">Today's reminder</p>
        <p className="text-sm mt-1 text-foreground/80 italic">
          "You don't have to see the whole staircase. Just take the first step."
        </p>
        <p className="text-xs text-muted-foreground mt-1">— Martin Luther King Jr.</p>
      </div>
    </div>
  )
}
