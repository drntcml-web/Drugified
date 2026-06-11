import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { MOCK_ALERTS } from '@/lib/mockData'

export default function AlertDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const alert = MOCK_ALERTS.find(a => a.id === id)

  if (!alert) return (
    <div className="px-4 py-5">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <ArrowLeft size={16} /> Back
      </button>
      <p className="text-muted-foreground">Alert not found.</p>
    </div>
  )

  return (
    <div className="px-4 py-5">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <ArrowLeft size={16} /> Back
      </button>
      <div className="bg-card border rounded-2xl p-5">
        <h2 className="text-xl font-bold mb-1">{alert.title}</h2>
        <p className="text-xs text-muted-foreground mb-4">{alert.timestamp}</p>
        <div className="flex flex-col gap-3 text-sm">
          <div><span className="text-muted-foreground">Severity:</span> <span className="font-medium capitalize">{alert.severity}</span></div>
          <div><span className="text-muted-foreground">Trigger:</span> <span className="font-medium">{alert.trigger}</span></div>
          <div><span className="text-muted-foreground">Status:</span> <span className="font-medium">{alert.resolved ? 'Resolved' : 'Active'}</span></div>
          {alert.note && (
            <div>
              <span className="text-muted-foreground block mb-1">Notes:</span>
              <p className="bg-muted rounded-lg p-3">{alert.note}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 mt-4">
        <p className="text-sm font-medium text-accent mb-1">Reminder</p>
        <p className="text-sm">Noticing a craving is the first step. You logged this — that means you're paying attention. That's huge.</p>
      </div>
    </div>
  )
}
