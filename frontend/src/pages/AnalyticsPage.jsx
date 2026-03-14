import { useState, useEffect } from "react";

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

const diffConfig = {
  EASY:   { label: "Easy",   color: C.green, bg: "rgba(4,120,87,0.1)"   },
  MEDIUM: { label: "Medium", color: C.gold,  bg: "rgba(180,83,9,0.1)"   },
  HARD:   { label: "Hard",   color: C.red,   bg: "rgba(220,38,38,0.1)"  },
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
const STUDENT_STREAK = 12;

const ANALYTICS_SKILLS = [
  { name: "Arrays & Strings",    score: 88, category: "DSA"       },
  { name: "Linked Lists",        score: 75, category: "DSA"       },
  { name: "Trees & Graphs",      score: 52, category: "DSA"       },
  { name: "Recursion",           score: 61, category: "DSA"       },
  { name: "Dynamic Programming", score: 28, category: "DSA"       },
  { name: "System Design",       score: 15, category: "Design"    },
  { name: "SQL & Databases",     score: 72, category: "Backend"   },
  { name: "Java OOP",            score: 84, category: "Languages" },
  { name: "Problem Solving",     score: 68, category: "Core"      },
];

const WEEKLY_HOURS = [4, 8, 10, 7, 12, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const WEEKLY_TASKS = [3, 5, 6, 4, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// ─── SKILL BAR ───────────────────────────────────────────────────────────────
function SkillBar({ name, score, category, delay = 0 }) {
  const catColor = { DSA: C.gold, Design: C.purple, Backend: C.blue, Languages: C.green, Core: C.red }[category] || C.gold;
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 9, color: catColor, background: `${catColor}18`, padding: "2px 7px", borderRadius: 20, fontWeight: 700 }}>{category}</span>
          <span style={{ fontSize: 12, color: C.textMid }}>{name}</span>
        </div>
        <span style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", fontWeight: 700, color: score >= 70 ? C.green : score >= 40 ? C.gold : C.red }}>{score}%</span>
      </div>
      <div style={{ height: 5, background: C.bgAlt, borderRadius: 5, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${score}%`, background: `linear-gradient(90deg,${catColor},${catColor}bb)`, borderRadius: 5, transition: `width 1.2s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms` }} />
      </div>
    </div>
  );
}

// ─── ANALYTICS PAGE ───────────────────────────────────────────────────────────
export default function AnalyticsPage({ tasks, milestones }) {
  const [aiReport, setAiReport] = useState(null);
  const [reportLoading, setReportLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("skills");
  const completedTasks = tasks.filter(t => t.status === "COMPLETED");
  const avgConf = completedTasks.length ? (completedTasks.reduce((a,t) => a+(t.confidence||3), 0)/completedTasks.length).toFixed(1) : "—";
  const totalHours = WEEKLY_HOURS.reduce((a,b) => a+b, 0);
  const maxWeek = Math.max(...WEEKLY_HOURS);
  const heatmapData = Array.from({ length: 12 }, (_, w) => Array.from({ length: 7 }, (_, d) => { const base = (w<6 && d<5) ? Math.random() : 0; return base > 0.3 ? Math.floor(base*4)+1 : 0; }));

  useEffect(() => {
    const lowConf = tasks.filter(t => t.status==="COMPLETED" && t.confidence<=2).map(t=>t.title);
    callAI("Generate a performance analysis report. Return ONLY JSON with fields: summary (string, 2 sentences), top_strength (string), biggest_gap (string), next_action (string), predicted_readiness_end_of_semester (number 0-100).",
      `Week 6 Sem 3. ${completedTasks.length}/${tasks.length} tasks. Avg confidence: ${avgConf}. Total hours: ${totalHours}h. Low confidence: ${lowConf.join(", ")||"none"}.`)
      .then(r => { setAiReport(r); setReportLoading(false); });
  }, []);

  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: C.textLight, marginBottom: 4, letterSpacing: "0.07em", textTransform: "uppercase" }}>Performance Insights</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem,2.5vw,2rem)", fontWeight: 900, color: C.text }}>Analytics Dashboard</h1>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, marginBottom: 22 }}>
        {[
          { label: "Tasks Completed", value: completedTasks.length, total: `/${tasks.length}`, color: C.gold },
          { label: "Avg Confidence",  value: avgConf, total: "/5",  color: C.green  },
          { label: "Total Hours",     value: `${totalHours}h`, total: "this sem", color: C.blue },
          { label: "Streak",          value: `${STUDENT_STREAK}d`, total: "active", color: C.red },
          { label: "Milestones",      value: milestones.length, total: "logged", color: C.purple },
        ].map((s,i) => (
          <div key={i} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px 18px", animation: `fadeUp ${0.2+i*0.06}s ease` }}>
            <div style={{ fontSize: 10, color: C.textLight, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 10, color: C.textLight }}>{s.total}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "linear-gradient(135deg,rgba(180,83,9,0.05),rgba(251,191,36,0.08))", border: `1.5px solid ${C.goldBorder}`, borderRadius: 18, padding: "20px 24px", marginBottom: 22 }}>
        <div style={{ fontSize: 11, color: C.gold, fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>✨ AI Performance Analysis · Week 6</div>
        {reportLoading ? <div style={{ fontSize: 13, color: C.textLight }}>Generating analysis…</div> : aiReport && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14 }}>
            <div style={{ gridColumn: "1/3", fontSize: 13, color: C.textMid, lineHeight: 1.7 }}>{aiReport.summary || aiReport.raw}</div>
            {[{ label: "Top Strength", value: aiReport.top_strength, color: C.green, bg: C.greenBg, border: C.greenBorder },{ label: "Biggest Gap", value: aiReport.biggest_gap, color: C.red, bg: C.redBg, border: C.redBorder }].map(item => (
              <div key={item.label} style={{ padding: "12px 14px", background: item.bg, border: `1px solid ${item.border}`, borderRadius: 12 }}>
                <div style={{ fontSize: 10, color: item.color, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.5 }}>{item.value}</div>
              </div>
            ))}
            {aiReport.next_action && (
              <div style={{ gridColumn: "1/4", padding: "10px 14px", background: C.blueBg, border: `1px solid ${C.blueBorder}`, borderRadius: 12, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 16 }}>🎯</span>
                <div><div style={{ fontSize: 10, color: C.blue, fontWeight: 700, marginBottom: 2 }}>NEXT ACTION</div><div style={{ fontSize: 12, color: C.textMid }}>{aiReport.next_action}</div></div>
              </div>
            )}
            {aiReport.predicted_readiness_end_of_semester && (
              <div style={{ padding: "12px 14px", background: C.purpleBg, border: `1px solid ${C.purpleBorder}`, borderRadius: 12, textAlign: "center" }}>
                <div style={{ fontSize: 10, color: C.purple, fontWeight: 700, marginBottom: 4 }}>PREDICTED</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: C.purple }}>{aiReport.predicted_readiness_end_of_semester}</div>
                <div style={{ fontSize: 10, color: C.textLight }}>by sem end</div>
              </div>
            )}
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 18, background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: 4, width: "fit-content" }}>
        {["skills","hours","confidence","heatmap"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{ padding: "7px 18px", borderRadius: 10, border: "none", background: activeTab===tab ? C.gold : "transparent", color: activeTab===tab ? "white" : C.textLight, fontSize: 12, fontWeight: activeTab===tab ? 700 : 500, cursor: "pointer", textTransform: "capitalize", transition: "all 0.18s" }}>
            {tab}
          </button>
        ))}
      </div>
      {activeTab==="skills" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "24px 26px" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 20 }}>Skill Proficiency Map</h3>
            {ANALYTICS_SKILLS.map((skill,i) => <SkillBar key={skill.name} {...skill} delay={i*60} />)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "24px 26px" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 16 }}>Task Completion</h3>
              {tasks.map(t => {
                const diff = diffConfig[t.difficulty];
                return (
                  <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: t.status==="COMPLETED" ? C.gold : C.border, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {t.status==="COMPLETED" && <svg width="8" height="8" viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </div>
                    <span style={{ fontSize: 12, color: t.status==="COMPLETED" ? C.textLight : C.text, flex: 1, textDecoration: t.status==="COMPLETED" ? "line-through" : "none" }}>{t.title}</span>
                    <span style={{ fontSize: 10, color: diff.color, background: diff.bg, padding: "2px 7px", borderRadius: 20 }}>{diff.label}</span>
                    {t.status==="COMPLETED" && t.confidence && <div style={{ display: "flex", gap: 1 }}>{[1,2,3,4,5].map(s => <span key={s} style={{ fontSize: 10, color: s<=t.confidence ? C.gold : C.border }}>★</span>)}</div>}
                  </div>
                );
              })}
            </div>
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "20px 24px" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 14 }}>Category Scores</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[{ cat: "DSA", score: 61, color: C.gold },{ cat: "Languages", score: 84, color: C.green },{ cat: "Backend", score: 72, color: C.blue },{ cat: "Design", score: 15, color: C.purple }].map(c => (
                  <div key={c.cat} style={{ padding: "12px 14px", background: C.bgAlt, borderRadius: 12, border: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 11, color: C.textLight, marginBottom: 4 }}>{c.cat}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: c.color }}>{c.score}%</div>
                    <div style={{ height: 3, background: C.border, borderRadius: 3, overflow: "hidden", marginTop: 6 }}><div style={{ height: "100%", width: `${c.score}%`, background: c.color, borderRadius: 3 }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab==="hours" && (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "24px 26px" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 4 }}>Weekly Hours Invested</h3>
            <p style={{ fontSize: 11, color: C.textLight, marginBottom: 20 }}>Total: {totalHours}h · {WEEKLY_HOURS.filter(h=>h>0).length} active weeks</p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 120, marginBottom: 10 }}>
              {WEEKLY_HOURS.map((h,i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  {h>0 && <span style={{ fontSize: 9, color: i===5 ? C.gold : C.textLight, fontWeight: i===5 ? 700 : 400 }}>{h}h</span>}
                  <div style={{ width: "100%", borderRadius: "4px 4px 0 0", height: h>0 ? `${(h/maxWeek)*90}px` : 4, background: i===5 ? `linear-gradient(to top,${C.gold},${C.goldLight})` : h>0 ? "rgba(180,83,9,0.25)" : C.bgAlt, transition: `height 0.8s cubic-bezier(0.34,1.56,0.64,1) ${i*40}ms`, boxShadow: i===5 ? `0 -2px 8px rgba(180,83,9,0.3)` : "none" }} />
                  <span style={{ fontSize: 9, color: i===5 ? C.gold : C.textLight, fontWeight: i===5 ? 700 : 400 }}>W{i+1}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 16 }}>
              {[{ label: "Best Week", value: `${Math.max(...WEEKLY_HOURS)}h`, sub: "Week 5", color: C.gold },{ label: "Weekly Avg", value: `${(totalHours/Math.max(WEEKLY_HOURS.filter(h=>h>0).length,1)).toFixed(1)}h`, sub: "active weeks", color: C.blue },{ label: "vs Target", value: `+${WEEKLY_HOURS[5]-8}h`, sub: "this week", color: C.green }].map(s => (
                <div key={s.label} style={{ padding: "12px 14px", background: C.bgAlt, borderRadius: 12, border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 10, color: C.textLight, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 900, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: C.textLight }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "20px 22px" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 14 }}>Tasks Per Week</h3>
              {WEEKLY_TASKS.slice(0,6).map((t,i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 10, color: C.textLight, width: 20 }}>W{i+1}</span>
                  <div style={{ flex: 1, height: 8, background: C.bgAlt, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(t/Math.max(...WEEKLY_TASKS))*100}%`, background: i===5 ? `linear-gradient(90deg,${C.gold},${C.goldLight})` : "rgba(180,83,9,0.3)", borderRadius: 4, transition: `width 0.8s ease ${i*60}ms` }} />
                  </div>
                  <span style={{ fontSize: 10, color: i===5 ? C.gold : C.textLight, fontWeight: i===5 ? 700 : 400, width: 14 }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ background: C.goldBg, border: `1px solid ${C.goldBorder}`, borderRadius: 20, padding: "20px 22px" }}>
              <div style={{ fontSize: 11, color: C.gold, fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>Pace Insight</div>
              <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.7 }}>At your current pace of <strong style={{ color: C.gold }}>{WEEKLY_HOURS[5]}h/week</strong>, you're on track to complete the semester with <strong style={{ color: C.gold }}>~14 hours</strong> to spare.</p>
            </div>
          </div>
        </div>
      )}
      {activeTab==="confidence" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "24px 26px" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 20 }}>Confidence Ratings</h3>
            {completedTasks.map(t => (
              <div key={t.id} style={{ padding: "14px 16px", background: C.bgAlt, borderRadius: 14, border: `1px solid ${C.border}`, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{t.title}</span>
                  <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(s => <span key={s} style={{ fontSize: 14, color: s<=(t.confidence||3) ? C.gold : C.border }}>★</span>)}</div>
                </div>
                <div style={{ height: 6, background: C.border, borderRadius: 6, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${((t.confidence||3)/5)*100}%`, background: t.confidence>=4 ? C.green : t.confidence>=3 ? C.gold : C.red, borderRadius: 6 }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <span style={{ fontSize: 10, color: C.textLight }}>Confidence: {t.confidence}/5</span>
                  {t.confidence<=2 && <span style={{ fontSize: 10, color: C.purple, fontWeight: 600 }}>📚 Reinforcement available</span>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "22px 24px" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 16 }}>Confidence Distribution</h3>
              {[1,2,3,4,5].map(rating => {
                const count = completedTasks.filter(t => t.confidence===rating).length;
                const pct = completedTasks.length ? (count/completedTasks.length)*100 : 0;
                const color = rating>=4 ? C.green : rating>=3 ? C.gold : C.red;
                return (
                  <div key={rating} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{ display: "flex", gap: 1, width: 60 }}>{[1,2,3,4,5].map(s => <span key={s} style={{ fontSize: 10, color: s<=rating ? color : C.border }}>★</span>)}</div>
                    <div style={{ flex: 1, height: 10, background: C.bgAlt, borderRadius: 5, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 5 }} />
                    </div>
                    <span style={{ fontSize: 11, color: C.textLight, width: 20 }}>{count}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "22px 24px" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 14 }}>Confidence vs Difficulty</h3>
              {[{ label: "Easy tasks avg", value: "4.8 ★", color: C.green },{ label: "Medium tasks avg", value: "3.2 ★", color: C.gold },{ label: "Hard tasks avg", value: "—", color: C.red }].map((r,i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i<2 ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ fontSize: 12, color: C.textLight }}>{r.label}</span>
                  <span style={{ fontSize: 12, color: r.color, fontWeight: 700 }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {activeTab==="heatmap" && (
        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "24px 26px" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 4 }}>Activity Heatmap</h3>
          <p style={{ fontSize: 11, color: C.textLight, marginBottom: 20 }}>Daily study activity for the past 12 weeks · Darker = more active</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: 4 }}>
            {heatmapData.map((week,wi) => (
              <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {week.map((day,di) => (
                  <div key={di} title={`Week ${wi+1}, Day ${di+1}: ${day>0 ? day+'h' : 'No activity'}`}
                    style={{ width: "100%", aspectRatio: "1", borderRadius: 3, background: day===0 ? C.bgAlt : day===1 ? "rgba(180,83,9,0.2)" : day===2 ? "rgba(180,83,9,0.45)" : day===3 ? "rgba(180,83,9,0.65)" : C.gold, transition: "transform 0.15s", cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.transform="scale(1.3)"}
                    onMouseLeave={e => e.currentTarget.style.transform="scale(1)"} />
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 14 }}>
            <span style={{ fontSize: 10, color: C.textLight }}>Less</span>
            {[0,1,2,3,4].map(l => <div key={l} style={{ width: 12, height: 12, borderRadius: 2, background: l===0 ? C.bgAlt : l===1 ? "rgba(180,83,9,0.2)" : l===2 ? "rgba(180,83,9,0.45)" : l===3 ? "rgba(180,83,9,0.65)" : C.gold }} />)}
            <span style={{ fontSize: 10, color: C.textLight }}>More</span>
          </div>
        </div>
      )}
    </div>
  );
}