import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm bg-card border rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Set new password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button type="submit" className="py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
            Update password
          </button>
        </form>
      </div>
    </div>
  )
}
