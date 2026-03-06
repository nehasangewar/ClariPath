import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { QUESTION_OPTIONS, scoreAnswers } from '../utils/goalMapping'



const FIELDS = ['CSE', 'IT', 'Electronics', 'Mechanical', 'Civil', 'Electrical', 'AI_ML']
const BRANCHES = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'Electrical', 'AI/ML']
const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8]
const CLARITY_OPTIONS = [
  { value: 'yes', label: 'Yes, I know exactly what I want' },
  { value: 'maybe', label: 'I have some idea but not sure' },
  { value: 'no', label: 'I have no idea yet' },
]

export default function OnboardingPage() {
  const navigate = useNavigate()

  const [screen, setScreen] = useState('welcome')
  const [branch, setBranch] = useState('')
  const [semester, setSemester] = useState('')
  const [interestedOtherField, setInterestedOtherField] = useState('')
  const [clarity, setClarity] = useState('')
  const [selectedField, setSelectedField] = useState('')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({}) // stores { 0: 'A', 1: 'C', ... }
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [detailGoal, setDetailGoal] = useState(null)
  const [confirmedGoal, setConfirmedGoal] = useState(null)
  const [whatYouKnow, setWhatYouKnow] = useState('')
  const [generatedQuestions, setGeneratedQuestions] = useState([])
  const [assessAnswers, setAssessAnswers] = useState({})
  const [loadingMessage, setLoadingMessage] = useState('')

  const [goals, setGoals] = useState([])
const [questions, setQuestions] = useState([])
  const totalQuestions = clarity === 'yes' ? 0 : clarity === 'maybe' ? 5 : 10
  const visibleQuestions = questions.slice(0, totalQuestions)

  // ── STYLES ──
  const bg = {
    minHeight: '100vh',
    background: '#04080f',
    fontFamily: 'system-ui, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  }

  const card = {
    width: '100%',
    maxWidth: 560,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 24,
    padding: '40px 36px',
    position: 'relative',
    overflow: 'hidden',
  }

  const title = {
    fontSize: 24,
    fontWeight: 900,
    color: 'white',
    marginBottom: 8,
    letterSpacing: '-0.02em',
  }

  const subtitle = {
    fontSize: 14,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 32,
    lineHeight: 1.6,
  }

  const btn = {
    width: '100%',
    padding: '14px',
    borderRadius: 12,
    border: 'none',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    color: 'white',
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
    marginTop: 8,
    boxShadow: '0 0 20px rgba(59,130,246,0.2)',
  }

  const btnOff = {
    ...btn,
    background: 'rgba(255,255,255,0.06)',
    color: 'rgba(255,255,255,0.25)',
    cursor: 'not-allowed',
    boxShadow: 'none',
  }

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '14px 16px',
    borderRadius: 12,
    border: '1.5px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.04)',
    color: 'white',
    fontSize: 14,
    outline: 'none',
    resize: 'none',
    lineHeight: 1.6,
  }

  const labelStyle = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: 'rgba(255,255,255,0.55)',
    marginBottom: 10,
  }

  const optionBtn = (selected) => ({
    padding: '11px 16px',
    borderRadius: 10,
    border: `1.5px solid ${selected ? 'rgba(59,130,246,0.6)' : 'rgba(255,255,255,0.07)'}`,
    background: selected ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.02)',
    color: selected ? '#60a5fa' : 'rgba(255,255,255,0.45)',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s',
  })

  const progressBar = (pct, color = 'linear-gradient(90deg, #3b82f6, #8b5cf6)') => (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
          Question {currentQ + 1} of {visibleQuestions.length || 7}
        </span>
        <span style={{ fontSize: 12, color: '#60a5fa' }}>{Math.round(pct)}%</span>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 4, transition: 'width 0.4s ease' }} />
      </div>
    </div>
  )

  // ── HANDLERS ──
  const handleIntroNext = async () => {
  if (!branch || !semester || !clarity) return
  const field = interestedOtherField || branch
  setSelectedField(field)

  // TODO: already fetching from real API below
  try {
    const [goalsRes, questionsRes] = await Promise.all([
      api.get(`/api/career-goals?field=${field}`),
      api.get(`/api/onboarding/questions?field=${field}`)
    ])
    setGoals(goalsRes.data)
    setQuestions(questionsRes.data.map(q => q.questionText))
  } catch (err) {
    console.error('Failed to load data', err)
  }

  if (clarity === 'yes') {
    setScreen('goals')
  } else {
    setCurrentQ(0)
    setScreen('questions')
  }
}
  const handleAnswerNext = () => {
    if (!currentAnswer.trim()) return
    const updated = { ...answers, [currentQ]: currentAnswer }
    setAnswers(updated)
    setCurrentAnswer('')
    if (currentQ + 1 >= visibleQuestions.length) {
      setScreen('goals')
    } else {
      setCurrentQ(currentQ + 1)
    }
  }

  const handleConfirmGoal = () => {
    setConfirmedGoal(detailGoal)
    setScreen('whatyouknow')
  }

  const handleWhatYouKnowNext = async () => {
    if (!whatYouKnow.trim()) return
    setLoadingMessage('Generating your personalised assessment questions...')
    setScreen('loading')

    // TODO: Replace with POST /api/onboarding/generate-questions
    // const res = await api.post('/api/onboarding/generate-questions', {
    //   careerGoal: confirmedGoal.title,
    //   whatYouKnow: whatYouKnow
    // })
    // setGeneratedQuestions(res.data.questions)

    // DUMMY questions for now
    setTimeout(() => {
      setGeneratedQuestions([
        `You mentioned some background — what specific ${confirmedGoal?.title} concepts are you most confident about?`,
        `Have you ever built a real project related to ${confirmedGoal?.title}? Describe it briefly.`,
        `What is the biggest gap you feel between where you are now and being a ${confirmedGoal?.title}?`,
        `Which tools or technologies have you actually used hands-on so far?`,
        `How many hours per week can you realistically dedicate to learning right now?`,
        `Have you tried learning ${confirmedGoal?.title} before and stopped? What happened?`,
        `Where do you see yourself in 6 months if you follow this roadmap consistently?`,
      ])
      setCurrentQ(0)
      setCurrentAnswer('')
      setScreen('assessment')
    }, 2500)
  }

  const handleAssessNext = async () => {
    if (!currentAnswer.trim()) return
    const updated = { ...assessAnswers, [currentQ]: currentAnswer }
    setAssessAnswers(updated)
    setCurrentAnswer('')

    if (currentQ + 1 >= generatedQuestions.length) {
      setLoadingMessage('Building your personalised roadmap...')
      setScreen('loading')

      // TODO: Replace with POST /api/onboarding/generate-roadmap
      // const res = await api.post('/api/onboarding/generate-roadmap', {
      //   branch: branch,
      //   semester: semester,
      //   clarityAnswer: clarity,
      //   discoveryAnswers: Object.values(answers),
      //   confirmedGoal: confirmedGoal.title,
      //   whatYouKnow: whatYouKnow,
      //   assessmentQuestions: generatedQuestions,
      //   assessmentAnswers: Object.values(updated),
      // })

      setTimeout(() => navigate('/dashboard'), 3500)
    } else {
      setCurrentQ(currentQ + 1)
    }
  }

  // ── SCREEN: WELCOME ──
if (screen === 'welcome') return (
  <div style={{
    minHeight: '100vh',
    background: '#04080f',
    fontFamily: 'system-ui, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    position: 'relative',
    overflow: 'hidden',
  }}>

    {/* Animated background orbs */}
    <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.08), transparent 70%)', filter: 'blur(60px)', animation: 'pulse1 8s ease-in-out infinite', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.08), transparent 70%)', filter: 'blur(60px)', animation: 'pulse2 10s ease-in-out infinite', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.04), transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

    {/* Grid overlay */}
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

    <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 640, textAlign: 'center' }}>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 56 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(59,130,246,0.3)' }}>
          <span style={{ color: 'white', fontWeight: 900, fontSize: 18 }}>C</span>
        </div>
        <span style={{ color: 'white', fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em' }}>ClariPath</span>
      </div>

      {/* Main heading */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 20, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.18)', color: '#93c5fd', fontSize: 12, fontWeight: 600, marginBottom: 24, letterSpacing: '0.05em' }}>
          YOUR JOURNEY STARTS HERE
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.2rem)', fontWeight: 900, color: 'white', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 20 }}>
          The next 5 minutes will{' '}
          <span style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            shape your entire roadmap
          </span>
        </h1>

        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
          We are about to ask you a few questions. Your answers will be used to build a personalised 16-week roadmap — one that no other student will have.
        </p>
      </div>

      {/* 3 promise cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 40 }}>
        {[
          { icon: '🎯', title: 'Be honest', desc: 'There are no right or wrong answers. The system works better when you are real.' },
          { icon: '🧠', title: 'Be detailed', desc: 'The more context you give, the more accurate your roadmap will be.' },
          { icon: '⏱️', title: 'Take your time', desc: 'Do not rush. These answers decide your entire learning path.' },
        ].map((item, i) => (
          <div key={i} style={{
            padding: '20px 16px',
            borderRadius: 16,
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
            textAlign: 'center',
            transition: 'all 0.3s ease',
          }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 6 }}>{item.title}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      {/* What happens next */}
      <div style={{ padding: '20px 24px', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 40, textAlign: 'left' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 16, letterSpacing: '0.06em' }}>WHAT HAPPENS NEXT</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { step: '01', text: 'Tell us your branch and how clear you are about your career', color: '#3b82f6' },
            { step: '02', text: 'Answer discovery questions so we understand what suits you', color: '#8b5cf6' },
            { step: '03', text: 'Pick a career goal and explore it in detail before committing', color: '#06b6d4' },
            { step: '04', text: 'Tell us what you already know — we build on top of that', color: '#10b981' },
            { step: '05', text: 'Answer 7 personalised questions — your roadmap is generated', color: '#f59e0b' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${item.color}18`, border: `1px solid ${item.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: item.color }}>{item.step}</span>
              </div>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => setScreen('intro')}
        style={{
          width: '100%',
          maxWidth: 400,
          padding: '16px 32px',
          borderRadius: 14,
          border: 'none',
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          color: 'white',
          fontWeight: 800,
          fontSize: 15,
          cursor: 'pointer',
          boxShadow: '0 0 30px rgba(59,130,246,0.25)',
          transition: 'all 0.3s ease',
          letterSpacing: '-0.01em',
        }}
        onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 40px rgba(59,130,246,0.35)' }}
        onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 0 30px rgba(59,130,246,0.25)' }}
      >
        I am ready — Let's begin →
      </button>

      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', marginTop: 16 }}>
        Takes about 5 minutes · No right or wrong answers
      </p>
    </div>

    <style>{`
      @keyframes pulse1 {
        0%, 100% { transform: scale(1); opacity: 0.6; }
        50% { transform: scale(1.1); opacity: 1; }
      }
      @keyframes pulse2 {
        0%, 100% { transform: scale(1.1); opacity: 1; }
        50% { transform: scale(1); opacity: 0.6; }
      }
    `}</style>
  </div>
)

  // ── SCREEN: INTRO ──
  if (screen === 'intro') return (
    <div style={bg}>
      <div style={{ ...card, maxWidth: 600 }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 'bold' }}>C</span>
            </div>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>ClariPath</span>
          </div>

          <h2 style={title}>Let's find your path</h2>
          <p style={subtitle}>Tell us a bit about yourself so we can build a roadmap made specifically for you.</p>

          {/* Branch */}
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>What is your college branch?</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {BRANCHES.map((b, i) => (
                <button key={b} onClick={() => setBranch(FIELDS[i])}
                  style={optionBtn(branch === FIELDS[i])}>
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Semester */}
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Which semester are you in?</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 6 }}>
              {SEMESTERS.map(s => (
                <button key={s} onClick={() => setSemester(s)}
                  style={{ ...optionBtn(semester === s), textAlign: 'center', padding: '10px 4px' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Interest in other field */}
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Are you interested in a different field?</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
              {[
                { value: '', label: 'No, I want to stay in my branch' },
                { value: 'show', label: 'Yes, I want to explore another field' },
              ].map(opt => (
                <button key={opt.label}
                  onClick={() => { setInterestedOtherField(opt.value === 'show' ? 'CS' : ''); }}
                  style={optionBtn(opt.value === '' ? interestedOtherField === '' : interestedOtherField !== '')}>
                  {opt.label}
                </button>
              ))}
            </div>

            {interestedOtherField !== '' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
                {FIELDS.map(f => (
                  <button key={f} onClick={() => setInterestedOtherField(f)}
                    style={optionBtn(interestedOtherField === f)}>
                    {f}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clarity */}
          <div style={{ marginBottom: 32 }}>
            <label style={labelStyle}>Do you know what career you want?</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {CLARITY_OPTIONS.map(c => (
                <button key={c.value} onClick={() => setClarity(c.value)}
                  style={optionBtn(clarity === c.value)}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleIntroNext}
            style={branch && semester && clarity ? btn : btnOff}
            disabled={!branch || !semester || !clarity}>
            Continue →
          </button>
        </div>
      </div>
    </div>
  )

  if (screen === 'questions') {
  const pct = (currentQ / visibleQuestions.length) * 100
  const opts = QUESTION_OPTIONS[selectedField]?.[currentQ] || {}
  return (
    <div style={bg}>
      <div style={card}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          {progressBar(pct)}
          <h2 style={{ ...title, fontSize: 18, marginBottom: 24, lineHeight: 1.5 }}>
            {visibleQuestions[currentQ]}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {Object.entries(opts).map(([letter, text]) => (
              <button key={letter}
                onClick={() => {
                  const updated = { ...answers, [currentQ]: letter }
                  setAnswers(updated)
                  if (currentQ + 1 >= visibleQuestions.length) {
                    const scored = scoreAnswers(selectedField, updated, goals)
                    setGoals(scored)
                    setScreen('goals')
                  } else {
                    setCurrentQ(currentQ + 1)
                  }
                }}
                style={{
                  padding: '14px 18px',
                  borderRadius: 12,
                  border: `1.5px solid ${answers[currentQ] === letter ? 'rgba(59,130,246,0.6)' : 'rgba(255,255,255,0.07)'}`,
                  background: answers[currentQ] === letter ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.02)',
                  color: answers[currentQ] === letter ? '#60a5fa' : 'rgba(255,255,255,0.65)',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}>
                <span style={{ fontWeight: 700, marginRight: 10, color: answers[currentQ] === letter ? '#60a5fa' : 'rgba(255,255,255,0.35)' }}>{letter}.</span>
                {text}
              </button>
            ))}
          </div>
          {currentQ > 0 && (
            <button onClick={() => setCurrentQ(currentQ - 1)}
              style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', background: 'transparent', color: 'rgba(255,255,255,0.35)', fontSize: 13, cursor: 'pointer' }}>
              ← Back
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

  // ── SCREEN: GOALS ──
  if (screen === 'goals') return (
    <div style={{ ...bg, alignItems: 'flex-start', paddingTop: 48 }}>
      <div style={{ width: '100%', maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 20, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#93c5fd', fontSize: 12, fontWeight: 600, marginBottom: 14 }}>
            ● Based on your answers
          </div>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: 'white', marginBottom: 8, letterSpacing: '-0.02em' }}>
            Here are your career matches
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>
            Tap any goal to learn more before deciding
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 16px 40px' }}>
          {goals.map((goal, i) => (
            <button key={goal.id} onClick={() => { setDetailGoal(goal); setScreen('goal-detail') }}
              style={{
                padding: '18px 22px', borderRadius: 16,
                border: `1.5px solid ${i === 0 ? 'rgba(59,130,246,0.45)' : 'rgba(255,255,255,0.06)'}`,
                background: i === 0 ? 'rgba(59,130,246,0.07)' : 'rgba(255,255,255,0.02)',
                cursor: 'pointer', textAlign: 'left', position: 'relative', overflow: 'hidden',
              }}>
              {i === 0 && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }} />}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: '1px solid rgba(255,255,255,0.06)' }}>
                    {goal.icon || '🎯'}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>{goal.title}</span>
                      {i === 0 && <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.25)' }}>TOP MATCH</span>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
  {goal.matchPercent > 0 && (
    <span style={{ fontSize: 13, fontWeight: 700, color: i === 0 ? '#60a5fa' : 'rgba(255,255,255,0.5)' }}>
      {goal.matchPercent}%
    </span>
  )}
  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>Tap to explore →</span>
</div>
                  </div>
                </div>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Tap to explore →</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  // ── SCREEN: GOAL DETAIL ──
  if (screen === 'goal-detail' && detailGoal) return (
    <div style={{ ...bg, alignItems: 'flex-start', paddingTop: 40 }}>
      <div style={{ width: '100%', maxWidth: 580, margin: '0 auto' }}>
        <button onClick={() => setScreen('goals')}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontSize: 13, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
          ← Back to all goals
        </button>

        <div style={{ ...card, padding: 36 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
              {detailGoal.icon}
            </div>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: 'white', marginBottom: 3 }}>{detailGoal.title}</h2>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{detailGoal.domain}</span>
            </div>
          </div>

          {[
            { label: '📌 What is this career?', value: detailGoal.description },
            { label: '📚 What will you learn?', value: detailGoal.what_you_learn },
            { label: '💼 What will you do daily?', value: detailGoal.what_you_do },
            { label: '💰 Salary range in India', value: detailGoal.salary },
            { label: '🏢 Top companies hiring', value: detailGoal.companies },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 14, padding: '14px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 5 }}>{item.label}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{item.value}</div>
            </div>
          ))}

          <button onClick={handleConfirmGoal} style={{ ...btn, marginTop: 16 }}>
            Yes, this is my goal — Start assessment →
          </button>
        </div>
      </div>
    </div>
  )

  // ── SCREEN: WHAT YOU KNOW ──
  if (screen === 'whatyouknow') return (
    <div style={bg}>
      <div style={card}>
        <div style={{ position: 'absolute', top: -80, left: -80, width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1), transparent)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 20, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', color: '#c4b5fd', fontSize: 11, fontWeight: 600, marginBottom: 24 }}>
            Goal confirmed — {confirmedGoal?.title}
          </div>

          <h2 style={title}>What do you already know?</h2>
          <p style={subtitle}>
            Tell us everything you have learned so far — courses, projects, languages, tools, anything.
            Be honest and detailed. The more you tell us, the better your assessment will be.
          </p>

          <div style={{ padding: '12px 16px', borderRadius: 12, background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', marginBottom: 20 }}>
            <p style={{ fontSize: 12, color: '#93c5fd', margin: 0, lineHeight: 1.6 }}>
              💡 <strong>Take your time with this.</strong> This single answer is used to generate 7 personalised questions just for you. A detailed answer means better questions and a better roadmap.
            </p>
          </div>

          <textarea
            value={whatYouKnow}
            onChange={e => setWhatYouKnow(e.target.value)}
            placeholder="Example: I know basic C++ from college, built a simple calculator project, watched some YouTube tutorials on Java but never built anything with it, know basic HTML and CSS, tried Python for 2 weeks but stopped..."
            rows={7}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          />

          <button onClick={handleWhatYouKnowNext}
            style={whatYouKnow.trim().length > 20 ? { ...btn, background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' } : btnOff}
            disabled={whatYouKnow.trim().length <= 20}>
            Generate My Assessment Questions →
          </button>
        </div>
      </div>
    </div>
  )

  // ── SCREEN: ASSESSMENT ──
  if (screen === 'assessment') {
    const pct = (currentQ / generatedQuestions.length) * 100
    return (
      <div style={bg}>
        <div style={card}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 20, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', color: '#c4b5fd', fontSize: 11, fontWeight: 600, marginBottom: 20 }}>
              Skill Assessment — {confirmedGoal?.title}
            </div>
            {progressBar(pct, 'linear-gradient(90deg, #8b5cf6, #06b6d4)')}
            <h2 style={{ ...title, fontSize: 18, marginBottom: 24, lineHeight: 1.5 }}>
              {generatedQuestions[currentQ]}
            </h2>
            <textarea value={currentAnswer} onChange={e => setCurrentAnswer(e.target.value)}
              placeholder="Type your answer here..." rows={5} style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
            <button onClick={handleAssessNext}
              style={currentAnswer.trim() ? { ...btn, background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' } : btnOff}
              disabled={!currentAnswer.trim()}>
              {currentQ + 1 >= generatedQuestions.length ? 'Build My Roadmap →' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── SCREEN: LOADING ──
  if (screen === 'loading') return (
    <div style={{ ...bg, flexDirection: 'column', gap: 24 }}>
      <div style={{ width: 64, height: 64, borderRadius: 18, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(59,130,246,0.3)' }}>
        <svg style={{ animation: 'spin 1s linear infinite', width: 30, height: 30 }} fill="none" viewBox="0 0 24 24">
          <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
          <path style={{ opacity: 0.75 }} fill="white" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
      <div style={{ textAlign: 'center', maxWidth: 360 }}>
        <h2 style={{ fontSize: 20, fontWeight: 900, color: 'white', marginBottom: 10 }}>{loadingMessage}</h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
          This takes a few seconds. We are analysing everything you told us to build something truly personalised.
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}