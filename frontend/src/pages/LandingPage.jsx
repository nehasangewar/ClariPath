import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

function LandingPage() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const features = [
    { icon: '🎯', title: 'Goal Discovery', desc: 'Answer 10 smart questions. The system analyses your answers and recommends the perfect career path for you.', accent: '#b45309' },
    { icon: '🗺️', title: 'Personal Roadmap', desc: 'Get a full 16-week roadmap built around your college syllabus and career goal. One semester at a time.', accent: '#1d4ed8' },
    { icon: '⚡', title: 'Living Plan', desc: 'Miss a week? The system detects it and rebuilds your plan around your real situation automatically.', accent: '#7c3aed' },
    { icon: '📈', title: 'Readiness Score', desc: 'Track your placement readiness from 0 to 100 as you complete tasks and build real skills.', accent: '#047857' },
  ]

  const steps = [
    { num: '01', title: 'Answer 10 Questions', desc: 'Tell us your interests, strengths, and working style. No goal needed — the system figures it out for you.', color: '#b45309' },
    { num: '02', title: 'System Finds Your Goal', desc: 'Get 3 to 5 career recommendations with match percentages and reasoning. You confirm the one that fits.', color: '#7c3aed' },
    { num: '03', title: 'Get Your Roadmap', desc: 'A full 16-week semester plan with tasks, resources, and timelines — built specifically for you.', color: '#1d4ed8' },
    { num: '04', title: 'Track and Adapt', desc: 'Complete tasks, rate your confidence. The system watches your progress and adjusts the plan in real time.', color: '#047857' },
  ]

  const stats = [
    { value: '16', label: 'Weeks per Semester', color: '#b45309' },
    { value: '8', label: 'Semesters Mapped', color: '#7c3aed' },
    { value: '4', label: 'Year Journey', color: '#1d4ed8' },
    { value: '1', label: 'Sem at a Time', color: '#047857' },
  ]

  const semesters = [
    { sem: 'Sem 1', status: 'active', desc: 'Full 16-week roadmap' },
    { sem: 'Sem 2', status: 'locked', desc: 'Built after Sem 1' },
    { sem: 'Sem 3', status: 'locked', desc: 'Adapts to Sem 2' },
    { sem: 'Sem 4', status: 'locked', desc: 'Milestones only' },
    { sem: 'Sem 5', status: 'locked', desc: 'Milestones only' },
    { sem: 'Sem 6', status: 'locked', desc: 'Milestones only' },
    { sem: 'Sem 7', status: 'locked', desc: 'Milestones only' },
    { sem: 'Sem 8', status: 'locked', desc: 'Placement ready' },
  ]

  const C = {
    bg: '#f5f0e8',
    bgAlt: '#ede8df',
    text: '#1c1917',
    textMid: '#44403c',
    textLight: '#78716c',
    gold: '#b45309',
    goldLight: '#d97706',
    goldBg: '#fef3c7',
    goldBorder: '#fcd34d',
    border: '#e5ddd0',
    white: '#ffffff',
    cardBg: '#faf7f2',
  }

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: "'DM Sans', system-ui, sans-serif", overflowX: 'hidden' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes shimmer-gold {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(18px, -14px) scale(1.04); }
          66% { transform: translate(-12px, 10px) scale(0.97); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.4); }
        }

        .playfair { font-family: 'Playfair Display', Georgia, serif; }

        .gold-text {
          background: linear-gradient(135deg, #b45309, #d97706, #f59e0b, #d97706, #b45309);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-gold 4s linear infinite;
        }

        .hero-in { animation: fadeInUp 0.7s ease both; }
        .hero-in-1 { animation-delay: 0.05s; }
        .hero-in-2 { animation-delay: 0.15s; }
        .hero-in-3 { animation-delay: 0.25s; }
        .hero-in-4 { animation-delay: 0.35s; }

        .btn-primary {
          transition: all 0.25s ease !important;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(180,83,9,0.35) !important;
        }
        .btn-secondary:hover {
          background: #ede8df !important;
        }
        .feature-card {
          transition: all 0.35s ease !important;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08) !important;
        }
        .step-card:hover .step-num {
          transform: scale(1.08);
        }
        .not-card:hover {
          border-color: #fca5a5 !important;
          background: #fff5f5 !important;
        }
        .nav-link:hover {
          color: #1c1917 !important;
        }
        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.07) !important;
        }
      `}</style>

      {/* Subtle cursor glow */}
      <div style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 0,
        left: mousePos.x - 200, top: mousePos.y - 200,
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(180,83,9,0.04), transparent 70%)',
        transition: 'left 0.1s ease, top 0.1s ease',
      }} />

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? 'rgba(245,240,232,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? `1px solid ${C.border}` : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #b45309, #d97706)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(180,83,9,0.3)',
            }}>
              <span style={{ color: 'white', fontWeight: 900, fontSize: 16, fontFamily: 'Playfair Display, serif' }}>C</span>
            </div>
            <span className="playfair" style={{ color: C.text, fontWeight: 800, fontSize: 20 }}>ClariPath</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {[{ label: 'Features', id: 'features' }, { label: 'How it works', id: 'how-it-works' }, { label: 'Journey', id: 'journey' }].map(item => (
              <button key={item.id} className="nav-link" onClick={() => scrollToSection(item.id)}
                style={{ color: C.textLight, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, transition: 'color 0.2s', fontFamily: 'DM Sans, sans-serif' }}>
                {item.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => navigate('/login')} className="btn-secondary"
              style={{ padding: '8px 20px', borderRadius: 8, color: C.textMid, background: 'transparent', border: `1px solid ${C.border}`, cursor: 'pointer', fontSize: 13, fontWeight: 600, transition: 'all 0.2s' }}>
              Sign In
            </button>
            <button onClick={() => navigate('/register')} className="btn-primary"
              style={{ padding: '8px 20px', borderRadius: 8, color: 'white', background: 'linear-gradient(135deg, #b45309, #d97706)', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, boxShadow: '0 4px 14px rgba(180,83,9,0.3)' }}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: 80 }}>

        {/* Warm background texture */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse at 12% 35%, rgba(251,191,36,0.18) 0%, transparent 45%),
            radial-gradient(ellipse at 88% 25%, rgba(180,83,9,0.12) 0%, transparent 40%),
            radial-gradient(ellipse at 55% 85%, rgba(217,119,6,0.1) 0%, transparent 45%),
            radial-gradient(ellipse at 75% 65%, rgba(124,58,237,0.06) 0%, transparent 35%),
            radial-gradient(ellipse at 25% 70%, rgba(29,78,216,0.05) 0%, transparent 35%)
          `,
        }} />

        {/* Subtle dot grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(180,83,9,0.12) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 75%)',
        }} />

        {/* ══ ORBIT 1 — CENTER ══ */}
        {/* Soft glow core */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 280, height: 280, marginTop: -140, marginLeft: -140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.1), rgba(180,83,9,0.04), transparent 70%)', filter: 'blur(12px)' }} />
        {/* Outer ring — gold */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 580, height: 580, marginTop: -290, marginLeft: -290,
          borderRadius: '50%',
          border: '1.5px solid rgba(180,83,9,0.2)',
          boxShadow: '0 0 0 1px rgba(251,191,36,0.06), inset 0 0 60px rgba(180,83,9,0.03)',
          animation: 'spin-slow 38s linear infinite',
        }}>
          <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', width: 16, height: 16, borderRadius: '50%', background: 'radial-gradient(circle, #fde68a 20%, #b45309)', boxShadow: '0 0 18px #d97706, 0 0 36px rgba(180,83,9,0.35)' }} />
          <div style={{ position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)', width: 10, height: 10, borderRadius: '50%', background: '#d97706', boxShadow: '0 0 12px rgba(217,119,6,0.55)' }} />
          <div style={{ position: 'absolute', top: '50%', right: -6, transform: 'translateY(-50%)', width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 12px rgba(245,158,11,0.5)' }} />
        </div>
        {/* Inner ring — dashed warm amber, reverse spin */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 400, height: 400, marginTop: -200, marginLeft: -200,
          borderRadius: '50%',
          border: '1px dashed rgba(180,83,9,0.13)',
          animation: 'spin-slow-reverse 55s linear infinite',
        }}>
          <div style={{ position: 'absolute', top: '50%', left: -7, transform: 'translateY(-50%)', width: 12, height: 12, borderRadius: '50%', background: 'radial-gradient(circle, #c4b5fd 20%, #7c3aed)', boxShadow: '0 0 14px rgba(124,58,237,0.6), 0 0 28px rgba(124,58,237,0.2)' }} />
          <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', boxShadow: '0 0 12px rgba(59,130,246,0.55)' }} />
        </div>

        {/* ══ ORBIT 2 — TOP RIGHT ══ */}
        {/* Soft glow core */}
        <div style={{ position: 'absolute', top: '7%', right: '7%', width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(180,83,9,0.1), rgba(251,191,36,0.05), transparent 70%)', filter: 'blur(14px)', animation: 'drift 10s ease-in-out infinite 2s' }} />
        {/* Outer ring — gold, spinning */}
        <div style={{
          position: 'absolute', top: '3%', right: '3%',
          width: 310, height: 310,
          borderRadius: '50%',
          border: '1.5px solid rgba(180,83,9,0.18)',
          boxShadow: '0 0 0 1px rgba(251,191,36,0.05), inset 0 0 40px rgba(180,83,9,0.03)',
          animation: 'spin-slow 28s linear infinite',
        }}>
          <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', width: 15, height: 15, borderRadius: '50%', background: 'radial-gradient(circle, #fde68a 20%, #b45309)', boxShadow: '0 0 16px #d97706, 0 0 32px rgba(180,83,9,0.3)' }} />
          <div style={{ position: 'absolute', top: '50%', right: -6, transform: 'translateY(-50%)', width: 9, height: 9, borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 10px rgba(245,158,11,0.55)' }} />
        </div>
        {/* Inner ring — purple dashed, reverse */}
        <div style={{
          position: 'absolute', top: 'calc(3% + 55px)', right: 'calc(3% + 55px)',
          width: 200, height: 200,
          borderRadius: '50%',
          border: '1px dashed rgba(124,58,237,0.16)',
          animation: 'spin-slow-reverse 22s linear infinite',
        }}>
          <div style={{ position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)', width: 11, height: 11, borderRadius: '50%', background: 'radial-gradient(circle, #ddd6fe 20%, #7c3aed)', boxShadow: '0 0 14px rgba(124,58,237,0.6)' }} />
          <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 7, height: 7, borderRadius: '50%', background: '#d97706', boxShadow: '0 0 8px rgba(217,119,6,0.5)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 900, margin: '0 auto' }}>

          {/* Badge */}
          <div className="hero-in hero-in-1" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 18px', borderRadius: 100,
            background: C.goldBg, border: `1px solid ${C.goldBorder}`,
            marginBottom: 28,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.gold, display: 'inline-block' }} />
            <span style={{ color: C.gold, fontSize: 12, fontWeight: 600, letterSpacing: '0.04em' }}>Intelligent Academic Navigation System</span>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.gold, display: 'inline-block' }} />
          </div>

          {/* Headline */}
          <h1 className="playfair hero-in hero-in-2" style={{
            fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)',
            fontWeight: 900, color: C.text,
            letterSpacing: '-0.02em', lineHeight: 1.1,
            marginBottom: 24,
          }}>
            Your Career.{' '}
            <span className="gold-text">Built for You.</span>
          </h1>

          {/* Sub */}
          <p className="hero-in hero-in-3" style={{
            fontSize: 17, maxWidth: 560, margin: '0 auto 44px',
            color: C.textMid, lineHeight: 1.7, fontWeight: 400,
          }}>
            ClariPath turns your college years into a structured, intelligent journey.
            No confusion. No random learning. Just a clear path from Semester 1 to placement.
          </p>

          {/* CTAs */}
          <div className="hero-in hero-in-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 64, flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/register')} className="btn-primary"
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '13px 30px', borderRadius: 12,
                background: 'linear-gradient(135deg, #b45309, #d97706)',
                color: 'white', border: 'none', cursor: 'pointer',
                fontSize: 15, fontWeight: 700,
                boxShadow: '0 4px 20px rgba(180,83,9,0.3)',
              }}>
              Start Your Journey — Free
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button onClick={() => navigate('/login')} className="btn-secondary"
              style={{
                padding: '13px 30px', borderRadius: 12,
                background: C.white, color: C.textMid,
                border: `1px solid ${C.border}`, cursor: 'pointer',
                fontSize: 15, fontWeight: 600,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'all 0.2s',
              }}>
              Sign In
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, maxWidth: 680, margin: '0 auto' }}>
            {stats.map((s) => (
              <div key={s.value} className="stat-card" style={{
                borderRadius: 16, padding: '20px 12px', textAlign: 'center',
                background: C.white, border: `1px solid ${C.border}`,
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                transition: 'all 0.3s',
              }}>
                <div style={{ fontSize: 30, fontWeight: 900, fontFamily: 'Playfair Display, serif', color: s.color, marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: C.textLight, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer',
        }} onClick={() => scrollToSection('features')}>
          <span style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.textLight }}>Scroll</span>
          <div style={{ width: 20, height: 34, borderRadius: 20, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 5 }}>
            <div style={{ width: 3, height: 7, borderRadius: 4, background: C.gold, animation: 'float 1.5s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: '100px 0', background: C.bgAlt, position: 'relative' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 100, background: C.goldBg, border: `1px solid ${C.goldBorder}`, color: C.gold, fontSize: 12, fontWeight: 600, marginBottom: 14 }}>
              Core Features
            </div>
            <h2 className="playfair" style={{ fontSize: 42, fontWeight: 900, color: C.text, letterSpacing: '-0.02em', marginBottom: 14 }}>
              Intelligence at every step
            </h2>
            <p style={{ fontSize: 15, color: C.textMid, maxWidth: 460, margin: '0 auto' }}>
              The system works silently in the background so you always know exactly what to do next.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {features.map((f, i) => (
              <div key={i} className="feature-card"
                onClick={() => setActiveFeature(i)}
                onMouseEnter={() => setActiveFeature(i)}
                style={{
                  borderRadius: 20, padding: '32px 28px', cursor: 'pointer',
                  background: activeFeature === i ? C.white : C.cardBg,
                  border: activeFeature === i ? `1.5px solid ${f.accent}30` : `1px solid ${C.border}`,
                  boxShadow: activeFeature === i ? `0 8px 32px rgba(0,0,0,0.08)` : '0 2px 8px rgba(0,0,0,0.04)',
                  position: 'relative', overflow: 'hidden',
                }}>
                {activeFeature === i && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${f.accent}, transparent)` }} />
                )}
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${f.accent}12`, border: `1px solid ${f.accent}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, marginBottom: 18,
                }}>{f.icon}</div>
                <h3 className="playfair" style={{ fontSize: 19, fontWeight: 800, color: C.text, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: '100px 0', background: C.bg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 100, background: 'rgba(29,78,216,0.08)', border: '1px solid rgba(29,78,216,0.2)', color: '#1d4ed8', fontSize: 12, fontWeight: 600, marginBottom: 14 }}>
              How It Works
            </div>
            <h2 className="playfair" style={{ fontSize: 42, fontWeight: 900, color: C.text, letterSpacing: '-0.02em', marginBottom: 14 }}>
              From zero to roadmap<br />in 10 minutes
            </h2>
            <p style={{ fontSize: 15, color: C.textMid, maxWidth: 400, margin: '0 auto' }}>
              Four steps. No technical knowledge needed. Just answer honestly.
            </p>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 52, left: '12.5%', right: '12.5%', height: 1, background: `linear-gradient(90deg, ${C.gold}, #7c3aed, #1d4ed8, #047857)`, opacity: 0.25 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, position: 'relative', zIndex: 10 }}>
              {steps.map((step, i) => (
                <div key={i} className="step-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{
                    width: 104, height: 104, borderRadius: 20,
                    background: `${step.color}10`, border: `1.5px solid ${step.color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 20, transition: 'all 0.3s',
                    boxShadow: `0 4px 20px ${step.color}15`,
                  }}>
                    <span className="step-num playfair" style={{ fontSize: 30, fontWeight: 900, color: step.color, transition: 'transform 0.3s', display: 'block' }}>{step.num}</span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.65 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── JOURNEY ── */}
      <section id="journey" style={{ padding: '80px 0 100px', background: C.bgAlt }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{
            borderRadius: 24, padding: '52px 56px',
            background: C.white, border: `1px solid ${C.border}`,
            boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(180,83,9,0.06), transparent)', filter: 'blur(40px)' }} />
            <div style={{ position: 'absolute', bottom: -60, left: -60, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.05), transparent)', filter: 'blur(40px)' }} />

            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{ textAlign: 'center', marginBottom: 44 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 100, background: C.goldBg, border: `1px solid ${C.goldBorder}`, color: C.gold, fontSize: 12, fontWeight: 600, marginBottom: 14 }}>
                  The Journey Model
                </div>
                <h2 className="playfair" style={{ fontSize: 38, fontWeight: 900, color: C.text, letterSpacing: '-0.02em', marginBottom: 14 }}>
                  4 years. 8 semesters.<br />One at a time.
                </h2>
                <p style={{ fontSize: 15, color: C.textMid, maxWidth: 500, margin: '0 auto', lineHeight: 1.65 }}>
                  Your full college journey is mapped from day one. But you only ever see one semester —
                  keeping you focused without overwhelming you.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 8, marginBottom: 36 }}>
                {semesters.map((s, i) => (
                  <div key={i} style={{
                    borderRadius: 12, padding: '12px 6px', textAlign: 'center',
                    background: s.status === 'active' ? C.goldBg : C.bgAlt,
                    border: s.status === 'active' ? `1.5px solid ${C.goldBorder}` : `1px solid ${C.border}`,
                    position: 'relative', overflow: 'hidden',
                  }}>
                    {s.status === 'active' && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />}
                    <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 5, color: s.status === 'active' ? C.gold : C.textLight }}>{s.sem}</div>
                    <div style={{ fontSize: 13, marginBottom: 5 }}>{s.status === 'active' ? '🟢' : '🔒'}</div>
                    <div style={{ fontSize: 9, lineHeight: 1.3, color: s.status === 'active' ? C.textMid : C.textLight }}>{s.desc}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                {[
                  { icon: '📖', title: 'Sem 1 — Full Detail', desc: '16-week plan with tasks, resources, and weekly focus. Built on your profile and college syllabus.', color: '#b45309' },
                  { icon: '🔄', title: 'Each New Sem — Rebuilt Fresh', desc: 'When Sem 1 ends, Sem 2 is built using your real performance data — not a generic template.', color: '#7c3aed' },
                  { icon: '🏁', title: 'Sem 8 — Placement Ready', desc: 'By Sem 8, your roadmap has adapted to everything you actually learned and built.', color: '#1d4ed8' },
                ].map((item, i) => (
                  <div key={i} style={{
                    borderRadius: 14, padding: '20px',
                    background: `${item.color}06`, border: `1px solid ${item.color}15`,
                  }}>
                    <div style={{ fontSize: 22, marginBottom: 10 }}>{item.icon}</div>
                    <div className="playfair" style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 7 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT CLARIPATH IS NOT ── */}
      <section style={{ padding: '80px 0 100px', background: C.bg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <h2 className="playfair" style={{ fontSize: 38, fontWeight: 900, color: C.text, letterSpacing: '-0.02em', marginBottom: 10 }}>
              What ClariPath is{' '}
              <span style={{ color: '#dc2626' }}>not</span>
            </h2>
            <p style={{ fontSize: 15, color: C.textMid }}>ClariPath is not another platform trying to do everything.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { no: 'Not a course platform', yes: 'It does not host content' },
              { no: 'Not a random roadmap blog', yes: 'Every roadmap is built for one specific student' },
              { no: 'Not a motivational app', yes: 'No quotes, no badges, no gamification' },
              { no: 'Not a chatbot', yes: 'The system works silently — you never chat with it' },
              { no: 'Not a static checklist', yes: 'The roadmap changes based on what actually happens' },
              { no: 'Not a generic plan', yes: 'Your branch, your semester, your goal — always' },
            ].map((item, i) => (
              <div key={i} className="not-card" style={{
                borderRadius: 14, padding: '18px 20px',
                display: 'flex', alignItems: 'flex-start', gap: 12,
                background: C.cardBg, border: `1px solid ${C.border}`,
                cursor: 'default', transition: 'all 0.25s',
              }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#fee2e2', border: '1px solid #fca5a5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <span style={{ color: '#dc2626', fontSize: 11, fontWeight: 900 }}>✗</span>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 4 }}>{item.no}</div>
                  <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.5 }}>{item.yes}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 0 120px', background: C.bgAlt, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '20%', transform: 'translateY(-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.12), transparent)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', top: '50%', right: '15%', transform: 'translateY(-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(180,83,9,0.08), transparent)', filter: 'blur(60px)' }} />

        <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 32px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 100, background: C.goldBg, border: `1px solid ${C.goldBorder}`, color: C.gold, fontSize: 12, fontWeight: 600, marginBottom: 24 }}>
            Ready to start?
          </div>
          <h2 className="playfair" style={{ fontWeight: 900, color: C.text, marginBottom: 18, fontSize: 'clamp(2.4rem, 5vw, 4rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Stop guessing.<br />
            <span className="gold-text">Start building.</span>
          </h2>
          <p style={{ fontSize: 16, color: C.textMid, marginBottom: 36, lineHeight: 1.65 }}>
            Join ClariPath today. Get your personalised roadmap in under 10 minutes.
          </p>
          <button onClick={() => navigate('/register')} className="btn-primary"
            style={{
              padding: '14px 44px', borderRadius: 14,
              background: 'linear-gradient(135deg, #b45309, #d97706)',
              color: 'white', border: 'none', cursor: 'pointer',
              fontSize: 16, fontWeight: 700,
              boxShadow: '0 4px 24px rgba(180,83,9,0.3)',
            }}>
            Get Started — It's Free
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '24px 0', borderTop: `1px solid ${C.border}`, background: C.bg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #b45309, #d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 900, fontSize: 13, fontFamily: 'Playfair Display, serif' }}>C</span>
            </div>
            <span className="playfair" style={{ fontWeight: 700, color: C.textMid, fontSize: 15 }}>ClariPath</span>
          </div>
          <p style={{ fontSize: 12, color: C.textLight }}>© 2026 ClariPath. Direction over content.</p>
        </div>
      </footer>

    </div>
  )
}

export default LandingPage