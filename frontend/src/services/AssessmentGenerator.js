// ─── Assessment Question Generator ───────────────────────────────────────────

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

    // Retry on 429 (quota) or 503 (overloaded)
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

    if (!text) {
      throw new Error('Gemini returned empty response. Please try again.')
    }

    const cleaned = text.replace(/^```[\w]*\n?/m, '').replace(/```$/m, '').trim()

    try {
      return JSON.parse(cleaned)
    } catch {
      throw new Error('Gemini response was not valid JSON. Please try again.')
    }
  }
}

const SYSTEM = `You are an expert technical assessor for Indian engineering students.
Generate exactly 7 skill assessment questions based on the student's career goal and prior knowledge.
Return ONLY valid JSON. No markdown. No explanation. Exact schema:
{
  "mode": "beginner" or "targeted",
  "questions": [
    { "id": 1, "question": "...", "topic": "...", "level": "basic|intermediate|motivational", "hint": "optional 1-line hint" }
  ]
}
Rules:
- Exactly 7 questions in the array
- Every question requires 3-6 sentences to answer properly — never a yes/no question
- Questions must be specific to the stated career goal
- Hints are optional, include only if the question references something the student might not know the terminology for`

function buildPrompt({ goalId, goalTitle, branch, semester, whatYouKnow }) {
  return `STUDENT PROFILE:
Career Goal: ${goalTitle} (${goalId})
Branch: ${branch} | Semester: ${semester}
What student knows (interpret intelligently — could be keywords, phrases, or full sentences):
"""
${whatYouKnow || 'Student has not described any prior knowledge.'}
"""

IMPORTANT: The student may write in shorthand like "c java python" or "dsa oops" or "html css js".
Treat each word/phrase as a topic they have some exposure to and generate questions accordingly.
If they wrote nothing or very little, treat them as a beginner and ask foundational questions.
Never say "you mentioned..." — just ask the question directly.

Generate 7 questions:

Questions 1, 2, 3 → level: "basic"
  - If student mentioned specific topics: ask them to explain a concept, difference, or use-case for those topics
  - If student knows nothing: ask foundational awareness questions about ${goalTitle}
  - Keep it conversational, not intimidating

Questions 4, 5 → level: "intermediate"
  - Go one level deeper than their claimed knowledge
  - If they know nothing, ask what they think the next step after basics would be
  - These should reveal whether they truly understand or just know the name

Question 6 → level: "intermediate"
  - A small practical scenario or problem relevant to ${goalTitle}
  - Something they would encounter in a real job

Question 7 → level: "basic" — Self-reflection
  - Ask which topic from their background they feel least confident explaining, and why
  - If they wrote nothing, ask what excites them most about ${goalTitle} and why they chose it

Make every question specific to their stated topics and to ${goalTitle}. Zero generic filler.`
}

export async function generateAssessmentQuestions({
  goalId, goalTitle, branch, semester, whatYouKnow = ''
}) {
  const userPrompt = buildPrompt({ goalId, goalTitle, branch, semester, whatYouKnow })

  const result = await callGeminiJSON(SYSTEM, userPrompt)

  if (!result.questions || result.questions.length !== 7) {
    throw new Error(`Expected 7 questions, got ${result.questions?.length ?? 0}`)
  }

  result.questions = result.questions.map((q, i) => ({ ...q, id: i + 1 }))
  return result
}