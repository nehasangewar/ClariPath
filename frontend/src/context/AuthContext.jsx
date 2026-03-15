import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [checkingRoadmap, setCheckingRoadmap] = useState(false)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
  }, [])

  // login() returns '/dashboard' or '/onboarding' — use the return value in LoginPage
  const login = async (userData, jwtToken) => {
    setUser(userData)
    setToken(jwtToken)
    localStorage.setItem('token', jwtToken)
    localStorage.setItem('user', JSON.stringify(userData))

    try {
      setCheckingRoadmap(true)
      const res = await fetch('http://localhost:8080/api/profile/me', {
        headers: { 'Authorization': `Bearer ${jwtToken}` }
      })

      if (res.ok) {
        // Safely parse — endpoint may return empty body
        const text = await res.text()
        if (text && text.trim().length > 0) {
          const data = JSON.parse(text)
          // Any status other than 'ONBOARDING' means onboarding is done
          if (data.status && data.status !== 'ONBOARDING') {
            const updated = { ...userData, onboardingComplete: true }
            setUser(updated)
            localStorage.setItem('user', JSON.stringify(updated))
            return '/dashboard'
          }
        }
      }
    } catch (err) {
      console.warn('Could not check profile status', err)
    } finally {
      setCheckingRoadmap(false)
    }

    // status is ONBOARDING, empty response, or request failed → onboarding
    return '/onboarding'
  }

  // register() — never sets onboardingComplete, ProtectedRoute sends to /onboarding
  const register = (userData, jwtToken) => {
    setUser(userData)
    setToken(jwtToken)
    localStorage.setItem('token', jwtToken)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const completeOnboarding = () => {
    const updated = { ...user, onboardingComplete: true }
    setUser(updated)
    localStorage.setItem('user', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, completeOnboarding, checkingRoadmap }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}