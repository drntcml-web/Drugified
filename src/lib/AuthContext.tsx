import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type User = {
  id: string
  name: string
  username: string
  avatar: string
  daysClean: number
  bio: string
}

type AuthError = { type: 'user_not_registered' | 'auth_required' }

type AuthContextType = {
  user: User | null
  isLoadingAuth: boolean
  isLoadingPublicSettings: boolean
  authError: AuthError | null
  navigateToLogin: () => void
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

const MOCK_USER: User = {
  id: '1',
  name: 'Alex Rivera',
  username: 'alex_recovery',
  avatar: 'AR',
  daysClean: 47,
  bio: 'One day at a time. 47 days clean and counting.',
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true)
  const [authError] = useState<AuthError | null>(null)

  useEffect(() => {
    // Simulate loading — check localStorage for session
    setTimeout(() => {
      const saved = localStorage.getItem('drugified_user')
      if (saved) setUser(JSON.parse(saved))
      setIsLoadingPublicSettings(false)
      setIsLoadingAuth(false)
    }, 800)
  }, [])

  const login = async (email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 600))
    const u = { ...MOCK_USER, name: email.split('@')[0] }
    setUser(u)
    localStorage.setItem('drugified_user', JSON.stringify(u))
  }

  const register = async (name: string) => {
    await new Promise(r => setTimeout(r, 600))
    const u = { ...MOCK_USER, name }
    setUser(u)
    localStorage.setItem('drugified_user', JSON.stringify(u))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('drugified_user')
  }

  const navigateToLogin = () => {
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{
      user, isLoadingAuth, isLoadingPublicSettings, authError,
      navigateToLogin, login, logout, register,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
