import { useState, useEffect, useCallback } from "react";
import ProfilePage from "./ProfilePage"; // ← separate file for easy editing

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

const diffConfig = {
  EASY:   { label: "Easy",   color: C.green, bg: "rgba(4,120,87,0.1)"   },
  MEDIUM: { label: "Medium", color: C.gold,  bg: "rgba(180,83,9,0.1)"   },
  HARD:   { label: "Hard",   color: C.red,   bg: "rgba(220,38,38,0.1)"  },
};

// ─── AI HELPER ────────────────────────────────────────────────────────────────
async function callAI(systemPrompt, userMessage) {

  const token = localStorage.getItem("token")

  const res = await fetch("http://localhost:8080/api/ai/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      systemPrompt,
      userMessage
    })
  })

  const data = await res.json()

  try {
    return typeof data === "string" ? JSON.parse(data) : data
  } catch {
    return { raw: data }
  }
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STUDENT = {
  name: "Kabir Ubale", goal: "Software Engineer", branch: "CSE",
  semester: 1, hoursPerWeek: 12, streak: 1, email: "Kabirubale0358@gmail.com",
  college: "BNCOE Pusad", bio: "Passionate about backend systems and competitive programming.",
  github: "kabirubale29", linkedin: "Kabir Ubale", leetcode: "kabir-ubale",
  trueLevel: "BEGINNER", startPoint: "Programming Basics",
};

const INIT_TASKS = [
  { id: "t1", title: "Variables & Data Types", desc: "Learn integers, strings, booleans and how variables store values in memory.", resource: "CS50 Week 1", resourceUrl: "https://cs50.harvard.edu/x/2024/weeks/1/", hours: 2, difficulty: "EASY", status: "PENDING", tags: ["Programming","Basics"], expand: null, simplify: null, reinforce: null },

  { id: "t2", title: "Control Flow (If / Else)", desc: "Understand conditional logic and decision making in programs using if, else if, and else.", resource: "freeCodeCamp – JS Basics", resourceUrl: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/#basic-javascript", hours: 2, difficulty: "EASY", status: "PENDING", tags: ["Logic","Programming"], expand: null, simplify: null, reinforce: null },

  { id: "t3", title: "Loops Practice", desc: "Practice for-loops and while-loops with basic exercises to automate repetitive tasks.", resource: "W3Schools – Java Loops", resourceUrl: "https://www.w3schools.com/java/java_while_loop.asp", hours: 2, difficulty: "EASY", status: "PENDING", tags: ["Loops"], expand: null, simplify: null, reinforce: null },

  { id: "t4", title: "Functions & Reusable Code", desc: "Learn how to write reusable functions with parameters and return values to avoid repetition.", resource: "CS50 – Functions", resourceUrl: "https://cs50.harvard.edu/x/2024/weeks/3/", hours: 2, difficulty: "EASY", status: "PENDING", tags: ["Functions"], expand: null, simplify: null, reinforce: null },

  { id: "t5", title: "Arrays Basics", desc: "Understand array storage, traversal and simple operations like insertion and search.", resource: "NeetCode – Arrays", resourceUrl: "https://neetcode.io/roadmap", hours: 3, difficulty: "MEDIUM", status: "PENDING", tags: ["Arrays"], expand: null, simplify: null, reinforce: null },

  { id: "t6", title: "String Manipulation", desc: "Practice string operations like reverse, palindrome and substring problems on LeetCode.", resource: "LeetCode – Easy Strings", resourceUrl: "https://leetcode.com/tag/string/", hours: 2, difficulty: "MEDIUM", status: "PENDING", tags: ["Strings"], expand: null, simplify: null, reinforce: null },
];

const INIT_MILESTONES = [];

// ─── SEMESTER 1 PHASES (16 weeks, 4 phases of 4 weeks each) ──────────────────
const INIT_PHASES = [
  { id: 1, goal: "Programming Foundations", completion: 0, weeks: "1–4", color: C.green },
  { id: 2, goal: "Core Data Structures",    completion: 0, weeks: "5–8", color: C.gold },
  { id: 3, goal: "Problem Solving Patterns",completion: 0, weeks: "9–12", color: C.purple },
  { id: 4, goal: "Mini Projects & Review",  completion: 0, weeks: "13–16", color: C.blue },
];

const INIT_JOURNEY = [
  { sem: 1, label: "Programming Foundations", status: "active" },
  { sem: 2, label: "Data Structures",         status: "locked" },
  { sem: 3, label: "Advanced Algorithms",     status: "locked" },
  { sem: 4, label: "Backend Development",     status: "locked" },
  { sem: 5, label: "System Design",           status: "locked" },
  { sem: 6, label: "Full Stack Projects",     status: "locked" },
  { sem: 7, label: "Internship Prep",         status: "locked" },
  { sem: 8, label: "Placement Ready",         status: "locked" },
];

// ─── FULL 16-WEEK SEMESTER 1 ROADMAP ─────────────────────────────────────────
// Phase 1 (Wk 1–4): Programming Foundations
// Phase 2 (Wk 5–8): Core Data Structures
// Phase 3 (Wk 9–12): Problem Solving Patterns
// Phase 4 (Wk 13–16): Mini Projects & Review
const FULL_ROADMAP = [
  {
    id: 1, phase: "Phase 1", goal: "Programming Foundations", weeks: "1–4", color: C.green, completion: 0,
    weeks_data: [
      {
        wk: 1, focus: "Basics & Setup", done: false, current: true,
        tasks: [
          "Install VS Code & Java/Python setup",
          "Variables, data types & type casting",
          "Input / output basics (Scanner / input())",
        ],
      },
      {
        wk: 2, focus: "Control Flow", done: false,
        tasks: [
          "If / else if / else logic",
          "Switch / match statements",
          "Nested conditions & practice problems",
        ],
      },
      {
        wk: 3, focus: "Loops", done: false,
        tasks: [
          "For loop – counting & iteration",
          "While & do-while loops",
          "Break, continue & loop problems (5 exercises)",
        ],
      },
      {
        wk: 4, focus: "Functions & Scope", done: false,
        tasks: [
          "Defining & calling functions",
          "Parameters, return values & scope",
          "Recursion intro – factorial & Fibonacci",
        ],
      },
    ],
  },

  {
    id: 2, phase: "Phase 2", goal: "Core Data Structures", weeks: "5–8", color: C.gold, completion: 0,
    weeks_data: [
      {
        wk: 5, focus: "Arrays", done: false,
        tasks: [
          "1-D arrays – declaration & traversal",
          "Array insertion, deletion, search",
          "2-D arrays & matrix basics",
        ],
      },
      {
        wk: 6, focus: "Strings", done: false,
        tasks: [
          "String methods & immutability",
          "Reverse a string, palindrome check",
          "Substring search & anagram problem",
        ],
      },
      {
        wk: 7, focus: "Linked Lists", done: false,
        tasks: [
          "Singly linked list – node structure",
          "Traversal, insertion & deletion",
          "Reverse a linked list (iterative)",
        ],
      },
      {
        wk: 8, focus: "Stacks & Queues", done: false,
        tasks: [
          "Stack using array – push / pop",
          "Queue using array – enqueue / dequeue",
          "Valid parentheses problem (LeetCode #20)",
        ],
      },
    ],
  },

  {
    id: 3, phase: "Phase 3", goal: "Problem Solving Patterns", weeks: "9–12", color: C.purple, completion: 0,
    weeks_data: [
      {
        wk: 9, focus: "Two Pointer Technique", done: false,
        tasks: [
          "Two-pointer concept & when to use it",
          "Pair sum in sorted array",
          "3 LeetCode easy problems using two pointers",
        ],
      },
      {
        wk: 10, focus: "Sliding Window", done: false,
        tasks: [
          "Fixed window – max sum subarray of size k",
          "Variable window – longest substring without repeat",
          "3 LeetCode easy sliding-window problems",
        ],
      },
      {
        wk: 11, focus: "Binary Search", done: false,
        tasks: [
          "Binary search on sorted array",
          "Search insert position (LeetCode #35)",
          "First & last occurrence of element",
        ],
      },
      {
        wk: 12, focus: "Recursion Deep Dive", done: false,
        tasks: [
          "Call stack visualisation exercise",
          "Power of a number using recursion",
          "Sum of digits & count down problems",
        ],
      },
    ],
  },

  {
    id: 4, phase: "Phase 4", goal: "Mini Projects & Review", weeks: "13–16", color: C.blue, completion: 0,
    weeks_data: [
      {
        wk: 13, focus: "Mini Project – CLI Todo App", done: false,
        tasks: [
          "Design data model (array of task objects)",
          "Add, list, complete & delete task features",
          "Run & demo the CLI app end-to-end",
        ],
      },
      {
        wk: 14, focus: "Mini Project – Number Games", done: false,
        tasks: [
          "Build a number-guessing game with loops",
          "Add score tracking & replay option",
          "Push project to GitHub with README",
        ],
      },
      {
        wk: 15, focus: "Revision & Weak-Area Practice", done: false,
        tasks: [
          "Re-solve 5 problems from phases 1–3",
          "Identify & drill weakest topic for 2 h",
          "Complete a mock 45-min coding test",
        ],
      },
      {
        wk: 16, focus: "Semester Wrap-Up", done: false,
        tasks: [
          "Solve 3 mixed LeetCode easy problems",
          "Write a self-reflection on progress",
          "Set goals & reading list for Semester 2",
        ],
      },
    ],
  },
];

// ─── JOURNEY DATA (8 semesters – only Sem 1 is active) ───────────────────────
const JOURNEY_DATA = [
  { sem: 1, label: "Programming Foundations", status: "active", phase: "Sem 1 – Week 1 of 16", readiness: 0,    tasks: 6,    confidence: 0,    highlight: "Just Started — Week 1 of 16" },
  { sem: 2, label: "Data Structures",         status: "locked", phase: "Core DS",              readiness: null, tasks: null, confidence: null, highlight: "Unlock after Sem 1" },
  { sem: 3, label: "Algorithms",              status: "locked", phase: "Problem Solving",       readiness: null, tasks: null, confidence: null, highlight: "Unlock after Sem 2" },
  { sem: 4, label: "Backend Development",     status: "locked", phase: "Engineering",           readiness: null, tasks: null, confidence: null, highlight: "Unlock after Sem 3" },
  { sem: 5, label: "System Design",           status: "locked", phase: "Architecture",          readiness: null, tasks: null, confidence: null, highlight: "Unlock after Sem 4" },
  { sem: 6, label: "Projects",                status: "locked", phase: "Real Builds",           readiness: null, tasks: null, confidence: null, highlight: "Unlock after Sem 5" },
  { sem: 7, label: "Internship Prep",         status: "locked", phase: "Industry Prep",         readiness: null, tasks: null, confidence: null, highlight: "Unlock after Sem 6" },
  { sem: 8, label: "Placement Ready",         status: "locked", phase: "Final Prep",            readiness: null, tasks: null, confidence: null, highlight: "Unlock after Sem 7" },
];

const ANALYTICS_SKILLS = [
  { name: "Programming Basics", score: 45, category: "Core" },
  { name: "Arrays",             score: 30, category: "DSA"  },
  { name: "Strings",            score: 25, category: "DSA"  },
  { name: "Linked Lists",       score: 10, category: "DSA"  },
  { name: "Recursion",          score: 5,  category: "DSA"  },
  { name: "Problem Solving",    score: 20, category: "Core" },
];

const WEEKLY_HOURS = [2,3,4,3,0,0,0,0,0,0,0,0,0,0,0,0];
const WEEKLY_TASKS = [2,3,4,3,0,0,0,0,0,0,0,0,0,0,0,0];

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

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

function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3500); return () => clearTimeout(t); }, [onDone]);
  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, background: C.green, color: "white", padding: "12px 20px", borderRadius: 12, fontSize: 13, fontWeight: 600, zIndex: 9999, boxShadow: "0 8px 24px rgba(4,120,87,0.35)", animation: "fadeUp 0.3s ease" }}>
      ✓ {msg}
    </div>
  );
}

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

// ─── TASK CARD ────────────────────────────────────────────────────────────────
function TaskCard({ task, onComplete, onUpdateTask }) {
  const [ratingMode, setRatingMode] = useState(false);
  const [expandLoading, setExpandLoading] = useState(false);
  const [simplifyLoading, setSimplifyLoading] = useState(false);
  const [showExpand, setShowExpand] = useState(false);
  const [showSimplify, setShowSimplify] = useState(false);
  const [hovered, setHovered] = useState(false);
  const diff = diffConfig[task.difficulty];
  const done = task.status === "COMPLETED";

  const handleLearnMore = async () => {
    if (task.expand) { setShowExpand(v => !v); return; }
    setExpandLoading(true);
    try {
      const result = await callAI(
        `You are a technical mentor for an Indian engineering student in Semester 1 (absolute beginner). Return ONLY raw JSON with exactly these fields:
        explanation (string, 3–4 sentences, very beginner-friendly and practical, use simple real-life analogies),
        focus_points (array of exactly 3 strings, each a clear actionable tip),
        mini_exercise (string, one small concrete task a beginner can do in 10 minutes with a code example hint),
        mistake_to_avoid (string, one common beginner mistake with a brief why),
        extra_resources (array of exactly 3 objects each with fields: name (string) and url (string), covering free beginner-friendly resources like YouTube videos, documentation, or interactive platforms).`,
        `Task: "${task.title}". Description: "${task.desc}". Career goal: Software Engineer. Level: Complete Beginner (Sem 1). Give varied resources — e.g. one video, one interactive site, one article/docs.`
      );
      const safe = (result && (result.explanation || result.focus_points)) ? result : {
        explanation: `${task.title} is a foundational concept every programmer must master. Think of it like learning the alphabet before writing sentences — once you understand this, everything else in coding becomes much easier. Take your time, practise with small examples, and don't rush.`,
        focus_points: ["Understand the basic syntax with one tiny example first", "Try writing code by hand — don't just read", "Re-read the concept if confused — that's completely normal!"],
        mini_exercise: `Open your code editor, write a 5-line program using ${task.title.toLowerCase()}, run it and see the output. Hint: start with the simplest possible version.`,
        mistake_to_avoid: `Don't try to memorise everything at once — focus on understanding one small concept with a working example before moving on.`,
        extra_resources: [
          { name: "CS50 – Free Harvard Programming Course", url: "https://cs50.harvard.edu/x/2024/weeks/1/" },
          { name: "freeCodeCamp – Interactive Coding Lessons", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/#basic-javascript" },
          { name: "W3Schools – Beginner-friendly Reference", url: "https://www.w3schools.com/java/" }
        ]
      };
      onUpdateTask(task.id, { expand: safe });
    } catch (e) {
      onUpdateTask(task.id, { expand: {
        explanation: `${task.title} is a foundational concept every programmer must master. Take your time with it — use the resources below to build a solid understanding.`,
        focus_points: ["Start with the simplest example you can find", "Practice writing code, not just reading it", "Review before moving on to the next concept"],
        mini_exercise: `Write a small program that demonstrates ${task.title.toLowerCase()} and run it to see the output.`,
        mistake_to_avoid: "Don't skip this concept — it forms the base for everything ahead.",
        extra_resources: [
          { name: "CS50 Week 1 – Free Harvard Course", url: "https://cs50.harvard.edu/x/2024/weeks/1/" },
          { name: "freeCodeCamp – Learn to Code Free", url: "https://www.freecodecamp.org" },
          { name: "W3Schools – Beginner Reference", url: "https://www.w3schools.com" }
        ]
      }});
    }
    setExpandLoading(false);
    setShowExpand(true);
  };

  const handleTooHard = async () => {
    if (task.simplify) { setShowSimplify(v => !v); return; }
    setSimplifyLoading(true);
    try {
      const result = await callAI(
        `You are a patient tutor for an absolute beginner who is struggling. Return ONLY raw JSON with exactly these fields:
        diagnosis (string, why this is hard for a beginner, 1–2 sentences, be empathetic),
        simplified_task (string, a much easier baby-step version that removes complexity — focus on just one tiny part),
        step_by_step (array of exactly 3 strings, each a mini step the student can take right now, very concrete and doable in under 5 minutes each),
        entry_point (string, exactly the first sentence or line of code to write — be extremely specific),
        alternative_resource (string, name and full URL to the best free beginner video or interactive resource for this exact topic),
        extra_resources (array of exactly 2 objects each with fields: name (string) and url (string), additional beginner-friendly free resources).`,
        `Task: "${task.title}". Description: "${task.desc}". Student level: BEGINNER (Semester 1, may be coding for the very first time). Make it as simple as humanly possible.`
      );
      const safe = (result && (result.diagnosis || result.simplified_task)) ? result : {
        diagnosis: `${task.title} can feel overwhelming at first because it introduces new vocabulary and logic patterns you haven't seen before. This is completely normal — every programmer struggled here at the beginning.`,
        simplified_task: `Forget the full task for now. Just try writing 3 lines of code that show the most basic version of ${task.title.toLowerCase()}. Don't worry about doing it perfectly.`,
        step_by_step: [
          `Step 1: Open your code editor and create a new file called 'practice.java' (or .py/.js)`,
          `Step 2: Write just ONE line that uses ${task.title.toLowerCase()} — look at a single example online and copy-type it (don't paste)`,
          `Step 3: Run it, see what happens, then change one small thing and run again`
        ],
        entry_point: `Start by writing: just one print statement or variable declaration. That's it. Don't write more than 3 lines on your first try.`,
        alternative_resource: `CS50 Week 1 – Harvard's Free Beginner Course — https://cs50.harvard.edu/x/2024/weeks/1/`,
        extra_resources: [
          { name: "freeCodeCamp – Interactive Beginner Lessons (Free)", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/#basic-javascript" },
          { name: "W3Schools – Simple Examples with Try-It Editor", url: "https://www.w3schools.com/java/java_variables.asp" }
        ]
      };
      onUpdateTask(task.id, { simplify: safe });
    } catch (e) {
      onUpdateTask(task.id, { simplify: {
        diagnosis: "This topic is tricky for beginners — you're not alone in finding it hard. Let's break it into the smallest possible steps.",
        simplified_task: `Break it down: focus on just one small part of ${task.title.toLowerCase()} first. Ignore everything else for now.`,
        step_by_step: [
          "Step 1: Open your editor and create a new empty file",
          `Step 2: Write just one line using ${task.title.toLowerCase()} — copy from the linked resource`,
          "Step 3: Run it and see the output. That's today's goal."
        ],
        entry_point: "Write just one line of code. That's all. Don't overthink it.",
        alternative_resource: `CS50 Week 1 — https://cs50.harvard.edu/x/2024/weeks/1/`,
        extra_resources: [
          { name: "freeCodeCamp – Free Interactive Lessons", url: "https://www.freecodecamp.org" },
          { name: "W3Schools – Beginner-Friendly Reference", url: "https://www.w3schools.com" }
        ]
      }});
    }
    setSimplifyLoading(false);
    setShowSimplify(true);
  };

  const handleComplete = (conf) => {
    onComplete(task.id, conf);
    setRatingMode(false);
    if (conf <= 2) {
      callAI(
        `You are a supportive tutor for a Sem 1 beginner. Return ONLY raw JSON with exactly these fields:
        reflection_questions (array of exactly 3 strings that test basic understanding),
        alternative_explanation (string, explain the concept very simply as if to a 10-year-old),
        mini_exercise (string, one very small concrete exercise, doable in 10 minutes by a beginner).`,
        `Task just completed with low confidence: "${task.title}". Concept: "${task.desc}". Student is in Semester 1.`
      ).then(result => {
        const safe = (result && result.reflection_questions) ? result : {
          reflection_questions: [
            `Can you explain what ${task.title} means in your own words?`,
            `Can you give one real-life example of ${task.title.toLowerCase()}?`,
            `What part of ${task.title.toLowerCase()} confused you the most?`
          ],
          alternative_explanation: `Think of ${task.title.toLowerCase()} like a labelled box — you put something inside it and give it a name so you can find it later.`,
          mini_exercise: `Open a blank file and try writing just 3 lines using what you learned about ${task.title.toLowerCase()}.`
        };
        onUpdateTask(task.id, { reinforce: safe, status: "COMPLETED", confidence: conf });
      }).catch(() => {
        onUpdateTask(task.id, { reinforce: {
          reflection_questions: [
            `What is the main idea behind ${task.title}?`,
            `Can you write one example from memory?`,
            `What would you Google if you got stuck on this?`
          ],
          alternative_explanation: `${task.title} is simpler than it looks — try re-reading the description slowly once more.`,
          mini_exercise: `Write the simplest possible program using ${task.title.toLowerCase()} and run it.`
        }, status: "COMPLETED", confidence: conf });
      });
    }
  };

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: done ? "rgba(180,83,9,0.03)" : C.white, border: `1.5px solid ${done ? C.goldBorder : hovered ? C.goldBorder : C.border}`, borderRadius: 18, padding: "20px 22px", position: "relative", overflow: "hidden", transition: "all 0.25s", boxShadow: hovered && !done ? "0 6px 28px rgba(180,83,9,0.1)" : "0 2px 8px rgba(0,0,0,0.04)" }}>
      {done && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />}
      <div style={{ display: "flex", gap: 14 }}>
        <div onClick={() => !done && setRatingMode(true)}
          style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, marginTop: 2, border: `2px solid ${done ? C.gold : C.border}`, background: done ? C.gold : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: done ? "default" : "pointer", transition: "all 0.2s" }}>
          {done && <svg width="10" height="10" viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
            <div>
              <span style={{ fontSize: 14, fontWeight: 700, color: done ? C.textLight : C.text, textDecoration: done ? "line-through" : "none" }}>{task.title}</span>
              <div style={{ display: "flex", gap: 5, marginTop: 5, flexWrap: "wrap" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: diff.color, background: diff.bg, padding: "2px 8px", borderRadius: 20 }}>{diff.label}</span>
                {task.tags.map(t => <span key={t} style={{ fontSize: 10, color: C.textLight, background: C.bgAlt, padding: "2px 7px", borderRadius: 20, border: `1px solid ${C.border}` }}>{t}</span>)}
                {done && task.confidence <= 2 && <span style={{ fontSize: 10, color: C.purple, background: C.purpleBg, padding: "2px 8px", borderRadius: 20 }}>📚 Reinforcement available</span>}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <span style={{ fontSize: 11, color: C.textLight }}>⏱ {task.hours}h</span>
              {done && task.confidence && <div style={{ display: "flex", gap: 1 }}>{[1,2,3,4,5].map(s => <span key={s} style={{ fontSize: 11, color: s <= task.confidence ? C.gold : C.border }}>★</span>)}</div>}
            </div>
          </div>
          <p style={{ fontSize: 12, color: C.textLight, lineHeight: 1.65, marginBottom: 10 }}>{task.desc}</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <a href={task.resourceUrl} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: C.gold, textDecoration: "none", fontWeight: 600 }}>↗ {task.resource}</a>
            {!done && (
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={handleLearnMore} disabled={expandLoading}
                  style={{ fontSize: 11, color: C.blue, background: C.blueBg, border: `1px solid ${C.blueBorder}`, borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontWeight: 600, opacity: expandLoading ? 0.7 : 1 }}>
                  {expandLoading ? "Loading…" : showExpand ? "Less ↑" : "Learn More ↓"}
                </button>
                <button onClick={handleTooHard} disabled={simplifyLoading}
                  style={{ fontSize: 11, color: C.gold, background: C.goldBg, border: `1px solid ${C.goldBorder}`, borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontWeight: 600, opacity: simplifyLoading ? 0.7 : 1 }}>
                  {simplifyLoading ? "Loading…" : showSimplify ? "Original" : "Too Hard?"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showExpand && task.expand && (
        <div style={{ marginTop: 14, padding: "14px 16px", background: C.blueBg, border: `1px solid ${C.blueBorder}`, borderRadius: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.blue, marginBottom: 8, textTransform: "uppercase" }}>Deep Dive</div>
          <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.7, marginBottom: 10 }}>{task.expand.explanation || task.expand.raw}</p>
          {task.expand.focus_points && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.blue, marginBottom: 4 }}>Key Focus Points</div>
              {task.expand.focus_points.map((p, i) => <div key={i} style={{ fontSize: 12, color: C.textMid, padding: "3px 0 3px 12px", borderLeft: `2px solid ${C.goldBorder}`, marginBottom: 4 }}>{p}</div>)}
            </div>
          )}
          {task.expand.mini_exercise && <div style={{ padding: "10px 12px", background: C.goldBg, borderRadius: 8, border: `1px solid ${C.goldBorder}`, marginBottom: 8 }}><span style={{ fontSize: 11, fontWeight: 700, color: C.gold }}>✏️ Mini Exercise: </span><span style={{ fontSize: 11, color: C.gold }}>{task.expand.mini_exercise}</span></div>}
          {task.expand.mistake_to_avoid && <div style={{ padding: "8px 12px", background: C.redBg, borderRadius: 8, border: `1px solid ${C.redBorder}`, marginBottom: 8 }}><span style={{ fontSize: 11, fontWeight: 700, color: C.red }}>⚠️ Avoid: </span><span style={{ fontSize: 11, color: C.red }}>{task.expand.mistake_to_avoid}</span></div>}
          {task.expand.extra_resources && task.expand.extra_resources.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.blue, marginBottom: 6 }}>📚 More Resources</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {task.expand.extra_resources.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noreferrer"
                    style={{ fontSize: 11, color: C.gold, textDecoration: "none", fontWeight: 600, padding: "6px 10px", background: C.goldBg, borderRadius: 7, border: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", gap: 6 }}>
                    <span>↗</span> {r.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {showSimplify && task.simplify && (
        <div style={{ marginTop: 14, background: C.goldBg, border: `1px solid ${C.goldBorder}`, borderRadius: 12, padding: "14px 16px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, marginBottom: 8, textTransform: "uppercase" }}>Simplified Version</div>
          {task.simplify.diagnosis && <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.65, marginBottom: 8 }}><strong>Why it's hard:</strong> {task.simplify.diagnosis}</p>}
          {task.simplify.simplified_task && <p style={{ fontSize: 12, color: C.gold, lineHeight: 1.65, marginBottom: 8 }}><strong>Easier path:</strong> {task.simplify.simplified_task}</p>}
          {task.simplify.step_by_step && task.simplify.step_by_step.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, marginBottom: 6 }}>🪜 Step-by-Step</div>
              {task.simplify.step_by_step.map((s, i) => (
                <div key={i} style={{ fontSize: 12, color: C.textMid, padding: "5px 0 5px 12px", borderLeft: `2px solid ${C.goldBorder}`, marginBottom: 5, lineHeight: 1.5 }}>{s}</div>
              ))}
            </div>
          )}
          {task.simplify.entry_point && <div style={{ padding: "8px 12px", background: "rgba(180,83,9,0.08)", borderRadius: 8, border: `1px solid ${C.goldBorder}`, marginBottom: 8 }}><span style={{ fontSize: 11, fontWeight: 700, color: C.gold }}>🎯 Start Here: </span><span style={{ fontSize: 11, color: C.textMid }}>{task.simplify.entry_point}</span></div>}
          {task.simplify.alternative_resource && (
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, marginBottom: 5 }}>📖 Best Resource</div>
              <p style={{ fontSize: 11, color: C.gold, fontWeight: 600 }}>{task.simplify.alternative_resource}</p>
            </div>
          )}
          {task.simplify.extra_resources && task.simplify.extra_resources.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, marginBottom: 6 }}>🔗 More Help</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {task.simplify.extra_resources.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noreferrer"
                    style={{ fontSize: 11, color: C.gold, textDecoration: "none", fontWeight: 600, padding: "6px 10px", background: "rgba(180,83,9,0.08)", borderRadius: 7, border: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", gap: 6 }}>
                    <span>↗</span> {r.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {done && task.confidence <= 2 && task.reinforce && (
        <div style={{ marginTop: 14, background: C.purpleBg, border: `1px solid ${C.purpleBorder}`, borderRadius: 12, padding: "14px 16px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.purple, marginBottom: 8, textTransform: "uppercase" }}>📚 Reinforcement — Review These</div>
          {task.reinforce.reflection_questions && task.reinforce.reflection_questions.map((q, i) => <div key={i} style={{ fontSize: 12, color: C.textMid, padding: "4px 0 4px 12px", borderLeft: `2px solid ${C.purpleBorder}`, marginBottom: 4 }}>Q{i+1}: {q}</div>)}
          {task.reinforce.mini_exercise && <div style={{ marginTop: 8, padding: "8px 12px", background: C.purpleBg, borderRadius: 8 }}><span style={{ fontSize: 11, fontWeight: 700, color: C.purple }}>🎯 Quick Exercise: </span><span style={{ fontSize: 11, color: C.purple }}>{task.reinforce.mini_exercise}</span></div>}
        </div>
      )}
      {ratingMode && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(245,240,232,0.97)", borderRadius: 18, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, zIndex: 10 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 800, color: C.text }}>How confident do you feel?</div>
          <div style={{ fontSize: 12, color: C.textLight, marginTop: -8 }}>1 = unsure · 5 = fully got it</div>
          <div style={{ display: "flex", gap: 10 }}>
            {[1,2,3,4,5].map(n => (
              <button key={n} onClick={() => handleComplete(n)}
                style={{ width: 42, height: 42, borderRadius: 12, border: `1.5px solid ${C.goldBorder}`, background: C.goldBg, color: C.gold, fontSize: 16, fontWeight: 900, cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.goldBg; e.currentTarget.style.color = C.gold; }}>
                {n}
              </button>
            ))}
          </div>
          <button onClick={() => setRatingMode(false)} style={{ fontSize: 11, color: C.textLight, background: "none", border: "none", cursor: "pointer" }}>Cancel</button>
        </div>
      )}
    </div>
  );
}

// ─── MILESTONE PANEL ──────────────────────────────────────────────────────────
function MilestonePanel({ milestones, onAdd }) {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: "", type: "Project" });
  const typeIcons = { Project: "🛠️", Certification: "🏆", Internship: "💼", Hackathon: "⚡", Achievement: "🎯" };
  const handleSave = () => {
    if (!form.title.trim()) return;
    onAdd({ ...form, icon: typeIcons[form.type] || "⭐", date: "Week 1" });
    setAdding(false);
    setForm({ title: "", type: "Project" });
  };
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, color: C.textLight, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 2 }}>Milestones</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 800, color: C.text }}>Your Achievements</div>
        </div>
        <button onClick={() => setAdding(!adding)}
          style={{ fontSize: 12, color: C.white, background: `linear-gradient(135deg,${C.gold},${C.goldLight})`, border: "none", borderRadius: 10, padding: "7px 14px", cursor: "pointer", fontWeight: 700, boxShadow: "0 4px 12px rgba(180,83,9,0.25)" }}>
          {adding ? "Cancel" : "+ Log"}
        </button>
      </div>
      {adding && (
        <div style={{ marginBottom: 14, padding: "14px 16px", background: C.goldBg, border: `1px solid ${C.goldBorder}`, borderRadius: 14 }}>
          <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Wrote my first program"
            style={{ width: "100%", padding: "8px 12px", border: `1px solid ${C.goldBorder}`, borderRadius: 8, background: C.white, fontSize: 13, color: C.text, marginBottom: 8, outline: "none", fontFamily: "'DM Sans',sans-serif" }} />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {["Project","Certification","Internship","Hackathon","Achievement"].map(t => (
              <button key={t} onClick={() => setForm(f => ({ ...f, type: t }))}
                style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, border: `1px solid ${form.type===t ? C.gold : C.goldBorder}`, background: form.type===t ? C.gold : "transparent", color: form.type===t ? "white" : C.gold, cursor: "pointer", fontWeight: 600 }}>
                {t}
              </button>
            ))}
          </div>
          <button onClick={handleSave} style={{ width: "100%", padding: "8px", borderRadius: 8, background: C.gold, color: "white", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>Save Milestone</button>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {milestones.map((m, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: C.bgAlt, borderRadius: 12, border: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 20 }}>{m.icon}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{m.title}</div>
              <div style={{ fontSize: 11, color: C.textLight }}>{m.type} · {m.date}</div>
            </div>
          </div>
        ))}
        {milestones.length === 0 && <div style={{ textAlign: "center", padding: "20px 0", color: C.textLight, fontSize: 12 }}>No milestones yet — log your first win! 🎯</div>}
      </div>
    </div>
  );
}

function WeeklyChart({ data, currentWeek }) {
  const max = Math.max(...data.filter(h => h > 0), 1);
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: C.textLight, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 2 }}>Analytics</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 800, color: C.text }}>Hours Invested</div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 64 }}>
        {data.map((h, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "100%", borderRadius: "4px 4px 0 0", height: h > 0 ? `${(h/max)*56}px` : 4, background: i === currentWeek-1 ? `linear-gradient(to top,${C.gold},${C.goldLight})` : h > 0 ? "rgba(180,83,9,0.25)" : C.bgAlt, transition: "height 0.6s ease", boxShadow: i === currentWeek-1 ? `0 -2px 8px rgba(180,83,9,0.3)` : "none" }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ fontSize: 10, color: C.textLight }}>Wk 1</span>
        <span style={{ fontSize: 10, color: C.gold, fontWeight: 600 }}>Wk {currentWeek} ←</span>
        <span style={{ fontSize: 10, color: C.textLight }}>Wk 16</span>
      </div>
    </div>
  );
}

// ─── MODALS ───────────────────────────────────────────────────────────────────

function CheckinModal({ onSubmit, onClose }) {
  const [reason, setReason] = useState(null);
  const [hours, setHours] = useState(8);
  const [loading, setLoading] = useState(false);
  const reasons = [
    { id: "exams",  label: "Busy with exams",    icon: "📚" },
    { id: "hard",   label: "Found it too hard",   icon: "😓" },
    { id: "forgot", label: "Forgot / got busy",   icon: "😅" },
    { id: "other",  label: "Other reason",         icon: "💭" },
  ];
  const handleSubmit = async () => {
    if (!reason) return;
    setLoading(true);
    await onSubmit({ reason, hours });
    setLoading(false);
  };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(28,25,23,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: C.white, borderRadius: 24, padding: "32px 36px", maxWidth: 440, width: "100%", boxShadow: "0 24px 80px rgba(0,0,0,0.25)", border: `1px solid ${C.goldBorder}` }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: C.text, marginBottom: 6 }}>We noticed you missed last week</div>
        <p style={{ fontSize: 13, color: C.textLight, marginBottom: 24, lineHeight: 1.6 }}>No worries — let's recalibrate your plan so you can get back on track.</p>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.textMid, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>What happened?</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
          {reasons.map(r => (
            <button key={r.id} onClick={() => setReason(r.id)}
              style={{ padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${reason===r.id ? C.gold : C.border}`, background: reason===r.id ? C.goldBg : C.bg, cursor: "pointer", textAlign: "left", transition: "all 0.18s" }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{r.icon}</div>
              <div style={{ fontSize: 12, color: reason===r.id ? C.gold : C.textMid, fontWeight: reason===r.id ? 700 : 500 }}>{r.label}</div>
            </button>
          ))}
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.textMid, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Hours you can commit this week</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input type="range" min={2} max={20} value={hours} onChange={e => setHours(Number(e.target.value))} style={{ flex: 1, accentColor: C.gold }} />
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, color: C.gold, minWidth: 48 }}>{hours}h</span>
          </div>
        </div>
        <button onClick={handleSubmit} disabled={!reason || loading}
          style={{ width: "100%", padding: "13px", borderRadius: 14, background: reason ? `linear-gradient(135deg,${C.gold},${C.goldLight})` : C.bgAlt, color: reason ? "white" : C.textLight, border: "none", cursor: reason ? "pointer" : "default", fontSize: 14, fontWeight: 700, boxShadow: reason ? "0 6px 20px rgba(180,83,9,0.3)" : "none", transition: "all 0.2s" }}>
          {loading ? "Updating your plan…" : "Update My Plan →"}
        </button>
        <button onClick={onClose} style={{ width: "100%", marginTop: 10, padding: "8px", background: "none", border: "none", cursor: "pointer", fontSize: 12, color: C.textLight }}>Dismiss for now</button>
      </div>
    </div>
  );
}

function AdaptationModal({ logs, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(28,25,23,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: C.white, borderRadius: 24, padding: "28px 32px", maxWidth: 480, width: "100%", boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, color: C.text, marginBottom: 4 }}>⚡ Adaptation Engine</div>
        <p style={{ fontSize: 12, color: C.textLight, marginBottom: 20 }}>Background pattern detection running every Sunday + every login.</p>
        {logs.length === 0
          ? <div style={{ textAlign: "center", padding: "20px 0", color: C.textLight, fontSize: 13 }}>No patterns detected yet. Keep going! 💪</div>
          : logs.map((log, i) => (
            <div key={i} style={{ padding: "12px 14px", borderRadius: 12, background: C.bgAlt, border: `1px solid ${C.border}`, marginBottom: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{log.pattern}</div>
              <div style={{ fontSize: 11, color: C.textLight, marginTop: 2 }}>{log.action} · {log.date}</div>
            </div>
          ))
        }
        <button onClick={onClose} style={{ marginTop: 12, width: "100%", padding: "10px", borderRadius: 10, background: C.bgAlt, border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 13, color: C.textMid, fontWeight: 600 }}>Close</button>
      </div>
    </div>
  );
}

function HoursModal({ current, onSave, onClose }) {
  const [val, setVal] = useState(current);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(28,25,23,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: C.white, borderRadius: 24, padding: "28px 32px", maxWidth: 360, width: "100%", boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, color: C.text, marginBottom: 16 }}>Update Weekly Hours</div>
        <p style={{ fontSize: 12, color: C.textLight, marginBottom: 20 }}>This affects how your roadmap tasks are paced.</p>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <input type="range" min={2} max={30} value={val} onChange={e => setVal(Number(e.target.value))} style={{ flex: 1, accentColor: C.gold }} />
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 900, color: C.gold, minWidth: 60 }}>{val}h</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "10px", borderRadius: 12, background: C.bgAlt, border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 13, color: C.textMid, fontWeight: 600 }}>Cancel</button>
          <button onClick={() => { onSave(val); onClose(); }} style={{ flex: 1, padding: "10px", borderRadius: 12, background: `linear-gradient(135deg,${C.gold},${C.goldLight})`, border: "none", cursor: "pointer", fontSize: 13, color: "white", fontWeight: 700, boxShadow: "0 4px 14px rgba(180,83,9,0.3)" }}>Save</button>
        </div>
      </div>
    </div>
  );
}

function RoadmapModal({ phases, tasks, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(28,25,23,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ background: C.white, borderRadius: 24, padding: "28px 32px", maxWidth: 560, width: "100%", maxHeight: "80vh", overflowY: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, color: C.text }}>Semester 1 — Full 16-Week Roadmap</div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: C.textLight }}>×</button>
        </div>
        {phases.map(phase => (
          <div key={phase.id} style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: phase.color }} />
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 800, color: C.text }}>Phase {phase.id}: {phase.goal}</div>
              <span style={{ fontSize: 11, color: C.textLight }}>Wk {phase.weeks}</span>
              <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, color: phase.color }}>{phase.completion}%</span>
            </div>
            <div style={{ height: 4, background: C.bgAlt, borderRadius: 4, overflow: "hidden", marginBottom: 12 }}>
              <div style={{ height: "100%", width: `${phase.completion}%`, background: phase.color, borderRadius: 4 }} />
            </div>
            {phase.id === 1 && tasks.map(t => (
              <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: C.bgAlt, borderRadius: 10, border: `1px solid ${C.border}`, marginBottom: 5 }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: t.status==="COMPLETED" ? C.gold : C.border, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {t.status==="COMPLETED" && <svg width="8" height="8" viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </div>
                <span style={{ fontSize: 12, color: t.status==="COMPLETED" ? C.textLight : C.text, textDecoration: t.status==="COMPLETED" ? "line-through" : "none" }}>{t.title}</span>
                <span style={{ marginLeft: "auto", fontSize: 10, color: diffConfig[t.difficulty].color, background: diffConfig[t.difficulty].bg, padding: "1px 7px", borderRadius: 20 }}>{t.difficulty}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportModal({ tasks, readiness, onClose }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const completed = tasks.filter(t => t.status==="COMPLETED");
    const lowConf = tasks.filter(t => t.status==="COMPLETED" && t.confidence<=2);
    callAI(
      `You are a mentor generating a weekly progress report for a Sem 1 beginner. Return ONLY raw JSON with fields:
      summary (string, 2–3 sentences overall assessment),
      strengths (array of 2 strings),
      areas_to_improve (array of 2 strings),
      next_week_focus (string, one actionable beginner-friendly recommendation),
      predicted_readiness_change (string, e.g. "+3 points expected").`,
      `Semester 1, Week 1 of 16. ${completed.length}/${tasks.length} tasks done. Low confidence: ${lowConf.map(t=>t.title).join(", ")||"none"}. Readiness: ${readiness}.`
    ).then(r => { setReport(r); setLoading(false); });
  }, []);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(28,25,23,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: C.white, borderRadius: 24, padding: "28px 32px", maxWidth: 500, width: "100%", boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, color: C.text }}>📊 Sem 1 — Week 1 Report</div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: C.textLight }}>×</button>
        </div>
        {loading
          ? <div style={{ textAlign: "center", padding: "30px 0", fontSize: 13, color: C.textLight, animation: "pulse 1.5s ease infinite" }}>Generating your report…</div>
          : report && <>
              <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.7, marginBottom: 16, padding: "12px 16px", background: C.goldBg, borderRadius: 12, border: `1px solid ${C.goldBorder}` }}>{report.summary || report.raw}</p>
              {report.strengths && <div style={{ marginBottom: 12 }}><div style={{ fontSize: 11, fontWeight: 700, color: C.green, textTransform: "uppercase", marginBottom: 6 }}>✓ Strengths</div>{report.strengths.map((s,i) => <div key={i} style={{ fontSize: 12, color: C.textMid, padding: "4px 0 4px 12px", borderLeft: `2px solid ${C.green}`, marginBottom: 4 }}>{s}</div>)}</div>}
              {report.areas_to_improve && <div style={{ marginBottom: 12 }}><div style={{ fontSize: 11, fontWeight: 700, color: C.gold, textTransform: "uppercase", marginBottom: 6 }}>↑ Areas to Improve</div>{report.areas_to_improve.map((s,i) => <div key={i} style={{ fontSize: 12, color: C.textMid, padding: "4px 0 4px 12px", borderLeft: `2px solid ${C.goldBorder}`, marginBottom: 4 }}>{s}</div>)}</div>}
              {report.next_week_focus && <div style={{ padding: "12px 14px", background: C.blueBg, border: `1px solid ${C.blueBorder}`, borderRadius: 10 }}><div style={{ fontSize: 11, fontWeight: 700, color: C.blue, marginBottom: 4 }}>NEXT WEEK</div><div style={{ fontSize: 12, color: C.textMid }}>{report.next_week_focus}</div></div>}
              {report.predicted_readiness_change && <div style={{ marginTop: 10, fontSize: 12, color: C.green, fontWeight: 600, textAlign: "right" }}>Readiness prediction: {report.predicted_readiness_change}</div>}
            </>
        }
      </div>
    </div>
  );
}

// ─── DASHBOARD PAGE ───────────────────────────────────────────────────────────
function DashboardPage({ tasks, setTasks, milestones, setMilestones, hoursPerWeek, setHoursPerWeek, phases, setPhases, weeklyHours, setWeeklyHours, showToast }) {
  const [aiInsight, setAiInsight] = useState("");
  const [insightLoading, setInsightLoading] = useState(true);
  const [insightOpen, setInsightOpen] = useState(true);
  const [adaptationLogs, setAdaptationLogs] = useState([]);
  const [checkinPending, setCheckinPending] = useState(false);
  const [modal, setModal] = useState(null);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const completedTasks = tasks.filter(t => t.status === "COMPLETED").length;
  const weekProgress = Math.round((completedTasks / tasks.length) * 100);

  const calcReadiness = useCallback(() => {
    const skillScore = Math.round((completedTasks / tasks.length) * 100);
    const milestoneScore = Math.min(milestones.filter(m => m.sem === 1).length * 15, 60);
    return Math.max(5, Math.round(skillScore * 0.5 + milestoneScore * 0.3 + 10 * 0.2));
  }, [completedTasks, tasks.length, milestones]);
  const readinessScore = calcReadiness();

  useEffect(() => {
    const missedCount = tasks.filter(t => t.status === "PENDING").length;
    if (missedCount >= 3) {
      setCheckinPending(true);
      setAdaptationLogs(prev => [...prev, { pattern: "Multiple tasks pending", action: "Check-in modal triggered", date: "Today" }]);
    }
    const lowConf = tasks.filter(t => t.status === "COMPLETED" && t.confidence <= 2);
    if (lowConf.length > 0) {
      setAdaptationLogs(prev => [...prev, { pattern: `Low confidence on: ${lowConf.map(t=>t.title).join(", ")}`, action: "Reinforcement content enabled", date: "Today" }]);
    }
  }, []);

  useEffect(() => {
    const lowConf = tasks.filter(t => t.status==="COMPLETED" && t.confidence<=2).map(t=>t.title);
    callAI(
      "You are a supportive AI mentor for a Sem 1 beginner. Generate one short, specific, actionable weekly insight. Return ONLY raw JSON with field: insight (string, 2 sentences max).",
      `Sem 1, Week 1 of 16. ${completedTasks}/${tasks.length} tasks done. Low confidence: ${lowConf.join(", ")||"none"}.`
    ).then(r => { setAiInsight(r.insight || r.raw || "Every expert was once a beginner — consistency beats intensity every time."); setInsightLoading(false); });
  }, []);

  const handleTaskComplete = (id, conf) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: "COMPLETED", confidence: conf } : t));
    setWeeklyHours(prev => { const n=[...prev]; n[0]=Math.min(n[0]+2,20); return n; });
    showToast("Task marked complete!");
    if (conf <= 2) showToast("Reinforcement content is loading for this task…");
    setPhases(prev => prev.map(p => {
      if (p.id === 1) {
        const done = tasks.filter(t => t.status==="COMPLETED").length + 1;
        return { ...p, completion: Math.round((done / tasks.length) * 100) };
      }
      return p;
    }));
  };

  const handleUpdateTask = (id, updates) => setTasks(prev => prev.map(t => t.id===id ? {...t,...updates} : t));

  const handleCheckinSubmit = async ({ reason, hours }) => {
    setHoursPerWeek(hours);
    const result = await callAI(
      "Return ONLY raw JSON with field: message (string, 1 sentence confirming the plan was adjusted).",
      `Missed week. Reason: ${reason}. New hours: ${hours}h/week.`
    );
    setCheckinPending(false);
    setModal(null);
    setAdaptationLogs(prev => [...prev, { pattern: `Missed week — reason: ${reason}`, action: result.message || "Plan recalibrated", date: "Today" }]);
    showToast("Your plan has been updated!");
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, animation: "fadeUp 0.5s ease" }}>
        <div>
          <div style={{ fontSize: 11, color: C.textLight, marginBottom: 4, letterSpacing: "0.07em", textTransform: "uppercase" }}>{STUDENT.branch} · Semester {STUDENT.semester} · Week 1 of 16</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem,2.5vw,2.2rem)", fontWeight: 900, color: C.text, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            {greeting}, <span className="gold-shimmer">{STUDENT.name.split(" ")[0]}</span> 👋
          </h1>
          <p style={{ fontSize: 13, color: C.textMid, marginTop: 5 }}>This week: <span style={{ color: C.gold, fontWeight: 600 }}>Basics & Setup — Variables, Data Types & Environment</span></p>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <div style={{ background: C.goldBg, border: `1px solid ${C.goldBorder}`, borderRadius: 12, padding: "8px 14px", fontSize: 12, color: C.gold, fontWeight: 600 }}>⚡ {hoursPerWeek}h/week</div>
          <div style={{ background: C.greenBg, border: `1px solid ${C.greenBorder}`, borderRadius: 12, padding: "8px 14px", fontSize: 12, color: C.green, fontWeight: 600 }}>● On Track</div>
          {checkinPending && (
            <button onClick={() => setModal("checkin")} style={{ background: C.red, color: "white", border: "none", borderRadius: 12, padding: "8px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", animation: "pulse 2s ease infinite" }}>
              ⚠ Check-in Required
            </button>
          )}
        </div>
      </div>

      {/* AI Insight */}
      {insightOpen && (
        <div style={{ background: "linear-gradient(135deg,rgba(180,83,9,0.05),rgba(251,191,36,0.08))", border: `1.5px solid ${C.goldBorder}`, borderRadius: 16, padding: "16px 20px", marginBottom: 24, display: "flex", alignItems: "flex-start", gap: 14, position: "relative", animation: "fadeUp 0.55s ease" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg,${C.gold},${C.goldLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>✨</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: C.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>AI Weekly Insight</div>
            <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.65 }}>{insightLoading ? <span style={{ animation: "pulse 1.5s ease infinite", display: "inline-block" }}>Generating your personalised insight…</span> : aiInsight}</p>
          </div>
          <button onClick={() => setInsightOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: C.textLight }}>×</button>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Semester Progress", value: "6%",  sub: "1 of 16 weeks",       color: C.gold,   icon: "◎" },
          { label: "Week 1 Tasks",      value: `${completedTasks}/${tasks.length}`, sub: "tasks done", color: C.green, icon: "✓" },
          { label: "Readiness Score",   value: readinessScore, sub: "placement readiness", color: C.blue, icon: "◈" },
          { label: "Streak",            value: `${STUDENT.streak}d`, sub: "consecutive days", color: C.red, icon: "🔥" },
        ].map((s, i) => (
          <div key={i} className="card-hover" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, padding: "18px 20px", transition: "all 0.25s", animation: `fadeUp ${0.3+i*0.08}s ease`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: C.textLight, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</span>
              <span style={{ fontSize: 14, opacity: 0.6 }}>{s.icon}</span>
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 900, color: s.color, marginBottom: 3 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: C.textLight }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Tasks */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 800, color: C.text }}>Week 1 Focus</h2>
                <div style={{ fontSize: 11, color: C.textLight, marginTop: 2 }}>{completedTasks} completed · {tasks.length - completedTasks} remaining</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 110, height: 5, background: C.bgDeep, borderRadius: 5, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${weekProgress}%`, background: `linear-gradient(90deg,${C.gold},${C.goldLight})`, borderRadius: 5, transition: "width 0.7s ease" }} />
                </div>
                <span style={{ fontSize: 11, color: C.gold, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>{weekProgress}%</span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {tasks.map(task => <TaskCard key={task.id} task={task} onComplete={handleTaskComplete} onUpdateTask={handleUpdateTask} />)}
            </div>
          </div>

          {/* Phases */}
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 800, color: C.text, marginBottom: 4 }}>Semester 1 Phases</h3>
            <p style={{ fontSize: 11, color: C.textLight, marginBottom: 16 }}>16 weeks · 4 phases · 1 semester</p>
            {phases.map(phase => (
              <div key={phase.id} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: phase.id===1 ? phase.color : phase.completion===100 ? C.green : C.border, boxShadow: phase.id===1 ? `0 0 8px ${phase.color}` : "none" }} />
                    <span style={{ fontSize: 13, color: phase.id===1 ? C.text : phase.completion===100 ? C.textLight : C.bgDeep, fontWeight: phase.id===1 ? 700 : 500 }}>Phase {phase.id}: {phase.goal}</span>
                    <span style={{ fontSize: 11, color: C.textLight }}>Wk {phase.weeks}</span>
                  </div>
                  <span style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: phase.completion===100 ? C.green : phase.id===1 ? phase.color : C.textLight, fontWeight: 700 }}>{phase.completion}%</span>
                </div>
                <div style={{ height: 4, background: C.bgAlt, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 4, transition: "width 1s ease", width: `${phase.completion}%`, background: phase.completion===100 ? C.green : phase.id===1 ? `linear-gradient(90deg,${phase.color},${C.goldLight})` : C.bgDeep }} />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <MilestonePanel milestones={milestones} onAdd={(m) => { setMilestones(prev => [...prev, { ...m, id: `m${Date.now()}`, sem: 1 }]); showToast("Milestone logged! Readiness score updated."); }} />
            <WeeklyChart data={weeklyHours} currentWeek={1} />
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Readiness Score */}
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: 11, color: C.textLight, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 2 }}>Readiness Engine</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 800, color: C.text, marginBottom: 16 }}>Placement Score</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <CircularProgress value={readinessScore} color={C.gold} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.65 }}>Score updates live as you complete tasks and log milestones.</div>
                {milestones.length < 3 && <div style={{ marginTop: 8, fontSize: 11, color: C.gold, background: C.goldBg, padding: "4px 10px", borderRadius: 20, display: "inline-block", fontWeight: 600 }}>↑ Log a milestone to boost by ~8pts</div>}
              </div>
            </div>
            {[
              { label: "Skill Completion", value: Math.round((completedTasks/tasks.length)*100), weight: "50%", color: C.gold   },
              { label: "Milestones",       value: Math.min(milestones.filter(m=>m.sem===1).length*15,60), weight: "30%", color: C.purple },
              { label: "Getting Started",  value: 10, weight: "20%", color: C.green  },
            ].map(item => (
              <div key={item.label} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: C.textMid }}>{item.label} <span style={{ color: C.textLight }}>({item.weight})</span></span>
                  <span style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: item.color, fontWeight: 700 }}>{item.value}</span>
                </div>
                <div style={{ height: 4, background: C.bgAlt, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${item.value}%`, background: item.color, borderRadius: 4, opacity: 0.75, transition: "width 1s ease" }} />
                </div>
              </div>
            ))}
          </div>

          {/* Journey */}
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: 11, color: C.textLight, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 2 }}>4-Year Journey</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 800, color: C.text, marginBottom: 14 }}>Your Timeline</div>
            {INIT_JOURNEY.map(sem => (
              <div key={sem.sem} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 12, background: sem.status==="active" ? C.goldBg : "transparent", border: `1px solid ${sem.status==="active" ? C.goldBorder : "transparent"}`, marginBottom: 4 }}>
                <div style={{ width: 24, height: 24, borderRadius: 7, flexShrink: 0, background: sem.status==="completed" ? C.greenBg : sem.status==="active" ? C.goldBg : C.bgAlt, border: `1.5px solid ${sem.status==="completed" ? C.greenBorder : sem.status==="active" ? C.goldBorder : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>
                  {sem.status==="completed" ? <span style={{ color: C.green, fontWeight: 700 }}>✓</span> : sem.status==="active" ? <span style={{ color: C.gold, fontWeight: 900, fontFamily: "'Playfair Display', serif", fontSize: 12 }}>{sem.sem}</span> : <span style={{ color: C.textLight, fontSize: 10 }}>🔒</span>}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: sem.status==="active" ? 700 : 500, color: sem.status==="active" ? C.gold : sem.status==="completed" ? C.green : C.textLight }}>Sem {sem.sem}</div>
                  <div style={{ fontSize: 10, color: sem.status==="active" ? C.goldLight : C.textLight }}>{sem.label}</div>
                </div>
                {sem.status==="active" && <div style={{ marginLeft: "auto", fontSize: 9, color: C.gold, background: C.white, padding: "2px 7px", borderRadius: 20, border: `1px solid ${C.goldBorder}`, fontWeight: 700 }}>NOW</div>}
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "20px 22px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 12 }}>Quick Actions</div>
            {[
              { label: "View Full Roadmap",      icon: "◎", action: () => setModal("roadmap")     },
              { label: "Update Weekly Hours",     icon: "⏱", action: () => setModal("hours")       },
              { label: "Check Adaptation Status", icon: "⚡", action: () => setModal("adaptation") },
              { label: "Generate Week Report",    icon: "📊", action: () => setModal("report")     },
            ].map(a => (
              <button key={a.label} onClick={a.action}
                style={{ display: "flex", alignItems: "center", gap: 9, padding: "10px 12px", borderRadius: 10, background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, fontSize: 12, cursor: "pointer", textAlign: "left", transition: "all 0.18s", fontWeight: 500, width: "100%", marginBottom: 5 }}
                onMouseEnter={e => { e.currentTarget.style.background = C.bgAlt; e.currentTarget.style.borderColor = C.goldBorder; e.currentTarget.style.color = C.gold; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMid; }}>
                <span style={{ fontSize: 15 }}>{a.icon}</span>{a.label}<span style={{ marginLeft: "auto", opacity: 0.4 }}>→</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {modal==="checkin"    && <CheckinModal onSubmit={handleCheckinSubmit} onClose={() => { setModal(null); setCheckinPending(false); }} />}
      {modal==="adaptation" && <AdaptationModal logs={adaptationLogs} onClose={() => setModal(null)} />}
      {modal==="hours"      && <HoursModal current={hoursPerWeek} onSave={(v) => { setHoursPerWeek(v); showToast(`Weekly hours updated to ${v}h`); }} onClose={() => setModal(null)} />}
      {modal==="roadmap"    && <RoadmapModal phases={phases} tasks={tasks} onClose={() => setModal(null)} />}
      {modal==="report"     && <ReportModal tasks={tasks} readiness={readinessScore} onClose={() => setModal(null)} />}
    </div>
  );
}

// ─── PROFILE PAGE → imported from ./ProfilePage.jsx ──────────────────────────
// Edit ProfilePage.jsx directly to update the profile page.
// Props passed from App: milestones, setMilestones, hoursPerWeek, setHoursPerWeek, showToast
// ProfilePage also accepts an optional `student` prop — defaults to STUDENT constant if omitted.

// ─── ANALYTICS PAGE ───────────────────────────────────────────────────────────
function AnalyticsPage({ tasks, milestones }) {
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
    callAI("Generate a performance analysis report for a Sem 1 beginner. Return ONLY JSON with fields: summary (string, 2 sentences), top_strength (string), biggest_gap (string), next_action (string), predicted_readiness_end_of_semester (number 0-100).",
      `Semester 1, Week 1 of 16. ${completedTasks.length}/${tasks.length} tasks. Avg confidence: ${avgConf}. Total hours: ${totalHours}h. Low confidence: ${lowConf.join(", ")||"none"}.`)
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
          { label: "Streak",          value: `${STUDENT.streak}d`, total: "active", color: C.red },
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
        <div style={{ fontSize: 11, color: C.gold, fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>✨ AI Performance Analysis · Sem 1, Week 1 of 16</div>
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
                {[{ cat: "DSA", score: 20, color: C.gold },{ cat: "Languages", score: 35, color: C.green },{ cat: "Backend", score: 5, color: C.blue },{ cat: "Design", score: 5, color: C.purple }].map(c => (
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
            <p style={{ fontSize: 11, color: C.textLight, marginBottom: 20 }}>Total: {totalHours}h · {WEEKLY_HOURS.filter(h=>h>0).length} active weeks of 16</p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 120, marginBottom: 10 }}>
              {WEEKLY_HOURS.map((h,i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  {h>0 && <span style={{ fontSize: 9, color: i===0 ? C.gold : C.textLight, fontWeight: i===0 ? 700 : 400 }}>{h}h</span>}
                  <div style={{ width: "100%", borderRadius: "4px 4px 0 0", height: h>0 ? `${(h/maxWeek)*90}px` : 4, background: i===0 ? `linear-gradient(to top,${C.gold},${C.goldLight})` : h>0 ? "rgba(180,83,9,0.25)" : C.bgAlt, transition: `height 0.8s cubic-bezier(0.34,1.56,0.64,1) ${i*40}ms`, boxShadow: i===0 ? `0 -2px 8px rgba(180,83,9,0.3)` : "none" }} />
                  <span style={{ fontSize: 9, color: i===0 ? C.gold : C.textLight, fontWeight: i===0 ? 700 : 400 }}>W{i+1}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 16 }}>
              {[{ label: "Best Week", value: `${Math.max(...WEEKLY_HOURS)}h`, sub: "Week 3", color: C.gold },{ label: "Weekly Avg", value: `${(totalHours/Math.max(WEEKLY_HOURS.filter(h=>h>0).length,1)).toFixed(1)}h`, sub: "active weeks", color: C.blue },{ label: "vs Target", value: `${WEEKLY_HOURS[0]-8 >= 0 ? "+" : ""}${WEEKLY_HOURS[0]-8}h`, sub: "this week", color: C.green }].map(s => (
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
              {WEEKLY_TASKS.slice(0,4).map((t,i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 10, color: C.textLight, width: 20 }}>W{i+1}</span>
                  <div style={{ flex: 1, height: 8, background: C.bgAlt, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(t/Math.max(...WEEKLY_TASKS,1))*100}%`, background: i===0 ? `linear-gradient(90deg,${C.gold},${C.goldLight})` : "rgba(180,83,9,0.3)", borderRadius: 4, transition: `width 0.8s ease ${i*60}ms` }} />
                  </div>
                  <span style={{ fontSize: 10, color: i===0 ? C.gold : C.textLight, fontWeight: i===0 ? 700 : 400, width: 14 }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ background: C.goldBg, border: `1px solid ${C.goldBorder}`, borderRadius: 20, padding: "20px 22px" }}>
              <div style={{ fontSize: 11, color: C.gold, fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>Pace Insight</div>
              <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.7 }}>At your current pace of <strong style={{ color: C.gold }}>{WEEKLY_HOURS[0]}h/week</strong>, you're on track to complete Semester 1 with buffer time to review concepts before Sem 2.</p>
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
            {completedTasks.length === 0 && <div style={{ textAlign: "center", padding: "30px 0", color: C.textLight, fontSize: 12 }}>Complete tasks to see confidence ratings.</div>}
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
              {[{ label: "Easy tasks avg", value: "—", color: C.green },{ label: "Medium tasks avg", value: "—", color: C.gold },{ label: "Hard tasks avg", value: "—", color: C.red }].map((r,i) => (
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

// ─── JOURNEY PAGE ─────────────────────────────────────────────────────────────
function JourneyPage({ milestones }) {
  const [selectedSem, setSelectedSem] = useState(1);
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
        <div style={{ position: "absolute", top: "50%", left: 30, right: 30, height: 2, background: `linear-gradient(90deg,${C.gold} 12%,${C.border} 12%)`, transform: "translateY(-50%)", zIndex: 0 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8,1fr)", gap: 8, position: "relative", zIndex: 1 }}>
          {JOURNEY_DATA.map(sem => {
            const isSelected = selectedSem === sem.sem;
            const isDone = sem.status==="completed"; const isActive = sem.status==="active"; const isLocked = sem.status==="locked";
            const color = isDone ? C.green : isActive ? C.gold : C.textLight;
            return (
              <div key={sem.sem} onClick={() => handleSelectSem(sem.sem, sem.status)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: isLocked ? "default" : "pointer", opacity: isLocked ? 0.5 : 1 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: isSelected ? (isDone ? C.green : isActive ? C.gold : C.bgDeep) : isDone ? C.greenBg : isActive ? C.goldBg : C.bgAlt, border: `2px solid ${isSelected ? color : isDone ? C.greenBorder : isActive ? C.goldBorder : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s", boxShadow: isSelected ? `0 4px 16px ${color}40` : "none" }}>
                  {isDone ? <span style={{ color: C.green, fontSize: 16, fontWeight: 700 }}>✓</span> : isActive ? <span style={{ color: C.gold, fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 900 }}>{sem.sem}</span> : <span style={{ color: C.textLight, fontSize: 14 }}>🔒</span>}
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
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 4 }}>Sem 1 — 16-Week Phase Overview</h3>
              <p style={{ fontSize: 11, color: C.textLight, marginBottom: 16 }}>4 phases · 4 weeks each</p>
              {FULL_ROADMAP.map(phase => (
                <div key={phase.id} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: phase.color, boxShadow: phase.id===1 ? `0 0 8px ${phase.color}` : "none" }} />
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
              { sem: "1-2", label: "Core Programming",          icon: "💻", done: false, active: true,  desc: "Build foundational CS knowledge" },
              { sem: "3-4", label: "DSA + System Design",       icon: "🧩", done: false, active: false, desc: "Master problem-solving & architecture" },
              { sem: "5-6", label: "Specialisation + Projects", icon: "🚀", done: false, active: false, desc: "Build real-world engineering skills" },
              { sem: "7-8", label: "Placement Ready",            icon: "🏆", done: false, active: false, desc: "Secure your dream job offer" },
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
                <div><div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{m.title}</div><div style={{ fontSize: 10, color: C.textLight }}>{m.type} · Sem {m.sem||1} · {m.date}</div></div>
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

// ─── ROADMAP PAGE ─────────────────────────────────────────────────────────────
function RoadmapPage({ tasks }) {
  const [selectedPhase, setSelectedPhase] = useState(1);
  const [selectedWeek, setSelectedWeek] = useState(1);
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
      const r = await callAI("You are a technical mentor for a Sem 1 beginner. Return ONLY raw JSON: explanation (string,3-4 sentences, beginner-friendly), focus_points (array 3 strings), mini_exercise (string, simple exercise for beginner), mistake_to_avoid (string).", `Task: "${taskName}". CS student, Sem 1, absolute beginner.`);
      setAiExpandData(prev => ({ ...prev, [taskKey]: r }));
      setLoadingExpand(null);
    }
  };

  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 11, color: C.textLight, marginBottom: 4, letterSpacing: "0.07em", textTransform: "uppercase" }}>Semester 1 · 16 Weeks · 4 Phases</div>
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
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.color, boxShadow: p.id===1 ? `0 0 8px ${p.color}` : "none" }} />
                  <span style={{ fontSize: 10, color: p.completion===100 ? C.green : p.id===1 ? p.color : C.textLight, fontFamily: "'DM Mono',monospace", fontWeight: 700 }}>{p.completion}%</span>
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
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 4 }}>All 16 Weeks — Semester 1 Overview</h3>
            <p style={{ fontSize: 11, color: C.textLight, marginBottom: 18 }}>Click any week to see detailed tasks and AI explanations</p>
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
                <p style={{ fontSize: 12, color: C.textLight }}>Weeks {phase.weeks} · {phase.weeks_data.reduce((a,w) => a+w.tasks.length, 0)} tasks · Semester 1</p>
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
                    <div style={{ fontSize: 11, color: currentWeekData.current ? C.gold : currentWeekData.done ? C.green : C.textLight, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>Week {selectedWeek} of 16 {currentWeekData.current ? "← CURRENT" : currentWeekData.done ? "← DONE" : "← UPCOMING"}</div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: C.text, marginBottom: 4 }}>{currentWeekData.focus}</h2>
                    <p style={{ fontSize: 12, color: C.textLight }}>{currentWeekData.tasks.length} tasks this week · Semester 1</p>
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
                              <span style={{ fontSize: 10, color: C.textLight, background: C.bgAlt, padding: "2px 8px", borderRadius: 20 }}>Week {selectedWeek} of 16</span>
                              <span style={{ fontSize: 10, color: C.gold, background: C.goldBg, padding: "2px 8px", borderRadius: 20 }}>Sem 1</span>
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
                      <div style={{ fontSize: 10, color: pfw.color, fontWeight: 700, marginBottom: 2 }}>{pfw.phase} · Semester 1</div>
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

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tasks, setTasks] = useState(INIT_TASKS);
  const [milestones, setMilestones] = useState(INIT_MILESTONES);
  const [hoursPerWeek, setHoursPerWeek] = useState(STUDENT.hoursPerWeek);
  const [phases, setPhases] = useState(INIT_PHASES);
  const [weeklyHours, setWeeklyHours] = useState([2, 3, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => setToast(msg);

  const navItems = [
    { id: "dashboard", icon: "⬡", label: "Dashboard" },
    { id: "roadmap",   icon: "◎", label: "My Roadmap" },
    { id: "journey",   icon: "◈", label: "Journey"    },
    { id: "analytics", icon: "◐", label: "Analytics"  },
    { id: "profile",   icon: "◉", label: "Profile"    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', system-ui, sans-serif", display: "flex", color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: rgba(180,83,9,0.2); border-radius: 4px; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spin-slow-reverse { from{transform:rotate(360deg)} to{transform:rotate(0deg)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .card-hover:hover { box-shadow: 0 8px 32px rgba(180,83,9,0.1) !important; border-color: ${C.goldBorder} !important; transform: translateY(-1px); }
        .gold-shimmer { background: linear-gradient(135deg,${C.gold},${C.goldLight},#f59e0b,${C.goldLight},${C.gold}); background-size: 300% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 4s linear infinite; }
        input[type=range] { cursor: pointer; }
        button { font-family: 'DM Sans', system-ui, sans-serif; }
      `}</style>

      {/* Background */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(rgba(180,83,9,0.06) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none", maskImage: "radial-gradient(ellipse at center, black 10%, transparent 75%)", zIndex: 0 }} />
      <div style={{ position: "fixed", top: "15%", right: "10%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.1), transparent)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "20%", left: "15%", width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(180,83,9,0.07), transparent)", filter: "blur(50px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: "50%", left: "50%", width: 620, height: 620, marginTop: -310, marginLeft: -310, borderRadius: "50%", border: "1.5px solid rgba(180,83,9,0.13)", animation: "spin-slow 42s linear infinite", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", width: 15, height: 15, borderRadius: "50%", background: "radial-gradient(circle, #fde68a 20%, #b45309)", boxShadow: "0 0 16px #d97706" }} />
        <div style={{ position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)", width: 9, height: 9, borderRadius: "50%", background: "#d97706" }} />
      </div>
      <div style={{ position: "fixed", top: "50%", left: "50%", width: 420, height: 420, marginTop: -210, marginLeft: -210, borderRadius: "50%", border: "1px dashed rgba(180,83,9,0.09)", animation: "spin-slow-reverse 58s linear infinite", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "50%", left: -6, transform: "translateY(-50%)", width: 11, height: 11, borderRadius: "50%", background: "radial-gradient(circle, #c4b5fd 20%, #7c3aed)", boxShadow: "0 0 12px rgba(124,58,237,0.5)" }} />
      </div>

      {/* Sidebar */}
      <aside style={{ width: sidebarOpen ? 236 : 68, background: C.white, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", padding: "24px 0", flexShrink: 0, transition: "width 0.35s cubic-bezier(0.23,1,0.32,1)", overflow: "hidden", position: "relative", zIndex: 10, boxShadow: "2px 0 16px rgba(0,0,0,0.04)" }}>
        <div style={{ padding: "0 16px 28px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #b45309, #d97706)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 12px rgba(180,83,9,0.3)" }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 900, color: "white" }}>C</span>
          </div>
          {sidebarOpen && <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 800, color: C.text }}>ClariPath</span>}
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ position: "absolute", top: 28, right: sidebarOpen ? 14 : 16, width: 22, height: 22, borderRadius: 6, border: `1px solid ${C.border}`, background: C.bg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: C.textLight }}>
          {sidebarOpen ? "←" : "→"}
        </button>
        <nav style={{ flex: 1, padding: "0 10px", display: "flex", flexDirection: "column", gap: 3 }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveNav(item.id)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 12, background: activeNav===item.id ? C.goldBg : "transparent", border: `1px solid ${activeNav===item.id ? C.goldBorder : "transparent"}`, color: activeNav===item.id ? C.gold : C.textLight, cursor: "pointer", fontSize: 13, fontWeight: activeNav===item.id ? 700 : 500, textAlign: "left", transition: "all 0.18s", whiteSpace: "nowrap", overflow: "hidden" }}
              onMouseEnter={e => { if (activeNav!==item.id) { e.currentTarget.style.background=C.goldBg; e.currentTarget.style.color=C.gold; e.currentTarget.style.borderColor=C.goldBorder; }}}
              onMouseLeave={e => { if (activeNav!==item.id) { e.currentTarget.style.background="transparent"; e.currentTarget.style.color=C.textLight; e.currentTarget.style.borderColor="transparent"; }}}>
              <span style={{ fontSize: 17, flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && item.label}
            </button>
          ))}
        </nav>
        {sidebarOpen && (
          <div style={{ padding: "14px", borderTop: `1px solid ${C.border}`, margin: "0 10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: C.goldBg, border: `1.5px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 900, color: C.gold, flexShrink: 0 }}>KU</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{STUDENT.name}</div>
                <div style={{ fontSize: 11, color: C.gold, fontWeight: 600 }}>{STUDENT.goal}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {[{ v: `${STUDENT.streak}d`, l: "Streak", c: C.red },{ v: "Sem 1", l: "Current", c: C.blue },{ v: "W1/16", l: "Week", c: C.green }].map((s,i) => (
                <div key={i} style={{ flex: 1, padding: "6px 8px", background: C.bgAlt, borderRadius: 8, border: `1px solid ${C.border}`, textAlign: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: s.c, fontFamily: "'Playfair Display',serif" }}>{s.v}</div>
                  <div style={{ fontSize: 9, color: C.textLight, textTransform: "uppercase" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: "auto", padding: "28px 30px 50px", position: "relative", zIndex: 1 }}>
        {activeNav==="dashboard" && <DashboardPage tasks={tasks} setTasks={setTasks} milestones={milestones} setMilestones={setMilestones} hoursPerWeek={hoursPerWeek} setHoursPerWeek={setHoursPerWeek} phases={phases} setPhases={setPhases} weeklyHours={weeklyHours} setWeeklyHours={setWeeklyHours} showToast={showToast} />}
        {activeNav==="roadmap"   && <RoadmapPage tasks={tasks} />}
        {activeNav==="journey"   && <JourneyPage milestones={milestones} />}
        {activeNav==="analytics" && <AnalyticsPage tasks={tasks} milestones={milestones} />}
        {activeNav==="profile"   && <ProfilePage student={STUDENT} milestones={milestones} setMilestones={setMilestones} hoursPerWeek={hoursPerWeek} setHoursPerWeek={setHoursPerWeek} showToast={showToast} />}
      </main>

      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  );
}