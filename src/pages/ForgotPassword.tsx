import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm bg-card border rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-1">Reset password</h2>
        <p className="text-sm text-muted-foreground mb-4">We'll send a link to your email.</p>
        {sent ? (
          <p className="text-sm text-accent font-medium">Check your inbox for a reset link.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button type="submit" className="py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
              Send reset link
            </button>
          </form>
        )}
        <Link to="/login" className="block text-center text-xs text-muted-foreground mt-4">Back to sign in</Link>
      </div>
    </div>
  )
}
