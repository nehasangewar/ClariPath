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

// ─── ROADMAP PAGE ─────────────────────────────────────────────────────────────
export default function RoadmapPage({ tasks }) {
  const [selectedPhase, setSelectedPhase] = useState(2);
  const [selectedWeek, setSelectedWeek] = useState(6);
  const [expandedTask, setExpandedTask] = useState(null);
  const [aiExpandData, setAiExpandData] = useState({});
  const [loadingExpand, setLoadingExpand] = useState(null);
  const [viewMode, setViewMode] = useState("semester");
  const phase = FULL_ROADMAP.find(p => p.id === selectedPhase);
  const currentWeekData = FULL_ROADMAP.flatMap(p => p.weeks_data).find(w => w.wk === selectedWeek);

  const handleExpandTask = async (taskKey) => {
    if (expandedTask === taskKey) { setExpandedTask(null); return; }
    setExpandedTask(taskKey);
    if (!aiExpandData[taskKey]) {
      setLoadingExpand(taskKey);
      const taskName = taskKey.split("-").slice(2).join("-");
      const r = await callAI("You are a technical mentor. Return ONLY raw JSON: explanation (string,3-4 sentences), focus_points (array 3 strings), mini_exercise (string), mistake_to_avoid (string).", `Task: "${taskName}". CS student, Sem 3.`);
      setAiExpandData(prev => ({ ...prev, [taskKey]: r }));
      setLoadingExpand(null);
    }
  };

  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 11, color: C.textLight, marginBottom: 4, letterSpacing: "0.07em", textTransform: "uppercase" }}>Semester 3 · 16 Weeks</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem,2.5vw,2rem)", fontWeight: 900, color: C.text }}>Full Roadmap</h1>
        </div>
        <div style={{ display: "flex", gap: 4, background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 3 }}>
          {["semester","phase","week"].map(m => (
            <button key={m} onClick={() => setViewMode(m)}
              style={{ padding: "6px 16px", borderRadius: 9, border: "none", background: viewMode===m ? C.gold : "transparent", color: viewMode===m ? "white" : C.textLight, fontSize: 12, fontWeight: viewMode===m ? 700 : 500, cursor: "pointer", textTransform: "capitalize" }}>
              {m} View
            </button>
          ))}
        </div>
      </div>

      {viewMode==="semester" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 22 }}>
            {FULL_ROADMAP.map(p => (
              <div key={p.id} onClick={() => { setSelectedPhase(p.id); setViewMode("phase"); }}
                style={{ background: C.white, border: `2px solid ${selectedPhase===p.id ? p.color : C.border}`, borderRadius: 18, padding: "18px 20px", cursor: "pointer", transition: "all 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.boxShadow = `0 4px 20px ${p.color}20`; }}
                onMouseLeave={e => { if (selectedPhase!==p.id) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; } }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.color, boxShadow: p.id===2 ? `0 0 8px ${p.color}` : "none" }} />
                  <span style={{ fontSize: 10, color: p.completion===100 ? C.green : p.id===2 ? p.color : C.textLight, fontFamily: "'DM Mono',monospace", fontWeight: 700 }}>{p.completion}%</span>
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 800, color: C.text, marginBottom: 3 }}>{p.phase}</div>
                <div style={{ fontSize: 11, color: C.textLight, marginBottom: 10 }}>{p.goal}</div>
                <div style={{ fontSize: 10, color: C.textLight, marginBottom: 8 }}>Weeks {p.weeks}</div>
                <div style={{ height: 4, background: C.bgAlt, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${p.completion}%`, background: p.completion===100 ? C.green : `linear-gradient(90deg,${p.color},${p.color}bb)`, borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "24px 26px" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 18 }}>All 16 Weeks Overview</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
              {FULL_ROADMAP.flatMap(p => p.weeks_data.map(w => ({ ...w, phaseColor: p.color }))).map(wk => (
                <div key={wk.wk} onClick={() => { setSelectedWeek(wk.wk); setViewMode("week"); }}
                  style={{ padding: "12px 14px", borderRadius: 12, background: wk.current ? C.goldBg : wk.done ? C.greenBg : C.bgAlt, border: `1.5px solid ${wk.current ? C.goldBorder : wk.done ? C.greenBorder : C.border}`, cursor: "pointer", position: "relative", overflow: "hidden", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = wk.phaseColor; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = wk.current ? C.goldBorder : wk.done ? C.greenBorder : C.border; }}>
                  <div style={{ position: "absolute", top: 0, left: 0, width: 3, bottom: 0, background: wk.phaseColor, borderRadius: "0 2px 2px 0" }} />
                  <div style={{ paddingLeft: 6 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: wk.current ? C.gold : wk.done ? C.green : C.textLight }}>W{wk.wk} {wk.current ? "← NOW" : wk.done ? "✓" : ""}</span>
                      <span style={{ fontSize: 9, color: C.textLight }}>{wk.tasks.length}t</span>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: C.text, marginBottom: 2 }}>{wk.focus}</div>
                    <div style={{ fontSize: 9, color: C.textLight }}>{wk.tasks[0]}{wk.tasks.length>1 ? ` +${wk.tasks.length-1}` : ""}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode==="phase" && phase && (
        <div>
          <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
            {FULL_ROADMAP.map(p => (
              <button key={p.id} onClick={() => setSelectedPhase(p.id)}
                style={{ padding: "7px 18px", borderRadius: 10, border: `1.5px solid ${selectedPhase===p.id ? p.color : C.border}`, background: selectedPhase===p.id ? `${p.color}12` : "transparent", color: selectedPhase===p.id ? p.color : C.textLight, fontSize: 12, fontWeight: selectedPhase===p.id ? 700 : 500, cursor: "pointer" }}>
                {p.phase}
              </button>
            ))}
          </div>
          <div style={{ background: C.white, border: `2px solid ${phase.color}`, borderRadius: 20, padding: "24px 26px", marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, color: C.text }}>{phase.phase}: {phase.goal}</h2>
                <p style={{ fontSize: 12, color: C.textLight }}>Weeks {phase.weeks} · {phase.weeks_data.reduce((a,w) => a+w.tasks.length, 0)} tasks</p>
              </div>
              <CircularProgress value={phase.completion} size={70} stroke={7} color={phase.color} label="done" />
            </div>
            <div style={{ height: 6, background: C.bgAlt, borderRadius: 6, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${phase.completion}%`, background: `linear-gradient(90deg,${phase.color},${phase.color}bb)`, borderRadius: 6, transition: "width 1.2s ease" }} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
            {phase.weeks_data.map(wk => (
              <div key={wk.wk} style={{ background: C.white, border: `1.5px solid ${wk.current ? C.goldBorder : wk.done ? C.greenBorder : C.border}`, borderRadius: 18, padding: "18px 20px", position: "relative", overflow: "hidden" }}>
                {wk.current && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${C.gold},transparent)` }} />}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 10, color: wk.current ? C.gold : wk.done ? C.green : C.textLight, fontWeight: 700, marginBottom: 3 }}>WEEK {wk.wk} {wk.current ? "— CURRENT" : wk.done ? "— DONE" : "— UPCOMING"}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 800, color: C.text }}>{wk.focus}</div>
                  </div>
                  {wk.done && <span style={{ color: C.green, fontSize: 20 }}>✓</span>}
                  {wk.current && <span style={{ color: C.gold, fontSize: 18 }}>◎</span>}
                </div>
                {wk.tasks.map((task, ti) => {
                  const taskKey = `${wk.wk}-${ti}-${task}`;
                  const isExpanded = expandedTask === taskKey;
                  const aiData = aiExpandData[taskKey];
                  const isLoading = loadingExpand === taskKey;
                  return (
                    <div key={ti} style={{ marginBottom: 6 }}>
                      <div onClick={() => handleExpandTask(taskKey)}
                        style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: C.bgAlt, borderRadius: 8, cursor: "pointer", border: `1px solid ${isExpanded ? C.goldBorder : C.border}` }}>
                        <div style={{ width: 16, height: 16, borderRadius: "50%", background: wk.done ? C.gold : C.border, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {wk.done && <svg width="7" height="7" viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                        </div>
                        <span style={{ fontSize: 12, color: wk.done ? C.textLight : C.text, flex: 1, textDecoration: wk.done ? "line-through" : "none" }}>{task}</span>
                        <span style={{ fontSize: 11, color: C.textLight }}>{isExpanded ? "↑" : "↓"}</span>
                      </div>
                      {isExpanded && (
                        <div style={{ marginTop: 6, padding: "12px 14px", background: C.blueBg, border: `1px solid ${C.blueBorder}`, borderRadius: 10 }}>
                          {isLoading ? <div style={{ fontSize: 11, color: C.textLight }}>Loading…</div>
                            : aiData ? <>
                                <p style={{ fontSize: 11, color: C.textMid, lineHeight: 1.7, marginBottom: 8 }}>{aiData.explanation || aiData.raw}</p>
                                {aiData.mini_exercise && <div style={{ padding: "7px 10px", background: C.goldBg, borderRadius: 7, border: `1px solid ${C.goldBorder}` }}><span style={{ fontSize: 10, fontWeight: 700, color: C.gold }}>✏️ Try: </span><span style={{ fontSize: 10, color: C.gold }}>{aiData.mini_exercise}</span></div>}
                              </>
                            : <div style={{ fontSize: 11, color: C.textLight }}>Click to load AI explanation</div>
                          }
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode==="week" && currentWeekData && (
        <div>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: "12px 16px", marginBottom: 18, display: "flex", alignItems: "center", gap: 8, overflowX: "auto" }}>
            <span style={{ fontSize: 11, color: C.textLight, flexShrink: 0 }}>Jump to week:</span>
            {Array.from({ length: 16 }, (_, i) => i+1).map(w => {
              const wkData = FULL_ROADMAP.flatMap(p => p.weeks_data).find(wd => wd.wk===w);
              return (
                <button key={w} onClick={() => setSelectedWeek(w)}
                  style={{ width: 32, height: 32, borderRadius: 8, border: `1.5px solid ${selectedWeek===w ? C.gold : wkData?.done ? C.greenBorder : C.border}`, background: selectedWeek===w ? C.gold : wkData?.current ? C.goldBg : wkData?.done ? C.greenBg : "transparent", color: selectedWeek===w ? "white" : wkData?.done ? C.green : C.textMid, fontSize: 11, fontWeight: selectedWeek===w ? 700 : 500, cursor: "pointer", flexShrink: 0 }}>
                  {w}
                </button>
              );
            })}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
            <div>
              <div style={{ background: C.white, border: `2px solid ${currentWeekData.current ? C.goldBorder : currentWeekData.done ? C.greenBorder : C.border}`, borderRadius: 20, padding: "24px 26px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 11, color: currentWeekData.current ? C.gold : currentWeekData.done ? C.green : C.textLight, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>Week {selectedWeek} {currentWeekData.current ? "← CURRENT" : currentWeekData.done ? "← DONE" : "← UPCOMING"}</div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: C.text, marginBottom: 4 }}>{currentWeekData.focus}</h2>
                    <p style={{ fontSize: 12, color: C.textLight }}>{currentWeekData.tasks.length} tasks this week</p>
                  </div>
                  <div style={{ padding: "10px 16px", background: currentWeekData.current ? C.goldBg : currentWeekData.done ? C.greenBg : C.bgAlt, border: `1px solid ${currentWeekData.current ? C.goldBorder : currentWeekData.done ? C.greenBorder : C.border}`, borderRadius: 12, textAlign: "center" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, color: currentWeekData.current ? C.gold : currentWeekData.done ? C.green : C.textLight }}>{selectedWeek}</div>
                    <div style={{ fontSize: 9, color: C.textLight }}>of 16</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {currentWeekData.tasks.map((task, ti) => {
                    const taskKey = `${selectedWeek}-${ti}-${task}`;
                    const isExpanded = expandedTask === taskKey;
                    const aiData = aiExpandData[taskKey];
                    const isLoading = loadingExpand === taskKey;
                    return (
                      <div key={ti} style={{ border: `1.5px solid ${isExpanded ? C.goldBorder : C.border}`, borderRadius: 14, overflow: "hidden", transition: "border-color 0.2s" }}>
                        <div style={{ padding: "14px 16px", background: isExpanded ? "rgba(180,83,9,0.02)" : C.bg, display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 24, height: 24, borderRadius: 7, background: currentWeekData.done ? C.gold : C.border, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            {currentWeekData.done ? <svg width="10" height="10" viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg> : <span style={{ fontSize: 10, color: C.textLight, fontFamily: "'DM Mono',monospace" }}>{ti+1}</span>}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 4 }}>{task}</div>
                            <div style={{ display: "flex", gap: 6 }}>
                              <span style={{ fontSize: 10, color: C.textLight, background: C.bgAlt, padding: "2px 8px", borderRadius: 20 }}>Week {selectedWeek}</span>
                              <span style={{ fontSize: 10, color: C.gold, background: C.goldBg, padding: "2px 8px", borderRadius: 20 }}>DSA</span>
                            </div>
                          </div>
                          <button onClick={() => handleExpandTask(taskKey)}
                            style={{ fontSize: 11, color: C.blue, background: C.blueBg, border: `1px solid ${C.blueBorder}`, borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontWeight: 600, flexShrink: 0 }}>
                            {isExpanded ? "Less ↑" : "Explain ↓"}
                          </button>
                        </div>
                        {isExpanded && (
                          <div style={{ padding: "14px 16px", borderTop: `1px solid ${C.border}`, background: C.white }}>
                            {isLoading ? <div style={{ fontSize: 12, color: C.textLight }}>Loading AI explanation…</div>
                              : aiData ? <>
                                  <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.7, marginBottom: 10 }}>{aiData.explanation || aiData.raw}</p>
                                  {aiData.focus_points && <div style={{ marginBottom: 10 }}><div style={{ fontSize: 10, fontWeight: 700, color: C.blue, marginBottom: 6, textTransform: "uppercase" }}>Focus Points</div>{aiData.focus_points.map((p,pi) => <div key={pi} style={{ fontSize: 11, color: C.textMid, padding: "3px 0 3px 12px", borderLeft: `2px solid ${C.goldBorder}`, marginBottom: 4 }}>{p}</div>)}</div>}
                                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                                    {aiData.mini_exercise && <div style={{ padding: "9px 12px", background: C.goldBg, borderRadius: 8, border: `1px solid ${C.goldBorder}` }}><span style={{ fontSize: 10, fontWeight: 700, color: C.gold }}>✏️ Try: </span><span style={{ fontSize: 10, color: C.gold }}>{aiData.mini_exercise}</span></div>}
                                    {aiData.mistake_to_avoid && <div style={{ padding: "9px 12px", background: C.redBg, borderRadius: 8, border: `1px solid ${C.redBorder}` }}><span style={{ fontSize: 10, fontWeight: 700, color: C.red }}>⚠️ Avoid: </span><span style={{ fontSize: 10, color: C.red }}>{aiData.mistake_to_avoid}</span></div>}
                                  </div>
                                </>
                              : <div style={{ fontSize: 11, color: C.textLight }}>Click Explain to load AI guidance</div>
                            }
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "20px 22px" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 14 }}>Week Context</h3>
                {(() => { const pfw = FULL_ROADMAP.find(p => p.weeks_data.some(w => w.wk===selectedWeek)); return pfw && (
                  <div>
                    <div style={{ padding: "10px 12px", background: `${pfw.color}10`, border: `1px solid ${pfw.color}30`, borderRadius: 10, marginBottom: 10 }}>
                      <div style={{ fontSize: 10, color: pfw.color, fontWeight: 700, marginBottom: 2 }}>{pfw.phase}</div>
                      <div style={{ fontSize: 12, color: C.textMid }}>{pfw.goal}</div>
                    </div>
                    <div style={{ fontSize: 11, color: C.textLight, marginBottom: 12 }}>Phase progress: <strong style={{ color: pfw.color }}>{pfw.completion}%</strong></div>
                    <div style={{ height: 4, background: C.bgAlt, borderRadius: 4, overflow: "hidden" }}><div style={{ height: "100%", width: `${pfw.completion}%`, background: `linear-gradient(90deg,${pfw.color},${pfw.color}bb)`, borderRadius: 4 }} /></div>
                  </div>
                ); })()}
              </div>
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "18px 20px" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 800, color: C.text, marginBottom: 12 }}>Phase Weeks</h3>
                {(() => { const pfw = FULL_ROADMAP.find(p => p.weeks_data.some(w => w.wk===selectedWeek)); return pfw?.weeks_data.map(wk => (
                  <button key={wk.wk} onClick={() => setSelectedWeek(wk.wk)}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: 10, border: `1px solid ${selectedWeek===wk.wk ? C.goldBorder : C.border}`, background: selectedWeek===wk.wk ? C.goldBg : wk.current ? "rgba(180,83,9,0.03)" : "transparent", color: selectedWeek===wk.wk ? C.gold : C.textMid, fontSize: 12, fontWeight: selectedWeek===wk.wk ? 700 : 500, cursor: "pointer", textAlign: "left", marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
                    <span>Week {wk.wk}: {wk.focus}</span>
                    <span>{wk.done ? "✓" : wk.current ? "◎" : ""}</span>
                  </button>
                )); })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}