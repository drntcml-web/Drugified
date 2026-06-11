import { useNavigate } from 'react-router-dom'

export default function UserNotRegisteredError() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <div className="bg-card border rounded-2xl p-8 max-w-sm w-full text-center shadow-sm">
        <p className="text-2xl mb-2">Account not found</p>
        <p className="text-sm text-muted-foreground mb-6">
          We couldn't find your account. Please register to continue your recovery journey.
        </p>
        <button
          onClick={() => navigate('/register')}
          className="w-full py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
        >
          Create an account
        </button>
      </div>
    </div>
  )
}
