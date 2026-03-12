// ─── Gemini API Helper ────────────────────────────────────────────────────────
// All Gemini calls go through here. Model: gemini-2.5-flash
// Add to your .env:  VITE_GEMINI_API_KEY=your_key_here

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_MODEL   = 'gemini-2.5-flash'
const GEMINI_URL     = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`

/**
 * callGemini — raw text response
 * @param {string} systemInstruction  - Persona + output format rules
 * @param {string} userPrompt         - Full context + request
 * @returns {string}                  - Raw text from Gemini
 */
export async function callGemini(systemInstruction, userPrompt) {
  const body = {
    system_instruction: {
      parts: [{ text: systemInstruction }]
    },
    contents: [
      { role: 'user', parts: [{ text: userPrompt }] }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json'  // forces JSON at model level
    }
  }

  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`Gemini ${res.status}: ${err?.error?.message || res.statusText}`)
  }

  const data = await res.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
  if (!text) throw new Error('Gemini returned an empty response')
  return text
}

/**
 * callGeminiJSON — parsed JSON response
 * Strips accidental markdown fences and parses.
 * @returns {object}
 */
export async function callGeminiJSON(systemInstruction, userPrompt) {
  const raw = await callGemini(systemInstruction, userPrompt)
  const clean = raw.replace(/```json|```/gi, '').trim()
  try {
    return JSON.parse(clean)
  } catch (e) {
    console.error('[Gemini] JSON parse failed. Raw output:', raw)
    throw new Error('Failed to parse Gemini response as JSON. Check console.')
  }
}