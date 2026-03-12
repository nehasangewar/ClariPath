import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

function LandingPage() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [bookOpen, setBookOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState(null)
  const [visibleFeatures, setVisibleFeatures] = useState([])
  const heroRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleOpenBook = () => {
    if (bookOpen) {
      setVisibleFeatures([])
      setActiveFeature(null)
      setTimeout(() => setBookOpen(false), 100)
    } else {
      setBookOpen(true)
      setVisibleFeatures([])
      setActiveFeature(null)
      features.forEach((_, i) => {
        setTimeout(() => {
          setVisibleFeatures(prev => [...prev, i])
        }, 700 + i * 380)
      })
    }
  }

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const features = [
    { icon: '🎯', title: 'Goal Discovery', desc: 'Answer 10 smart questions. The system analyses your answers and recommends the perfect career path for you.', accent: '#b45309', lightBg: '#fef3c7', border: '#fcd34d' },
    { icon: '🗺️', title: 'Personal Roadmap', desc: 'Get a full 16-week roadmap built around your college syllabus and career goal. One semester at a time.', accent: '#1d4ed8', lightBg: '#eff6ff', border: '#bfdbfe' },
    { icon: '⚡', title: 'Living Plan', desc: 'Miss a week? The system detects it and rebuilds your plan around your real situation automatically.', accent: '#7c3aed', lightBg: '#f5f3ff', border: '#ddd6fe' },
    { icon: '📈', title: 'Readiness Score', desc: 'Track your placement readiness from 0 to 100 as you complete tasks and build real skills.', accent: '#047857', lightBg: '#ecfdf5', border: '#a7f3d0' },
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

  const C = {
    bg: '#f5f0e8', bgAlt: '#ede8df', text: '#1c1917', textMid: '#44403c',
    textLight: '#78716c', gold: '#b45309', goldLight: '#d97706',
    goldBg: '#fef3c7', goldBorder: '#fcd34d', border: '#e5ddd0',
    white: '#ffffff', cardBg: '#faf7f2',
  }

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: "'DM Sans', system-ui, sans-serif", overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes shimmer-gold { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spin-slow-reverse { from{transform:rotate(360deg)} to{transform:rotate(0deg)} }
        @keyframes drift { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(18px,-14px) scale(1.04)} 66%{transform:translate(-12px,10px) scale(0.97)} }
        @keyframes glowPulse { 0%,100%{filter:drop-shadow(0 12px 32px rgba(180,83,9,0.2))} 50%{filter:drop-shadow(0 16px 48px rgba(180,83,9,0.38))} }
        @keyframes openHint { 0%,100%{transform:translateY(0) scale(1);opacity:0.8} 50%{transform:translateY(-4px) scale(1.04);opacity:1} }
        .playfair { font-family: 'Playfair Display', Georgia, serif; }
        .gold-text {
          background: linear-gradient(135deg, #b45309, #d97706, #f59e0b, #d97706, #b45309);
          background-size: 300% auto; -webkit-background-clip: text;
          -webkit-text-fill-color: transparent; animation: shimmer-gold 4s linear infinite;
        }
        .hero-in { animation: fadeInUp 0.7s ease both; }
        .hero-in-1 { animation-delay: 0.05s; }
        .hero-in-2 { animation-delay: 0.15s; }
        .hero-in-3 { animation-delay: 0.25s; }
        .hero-in-4 { animation-delay: 0.35s; }
        .btn-primary { transition: all 0.25s ease !important; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(180,83,9,0.35) !important; }
        .btn-secondary:hover { background: #ede8df !important; }
        .nav-link:hover { color: #1c1917 !important; }
        .stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.07) !important; }
        .step-card:hover .step-num { transform: scale(1.08); }
        .book-scene { perspective: 1600px; perspective-origin: 50% 38%; }
        .book-wrap {
          position: relative; width: 280px; height: 380px;
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.23,1,0.32,1);
          transform: rotateX(10deg) rotateY(-12deg);
          animation: glowPulse 3.5s ease-in-out infinite;
          cursor: pointer;
        }
        .book-wrap.open { transform: rotateX(4deg) rotateY(0deg); animation: none; }
        .book-wrap:not(.open):hover { transform: rotateX(14deg) rotateY(-18deg) translateY(-8px); }
        .book-pages-stack {
          position: absolute; inset: 3px 0 3px 6px;
          background: linear-gradient(90deg,#e0d5c0,#f0e8d8,#faf5ec,#f5ede0,#e8dcc8);
          border-radius: 0 12px 12px 0;
          box-shadow: inset -2px 0 10px rgba(0,0,0,0.09), 2px 0 4px rgba(0,0,0,0.06);
        }
        .book-pages-stack::before {
          content:''; position:absolute; inset:16px 14px;
          background: repeating-linear-gradient(transparent,transparent 20px,rgba(180,83,9,0.07) 20px,rgba(180,83,9,0.07) 21px);
        }
        .book-spine-el {
          position: absolute; left: -14px; top: 0; bottom: 0; width: 14px;
          background: linear-gradient(90deg,#3d1505,#5c2008,#6b2d0a);
          border-radius: 4px 0 0 4px;
          box-shadow: -4px 0 14px rgba(0,0,0,0.45), inset 2px 0 6px rgba(255,255,255,0.05);
          transform: rotateY(-90deg) translateZ(-7px) translateX(-7px);
          transform-origin: right center;
        }
        .book-cover {
          position: absolute; inset: 0;
          background: linear-gradient(148deg,#c4600a 0%,#8b3a08 40%,#6b2d0a 70%,#4a1e08 100%);
          border-radius: 3px 12px 12px 3px;
          transform-origin: left center;
          transform-style: preserve-3d;
          transition: transform 1.2s cubic-bezier(0.23,1,0.32,1);
          box-shadow: 8px 0 24px rgba(0,0,0,0.28), inset -4px 0 10px rgba(0,0,0,0.18), inset 1px 0 2px rgba(255,255,255,0.06);
          backface-visibility: hidden;
        }
        .book-cover::before {
          content:''; position:absolute; inset:10px;
          border: 1px solid rgba(255,255,255,0.1); border-radius: 2px 8px 8px 2px;
        }
        .book-cover::after {
          content:''; position:absolute; left:0; top:0; bottom:0; width:24px;
          background: linear-gradient(90deg,#3d1505,#5c2008);
          border-radius: 3px 0 0 3px;
          box-shadow: inset -2px 0 6px rgba(0,0,0,0.3);
        }
        .book-wrap.open .book-cover { transform: rotateY(-168deg); box-shadow: -6px 0 18px rgba(0,0,0,0.2); }
        .cover-inner {
          position: absolute; inset: 0; z-index: 1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 28px 24px; text-align: center;
        }
        .feat-card {
          opacity: 0; transform: translateX(36px) scale(0.93);
          transition: opacity 0.5s cubic-bezier(0.23,1,0.32,1), transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease;
        }
        .feat-card.shown { opacity: 1; transform: translateX(0) scale(1); }
        .feat-card:hover { transform: translateX(0) translateY(-3px) scale(1.01) !important; }
        .open-pulse { animation: openHint 2s ease-in-out infinite; }
        .book-shadow {
          width: 200px; height: 14px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(0,0,0,0.22), transparent 70%);
          filter: blur(6px); margin: -10px auto 0;
          transition: width 0.6s ease, opacity 0.6s ease;
        }
        .book-wrap.open ~ .book-shadow { width: 260px; opacity: 0.5; }
      `}</style>

      {/* Cursor glow */}
      <div style={{ position:'fixed', pointerEvents:'none', zIndex:0, left:mousePos.x-200, top:mousePos.y-200, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(180,83,9,0.04), transparent 70%)', transition:'left 0.1s ease, top 0.1s ease' }} />

      {/* ── NAVBAR — Sign In only ── */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, background: scrolled ? 'rgba(245,240,232,0.92)' : 'transparent', backdropFilter: scrolled ? 'blur(16px)' : 'none', borderBottom: scrolled ? `1px solid ${C.border}` : 'none', transition:'all 0.3s ease' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'16px 32px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg, #b45309, #d97706)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 12px rgba(180,83,9,0.3)' }}>
              <span style={{ color:'white', fontWeight:900, fontSize:16, fontFamily:'Playfair Display, serif' }}>C</span>
            </div>
            <span className="playfair" style={{ color:C.text, fontWeight:800, fontSize:20 }}>ClariPath</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:32 }}>
            {[{label:'Features',id:'features'},{label:'How it works',id:'how-it-works'}].map(item => (
              <button key={item.id} className="nav-link" onClick={() => scrollToSection(item.id)}
                style={{ color:C.textLight, background:'none', border:'none', cursor:'pointer', fontSize:14, fontWeight:500, transition:'color 0.2s', fontFamily:'DM Sans, sans-serif' }}>
                {item.label}
              </button>
            ))}
          </div>
          {/* Sign In only — Get Started is in hero */}
          <button onClick={() => navigate('/login')} className="btn-secondary"
            style={{ padding:'8px 20px', borderRadius:8, color: scrolled ? C.textMid : C.text, background: scrolled ? 'transparent' : 'rgba(255,255,255,0.85)', border:`1.5px solid ${scrolled ? C.border : 'rgba(180,83,9,0.3)'}`, cursor:'pointer', fontSize:13, fontWeight:700, transition:'all 0.2s', backdropFilter: scrolled ? 'none' : 'blur(8px)' }}>
            Sign In
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', paddingTop:80 }}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse at 12% 35%, rgba(251,191,36,0.18) 0%, transparent 45%), radial-gradient(ellipse at 88% 25%, rgba(180,83,9,0.12) 0%, transparent 40%), radial-gradient(ellipse at 55% 85%, rgba(217,119,6,0.1) 0%, transparent 45%)` }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(180,83,9,0.12) 1px, transparent 1px)', backgroundSize:'48px 48px', maskImage:'radial-gradient(ellipse at center, black 10%, transparent 75%)' }} />
        <div style={{ position:'absolute', top:'50%', left:'50%', width:580, height:580, marginTop:-290, marginLeft:-290, borderRadius:'50%', border:'1.5px solid rgba(180,83,9,0.2)', animation:'spin-slow 38s linear infinite' }}>
          <div style={{ position:'absolute', top:-8, left:'50%', transform:'translateX(-50%)', width:16, height:16, borderRadius:'50%', background:'radial-gradient(circle, #fde68a 20%, #b45309)', boxShadow:'0 0 18px #d97706' }} />
          <div style={{ position:'absolute', bottom:-6, left:'50%', transform:'translateX(-50%)', width:10, height:10, borderRadius:'50%', background:'#d97706' }} />
          <div style={{ position:'absolute', top:'50%', right:-6, transform:'translateY(-50%)', width:10, height:10, borderRadius:'50%', background:'#f59e0b' }} />
        </div>
        <div style={{ position:'absolute', top:'50%', left:'50%', width:400, height:400, marginTop:-200, marginLeft:-200, borderRadius:'50%', border:'1px dashed rgba(180,83,9,0.13)', animation:'spin-slow-reverse 55s linear infinite' }}>
          <div style={{ position:'absolute', top:'50%', left:-7, transform:'translateY(-50%)', width:12, height:12, borderRadius:'50%', background:'radial-gradient(circle, #c4b5fd 20%, #7c3aed)', boxShadow:'0 0 14px rgba(124,58,237,0.6)' }} />
          <div style={{ position:'absolute', bottom:-5, left:'50%', transform:'translateX(-50%)', width:8, height:8, borderRadius:'50%', background:'#3b82f6' }} />
        </div>
        <div style={{ position:'absolute', top:'7%', right:'7%', width:160, height:160, borderRadius:'50%', background:'radial-gradient(circle, rgba(180,83,9,0.1), transparent)', filter:'blur(14px)', animation:'drift 10s ease-in-out infinite 2s' }} />
        <div style={{ position:'absolute', top:'3%', right:'3%', width:310, height:310, borderRadius:'50%', border:'1.5px solid rgba(180,83,9,0.18)', animation:'spin-slow 28s linear infinite' }}>
          <div style={{ position:'absolute', top:-8, left:'50%', transform:'translateX(-50%)', width:15, height:15, borderRadius:'50%', background:'radial-gradient(circle, #fde68a 20%, #b45309)', boxShadow:'0 0 16px #d97706' }} />
          <div style={{ position:'absolute', top:'50%', right:-6, transform:'translateY(-50%)', width:9, height:9, borderRadius:'50%', background:'#f59e0b' }} />
        </div>
        <div style={{ position:'absolute', top:'calc(3% + 55px)', right:'calc(3% + 55px)', width:200, height:200, borderRadius:'50%', border:'1px dashed rgba(124,58,237,0.16)', animation:'spin-slow-reverse 22s linear infinite' }}>
          <div style={{ position:'absolute', top:-6, left:'50%', transform:'translateX(-50%)', width:11, height:11, borderRadius:'50%', background:'radial-gradient(circle, #ddd6fe 20%, #7c3aed)', boxShadow:'0 0 14px rgba(124,58,237,0.6)' }} />
        </div>
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:900, margin:'0 auto' }}>
          <div className="hero-in hero-in-1" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 18px', borderRadius:100, background:C.goldBg, border:`1px solid ${C.goldBorder}`, marginBottom:28 }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background:C.gold, display:'inline-block' }} />
            <span style={{ color:C.gold, fontSize:12, fontWeight:600, letterSpacing:'0.04em' }}>Intelligent Academic Navigation System</span>
            <span style={{ width:5, height:5, borderRadius:'50%', background:C.gold, display:'inline-block' }} />
          </div>
          <h1 className="playfair hero-in hero-in-2" style={{ fontSize:'clamp(2.6rem, 5.5vw, 4.8rem)', fontWeight:900, color:C.text, letterSpacing:'-0.02em', lineHeight:1.1, marginBottom:24 }}>
            Your Career.{' '}<span className="gold-text">Built for You.</span>
          </h1>
          <p className="hero-in hero-in-3" style={{ fontSize:17, maxWidth:560, margin:'0 auto 44px', color:C.textMid, lineHeight:1.7 }}>
            ClariPath turns your college years into a structured, intelligent journey. No confusion. No random learning. Just a clear path from Semester 1 to placement.
          </p>
          <div className="hero-in hero-in-4" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, marginBottom:48, flexWrap:'wrap' }}>
            <button onClick={() => navigate('/register')} className="btn-primary"
              style={{ display:'flex', alignItems:'center', gap:10, padding:'13px 30px', borderRadius:12, background:'linear-gradient(135deg, #b45309, #d97706)', color:'white', border:'none', cursor:'pointer', fontSize:15, fontWeight:700, boxShadow:'0 4px 20px rgba(180,83,9,0.3)' }}>
              Start Your Journey — Free
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width:18, height:18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

        </div>
        <div style={{ position:'absolute', bottom:36, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:6, cursor:'pointer' }} onClick={() => scrollToSection('features')}>
          <span style={{ fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color:C.textLight }}>Scroll</span>
          <div style={{ width:20, height:34, borderRadius:20, border:`1px solid ${C.border}`, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:5 }}>
            <div style={{ width:3, height:7, borderRadius:4, background:C.gold, animation:'float 1.5s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ── FEATURES — 3D BOOK ── */}
      <section id="features" style={{ padding:'100px 0 130px', background:C.bgAlt, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'40%', left:'50%', transform:'translate(-50%,-50%)', width:700, height:500, borderRadius:'50%', background:'radial-gradient(ellipse, rgba(180,83,9,0.06), transparent 65%)', filter:'blur(50px)', pointerEvents:'none' }} />
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 32px' }}>
          <div style={{ textAlign:'center', marginBottom:72 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 14px', borderRadius:100, background:C.goldBg, border:`1px solid ${C.goldBorder}`, color:C.gold, fontSize:12, fontWeight:600, marginBottom:14 }}>Core Features</div>
            <h2 className="playfair" style={{ fontSize:42, fontWeight:900, color:C.text, letterSpacing:'-0.02em', marginBottom:14 }}>Intelligence at every step</h2>
            <p style={{ fontSize:15, color:C.textMid, maxWidth:460, margin:'0 auto' }}>The system works silently in the background so you always know exactly what to do next.</p>
          </div>

          <div style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'center', minHeight:540, overflow:'hidden' }}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', transition:'all 0.8s cubic-bezier(0.23,1,0.32,1)', transform: bookOpen ? 'translateX(-280px)' : 'translateX(0)', zIndex: 10 }}>
              <div className="book-scene" style={{ width:310, height:420 }}>
                <div className={`book-wrap ${bookOpen ? 'open' : ''}`} onClick={handleOpenBook} style={{ width:280, height:380, margin:'20px auto 0', cursor:'pointer' }}>
                  <div className="book-spine-el" />
                  <div className="book-pages-stack" />
                  <div className="book-cover">
                    <div className="cover-inner">
                      <div style={{ position:'absolute', top:18, left:18, right:18, bottom:18, border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, pointerEvents:'none' }} />

                      {/* Clean title only */}
                      <h3 style={{ fontFamily:'Playfair Display, serif', fontSize:28, fontWeight:900, color:'rgba(255,255,255,0.95)', lineHeight:1.2, textAlign:'center', marginBottom:0 }}>
                        ClariPath<br />Features
                      </h3>

                      {/* Prominent click to open */}
                      <div className="open-pulse" style={{ marginTop:36 }}>
                        <div style={{
                          padding:'11px 24px', borderRadius:24,
                          background:'rgba(255,255,255,0.2)',
                          border:'2px solid rgba(255,255,255,0.55)',
                          color:'#ffffff',
                          fontSize:14, fontWeight:800,
                          display:'flex', alignItems:'center', gap:8,
                          boxShadow:'0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)',
                          letterSpacing:'0.02em',
                        }}>
                          {bookOpen ? '← Click to close' : '✦ Click to open'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="book-shadow" style={{ width: bookOpen ? 240 : 200 }} />
              {!bookOpen && <p style={{ fontSize:13, color:C.textLight, textAlign:'center', maxWidth:200, lineHeight:1.55, marginTop:16 }}>Click the book to reveal features ✨</p>}
              {bookOpen && <p style={{ fontSize:12, color:C.textLight, textAlign:'center', maxWidth:200, lineHeight:1.55, marginTop:12, opacity:0.7 }}>Click again to close</p>}
            </div>

            {/* Feature cards */}
            <div style={{ position:'absolute', left:'50%', display:'flex', flexDirection:'column', gap:14, width:460, opacity: bookOpen ? 1 : 0, transform: bookOpen ? 'translateX(20px)' : 'translateX(80px)', transition:'all 0.7s cubic-bezier(0.23,1,0.32,1)', pointerEvents: bookOpen ? 'all' : 'none', transitionDelay: bookOpen ? '0.3s' : '0s' }}>
              {features.map((f, i) => (
                <div key={i} className={`feat-card ${visibleFeatures.includes(i) ? 'shown' : ''}`} style={{ transitionDelay: `${i * 0.05}s` }}
                  onClick={() => visibleFeatures.includes(i) && setActiveFeature(activeFeature === i ? null : i)}>
                  <div style={{ borderRadius:18, padding:'18px 20px', cursor: visibleFeatures.includes(i) ? 'pointer' : 'default', background: activeFeature === i ? C.white : C.cardBg, border: activeFeature === i ? `1.5px solid ${f.accent}35` : `1px solid ${C.border}`, boxShadow: activeFeature === i ? `0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px ${f.accent}10` : '0 2px 8px rgba(0,0,0,0.04)', position:'relative', overflow:'hidden', transition:'all 0.35s cubic-bezier(0.23,1,0.32,1)' }}>
                    {activeFeature === i && <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, transparent, ${f.accent}, transparent)` }} />}
                    <div style={{ display:'flex', alignItems:'flex-start', gap:14, position:'relative', zIndex:1 }}>
                      <div style={{ width:42, height:42, borderRadius:12, flexShrink:0, background: activeFeature === i ? f.lightBg : `${f.accent}10`, border:`1px solid ${activeFeature === i ? f.border : f.accent + '20'}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, transition:'all 0.3s' }}>{f.icon}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: activeFeature === i ? 8 : 4 }}>
                          <h3 className="playfair" style={{ fontSize:16, fontWeight:800, color:C.text }}>{f.title}</h3>
                          <span style={{ fontSize:17, color:C.textLight, lineHeight:1, transition:'transform 0.3s', transform: activeFeature === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
                        </div>
                        {activeFeature === i
                          ? <p style={{ fontSize:13, color:C.textMid, lineHeight:1.65, margin:0 }}>{f.desc}</p>
                          : <p style={{ fontSize:13, color:C.textLight, margin:0 }}>{f.desc.substring(0,58)}…</p>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding:'100px 0', background:C.bg }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 32px' }}>
          <div style={{ textAlign:'center', marginBottom:64 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 14px', borderRadius:100, background:'rgba(29,78,216,0.08)', border:'1px solid rgba(29,78,216,0.2)', color:'#1d4ed8', fontSize:12, fontWeight:600, marginBottom:14 }}>How It Works</div>
            <h2 className="playfair" style={{ fontSize:42, fontWeight:900, color:C.text, letterSpacing:'-0.02em', marginBottom:14 }}>From zero to roadmap<br />in 10 minutes</h2>
            <p style={{ fontSize:15, color:C.textMid, maxWidth:400, margin:'0 auto' }}>Four steps. No technical knowledge needed. Just answer honestly.</p>
          </div>
          <div style={{ position:'relative' }}>
            <div style={{ position:'absolute', top:52, left:'12.5%', right:'12.5%', height:1, background:`linear-gradient(90deg, ${C.gold}, #7c3aed, #1d4ed8, #047857)`, opacity:0.25 }} />
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:24, position:'relative', zIndex:10 }}>
              {steps.map((step, i) => (
                <div key={i} className="step-card" style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center' }}>
                  <div style={{ width:104, height:104, borderRadius:20, background:`${step.color}10`, border:`1.5px solid ${step.color}25`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20, transition:'all 0.3s', boxShadow:`0 4px 20px ${step.color}15` }}>
                    <span className="step-num playfair" style={{ fontSize:30, fontWeight:900, color:step.color, transition:'transform 0.3s', display:'block' }}>{step.num}</span>
                  </div>
                  <h3 style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:10 }}>{step.title}</h3>
                  <p style={{ fontSize:13, color:C.textMid, lineHeight:1.65 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding:'80px 0 120px', background:C.bg, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'50%', left:'20%', transform:'translateY(-50%)', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(251,191,36,0.12), transparent)', filter:'blur(60px)' }} />
        <div style={{ position:'absolute', top:'50%', right:'15%', transform:'translateY(-50%)', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(180,83,9,0.08), transparent)', filter:'blur(60px)' }} />
        <div style={{ maxWidth:680, margin:'0 auto', padding:'0 32px', textAlign:'center', position:'relative', zIndex:10 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 14px', borderRadius:100, background:C.goldBg, border:`1px solid ${C.goldBorder}`, color:C.gold, fontSize:12, fontWeight:600, marginBottom:24 }}>Ready to start?</div>
          <h2 className="playfair" style={{ fontWeight:900, color:C.text, marginBottom:18, fontSize:'clamp(2.4rem, 5vw, 4rem)', letterSpacing:'-0.03em', lineHeight:1.1 }}>
            Stop guessing.<br /><span className="gold-text">Start building.</span>
          </h2>
          <p style={{ fontSize:16, color:C.textMid, marginBottom:36, lineHeight:1.65 }}>Join ClariPath today. Get your personalised roadmap in under 10 minutes.</p>
          <button onClick={() => navigate('/register')} className="btn-primary"
            style={{ padding:'14px 44px', borderRadius:14, background:'linear-gradient(135deg, #b45309, #d97706)', color:'white', border:'none', cursor:'pointer', fontSize:16, fontWeight:700, boxShadow:'0 4px 24px rgba(180,83,9,0.3)' }}>
            Get Started — It's Free
          </button>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ padding:'80px 0 100px', background:C.bg, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:600, height:400, borderRadius:'50%', background:'radial-gradient(ellipse, rgba(180,83,9,0.05), transparent 65%)', filter:'blur(50px)', pointerEvents:'none' }} />
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 32px', position:'relative', zIndex:10 }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 14px', borderRadius:100, background:C.goldBg, border:`1px solid ${C.goldBorder}`, color:C.gold, fontSize:12, fontWeight:600, marginBottom:14 }}>The Team</div>
            <h2 className="playfair" style={{ fontSize:38, fontWeight:900, color:C.text, letterSpacing:'-0.02em', marginBottom:12 }}>Built by students,<br />for students</h2>
            <p style={{ fontSize:15, color:C.textMid, maxWidth:420, margin:'0 auto', lineHeight:1.65 }}>Three engineering students who felt the confusion firsthand and decided to build the solution they wished existed.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24, maxWidth:860, margin:'0 auto' }}>
            {[
              { name:'Kabir Babarao Ubale', initials:'KU', role:'Frontend, UI/UX & AI', color:'#b45309', lightBg:'#fef3c7', linkedin:'https://www.linkedin.com/in/kabir-ubale-7a709b3b0', email:'kabirubale0358@gmail.com' },
              { name:'Neha Santosh Sangewar', initials:'NS', role:'Backend, System Architecture & AI', color:'#7c3aed', lightBg:'#f5f3ff', linkedin:'https://www.linkedin.com/in/neha-sangewar-84a452347', email:'nehasangewar14@gmail.com' },
              { name:'Priya Ganesh Akhadkar', initials:'PA', role:'Research & Documentation', color:'#047857', lightBg:'#ecfdf5', linkedin:'https://www.linkedin.com/in/priya-akhadkar-b051a6347', email:'priyaakhadkar31@gmail.com' },
            ].map((member, i) => (
              <div key={i} style={{ borderRadius:22, padding:'32px 28px', background:C.white, border:`1px solid ${C.border}`, boxShadow:'0 4px 20px rgba(0,0,0,0.05)', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', position:'relative', overflow:'hidden', transition:'transform 0.3s ease, box-shadow 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,0.05)' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, transparent, ${member.color}, transparent)` }} />
                <div style={{ width:72, height:72, borderRadius:'50%', background:`linear-gradient(135deg, ${member.color}22, ${member.color}40)`, border:`2px solid ${member.color}30`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18, fontSize:22, fontWeight:900, fontFamily:'Playfair Display, serif', color:member.color, boxShadow:`0 4px 16px ${member.color}20` }}>{member.initials}</div>
                <h3 className="playfair" style={{ fontSize:17, fontWeight:800, color:C.text, marginBottom:6, lineHeight:1.3 }}>{member.name}</h3>
                <div style={{ display:'inline-flex', alignItems:'center', padding:'3px 12px', borderRadius:20, background:member.lightBg, border:`1px solid ${member.color}25`, color:member.color, fontSize:11, fontWeight:600, marginBottom:22 }}>{member.role}</div>
                <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%' }}>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                    style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', borderRadius:12, background:C.bgAlt, border:`1px solid ${C.border}`, textDecoration:'none', color:C.textMid, fontSize:13, fontWeight:500, transition:'all 0.2s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.background='#e8f0fe'; e.currentTarget.style.borderColor='#4285f4'; e.currentTarget.style.color='#1a73e8' }}
                    onMouseLeave={e => { e.currentTarget.style.background=C.bgAlt; e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.textMid }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink:0, color:'#0077b5' }}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    <span>LinkedIn</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft:'auto', opacity:0.5 }}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                  </a>
                  <a href={`mailto:${member.email}`}
                    style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', borderRadius:12, background:C.bgAlt, border:`1px solid ${C.border}`, textDecoration:'none', color:C.textMid, fontSize:13, fontWeight:500, transition:'all 0.2s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.background=member.lightBg; e.currentTarget.style.borderColor=`${member.color}40`; e.currentTarget.style.color=member.color }}
                    onMouseLeave={e => { e.currentTarget.style.background=C.bgAlt; e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.textMid }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink:0, color:member.color }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1, textAlign:'left' }}>{member.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding:'24px 0', borderTop:`1px solid ${C.border}`, background:C.bg }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 32px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg, #b45309, #d97706)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ color:'white', fontWeight:900, fontSize:13, fontFamily:'Playfair Display, serif' }}>C</span>
            </div>
            <span className="playfair" style={{ fontWeight:700, color:C.textMid, fontSize:15 }}>ClariPath</span>
          </div>
          <p style={{ fontSize:12, color:C.textLight }}>© 2026 ClariPath. Direction over content.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage