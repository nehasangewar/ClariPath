import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

// ── DUMMY DATA ──
// TODO: Replace with GET /api/career-goals?field=${field}
const GOALS_BY_FIELD = {
  CS: [
    { id: 1, title: 'Software Engineer', icon: '💻', domain: 'Technology', description: 'You build software applications that millions of people use every day.', what_you_learn: 'Data structures, algorithms, Java, system design, databases, cloud', what_you_do: 'Writing code, reviewing code, solving bugs, building new features daily', salary: '6 LPA to 40 LPA', companies: 'Google, Microsoft, Amazon, Flipkart, Infosys' },
    { id: 2, title: 'Full Stack Developer', icon: '🌐', domain: 'Technology', description: 'You build both the frontend and backend of complete web applications.', what_you_learn: 'React, Node.js, databases, APIs, deployment, HTML, CSS', what_you_do: 'Building complete web apps from design to deployment', salary: '5 LPA to 35 LPA', companies: 'Startups, Adobe, Razorpay, Swiggy' },
    { id: 3, title: 'Data Analyst', icon: '📊', domain: 'Data', description: 'You analyse data to help companies make better decisions.', what_you_learn: 'SQL, Python, Excel, statistics, Power BI, data visualisation', what_you_do: 'Cleaning data, building dashboards, finding patterns, presenting insights', salary: '4 LPA to 25 LPA', companies: 'Deloitte, Accenture, Amazon, Zomato, KPMG' },
    { id: 4, title: 'Data Scientist', icon: '🔬', domain: 'Data', description: 'You build models that help machines learn and make predictions.', what_you_learn: 'Python, ML algorithms, statistics, TensorFlow, data pipelines', what_you_do: 'Building prediction models, analysing large datasets, presenting findings', salary: '8 LPA to 50 LPA', companies: 'Google, Amazon, Flipkart, PhonePe, startups' },
    { id: 5, title: 'DevOps Engineer', icon: '⚙️', domain: 'Infrastructure', description: 'You manage the systems and pipelines that keep software running.', what_you_learn: 'Linux, Docker, Kubernetes, CI/CD, AWS, monitoring tools', what_you_do: 'Automating deployments, managing servers, ensuring uptime', salary: '6 LPA to 35 LPA', companies: 'Amazon, Flipkart, Razorpay, ThoughtWorks' },
    { id: 6, title: 'Cybersecurity Engineer', icon: '🔐', domain: 'Security', description: 'You protect systems and data from attacks and vulnerabilities.', what_you_learn: 'Networking, ethical hacking, cryptography, security tools, Linux', what_you_do: 'Finding vulnerabilities, securing systems, responding to incidents', salary: '6 LPA to 40 LPA', companies: 'TCS, Wipro, IBM, government organisations' },
    { id: 7, title: 'Cloud Engineer', icon: '☁️', domain: 'Infrastructure', description: 'You design and manage cloud infrastructure for companies.', what_you_learn: 'AWS, Azure, GCP, networking, Terraform, cost optimisation', what_you_do: 'Setting up cloud environments, optimising costs, managing infrastructure', salary: '7 LPA to 40 LPA', companies: 'Amazon, Microsoft, Google, Deloitte' },
    { id: 8, title: 'Mobile App Developer', icon: '📱', domain: 'Technology', description: 'You build apps for Android and iOS that people use every day.', what_you_learn: 'Flutter, React Native, Android, iOS, APIs, app deployment', what_you_do: 'Building mobile apps, fixing bugs, publishing to app stores', salary: '5 LPA to 30 LPA', companies: 'Startups, Swiggy, Zomato, PhonePe, freelancing' },
    { id: 9, title: 'ML Engineer', icon: '🤖', domain: 'AI', description: 'You build and deploy machine learning models at scale.', what_you_learn: 'Python, ML frameworks, MLOps, data pipelines, cloud deployment', what_you_do: 'Training models, deploying them to production, monitoring performance', salary: '10 LPA to 60 LPA', companies: 'Google, Microsoft, Amazon, research labs' },
    { id: 10, title: 'Backend Developer', icon: '🔧', domain: 'Technology', description: 'You build the server side logic and APIs that power applications.', what_you_learn: 'Java, Spring Boot, databases, REST APIs, system design', what_you_do: 'Building APIs, managing databases, optimising performance', salary: '5 LPA to 35 LPA', companies: 'Any product or service company' },
  ],
  IT: [
    { id: 11, title: 'Software Engineer', icon: '💻', domain: 'Technology', description: 'You build software applications that millions of people use every day.', what_you_learn: 'Java, Python, databases, APIs, system design', what_you_do: 'Writing code, solving bugs, building features', salary: '6 LPA to 40 LPA', companies: 'TCS, Infosys, Wipro, product companies' },
    { id: 12, title: 'Network Engineer', icon: '🌐', domain: 'Networking', description: 'You design and manage computer networks for organisations.', what_you_learn: 'Cisco, networking protocols, firewalls, VPN, cloud networking', what_you_do: 'Setting up networks, troubleshooting connectivity, managing security', salary: '4 LPA to 25 LPA', companies: 'TCS, HCL, Wipro, telecom companies' },
    { id: 13, title: 'Database Administrator', icon: '🗄️', domain: 'Data', description: 'You manage and optimise databases that store company data.', what_you_learn: 'MySQL, Oracle, PostgreSQL, performance tuning, backup strategies', what_you_do: 'Managing databases, optimising queries, ensuring data safety', salary: '5 LPA to 28 LPA', companies: 'Banks, large enterprises, IT companies' },
    { id: 14, title: 'IT Support Engineer', description: 'You help organisations manage their IT infrastructure and support users.', icon: '🛠️', domain: 'Support', what_you_learn: 'Hardware, OS, networking, ticketing systems, troubleshooting', what_you_do: 'Resolving technical issues, managing systems, supporting users', salary: '3 LPA to 15 LPA', companies: 'Every company with an IT department' },
    { id: 15, title: 'Cybersecurity Analyst', icon: '🔐', domain: 'Security', description: 'You monitor and protect IT systems from threats.', what_you_learn: 'Security tools, threat analysis, SIEM, incident response', what_you_do: 'Monitoring threats, responding to incidents, securing systems', salary: '5 LPA to 30 LPA', companies: 'Banks, IT companies, government' },
    { id: 16, title: 'Cloud Support Engineer', icon: '☁️', domain: 'Cloud', description: 'You help companies migrate and manage their cloud infrastructure.', what_you_learn: 'AWS, Azure, Linux, networking, cost management', what_you_do: 'Supporting cloud users, troubleshooting, optimising costs', salary: '5 LPA to 28 LPA', companies: 'Amazon, Microsoft, Google, IT companies' },
    { id: 17, title: 'Full Stack Developer', icon: '🌐', domain: 'Technology', description: 'You build complete web applications from frontend to backend.', what_you_learn: 'React, Node.js, databases, APIs, deployment', what_you_do: 'Building web apps end to end', salary: '5 LPA to 35 LPA', companies: 'Startups, product companies' },
  ],
  Electronics: [
    { id: 18, title: 'Embedded Systems Engineer', icon: '🔌', domain: 'Hardware', description: 'You build software that runs directly on hardware devices.', what_you_learn: 'C, microcontrollers, RTOS, circuit design, IoT protocols', what_you_do: 'Programming microcontrollers, building IoT devices, testing hardware', salary: '4 LPA to 25 LPA', companies: 'Bosch, Texas Instruments, ISRO, defence companies' },
    { id: 19, title: 'VLSI Design Engineer', icon: '🔬', domain: 'Hardware', description: 'You design the microchips that power all electronic devices.', what_you_learn: 'Verilog, VHDL, circuit design, simulation tools, FPGA', what_you_do: 'Designing circuits, running simulations, verifying chip designs', salary: '6 LPA to 35 LPA', companies: 'Intel, Qualcomm, AMD, Samsung, NVIDIA' },
    { id: 20, title: 'IoT Engineer', icon: '📡', domain: 'IoT', description: 'You connect physical devices to the internet and build smart systems.', what_you_learn: 'Arduino, Raspberry Pi, MQTT, cloud IoT, sensors, C', what_you_do: 'Building connected devices, managing IoT platforms, testing sensors', salary: '4 LPA to 22 LPA', companies: 'Startups, Bosch, Siemens, smart home companies' },
    { id: 21, title: 'Signal Processing Engineer', icon: '📶', domain: 'Signal Processing', description: 'You process and analyse signals from audio, images, and sensors.', what_you_learn: 'MATLAB, Python, DSP algorithms, image processing, audio processing', what_you_do: 'Analysing signals, building filters, processing audio and images', salary: '5 LPA to 30 LPA', companies: 'Qualcomm, defence labs, ISRO, telecom' },
    { id: 22, title: 'Robotics Engineer', icon: '🤖', domain: 'Robotics', description: 'You design and program robots and autonomous systems.', what_you_learn: 'ROS, Python, C++, sensors, control systems, computer vision', what_you_do: 'Building robots, programming motion, testing autonomous systems', salary: '5 LPA to 30 LPA', companies: 'ISRO, defence, manufacturing companies, startups' },
    { id: 23, title: 'Hardware Design Engineer', icon: '🔧', domain: 'Hardware', description: 'You design circuit boards and electronic systems.', what_you_learn: 'PCB design, Altium, circuit analysis, component selection', what_you_do: 'Designing PCBs, testing circuits, working with manufacturers', salary: '4 LPA to 22 LPA', companies: 'Electronics companies, defence, telecom' },
    { id: 24, title: 'Telecom Engineer', icon: '📞', domain: 'Telecom', description: 'You build and manage communication networks and systems.', what_you_learn: '5G, LTE, networking protocols, signal systems, Cisco', what_you_do: 'Managing telecom networks, optimising signal quality, supporting users', salary: '4 LPA to 20 LPA', companies: 'Jio, Airtel, Ericsson, Nokia, BSNL' },
  ],
  Mechanical: [
    { id: 25, title: 'CAD Design Engineer', icon: '📐', domain: 'Design', description: 'You design mechanical parts and systems using computer software.', what_you_learn: 'AutoCAD, SolidWorks, CATIA, GD&T, manufacturing processes', what_you_do: 'Creating 3D models, drafting designs, working with manufacturing teams', salary: '3 LPA to 18 LPA', companies: 'Tata Motors, Mahindra, L&T, auto companies' },
    { id: 26, title: 'Manufacturing Engineer', icon: '🏭', domain: 'Manufacturing', description: 'You design and optimise manufacturing processes.', what_you_learn: 'Lean manufacturing, Six Sigma, CNC, production planning, quality', what_you_do: 'Improving production lines, reducing waste, managing quality', salary: '3 LPA to 20 LPA', companies: 'Tata, Mahindra, Bajaj, manufacturing companies' },
    { id: 27, title: 'Thermal Engineer', icon: '🌡️', domain: 'Thermal', description: 'You design systems that manage heat in engines and machines.', what_you_learn: 'Thermodynamics, CFD, ANSYS, heat transfer, fluid mechanics', what_you_do: 'Simulating heat flow, designing cooling systems, testing engines', salary: '4 LPA to 22 LPA', companies: 'ISRO, DRDO, auto companies, power plants' },
    { id: 28, title: 'Automation Engineer', icon: '⚙️', domain: 'Automation', description: 'You automate mechanical and industrial processes.', what_you_learn: 'PLC, SCADA, robotics, pneumatics, hydraulics, Python', what_you_do: 'Programming automation systems, maintaining PLCs, reducing manual work', salary: '4 LPA to 25 LPA', companies: 'Siemens, ABB, manufacturing companies' },
    { id: 29, title: 'Product Design Engineer', icon: '🎨', domain: 'Design', description: 'You design physical products from concept to production.', what_you_learn: 'SolidWorks, prototyping, materials science, user research, Fusion 360', what_you_do: 'Designing products, building prototypes, working with manufacturers', salary: '4 LPA to 22 LPA', companies: 'Consumer product companies, startups, design firms' },
    { id: 30, title: 'Quality Engineer', icon: '✅', domain: 'Quality', description: 'You ensure products meet quality standards before reaching customers.', what_you_learn: 'Six Sigma, ISO standards, statistical analysis, testing methods', what_you_do: 'Inspecting products, running quality tests, writing reports', salary: '3 LPA to 18 LPA', companies: 'Any manufacturing company' },
    { id: 31, title: 'Energy Engineer', icon: '⚡', domain: 'Energy', description: 'You design systems that generate and manage energy efficiently.', what_you_learn: 'Renewable energy systems, power plants, energy auditing, simulation', what_you_do: 'Designing energy systems, auditing consumption, optimising efficiency', salary: '4 LPA to 22 LPA', companies: 'Power companies, NTPC, solar companies, ISRO' },
  ],
  Civil: [
    { id: 32, title: 'Structural Engineer', icon: '🏗️', domain: 'Structural', description: 'You design the structural framework of buildings and bridges.', what_you_learn: 'STAAD Pro, AutoCAD, structural analysis, RCC design, steel design', what_you_do: 'Designing structures, analysing loads, reviewing construction', salary: '3 LPA to 20 LPA', companies: 'L&T, construction firms, government' },
    { id: 33, title: 'Construction Manager', icon: '👷', domain: 'Construction', description: 'You manage construction projects from start to finish.', what_you_learn: 'Project management, MS Project, contracts, budgeting, site management', what_you_do: 'Managing teams, tracking progress, ensuring quality on site', salary: '4 LPA to 25 LPA', companies: 'L&T, Shapoorji, DLF, government projects' },
    { id: 34, title: 'Urban Planner', icon: '🏙️', domain: 'Planning', description: 'You plan cities, roads, and public infrastructure.', what_you_learn: 'GIS, AutoCAD, urban design principles, zoning laws, transport planning', what_you_do: 'Designing city layouts, planning roads, working with government', salary: '4 LPA to 22 LPA', companies: 'Government bodies, urban development authorities' },
    { id: 35, title: 'Geotechnical Engineer', icon: '🌍', domain: 'Geotechnical', description: 'You study soil and rock to design safe foundations.', what_you_learn: 'Soil mechanics, foundation design, PLAXIS, site investigation', what_you_do: 'Testing soil, designing foundations, advising on ground conditions', salary: '3 LPA to 18 LPA', companies: 'Construction firms, government, mining' },
    { id: 36, title: 'Environmental Engineer', icon: '🌱', domain: 'Environment', description: 'You design systems to protect the environment from pollution.', what_you_learn: 'Water treatment, waste management, environmental laws, GIS', what_you_do: 'Designing treatment plants, conducting environmental audits', salary: '3 LPA to 18 LPA', companies: 'Government, NGOs, construction companies' },
    { id: 37, title: 'Transportation Engineer', icon: '🚗', domain: 'Transportation', description: 'You design roads, highways, and transport systems.', what_you_learn: 'Highway design, traffic analysis, AutoCAD, transport modelling', what_you_do: 'Designing roads, analysing traffic, planning transport networks', salary: '3 LPA to 20 LPA', companies: 'NHAI, government, construction firms' },
    { id: 38, title: 'Water Resources Engineer', icon: '💧', domain: 'Water', description: 'You design systems to manage water supply and floods.', what_you_learn: 'Hydraulics, hydrology, dam design, irrigation systems, GIS', what_you_do: 'Designing dams, managing water supply, flood analysis', salary: '3 LPA to 18 LPA', companies: 'Government, irrigation departments, NGOs' },
  ],
  Management: [
    { id: 39, title: 'Product Manager', icon: '📋', domain: 'Product', description: 'You decide what gets built and why in a tech company.', what_you_learn: 'Product thinking, roadmapping, user research, data analysis, agile', what_you_do: 'Defining features, working with engineers, tracking metrics', salary: '8 LPA to 50 LPA', companies: 'Any product company, startups' },
    { id: 40, title: 'Business Analyst', icon: '📈', domain: 'Business', description: 'You bridge the gap between business needs and technology solutions.', what_you_learn: 'Requirements gathering, SQL, Excel, process mapping, stakeholder management', what_you_do: 'Analysing business problems, writing requirements, coordinating teams', salary: '5 LPA to 28 LPA', companies: 'Consulting firms, banks, IT companies' },
    { id: 41, title: 'Project Manager', icon: '🗂️', domain: 'Management', description: 'You lead projects and teams to deliver results on time.', what_you_learn: 'PMP, agile, budgeting, risk management, MS Project', what_you_do: 'Planning projects, managing teams, tracking deadlines, reporting', salary: '6 LPA to 35 LPA', companies: 'Any large company or consulting firm' },
    { id: 42, title: 'Operations Manager', icon: '⚙️', domain: 'Operations', description: 'You optimise the day to day operations of a company.', what_you_learn: 'Process improvement, Six Sigma, supply chain, ERP systems', what_you_do: 'Improving processes, managing resources, reducing costs', salary: '5 LPA to 30 LPA', companies: 'Manufacturing, ecommerce, logistics companies' },
    { id: 43, title: 'Marketing Analyst', icon: '📣', domain: 'Marketing', description: 'You analyse marketing data to improve campaigns and growth.', what_you_learn: 'Google Analytics, SQL, Excel, A/B testing, digital marketing', what_you_do: 'Analysing campaign performance, finding growth opportunities', salary: '4 LPA to 22 LPA', companies: 'Any consumer company, startups, agencies' },
    { id: 44, title: 'Supply Chain Manager', icon: '🚚', domain: 'Supply Chain', description: 'You manage the flow of goods from supplier to customer.', what_you_learn: 'SAP, logistics, inventory management, supplier relations', what_you_do: 'Managing suppliers, optimising delivery, reducing costs', salary: '5 LPA to 28 LPA', companies: 'Amazon, Flipkart, manufacturing, retail' },
    { id: 45, title: 'HR Manager', icon: '👥', domain: 'Human Resources', description: 'You manage people, hiring, and culture in an organisation.', what_you_learn: 'HR policies, recruitment, performance management, labour laws', what_you_do: 'Hiring talent, managing employee relations, building culture', salary: '4 LPA to 22 LPA', companies: 'Every company' },
  ],
  Other: [
    { id: 46, title: 'Software Engineer', icon: '💻', domain: 'Technology', description: 'You build software applications that millions of people use.', what_you_learn: 'Programming, data structures, algorithms, system design', what_you_do: 'Writing code, solving problems, building products', salary: '6 LPA to 40 LPA', companies: 'Any tech company' },
    { id: 47, title: 'Data Analyst', icon: '📊', domain: 'Data', description: 'You analyse data to help companies make better decisions.', what_you_learn: 'SQL, Excel, Python, statistics, data visualisation', what_you_do: 'Cleaning data, building dashboards, presenting insights', salary: '4 LPA to 25 LPA', companies: 'Any data driven company' },
    { id: 48, title: 'UX Designer', icon: '🎨', domain: 'Design', description: 'You design how products look and feel to users.', what_you_learn: 'Figma, user research, wireframing, prototyping, design systems', what_you_do: 'Designing interfaces, conducting user research, building prototypes', salary: '5 LPA to 30 LPA', companies: 'Any product company, design agencies' },
    { id: 49, title: 'Digital Marketer', icon: '📣', domain: 'Marketing', description: 'You grow businesses through online marketing channels.', what_you_learn: 'SEO, social media, Google Ads, content marketing, analytics', what_you_do: 'Running campaigns, growing traffic, measuring results', salary: '3 LPA to 20 LPA', companies: 'Any consumer company, agencies, freelancing' },
    { id: 50, title: 'Content Creator', icon: '✍️', domain: 'Content', description: 'You create written, video, or audio content for audiences.', what_you_learn: 'Writing, video editing, SEO, social media strategy, storytelling', what_you_do: 'Creating content, growing audiences, working with brands', salary: '2 LPA to 20 LPA', companies: 'Media companies, freelancing, own channel' },
    { id: 51, title: 'Entrepreneur', icon: '🚀', domain: 'Business', description: 'You build your own business from scratch.', what_you_learn: 'Business model design, fundraising, marketing, product, operations', what_you_do: 'Building a product, finding customers, growing a team', salary: 'Variable — 0 to unlimited', companies: 'Your own company' },
    { id: 52, title: 'Finance Analyst', icon: '💰', domain: 'Finance', description: 'You analyse financial data to help companies make investment decisions.', what_you_learn: 'Excel, financial modelling, valuation, accounting, Bloomberg', what_you_do: 'Building financial models, analysing investments, writing reports', salary: '5 LPA to 35 LPA', companies: 'Banks, investment firms, consulting' },
  ],
}

// TODO: Replace with GET /api/onboarding/questions?field=${field}&type=DISCOVERY
const DISCOVERY_QUESTIONS_BY_FIELD = {
  CS: [
    'When you picture yourself working in tech 5 years from now, what are you doing?',
    'Do you prefer building things people use or finding patterns in data?',
    'Are you more excited by frontend — what users see — or backend — how things work?',
    'How comfortable are you writing code every single day as your primary job?',
    'Would you rather build a product, secure a system, or analyse data?',
    'Do you enjoy working with databases and information systems?',
    'Are you interested in how large systems like Google or Amazon work internally?',
    'Do you prefer working on one deep technical problem or managing multiple things?',
    'How do you feel about cloud platforms like AWS or Azure?',
    'What excites you more — creating something new or optimising something existing?',
  ],
  IT: [
    'Do you prefer managing systems or building new software?',
    'Are you interested in how networks and servers work?',
    'Would you rather support users or build tools for them?',
    'How comfortable are you with hardware and operating systems?',
    'Do you enjoy troubleshooting and solving infrastructure problems?',
    'Are you interested in cybersecurity and protecting systems?',
    'Would you rather work with databases or with networks?',
    'Do you prefer working in a structured enterprise environment or a startup?',
    'How comfortable are you with cloud platforms?',
    'What matters more to you — reliability of systems or speed of development?',
  ],
  Electronics: [
    'Do you prefer working with hardware or writing software?',
    'Are you more interested in circuits or in the systems they power?',
    'Would you rather design a chip or build a robot?',
    'How comfortable are you with programming microcontrollers?',
    'Do you enjoy working with sensors and physical devices?',
    'Are you interested in communication systems like 5G or satellite?',
    'Would you rather work in a lab or at a manufacturing site?',
    'How do you feel about simulation tools like MATLAB or ANSYS?',
    'Are you interested in IoT and connecting devices to the internet?',
    'What excites you more — defence and space or consumer electronics?',
  ],
  Mechanical: [
    'Do you prefer designing products or managing their production?',
    'Are you more interested in thermal systems or structural design?',
    'Would you rather work on automobiles, aircraft, or industrial machines?',
    'How comfortable are you with CAD tools like SolidWorks or AutoCAD?',
    'Do you enjoy analysing forces, heat, or fluid flow?',
    'Are you interested in automation and robotics?',
    'Would you rather work on product design or quality control?',
    'How do you feel about working on manufacturing shop floors?',
    'Are you interested in renewable energy and sustainable systems?',
    'What matters more to you — precision engineering or innovation?',
  ],
  Civil: [
    'Do you prefer designing structures or managing construction projects?',
    'Are you more interested in buildings, roads, or water systems?',
    'Would you rather work in urban planning or environmental engineering?',
    'How comfortable are you with tools like AutoCAD or STAAD Pro?',
    'Do you enjoy working on site or in an office doing design work?',
    'Are you interested in sustainable and green construction?',
    'Would you rather work for the government or a private company?',
    'How do you feel about geotechnical and foundation work?',
    'Are you interested in transportation and highway design?',
    'What matters more to you — large infrastructure projects or detailed design work?',
  ],
  Management: [
    'Do you prefer leading people or analysing data to make decisions?',
    'Are you more interested in product strategy or business operations?',
    'Would you rather work in a startup or a large corporation?',
    'How comfortable are you with data and numbers in your decision making?',
    'Do you enjoy understanding customer behaviour and market trends?',
    'Are you interested in finance and investment analysis?',
    'Would you rather manage projects or manage people?',
    'How do you feel about working with multiple teams and stakeholders?',
    'Are you interested in supply chain and logistics?',
    'What matters more to you — growth and revenue or process and efficiency?',
  ],
  Other: [
    'When you picture yourself working 5 years from now, what are you doing?',
    'Do you prefer technical work or creative work?',
    'Are you more energised by solving problems or communicating ideas?',
    'Would you rather build something, analyse something, or manage something?',
    'How comfortable are you with technology in your day to day work?',
    'Do you prefer working with data, people, or products?',
    'Are you interested in starting your own business someday?',
    'Would you rather work for a large company or a small startup?',
    'How important is creativity in the work you want to do?',
    'What matters more to you — stability or high growth potential?',
  ],
}

const FIELDS = ['CS', 'IT', 'Electronics', 'Mechanical', 'Civil', 'Management', 'Other']
const BRANCHES = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'Management', 'Other']
const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8]
const CLARITY_OPTIONS = [
  { value: 'yes', label: 'Yes, I know exactly what I want' },
  { value: 'maybe', label: 'I have some idea but not sure' },
  { value: 'no', label: 'I have no idea yet' },
]

export default function OnboardingPage() {
  const navigate = useNavigate()

  const [screen, setScreen] = useState('welcome')
  const [branch, setBranch] = useState('')
  const [semester, setSemester] = useState('')
  const [interestedOtherField, setInterestedOtherField] = useState('')
  const [clarity, setClarity] = useState('')
  const [selectedField, setSelectedField] = useState('')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [detailGoal, setDetailGoal] = useState(null)
  const [confirmedGoal, setConfirmedGoal] = useState(null)
  const [whatYouKnow, setWhatYouKnow] = useState('')
  const [generatedQuestions, setGeneratedQuestions] = useState([])
  const [assessAnswers, setAssessAnswers] = useState({})
  const [loadingMessage, setLoadingMessage] = useState('')

  const goals = GOALS_BY_FIELD[selectedField] || []
  const questions = DISCOVERY_QUESTIONS_BY_FIELD[selectedField] || []
  const totalQuestions = clarity === 'yes' ? 0 : clarity === 'maybe' ? 5 : 10
  const visibleQuestions = questions.slice(0, totalQuestions)

  // ── STYLES ──
  const bg = {
    minHeight: '100vh',
    background: '#04080f',
    fontFamily: 'system-ui, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  }

  const card = {
    width: '100%',
    maxWidth: 560,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 24,
    padding: '40px 36px',
    position: 'relative',
    overflow: 'hidden',
  }

  const title = {
    fontSize: 24,
    fontWeight: 900,
    color: 'white',
    marginBottom: 8,
    letterSpacing: '-0.02em',
  }

  const subtitle = {
    fontSize: 14,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 32,
    lineHeight: 1.6,
  }

  const btn = {
    width: '100%',
    padding: '14px',
    borderRadius: 12,
    border: 'none',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    color: 'white',
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
    marginTop: 8,
    boxShadow: '0 0 20px rgba(59,130,246,0.2)',
  }

  const btnOff = {
    ...btn,
    background: 'rgba(255,255,255,0.06)',
    color: 'rgba(255,255,255,0.25)',
    cursor: 'not-allowed',
    boxShadow: 'none',
  }

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '14px 16px',
    borderRadius: 12,
    border: '1.5px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.04)',
    color: 'white',
    fontSize: 14,
    outline: 'none',
    resize: 'none',
    lineHeight: 1.6,
  }

  const labelStyle = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: 'rgba(255,255,255,0.55)',
    marginBottom: 10,
  }

  const optionBtn = (selected) => ({
    padding: '11px 16px',
    borderRadius: 10,
    border: `1.5px solid ${selected ? 'rgba(59,130,246,0.6)' : 'rgba(255,255,255,0.07)'}`,
    background: selected ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.02)',
    color: selected ? '#60a5fa' : 'rgba(255,255,255,0.45)',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s',
  })

  const progressBar = (pct, color = 'linear-gradient(90deg, #3b82f6, #8b5cf6)') => (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
          Question {currentQ + 1} of {visibleQuestions.length || 7}
        </span>
        <span style={{ fontSize: 12, color: '#60a5fa' }}>{Math.round(pct)}%</span>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 4, transition: 'width 0.4s ease' }} />
      </div>
    </div>
  )

  // ── HANDLERS ──
  const handleIntroNext = () => {
    if (!branch || !semester || !clarity) return
    const field = interestedOtherField || branch
    setSelectedField(field)
    if (clarity === 'yes') {
      setScreen('goals')
    } else {
      setCurrentQ(0)
      setScreen('questions')
    }
  }

  const handleAnswerNext = () => {
    if (!currentAnswer.trim()) return
    const updated = { ...answers, [currentQ]: currentAnswer }
    setAnswers(updated)
    setCurrentAnswer('')
    if (currentQ + 1 >= visibleQuestions.length) {
      setScreen('goals')
    } else {
      setCurrentQ(currentQ + 1)
    }
  }

  const handleConfirmGoal = () => {
    setConfirmedGoal(detailGoal)
    setScreen('whatyouknow')
  }

  const handleWhatYouKnowNext = async () => {
    if (!whatYouKnow.trim()) return
    setLoadingMessage('Generating your personalised assessment questions...')
    setScreen('loading')

    // TODO: Replace with POST /api/onboarding/generate-questions
    // const res = await api.post('/api/onboarding/generate-questions', {
    //   careerGoal: confirmedGoal.title,
    //   whatYouKnow: whatYouKnow
    // })
    // setGeneratedQuestions(res.data.questions)

    // DUMMY questions for now
    setTimeout(() => {
      setGeneratedQuestions([
        `You mentioned some background — what specific ${confirmedGoal?.title} concepts are you most confident about?`,
        `Have you ever built a real project related to ${confirmedGoal?.title}? Describe it briefly.`,
        `What is the biggest gap you feel between where you are now and being a ${confirmedGoal?.title}?`,
        `Which tools or technologies have you actually used hands-on so far?`,
        `How many hours per week can you realistically dedicate to learning right now?`,
        `Have you tried learning ${confirmedGoal?.title} before and stopped? What happened?`,
        `Where do you see yourself in 6 months if you follow this roadmap consistently?`,
      ])
      setCurrentQ(0)
      setCurrentAnswer('')
      setScreen('assessment')
    }, 2500)
  }

  const handleAssessNext = async () => {
    if (!currentAnswer.trim()) return
    const updated = { ...assessAnswers, [currentQ]: currentAnswer }
    setAssessAnswers(updated)
    setCurrentAnswer('')

    if (currentQ + 1 >= generatedQuestions.length) {
      setLoadingMessage('Building your personalised roadmap...')
      setScreen('loading')

      // TODO: Replace with POST /api/onboarding/generate-roadmap
      // const res = await api.post('/api/onboarding/generate-roadmap', {
      //   branch: branch,
      //   semester: semester,
      //   clarityAnswer: clarity,
      //   discoveryAnswers: Object.values(answers),
      //   confirmedGoal: confirmedGoal.title,
      //   whatYouKnow: whatYouKnow,
      //   assessmentQuestions: generatedQuestions,
      //   assessmentAnswers: Object.values(updated),
      // })

      setTimeout(() => navigate('/dashboard'), 3500)
    } else {
      setCurrentQ(currentQ + 1)
    }
  }

  // ── SCREEN: WELCOME ──
if (screen === 'welcome') return (
  <div style={{
    minHeight: '100vh',
    background: '#04080f',
    fontFamily: 'system-ui, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    position: 'relative',
    overflow: 'hidden',
  }}>

    {/* Animated background orbs */}
    <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.08), transparent 70%)', filter: 'blur(60px)', animation: 'pulse1 8s ease-in-out infinite', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.08), transparent 70%)', filter: 'blur(60px)', animation: 'pulse2 10s ease-in-out infinite', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.04), transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

    {/* Grid overlay */}
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

    <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 640, textAlign: 'center' }}>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 56 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(59,130,246,0.3)' }}>
          <span style={{ color: 'white', fontWeight: 900, fontSize: 18 }}>C</span>
        </div>
        <span style={{ color: 'white', fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em' }}>ClariPath</span>
      </div>

      {/* Main heading */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 20, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.18)', color: '#93c5fd', fontSize: 12, fontWeight: 600, marginBottom: 24, letterSpacing: '0.05em' }}>
          YOUR JOURNEY STARTS HERE
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.2rem)', fontWeight: 900, color: 'white', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 20 }}>
          The next 5 minutes will{' '}
          <span style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            shape your entire roadmap
          </span>
        </h1>

        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
          We are about to ask you a few questions. Your answers will be used to build a personalised 16-week roadmap — one that no other student will have.
        </p>
      </div>

      {/* 3 promise cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 40 }}>
        {[
          { icon: '🎯', title: 'Be honest', desc: 'There are no right or wrong answers. The system works better when you are real.' },
          { icon: '🧠', title: 'Be detailed', desc: 'The more context you give, the more accurate your roadmap will be.' },
          { icon: '⏱️', title: 'Take your time', desc: 'Do not rush. These answers decide your entire learning path.' },
        ].map((item, i) => (
          <div key={i} style={{
            padding: '20px 16px',
            borderRadius: 16,
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
            textAlign: 'center',
            transition: 'all 0.3s ease',
          }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 6 }}>{item.title}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      {/* What happens next */}
      <div style={{ padding: '20px 24px', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 40, textAlign: 'left' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 16, letterSpacing: '0.06em' }}>WHAT HAPPENS NEXT</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { step: '01', text: 'Tell us your branch and how clear you are about your career', color: '#3b82f6' },
            { step: '02', text: 'Answer discovery questions so we understand what suits you', color: '#8b5cf6' },
            { step: '03', text: 'Pick a career goal and explore it in detail before committing', color: '#06b6d4' },
            { step: '04', text: 'Tell us what you already know — we build on top of that', color: '#10b981' },
            { step: '05', text: 'Answer 7 personalised questions — your roadmap is generated', color: '#f59e0b' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${item.color}18`, border: `1px solid ${item.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: item.color }}>{item.step}</span>
              </div>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => setScreen('intro')}
        style={{
          width: '100%',
          maxWidth: 400,
          padding: '16px 32px',
          borderRadius: 14,
          border: 'none',
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          color: 'white',
          fontWeight: 800,
          fontSize: 15,
          cursor: 'pointer',
          boxShadow: '0 0 30px rgba(59,130,246,0.25)',
          transition: 'all 0.3s ease',
          letterSpacing: '-0.01em',
        }}
        onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 40px rgba(59,130,246,0.35)' }}
        onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 0 30px rgba(59,130,246,0.25)' }}
      >
        I am ready — Let's begin →
      </button>

      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', marginTop: 16 }}>
        Takes about 5 minutes · No right or wrong answers
      </p>
    </div>

    <style>{`
      @keyframes pulse1 {
        0%, 100% { transform: scale(1); opacity: 0.6; }
        50% { transform: scale(1.1); opacity: 1; }
      }
      @keyframes pulse2 {
        0%, 100% { transform: scale(1.1); opacity: 1; }
        50% { transform: scale(1); opacity: 0.6; }
      }
    `}</style>
  </div>
)

  // ── SCREEN: INTRO ──
  if (screen === 'intro') return (
    <div style={bg}>
      <div style={{ ...card, maxWidth: 600 }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 'bold' }}>C</span>
            </div>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>ClariPath</span>
          </div>

          <h2 style={title}>Let's find your path</h2>
          <p style={subtitle}>Tell us a bit about yourself so we can build a roadmap made specifically for you.</p>

          {/* Branch */}
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>What is your college branch?</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {BRANCHES.map((b, i) => (
                <button key={b} onClick={() => setBranch(FIELDS[i])}
                  style={optionBtn(branch === FIELDS[i])}>
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Semester */}
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Which semester are you in?</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 6 }}>
              {SEMESTERS.map(s => (
                <button key={s} onClick={() => setSemester(s)}
                  style={{ ...optionBtn(semester === s), textAlign: 'center', padding: '10px 4px' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Interest in other field */}
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Are you interested in a different field?</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
              {[
                { value: '', label: 'No, I want to stay in my branch' },
                { value: 'show', label: 'Yes, I want to explore another field' },
              ].map(opt => (
                <button key={opt.label}
                  onClick={() => { setInterestedOtherField(opt.value === 'show' ? 'CS' : ''); }}
                  style={optionBtn(opt.value === '' ? interestedOtherField === '' : interestedOtherField !== '')}>
                  {opt.label}
                </button>
              ))}
            </div>

            {interestedOtherField !== '' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
                {FIELDS.map(f => (
                  <button key={f} onClick={() => setInterestedOtherField(f)}
                    style={optionBtn(interestedOtherField === f)}>
                    {f}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clarity */}
          <div style={{ marginBottom: 32 }}>
            <label style={labelStyle}>Do you know what career you want?</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {CLARITY_OPTIONS.map(c => (
                <button key={c.value} onClick={() => setClarity(c.value)}
                  style={optionBtn(clarity === c.value)}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleIntroNext}
            style={branch && semester && clarity ? btn : btnOff}
            disabled={!branch || !semester || !clarity}>
            Continue →
          </button>
        </div>
      </div>
    </div>
  )

  // ── SCREEN: QUESTIONS ──
  if (screen === 'questions') {
    const pct = (currentQ / visibleQuestions.length) * 100
    return (
      <div style={bg}>
        <div style={card}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            {progressBar(pct)}
            <h2 style={{ ...title, fontSize: 19, marginBottom: 28, lineHeight: 1.5 }}>
              {visibleQuestions[currentQ]}
            </h2>
            <textarea value={currentAnswer} onChange={e => setCurrentAnswer(e.target.value)}
              placeholder="Type your answer here..." rows={4} style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
            <button onClick={handleAnswerNext} style={currentAnswer.trim() ? btn : btnOff} disabled={!currentAnswer.trim()}>
              {currentQ + 1 >= visibleQuestions.length ? 'See My Career Matches →' : 'Next →'}
            </button>
            {currentQ > 0 && (
              <button onClick={() => { setCurrentQ(currentQ - 1); setCurrentAnswer(answers[currentQ - 1] || '') }}
                style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', background: 'transparent', color: 'rgba(255,255,255,0.35)', fontSize: 13, cursor: 'pointer', marginTop: 8 }}>
                ← Back
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── SCREEN: GOALS ──
  if (screen === 'goals') return (
    <div style={{ ...bg, alignItems: 'flex-start', paddingTop: 48 }}>
      <div style={{ width: '100%', maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 20, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#93c5fd', fontSize: 12, fontWeight: 600, marginBottom: 14 }}>
            ● Based on your answers
          </div>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: 'white', marginBottom: 8, letterSpacing: '-0.02em' }}>
            Here are your career matches
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>
            Tap any goal to learn more before deciding
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 16px 40px' }}>
          {goals.map((goal, i) => (
            <button key={goal.id} onClick={() => { setDetailGoal(goal); setScreen('goal-detail') }}
              style={{
                padding: '18px 22px', borderRadius: 16,
                border: `1.5px solid ${i === 0 ? 'rgba(59,130,246,0.45)' : 'rgba(255,255,255,0.06)'}`,
                background: i === 0 ? 'rgba(59,130,246,0.07)' : 'rgba(255,255,255,0.02)',
                cursor: 'pointer', textAlign: 'left', position: 'relative', overflow: 'hidden',
              }}>
              {i === 0 && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }} />}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: '1px solid rgba(255,255,255,0.06)' }}>
                    {goal.icon}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>{goal.title}</span>
                      {i === 0 && <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.25)' }}>TOP MATCH</span>}
                    </div>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{goal.domain}</span>
                  </div>
                </div>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Tap to explore →</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  // ── SCREEN: GOAL DETAIL ──
  if (screen === 'goal-detail' && detailGoal) return (
    <div style={{ ...bg, alignItems: 'flex-start', paddingTop: 40 }}>
      <div style={{ width: '100%', maxWidth: 580, margin: '0 auto' }}>
        <button onClick={() => setScreen('goals')}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontSize: 13, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
          ← Back to all goals
        </button>

        <div style={{ ...card, padding: 36 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
              {detailGoal.icon}
            </div>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: 'white', marginBottom: 3 }}>{detailGoal.title}</h2>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{detailGoal.domain}</span>
            </div>
          </div>

          {[
            { label: '📌 What is this career?', value: detailGoal.description },
            { label: '📚 What will you learn?', value: detailGoal.what_you_learn },
            { label: '💼 What will you do daily?', value: detailGoal.what_you_do },
            { label: '💰 Salary range in India', value: detailGoal.salary },
            { label: '🏢 Top companies hiring', value: detailGoal.companies },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 14, padding: '14px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 5 }}>{item.label}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{item.value}</div>
            </div>
          ))}

          <button onClick={handleConfirmGoal} style={{ ...btn, marginTop: 16 }}>
            Yes, this is my goal — Start assessment →
          </button>
        </div>
      </div>
    </div>
  )

  // ── SCREEN: WHAT YOU KNOW ──
  if (screen === 'whatyouknow') return (
    <div style={bg}>
      <div style={card}>
        <div style={{ position: 'absolute', top: -80, left: -80, width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1), transparent)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 20, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', color: '#c4b5fd', fontSize: 11, fontWeight: 600, marginBottom: 24 }}>
            Goal confirmed — {confirmedGoal?.title}
          </div>

          <h2 style={title}>What do you already know?</h2>
          <p style={subtitle}>
            Tell us everything you have learned so far — courses, projects, languages, tools, anything.
            Be honest and detailed. The more you tell us, the better your assessment will be.
          </p>

          <div style={{ padding: '12px 16px', borderRadius: 12, background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', marginBottom: 20 }}>
            <p style={{ fontSize: 12, color: '#93c5fd', margin: 0, lineHeight: 1.6 }}>
              💡 <strong>Take your time with this.</strong> This single answer is used to generate 7 personalised questions just for you. A detailed answer means better questions and a better roadmap.
            </p>
          </div>

          <textarea
            value={whatYouKnow}
            onChange={e => setWhatYouKnow(e.target.value)}
            placeholder="Example: I know basic C++ from college, built a simple calculator project, watched some YouTube tutorials on Java but never built anything with it, know basic HTML and CSS, tried Python for 2 weeks but stopped..."
            rows={7}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          />

          <button onClick={handleWhatYouKnowNext}
            style={whatYouKnow.trim().length > 20 ? { ...btn, background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' } : btnOff}
            disabled={whatYouKnow.trim().length <= 20}>
            Generate My Assessment Questions →
          </button>
        </div>
      </div>
    </div>
  )

  // ── SCREEN: ASSESSMENT ──
  if (screen === 'assessment') {
    const pct = (currentQ / generatedQuestions.length) * 100
    return (
      <div style={bg}>
        <div style={card}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 20, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', color: '#c4b5fd', fontSize: 11, fontWeight: 600, marginBottom: 20 }}>
              Skill Assessment — {confirmedGoal?.title}
            </div>
            {progressBar(pct, 'linear-gradient(90deg, #8b5cf6, #06b6d4)')}
            <h2 style={{ ...title, fontSize: 18, marginBottom: 24, lineHeight: 1.5 }}>
              {generatedQuestions[currentQ]}
            </h2>
            <textarea value={currentAnswer} onChange={e => setCurrentAnswer(e.target.value)}
              placeholder="Type your answer here..." rows={5} style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
            <button onClick={handleAssessNext}
              style={currentAnswer.trim() ? { ...btn, background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' } : btnOff}
              disabled={!currentAnswer.trim()}>
              {currentQ + 1 >= generatedQuestions.length ? 'Build My Roadmap →' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── SCREEN: LOADING ──
  if (screen === 'loading') return (
    <div style={{ ...bg, flexDirection: 'column', gap: 24 }}>
      <div style={{ width: 64, height: 64, borderRadius: 18, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(59,130,246,0.3)' }}>
        <svg style={{ animation: 'spin 1s linear infinite', width: 30, height: 30 }} fill="none" viewBox="0 0 24 24">
          <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
          <path style={{ opacity: 0.75 }} fill="white" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
      <div style={{ textAlign: 'center', maxWidth: 360 }}>
        <h2 style={{ fontSize: 20, fontWeight: 900, color: 'white', marginBottom: 10 }}>{loadingMessage}</h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
          This takes a few seconds. We are analysing everything you told us to build something truly personalised.
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}