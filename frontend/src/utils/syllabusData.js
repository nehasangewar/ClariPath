// ─── College Syllabus Data ────────────────────────────────────────────────────
// Maps branch → semester → subjects[]
// Injected into Gemini prompts so roadmaps align with what
// the student is actually studying in college.
// Based on standard Indian university curriculum (VTU / Mumbai / SPPU / Anna Univ pattern)
// Admins can override this from Admin Panel → POST /api/syllabus

export const SYLLABUS_DATA = {
  CSE: {
    1: ['Engineering Mathematics I', 'Engineering Physics', 'Engineering Chemistry', 'Basic Programming (C)', 'Engineering Graphics'],
    2: ['Engineering Mathematics II', 'Data Structures', 'Digital Logic Design', 'Object Oriented Programming (Java/C++)', 'Computer Organization'],
    3: ['Data Structures & Algorithms', 'Object Oriented Programming', 'Discrete Mathematics', 'Computer Organization & Architecture', 'Database Management Systems'],
    4: ['Design & Analysis of Algorithms', 'Operating Systems', 'Computer Networks', 'Software Engineering', 'Theory of Computation'],
    5: ['Compiler Design', 'Web Technologies', 'Artificial Intelligence', 'Mobile Computing', 'Software Testing'],
    6: ['Machine Learning', 'Cloud Computing', 'Information Security', 'Big Data Analytics', 'Distributed Systems'],
    7: ['Deep Learning', 'Natural Language Processing', 'IoT & Embedded Systems', 'Project Management', 'Open Elective'],
    8: ['Major Project', 'Industry Internship', 'Seminar', 'Elective']
  },
  IT: {
    1: ['Engineering Mathematics I', 'Engineering Physics', 'Programming Fundamentals (C)', 'Digital Electronics', 'Technical Communication'],
    2: ['Engineering Mathematics II', 'Data Structures', 'OOP with Java', 'Computer Networks Basics', 'Engineering Graphics'],
    3: ['Advanced Data Structures', 'Database Management Systems', 'Operating Systems', 'Web Design & Development', 'Discrete Mathematics'],
    4: ['Analysis of Algorithms', 'Software Engineering', 'Computer Networks', 'Object Oriented Design', 'Theory of Computation'],
    5: ['Web Application Development', 'Network Security', 'Mobile Application Development', 'Multimedia Systems', 'Software Testing & QA'],
    6: ['Cloud Computing', 'Machine Learning', 'Information Systems', 'ERP Systems', 'Big Data'],
    7: ['Data Science', 'Cyber Security', 'IoT Applications', 'Project Management', 'Open Elective'],
    8: ['Major Project', 'Internship', 'Seminar', 'Elective']
  },
  Electronics: {
    1: ['Engineering Mathematics I', 'Engineering Physics', 'Basic Electronics', 'Programming in C', 'Engineering Drawing'],
    2: ['Engineering Mathematics II', 'Electronic Devices & Circuits', 'Digital Electronics', 'Network Analysis', 'Data Structures Basics'],
    3: ['Analog Electronics', 'Digital Signal Processing', 'Microprocessors', 'Signals & Systems', 'Electromagnetics'],
    4: ['VLSI Design', 'Control Systems', 'Communication Engineering', 'Embedded Systems', 'Linear Integrated Circuits'],
    5: ['Advanced Microprocessors', 'RF & Microwave Engineering', 'Power Electronics', 'Digital Communication', 'HDL Programming'],
    6: ['IoT Systems', 'Image Processing', 'Wireless Communication', 'Medical Electronics', 'Robotics'],
    7: ['Advanced Communication Systems', 'Nanotechnology', 'Satellite Communication', 'Project Work', 'Elective'],
    8: ['Major Project', 'Internship', 'Seminar', 'Elective']
  },
  Mechanical: {
    1: ['Engineering Mathematics I', 'Engineering Physics', 'Engineering Drawing', 'Workshop Technology', 'Basic Electrical Engineering'],
    2: ['Engineering Mathematics II', 'Mechanics of Solids', 'Thermodynamics I', 'Manufacturing Processes', 'Material Science'],
    3: ['Fluid Mechanics', 'Thermodynamics II', 'Kinematics of Machinery', 'Strength of Materials', 'Engineering Metallurgy'],
    4: ['Machine Design I', 'Heat Transfer', 'Dynamics of Machinery', 'Manufacturing Engineering', 'Industrial Engineering'],
    5: ['Machine Design II', 'Refrigeration & Air Conditioning', 'CAD/CAM', 'Metrology & Quality Control', 'Power Plant Engineering'],
    6: ['Finite Element Analysis', 'Automobile Engineering', 'Operations Research', 'Robotics', 'Elective'],
    7: ['Advanced Manufacturing', 'Product Design', 'Project Work', 'Management', 'Elective'],
    8: ['Major Project', 'Internship', 'Seminar', 'Elective']
  },
  Civil: {
    1: ['Engineering Mathematics I', 'Engineering Chemistry', 'Engineering Drawing', 'Building Materials', 'Surveying I'],
    2: ['Engineering Mathematics II', 'Mechanics', 'Fluid Mechanics I', 'Surveying II', 'Geology'],
    3: ['Structural Analysis I', 'Fluid Mechanics II', 'Geotechnical Engineering I', 'Building Construction', 'Environmental Engineering I'],
    4: ['Structural Analysis II', 'Design of RCC Structures', 'Geotechnical Engineering II', 'Transportation Engineering I', 'Hydraulics'],
    5: ['Design of Steel Structures', 'Foundation Engineering', 'Transportation Engineering II', 'Environmental Engineering II', 'Quantity Surveying'],
    6: ['Advanced Structural Design', 'Construction Management', 'Water Resources Engineering', 'Urban Planning', 'Elective'],
    7: ['Project Management', 'Advanced Foundation Design', 'Bridge Engineering', 'Project Work', 'Elective'],
    8: ['Major Project', 'Internship', 'Seminar', 'Elective']
  },
  Electrical: {
    1: ['Engineering Mathematics I', 'Engineering Physics', 'Basic Electrical Engineering', 'Engineering Drawing', 'Programming Basics'],
    2: ['Engineering Mathematics II', 'Circuit Analysis', 'Electronic Devices', 'Electrical Machines I', 'Digital Electronics'],
    3: ['Electrical Machines II', 'Power Systems I', 'Control Systems I', 'Signals & Systems', 'Measurement & Instrumentation'],
    4: ['Power Systems II', 'Control Systems II', 'Power Electronics', 'Microprocessors', 'Electromagnetic Theory'],
    5: ['High Voltage Engineering', 'Switchgear & Protection', 'Drives & Control', 'Power System Analysis', 'Electrical Estimation'],
    6: ['Renewable Energy Systems', 'FACTS & HVDC', 'Advanced Power Electronics', 'Smart Grid', 'Elective'],
    7: ['Power System Operation', 'Energy Management', 'Project Work', 'Management', 'Elective'],
    8: ['Major Project', 'Internship', 'Seminar', 'Elective']
  },
  AI_ML: {
    1: ['Engineering Mathematics I', 'Programming Fundamentals (Python)', 'Introduction to AI', 'Linear Algebra', 'Engineering Physics'],
    2: ['Engineering Mathematics II', 'Data Structures', 'Statistics & Probability', 'OOP with Python', 'Digital Electronics'],
    3: ['Machine Learning Fundamentals', 'Database Management', 'Computer Vision Basics', 'NLP Introduction', 'Discrete Mathematics'],
    4: ['Deep Learning', 'Big Data Analytics', 'Computer Networks', 'Operating Systems', 'AI Ethics'],
    5: ['Advanced Machine Learning', 'Reinforcement Learning', 'Speech Processing', 'Cloud for AI', 'Software Engineering'],
    6: ['Generative AI', 'MLOps & Model Deployment', 'IoT & Edge AI', 'Business Intelligence', 'Elective'],
    7: ['Research Methodology', 'Advanced NLP', 'AI for Healthcare / Finance', 'Project Work', 'Elective'],
    8: ['Major Project', 'Internship', 'Seminar', 'Elective']
  }
}

/**
 * getSyllabusForSemester
 * Returns subjects array for a given branch + semester.
 * Falls back to CSE if branch not recognized.
 */
export function getSyllabusForSemester(branch, semester) {
  const branchData = SYLLABUS_DATA[branch] || SYLLABUS_DATA['CSE']
  return branchData[Number(semester)] || branchData[3] || []
}

/**
 * getSyllabusContext
 * Returns a formatted string for Gemini prompt injection.
 * Includes current semester + adjacent semesters.
 */
export function getSyllabusContext(branch, semester) {
  const sem      = Number(semester)
  const current  = getSyllabusForSemester(branch, sem)
  const previous = sem > 1 ? getSyllabusForSemester(branch, sem - 1) : []
  const next     = sem < 8 ? getSyllabusForSemester(branch, sem + 1) : []

  return `
COLLEGE SYLLABUS CONTEXT (${branch} branch):
- Previous Semester (Sem ${sem - 1}): ${previous.length ? previous.join(', ') : 'N/A'}
- Current Semester (Sem ${sem}) [ACTIVE]: ${current.join(', ')}
- Next Semester (Sem ${sem + 1}): ${next.length ? next.join(', ') : 'N/A'}

ALIGNMENT RULES:
1. Where a current semester subject directly maps to a career skill, schedule that skill during the relevant college weeks so the student reinforces both simultaneously.
2. Example: If student has "Database Management Systems" this semester, include SQL practice tasks.
3. Slightly introduce next semester topics in Weeks 13–16 to give the student a head start.
4. Never build a roadmap that conflicts with college exam periods (assume Weeks 8 and 16 are mid-sem and end-sem exam weeks — make those weeks lighter).
  `.trim()
}