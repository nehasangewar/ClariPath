import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

const C = {
  bg: '#f5f0e8', bgAlt: '#ede8df', text: '#1c1917', textMid: '#44403c',
  textLight: '#78716c', gold: '#b45309', goldLight: '#d97706',
  goldBg: '#fef3c7', goldBorder: '#fcd34d', border: '#e5ddd0',
  white: '#ffffff',
}

const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  padding: '11px 16px',
  borderRadius: '12px', border: `1.5px solid ${C.border}`,
  background: C.white, color: C.text, fontSize: '14px',
  outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: 'DM Sans, system-ui, sans-serif',
  appearance: 'none', WebkitAppearance: 'none',
}

const labelStyle = {
  display: 'block', fontSize: '13px', fontWeight: '600',
  color: C.textMid, marginBottom: '5px',
  fontFamily: 'DM Sans, system-ui, sans-serif',
}

const Req = () => <span style={{ color: '#dc2626' }}>*</span>

const EyeButton = ({ show, toggle }) => (
  <button type="button" onClick={toggle}
    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: C.textLight, padding: 4 }}>
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

const ChevronDown = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
    style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: C.textLight }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)

function RegisterPage() {
  const [firstName, setFirstName]             = useState('')
  const [middleName, setMiddleName]           = useState('')
  const [lastName, setLastName]               = useState('')
  const [universityId, setUniversityId]       = useState('')
  const [collegeId, setCollegeId]             = useState('')
  const [email, setEmail]                     = useState('')
  const [password, setPassword]               = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword]       = useState(false)
  const [showConfirm, setShowConfirm]         = useState(false)
  const [error, setError]                     = useState('')
  const [loading, setLoading]                 = useState(false)

  const [universities, setUniversities]       = useState([])
  const [colleges, setColleges]               = useState([])
  const [loadingColleges, setLoadingColleges] = useState(false)

  const navigate = useNavigate()
  // ── CHANGED: use `register` instead of `login` ──
  const { register } = useAuth()

  useEffect(() => {
    api.get('/api/universities')
      .then(res => setUniversities(res.data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!universityId) { setColleges([]); setCollegeId(''); return }
    setLoadingColleges(true)
    setCollegeId('')
    api.get(`/api/universities/${universityId}/colleges`)
      .then(res => setColleges(res.data))
      .catch(() => setColleges([]))
      .finally(() => setLoadingColleges(false))
  }, [universityId])

  const handleSubmit = async () => {
    setError('')
    if (!firstName || !lastName || !universityId || !collegeId || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields.')
      return
    }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }

    setLoading(true)
    try {
      const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ')
      const selectedCollege = colleges.find(c => c.id === parseInt(collegeId))
      const collegeName = selectedCollege ? selectedCollege.name : ''
      const res = await api.post('/api/auth/register', {
        name: fullName,
        college: collegeName,
        collegeId: parseInt(collegeId),
        universityId: parseInt(universityId),
        email,
        password
      })
      // ── CHANGED: call register() not login() — always goes to onboarding ──
      register(res.data.user, res.data.token)
      navigate('/onboarding')
    } catch {
      setError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'DM Sans, system-ui, sans-serif' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800;900&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spin-slow-reverse { from{transform:rotate(360deg)} to{transform:rotate(0deg)} }
        @keyframes drift {
          0%,100%{transform:translate(0,0)} 33%{transform:translate(12px,-10px)} 66%{transform:translate(-8px,8px)}
        }
        @keyframes shimmer-gold {
          0%{background-position:-200% center} 100%{background-position:200% center}
        }
        input::placeholder, select::placeholder { color: #a8a29e; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 30px #ffffff inset !important;
          -webkit-text-fill-color: #1c1917 !important;
        }
        .reg-input:focus, .reg-select:focus {
          border-color: #b45309 !important;
          box-shadow: 0 0 0 3px rgba(180,83,9,0.1) !important;
        }
        .reg-select option { color: #1c1917; background: #fff; }
        .btn-gold { transition: all 0.25s ease !important; }
        .btn-gold:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(180,83,9,0.35) !important;
        }
        .playfair { font-family: 'Playfair Display', Georgia, serif; }
        .gold-text {
          background: linear-gradient(135deg, #b45309, #d97706, #f59e0b, #d97706, #b45309);
          background-size: 300% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: shimmer-gold 4s linear infinite;
        }
      `}</style>

      {/* ══ LEFT PANEL ══ */}
      <div className="hidden lg:flex" style={{
        width: '45%', position: 'relative', overflow: 'hidden',
        background: `linear-gradient(160deg, #fef9f0 0%, ${C.bgAlt} 50%, #ede0cc 100%)`,
        flexDirection: 'column', justifyContent: 'center', padding: '0 60px',
        borderRight: `1px solid ${C.border}`,
      }}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse at 20% 30%, rgba(251,191,36,0.2) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(180,83,9,0.1) 0%, transparent 45%)` }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:`radial-gradient(rgba(180,83,9,0.1) 1px, transparent 1px)`, backgroundSize:'36px 36px', maskImage:'radial-gradient(ellipse at center, black 20%, transparent 80%)' }} />

        <div style={{ position:'absolute', top:'50%', left:'50%', width:400, height:400, marginTop:-200, marginLeft:-200, borderRadius:'50%', border:'1.5px solid rgba(180,83,9,0.18)', animation:'spin-slow 38s linear infinite' }}>
          <div style={{ position:'absolute', top:-8, left:'50%', transform:'translateX(-50%)', width:15, height:15, borderRadius:'50%', background:'radial-gradient(circle, #fde68a 20%, #b45309)', boxShadow:'0 0 16px #d97706, 0 0 30px rgba(180,83,9,0.3)' }} />
          <div style={{ position:'absolute', bottom:-6, left:'50%', transform:'translateX(-50%)', width:9, height:9, borderRadius:'50%', background:'#d97706', boxShadow:'0 0 10px rgba(217,119,6,0.5)' }} />
          <div style={{ position:'absolute', top:'50%', right:-6, transform:'translateY(-50%)', width:9, height:9, borderRadius:'50%', background:'#f59e0b', boxShadow:'0 0 10px rgba(245,158,11,0.5)' }} />
        </div>
        <div style={{ position:'absolute', top:'50%', left:'50%', width:270, height:270, marginTop:-135, marginLeft:-135, borderRadius:'50%', border:'1px dashed rgba(180,83,9,0.12)', animation:'spin-slow-reverse 50s linear infinite' }}>
          <div style={{ position:'absolute', top:'50%', left:-6, transform:'translateY(-50%)', width:11, height:11, borderRadius:'50%', background:'radial-gradient(circle, #c4b5fd 20%, #7c3aed)', boxShadow:'0 0 12px rgba(124,58,237,0.55)' }} />
          <div style={{ position:'absolute', bottom:-5, left:'50%', transform:'translateX(-50%)', width:7, height:7, borderRadius:'50%', background:'#3b82f6', boxShadow:'0 0 10px rgba(59,130,246,0.5)' }} />
        </div>
        <div style={{ position:'absolute', top:'50%', left:'50%', width:140, height:140, marginTop:-70, marginLeft:-70, borderRadius:'50%', background:'radial-gradient(circle, rgba(251,191,36,0.12), rgba(180,83,9,0.04), transparent 70%)', filter:'blur(10px)', animation:'drift 10s ease-in-out infinite' }} />

        <div style={{ position:'absolute', top:'2%', right:'-3%', width:210, height:210, borderRadius:'50%', border:'1.5px solid rgba(180,83,9,0.16)', animation:'spin-slow 28s linear infinite' }}>
          <div style={{ position:'absolute', top:-7, left:'50%', transform:'translateX(-50%)', width:13, height:13, borderRadius:'50%', background:'radial-gradient(circle, #fde68a 20%, #b45309)', boxShadow:'0 0 14px #d97706' }} />
          <div style={{ position:'absolute', top:'50%', right:-5, transform:'translateY(-50%)', width:8, height:8, borderRadius:'50%', background:'#f59e0b', boxShadow:'0 0 8px rgba(245,158,11,0.5)' }} />
        </div>
        <div style={{ position:'absolute', top:'calc(2% + 35px)', right:'calc(-3% + 35px)', width:140, height:140, borderRadius:'50%', border:'1px dashed rgba(124,58,237,0.14)', animation:'spin-slow-reverse 22s linear infinite' }}>
          <div style={{ position:'absolute', top:-5, left:'50%', transform:'translateX(-50%)', width:9, height:9, borderRadius:'50%', background:'radial-gradient(circle, #ddd6fe 20%, #7c3aed)', boxShadow:'0 0 12px rgba(124,58,237,0.55)' }} />
        </div>
        <div style={{ position:'absolute', top:'4%', right:'1%', width:110, height:110, borderRadius:'50%', background:'radial-gradient(circle, rgba(180,83,9,0.09), transparent)', filter:'blur(14px)', animation:'drift 10s ease-in-out infinite 2s' }} />

        <div style={{ position:'relative', zIndex:10 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:48 }}>
            <div style={{ width:40, height:40, borderRadius:12, background:'linear-gradient(135deg,#b45309,#d97706)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 14px rgba(180,83,9,0.3)' }}>
              <span className="playfair" style={{ color:'white', fontWeight:900, fontSize:18 }}>C</span>
            </div>
            <span className="playfair" style={{ color:C.text, fontWeight:800, fontSize:22 }}>ClariPath</span>
          </div>
          <h2 className="playfair" style={{ fontSize:40, fontWeight:900, color:C.text, lineHeight:1.1, marginBottom:16, letterSpacing:'-0.02em' }}>
            Start your<br /><span className="gold-text">journey today.</span>
          </h2>
          <p style={{ fontSize:15, color:C.textMid, lineHeight:1.7, marginBottom:44, maxWidth:320 }}>
            Answer a few questions. The system builds a personalised 4-year roadmap around your college, your branch, and your goal.
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {[
              { num:'01', text:'Answer 10 discovery questions', color: C.gold },
              { num:'02', text:'System recommends your career goal', color:'#7c3aed' },
              { num:'03', text:'Get your 16-week roadmap instantly', color:'#1d4ed8' },
            ].map(s => (
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

      {/* ══ RIGHT PANEL ══ */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 24px', background:C.bg, overflowY:'auto' }}>
        <div style={{ width:'100%', maxWidth:420 }}>

          <div className="flex lg:hidden" style={{ alignItems:'center', gap:10, marginBottom:28 }}>
            <div style={{ width:34, height:34, borderRadius:10, background:'linear-gradient(135deg,#b45309,#d97706)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span className="playfair" style={{ color:'white', fontWeight:900, fontSize:15 }}>C</span>
            </div>
            <span className="playfair" style={{ fontWeight:800, fontSize:18, color:C.text }}>ClariPath</span>
          </div>

          <div style={{ marginBottom:28 }}>
            <h3 className="playfair" style={{ fontSize:28, fontWeight:900, color:C.text, marginBottom:6, letterSpacing:'-0.02em' }}>Create your account</h3>
            <p style={{ fontSize:14, color:C.textLight }}>Get your personalised roadmap in under 10 minutes</p>
          </div>

          {error && (
            <div style={{ display:'flex', alignItems:'center', gap:8, background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626', fontSize:13, padding:'12px 16px', borderRadius:12, marginBottom:20 }}>
              ⚠ {error}
            </div>
          )}

          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
              <div>
                <label style={labelStyle}>First Name <Req /></label>
                <input className="reg-input" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Middle <span style={{ fontSize:11, fontWeight:500, color:C.textLight }}>(opt)</span></label>
                <input className="reg-input" type="text" value={middleName} onChange={e => setMiddleName(e.target.value)} placeholder="Middle" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Last Name <Req /></label>
                <input className="reg-input" type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last" style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>University <Req /></label>
              <div style={{ position:'relative' }}>
                <select className="reg-select" value={universityId} onChange={e => setUniversityId(e.target.value)}
                  style={{ ...inputStyle, paddingRight:36, cursor:'pointer', color: universityId ? C.text : '#a8a29e' }}>
                  <option value="" disabled hidden>Select your university</option>
                  {universities.map(u => (
                    <option key={u.id} value={u.id}>{u.name}{u.shortName ? ` (${u.shortName})` : ''}</option>
                  ))}
                </select>
                <ChevronDown />
              </div>
            </div>

            <div>
              <label style={labelStyle}>College <Req /></label>
              <div style={{ position:'relative' }}>
                <select className="reg-select" value={collegeId} onChange={e => setCollegeId(e.target.value)}
                  disabled={!universityId || loadingColleges}
                  style={{ ...inputStyle, paddingRight:36, cursor: (!universityId || loadingColleges) ? 'not-allowed' : 'pointer', color: collegeId ? C.text : '#a8a29e', opacity: !universityId ? 0.6 : 1, background: !universityId ? C.bgAlt : C.white }}>
                  <option value="" disabled hidden>
                    {loadingColleges ? 'Loading colleges...' : !universityId ? 'Select university first' : 'Select your college'}
                  </option>
                  {colleges.map(c => (
                    <option key={c.id} value={c.id}>{c.name}{c.shortName ? ` (${c.shortName})` : ''}</option>
                  ))}
                </select>
                <ChevronDown />
              </div>
              {universityId && !loadingColleges && colleges.length === 0 && (
                <p style={{ fontSize:12, marginTop:5, color:C.textLight }}>
                  No colleges found for this university. Contact support to add yours.
                </p>
              )}
            </div>

            <div>
              <label style={labelStyle}>Email Address <Req /></label>
              <input className="reg-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Password <Req /></label>
              <div style={{ position:'relative' }}>
                <input className="reg-input" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 8 characters" style={{ ...inputStyle, paddingRight:'44px' }} />
                <EyeButton show={showPassword} toggle={() => setShowPassword(!showPassword)} />
              </div>
              {password.length > 0 && (() => {
                let score = 0
                if (password.length >= 8) score++
                if (/[A-Z]/.test(password)) score++
                if (/[0-9]/.test(password)) score++
                if (/[^A-Za-z0-9]/.test(password)) score++
                const levels = [
                  { label: 'Too short', color: '#ef4444' },
                  { label: 'Weak',      color: '#f97316' },
                  { label: 'Fair',      color: '#eab308' },
                  { label: 'Good',      color: '#84cc16' },
                  { label: 'Strong',    color: '#16a34a' },
                ]
                const { label, color } = levels[score]
                return (
                  <div style={{ marginTop:8 }}>
                    <div style={{ display:'flex', gap:4, marginBottom:4 }}>
                      {[0,1,2,3].map(i => (
                        <div key={i} style={{ flex:1, height:3, borderRadius:4, background: i < score ? color : C.border, transition:'background 0.2s' }} />
                      ))}
                    </div>
                    <p style={{ fontSize:11, fontWeight:600, color, margin:0 }}>{label}</p>
                  </div>
                )
              })()}
            </div>

            <div>
              <label style={labelStyle}>Confirm Password <Req /></label>
              <div style={{ position:'relative' }}>
                <input className="reg-input" type={showConfirm ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Repeat your password" style={{ ...inputStyle, paddingRight:'44px' }} />
                <EyeButton show={showConfirm} toggle={() => setShowConfirm(!showConfirm)} />
              </div>
              {confirmPassword.length > 0 && (
                <p style={{ fontSize:12, marginTop:5, fontWeight:600, color: password === confirmPassword ? '#16a34a' : '#dc2626' }}>
                  {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                </p>
              )}
            </div>

            <button className="btn-gold" onClick={handleSubmit} disabled={loading}
              style={{
                width:'100%', padding:'13px', borderRadius:'12px', border:'none',
                background: loading ? '#e5ddd0' : 'linear-gradient(135deg,#b45309,#d97706)',
                color: loading ? C.textLight : 'white',
                fontWeight:700, fontSize:'14px',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 4px 18px rgba(180,83,9,0.28)',
                marginTop:4, fontFamily:'DM Sans, sans-serif',
              }}>
              {loading ? (
                <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                  <svg style={{ animation:'spin 1s linear infinite', width:16, height:16 }} fill="none" viewBox="0 0 24 24">
                    <circle style={{ opacity:0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path style={{ opacity:0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating account...
                </span>
              ) : 'Create Account →'}
            </button>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:12, margin:'20px 0' }}>
            <div style={{ flex:1, height:1, background:C.border }} />
            <span style={{ fontSize:12, color:C.textLight }}>Already have an account?</span>
            <div style={{ flex:1, height:1, background:C.border }} />
          </div>

          <Link to="/login" style={{ textDecoration:'none' }}>
            <div style={{ width:'100%', padding:'12px', borderRadius:'12px', textAlign:'center', background:C.white, border:`1.5px solid ${C.border}`, color:C.textMid, fontWeight:600, fontSize:14, cursor:'pointer', boxSizing:'border-box', display:'block' }}>
              Sign in instead
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage