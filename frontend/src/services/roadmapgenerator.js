// ─── Roadmap Generator ────────────────────────────────────────────────────────

import { getSyllabusContext } from '../utils/syllabusData'

async function callGeminiJSON(system, userPrompt) {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`

  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${system}\n\n${userPrompt}` }] }]
      })
    })

    if (res.status === 429 || res.status === 503) {
      if (attempt < 3) {
        const wait = 5000 * (attempt + 1)
        console.warn(`Gemini ${res.status} — retrying in ${wait / 1000}s... (attempt ${attempt + 1})`)
        await new Promise(r => setTimeout(r, wait))
        continue
      }
      throw new Error(`Gemini unavailable (${res.status}). Please wait a moment and try again.`)
    }

    const data = await res.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''

    if (!text) throw new Error('Gemini returned empty response. Please try again.')

    const cleaned = text.replace(/^```[\w]*\n?/m, '').replace(/```$/m, '').trim()

    try {
      return JSON.parse(cleaned)
    } catch {
      throw new Error('Gemini response was not valid JSON. Please try again.')
    }
  }
}

const SYSTEM = `You are an expert career roadmap architect for Indian engineering students.
Build a highly personalized 16-week semester roadmap.

PRIORITIES (in order):
1. Career goal is the NORTH STAR — every task must serve it
2. Student's TRUE skill level from assessment (not what they claimed)
3. Syllabus alignment — college subjects this semester
4. Hours per week constraint — never exceed it
5. Skip topics the student clearly knows; double down on weak areas

Return ONLY valid JSON. No markdown. No text outside JSON. Exact schema:

{
  "studentSummary": {
    "trueLevel": "BEGINNER|INTERMEDIATE|ADVANCED",
    "assessmentScore": 0-100,
    "topicsKnown": ["topic"],
    "topicsWeak": ["topic"],
    "topicsSkipped": ["topic"],
    "honestyGap": "One sentence: difference between claimed vs demonstrated knowledge",
    "strengthNote": "One sentence: genuine strength worth building on",
    "startPoint": "One sentence: exactly where Week 1 Task 1 begins"
  },
  "readinessTarget": "e.g. Aim for 60-70 readiness score by end of semester",
  "milestones": [
    { "week": 4,  "title": "...", "type": "Project|Certification|Achievement" },
    { "week": 8,  "title": "...", "type": "Project|Certification|Achievement" },
    { "week": 12, "title": "...", "type": "Project|Certification|Achievement" },
    { "week": 16, "title": "...", "type": "Project|Certification|Achievement" }
  ],
  "phases": [
    {
      "id": 1,
      "phase": "Phase 1",
      "goal": "Phase outcome sentence",
      "weeks": "1-4",
      "color": "#10b981",
      "completion": 0,
      "weeks_data": [
        {
          "wk": 1,
          "focus": "Week topic",
          "done": false,
          "current": false,
          "syllabusLink": "Which college subject this week connects to, or null",
          "tasks": [
            {
              "title": "Task title",
              "desc": "2 sentences: what to do and why it matters for the career goal",
              "resource": "Real resource name",
              "resourceUrl": "https://real-url.com",
              "hours": 2.5,
              "difficulty": "EASY|MEDIUM|HARD",
              "type": "learn|practice|build",
              "tags": ["tag1", "tag2"]
            }
          ]
        }
      ]
    }
  ]
}

PHASE COLORS (use exactly):
Phase 1: "#10b981"  Phase 2: "#b45309"  Phase 3: "#7c3aed"  Phase 4: "#1d4ed8"

REAL RESOURCES BY GOAL (mandatory — never say "an online tutorial"):
SDE/DSA:    NeetCode(neetcode.io), Striver A2Z(takeuforward.org), LeetCode(leetcode.com), CS50(cs50.harvard.edu)
Data Sci:   Kaggle Learn(kaggle.com/learn), fast.ai(fast.ai), StatQuest(youtube.com/@statquest), Google ML Crash Course(developers.google.com/machine-learning/crash-course)
DevOps:     KodeKloud(kodekloud.com), TechWorld with Nana(youtube.com/@TechWorldwithNana), Linux Journey(linuxjourney.com)
Frontend:   The Odin Project(theodinproject.com), JavaScript.info(javascript.info), freeCodeCamp(freecodecamp.org)
General:    GeeksForGeeks(geeksforgeeks.org), MIT OCW(ocw.mit.edu), Coursera(coursera.org)

TASK COUNT RULES:
- hoursPerWeek <= 8  → 3 tasks per week
- hoursPerWeek > 8   → 4 tasks per week
- Total hours across tasks in a week must NOT exceed hoursPerWeek
- Week 8 and Week 16 = exam weeks → max 2 EASY tasks only
- At least 1 "build" task per phase
- Week 1 Task 1 MUST start from studentSummary.startPoint`

function buildRoadmapPrompt({ goalId, goalTitle, branch, semester, hoursPerWeek, mode, whatYouKnow, assessmentQnA, syllabusContext }) {
  const qnaBlock = assessmentQnA
    .map((qa, i) =>
      `Q${i + 1} [${qa.topic || 'General'} — ${qa.level || 'unknown'}]: ${qa.question}\nStudent Answer: "${qa.answer || '(no answer)'}"`
    )
    .join('\n\n')

  return `STUDENT PROFILE:
Career Goal: ${goalTitle} (${goalId})
Branch: ${branch} | Semester: ${semester}
Hours available per week: ${hoursPerWeek}h
Mode: ${mode} — ${
    mode === 'Placement' ? 'targeting campus placement in final year (urgency: high)'
    : mode === 'Internship' ? 'targeting internship in next 6 months (urgency: medium-high)'
    : 'skill building at own pace (urgency: low-medium)'
  }

${syllabusContext}

WHAT STUDENT CLAIMS TO KNOW:
"""
${whatYouKnow || 'Student left this blank — assumed complete beginner.'}
"""

ASSESSMENT — 7 Q&A PAIRS:
${qnaBlock}

YOUR TASK:
Step 1 — Analyze the 7 answers. What does this student ACTUALLY know vs what they claimed?
Step 2 — Determine trueLevel, topicsKnown, topicsWeak, topicsSkipped.
Step 3 — Build a 16-week roadmap with exactly 4 phases of 4 weeks each.
Step 4 — Every task must serve the career goal: ${goalTitle}
Step 5 — Align tasks with the syllabus context where it makes sense
Step 6 — Never exceed ${hoursPerWeek}h total task hours per week
Step 7 — Set 4 concrete milestones (week 4, 8, 12, 16)`
}

export async function generateAndSaveRoadmap({
  userId, goalId, goalTitle, branch, semester,
  hoursPerWeek, mode, whatYouKnow, assessmentQnA
}) {
  const syllabusContext = getSyllabusContext(branch, semester)

  const userPrompt = buildRoadmapPrompt({
    goalId, goalTitle, branch, semester,
    hoursPerWeek, mode, whatYouKnow,
    assessmentQnA, syllabusContext
  })

  const roadmap = await callGeminiJSON(SYSTEM, userPrompt)

  if (!roadmap.phases || roadmap.phases.length !== 4) {
    throw new Error('Roadmap generation failed: expected 4 phases in response.')
  }

  roadmap.phases = roadmap.phases.map((phase, pi) => ({
    ...phase,
    completion: 0,
    weeks_data: phase.weeks_data.map((week, wi) => ({
      ...week,
      done: false,
      current: pi === 0 && wi === 0
    }))
  }))

  roadmap.generatedAt   = new Date().toISOString()
  roadmap.semesterLabel = `Semester ${semester}`
  roadmap.goal          = { id: goalId, title: goalTitle }
  roadmap.branch        = branch
  roadmap.hoursPerWeek  = hoursPerWeek
  roadmap.mode          = mode

  // ── Save to backend ──
  const token = localStorage.getItem('token')
  const saveRes = await fetch('http://localhost:8080/api/onboarding/generate-roadmap', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
  userId,
  branch,
  semester,
  college: null, // pass college here if you collect it during onboarding
  roadmapJson: JSON.stringify(roadmap)
})
  })

  if (!saveRes.ok) {
    throw new Error('Failed to save roadmap to backend')
  }

  return roadmap
}