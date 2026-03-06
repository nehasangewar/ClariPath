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
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const features = [
    { icon: '🎯', title: 'Goal Discovery', desc: 'Answer 10 smart questions. The system analyses your answers and recommends the perfect career path for you.', accent: '#f59e0b' },
    { icon: '🗺️', title: 'Personal Roadmap', desc: 'Get a full 16-week roadmap built around your college syllabus and career goal. One semester at a time.', accent: '#3b82f6' },
    { icon: '⚡', title: 'Living Plan', desc: 'Miss a week? The system detects it and rebuilds your plan around your real situation automatically.', accent: '#a855f7' },
    { icon: '📈', title: 'Readiness Score', desc: 'Track your placement readiness from 0 to 100 as you complete tasks and build real skills.', accent: '#10b981' },
  ]

  const steps = [
    { num: '01', title: 'Answer 10 Questions', desc: 'Tell us your interests, strengths, and working style. No goal needed — the system figures it out for you.', color: '#3b82f6', glow: 'rgba(59,130,246,0.4)' },
    { num: '02', title: 'System Finds Your Goal', desc: 'Get 3 to 5 career recommendations with match percentages and reasoning. You confirm the one that fits.', color: '#a855f7', glow: 'rgba(168,85,247,0.4)' },
    { num: '03', title: 'Get Your Roadmap', desc: 'A full 16-week semester plan with tasks, resources, and timelines — built specifically for you.', color: '#06b6d4', glow: 'rgba(6,182,212,0.4)' },
    { num: '04', title: 'Track and Adapt', desc: 'Complete tasks, rate your confidence. The system watches your progress and adjusts the plan in real time.', color: '#10b981', glow: 'rgba(16,185,129,0.4)' },
  ]

  const stats = [
    { value: '16', label: 'Weeks per Semester', color: '#3b82f6' },
    { value: '8', label: 'Semesters Mapped', color: '#a855f7' },
    { value: '4', label: 'Year Journey', color: '#06b6d4' },
    { value: '1', label: 'Sem at a Time', color: '#10b981' },
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

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #1a0533 35%, #0c1445 65%, #0f0c29 100%)', minHeight: '100vh', fontFamily: "'DM Sans', system-ui, sans-serif", overflowX: 'hidden' }}>

      {/* ── GOOGLE FONTS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;900&family=Syne:wght@700;800;900&display=swap');

        * { box-sizing: border-box; }

        @keyframes orb-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes orb-float-reverse {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(30px) scale(0.97); }
        }
        @keyframes slideLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes shimmer {
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
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(60px); }
        }

        .syne { font-family: 'Syne', sans-serif; }

        .shimmer-text {
          background: linear-gradient(90deg, #3b82f6, #a855f7, #06b6d4, #f59e0b, #3b82f6);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        .hero-badge {
          animation: fadeInUp 0.8s ease forwards;
        }
        .hero-h1 {
          animation: fadeInUp 0.8s ease 0.1s both;
        }
        .hero-sub {
          animation: fadeInUp 0.8s ease 0.2s both;
        }
        .hero-ctas {
          animation: fadeInUp 0.8s ease 0.3s both;
        }
        .hero-stats {
          animation: fadeInUp 0.8s ease 0.4s both;
        }

        .nav-link:hover { color: white !important; }

        .feature-card:hover {
          transform: translateY(-8px) !important;
        }

        .stat-card:hover .stat-number {
          filter: drop-shadow(0 0 12px currentColor);
        }

        .step-card:hover .step-number {
          transform: scale(1.1);
        }

        .not-card:hover {
          border-color: rgba(239,68,68,0.3) !important;
          background: rgba(239,68,68,0.03) !important;
        }
      `}</style>

      {/* ── CURSOR GLOW ── */}
      <div style={{
        position: 'fixed',
        left: mousePos.x - 300,
        top: mousePos.y - 300,
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.08), rgba(168,85,247,0.04), transparent 70%)',
        transition: 'left 0.08s ease, top 0.08s ease',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? 'rgba(5,8,22,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(99,102,241,0.15)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ position: 'relative', width: 36, height: 36 }}>
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 10,
                background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                filter: 'blur(8px)', opacity: 0.7,
              }} />
              <div style={{
                position: 'relative', width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: 'white', fontWeight: 900, fontSize: 16, fontFamily: 'Syne, sans-serif' }}>C</span>
              </div>
            </div>
            <span className="syne" style={{ color: 'white', fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em' }}>ClariPath</span>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {[{ label: 'Features', id: 'features' }, { label: 'How it works', id: 'how-it-works' }, { label: 'Journey', id: 'journey' }].map(item => (
              <button key={item.id} className="nav-link" onClick={() => scrollToSection(item.id)}
                style={{ color: 'rgba(255,255,255,0.45)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, transition: 'color 0.2s', fontFamily: 'DM Sans, sans-serif' }}>
                {item.label}
              </button>
            ))}
          </div>

          {/* Auth buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => navigate('/login')}
              style={{ padding: '8px 18px', borderRadius: 8, color: 'rgba(255,255,255,0.6)', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif' }}>
              Sign in
            </button>
            <button onClick={() => navigate('/register')}
              style={{
                padding: '8px 20px', borderRadius: 8, color: 'white', border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 600, fontFamily: 'DM Sans, sans-serif',
                background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                boxShadow: '0 0 20px rgba(99,102,241,0.4)',
                transition: 'all 0.2s',
              }}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

        {/* Moving grid background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'grid-move 8s linear infinite',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
        }} />

        {/* Large vivid orbs */}
        <div style={{
          position: 'absolute', top: '-5%', left: '-10%',
          width: 700, height: 700, borderRadius: '50%',
         background: 'radial-gradient(circle, rgba(99,102,241,0.55), rgba(139,92,246,0.25), transparent 65%)',
          filter: 'blur(60px)',
          animation: 'orb-float 10s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-10%',
          width: 800, height: 800, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.5), rgba(236,72,153,0.2), transparent 65%)',
          filter: 'blur(70px)',
          animation: 'orb-float-reverse 12s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', top: '30%', right: '15%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.4), transparent 65%)',
          filter: 'blur(50px)',
          animation: 'orb-float 8s ease-in-out infinite 2s',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', left: '15%',
          width: 350, height: 350, borderRadius: '50%',
         background: 'radial-gradient(circle, rgba(245,158,11,0.3), transparent 65%)',
          filter: 'blur(50px)',
          animation: 'orb-float-reverse 9s ease-in-out infinite 1s',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 500, height: 500, borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(16,185,129,0.07), transparent 65%)',
          filter: 'blur(80px)',
        }} />

        {/* Spinning rings */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 900, height: 900,
          marginTop: -450, marginLeft: -450,
          borderRadius: '50%',
          border: '1px solid rgba(99,102,241,0.08)',
          animation: 'spin-slow 40s linear infinite',
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: -6,
            width: 12, height: 12, borderRadius: '50%',
            background: '#3b82f6',
            boxShadow: '0 0 20px #3b82f6',
            transform: 'translateY(-50%)',
          }} />
        </div>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 700, height: 700,
          marginTop: -350, marginLeft: -350,
          borderRadius: '50%',
          border: '1px solid rgba(168,85,247,0.08)',
          animation: 'spin-slow-reverse 30s linear infinite',
        }}>
          <div style={{
            position: 'absolute', top: -6, left: '50%',
            width: 12, height: 12, borderRadius: '50%',
            background: '#a855f7',
            boxShadow: '0 0 20px #a855f7',
            transform: 'translateX(-50%)',
          }} />
        </div>

        {/* Animated scan lines */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.15 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              position: 'absolute',
              top: `${20 + i * 30}%`,
              left: 0, right: 0, height: 1,
              background: `linear-gradient(90deg, transparent, rgba(${i === 0 ? '59,130,246' : i === 1 ? '168,85,247' : '6,182,212'},0.8), transparent)`,
              animation: `slideLine ${5 + i * 2}s linear infinite`,
            }} />
          ))}
        </div>

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 960, margin: '0 auto', paddingTop: 80 }}>

          {/* Badge */}
          <div className="hero-badge" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 100,
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.3)',
            marginBottom: 32,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', boxShadow: '0 0 8px #6366f1', display: 'inline-block', animation: 'glow-pulse 2s ease infinite' }} />
            <span style={{ color: '#a5b4fc', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em' }}>Intelligent Academic Navigation System</span>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', boxShadow: '0 0 8px #6366f1', display: 'inline-block', animation: 'glow-pulse 2s ease infinite 0.5s' }} />
          </div>

          {/* Headline */}
          <h1 className="hero-h1 syne" style={{
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
            fontWeight: 900,
            color: 'white',
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            marginBottom: 28,
          }}>
            Your Career.{' '}
<span className="shimmer-text">Built for You.</span>
          </h1>

          {/* Subheadline */}
          <p className="hero-sub" style={{
            fontSize: 18, maxWidth: 580, margin: '0 auto 48px',
            color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontWeight: 300,
          }}>
            ClariPath turns your college years into a structured, intelligent journey.
            No confusion. No random learning. Just a clear path from Semester 1 to placement.
          </p>

          {/* CTAs */}
          <div className="hero-ctas" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 72, flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/register')} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '14px 32px', borderRadius: 14,
              background: 'linear-gradient(135deg, #3b82f6, #6366f1, #a855f7)',
              color: 'white', border: 'none', cursor: 'pointer',
              fontSize: 15, fontWeight: 700, fontFamily: 'DM Sans, sans-serif',
              boxShadow: '0 0 50px rgba(99,102,241,0.5), 0 4px 20px rgba(0,0,0,0.4)',
              transition: 'all 0.3s ease',
            }}>
              Start Your Journey — Free
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button onClick={() => navigate('/login')} style={{
              padding: '14px 32px', borderRadius: 14,
              background: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer', fontSize: 15, fontWeight: 600,
              fontFamily: 'DM Sans, sans-serif',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
            }}>
              Sign In
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, maxWidth: 720, margin: '0 auto' }}>
            {stats.map((s) => (
              <div key={s.value} className="stat-card" style={{
                borderRadius: 16, padding: '20px 16px', textAlign: 'center',
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${s.color}25`,
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: 16,
                  background: `radial-gradient(circle at center, ${s.color}08, transparent 70%)`,
                }} />
                <div className="stat-number" style={{
                  fontSize: 32, fontWeight: 900, fontFamily: 'Syne, sans-serif',
                  color: s.color, marginBottom: 4, position: 'relative',
                  textShadow: `0 0 20px ${s.color}60`,
                }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', position: 'relative', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer',
        }} onClick={() => scrollToSection('features')}>
          <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>Scroll</span>
          <div style={{ width: 20, height: 36, borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 6 }}>
            <div style={{ width: 4, height: 8, borderRadius: 4, background: 'linear-gradient(to bottom, #6366f1, #a855f7)', animation: 'orb-float 1.5s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: '120px 0', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.08), transparent 60%)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 14px', borderRadius: 100,
              background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)',
              color: '#d8b4fe', fontSize: 12, fontWeight: 600, marginBottom: 16, letterSpacing: '0.05em',
            }}>Core Features</div>
            <h2 className="syne" style={{ fontSize: 48, fontWeight: 900, color: 'white', letterSpacing: '-0.03em', marginBottom: 16 }}>
              Intelligence at every step
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.35)', maxWidth: 480, margin: '0 auto' }}>
              The system works silently in the background so you always know exactly what to do next.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {features.map((f, i) => (
              <div key={i} className="feature-card"
                onClick={() => setActiveFeature(i)}
                onMouseEnter={() => setActiveFeature(i)}
                style={{
                  borderRadius: 20, padding: '36px 32px', cursor: 'pointer',
                  position: 'relative', overflow: 'hidden',
                  background: activeFeature === i
                    ? `linear-gradient(135deg, ${f.accent}12, ${f.accent}06)`
                    : 'rgba(255,255,255,0.02)',
                  border: activeFeature === i
                    ? `1px solid ${f.accent}40`
                    : '1px solid rgba(255,255,255,0.06)',
                  boxShadow: activeFeature === i ? `0 20px 60px ${f.accent}15` : 'none',
                  transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                }}>
                {activeFeature === i && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg, transparent, ${f.accent}, transparent)`,
                  }} />
                )}
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: `${f.accent}15`, border: `1px solid ${f.accent}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, marginBottom: 20,
                  boxShadow: activeFeature === i ? `0 0 20px ${f.accent}30` : 'none',
                  transition: 'all 0.3s',
                }}>{f.icon}</div>
                <h3 className="syne" style={{ fontSize: 20, fontWeight: 800, color: 'white', marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: '120px 0', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.07), transparent 60%)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 14px', borderRadius: 100,
              background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)',
              color: '#67e8f9', fontSize: 12, fontWeight: 600, marginBottom: 16, letterSpacing: '0.05em',
            }}>How It Works</div>
            <h2 className="syne" style={{ fontSize: 48, fontWeight: 900, color: 'white', letterSpacing: '-0.03em', marginBottom: 16 }}>
              From zero to roadmap<br />in 10 minutes
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.35)', maxWidth: 420, margin: '0 auto' }}>
              Four steps. No technical knowledge needed. Just answer honestly.
            </p>
          </div>

          <div style={{ position: 'relative' }}>
            {/* Connecting line */}
            <div style={{
              position: 'absolute', top: 56, left: '12.5%', right: '12.5%', height: 1,
              background: 'linear-gradient(90deg, rgba(59,130,246,0.5), rgba(168,85,247,0.5), rgba(6,182,212,0.5), rgba(16,185,129,0.5))',
              zIndex: 0,
            }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, position: 'relative', zIndex: 10 }}>
              {steps.map((step, i) => (
                <div key={i} className="step-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{
                    width: 112, height: 112, borderRadius: 24,
                    background: `linear-gradient(135deg, ${step.color}20, ${step.color}08)`,
                    border: `1px solid ${step.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 24, position: 'relative',
                    boxShadow: `0 0 40px ${step.glow}`,
                    transition: 'all 0.3s',
                  }}>
                    <div style={{
                      position: 'absolute', inset: 0, borderRadius: 24,
                      background: `radial-gradient(circle, ${step.color}15, transparent)`,
                    }} />
                    <span className="step-number syne" style={{
                      fontSize: 32, fontWeight: 900, color: step.color,
                      textShadow: `0 0 20px ${step.glow}`,
                      position: 'relative', transition: 'transform 0.3s',
                    }}>{step.num}</span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── JOURNEY ── */}
      <section id="journey" style={{ padding: '80px 0 120px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            borderRadius: 28, padding: '56px 64px', position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(59,130,246,0.07), rgba(99,102,241,0.05), rgba(168,85,247,0.07))',
            border: '1px solid rgba(99,102,241,0.2)',
            boxShadow: '0 40px 120px rgba(0,0,0,0.5)',
          }}>
            {/* Decorative orbs inside card */}
            <div style={{ position: 'absolute', top: -60, right: -60, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.25), transparent)', filter: 'blur(60px)' }} />
            <div style={{ position: 'absolute', bottom: -60, left: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.2), transparent)', filter: 'blur(50px)' }} />
            <div style={{ position: 'absolute', top: '50%', right: '30%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.1), transparent)', filter: 'blur(40px)' }} />

            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '5px 14px', borderRadius: 100,
                  background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.3)',
                  color: '#d8b4fe', fontSize: 12, fontWeight: 600, marginBottom: 16, letterSpacing: '0.05em',
                }}>The Journey Model</div>
                <h2 className="syne" style={{ fontSize: 42, fontWeight: 900, color: 'white', letterSpacing: '-0.03em', marginBottom: 16 }}>
                  4 years. 8 semesters.<br />One at a time.
                </h2>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>
                  Your full college journey is mapped from day one. But you only ever see one semester —
                  keeping you focused without overwhelming you.
                </p>
              </div>

              {/* Semester timeline */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 8, marginBottom: 40 }}>
                {semesters.map((s, i) => (
                  <div key={i} style={{
                    borderRadius: 14, padding: '12px 8px', textAlign: 'center',
                    position: 'relative', overflow: 'hidden',
                    background: s.status === 'active' ? 'rgba(99,102,241,0.18)' : 'rgba(255,255,255,0.02)',
                    border: s.status === 'active' ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.06)',
                    boxShadow: s.status === 'active' ? '0 0 30px rgba(99,102,241,0.3)' : 'none',
                    transition: 'all 0.3s',
                  }}>
                    {s.status === 'active' && (
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #6366f1, transparent)' }} />
                    )}
                    <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6, color: s.status === 'active' ? '#a5b4fc' : 'rgba(255,255,255,0.2)' }}>{s.sem}</div>
                    <div style={{ fontSize: 14, marginBottom: 6 }}>{s.status === 'active' ? '🟢' : '🔒'}</div>
                    <div style={{ fontSize: 10, lineHeight: 1.3, color: s.status === 'active' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.12)' }}>{s.desc}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[
                  { icon: '📖', title: 'Sem 1 — Full Detail', desc: '16-week plan with tasks, resources, and weekly focus. Built on your profile and college syllabus.', color: '#3b82f6' },
                  { icon: '🔄', title: 'Each New Sem — Rebuilt Fresh', desc: 'When Sem 1 ends, Sem 2 is built using your real performance data — not a generic template.', color: '#a855f7' },
                  { icon: '🏁', title: 'Sem 8 — Placement Ready', desc: 'By Sem 8, your roadmap has adapted to everything you actually learned and built.', color: '#06b6d4' },
                ].map((item, i) => (
                  <div key={i} style={{
                    borderRadius: 16, padding: '22px', position: 'relative', overflow: 'hidden',
                    background: `${item.color}08`, border: `1px solid ${item.color}20`,
                    transition: 'all 0.3s',
                  }}>
                    <div style={{ fontSize: 24, marginBottom: 12 }}>{item.icon}</div>
                    <div className="syne" style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 8 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT CLARIPATH IS NOT ── */}
      <section style={{ padding: '80px 0 120px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="syne" style={{ fontSize: 42, fontWeight: 900, color: 'white', letterSpacing: '-0.03em', marginBottom: 12 }}>
              What ClariPath is{' '}
              <span style={{ color: '#f87171', filter: 'drop-shadow(0 0 15px rgba(248,113,113,0.5))' }}>not</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 15 }}>ClariPath is not another platform trying to do everything.</p>
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
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                cursor: 'default', transition: 'all 0.3s',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2,
                }}>
                  <span style={{ color: '#f87171', fontSize: 11, fontWeight: 900 }}>✗</span>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 4 }}>{item.no}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>{item.yes}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '100px 0 140px', position: 'relative', overflow: 'hidden' }}>
        {/* Big vivid background blobs for CTA */}
        <div style={{ position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.15), transparent 65%)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', top: '50%', right: '20%', transform: 'translateY(-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.12), transparent 65%)', filter: 'blur(80px)' }} />

        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '5px 14px', borderRadius: 100,
            background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)',
            color: '#a5b4fc', fontSize: 12, fontWeight: 600, marginBottom: 28, letterSpacing: '0.05em',
          }}>Ready to start?</div>

          <h2 className="syne" style={{
            fontWeight: 900, color: 'white', marginBottom: 20,
            fontSize: 'clamp(2.8rem, 6vw, 5rem)', letterSpacing: '-0.04em', lineHeight: 1.0,
          }}>
            Stop guessing.<br />
            <span className="shimmer-text">Start building.</span>
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.4)', marginBottom: 40, lineHeight: 1.6 }}>
            Join ClariPath today. Get your personalised roadmap in under 10 minutes.
          </p>
          <button onClick={() => navigate('/register')} style={{
            padding: '16px 48px', borderRadius: 16,
            background: 'linear-gradient(135deg, #3b82f6, #6366f1, #a855f7)',
            color: 'white', border: 'none', cursor: 'pointer',
            fontSize: 16, fontWeight: 700, fontFamily: 'DM Sans, sans-serif',
            boxShadow: '0 0 80px rgba(99,102,241,0.5), 0 4px 30px rgba(0,0,0,0.4)',
            transition: 'all 0.3s ease',
          }}>
            Get Started — It's Free
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '28px 0', borderTop: '1px solid rgba(99,102,241,0.1)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #3b82f6, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 900, fontSize: 13, fontFamily: 'Syne, sans-serif' }}>C</span>
            </div>
            <span className="syne" style={{ fontWeight: 700, color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>ClariPath</span>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.18)' }}>© 2026 ClariPath. Direction over content.</p>
        </div>
      </footer>

    </div>
  )
}

export default LandingPage