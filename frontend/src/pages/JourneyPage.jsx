import { useState } from "react";

// ─── THEME (must match App.jsx) ───────────────────────────────────────────────
const C = {
  bg: "#f5f0e8", bgAlt: "#ede8df", bgDeep: "#e6dfd3",
  text: "#1c1917", textMid: "#44403c", textLight: "#78716c",
  gold: "#b45309", goldLight: "#d97706", goldBg: "#fef3c7", goldBorder: "#fcd34d",
  border: "#e5ddd0", white: "#ffffff", cardBg: "#faf7f2",
  green: "#047857", greenBg: "rgba(4,120,87,0.08)", greenBorder: "rgba(4,120,87,0.25)",
  purple: "#7c3aed", purpleBg: "rgba(124,58,237,0.07)", purpleBorder: "rgba(124,58,237,0.2)",
  blue: "#1d4ed8", blueBg: "rgba(29,78,216,0.06)", blueBorder: "rgba(29,78,216,0.18)",
  red: "#dc2626", redBg: "rgba(220,38,38,0.07)", redBorder: "rgba(220,38,38,0.18)",
};

// ─── AI HELPER ────────────────────────────────────────────────────────────────
async function callAI(systemPrompt, userMessage) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: `SYSTEM: ${systemPrompt}\n\nUSER: ${userMessage}` }],
    }),
  });
  const data = await res.json();
  const text = data.content?.map(b => b.text || "").join("") || "";
  try { return JSON.parse(text.replace(/```json|```/g, "").trim()); }
  catch { return { raw: text }; }
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const JOURNEY_DATA = [
  { sem: 1, label: "CS Fundamentals",  status: "completed", phase: "Core CS",             readiness: 78, tasks: 24, confidence: 4.2, highlight: "Built CLI Todo App" },
  { sem: 2, label: "OOP & Databases",  status: "completed", phase: "Applied CS",          readiness: 71, tasks: 22, confidence: 3.8, highlight: "Completed CS50x" },
  { sem: 3, label: "DSA & Algorithms", status: "active",    phase: "Problem Solving",     readiness: 52, tasks: 18, confidence: 3.4, highlight: "In Progress — Week 6" },
  { sem: 4, label: "System Design",    status: "locked",    phase: "Architecture",        readiness: null, tasks: null, confidence: null, highlight: "Unlock after Sem 3" },
  { sem: 5, label: "Specialisation",   status: "locked",    phase: "Backend/Distributed", readiness: null, tasks: null, confidence: null, highlight: "Unlock after Sem 4" },
  { sem: 6, label: "Projects & OSS",   status: "locked",    phase: "Applied Engineering", readiness: null, tasks: null, confidence: null, highlight: "Unlock after Sem 5" },
  { sem: 7, label: "Internship Prep",  status: "locked",    phase: "Industry Readiness",  readiness: null, tasks: null, confidence: null, highlight: "Unlock after Sem 6" },
  { sem: 8, label: "Placement Ready",  status: "locked",    phase: "Final Placement",     readiness: null, tasks: null, confidence: null, highlight: "Unlock after Sem 7" },
];

const FULL_ROADMAP = [
  { id: 1, phase: "Phase 1", goal: "Foundations & Core CS",        weeks: "1–4",   color: C.green,  completion: 100,
    weeks_data: [
      { wk: 1, focus: "Time & Space Complexity", tasks: ["Big-O notation","Arrays & Strings basics","Two pointers"], done: true },
      { wk: 2, focus: "Sorting & Searching",     tasks: ["Merge sort","Quick sort","Binary search"], done: true },
      { wk: 3, focus: "Stacks & Queues",         tasks: ["Stack implementation","Queue with two stacks","Valid parentheses"], done: true },
      { wk: 4, focus: "Hash Tables",             tasks: ["HashMap internals","Two Sum variants","Group anagrams"], done: true },
    ]},
  { id: 2, phase: "Phase 2", goal: "Data Structures & Algorithms", weeks: "5–8",   color: C.gold,   completion: 52,
    weeks_data: [
      { wk: 5, focus: "Linked Lists",            tasks: ["Singly & doubly linked","Reverse LL","Detect cycle"], done: true },
      { wk: 6, focus: "Trees & Graphs",          tasks: ["BFS & DFS traversals","Graph representation","Cycle detection"], done: false, current: true },
      { wk: 7, focus: "Recursion & DP",          tasks: ["Recursion patterns","Memoization","Climbing stairs"], done: false },
      { wk: 8, focus: "Heaps & Priority Queues", tasks: ["Min/Max heap","Kth largest element","Merge k lists"], done: false },
    ]},
  { id: 3, phase: "Phase 3", goal: "System Design Basics",         weeks: "9–12",  color: C.purple, completion: 0,
    weeks_data: [
      { wk: 9,  focus: "Design Principles", tasks: ["SOLID principles","Design patterns","MVC architecture"], done: false },
      { wk: 10, focus: "Databases",         tasks: ["SQL deep dive","Indexing & optimization","NoSQL intro"], done: false },
      { wk: 11, focus: "APIs & REST",       tasks: ["REST design","Authentication patterns","Rate limiting"], done: false },
      { wk: 12, focus: "Scalability",       tasks: ["Load balancing","Caching strategies","CAP theorem"], done: false },
    ]},
  { id: 4, phase: "Phase 4", goal: "Projects & Interview Prep",    weeks: "13–16", color: C.blue,   completion: 0,
    weeks_data: [
      { wk: 13, focus: "Project Building",   tasks: ["Full-stack project setup","Feature implementation","Testing"], done: false },
      { wk: 14, focus: "Mock Interviews",    tasks: ["Behavioural prep","System design mock","LeetCode hard"], done: false },
      { wk: 15, focus: "Resume & Portfolio", tasks: ["Resume polish","GitHub portfolio","Project writeups"], done: false },
      { wk: 16, focus: "Final Prep",         tasks: ["Company research","OA practice","HR round prep"], done: false },
    ]},
];

// ─── CIRCULAR PROGRESS ───────────────────────────────────────────────────────
function CircularProgress({ value, size = 88, stroke = 8, color = C.gold, label }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)", position: "absolute" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.34,1.56,0.64,1)" }} />
      </svg>
      <div style={{ textAlign: "center", zIndex: 1 }}>
        <div style={{ fontSize: size > 70 ? 22 : 14, fontWeight: 900, color: C.text, fontFamily: "'Playfair Display', serif" }}>{value}</div>
        {label && <div style={{ fontSize: 9, color: C.textLight, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</div>}
      </div>
    </div>
  );
}

// ─── JOURNEY PAGE ─────────────────────────────────────────────────────────────
export default function JourneyPage({ milestones }) {
  const [selectedSem, setSelectedSem] = useState(3);
  const [aiSemInsight, setAiSemInsight] = useState({});
  const [loadingInsight, setLoadingInsight] = useState(false);

  const handleSelectSem = (sem, status) => {
    if (status === "locked") return;
    setSelectedSem(sem);
    if (!aiSemInsight[sem]) {
      setLoadingInsight(true);
      const semData = JOURNEY_DATA.find(s => s.sem === sem);
      callAI("Generate a 2-sentence insight for a student about their semester. Return ONLY JSON with field: insight (string).",
        `Semester ${sem}: ${semData.label}, status: ${semData.status}, readiness: ${semData.readiness||"TBD"}`)
        .then(r => { setAiSemInsight(prev => ({ ...prev, [sem]: r.insight||"Keep up the momentum!" })); setLoadingInsight(false); });
    }
  };

  const selected = JOURNEY_DATA.find(s => s.sem === selectedSem);

  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: C.textLight, marginBottom: 4, letterSpacing: "0.07em", textTransform: "uppercase" }}>College Career Map</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem,2.5vw,2rem)", fontWeight: 900, color: C.text }}>4-Year Journey</h1>
        <p style={{ fontSize: 13, color: C.textMid, marginTop: 5 }}>Your complete pathway to placement — 8 semesters, one goal</p>
      </div>
      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "28px 30px", marginBottom: 22, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: 30, right: 30, height: 2, background: `linear-gradient(90deg,${C.green},${C.green} 25%,${C.gold} 25%,${C.gold} 38%,${C.border} 38%)`, transform: "translateY(-50%)", zIndex: 0 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8,1fr)", gap: 8, position: "relative", zIndex: 1 }}>
          {JOURNEY_DATA.map(sem => {
            const isSelected = selectedSem === sem.sem;
            const isDone = sem.status==="completed"; const isActive = sem.status==="active"; const isLocked = sem.status==="locked";
            const color = isDone ? C.green : isActive ? C.gold : C.textLight;
            return (
              <div key={sem.sem} onClick={() => handleSelectSem(sem.sem, sem.status)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: isLocked ? "default" : "pointer", opacity: isLocked ? 0.5 : 1 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: isSelected ? (isDone ? C.green : isActive ? C.gold : C.bgDeep) : isDone ? C.greenBg : isActive ? C.goldBg : C.bgAlt, border: `2px solid ${isSelected ? color : isDone ? C.greenBorder : isActive ? C.goldBorder : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s", boxShadow: isSelected ? `0 4px 16px ${color}40` : "none" }}>
                  {isDone ? <span style={{ color: isSelected ? "white" : C.green, fontSize: 16, fontWeight: 700 }}>✓</span> : isActive ? <span style={{ color: isSelected ? "white" : C.gold, fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 900 }}>{sem.sem}</span> : <span style={{ color: C.textLight, fontSize: 14 }}>🔒</span>}
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color, marginBottom: 2 }}>Sem {sem.sem}</div>
                  <div style={{ fontSize: 9, color: C.textLight, lineHeight: 1.3 }}>{sem.label}</div>
                  {isActive && <div style={{ fontSize: 8, color: C.gold, fontWeight: 700, marginTop: 2 }}>NOW</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: C.white, border: `1px solid ${selected.status==="active" ? C.goldBorder : C.border}`, borderRadius: 20, padding: "24px 26px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: selected.status==="completed" ? C.green : selected.status==="active" ? C.gold : C.textLight, background: selected.status==="completed" ? C.greenBg : selected.status==="active" ? C.goldBg : C.bgAlt, border: `1px solid ${selected.status==="completed" ? C.greenBorder : selected.status==="active" ? C.goldBorder : C.border}`, padding: "2px 10px", borderRadius: 20, fontWeight: 700, textTransform: "uppercase" }}>{selected.status}</span>
                  <span style={{ fontSize: 11, color: C.textLight }}>Semester {selected.sem} of 8</span>
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: C.text, marginBottom: 4 }}>Sem {selected.sem}: {selected.label}</h2>
                <p style={{ fontSize: 13, color: C.textMid }}>{selected.phase}</p>
              </div>
              {selected.readiness !== null && <CircularProgress value={selected.readiness} size={76} stroke={7} color={selected.status==="completed" ? C.green : C.gold} label="readiness" />}
            </div>
            {selected.status !== "locked" && (
              <div style={{ background: C.goldBg, border: `1px solid ${C.goldBorder}`, borderRadius: 12, padding: "12px 16px", marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: C.gold, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>✨ AI Semester Insight</div>
                <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.65 }}>{loadingInsight && !aiSemInsight[selected.sem] ? "Generating…" : aiSemInsight[selected.sem] || "Click a semester to load insight."}</p>
              </div>
            )}
            <div style={{ padding: "14px 16px", background: C.bgAlt, borderRadius: 12, border: `1px solid ${C.border}`, marginBottom: 14 }}>
              <div style={{ fontSize: 10, color: C.textLight, textTransform: "uppercase", marginBottom: 4 }}>Semester Highlight</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{selected.highlight}</div>
            </div>
            {selected.tasks !== null && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
                {[{ label: "Tasks", value: selected.tasks, color: C.gold },{ label: "Avg Confidence", value: `${selected.confidence}/5`, color: C.blue },{ label: "Readiness", value: `${selected.readiness}/100`, color: C.green }].map(s => (
                  <div key={s.label} style={{ padding: "12px 14px", background: C.bgAlt, borderRadius: 12, border: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 10, color: C.textLight, marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 900, color: s.color }}>{s.value}</div>
                  </div>
                ))}
              </div>
            )}
            {selected.status === "locked" && (
              <div style={{ textAlign: "center", padding: "30px", background: C.bgAlt, borderRadius: 16, border: `2px dashed ${C.border}` }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>🔒</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 6 }}>Locked — Complete Previous Semester</div>
                <p style={{ fontSize: 12, color: C.textLight, lineHeight: 1.65 }}>This semester's roadmap will be AI-generated using your real performance data.</p>
              </div>
            )}
          </div>
          {selected.status !== "locked" && (
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "22px 24px" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 16 }}>Sem {selected.sem} — Phase Overview</h3>
              {FULL_ROADMAP.map(phase => (
                <div key={phase.id} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: phase.color, boxShadow: phase.id===2 ? `0 0 8px ${phase.color}` : "none" }} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{phase.phase}: {phase.goal}</span>
                      <span style={{ fontSize: 11, color: C.textLight }}>Wk {phase.weeks}</span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: phase.color }}>{phase.completion}%</span>
                  </div>
                  <div style={{ height: 5, background: C.bgAlt, borderRadius: 5, overflow: "hidden", marginBottom: 8 }}>
                    <div style={{ height: "100%", width: `${phase.completion}%`, background: `linear-gradient(90deg,${phase.color},${phase.color}bb)`, borderRadius: 5 }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
                    {phase.weeks_data.map(wk => (
                      <div key={wk.wk} style={{ padding: "8px 10px", background: wk.current ? C.goldBg : wk.done ? C.greenBg : C.bgAlt, border: `1px solid ${wk.current ? C.goldBorder : wk.done ? C.greenBorder : C.border}`, borderRadius: 8 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: wk.current ? C.gold : wk.done ? C.green : C.textLight, marginBottom: 3 }}>Wk {wk.wk} {wk.current ? "← NOW" : wk.done ? "✓" : ""}</div>
                        <div style={{ fontSize: 10, color: C.textMid }}>{wk.focus}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "20px 22px" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 14 }}>Career Milestone Map</h3>
            {[
              { sem: "1-2", label: "Core Programming",          icon: "💻", done: true,  active: false, desc: "Build foundational CS knowledge" },
              { sem: "3-4", label: "DSA + System Design",       icon: "🧩", done: false, active: true,  desc: "Master problem-solving & architecture" },
              { sem: "5-6", label: "Specialisation + Projects", icon: "🚀", done: false, active: false, desc: "Build real-world engineering skills" },
              { sem: "7-8", label: "Placement Ready",           icon: "🏆", done: false, active: false, desc: "Secure your dream job offer" },
            ].map((m,i) => (
              <div key={i} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: i<3 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ position: "relative" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 12, background: m.done ? C.greenBg : m.active ? C.goldBg : C.bgAlt, border: `2px solid ${m.done ? C.greenBorder : m.active ? C.goldBorder : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{m.icon}</div>
                  {i<3 && <div style={{ position: "absolute", top: 38, left: "50%", width: 2, height: 14, background: m.done ? C.greenBorder : C.border, transform: "translateX(-50%)" }} />}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: m.done ? C.green : m.active ? C.gold : C.textLight, marginBottom: 2 }}>Sem {m.sem}: {m.label}</div>
                  <div style={{ fontSize: 11, color: C.textLight, lineHeight: 1.4 }}>{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "20px 22px" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 14 }}>Logged Wins</h3>
            {milestones.map(m => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: C.bgAlt, borderRadius: 12, border: `1px solid ${C.border}`, marginBottom: 8 }}>
                <span style={{ fontSize: 20 }}>{m.icon}</span>
                <div><div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{m.title}</div><div style={{ fontSize: 10, color: C.textLight }}>{m.type} · Sem {m.sem||3} · {m.date}</div></div>
              </div>
            ))}
            {milestones.length===0 && <div style={{ textAlign: "center", padding: "20px 0", color: C.textLight, fontSize: 12 }}>Log milestones on the Profile page! 🎯</div>}
          </div>
          <div style={{ background: `linear-gradient(135deg,rgba(180,83,9,0.05),rgba(124,58,237,0.05))`, border: `1px solid ${C.goldBorder}`, borderRadius: 20, padding: "18px 20px" }}>
            <div style={{ fontSize: 11, color: C.gold, fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>Predicted Trajectory</div>
            {JOURNEY_DATA.filter(s => s.sem<=4).map(s => (
              <div key={s.sem} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: C.textLight, width: 40 }}>Sem {s.sem}</span>
                <div style={{ flex: 1, height: 6, background: C.bgAlt, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${s.readiness||(s.sem*18)}%`, background: s.status==="completed" ? C.green : s.status==="active" ? C.gold : `linear-gradient(90deg,${C.gold}40,${C.purple}40)`, borderRadius: 3, transition: "width 1s ease" }} />
                </div>
                <span style={{ fontSize: 10, color: s.status==="locked" ? C.textLight : s.status==="active" ? C.gold : C.green, fontWeight: 600, width: 28 }}>{s.readiness||`~${s.sem*18}`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}