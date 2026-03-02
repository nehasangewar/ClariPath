import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await api.post('/api/auth/login', { email, password })
      login(response.data.user, response.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0f2c 0%, #0d1b4b 40%, #0a2a6e 70%, #0e3d8f 100%)' }}>

        {/* Glowing orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #4f8ef7, transparent)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-32 right-16 w-96 h-96 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)', filter: 'blur(60px)' }} />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent)', filter: 'blur(30px)', transform: 'translate(-50%, -50%)' }} />

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #4f8ef7, #7c3aed)' }}>
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-white font-bold text-2xl tracking-wide">ClariPath</span>
            </div>
            <h2 className="text-5xl font-bold text-white leading-tight mb-4">
              Your career,<br />
              <span style={{ background: 'linear-gradient(90deg, #4f8ef7, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                mapped by AI.
              </span>
            </h2>
            <p className="text-lg" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Personalised roadmaps that adapt to your progress, your college, and your goals.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[['8 AI Calls', 'Per student'], ['16 Weeks', 'Per semester'], ['4 Years', 'Full journey']].map(([val, label]) => (
              <div key={val} className="rounded-2xl p-4 text-center"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                <div className="text-xl font-bold" style={{ color: '#4f8ef7' }}>{val}</div>
                <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12"
        style={{ background: '#f8faff' }}>
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #4f8ef7, #7c3aed)' }}>
              <span className="text-white font-bold">C</span>
            </div>
            <span className="font-bold text-xl" style={{ color: '#0a0f2c' }}>ClariPath</span>
          </div>

          <h3 className="text-3xl font-bold mb-1" style={{ color: '#0a0f2c' }}>Welcome back</h3>
          <p className="text-sm mb-8" style={{ color: '#6b7280' }}>Sign in to continue your journey</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
              <span>⚠</span> {error}
            </div>
          )}

          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ border: '1.5px solid #e5e7eb', background: 'white', color: '#111827' }}
                onFocus={e => e.target.style.borderColor = '#4f8ef7'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all pr-12"
                  style={{ border: '1.5px solid #e5e7eb', background: 'white', color: '#111827' }}
                  onFocus={e => e.target.style.borderColor = '#4f8ef7'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all disabled:opacity-60"
              style={{ background: loading ? '#93c5fd' : 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </div>

          <p className="text-center text-sm mt-6" style={{ color: '#6b7280' }}>
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold hover:underline" style={{ color: '#2563eb' }}>
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage