import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { QUESTION_OPTIONS, scoreAnswers } from '../utils/goalMapping'
import { generateAssessmentQuestions } from '../services/assessmentGenerator'
import { generateAndSaveRoadmap } from '../services/roadmapGenerator'
import { useAuth } from '../context/AuthContext'

const FIELDS = ['CSE', 'IT', 'Electronics', 'Mechanical', 'Civil', 'Electrical', 'AI_ML']
const BRANCHES = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'Electrical', 'AI/ML']
const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8]
const CLARITY_OPTIONS = [
  { value: 'yes', label: 'Yes, I know exactly what I want' },
  { value: 'maybe', label: 'I have some idea but not sure' },
  { value: 'no', label: 'I have no idea yet' },
]

const C = {
  bg: '#f5f0e8',
  bgAlt: '#ede8df',
  bgDeep: '#e8e0d0',
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

function DetailCard({ icon, label, value, C, highlight }) {
  if (!value) return null;
  return (
    <div style={{ background: highlight ? C.goldBg : C.white,
      border: `1px solid ${highlight ? C.goldBorder : C.border}`,
      borderRadius: 16, padding: '16px 18px',
      boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600,
        color: C.gold, textTransform: 'uppercase',
        letterSpacing: 1, margin: '0 0 8px' }}>
        {icon} {label}
      </p>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14,
        color: highlight ? C.gold : C.textMid, lineHeight: 1.6, margin: 0, fontWeight: highlight ? 700 : 400 }}>
        {value}
      </p>
    </div>
  );
}

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { user, completeOnboarding } = useAuth()

  const [screen, setScreen] = useState('welcome')
  const [branch, setBranch] = useState('')
  const [semester, setSemester] = useState('')
  const [hoursPerWeek, setHoursPerWeek] = useState(10)
  const [mode, setMode] = useState('Placement')
  const [interestedOtherField, setInterestedOtherField] = useState('')
  const [clarity, setClarity] = useState('')
  const [selectedField, setSelectedField] = useState('')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [detailGoal, setDetailGoal] = useState(null)
  const [confirmedGoal, setConfirmedGoal] = useState(null)
  const [whatYouKnow, setWhatYouKnow] = useState('')
  const [generatedQuestions, setGeneratedQuestions] = useState([])
  const [assessAnswers, setAssessAnswers] = useState({})
  const [loadingMessage, setLoadingMessage] = useState('')
  const [loadingSubMessage, setLoadingSubMessage] = useState('')
  const [goals, setGoals] = useState([])
  const [questions, setQuestions] = useState([])
  const [assessmentError, setAssessmentError] = useState('')

  const totalQuestions = clarity === 'yes' ? 0 : clarity === 'maybe' ? 5 : 10
  const visibleQuestions = questions.slice(0, totalQuestions)

  // ── SHARED STYLES ──
  const pageBg = {
    minHeight: '100vh',
    background: C.bg,
    fontFamily: "'DM Sans', system-ui, sans-serif",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    position: 'relative',
    overflow: 'hidden',
  }

  const card = {
    width: '100%',
    maxWidth: 560,
    background: C.white,
    border: `1px solid ${C.border}`,
    borderRadius: 24,
    padding: '40px 36px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 8px 40px rgba(0,0,0,0.07)',
  }

  const title = {
    fontSize: 24,
    fontWeight: 900,
    color: C.text,
    marginBottom: 8,
    letterSpacing: '-0.02em',
    fontFamily: "'Playfair Display', Georgia, serif",
  }

  const subtitle = {
    fontSize: 14,
    color: C.textLight,
    marginBottom: 28,
    lineHeight: 1.65,
  }

  const btn = {
    width: '100%',
    padding: '13px',
    borderRadius: 12,
    border: 'none',
    background: 'linear-gradient(135deg, #b45309, #d97706)',
    color: 'white',
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
    marginTop: 8,
    boxShadow: '0 4px 18px rgba(180,83,9,0.28)',
    transition: 'all 0.25s ease',
    fontFamily: "'DM Sans', sans-serif",
  }

  const btnOff = {
    ...btn,
    background: C.bgAlt,
    color: C.textLight,
    cursor: 'not-allowed',
    boxShadow: 'none',
  }

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 16px',
    borderRadius: 12,
    border: `1.5px solid ${C.border}`,
    background: C.white,
    color: C.text,
    fontSize: 14,
    outline: 'none',
    resize: 'none',
    lineHeight: 1.6,
    fontFamily: "'DM Sans', sans-serif",
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  const labelStyle = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: C.textMid,
    marginBottom: 10,
  }

  const optionBtn = (selected) => ({
    padding: '11px 16px',
    borderRadius: 10,
    border: `1.5px solid ${selected ? C.gold + '60' : C.border}`,
    background: selected ? C.goldBg : C.white,
    color: selected ? C.gold : C.textMid,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s',
    fontFamily: "'DM Sans', sans-serif",
  })

  const progressBar = (pct, total) => (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: C.textLight }}>
          Question {currentQ + 1} of {total || visibleQuestions.length || 7}
        </span>
        <span style={{ fontSize: 12, color: C.gold, fontWeight: 600 }}>{Math.round(pct)}%</span>
      </div>
      <div style={{ height: 5, background: C.bgAlt, borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`, borderRadius: 4, transition: 'width 0.4s ease' }} />
      </div>
    </div>
  )

  const BgDecor = () => (
    <>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 15% 40%, rgba(251,191,36,0.14) 0%, transparent 50%), radial-gradient(ellipse at 85% 30%, rgba(180,83,9,0.08) 0%, transparent 45%)` }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(180,83,9,0.08) 1px, transparent 1px)`, backgroundSize: '40px 40px', maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: 500, height: 500, marginTop: -250, marginLeft: -250, borderRadius: '50%', border: '1.5px solid rgba(180,83,9,0.12)', animation: 'spin-slow 40s linear infinite', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: -7, left: '50%', transform: 'translateX(-50%)', width: 13, height: 13, borderRadius: '50%', background: 'radial-gradient(circle, #fde68a 20%, #b45309)', boxShadow: '0 0 14px #d97706' }} />
        <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 8, height: 8, borderRadius: '50%', background: '#d97706', boxShadow: '0 0 10px rgba(217,119,6,0.5)' }} />
      </div>
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: 340, height: 340, marginTop: -170, marginLeft: -170, borderRadius: '50%', border: '1px dashed rgba(180,83,9,0.08)', animation: 'spin-slow-reverse 55s linear infinite', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '50%', left: -5, transform: 'translateY(-50%)', width: 9, height: 9, borderRadius: '50%', background: 'radial-gradient(circle, #c4b5fd 20%, #7c3aed)', boxShadow: '0 0 10px rgba(124,58,237,0.5)' }} />
      </div>
      <div style={{ position: 'absolute', top: '2%', right: '3%', width: 240, height: 240, borderRadius: '50%', border: '1.5px solid rgba(180,83,9,0.14)', animation: 'spin-slow 30s linear infinite', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)', width: 12, height: 12, borderRadius: '50%', background: 'radial-gradient(circle, #fde68a 20%, #b45309)', boxShadow: '0 0 12px #d97706' }} />
        <div style={{ position: 'absolute', top: '50%', right: -5, transform: 'translateY(-50%)', width: 7, height: 7, borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 8px rgba(245,158,11,0.5)' }} />
      </div>
      <div style={{ position: 'absolute', top: 'calc(2% + 38px)', right: 'calc(3% + 38px)', width: 164, height: 164, borderRadius: '50%', border: '1px dashed rgba(124,58,237,0.12)', animation: 'spin-slow-reverse 22s linear infinite', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: -5, left: '50%', transform: 'translateX(-50%)', width: 9, height: 9, borderRadius: '50%', background: 'radial-gradient(circle, #ddd6fe 20%, #7c3aed)', boxShadow: '0 0 10px rgba(124,58,237,0.5)' }} />
      </div>
    </>
  )

  // ── HANDLERS ──
  const handleIntroNext = async () => {
    if (!branch || !semester || !clarity) return
    const field = interestedOtherField || branch
    setSelectedField(field)
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

  const handleConfirmGoal = () => {
    setConfirmedGoal(detailGoal)
    setScreen('whatyouknow')
  }

  // ── HANDLER: WHAT YOU KNOW → Generate 7 AI Questions ──
  const handleWhatYouKnowNext = async () => {
    if (!whatYouKnow.trim()) return
    setAssessmentError('')
    setLoadingMessage('Analysing your background...')
    setLoadingSubMessage('Reading what you know · Identifying your gaps · Crafting 7 questions just for you')
    setScreen('loading')

    try {
      const result = await generateAssessmentQuestions({
        goalId:    confirmedGoal?.id         || confirmedGoal?.goalType || 'sde',
        goalTitle: confirmedGoal?.title      || 'Software Engineer',
        branch:    branch                    || 'CSE',
        semester:  typeof semester === 'number' ? semester : parseInt(semester) || 3,
        whatYouKnow,
      })

      window.__claripath_assessmentQuestions = result.questions
      setGeneratedQuestions(result.questions.map(q => q.question))
      setCurrentQ(0)
      setCurrentAnswer('')
      setScreen('assessment')

    } catch (err) {
      console.error('[AssessmentGenerator] Failed:', err)
      const goalTitle = confirmedGoal?.title || 'this field'
      const fallbackQuestions = [
        { id: 1, question: `What do you think someone working in ${goalTitle} does on a typical day?`, topic: 'General', difficulty: 'BASIC', type: 'TECHNICAL' },
        { id: 2, question: `Have you come across any terms or topics related to ${goalTitle}? What did you understand about them?`, topic: 'General', difficulty: 'BASIC', type: 'TECHNICAL' },
        { id: 3, question: `If you had to start learning ${goalTitle} today, what is the first thing you would search for?`, topic: 'General', difficulty: 'BASIC', type: 'TECHNICAL' },
        { id: 4, question: `Why did you choose ${goalTitle} as your career goal? What excites you about it?`, topic: 'Motivation', difficulty: 'BASIC', type: 'MOTIVATIONAL' },
        { id: 5, question: `What kind of work do you enjoy most — building things, solving puzzles, analysing data, or designing? Why?`, topic: 'Motivation', difficulty: 'BASIC', type: 'MOTIVATIONAL' },
        { id: 6, question: `What is your biggest fear or concern about pursuing ${goalTitle} as a career?`, topic: 'Motivation', difficulty: 'BASIC', type: 'MOTIVATIONAL' },
        { id: 7, question: `Where do you see yourself in 2 years if you follow this roadmap consistently?`, topic: 'Motivation', difficulty: 'BASIC', type: 'MOTIVATIONAL' },
      ]
      window.__claripath_assessmentQuestions = fallbackQuestions
      setGeneratedQuestions(fallbackQuestions.map(q => q.question))
      setCurrentQ(0)
      setCurrentAnswer('')
      setScreen('assessment')
    }
  }

  // ── HANDLER: ASSESSMENT NEXT → on last Q, generate roadmap ──
  const handleAssessNext = async () => {
    if (!currentAnswer.trim()) return

    const updated = { ...assessAnswers, [currentQ]: currentAnswer }
    setAssessAnswers(updated)
    setCurrentAnswer('')

    const isLastQuestion = currentQ + 1 >= generatedQuestions.length

    if (!isLastQuestion) {
      setCurrentQ(currentQ + 1)
      return
    }

    // ── Last question submitted → generate roadmap ──
    setLoadingMessage('Building your personalised 16-week roadmap...')
    setLoadingSubMessage('Detecting your true level · Aligning with your syllabus · Creating 16 weeks of tasks')
    setScreen('loading')

    try {
      const storedQuestions = window.__claripath_assessmentQuestions || []
      const assessmentQnA = generatedQuestions.map((q, i) => ({
        question:   q,
        topic:      storedQuestions[i]?.topic      || 'General',
        difficulty: storedQuestions[i]?.difficulty || 'BASIC',
        type:       storedQuestions[i]?.type       || 'TECHNICAL',
        answer:     updated[i]                     || '',
      }))

      const userId = user?.id || user?.userId || localStorage.getItem('userId') || 'guest'

      // ── FIX: destructure safely with fallback defaults ──
      const result = await generateAndSaveRoadmap({
        userId,
        goalId:      confirmedGoal?.id        || confirmedGoal?.goalType || 'sde',
        goalTitle:   confirmedGoal?.title     || 'Software Engineer',
        branch:      branch                   || 'CSE',
        semester:    typeof semester === 'number' ? semester : parseInt(semester) || 3,
        hoursPerWeek,
        mode,
        whatYouKnow,
        assessmentQnA,
      })

      // ── FIX: guard against undefined result or levelData ──
      const roadmapId = result?.roadmapId ?? null
      const levelData = result?.levelData ?? {}

      completeOnboarding()

      navigate('/dashboard', {
        state: {
          freshRoadmap:  true,
          roadmapId,
          trueLevel:     levelData?.trueLevel     ?? 'BEGINNER',
          skipTopics:    levelData?.skipTopics     ?? [],
          startPoint:    levelData?.startPoint     ?? '',
          goalTitle:     confirmedGoal?.title      ?? '',
          goalId:        confirmedGoal?.id         ?? '',
          branch:        branch                    ?? '',
          semester:      typeof semester === 'number' ? semester : parseInt(semester) || 3,
          hoursPerWeek,
          mode,
        }
      })

    } catch (err) {
      console.error('[RoadmapGenerator] Failed:', err)
      // Don't navigate — show error and let user retry
      setLoadingMessage('Generation failed — please try again')
      setLoadingSubMessage(err.message || 'Gemini was unavailable. Click below to retry.')
      setScreen('assessment')
      setCurrentQ(generatedQuestions.length - 1)
      setCurrentAnswer(Object.values(assessAnswers).at(-1) || '')
      setAssessmentError('⚠️ Roadmap generation failed: ' + (err.message || 'Please try again in a moment.'))
    }
  }

  const sharedStyle = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800;900&display=swap');
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes spin-slow-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
    @keyframes drift { 0%,100%{transform:translate(0,0)} 33%{transform:translate(12px,-10px)} 66%{transform:translate(-8px,8px)} }
    @keyframes shimmer-gold { 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    .playfair { font-family: 'Playfair Display', Georgia, serif; }
    .gold-text {
      background: linear-gradient(135deg, #b45309, #d97706, #f59e0b, #d97706, #b45309);
      background-size: 300% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer-gold 4s linear infinite;
    }
    .ob-input:focus { border-color: #b45309 !important; box-shadow: 0 0 0 3px rgba(180,83,9,0.1) !important; }
    .ob-option:hover { border-color: rgba(180,83,9,0.4) !important; background: #fef9f0 !important; }
    .ob-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(180,83,9,0.35) !important; }
    .goal-card:hover { border-color: rgba(180,83,9,0.4) !important; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08) !important; }
    textarea::placeholder, input::placeholder { color: #a8a29e; }
  `

  // ── SCREEN: WELCOME ──
  if (screen === 'welcome') return (
    <div style={{ ...pageBg, alignItems: 'center' }}>
      <style>{sharedStyle}</style>
      <BgDecor />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 660, textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 48 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #b45309, #d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(180,83,9,0.3)' }}>
            <span className="playfair" style={{ color: 'white', fontWeight: 900, fontSize: 18 }}>C</span>
          </div>
          <span className="playfair" style={{ color: C.text, fontWeight: 800, fontSize: 20 }}>ClariPath</span>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 16px', borderRadius: 100, background: C.goldBg, border: `1px solid ${C.goldBorder}`, color: C.gold, fontSize: 12, fontWeight: 600, marginBottom: 22, letterSpacing: '0.04em' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.gold, display: 'inline-block' }} />
          YOUR JOURNEY STARTS HERE
        </div>
        <h1 className="playfair" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, color: C.text, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 18 }}>
          The next 5 minutes will{' '}
          <span className="gold-text">shape your entire roadmap</span>
        </h1>
        <p style={{ fontSize: 16, color: C.textMid, lineHeight: 1.7, maxWidth: 500, margin: '0 auto 40px' }}>
          We are about to ask you a few questions. Your answers will be used to build a personalised 16-week roadmap — one that no other student will have.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 32 }}>
          {[
            { icon: '🎯', title: 'Be honest', desc: 'There are no right or wrong answers. The system works better when you are real.' },
            { icon: '🧠', title: 'Be detailed', desc: 'The more context you give, the more accurate your roadmap will be.' },
            { icon: '⏱️', title: 'Take your time', desc: 'Do not rush. These answers decide your entire learning path.' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '22px 18px', borderRadius: 18, background: C.white, border: `1px solid ${C.border}`, textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 11, color: C.textLight, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '22px 28px', borderRadius: 18, background: C.white, border: `1px solid ${C.border}`, marginBottom: 36, textAlign: 'left', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.textLight, marginBottom: 16, letterSpacing: '0.08em' }}>WHAT HAPPENS NEXT</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { step: '01', text: 'Tell us your branch and how clear you are about your career', color: C.gold },
              { step: '02', text: 'Answer discovery questions so we understand what suits you', color: '#7c3aed' },
              { step: '03', text: 'Pick a career goal and explore it in detail before committing', color: '#1d4ed8' },
              { step: '04', text: 'Tell us what you already know — we build on top of that', color: '#047857' },
              { step: '05', text: 'Answer 7 personalised questions — your roadmap is generated', color: C.goldLight },
            ].map((item) => (
              <div key={item.step} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: `${item.color}12`, border: `1px solid ${item.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="playfair" style={{ fontSize: 10, fontWeight: 900, color: item.color }}>{item.step}</span>
                </div>
                <span style={{ fontSize: 13, color: C.textMid, lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="ob-btn" onClick={() => setScreen('intro')}
          style={{ ...btn, maxWidth: 400, margin: '0 auto', display: 'block', padding: '15px 32px', fontSize: 15, fontWeight: 800 }}>
          I am ready — Let's begin →
        </button>
        <p style={{ fontSize: 12, color: C.textLight, marginTop: 14 }}>
          Takes about 5 minutes · No right or wrong answers
        </p>
      </div>
    </div>
  )

  // ── SCREEN: INTRO ──
  if (screen === 'intro') return (
    <div style={{ ...pageBg, alignItems: 'center' }}>
      <style>{sharedStyle}</style>
      <BgDecor />
      <div style={{ ...card, maxWidth: 600, zIndex: 1 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #b45309, #d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="playfair" style={{ color: 'white', fontWeight: 900, fontSize: 15 }}>C</span>
          </div>
          <span className="playfair" style={{ color: C.text, fontWeight: 800, fontSize: 17 }}>ClariPath</span>
        </div>
        <h2 style={title}>Let's find your path</h2>
        <p style={subtitle}>Tell us a bit about yourself so we can build a roadmap made specifically for you.</p>

        {/* Branch */}
        <div style={{ marginBottom: 22 }}>
          <label style={labelStyle}>What is your college branch?</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {BRANCHES.map((b, i) => (
              <button key={b} className="ob-option" onClick={() => setBranch(FIELDS[i])} style={optionBtn(branch === FIELDS[i])}>{b}</button>
            ))}
          </div>
        </div>

        {/* Semester */}
        <div style={{ marginBottom: 22 }}>
          <label style={labelStyle}>Which semester are you in?</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 6 }}>
            {SEMESTERS.map(s => (
              <button key={s} className="ob-option" onClick={() => setSemester(s)} style={{ ...optionBtn(semester === s), textAlign: 'center', padding: '10px 4px' }}>{s}</button>
            ))}
          </div>
        </div>

        {/* Hours per week */}
        <div style={{ marginBottom: 22 }}>
          <label style={labelStyle}>How many hours per week can you dedicate to learning?</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[5, 8, 10, 15, 20, 25].map(h => (
              <button key={h} className="ob-option" onClick={() => setHoursPerWeek(h)} style={{ ...optionBtn(hoursPerWeek === h), textAlign: 'center' }}>
                {h} hrs/week
              </button>
            ))}
          </div>
        </div>

        {/* Mode */}
        <div style={{ marginBottom: 22 }}>
          <label style={labelStyle}>What is your primary goal right now?</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { value: 'Placement', label: 'Placement — I want to get a full-time job after graduation' },
              { value: 'Internship', label: 'Internship — I want to land an internship this semester' },
              { value: 'Skill Building', label: 'Skill Building — I want to learn and grow at my own pace' },
            ].map(m => (
              <button key={m.value} className="ob-option" onClick={() => setMode(m.value)} style={optionBtn(mode === m.value)}>{m.label}</button>
            ))}
          </div>
        </div>

        {/* Other field */}
        <div style={{ marginBottom: 22 }}>
          <label style={labelStyle}>Are you interested in a different field?</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
            {[
              { value: '', label: 'No, stay in my branch' },
              { value: 'show', label: 'Yes, explore another field' },
            ].map(opt => (
              <button key={opt.label} className="ob-option"
                onClick={() => setInterestedOtherField(opt.value === 'show' ? 'CSE' : '')}
                style={optionBtn(opt.value === '' ? interestedOtherField === '' : interestedOtherField !== '')}>
                {opt.label}
              </button>
            ))}
          </div>
          {interestedOtherField !== '' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
              {FIELDS.map(f => (
                <button key={f} className="ob-option" onClick={() => setInterestedOtherField(f)} style={optionBtn(interestedOtherField === f)}>{f}</button>
              ))}
            </div>
          )}
        </div>

        {/* Clarity */}
        <div style={{ marginBottom: 28 }}>
          <label style={labelStyle}>Do you know what career you want?</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {CLARITY_OPTIONS.map(c => (
              <button key={c.value} className="ob-option" onClick={() => setClarity(c.value)} style={optionBtn(clarity === c.value)}>{c.label}</button>
            ))}
          </div>
        </div>

        <button className="ob-btn" onClick={handleIntroNext} style={branch && semester && clarity ? btn : btnOff} disabled={!branch || !semester || !clarity}>
          Continue →
        </button>
      </div>
    </div>
  )

  // ── SCREEN: QUESTIONS ──
  if (screen === 'questions') {
    const pct = (currentQ / visibleQuestions.length) * 100
    const opts = QUESTION_OPTIONS[selectedField]?.[currentQ] || {}
    return (
      <div style={{ ...pageBg, alignItems: 'center' }}>
        <style>{sharedStyle}</style>
        <BgDecor />
        <div style={{ ...card, zIndex: 1 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            {progressBar(pct)}
            <h2 style={{ ...title, fontSize: 18, marginBottom: 22, lineHeight: 1.5 }}>
              {visibleQuestions[currentQ]}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 20 }}>
              {Object.entries(opts).map(([letter, text]) => (
                <button key={letter} className="ob-option"
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
                    padding: '13px 18px', borderRadius: 12,
                    border: `1.5px solid ${answers[currentQ] === letter ? C.gold + '60' : C.border}`,
                    background: answers[currentQ] === letter ? C.goldBg : C.white,
                    color: answers[currentQ] === letter ? C.gold : C.textMid,
                    fontSize: 13, fontWeight: 500, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                  }}>
                  <span style={{ fontWeight: 700, marginRight: 10, color: answers[currentQ] === letter ? C.gold : C.textLight }}>{letter}.</span>
                  {text}
                </button>
              ))}
            </div>
            {currentQ > 0 && (
              <button onClick={() => setCurrentQ(currentQ - 1)}
                style={{ width: '100%', padding: 11, borderRadius: 12, border: `1px solid ${C.border}`, background: 'transparent', color: C.textLight, fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
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
    <div style={{ ...pageBg, alignItems: 'flex-start', paddingTop: 48 }}>
      <style>{sharedStyle}</style>
      <BgDecor />
      <div style={{ width: '100%', maxWidth: 680, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 100, background: C.goldBg, border: `1px solid ${C.goldBorder}`, color: C.gold, fontSize: 12, fontWeight: 600, marginBottom: 14 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.gold, display: 'inline-block' }} />
            {clarity === 'yes' ? 'Choose your goal' : 'Based on your answers'}
          </div>
          <h2 className="playfair" style={{ fontSize: 30, fontWeight: 900, color: C.text, marginBottom: 8, letterSpacing: '-0.02em' }}>
            {clarity === 'yes' ? 'Select your career goal' : 'Here are your career matches'}
          </h2>
          <p style={{ fontSize: 14, color: C.textLight }}>Tap any goal to learn more before deciding</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 16px 48px' }}>
          {goals.map((goal, i) => (
            <button key={goal.id} className="goal-card"
              onClick={() => { setDetailGoal(goal); setScreen('goal-detail') }}
              style={{
                padding: '18px 22px', borderRadius: 16, cursor: 'pointer', textAlign: 'left',
                border: `1.5px solid ${(clarity !== 'yes' && i === 0) ? C.gold + '50' : C.border}`,
                background: (clarity !== 'yes' && i === 0) ? C.goldBg : C.white,
                position: 'relative', overflow: 'hidden',
                boxShadow: (clarity !== 'yes' && i === 0) ? '0 4px 20px rgba(180,83,9,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'all 0.25s ease',
              }}>
              {clarity !== 'yes' && i === 0 && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2.5, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />
              )}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12,
                    background: (clarity !== 'yes' && i === 0) ? 'rgba(180,83,9,0.1)' : C.bgAlt,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                    border: `1px solid ${(clarity !== 'yes' && i === 0) ? C.goldBorder : C.border}` }}>
                    {goal.icon || '🎯'}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{goal.title}</span>
                      {clarity !== 'yes' && i === 0 && (
                        <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: C.gold + '18', color: C.gold, border: `1px solid ${C.gold}30` }}>TOP MATCH</span>
                      )}
                    </div>
                    <span style={{ fontSize: 12, color: C.textLight }}>{goal.domain}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
                  {clarity !== 'yes' && goal.matchPercent > 0 && (
                    <span style={{ fontSize: 16, fontWeight: 800, color: i === 0 ? C.gold : C.textLight, fontFamily: "'Playfair Display', serif" }}>{goal.matchPercent}%</span>
                  )}
                  <span style={{ fontSize: 11, color: C.textLight }}>Tap to explore →</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  // ── SCREEN: GOAL DETAIL ──
  if (screen === 'goal-detail' && detailGoal) return (
    <div style={{ minHeight: '100vh', background: C.bg, padding: '0 0 60px 0', position: 'relative', overflow: 'hidden' }}>
      <BgDecor />
      <style>{sharedStyle}</style>
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 700, margin: '0 auto', padding: '40px 24px 0' }}>
        <button onClick={() => setScreen('goals')}
          style={{ background: 'none', border: 'none', color: C.gold, fontFamily: 'DM Sans, sans-serif', fontSize: 14, cursor: 'pointer', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 6 }}>
          ← Back to all goals
        </button>
        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: '28px 32px', marginBottom: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 16 }}>
            <div style={{ width: 56, height: 56, background: C.goldBg, borderRadius: 14, border: `1px solid ${C.goldBorder}`, flexShrink: 0 }} />
            <div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: C.text, margin: 0 }}>{detailGoal.title}</h2>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: C.textLight, margin: '4px 0 0' }}>{detailGoal.field || detailGoal.domain}</p>
            </div>
          </div>
          {detailGoal.fieldOverview && (
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: C.textMid, lineHeight: 1.7, margin: 0, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
              {detailGoal.fieldOverview}
            </p>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          <DetailCard icon="📚" label="What will you learn?" value={detailGoal.whatYouLearn} C={C} />
          <DetailCard icon="💼" label="What will you do daily?" value={detailGoal.whatYouDo} C={C} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          <DetailCard icon="🧠" label="Core skills needed" value={detailGoal.coreSkills} C={C} />
          <DetailCard icon="🛠️" label="Tools & software" value={detailGoal.tools} C={C} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          <DetailCard icon="👤" label="Primary job roles" value={detailGoal.primaryRoles} C={C} />
          <DetailCard icon="🚀" label="Where you start" value={detailGoal.entryLevelRole} C={C} />
        </div>
        {detailGoal.careerPath && (
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: '18px 22px', marginBottom: 14, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, color: C.gold, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 10px' }}>
              📈 Long-term career path
            </p>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
              {detailGoal.careerPath.split('→').map((step, i, arr) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ background: i === 0 ? C.goldBg : C.bgAlt, border: `1px solid ${i === 0 ? C.goldBorder : C.border}`, borderRadius: 20, padding: '4px 12px', fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: i === 0 ? C.gold : C.textMid, fontWeight: i === 0 ? 600 : 400 }}>
                    {step.trim()}
                  </span>
                  {i < arr.length - 1 && <span style={{ color: C.textLight, fontSize: 14 }}>→</span>}
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{ marginBottom: 14 }}>
          <DetailCard icon="📊" label="Career scope & growth" value={detailGoal.careerScope} C={C} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          <DetailCard icon="🎓" label="Relevant subjects" value={detailGoal.academicRelevance} C={C} />
          <DetailCard icon="✅" label="Best suited for" value={detailGoal.whoShouldChoose} C={C} />
        </div>
        {detailGoal.topCompanies && (
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: '18px 22px', marginBottom: 28, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, color: C.gold, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 10px' }}>
              🏢 Top companies hiring
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {detailGoal.topCompanies.split(',').map((c, i) => (
                <span key={i} style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 20, padding: '4px 12px', fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: C.textMid }}>
                  {c.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
        <button onClick={() => { setConfirmedGoal(detailGoal); setScreen('whatyouknow') }}
          style={{ width: '100%', padding: '16px', background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, color: '#fff', border: 'none', borderRadius: 14, fontFamily: 'DM Sans, sans-serif', fontSize: 16, fontWeight: 600, cursor: 'pointer', letterSpacing: 0.3 }}>
          Yes, this is my goal — Start assessment →
        </button>
      </div>
    </div>
  )

  // ── SCREEN: WHAT YOU KNOW ──
  if (screen === 'whatyouknow') return (
    <div style={{ ...pageBg, alignItems: 'center' }}>
      <style>{sharedStyle}</style>
      <BgDecor />
      <div style={{ ...card, zIndex: 1 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, #7c3aed, transparent)` }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 100, background: '#f5f3ff', border: '1px solid #ddd6fe', color: '#7c3aed', fontSize: 11, fontWeight: 600, marginBottom: 20 }}>
            Goal confirmed — {confirmedGoal?.title}
          </div>
          <h2 style={title}>What do you already know?</h2>
          <p style={subtitle}>
            Tell us everything you have learned so far — courses, projects, languages, tools, anything.
            Be honest and detailed. The more you tell us, the better your assessment will be.
          </p>
          <div style={{ padding: '12px 16px', borderRadius: 12, background: C.goldBg, border: `1px solid ${C.goldBorder}`, marginBottom: 18 }}>
            <p style={{ fontSize: 12, color: C.gold, margin: 0, lineHeight: 1.6 }}>
              💡 <strong>Take your time.</strong> This single answer is used to generate 7 personalised questions just for you. A detailed answer means a better roadmap.
            </p>
          </div>
          <textarea className="ob-input"
            value={whatYouKnow}
            onChange={e => setWhatYouKnow(e.target.value)}
            placeholder="Example: I know basic C++ from college, built a simple calculator project, watched some YouTube tutorials on Java but never built anything with it, know basic HTML and CSS, tried Python for 2 weeks but stopped..."
            rows={7}
            style={inputStyle}
          />
          <button className="ob-btn" onClick={handleWhatYouKnowNext}
            style={whatYouKnow.trim().length > 20 ? btn : btnOff}
            disabled={whatYouKnow.trim().length <= 20}>
            Generate My Assessment Questions →
          </button>
        </div>
      </div>
    </div>
  )

  // ── SCREEN: ASSESSMENT ──
  if (screen === 'assessment') {
    const pct = ((currentQ) / generatedQuestions.length) * 100
    return (
      <div style={{ ...pageBg, alignItems: 'center' }}>
        <style>{sharedStyle}</style>
        <BgDecor />
        <div style={{ ...card, zIndex: 1 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, #7c3aed, transparent)` }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 100, background: '#f5f3ff', border: '1px solid #ddd6fe', color: '#7c3aed', fontSize: 11, fontWeight: 600, marginBottom: 18 }}>
              Skill Assessment — {confirmedGoal?.title}
            </div>
            {progressBar(pct, generatedQuestions.length)}
            <h2 style={{ ...title, fontSize: 18, marginBottom: 20, lineHeight: 1.5 }}>
              {generatedQuestions[currentQ]}
            </h2>
            <textarea className="ob-input" value={currentAnswer} onChange={e => setCurrentAnswer(e.target.value)}
              placeholder="Type your answer here..." rows={5} style={inputStyle} />
            {assessmentError && (
              <p style={{ fontSize: 12, color: '#dc2626', marginTop: 8, marginBottom: 0 }}>{assessmentError}</p>
            )}
            <button className="ob-btn" onClick={handleAssessNext}
              style={currentAnswer.trim() ? btn : btnOff}
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
    <div style={{ ...pageBg, flexDirection: 'column', gap: 24 }}>
      <style>{sharedStyle}</style>
      <BgDecor />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <div style={{ width: 68, height: 68, borderRadius: 20, background: 'linear-gradient(135deg, #b45309, #d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 24px rgba(180,83,9,0.35)' }}>
          <svg style={{ animation: 'spin 1s linear infinite', width: 30, height: 30 }} fill="none" viewBox="0 0 24 24">
            <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
            <path style={{ opacity: 0.75 }} fill="white" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <h2 className="playfair" style={{ fontSize: 22, fontWeight: 900, color: C.text, marginBottom: 10 }}>
            {loadingMessage}
          </h2>
          <p style={{ fontSize: 14, color: C.textLight, lineHeight: 1.65 }}>
            {loadingSubMessage || 'This takes a few seconds. We are analysing everything you told us to build something truly personalised.'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: C.gold, opacity: 0.4, animation: `drift ${1 + i * 0.3}s ease-in-out infinite ${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    </div>
  )
}