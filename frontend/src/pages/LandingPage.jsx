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
    { icon: '🎯', title: 'Goal Discovery', desc: 'Answer 10 smart questions. The system analyses your answers and recommends the perfect career path for you.' },
    { icon: '🗺️', title: 'Personal Roadmap', desc: 'Get a full 16-week roadmap built around your college syllabus and career goal. One semester at a time.' },
    { icon: '⚡', title: 'Living Plan', desc: 'Miss a week? The system detects it and rebuilds your plan around your real situation automatically.' },
    { icon: '📈', title: 'Readiness Score', desc: 'Track your placement readiness from 0 to 100 as you complete tasks and build real skills.' },
  ]

  const steps = [
    { num: '01', title: 'Answer 10 Questions', desc: 'Tell us your interests, strengths, and working style. No goal needed — the system figures it out for you.', color: '#3b82f6' },
    { num: '02', title: 'System Finds Your Goal', desc: 'Get 3 to 5 career recommendations with match percentages and reasoning. You confirm the one that fits.', color: '#8b5cf6' },
    { num: '03', title: 'Get Your Roadmap', desc: 'A full 16-week semester plan with tasks, resources, and timelines — built specifically for you.', color: '#06b6d4' },
    { num: '04', title: 'Track and Adapt', desc: 'Complete tasks, rate your confidence. The system watches your progress and adjusts the plan in real time.', color: '#10b981' },
  ]

  const stats = [
    { value: '16', label: 'Weeks per Semester' },
    { value: '8', label: 'Semesters Mapped' },
    { value: '4', label: 'Year Journey' },
    { value: '1', label: 'Sem at a Time' },
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
    <div style={{ background: '#04080f', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', overflowX: 'hidden' }}>

      {/* ── CURSOR GLOW (follows mouse) ── */}
      <div className="fixed pointer-events-none z-0"
        style={{
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.06), transparent 70%)',
          transition: 'left 0.1s ease, top 0.1s ease',
        }} />

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(4,8,15,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center relative"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
              <div className="absolute inset-0 rounded-xl opacity-50"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', filter: 'blur(8px)' }} />
              <span className="relative text-white font-bold text-base">C</span>
            </div>
            <span className="text-white font-bold text-xl tracking-wide">ClariPath</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Features', id: 'features' },
              { label: 'How it works', id: 'how-it-works' },
              { label: 'Journey', id: 'journey' },
            ].map(item => (
              <button key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm transition-all duration-200 hover:text-white"
                style={{ color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer' }}>
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/login')}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-white"
              style={{ color: 'rgba(255,255,255,0.6)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
              Sign in
            </button>
            <button onClick={() => navigate('/register')}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px rgba(59,130,246,0.3)' }}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Main orbs */}
          <div className="absolute rounded-full"
            style={{ top: '15%', left: '10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(59,130,246,0.18), transparent 70%)', filter: 'blur(40px)', animation: 'pulse 8s ease-in-out infinite' }} />
          <div className="absolute rounded-full"
            style={{ bottom: '10%', right: '8%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)', filter: 'blur(50px)', animation: 'pulse 10s ease-in-out infinite reverse' }} />
          <div className="absolute rounded-full"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, background: 'radial-gradient(circle, rgba(6,182,212,0.08), transparent 70%)', filter: 'blur(60px)', animation: 'pulse 12s ease-in-out infinite' }} />
          {/* Extra depth orbs */}
          <div className="absolute rounded-full"
            style={{ top: '70%', left: '20%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(16,185,129,0.08), transparent 70%)', filter: 'blur(40px)' }} />
          <div className="absolute rounded-full"
            style={{ top: '20%', right: '20%', width: 250, height: 250, background: 'radial-gradient(circle, rgba(245,158,11,0.06), transparent 70%)', filter: 'blur(40px)' }} />
        </div>

        {/* Subtle dot grid */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          }} />

        {/* Animated lines */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="absolute"
              style={{
                top: `${25 + i * 25}%`,
                left: 0,
                right: 0,
                height: '1px',
                background: `linear-gradient(90deg, transparent, rgba(${i === 0 ? '59,130,246' : i === 1 ? '139,92,246' : '6,182,212'},0.5), transparent)`,
                animation: `slideLine ${4 + i * 2}s linear infinite`,
              }} />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold mb-10"
            style={{
              background: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(59,130,246,0.25)',
              color: '#93c5fd',
              backdropFilter: 'blur(10px)',
            }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Intelligent Academic Navigation System
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          </div>

          {/* Headline */}
          <h1 className="font-black leading-none mb-8"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)', color: 'white', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Your Career.{' '}
            <br className="hidden sm:block" />
            <span style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 45%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 30px rgba(59,130,246,0.3))',
            }}>
              Built for You.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 300 }}>
            ClariPath turns your college years into a structured, intelligent journey.
            No confusion. No random learning. Just a clear path from Semester 1 to placement.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button onClick={() => navigate('/register')}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                color: 'white', border: 'none', cursor: 'pointer',
                boxShadow: '0 0 40px rgba(59,130,246,0.35), 0 4px 20px rgba(0,0,0,0.3)',
              }}>
              Start Your Journey — Free
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button onClick={() => navigate('/login')}
              className="px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.04)',
                color: 'rgba(255,255,255,0.75)',
                border: '1px solid rgba(255,255,255,0.12)',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
              }}>
              Sign In
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <div key={s.value} className="rounded-2xl p-5 text-center relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(10px)',
                }}>
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{ background: 'rgba(59,130,246,0.05)' }} />
                <div className="relative text-3xl font-black mb-1"
                  style={{
                    background: `linear-gradient(135deg, ${['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'][i]}, white)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                  {s.value}
                </div>
                <div className="relative text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection('features')}>
          <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>Scroll</span>
          <div className="w-5 h-9 rounded-full flex items-start justify-center pt-2"
            style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
            <div className="w-1 h-2.5 rounded-full animate-bounce"
              style={{ background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6)' }} />
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-32 relative">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.06), transparent 60%)' }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-5"
              style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', color: '#c4b5fd' }}>
              Core Features
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
              Intelligence at every step
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.35)' }}>
              The system works silently in the background so you always know exactly what to do next.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <div key={i}
                onClick={() => setActiveFeature(i)}
                onMouseEnter={() => setActiveFeature(i)}
                className="rounded-2xl p-8 cursor-pointer relative overflow-hidden group"
                style={{
                  background: activeFeature === i
                    ? 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.06))'
                    : 'rgba(255,255,255,0.02)',
                  border: activeFeature === i
                    ? '1px solid rgba(59,130,246,0.35)'
                    : '1px solid rgba(255,255,255,0.06)',
                  transform: activeFeature === i ? 'translateY(-6px)' : 'translateY(0)',
                  boxShadow: activeFeature === i ? '0 30px 80px rgba(59,130,246,0.12)' : 'none',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}>
                {activeFeature === i && (
                  <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)' }} />
                )}
                <div className="text-4xl mb-5">{f.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-32 relative">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.06), transparent 60%)' }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-5"
              style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)', color: '#67e8f9' }}>
              How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
              From zero to roadmap<br />in 10 minutes
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Four steps. No technical knowledge needed. Just answer honestly.
            </p>
          </div>

          {/* Steps — vertical timeline on mobile, horizontal on desktop */}
          <div className="relative">

            {/* Connecting line desktop */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), rgba(139,92,246,0.3), rgba(6,182,212,0.3), transparent)', zIndex: 0 }} />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center lg:items-center group">

                  {/* Number circle */}
                  <div className="w-24 h-24 rounded-2xl flex items-center justify-center mb-6 relative transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}20, ${step.color}10)`,
                      border: `1px solid ${step.color}40`,
                      boxShadow: `0 0 30px ${step.color}15`,
                    }}>
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `radial-gradient(circle at center, ${step.color}20, transparent)` }} />
                    <span className="text-3xl font-black relative"
                      style={{ color: step.color }}>
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── JOURNEY ── */}
      <section id="journey" className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-3xl p-10 md:p-14 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.06), rgba(139,92,246,0.06))',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 40px 120px rgba(0,0,0,0.4)',
            }}>

            <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)', filter: 'blur(60px)' }} />
            <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-15"
              style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', filter: 'blur(50px)' }} />

            <div className="relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-5"
                  style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)', color: '#c4b5fd' }}>
                  The Journey Model
                </div>
                <h2 className="text-4xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
                  4 years. 8 semesters.<br />One at a time.
                </h2>
                <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Your full college journey is mapped from day one. But you only ever see one semester —
                  keeping you focused without overwhelming you.
                </p>
              </div>

              {/* Semester timeline */}
              <div className="grid grid-cols-4 lg:grid-cols-8 gap-2 mb-10">
                {semesters.map((s, i) => (
                  <div key={i} className="rounded-xl p-3 text-center relative overflow-hidden transition-all duration-300"
                    style={{
                      background: s.status === 'active' ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.02)',
                      border: s.status === 'active' ? '1px solid rgba(59,130,246,0.5)' : '1px solid rgba(255,255,255,0.06)',
                      boxShadow: s.status === 'active' ? '0 0 30px rgba(59,130,246,0.25)' : 'none',
                    }}>
                    {s.status === 'active' && (
                      <div className="absolute top-0 left-0 right-0 h-px"
                        style={{ background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)' }} />
                    )}
                    <div className="text-xs font-bold mb-1.5"
                      style={{ color: s.status === 'active' ? '#60a5fa' : 'rgba(255,255,255,0.25)' }}>
                      {s.sem}
                    </div>
                    <div className="text-base mb-1.5">
                      {s.status === 'active' ? '🟢' : '🔒'}
                    </div>
                    <div className="text-xs leading-tight hidden lg:block"
                      style={{ color: s.status === 'active' ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.15)' }}>
                      {s.desc}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { icon: '📖', title: 'Sem 1 — Full Detail', desc: '16-week plan with tasks, resources, and weekly focus. Built on your profile and college syllabus.', color: '#3b82f6' },
                  { icon: '🔄', title: 'Each New Sem — Rebuilt Fresh', desc: 'When Sem 1 ends, Sem 2 is built using your real performance data — not a generic template.', color: '#8b5cf6' },
                  { icon: '🏁', title: 'Sem 8 — Placement Ready', desc: 'By Sem 8, your roadmap has adapted to everything you actually learned and built.', color: '#06b6d4' },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl p-5 relative overflow-hidden group"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                      style={{ background: `linear-gradient(135deg, ${item.color}08, transparent)` }} />
                    <div className="relative">
                      <div className="text-2xl mb-3">{item.icon}</div>
                      <div className="text-sm font-bold text-white mb-2">{item.title}</div>
                      <div className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT CLARIPATH IS NOT ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
              What ClariPath is <span style={{ color: '#ef4444', filter: 'drop-shadow(0 0 10px rgba(239,68,68,0.4))' }}>not</span>
            </h2>
            <p className="text-base" style={{ color: 'rgba(255,255,255,0.35)' }}>
              ClariPath is not another platform trying to do everything.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { no: 'Not a course platform', yes: 'It does not host content' },
              { no: 'Not a random roadmap blog', yes: 'Every roadmap is built for one specific student' },
              { no: 'Not a motivational app', yes: 'No quotes, no badges, no gamification' },
              { no: 'Not a chatbot', yes: 'The system works silently — you never chat with it' },
              { no: 'Not a static checklist', yes: 'The roadmap changes based on what actually happens' },
              { no: 'Not a generic plan', yes: 'Your branch, your semester, your goal — always' },
            ].map((item, i) => (
              <div key={i}
                className="rounded-xl p-5 flex items-start gap-3 group transition-all duration-300 hover:border-red-500/20"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', cursor: 'default' }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  <span className="text-red-400 text-xs font-bold">✗</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white mb-1">{item.no}</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{item.yes}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.12), transparent 65%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.08), transparent 50%)' }} />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8"
            style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#93c5fd' }}>
            Ready to start?
          </div>
          <h2 className="font-black text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Stop guessing.<br />
            <span style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(59,130,246,0.3))',
            }}>
              Start building.
            </span>
          </h2>
          <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Join ClariPath today. Get your personalised roadmap in under 10 minutes.
          </p>
          <button onClick={() => navigate('/register')}
            className="px-10 py-4 rounded-2xl font-bold text-base transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              color: 'white', border: 'none', cursor: 'pointer',
              boxShadow: '0 0 60px rgba(59,130,246,0.4), 0 4px 30px rgba(0,0,0,0.3)',
            }}>
            Get Started — It's Free
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
              <span className="text-white font-bold text-xs">C</span>
            </div>
            <span className="font-bold" style={{ color: 'rgba(255,255,255,0.5)' }}>ClariPath</span>
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © 2026 ClariPath. Direction over content.
          </p>
        </div>
      </footer>

      {/* ── CSS ANIMATIONS ── */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes slideLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

    </div>
  )
}

export default LandingPage