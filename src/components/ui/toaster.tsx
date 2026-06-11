import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

type Toast = { id: string; message: string; type?: 'success' | 'error' }

let listeners: ((t: Toast) => void)[] = []

export function toast(message: string, type: Toast['type'] = 'success') {
  const t: Toast = { id: Date.now().toString(), message, type }
  listeners.forEach(fn => fn(t))
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const fn = (t: Toast) => {
      setToasts(prev => [...prev, t])
      setTimeout(() => setToasts(prev => prev.filter(x => x.id !== t.id)), 3000)
    }
    listeners.push(fn)
    return () => { listeners = listeners.filter(l => l !== fn) }
  }, [])

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map(t => (
        <div key={t.id} className={cn(
          'px-4 py-3 rounded-lg shadow-lg text-sm text-white animate-in fade-in slide-in-from-bottom-2',
          t.type === 'error' ? 'bg-destructive' : 'bg-accent'
        )}>
          {t.message}
        </div>
      ))}
    </div>
  )
}
