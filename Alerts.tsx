import { useState } from 'react'
import { Plus, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { MOCK_ALERTS, type Alert } from '@/lib/mockData'
import { cn } from '@/lib/cn'
import { toast } from '@/components/ui/toaster'
import { useNavigate } from 'react-router-dom'

const severityConfig = {
  low: { label: 'Low', color: 'text-accent bg-accent/10 border-accent/20' },
  medium: { label: 'Medium', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
  high: { label: 'High', color: 'text-destructive bg-destructive/10 border-destructive/20' },
}

const TRIGGERS = ['Stress', 'Loneliness', 'Social pressure', 'Boredom', 'Anxiety', 'Pain', 'Other']

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS)
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    severity: 'medium' as Alert['severity'],
    trigger: TRIGGERS[0],
    note: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const a: Alert = {
      id: Date.now().toString(),
      ...form,
      timestamp: 'Just now',
      resolved: false,
    }
    setAlerts([a, ...alerts])
    setShowForm(false)
    setForm({ title: '', severity: 'medium', trigger: TRIGGERS[0], note: '' })
    toast('Craving logged. You acknowledged it — that takes strength.')
  }

  const resolveAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a))
    toast('Marked as resolved. You handled it!')
  }

  return (
    <div className="px-4 py-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold">Craving Log</h2>
          <p className="text-sm text-muted-foreground">Track triggers to understand patterns.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
        >
          <Plus size={14} />
          Log craving
        </button>
      </div>

      {/* Log form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card border rounded-2xl p-4 mb-5 flex flex-col gap-3">
          <p className="font-semibold text-sm">Log a craving</p>
          <input
            type="text"
            placeholder="Brief title (e.g. 'Strong urge at party')"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
            className="border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Severity</label>
              <select
                value={form.severity}
                onChange={e => setForm({ ...form, severity: e.target.value as Alert['severity'] })}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Trigger</label>
              <select
                value={form.trigger}
                onChange={e => setForm({ ...form, trigger: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none"
              >
                {TRIGGERS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <textarea
            placeholder="What happened? What did you do? (optional)"
            value={form.note}
            onChange={e => setForm({ ...form, note: e.target.value })}
            rows={2}
            className="border rounded-lg px-3 py-2 text-sm bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex gap-2">
            <button type="submit" className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">Save</button>
            <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2 border rounded-lg text-sm">Cancel</button>
          </div>
        </form>
      )}

      {/* Alert list */}
      <div className="flex flex-col gap-3">
        {alerts.map(a => (
          <div
            key={a.id}
            onClick={() => navigate(`/alerts/${a.id}`)}
            className={cn('bg-card border rounded-xl p-4 cursor-pointer transition-opacity', a.resolved && 'opacity-60')}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm">{a.title}</span>
                  <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full border', severityConfig[a.severity].color)}>
                    {severityConfig[a.severity].label}
                  </span>
                  {a.resolved && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border text-accent bg-accent/10 border-accent/20">
                      Resolved
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Trigger: {a.trigger} · {a.timestamp}</p>
                {a.note && <p className="text-xs mt-1 text-foreground/70">{a.note}</p>}
              </div>
              {!a.resolved && (
                <button
                  onClick={e => { e.stopPropagation(); resolveAlert(a.id) }}
                  className="shrink-0 text-muted-foreground hover:text-accent transition-colors"
                  title="Mark resolved"
                >
                  <CheckCircle2 size={18} />
                </button>
              )}
              {a.resolved && <AlertTriangle size={16} className="text-muted-foreground shrink-0" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
