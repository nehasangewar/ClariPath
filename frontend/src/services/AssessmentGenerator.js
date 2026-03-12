// ─── Assessment Question Generator ───────────────────────────────────────────
// Takes: goal + whatYouKnow + branch + semester
// Returns: exactly 7 question objects
//
// TWO MODES:
// BEGINNER  — student knows nothing → 3 basic goal questions + 4 motivational
// TARGETED  — student described some knowledge → 7 gap-finding questions

import { callGeminiJSON } from './gemini'

// ── Detect if student knows nothing ──────────────────────────────────────────
function studentKnowsNothing(whatYouKnow) {
  if (!whatYouKnow) return true
  const text = whatYouKnow.toLowerCase().trim()
  if (text.length < 30) return true
  const nothingPhrases = [
    'nothing', 'dont know', "don't know", 'no idea', 'not sure',
    'beginner', 'zero', 'never learned', 'never studied', 'i have no',
    'no knowledge', 'i know nothing', 'not much', 'very little',
    'barely', 'fresh start', 'complete beginner', 'starting from scratch'
  ]
  return nothingPhrases.some(phrase => text.includes(phrase))
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

function buildBeginnerPrompt({ goalId, goalTitle, branch, semester }) {
  return `STUDENT PROFILE:
Career Goal: ${goalTitle} (${goalId})
Branch: ${branch} | Semester: ${semester}
Prior Knowledge: NONE — student says they know nothing yet.

Generate 7 BEGINNER MODE questions:

Questions 1, 2, 3 → level: "basic" — Foundational awareness questions about the career goal
  - What do they THINK a ${goalTitle} does day-to-day?
  - Have they ever encountered or tried anything related to ${goalTitle}? What happened?
  - What core concept of ${goalTitle} have they heard of, even vaguely?
  Keep these approachable — the student knows nothing, don't intimidate.

Questions 4, 5, 6, 7 → level: "motivational" — Understand their mindset and context
  Question 4: WHY do they want this career? What specifically excites them about ${goalTitle}?
  Question 5: HOW do they learn best? (videos, reading, hands-on projects, structured courses, etc.)
  Question 6: FEAR — What worries or intimidates them about starting this journey?
  Question 7: TIME & COMMITMENT — Describe a typical week. How many hours realistically can they dedicate?

These 4 motivational questions are critical — the roadmap uses these answers to calibrate learning style, pacing, and motivation triggers.`
}

function buildTargetedPrompt({ goalId, goalTitle, branch, semester, whatYouKnow }) {
  return `STUDENT PROFILE:
Career Goal: ${goalTitle} (${goalId})
Branch: ${branch} | Semester: ${semester}
What student claims to know:
"""
${whatYouKnow}
"""

Generate 7 TARGETED MODE questions to verify claims and find real gaps:

Questions 1, 2, 3 → level: "basic" — Verify specific things they mentioned
  - Pick 3 concrete claims from their "what I know" text
  - Ask them to explain or demonstrate each — not just confirm they know it
  - Example: If they said "I know arrays", ask "Explain the time complexity of insertion at the beginning of an array vs end, and why?"

Questions 4, 5 → level: "intermediate" — Test one level deeper than their claims
  - Choose 2 topics that naturally follow from what they know
  - These are the most likely GAPS — things they'd need next but haven't mentioned

Question 6 → level: "intermediate" — One small practical problem
  - A real mini-problem directly relevant to ${goalTitle}
  - Should take 4–8 sentences to answer well if they truly know the relevant concept

Question 7 → level: "basic" — Honest self-reflection
  - "Among everything you mentioned knowing, which specific area do you feel LEAST confident about when someone asks you to explain or use it? Why?"

Make every question directly tied to what they wrote — no generic filler questions.`
}

/**
 * generateAssessmentQuestions
 * @param {object} params
 * @param {string} params.goalId
 * @param {string} params.goalTitle
 * @param {string} params.branch
 * @param {number} params.semester
 * @param {string} params.whatYouKnow
 * @returns {Promise<{ mode: string, questions: Array }>}
 */
export async function generateAssessmentQuestions({
  goalId, goalTitle, branch, semester, whatYouKnow = ''
}) {
  const isBeginnerMode = studentKnowsNothing(whatYouKnow)

  const userPrompt = isBeginnerMode
    ? buildBeginnerPrompt({ goalId, goalTitle, branch, semester })
    : buildTargetedPrompt({ goalId, goalTitle, branch, semester, whatYouKnow })

  const result = await callGeminiJSON(SYSTEM, userPrompt)

  if (!result.questions || result.questions.length !== 7) {
    throw new Error(`Expected 7 questions, got ${result.questions?.length ?? 0}`)
  }

  // Normalize ids
  result.questions = result.questions.map((q, i) => ({ ...q, id: i + 1 }))
  return result
}