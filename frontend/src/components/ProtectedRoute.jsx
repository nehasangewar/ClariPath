import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const { token, user, checkingRoadmap } = useAuth()
  const location = useLocation()

  if (!token) return <Navigate to="/login" replace />

  // Still checking DB for roadmap — show nothing while waiting
  if (checkingRoadmap) return null

  // Logged in but onboarding not done → force onboarding
  if (!user?.onboardingComplete && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />
  }

  // Onboarding done but trying to visit /onboarding again → send to dashboard
  if (user?.onboardingComplete && location.pathname === '/onboarding') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default ProtectedRoute