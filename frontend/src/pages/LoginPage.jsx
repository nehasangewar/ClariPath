import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

function LoginPage() {
  const [email, setEmail]               = useState('')
  const [password, setPassword]         = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError]               = useState('')
  const [loading, setLoading]           = useState(false)

  const [view, setView]                     = useState('login') // 'login' | 'forgot' | 'sent'
  const [forgotEmail, setForgotEmail]       = useState('')
  const [forgotLoading, setForgotLoading]   = useState(false)
  const [forgotError, setForgotError]       = useState('')

  const { login } = useAuth()
  const navigate  = useNavigate()

  const C = {
    bg: '#f5f0e8', bgAlt: '#ede8df', text: '#1c1917', textMid: '#44403c',
    textLight: '#78716c', gold: '#b45309', goldLight: '#d97706',
    goldBg: '#fef3c7', goldBorder: '#fcd34d', border: '#e5ddd0',
    white: '#ffffff', cardBg: '#faf7f2',
  }

  const handleSubmit = async () => {
  setLoading(true); setError('')
  try {
    const res = await api.post('/api/auth/login', { email, password })
    login(res.data.user, res.data.token)
    const profileRes = await api.get('/api/profile/me')
    if (profileRes.data.status === 'ONBOARDING') {
      navigate('/onboarding')
    } else {
      navigate('/dashboard')
    }
  } catch {
    setError('Invalid email or password. Please try again.')
  } finally { setLoading(false) }
}

  const handleForgot = async () => {
    if (!forgotEmail) { setForgotError('Please enter your email address.'); return }
    setForgotLoading(true); setForgotError('')
    try { await api.post('/api/auth/forgot-password', { email: forgotEmail }) } catch {}
    finally { setForgotLoading(false); setView('sent') }
  }

  // ── Same input style as RegisterPage ──
  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    padding: '11px 16px',
    borderRadius: 12, border: `1.5px solid ${C.border}`,
    background: C.white, color: C.text, fontSize: 14,
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'DM Sans, system-ui, sans-serif',
  }

  const labelStyle = {
    display: 'block', fontSize: 13, fontWeight: 600,
    color: C.textMid, marginBottom: 5,
    fontFamily: 'DM Sans, system-ui, sans-serif',
  }

  const EyeButton = ({ show, toggle }) => (
    <button type="button" onClick={toggle}
      style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color: C.textLight, padding:4 }}>
      {show ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )}
    </button>
  )

  return (
    <div style={{ minHeight:'100vh', display:'flex', fontFamily:'DM Sans, system-ui, sans-serif' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800;900&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-slow-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(12px, -10px); }
          66% { transform: translate(-8px, 8px); }
        }
        @keyframes shimmer-gold {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        input::placeholder { color: #a8a29e; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 30px #ffffff inset !important;
          -webkit-text-fill-color: #1c1917 !important;
        }
        .reg-input:focus {
          border-color: #b45309 !important;
          box-shadow: 0 0 0 3px rgba(180,83,9,0.1) !important;
        }
        .btn-gold { transition: all 0.25s ease !important; }
        .btn-gold:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(180,83,9,0.35) !important;
        }
        .playfair { font-family: 'Playfair Display', Georgia, serif; }
        .gold-text {
          background: linear-gradient(135deg, #b45309, #d97706, #f59e0b, #d97706, #b45309);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-gold 4s linear infinite;
        }
        .login-form { animation: fadeUp 0.5s ease both; }
      `}</style>

      {/* ══════════════════════════════
          LEFT PANEL — exact same as RegisterPage
      ══════════════════════════════ */}
      <div className="hidden lg:flex" style={{
        width: '45%', position: 'relative', overflow: 'hidden',
        background: `linear-gradient(160deg, #fef9f0 0%, ${C.bgAlt} 50%, #ede0cc 100%)`,
        flexDirection: 'column', justifyContent: 'center', padding: '0 60px',
        borderRight: `1px solid ${C.border}`,
      }}>

        {/* Background warm texture */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(251,191,36,0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(180,83,9,0.1) 0%, transparent 45%)
          `,
        }} />

        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(rgba(180,83,9,0.1) 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
        }} />

        {/* ── ORBIT 1 — center ── */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 400, height: 400, marginTop: -200, marginLeft: -200,
          borderRadius: '50%',
          border: '1.5px solid rgba(180,83,9,0.18)',
          boxShadow: '0 0 0 1px rgba(251,191,36,0.06)',
          animation: 'spin-slow 38s linear infinite',
        }}>
          <div style={{ position:'absolute', top:-8, left:'50%', transform:'translateX(-50%)', width:15, height:15, borderRadius:'50%', background:'radial-gradient(circle, #fde68a 20%, #b45309)', boxShadow:'0 0 16px #d97706, 0 0 30px rgba(180,83,9,0.3)' }} />
          <div style={{ position:'absolute', bottom:-6, left:'50%', transform:'translateX(-50%)', width:9, height:9, borderRadius:'50%', background:'#d97706', boxShadow:'0 0 10px rgba(217,119,6,0.5)' }} />
          <div style={{ position:'absolute', top:'50%', right:-6, transform:'translateY(-50%)', width:9, height:9, borderRadius:'50%', background:'#f59e0b', boxShadow:'0 0 10px rgba(245,158,11,0.5)' }} />
        </div>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 270, height: 270, marginTop: -135, marginLeft: -135,
          borderRadius: '50%',
          border: '1px dashed rgba(180,83,9,0.12)',
          animation: 'spin-slow-reverse 50s linear infinite',
        }}>
          <div style={{ position:'absolute', top:'50%', left:-6, transform:'translateY(-50%)', width:11, height:11, borderRadius:'50%', background:'radial-gradient(circle, #c4b5fd 20%, #7c3aed)', boxShadow:'0 0 12px rgba(124,58,237,0.55)' }} />
          <div style={{ position:'absolute', bottom:-5, left:'50%', transform:'translateX(-50%)', width:7, height:7, borderRadius:'50%', background:'#3b82f6', boxShadow:'0 0 10px rgba(59,130,246,0.5)' }} />
        </div>
        <div style={{ position:'absolute', top:'50%', left:'50%', width:140, height:140, marginTop:-70, marginLeft:-70, borderRadius:'50%', background:'radial-gradient(circle, rgba(251,191,36,0.12), rgba(180,83,9,0.04), transparent 70%)', filter:'blur(10px)', animation:'drift 10s ease-in-out infinite' }} />

        {/* ── ORBIT 2 — top right ── */}
        <div style={{
          position: 'absolute', top: '2%', right: '-3%',
          width: 210, height: 210, borderRadius: '50%',
          border: '1.5px solid rgba(180,83,9,0.16)',
          animation: 'spin-slow 28s linear infinite',
        }}>
          <div style={{ position:'absolute', top:-7, left:'50%', transform:'translateX(-50%)', width:13, height:13, borderRadius:'50%', background:'radial-gradient(circle, #fde68a 20%, #b45309)', boxShadow:'0 0 14px #d97706, 0 0 26px rgba(180,83,9,0.25)' }} />
          <div style={{ position:'absolute', top:'50%', right:-5, transform:'translateY(-50%)', width:8, height:8, borderRadius:'50%', background:'#f59e0b', boxShadow:'0 0 8px rgba(245,158,11,0.5)' }} />
        </div>
        <div style={{
          position: 'absolute', top: 'calc(2% + 35px)', right: 'calc(-3% + 35px)',
          width: 140, height: 140, borderRadius: '50%',
          border: '1px dashed rgba(124,58,237,0.14)',
          animation: 'spin-slow-reverse 22s linear infinite',
        }}>
          <div style={{ position:'absolute', top:-5, left:'50%', transform:'translateX(-50%)', width:9, height:9, borderRadius:'50%', background:'radial-gradient(circle, #ddd6fe 20%, #7c3aed)', boxShadow:'0 0 12px rgba(124,58,237,0.55)' }} />
        </div>
        <div style={{ position:'absolute', top:'4%', right:'1%', width:110, height:110, borderRadius:'50%', background:'radial-gradient(circle, rgba(180,83,9,0.09), transparent)', filter:'blur(14px)', animation:'drift 10s ease-in-out infinite 2s' }} />

        {/* Content */}
        <div style={{ position:'relative', zIndex:10 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:48 }}>
            <div style={{ width:40, height:40, borderRadius:12, background:'linear-gradient(135deg, #b45309, #d97706)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 14px rgba(180,83,9,0.3)' }}>
              <span className="playfair" style={{ color:'white', fontWeight:900, fontSize:18 }}>C</span>
            </div>
            <span className="playfair" style={{ color:C.text, fontWeight:800, fontSize:22 }}>ClariPath</span>
          </div>

          <h2 className="playfair" style={{ fontSize:40, fontWeight:900, color:C.text, lineHeight:1.1, marginBottom:16, letterSpacing:'-0.02em' }}>
            Welcome<br />
            <span className="gold-text">back.</span>
          </h2>

          <p style={{ fontSize:15, color:C.textMid, lineHeight:1.7, marginBottom:44, maxWidth:320 }}>
            Your roadmap is waiting. Pick up exactly where you left off and keep moving towards your goal.
          </p>

          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {[
              { num:'01', text:'Your personalised roadmap is saved', color: C.gold },
              { num:'02', text:'Tasks, progress & score — all intact', color:'#7c3aed' },
              { num:'03', text:'Continue your 4-year journey', color:'#1d4ed8' },
            ].map((s) => (
              <div key={s.num} style={{ display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ width:34, height:34, borderRadius:10, background:`${s.color}12`, border:`1px solid ${s.color}25`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span className="playfair" style={{ color:s.color, fontSize:11, fontWeight:900 }}>{s.num}</span>
                </div>
                <span style={{ color:C.textMid, fontSize:13 }}>{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          RIGHT PANEL
      ══════════════════════════════ */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 24px', background: C.bg, overflowY:'auto' }}>
        <div className="login-form" style={{ width:'100%', maxWidth:420 }}>

          {/* Mobile logo */}
          <div className="flex lg:hidden" style={{ alignItems:'center', gap:10, marginBottom:28 }}>
            <div style={{ width:34, height:34, borderRadius:10, background:'linear-gradient(135deg, #b45309, #d97706)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span className="playfair" style={{ color:'white', fontWeight:900, fontSize:15 }}>C</span>
            </div>
            <span className="playfair" style={{ fontWeight:800, fontSize:18, color:C.text }}>ClariPath</span>
          </div>

          {/* ─── LOGIN VIEW ─── */}
          {view === 'login' && <>

            <div style={{ marginBottom:28 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 12px', borderRadius:100, background: C.goldBg, border:`1px solid ${C.goldBorder}`, marginBottom:14 }}>
                <span style={{ width:5, height:5, borderRadius:'50%', background:C.gold, display:'inline-block' }} />
                <span style={{ color:C.gold, fontSize:11, fontWeight:600, letterSpacing:'0.04em' }}>Welcome back</span>
              </div>
              <h3 className="playfair" style={{ fontSize:28, fontWeight:900, color:C.text, marginBottom:6, letterSpacing:'-0.02em' }}>Sign in to ClariPath</h3>
              <p style={{ fontSize:14, color:C.textLight }}>Continue your journey — your roadmap is waiting</p>
            </div>

            {error && (
              <div style={{ display:'flex', alignItems:'center', gap:8, background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626', fontSize:13, padding:'12px 16px', borderRadius:12, marginBottom:20 }}>
                ⚠ {error}
              </div>
            )}

            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>

              {/* Email — identical style to register inputs */}
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  className="reg-input"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  placeholder="you@example.com"
                  style={inputStyle}
                />
              </div>

              {/* Password */}
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:5 }}>
                  <label style={{ ...labelStyle, marginBottom:0 }}>Password</label>
                  <button
                    onClick={() => { setForgotEmail(email); setForgotError(''); setView('forgot') }}
                    style={{ fontSize:12, fontWeight:600, color:C.gold, background:'none', border:'none', cursor:'pointer', padding:0, fontFamily:'DM Sans, system-ui, sans-serif' }}>
                    Forgot password?
                  </button>
                </div>
                <div style={{ position:'relative' }}>
                  <input
                    className="reg-input"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                    placeholder="Enter your password"
                    style={{ ...inputStyle, paddingRight: 44 }}
                  />
                  <EyeButton show={showPassword} toggle={() => setShowPassword(!showPassword)} />
                </div>
              </div>

              {/* Submit */}
              <button
                className="btn-gold"
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width:'100%', padding:'13px', borderRadius:12, border:'none',
                  background: loading ? '#e5ddd0' : 'linear-gradient(135deg, #b45309, #d97706)',
                  color: loading ? C.textLight : 'white',
                  fontWeight:700, fontSize:14,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: loading ? 'none' : '0 4px 18px rgba(180,83,9,0.28)',
                  marginTop:4, fontFamily:'DM Sans, sans-serif',
                }}>
                {loading ? (
                  <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                    <svg style={{ animation:'spin 1s linear infinite', width:16, height:16 }} fill="none" viewBox="0 0 24 24">
                      <circle style={{ opacity:0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path style={{ opacity:0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Signing in...
                  </span>
                ) : 'Sign In →'}
              </button>
            </div>

            {/* Divider */}
            <div style={{ display:'flex', alignItems:'center', gap:12, margin:'20px 0' }}>
              <div style={{ flex:1, height:1, background:C.border }} />
              <span style={{ fontSize:12, color:C.textLight }}>Don't have an account?</span>
              <div style={{ flex:1, height:1, background:C.border }} />
            </div>

            <Link to="/register" style={{ textDecoration:'none' }}>
              <div style={{
                width:'100%', padding:'12px', borderRadius:12, textAlign:'center',
                background:C.white, border:`1.5px solid ${C.border}`,
                color:C.textMid, fontWeight:600, fontSize:14, cursor:'pointer',
                boxSizing:'border-box', display:'block',
              }}>
                Create an account
              </div>
            </Link>
          </>}

          {/* ─── FORGOT PASSWORD VIEW ─── */}
          {view === 'forgot' && <>

            <button onClick={() => setView('login')}
              style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, color:C.textLight, background:'none', border:'none', cursor:'pointer', padding:0, marginBottom:32, fontWeight:600, fontFamily:'DM Sans, system-ui, sans-serif' }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
              Back to login
            </button>

            <div style={{ width:50, height:50, borderRadius:14, background:C.goldBg, border:`1px solid ${C.goldBorder}`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18, color:C.gold }}>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
              </svg>
            </div>

            <div style={{ marginBottom:24 }}>
              <h3 className="playfair" style={{ fontSize:26, fontWeight:900, color:C.text, marginBottom:8, letterSpacing:'-0.02em' }}>Forgot password?</h3>
              <p style={{ fontSize:14, color:C.textLight, lineHeight:1.65 }}>No worries. Enter your registered email and we'll send you a reset link.</p>
            </div>

            {forgotError && (
              <div style={{ display:'flex', alignItems:'center', gap:8, background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626', fontSize:13, padding:'12px 16px', borderRadius:12, marginBottom:18 }}>
                ⚠ {forgotError}
              </div>
            )}

            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  className="reg-input"
                  type="email"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleForgot()}
                  placeholder="you@example.com"
                  style={inputStyle}
                />
              </div>
              <button
                className="btn-gold"
                onClick={handleForgot}
                disabled={forgotLoading}
                style={{
                  width:'100%', padding:'13px', borderRadius:12, border:'none',
                  background: forgotLoading ? '#e5ddd0' : 'linear-gradient(135deg, #b45309, #d97706)',
                  color: forgotLoading ? C.textLight : 'white',
                  fontWeight:700, fontSize:14,
                  cursor: forgotLoading ? 'not-allowed' : 'pointer',
                  boxShadow: forgotLoading ? 'none' : '0 4px 18px rgba(180,83,9,0.28)',
                  fontFamily:'DM Sans, sans-serif',
                }}>
                {forgotLoading ? (
                  <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                    <svg style={{ animation:'spin 1s linear infinite', width:16, height:16 }} fill="none" viewBox="0 0 24 24">
                      <circle style={{ opacity:0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path style={{ opacity:0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Sending...
                  </span>
                ) : 'Send Reset Link →'}
              </button>
            </div>
          </>}

          {/* ─── EMAIL SENT VIEW ─── */}
          {view === 'sent' && (
            <div style={{ textAlign:'center' }}>
              <div style={{ width:64, height:64, borderRadius:18, background:'#f0fdf4', border:'1px solid #bbf7d0', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 22px', color:'#16a34a' }}>
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>

              <h3 className="playfair" style={{ fontSize:26, fontWeight:900, color:C.text, marginBottom:10, letterSpacing:'-0.02em' }}>Check your email</h3>
              <p style={{ fontSize:14, color:C.textLight, marginBottom:6, lineHeight:1.65 }}>We've sent a reset link to</p>
              <p style={{ fontSize:14, fontWeight:700, color:C.gold, marginBottom:22 }}>{forgotEmail}</p>
              <p style={{ fontSize:13, color:C.textLight, marginBottom:30, lineHeight:1.6 }}>
                Didn't receive it? Check your spam folder or try a different email.
              </p>

              <button
                onClick={() => { setView('forgot'); setForgotError('') }}
                style={{ width:'100%', padding:'12px', borderRadius:12, border:`1.5px solid ${C.border}`, background:C.white, color:C.textMid, fontWeight:600, fontSize:14, cursor:'pointer', marginBottom:12, transition:'all 0.2s', fontFamily:'DM Sans, system-ui, sans-serif' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=C.gold; e.currentTarget.style.color=C.gold }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.textMid }}>
                Try a different email
              </button>

              <button
                className="btn-gold"
                onClick={() => setView('login')}
                style={{ width:'100%', padding:'12px', borderRadius:12, border:'none', background:'linear-gradient(135deg, #b45309, #d97706)', color:'white', fontWeight:700, fontSize:14, cursor:'pointer', boxShadow:'0 4px 18px rgba(180,83,9,0.28)', fontFamily:'DM Sans, sans-serif' }}>
                Back to Sign In
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default LoginPage