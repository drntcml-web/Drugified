import { Outlet } from 'react-router-dom'
import { useAuth } from '@/lib/AuthContext'

type Props = { unauthenticatedElement: React.ReactNode }

export default function ProtectedRoute({ unauthenticatedElement }: Props) {
  const { user } = useAuth()
  if (!user) return <>{unauthenticatedElement}</>
  return <Outlet />
}
