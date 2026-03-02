import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function LandingPage() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

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

  const features = [
    {
      icon: '🎯',
      title: 'Goal Discovery',
      desc: 'Answer 10 smart questions. The system analyses your answers and recommends the perfect career path for you.',
    },
    {
      icon: '🗺️',
      title: 'Personal Roadmap',
      desc: 'Get a full 16-week roadmap built around your college syllabus and career goal. One semester at a time.',
    },
    {
      icon: '⚡',
      title: 'Living Plan',
      desc: 'Miss a week? The system detects it and rebuilds your plan around your real situation automatically.',
    },
    {
      icon: '📈',
      title: 'Readiness Score',
      desc: 'Track your placement readiness from 0 to 100 as you complete tasks and build real skills.',
    },
  ]

  const steps = [
    { num: '01', title: 'Answer 10 Questions', desc: 'Tell us your interests, strengths, and working style. No goal needed — the system figures it out for you.' },
    { num: '02', title: 'System Finds Your Goal', desc: 'Get 3 to 5 career recommendations with match percentages and reasoning. You confirm the one that fits.' },
    { num: '03', title: 'Get Your Roadmap', desc: 'A full 16-week semester plan with tasks, resources, and timelines — built specifically for you.' },
    { num: '04', title: 'Track and Adapt', desc: 'Complete tasks, rate your confidence. The system watches your progress and adjusts the plan in real time.' },
  ]

  const stats = [
    { value: '16', label: 'Weeks per Semester' },
    { value: '8', label: 'Semesters Mapped' },
    { value: '4', label: 'Year Journey' },
    { value: '1', label: 'Sem Unlocked at a Time' },
  ]

  const semesters = [
    { sem: 'Sem 1', label: 'Active', status: 'active', desc: 'Full 16-week roadmap, week by week' },
    { sem: 'Sem 2', label: 'Locked', status: 'locked', desc: 'Built after Sem 1 completes' },
    { sem: 'Sem 3', label: 'Locked', status: 'locked', desc: 'Adapts to your Sem 2 results' },
    { sem: 'Sem 4', label: 'Locked', status: 'locked', desc: 'Milestone markers only' },
    { sem: 'Sem 5', label: 'Locked', status: 'locked', desc: 'Milestone markers only' },
    { sem: 'Sem 6', label: 'Locked', status: 'locked', desc: 'Milestone markers only' },
    { sem: 'Sem 7', label: 'Locked', status: 'locked', desc: 'Milestone markers only' },
    { sem: 'Sem 8', label: 'Locked', status: 'locked', desc: 'Placement ready' },
  ]

  return (
    <div style={{ background: '#04080f', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', overflowX: 'hidden' }}>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(4,8,15,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
              <span className="text-white font-bold text-base">C</span>
            </div>
            <span className="text-white font-bold text-xl tracking-wide">ClariPath</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'How it works', 'Journey'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm transition-colors duration-200 hover:text-white"
                style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/login')}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-white"
              style={{ color: 'rgba(255,255,255,0.6)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
              Sign in
            </button>
            <button onClick={() => navigate('/register')}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white', border: 'none', cursor: 'pointer' }}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)', filter: 'blur(80px)' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #06b6d4, transparent)', filter: 'blur(60px)', transform: 'translate(-50%,-50%)' }} />
        </div>

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8"
            style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', color: '#93c5fd' }}>
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Intelligent Academic Navigation System
          </div>

          {/* Headline */}
          <h1 className="font-bold leading-none mb-6"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', color: 'white', letterSpacing: '-0.02em' }}>
            Your Career.{' '}
            <span style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Built for You.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            ClariPath turns your college years into a structured, intelligent journey.
            No confusion. No random learning. Just a clear path from Semester 1 to placement.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button onClick={() => navigate('/register')}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 0 40px rgba(59,130,246,0.3)' }}>
              Start Your Journey — Free
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button onClick={() => navigate('/login')}
              className="px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>
              Sign In
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((s) => (
              <div key={s.value} className="rounded-2xl p-4 text-center"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-3xl font-bold"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {s.value}
                </div>
                <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Scroll to explore</span>
          <div className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
            <div className="w-1 h-2 rounded-full bg-blue-400 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-32 relative">
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', color: '#c4b5fd' }}>
              Core Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
              Intelligence at every step
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
              The system works silently in the background so you always know exactly what to do next.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div key={i}
                className="rounded-2xl p-8 transition-all duration-500 cursor-pointer"
                style={{
                  background: activeFeature === i ? 'rgba(59,130,246,0.08)' : 'rgba(255,255,255,0.02)',
                  border: activeFeature === i ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(255,255,255,0.06)',
                  transform: activeFeature === i ? 'translateY(-4px)' : 'none',
                  boxShadow: activeFeature === i ? '0 20px 60px rgba(59,130,246,0.1)' : 'none',
                }}
                onMouseEnter={() => setActiveFeature(i)}>
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-32 relative">
        <div className="absolute left-0 right-0 h-full opacity-10"
          style={{ background: 'radial-gradient(ellipse at center, #3b82f6, transparent 70%)' }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', color: '#67e8f9' }}>
              How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
              From zero to roadmap<br />in 10 minutes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative rounded-2xl p-6"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-3 z-10"
                    style={{ color: 'rgba(255,255,255,0.15)', fontSize: '20px' }}>→</div>
                )}
                <div className="text-3xl font-bold mb-4"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 YEAR JOURNEY ── */}
      <section id="journey" className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-3xl p-12 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))', border: '1px solid rgba(255,255,255,0.08)' }}>

            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)', filter: 'blur(60px)' }} />

            <div className="relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-4"
                  style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: '#c4b5fd' }}>
                  The Journey Model
                </div>
                <h2 className="text-4xl font-bold text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
                  4 years. 8 semesters.<br />One semester at a time.
                </h2>
                <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Your full college journey is mapped from day one. But you only ever see one semester at a time —
                  keeping you focused without overwhelming you.
                </p>
              </div>

              {/* Semester grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                {semesters.map((s, i) => (
                  <div key={i} className="rounded-xl p-3 text-center transition-all duration-300"
                    style={{
                      background: s.status === 'active' ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.03)',
                      border: s.status === 'active' ? '1px solid rgba(59,130,246,0.5)' : '1px solid rgba(255,255,255,0.06)',
                      boxShadow: s.status === 'active' ? '0 0 30px rgba(59,130,246,0.2)' : 'none',
                    }}>
                    <div className="text-xs font-bold mb-1"
                      style={{ color: s.status === 'active' ? '#3b82f6' : 'rgba(255,255,255,0.3)' }}>
                      {s.sem}
                    </div>
                    <div className="text-xs mb-2"
                      style={{ color: s.status === 'active' ? '#93c5fd' : 'rgba(255,255,255,0.2)' }}>
                      {s.status === 'active' ? '🟢' : '🔒'}
                    </div>
                    <div className="text-xs leading-tight hidden md:block"
                      style={{ color: s.status === 'active' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)' }}>
                      {s.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Explanation row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                {[
                  { icon: '📖', title: 'Sem 1 — Full Detail', desc: '16-week plan with tasks, resources, and weekly focus. Built on your profile and college syllabus.' },
                  { icon: '🔄', title: 'Each New Sem — Rebuilt Fresh', desc: 'When Sem 1 ends, Sem 2 is built using your real performance data — not a generic template.' },
                  { icon: '🏁', title: 'Sem 8 — Placement Ready', desc: 'By the time you reach Sem 8, your roadmap has adapted to everything you actually learned and built.' },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl p-5"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="text-2xl mb-3">{item.icon}</div>
                    <div className="text-sm font-bold text-white mb-1">{item.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.desc}</div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
              What ClariPath is <span style={{ color: '#ef4444' }}>not</span>
            </h2>
            <p className="text-base" style={{ color: 'rgba(255,255,255,0.4)' }}>
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
              <div key={i} className="rounded-xl p-5 flex items-start gap-3"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="text-red-400 font-bold text-lg mt-0.5">✗</span>
                <div>
                  <div className="text-sm font-semibold text-white">{item.no}</div>
                  <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.yes}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 relative">
        <div className="absolute inset-0 opacity-15"
          style={{ background: 'radial-gradient(ellipse at center, #3b82f6, transparent 60%)' }} />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            Stop guessing.<br />
            <span style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Start building.
            </span>
          </h2>
          <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Join ClariPath today. Get your personalised roadmap in under 10 minutes.
          </p>
          <button onClick={() => navigate('/register')}
            className="px-10 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 0 60px rgba(59,130,246,0.4)' }}>
            Get Started — It's Free
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
              <span className="text-white font-bold text-xs">C</span>
            </div>
            <span className="font-bold" style={{ color: 'rgba(255,255,255,0.6)' }}>ClariPath</span>
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © 2026 ClariPath. Direction over content.
          </p>
        </div>
      </footer>

    </div>
  )
}

export default LandingPage