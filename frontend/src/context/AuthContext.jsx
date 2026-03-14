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

  const login = async (userData, jwtToken) => {
  setUser(userData)
  setToken(jwtToken)
  localStorage.setItem('token', jwtToken)
  localStorage.setItem('user', JSON.stringify(userData))

  try {
    setCheckingRoadmap(true)
    const res = await fetch('http://localhost:8080/api/roadmap/current', {
      headers: { 'Authorization': `Bearer ${jwtToken}` }
    })

    if (res.ok) {
      const text = await res.text()
      if (text && text.trim().length > 0) {
        // Roadmap exists — mark onboarding complete
        const updated = { ...userData, onboardingComplete: true }
        setUser(updated)
        localStorage.setItem('user', JSON.stringify(updated))
      }
    }
  } catch (err) {
    console.warn('Could not check roadmap status', err)
  } finally {
    setCheckingRoadmap(false)
  }
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
    <AuthContext.Provider value={{ user, token, login, logout, completeOnboarding, checkingRoadmap }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}