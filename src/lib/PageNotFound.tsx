import { useNavigate } from 'react-router-dom'

export default function PageNotFound() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-6xl font-bold text-muted-foreground">404</p>
      <p className="text-muted-foreground">Page not found</p>
      <button
        onClick={() => navigate('/')}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
      >
        Go home
      </button>
    </div>
  )
}
