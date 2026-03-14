import { useState, useEffect } from "react";

// ─── THEME ────────────────────────────────────────────────────────────────────
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
  const token = localStorage.getItem('token')
  const res = await fetch("http://localhost:8080/api/ai/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ systemPrompt, userMessage }),
  })
  const data = await res.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ""
  try {
    return JSON.parse(text.replace(/```json|```/g, "").trim())
  } catch {
    return { raw: text }
  }
}

// ─── DEFAULT STUDENT DATA (override via props in real app) ────────────────────
const DEFAULT_STUDENT = {
  name: "Aryan Mehta",
  goal: "Software Engineer",
  branch: "CSE",
  semester: 3,
  hoursPerWeek: 12,
  streak: 12,
  email: "aryan.mehta@college.edu",
  college: "VIT Vellore",
  bio: "Passionate about backend systems and competitive programming.",
  github: "aryanmehta",
  linkedin: "aryan-mehta-dev",
  leetcode: "aryan_codes",
  trueLevel: "INTERMEDIATE",
  startPoint: "Binary Trees",
  skippedTopics: ["Basic Arrays", "Sorting Algorithms", "String Manipulation", "Java OOP Basics"],
  trackStatus: "On Track",
};

const DEFAULT_MILESTONES = [
  { id: "m1", title: "Completed DSA Sheet (150 problems)", type: "Achievement", date: "Week 4", icon: "⚡", sem: 3 },
  { id: "m2", title: "Built REST API project with Spring Boot", type: "Project", date: "Week 5", icon: "🛠️", sem: 3 },
  { id: "m3", title: "Java SE 17 Certification", type: "Certification", date: "Week 3", icon: "🏆", sem: 3 },
];

const MILESTONE_ICONS = {
  Project: "🛠️", Certification: "🏆", Achievement: "⚡", Internship: "💼", Hackathon: "🎯",
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────
function Toast({ message, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 9999,
      background: C.gold, color: "white", padding: "12px 20px", borderRadius: 14,
      fontSize: 13, fontWeight: 700, boxShadow: "0 6px 24px rgba(180,83,9,0.35)",
      animation: "slideUp 0.3s ease",
    }}>
      {message}
    </div>
  );
}

function StatMini({ value, label, color }) {
  return (
    <div style={{ padding: "10px 8px", background: C.bgAlt, borderRadius: 12, border: `1px solid ${C.border}`, textAlign: "center" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 900, color }}>{value}</div>
      <div style={{ fontSize: 9, color: C.textLight, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
    </div>
  );
}

function EditableField({ label, field, form, setForm, editing, type = "text" }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: C.textLight, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{label}</div>
      {editing
        ? <input type={type} value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
            style={{ width: "100%", padding: "8px 12px", border: `1.5px solid ${C.goldBorder}`, borderRadius: 10, background: C.goldBg, fontSize: 13, color: C.text, outline: "none", fontFamily: "'DM Sans',sans-serif", boxSizing: "border-box" }} />
        : <div style={{ fontSize: 13, fontWeight: 600, color: C.text, padding: "8px 12px", background: C.bgAlt, borderRadius: 10, border: `1px solid ${C.border}` }}>{form[field]}</div>
      }
    </div>
  );
}

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────
// Props (all optional — works standalone with default data):
//   student         — student object from parent
//   milestones      — milestones array from parent
//   setMilestones   — setter from parent
//   hoursPerWeek    — controlled hours from parent
//   setHoursPerWeek — setter from parent
//   showToast       — toast function from parent
export default function ProfilePage({
  student: studentProp,
  milestones: milestonesProp,
  setMilestones: setMilestonesProp,
  hoursPerWeek: hoursProp,
  setHoursPerWeek: setHoursProp,
  showToast: showToastProp,
}) {
  const isStandalone = !studentProp;
  const student = studentProp ?? DEFAULT_STUDENT;

  // Local state for standalone mode
  const [milestonesLocal, setMilestonesLocal] = useState(DEFAULT_MILESTONES);
  const [toastLocal, setToastLocal] = useState(null);

  // Resolve to props or local state
  const milestones = milestonesProp ?? milestonesLocal;
  const setMilestones = setMilestonesProp ?? setMilestonesLocal;
  const showToast = showToastProp ?? ((msg) => setToastLocal(msg));

  // Form state
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...student, hoursPerWeek: hoursProp ?? student.hoursPerWeek });

  // AI Summary
  const [aiSummary, setAiSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(true);

  useEffect(() => {
    callAI(
      "Generate a short 2-sentence motivational profile summary for an engineering student. Return ONLY JSON with one field: summary (string). Be specific to their details and encouraging.",
      `Name: ${student.name}, Goal: ${student.goal}, Semester: ${student.semester}, Streak: ${student.streak} days, Milestones: ${milestones.length}, Level: ${student.trueLevel}`
    ).then(r => {
      setAiSummary(r.summary || "An ambitious engineer building a clear trajectory toward software excellence.");
      setSummaryLoading(false);
    }).catch(() => {
      setAiSummary("A driven engineer shaping a purposeful path toward their career goal.");
      setSummaryLoading(false);
    });
  }, []);

  const handleSave = () => {
    if (setHoursProp) setHoursProp(form.hoursPerWeek);
    setEditing(false);
    showToast("Profile updated! ✓");
  };

  // Milestone form
  const [addMilestone, setAddMilestone] = useState(false);
  const [mForm, setMForm] = useState({ title: "", type: "Project" });

  const handleAddMilestone = () => {
    if (!mForm.title.trim()) return;
    setMilestones(prev => [...prev, {
      id: `m${Date.now()}`,
      title: mForm.title,
      type: mForm.type,
      date: `Week ${Math.floor(Math.random() * 8) + 1}`,
      icon: MILESTONE_ICONS[mForm.type] || "⭐",
      sem: student.semester,
    }]);
    setMForm({ title: "", type: "Project" });
    setAddMilestone(false);
    showToast("Milestone logged! Readiness score updated. 🎯");
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp  { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse   { 0%,100%{opacity:0.3} 50%{opacity:1} }
        input:focus, textarea:focus { border-color: ${C.gold} !important; box-shadow: 0 0 0 3px rgba(180,83,9,0.12); }
        input[type=range] { accent-color: ${C.gold}; }
        ${isStandalone ? `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap'); * { box-sizing:border-box; margin:0; padding:0; } body { background:${C.bg}; font-family:'DM Sans',sans-serif; }` : ""}
      `}</style>

      {toastLocal && <Toast message={toastLocal} onDone={() => setToastLocal(null)} />}

      <div style={{ animation: "fadeUp 0.4s ease", padding: isStandalone ? "32px 40px" : 0, minHeight: isStandalone ? "100vh" : undefined, background: isStandalone ? C.bg : undefined }}>

        {/* Page Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, color: C.textLight, marginBottom: 4, letterSpacing: "0.07em", textTransform: "uppercase" }}>Your Account</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem,2.5vw,2rem)", fontWeight: 900, color: C.text }}>Student Profile</h1>
        </div>

        {/* Two-Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 20, alignItems: "start" }}>

          {/* ── LEFT ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Avatar + Summary Card */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "28px 24px", textAlign: "center" }}>
              <div style={{ width: 80, height: 80, borderRadius: 22, background: `linear-gradient(135deg,${C.gold},${C.goldLight})`, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: "white", boxShadow: "0 8px 24px rgba(180,83,9,0.3)" }}>
                {student.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, color: C.text, marginBottom: 4 }}>{student.name}</div>
              <div style={{ fontSize: 13, color: C.gold, fontWeight: 600, marginBottom: 2 }}>{student.goal}</div>
              <div style={{ fontSize: 12, color: C.textLight, marginBottom: 18 }}>{student.college} · {student.branch}</div>

              {/* AI Summary */}
              <div style={{ background: C.goldBg, border: `1px solid ${C.goldBorder}`, borderRadius: 14, padding: "14px 16px", marginBottom: 18, textAlign: "left" }}>
                <div style={{ fontSize: 10, color: C.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>✨ AI Profile Summary</div>
                {summaryLoading
                  ? <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "4px 0" }}>
                      {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold, animation: `pulse 1.2s ${i * 0.2}s infinite` }} />)}
                      <span style={{ fontSize: 12, color: C.textLight, marginLeft: 4 }}>Generating…</span>
                    </div>
                  : <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.7, fontStyle: "italic" }}>{aiSummary}</p>
                }
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                <StatMini value={`${student.streak}d`} label="Streak" color={C.red} />
                <StatMini value={`Sem ${student.semester}`} label="Current" color={C.blue} />
                <StatMini value={milestones.length} label="Wins" color={C.green} />
              </div>
            </div>

            {/* Social & Coding Profiles */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "20px 24px" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 16 }}>Social & Coding Profiles</h3>
              {[
                { icon: "🐙", label: "GitHub",   field: "github",   color: "#171717", prefix: "github.com/" },
                { icon: "💼", label: "LinkedIn", field: "linkedin", color: "#0077B5", prefix: "linkedin.com/in/" },
                { icon: "⚡", label: "LeetCode", field: "leetcode", color: "#FFA116", prefix: "leetcode.com/" },
              ].map(link => (
                <div key={link.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 20 }}>{link.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, color: C.textLight }}>{link.label}</div>
                    {editing
                      ? <input value={form[link.field]} onChange={e => setForm(f => ({ ...f, [link.field]: e.target.value }))}
                          style={{ fontSize: 13, fontWeight: 600, color: link.color, border: `1px solid ${C.goldBorder}`, borderRadius: 6, padding: "3px 8px", background: C.goldBg, outline: "none", fontFamily: "'DM Sans',sans-serif", width: "100%" }} />
                      : <a href={`https://${link.prefix}${form[link.field]}`} target="_blank" rel="noreferrer"
                          style={{ fontSize: 13, fontWeight: 600, color: link.color, textDecoration: "none" }}>
                          @{form[link.field]}
                        </a>
                    }
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ── RIGHT ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Account Details */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "24px 26px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 800, color: C.text }}>Account Details</h2>
                <button onClick={() => editing ? handleSave() : setEditing(true)}
                  style={{ fontSize: 12, fontWeight: 700, cursor: "pointer", color: editing ? C.white : C.gold, background: editing ? `linear-gradient(135deg,${C.gold},${C.goldLight})` : C.goldBg, border: `1px solid ${C.goldBorder}`, borderRadius: 10, padding: "7px 18px", transition: "all 0.2s" }}>
                  {editing ? "Save Changes ✓" : "Edit Profile"}
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  { label: "Full Name",        field: "name" },
                  { label: "Email Address",    field: "email" },
                  { label: "College",          field: "college" },
                  { label: "Branch",           field: "branch" },
                  { label: "Career Goal",      field: "goal" },
                  { label: "Current Semester", field: "semester", type: "number" },
                ].map(item => (
                  <EditableField key={item.field} label={item.label} field={item.field} form={form} setForm={setForm} editing={editing} type={item.type} />
                ))}
              </div>

              {/* Hours Slider */}
              <div style={{ marginTop: 18 }}>
                <div style={{ fontSize: 11, color: C.textLight, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Weekly Study Hours</div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 18px", background: C.bgAlt, borderRadius: 12, border: `1px solid ${C.border}` }}>
                  <input type="range" min={2} max={30} value={form.hoursPerWeek}
                    onChange={e => setForm(f => ({ ...f, hoursPerWeek: Number(e.target.value) }))}
                    disabled={!editing}
                    style={{ flex: 1, opacity: editing ? 1 : 0.6, cursor: editing ? "pointer" : "default" }} />
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: C.gold, minWidth: 54 }}>{form.hoursPerWeek}h</span>
                </div>
              </div>

              {/* Bio */}
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 11, color: C.textLight, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Bio</div>
                {editing
                  ? <textarea value={form.bio || ""} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={2}
                      style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${C.goldBorder}`, borderRadius: 10, background: C.goldBg, fontSize: 13, color: C.text, outline: "none", resize: "vertical", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }} />
                  : <div style={{ fontSize: 13, color: C.textMid, padding: "10px 12px", background: C.bgAlt, borderRadius: 10, border: `1px solid ${C.border}`, lineHeight: 1.7 }}>{form.bio || "No bio added yet."}</div>
                }
              </div>
            </div>

            {/* Level Assessment */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "22px 24px" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 16 }}>Level Assessment</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
                {[
                  { label: "True Level",   value: student.trueLevel ? student.trueLevel.charAt(0) + student.trueLevel.slice(1).toLowerCase() : "—", color: C.gold,  bg: C.goldBg,  border: C.goldBorder },
                  { label: "Start Point",  value: student.startPoint || "—", color: C.blue,  bg: C.blueBg,  border: C.blueBorder },
                  { label: "Track Status", value: student.trackStatus || "—", color: C.green, bg: C.greenBg, border: C.greenBorder },
                ].map(item => (
                  <div key={item.label} style={{ padding: "14px 16px", background: item.bg, border: `1px solid ${item.border}`, borderRadius: 14 }}>
                    <div style={{ fontSize: 10, color: item.color, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{item.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: item.color, fontFamily: "'Playfair Display', serif" }}>{item.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "14px 16px", background: C.bgAlt, borderRadius: 12, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.textMid, marginBottom: 8 }}>Topics Skipped (Already Mastered)</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {(student.skippedTopics || []).length > 0
                    ? student.skippedTopics.map(t => (
                        <span key={t} style={{ fontSize: 11, color: C.green, background: C.greenBg, border: `1px solid ${C.greenBorder}`, padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>✓ {t}</span>
                      ))
                    : <span style={{ fontSize: 12, color: C.textLight }}>No topics skipped — starting from the beginning.</span>
                  }
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "22px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 800, color: C.text }}>Achievements & Milestones</h3>
                <button onClick={() => setAddMilestone(v => !v)}
                  style={{ fontSize: 12, fontWeight: 700, cursor: "pointer", color: addMilestone ? C.textMid : C.white, background: addMilestone ? C.bgAlt : `linear-gradient(135deg,${C.gold},${C.goldLight})`, border: addMilestone ? `1px solid ${C.border}` : "none", borderRadius: 10, padding: "6px 14px" }}>
                  {addMilestone ? "Cancel" : "+ Log Win"}
                </button>
              </div>

              {addMilestone && (
                <div style={{ marginBottom: 16, padding: "16px 18px", background: C.goldBg, border: `1px solid ${C.goldBorder}`, borderRadius: 14, animation: "fadeUp 0.3s ease" }}>
                  <div style={{ fontSize: 11, color: C.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Log a new win</div>
                  <input value={mForm.title} onChange={e => setMForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="e.g. Built a full-stack project, secured internship…"
                    style={{ width: "100%", padding: "9px 12px", border: `1.5px solid ${C.goldBorder}`, borderRadius: 10, background: C.white, fontSize: 13, color: C.text, outline: "none", marginBottom: 10, fontFamily: "'DM Sans',sans-serif" }} />
                  <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
                    {Object.entries(MILESTONE_ICONS).map(([t, icon]) => (
                      <button key={t} onClick={() => setMForm(f => ({ ...f, type: t }))}
                        style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, cursor: "pointer", fontWeight: 600, border: `1.5px solid ${mForm.type === t ? C.gold : C.goldBorder}`, background: mForm.type === t ? C.gold : "transparent", color: mForm.type === t ? "white" : C.gold, transition: "all 0.15s" }}>
                        {icon} {t}
                      </button>
                    ))}
                  </div>
                  <button onClick={handleAddMilestone}
                    style={{ width: "100%", padding: "9px", borderRadius: 10, background: mForm.title.trim() ? `linear-gradient(135deg,${C.gold},${C.goldLight})` : C.bgDeep, color: mForm.title.trim() ? "white" : C.textLight, border: "none", cursor: mForm.title.trim() ? "pointer" : "default", fontWeight: 700, fontSize: 13 }}>
                    Save Milestone
                  </button>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {milestones.map(m => (
                  <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: C.bgAlt, borderRadius: 12, border: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: 22 }}>{m.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{m.title}</div>
                      <div style={{ fontSize: 11, color: C.textLight, marginTop: 2 }}>{m.type} · {m.date} · Sem {m.sem}</div>
                    </div>
                    <span style={{ fontSize: 10, color: C.green, background: C.greenBg, padding: "3px 9px", borderRadius: 20, border: `1px solid ${C.greenBorder}`, fontWeight: 700, whiteSpace: "nowrap" }}>+8 pts</span>
                  </div>
                ))}
                {milestones.length === 0 && (
                  <div style={{ textAlign: "center", padding: "28px 0", color: C.textLight, fontSize: 13 }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>🎯</div>
                    No milestones yet — log your first win!
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}