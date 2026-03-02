import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

function RegisterPage() {
  const [form, setForm] = useState({ name: '', college: '', email: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.college || !form.email || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      const response = await api.post('/api/auth/register', {
        name: form.name,
        college: form.college,
        email: form.email,
        password: form.password,
      })
      login(response.data.user, response.data.token)
      navigate('/onboarding')
    } catch (err) {
      setError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const EyeIcon = ({ show }) => show ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  )

  const InputField = ({ label, type, field, placeholder, showToggle, showState, onToggle }) => (
    <div>
      <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>{label}</label>
      <div className="relative">
        <input
          type={showToggle ? (showState ? 'text' : 'password') : type}
          value={form[field]}
          onChange={update(field)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
          style={{ border: '1.5px solid #e5e7eb', background: 'white', color: '#111827', paddingRight: showToggle ? '3rem' : '1rem' }}
          onFocus={e => e.target.style.borderColor = '#4f8ef7'}
          onBlur={e => e.target.style.borderColor = '#e5e7eb'}
        />
        {showToggle && (
          <button type="button" onClick={onToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
            <EyeIcon show={showState} />
          </button>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex">

      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0f2c 0%, #0d1b4b 40%, #0a2a6e 70%, #0e3d8f 100%)' }}>

        <div className="absolute top-20 left-20 w-72 h-72 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #4f8ef7, transparent)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-32 right-16 w-96 h-96 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)', filter: 'blur(60px)' }} />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #4f8ef7, #7c3aed)' }}>
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-white font-bold text-2xl tracking-wide">ClariPath</span>
          </div>

          <h2 className="text-5xl font-bold text-white leading-tight mb-4">
            Start your<br />
            <span style={{ background: 'linear-gradient(90deg, #4f8ef7, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              AI journey.
            </span>
          </h2>
          <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Answer 10 questions. Get a personalised 4-year roadmap built for your goal.
          </p>

          {/* Steps */}
          <div className="space-y-4">
            {[
              ['01', 'Answer 10 discovery questions'],
              ['02', 'AI recommends your career goal'],
              ['03', 'Get your 16-week roadmap instantly'],
            ].map(([num, text]) => (
              <div key={num} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: 'rgba(79,142,247,0.2)', color: '#4f8ef7', border: '1px solid rgba(79,142,247,0.3)' }}>
                  {num}
                </div>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12"
        style={{ background: '#f8faff' }}>
        <div className="w-full max-w-md">

          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #4f8ef7, #7c3aed)' }}>
              <span className="text-white font-bold">C</span>
            </div>
            <span className="font-bold text-xl" style={{ color: '#0a0f2c' }}>ClariPath</span>
          </div>

          <h3 className="text-3xl font-bold mb-1" style={{ color: '#0a0f2c' }}>Create account</h3>
          <p className="text-sm mb-8" style={{ color: '#6b7280' }}>Join ClariPath and get your AI roadmap today</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
              <span>⚠</span> {error}
            </div>
          )}

          <div className="space-y-4">
            <InputField label="Full Name" type="text" field="name" placeholder="Your full name" />
            <InputField label="College Name" type="text" field="college" placeholder="Your college or university" />
            <InputField label="Email address" type="email" field="email" placeholder="you@example.com" />
            <InputField
              label="Password" field="password" placeholder="Create a password"
              showToggle showState={showPassword} onToggle={() => setShowPassword(!showPassword)}
            />
            <InputField
              label="Confirm Password" field="confirmPassword" placeholder="Repeat your password"
              showToggle showState={showConfirm} onToggle={() => setShowConfirm(!showConfirm)}
            />

            {/* Password match indicator */}
            {form.confirmPassword && (
              <p className="text-xs font-medium" style={{ color: form.password === form.confirmPassword ? '#16a34a' : '#dc2626' }}>
                {form.password === form.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all disabled:opacity-60 mt-2"
              style={{ background: loading ? '#93c5fd' : 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating account...
                </span>
              ) : 'Create Account'}
            </button>
          </div>

          <p className="text-center text-sm mt-6" style={{ color: '#6b7280' }}>
            Already have an account?{' '}
            <Link to="/login" className="font-semibold hover:underline" style={{ color: '#2563eb' }}>
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage