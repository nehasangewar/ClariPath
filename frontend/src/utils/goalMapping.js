// ── GOAL MAPPING DATA ──
// Each question has 5 options A-E, each mapping to a career goal title
// Index 0 = Q1, Index 1 = Q2, etc.

export const GOAL_MAPPING = {
  CSE: [
    // Q1
    { A: 'Software Development Engineer', B: 'Artificial Intelligence & Machine Learning', C: 'Cyber Security & Ethical Hacking', D: 'UI / UX Design', E: 'Cloud Computing & DevOps' },
    // Q2
    { A: 'Data Science & Data Analytics', B: 'Artificial Intelligence & Machine Learning', C: 'Cyber Security & Ethical Hacking', D: 'UI / UX Design', E: 'Software Development Engineer' },
    // Q3
    { A: 'Game Development', B: 'Artificial Intelligence & Machine Learning', C: 'UI / UX Design', D: 'Cloud Computing & DevOps', E: 'Software Development Engineer' },
    // Q4
    { A: 'Software Development Engineer', B: 'Data Science & Data Analytics', C: 'Artificial Intelligence & Machine Learning', D: 'Cyber Security & Ethical Hacking', E: 'UI / UX Design' },
    // Q5
    { A: 'Artificial Intelligence & Machine Learning', B: 'Cyber Security & Ethical Hacking', C: 'Game Development', D: 'Internet of Things Development', E: 'Blockchain Development' },
    // Q6
    { A: 'Software Development Engineer', B: 'Data Science & Data Analytics', C: 'UI / UX Design', D: 'Cyber Security & Ethical Hacking', E: 'Cloud Computing & DevOps' },
    // Q7
    { A: 'Internet of Things Development', B: 'Software Development Engineer', C: 'Artificial Intelligence & Machine Learning', D: 'Cloud Computing & DevOps', E: 'Cyber Security & Ethical Hacking' },
    // Q8
    { A: 'Software Development Engineer', B: 'Data Science & Data Analytics', C: 'Artificial Intelligence & Machine Learning', D: 'UI / UX Design', E: 'Game Development' },
    // Q9
    { A: 'Cloud Computing & DevOps', B: 'Artificial Intelligence & Machine Learning', C: 'Data Science & Data Analytics', D: 'Cyber Security & Ethical Hacking', E: 'UI / UX Design' },
    // Q10
    { A: 'Software Development Engineer', B: 'Data Science & Data Analytics', C: 'Artificial Intelligence & Machine Learning', D: 'Cyber Security & Ethical Hacking', E: 'UI / UX Design' },
  ],
  IT: [
    // Same as CSE
    { A: 'Software Development Engineer', B: 'Artificial Intelligence & Machine Learning', C: 'Cyber Security & Ethical Hacking', D: 'UI / UX Design', E: 'Cloud Computing & DevOps' },
    { A: 'Data Science & Data Analytics', B: 'Artificial Intelligence & Machine Learning', C: 'Cyber Security & Ethical Hacking', D: 'UI / UX Design', E: 'Software Development Engineer' },
    { A: 'Game Development', B: 'Artificial Intelligence & Machine Learning', C: 'UI / UX Design', D: 'Cloud Computing & DevOps', E: 'Software Development Engineer' },
    { A: 'Software Development Engineer', B: 'Data Science & Data Analytics', C: 'Artificial Intelligence & Machine Learning', D: 'Cyber Security & Ethical Hacking', E: 'UI / UX Design' },
    { A: 'Artificial Intelligence & Machine Learning', B: 'Cyber Security & Ethical Hacking', C: 'Game Development', D: 'Internet of Things Development', E: 'Blockchain Development' },
    { A: 'Software Development Engineer', B: 'Data Science & Data Analytics', C: 'UI / UX Design', D: 'Cyber Security & Ethical Hacking', E: 'Cloud Computing & DevOps' },
    { A: 'Internet of Things Development', B: 'Software Development Engineer', C: 'Artificial Intelligence & Machine Learning', D: 'Cloud Computing & DevOps', E: 'Cyber Security & Ethical Hacking' },
    { A: 'Software Development Engineer', B: 'Data Science & Data Analytics', C: 'Artificial Intelligence & Machine Learning', D: 'UI / UX Design', E: 'Game Development' },
    { A: 'Cloud Computing & DevOps', B: 'Artificial Intelligence & Machine Learning', C: 'Data Science & Data Analytics', D: 'Cyber Security & Ethical Hacking', E: 'UI / UX Design' },
    { A: 'Software Development Engineer', B: 'Data Science & Data Analytics', C: 'Artificial Intelligence & Machine Learning', D: 'Cyber Security & Ethical Hacking', E: 'UI / UX Design' },
  ],
  Mechanical: [
    // Q1
    { A: 'Design Engineer (CAD/CAE)', B: 'Manufacturing & Production Engineer', C: 'Automobile Engineer', D: 'Thermal / HVAC Engineer', E: 'Industrial / Quality Engineer' },
    // Q2
    { A: 'Design Engineer (CAD/CAE)', B: 'Manufacturing & Production Engineer', C: 'Automobile Engineer', D: 'Thermal / HVAC Engineer', E: 'Robotics & Automation Engineer' },
    // Q3
    { A: 'Design Engineer (CAD/CAE)', B: 'Manufacturing & Production Engineer', C: 'Automobile Engineer', D: 'Thermal / HVAC Engineer', E: 'Industrial / Quality Engineer' },
    // Q4
    { A: 'Design Engineer (CAD/CAE)', B: 'Manufacturing & Production Engineer', C: 'Automobile Engineer', D: 'Thermal / HVAC Engineer', E: 'Robotics & Automation Engineer' },
    // Q5
    { A: 'Design Engineer (CAD/CAE)', B: 'Manufacturing & Production Engineer', C: 'Automobile Engineer', D: 'Thermal / HVAC Engineer', E: 'Robotics & Automation Engineer' },
    // Q6
    { A: 'Design Engineer (CAD/CAE)', B: 'Manufacturing & Production Engineer', C: 'Automobile Engineer', D: 'Thermal / HVAC Engineer', E: 'Government & PSU Mechanical Services' },
    // Q7
    { A: 'Design Engineer (CAD/CAE)', B: 'Manufacturing & Production Engineer', C: 'Automobile Engineer', D: 'Thermal / HVAC Engineer', E: 'Robotics & Automation Engineer' },
    // Q8
    { A: 'Design Engineer (CAD/CAE)', B: 'Manufacturing & Production Engineer', C: 'Automobile Engineer', D: 'Thermal / HVAC Engineer', E: 'Industrial / Quality Engineer' },
    // Q9
    { A: 'Design Engineer (CAD/CAE)', B: 'Manufacturing & Production Engineer', C: 'Automobile Engineer', D: 'Thermal / HVAC Engineer', E: 'Robotics & Automation Engineer' },
    // Q10
    { A: 'Design Engineer (CAD/CAE)', B: 'Manufacturing & Production Engineer', C: 'Automobile Engineer', D: 'Thermal / HVAC Engineer', E: 'Government & PSU Mechanical Services' },
  ],
  Electronics: [
    // Q1
    { A: 'Embedded Systems Engineer', B: 'VLSI Design Engineer', C: 'Communication / RF Engineer', D: 'IoT & Smart Systems Engineer', E: 'Electronics Design & Testing Engineer' },
    // Q2
    { A: 'Electronics Design & Testing Engineer', B: 'VLSI Design Engineer', C: 'Communication / RF Engineer', D: 'Embedded Systems Engineer', E: 'Government & PSU Electronics Services' },
    // Q3
    { A: 'Robotics & Automation Engineer', B: 'VLSI Design Engineer', C: 'Communication / RF Engineer', D: 'IoT & Smart Systems Engineer', E: 'Electronics Design & Testing Engineer' },
    // Q4
    { A: 'Embedded Systems Engineer', B: 'VLSI Design Engineer', C: 'Communication / RF Engineer', D: 'IoT & Smart Systems Engineer', E: 'Electronics Design & Testing Engineer' },
    // Q5
    { A: 'Embedded Systems Engineer', B: 'Communication / RF Engineer', C: 'Electronics Design & Testing Engineer', D: 'IoT & Smart Systems Engineer', E: 'Government & PSU Electronics Services' },
    // Q6
    { A: 'Communication / RF Engineer', B: 'VLSI Design Engineer', C: 'Embedded Systems Engineer', D: 'Electronics Design & Testing Engineer', E: 'Robotics & Automation Engineer' },
    // Q7
    { A: 'Robotics & Automation Engineer', B: 'VLSI Design Engineer', C: 'Communication / RF Engineer', D: 'IoT & Smart Systems Engineer', E: 'Government & PSU Electronics Services' },
    // Q8
    { A: 'Embedded Systems Engineer', B: 'Communication / RF Engineer', C: 'VLSI Design Engineer', D: 'IoT & Smart Systems Engineer', E: 'Government & PSU Electronics Services' },
    // Q9
    { A: 'Robotics & Automation Engineer', B: 'Communication / RF Engineer', C: 'VLSI Design Engineer', D: 'IoT & Smart Systems Engineer', E: 'Robotics & Automation Engineer' },
    // Q10
    { A: 'Embedded Systems Engineer', B: 'Electronics Design & Testing Engineer', C: 'Communication / RF Engineer', D: 'IoT & Smart Systems Engineer', E: 'Government & PSU Electronics Services' },
  ],
  Electrical: [
    // Q1
    { A: 'Power Systems Engineer', B: 'Electrical Design Engineer', C: 'Renewable Energy Engineer', D: 'Control & Instrumentation Engineer', E: 'Government & PSU Electrical Services' },
    // Q2
    { A: 'Power Systems Engineer', B: 'Control & Instrumentation Engineer', C: 'Renewable Energy Engineer', D: 'Electrical Maintenance Engineer', E: 'Government & PSU Electrical Services' },
    // Q3
    { A: 'Power Systems Engineer', B: 'Electrical Design Engineer', C: 'Control & Instrumentation Engineer', D: 'Electrical Maintenance Engineer', E: 'Government & PSU Electrical Services' },
    // Q4
    { A: 'Electrical Machines Engineer', B: 'Electrical Design Engineer', C: 'Renewable Energy Engineer', D: 'Control & Instrumentation Engineer', E: 'Government & PSU Electrical Services' },
    // Q5
    { A: 'Control & Instrumentation Engineer', B: 'Electrical Maintenance Engineer', C: 'Electrical Design Engineer', D: 'Electrical Maintenance Engineer', E: 'Government & PSU Electrical Services' },
    // Q6
    { A: 'Electrical Design Engineer', B: 'Power Systems Engineer', C: 'Renewable Energy Engineer', D: 'Electrical Machines Engineer', E: 'Government & PSU Electrical Services' },
    // Q7
    { A: 'Renewable Energy Engineer', B: 'Electrical Design Engineer', C: 'Electrical Machines Engineer', D: 'Electrical Maintenance Engineer', E: 'Government & PSU Electrical Services' },
    // Q8
    { A: 'Power Systems Engineer', B: 'Control & Instrumentation Engineer', C: 'Electrical Maintenance Engineer', D: 'Electrical Machines Engineer', E: 'Government & PSU Electrical Services' },
    // Q9
    { A: 'Electrical Machines Engineer', B: 'Power Systems Engineer', C: 'Renewable Energy Engineer', D: 'Control & Instrumentation Engineer', E: 'Government & PSU Electrical Services' },
    // Q10
    { A: 'Power Systems Engineer', B: 'Electrical Design Engineer', C: 'Renewable Energy Engineer', D: 'Control & Instrumentation Engineer', E: 'Government & PSU Electrical Services' },
  ],
  Civil: [
    // Q1
    { A: 'Structural Design Engineer', B: 'Construction & Site Engineer', C: 'Transportation / Highway Engineer', D: 'Geotechnical Engineer', E: 'Urban Planning & Smart City Engineer' },
    // Q2
    { A: 'Environmental Engineer', B: 'Transportation / Highway Engineer', C: 'Structural Design Engineer', D: 'Geotechnical Engineer', E: 'Government & PSU Civil Services' },
    // Q3
    { A: 'Transportation / Highway Engineer', B: 'Construction & Site Engineer', C: 'Environmental Engineer', D: 'Structural Design Engineer', E: 'Geotechnical Engineer' },
    // Q4
    { A: 'Environmental Engineer', B: 'Structural Design Engineer', C: 'Urban Planning & Smart City Engineer', D: 'Construction & Site Engineer', E: 'Geotechnical Engineer' },
    // Q5
    { A: 'Government & PSU Civil Services', B: 'Structural Design Engineer', C: 'Construction & Site Engineer', D: 'Geotechnical Engineer', E: 'Environmental Engineer' },
    // Q6
    { A: 'Structural Design Engineer', B: 'Construction & Site Engineer', C: 'Transportation / Highway Engineer', D: 'Geotechnical Engineer', E: 'Government & PSU Civil Services' },
    // Q7
    { A: 'Urban Planning & Smart City Engineer', B: 'Structural Design Engineer', C: 'Transportation / Highway Engineer', D: 'Geotechnical Engineer', E: 'Construction & Site Engineer' },
    // Q8
    { A: 'Government & PSU Civil Services', B: 'Structural Design Engineer', C: 'Transportation / Highway Engineer', D: 'Geotechnical Engineer', E: 'Construction & Site Engineer' },
    // Q9
    { A: 'Environmental Engineer', B: 'Structural Design Engineer', C: 'Transportation / Highway Engineer', D: 'Geotechnical Engineer', E: 'Urban Planning & Smart City Engineer' },
    // Q10
    { A: 'Government & PSU Civil Services', B: 'Structural Design Engineer', C: 'Transportation / Highway Engineer', D: 'Geotechnical Engineer', E: 'Urban Planning & Smart City Engineer' },
  ],
  AI_ML: [
    // Q1
    { A: 'Data Scientist', B: 'AI Research Scientist', C: 'AI Product Engineer', D: 'Computer Vision Engineer', E: 'NLP Engineer' },
    // Q2
    { A: 'Machine Learning Engineer', B: 'AI Research Scientist', C: 'AI Product Engineer', D: 'Government / Research AI Roles', E: 'Data Scientist' },
    // Q3
    { A: 'Data Scientist', B: 'AI Research Scientist', C: 'AI Product Engineer', D: 'Computer Vision Engineer', E: 'NLP Engineer' },
    // Q4
    { A: 'Machine Learning Engineer', B: 'AI Research Scientist', C: 'AI Product Engineer', D: 'Computer Vision Engineer', E: 'NLP Engineer' },
    // Q5
    { A: 'Data Scientist', B: 'AI Research Scientist', C: 'Government / Research AI Roles', D: 'Computer Vision Engineer', E: 'NLP Engineer' },
    // Q6
    { A: 'Data Scientist', B: 'Government / Research AI Roles', C: 'AI Product Engineer', D: 'AI Product Engineer', E: 'Machine Learning Engineer' },
    // Q7
    { A: 'Machine Learning Engineer', B: 'AI Research Scientist', C: 'AI Product Engineer', D: 'Computer Vision Engineer', E: 'NLP Engineer' },
    // Q8
    { A: 'Data Scientist', B: 'AI Research Scientist', C: 'AI Product Engineer', D: 'Government / Research AI Roles', E: 'NLP Engineer' },
    // Q9
    { A: 'Data Scientist', B: 'AI Research Scientist', C: 'AI Product Engineer', D: 'Computer Vision Engineer', E: 'NLP Engineer' },
    // Q10
    { A: 'Data Scientist', B: 'AI Research Scientist', C: 'Machine Learning Engineer', D: 'Computer Vision Engineer', E: 'NLP Engineer' },
  ],
}

// ── OPTIONS TEXT ──
// Each question has 5 option labels A-E
export const QUESTION_OPTIONS = {
  CSE: [
    { A: 'How the app actually works behind the scenes', B: 'How it suggests things intelligently', C: 'How it keeps user data safe', D: 'How beautiful and easy it looks', E: 'How it connects with many online services' },
    { A: 'Finding patterns in the information', B: 'Making computers learn from the data', C: 'Making sure the data is secure', D: 'Making the information easy to understand', E: 'Using it to build useful applications' },
    { A: 'Designing how the game works', B: 'Understanding how characters behave using AI', C: 'Creating interesting game worlds visually', D: 'Connecting players online', E: 'Improving game performance through code' },
    { A: 'Building something step by step', B: 'Studying patterns before deciding', C: 'Thinking of smarter automated solutions', D: 'Checking risks and weaknesses', E: 'Making things simpler for users' },
    { A: 'Smart assistants and intelligent systems', B: 'Secure digital systems', C: 'Virtual worlds and gaming', D: 'Smart devices connected together', E: 'Decentralized digital systems' },
    { A: 'Building the main system', B: 'Analyzing information', C: 'Improving user experience', D: 'Protecting the system', E: 'Managing technical infrastructure' },
    { A: 'Devices working together automatically', B: 'How the system is programmed', C: 'How it uses intelligent decisions', D: 'How it connects to the internet', E: 'How it protects private data' },
    { A: 'Building something practical', B: 'Discovering hidden patterns', C: 'Creating intelligent tools', D: 'Designing smooth experiences', E: 'Creating immersive digital worlds' },
    { A: 'How huge systems run smoothly', B: 'How recommendations are made', C: 'How data is analyzed', D: 'How systems stay protected', E: 'How users interact with them' },
    { A: 'Building useful software', B: 'Discovering insights from data', C: 'Creating intelligent machines', D: 'Protecting digital systems', E: 'Designing engaging digital experiences' },
  ],
  IT: [
    { A: 'How the app actually works behind the scenes', B: 'How it suggests things intelligently', C: 'How it keeps user data safe', D: 'How beautiful and easy it looks', E: 'How it connects with many online services' },
    { A: 'Finding patterns in the information', B: 'Making computers learn from the data', C: 'Making sure the data is secure', D: 'Making the information easy to understand', E: 'Using it to build useful applications' },
    { A: 'Designing how the game works', B: 'Understanding how characters behave using AI', C: 'Creating interesting game worlds visually', D: 'Connecting players online', E: 'Improving game performance through code' },
    { A: 'Building something step by step', B: 'Studying patterns before deciding', C: 'Thinking of smarter automated solutions', D: 'Checking risks and weaknesses', E: 'Making things simpler for users' },
    { A: 'Smart assistants and intelligent systems', B: 'Secure digital systems', C: 'Virtual worlds and gaming', D: 'Smart devices connected together', E: 'Decentralized digital systems' },
    { A: 'Building the main system', B: 'Analyzing information', C: 'Improving user experience', D: 'Protecting the system', E: 'Managing technical infrastructure' },
    { A: 'Devices working together automatically', B: 'How the system is programmed', C: 'How it uses intelligent decisions', D: 'How it connects to the internet', E: 'How it protects private data' },
    { A: 'Building something practical', B: 'Discovering hidden patterns', C: 'Creating intelligent tools', D: 'Designing smooth experiences', E: 'Creating immersive digital worlds' },
    { A: 'How huge systems run smoothly', B: 'How recommendations are made', C: 'How data is analyzed', D: 'How systems stay protected', E: 'How users interact with them' },
    { A: 'Building useful software', B: 'Discovering insights from data', C: 'Creating intelligent machines', D: 'Protecting digital systems', E: 'Designing engaging digital experiences' },
  ],
  Mechanical: [
    { A: 'How the shape and parts make it work', B: 'How it was made in a factory', C: 'How fast or powerful it is', D: 'How it manages heat or cooling', E: 'Whether it works smoothly without problems' },
    { A: 'How the vehicle is designed', B: 'How many parts work together inside', C: 'How powerful the engine is', D: 'How it stays cool while running', E: 'Whether it drives automatically' },
    { A: 'Designing new products', B: 'Seeing machines producing items', C: 'Vehicle testing areas', D: 'Systems controlling temperature', E: 'Checking product quality' },
    { A: 'Maybe the design needs improvement', B: 'Maybe it was not produced correctly', C: 'Maybe the engine parts failed', D: 'Maybe heat or environment affected it', E: 'Maybe the control system failed' },
    { A: 'New machine designs', B: 'Faster and smarter factories', C: 'Advanced vehicles and engines', D: 'Better cooling and energy systems', E: 'Intelligent machines and robots' },
    { A: 'Planning how machines are designed', B: 'Managing production work', C: 'Testing vehicles or engines', D: 'Managing cooling or ventilation systems', E: 'Working in public mechanical services' },
    { A: 'How the system is designed', B: 'How its parts were manufactured', C: 'How it moves like a vehicle', D: 'How it controls temperature inside', E: 'How it works automatically' },
    { A: 'Visualizing new product designs', B: 'Understanding how products are made', C: 'Learning how engines work', D: 'Understanding heating and cooling systems', E: 'Checking whether everything works correctly' },
    { A: 'Redesigning machine parts', B: 'Improving production speed', C: 'Making vehicles more powerful', D: 'Improving energy efficiency', E: 'Making machines more automated' },
    { A: 'Designing mechanical products', B: 'Managing manufacturing systems', C: 'Working with vehicles', D: 'Working with cooling systems', E: 'Serving in government mechanical departments' },
  ],
  Electronics: [
    { A: 'How it responds to your actions', B: 'How tiny components inside make it work', C: 'How it connects wirelessly', D: 'How it collects data from surroundings', E: 'How accurately it performs tasks' },
    { A: 'Testing each part carefully', B: 'Checking the internal design', C: 'Checking signal or connection issues', D: 'Fixing how it follows instructions', E: 'Reporting it through official channels' },
    { A: 'How its movements are controlled', B: 'How small chips inside are arranged', C: 'How it communicates with other devices', D: 'How sensors gather information', E: 'How reliable its performance is' },
    { A: 'How it processes commands', B: 'How compact and efficient it is', C: 'How strong the signal range is', D: 'How it connects to apps or networks', E: 'How it is tested for quality' },
    { A: 'How they are programmed', B: 'How they send and receive signals', C: 'How hardware parts are designed', D: 'How they collect real-time data', E: 'How public systems manage them' },
    { A: 'Improving coordination between devices', B: 'Designing small internal layouts', C: 'Writing logic to control operations', D: 'Checking performance through testing', E: 'Automating tasks using machines' },
    { A: 'The control and movement system', B: 'The tiny component placement', C: 'The antenna or signal section', D: 'The sensors and connectors', E: 'The safety and approval markings' },
    { A: 'Developing control systems', B: 'Improving wireless systems', C: 'Designing advanced chips', D: 'Building connected hardware', E: 'Working in public technical services' },
    { A: 'Smarter automated systems', B: 'Faster communication systems', C: 'Smaller and more powerful electronic parts', D: 'Devices connected everywhere', E: 'Intelligent robotic systems' },
    { A: 'Controlling how devices operate', B: 'Designing compact electronic systems', C: 'Improving signal-based technologies', D: 'Building hardware that connects to networks', E: 'Serving in government technical departments' },
  ],
  Electrical: [
    { A: 'How electricity is supplied to the whole city', B: 'Why the system failed and how to redesign it', C: 'Whether renewable sources could help', D: 'How to fix it quickly and maintain it', E: 'How authorities manage power distribution' },
    { A: 'How electricity travels long distances', B: 'How it is designed safely', C: 'How renewable energy connects to it', D: 'How it is maintained regularly', E: 'How it supports future smart cities' },
    { A: 'Studying overall energy usage patterns', B: 'Designing a better electrical layout', C: 'Using solar or wind energy solutions', D: 'Automating systems for efficiency', E: 'Planning energy policies properly' },
    { A: 'Finding the root cause in the system', B: 'Improving the electrical design', C: 'Adding renewable energy backup', D: 'Fixing and maintaining the machine', E: 'Making energy usage more efficient' },
    { A: 'Building intelligent control systems', B: 'Maintaining reliable electrical systems', C: 'Designing the electrical infrastructure', D: 'Fixing and maintaining machines', E: 'Managing public energy utilities' },
    { A: 'How the electrical design handles it', B: 'How the power system supplies energy', C: 'How energy is stored and managed', D: 'How maintenance keeps it running', E: 'How government supports such projects' },
    { A: 'Ensuring continuous power supply', B: 'Designing the electrical system', C: 'Managing energy efficiency', D: 'Maintaining equipment properly', E: 'Setting safety standards and policies' },
    { A: 'Reliable large-scale power systems', B: 'Intelligent automated control systems', C: 'Clean and sustainable energy', D: 'Efficient electrical machines', E: 'Public energy planning and policy' },
    { A: 'Load on electrical machines and systems', B: 'Power system design capacity', C: 'Renewable energy contribution', D: 'Efficiency of control systems', E: 'Government maintenance readiness' },
    { A: 'Managing national-level power systems', B: 'Designing electrical systems for projects', C: 'Developing renewable energy solutions', D: 'Building intelligent control systems', E: 'Working in public sector electrical services' },
  ],
  Civil: [
    { A: 'How strong and safe it is structurally', B: 'How the construction work was managed', C: 'How roads and transport connect to it', D: 'What type of land and soil it stands on', E: 'How it fits into the overall city plan' },
    { A: 'Environmental damage to surroundings', B: 'Whether roads and transport stay usable', C: 'Whether buildings remain stable', D: 'How the soil and ground reacts', E: 'How authorities manage the situation' },
    { A: 'Traffic planning and design', B: 'Organization of construction work', C: 'Environmental impact on nearby areas', D: 'Structural strength of bridges and roads', E: 'Ground and soil conditions underneath' },
    { A: 'Making it eco-friendly and sustainable', B: 'Designing strong and safe buildings', C: 'Planning easy movement inside the campus', D: 'Supervising the construction process', E: 'Checking land and soil suitability first' },
    { A: 'Safety rules and regulations on site', B: 'Stability and strength of the structure', C: 'Movement of materials and vehicles', D: 'Foundation and soil conditions', E: 'Waste management and environment' },
    { A: 'Structural safety of the bridge', B: 'How to manage the repair process', C: 'How to control traffic during repairs', D: 'Soil-related causes of the cracks', E: 'Public responsibility and reporting' },
    { A: 'Better city planning and zoning', B: 'Stronger and taller buildings', C: 'Improved transport and highway systems', D: 'Studying land behavior before development', E: 'Managing large housing construction projects' },
    { A: 'Working in government public sector projects', B: 'Designing safe and durable structures', C: 'Planning highways and transport routes', D: 'Studying soil and land behavior', E: 'Supervising construction site activities' },
    { A: 'Environmental protection and sustainability', B: 'Understanding structural analysis', C: 'Highway and road design principles', D: 'Soil and foundation study', E: 'How cities and urban areas are planned' },
    { A: 'Managing public infrastructure projects', B: 'Ensuring buildings and structures are safe', C: 'Improving transportation and road systems', D: 'Studying and analyzing ground conditions', E: 'Planning sustainable and smart cities' },
  ],
  AI_ML: [
    { A: 'Finding patterns in it', B: 'Asking deeper research questions about it', C: 'Using it to build something useful', D: 'Understanding visual pictures in it', E: 'Understanding written words and language in it' },
    { A: 'Predicting what might happen next', B: 'Studying it deeply before acting', C: 'Making a practical real-world solution', D: 'Thinking how it can benefit society', E: 'Improving the solution step by step with data' },
    { A: 'The statistics and data shown', B: 'The research process behind it', C: 'How it is applied in real life', D: 'The visual examples and images', E: 'The conversations and language used' },
    { A: 'Making its results more accurate', B: 'Understanding how it works internally', C: 'Making it more useful for daily life', D: 'Improving how it handles images', E: 'Making communication and language clearer' },
    { A: 'Hidden trends or patterns in the content', B: 'Big unanswered research questions', C: 'How it connects to real-life impact', D: 'Descriptions of scenes or visual content', E: 'The way dialogues or words are written' },
    { A: 'Seeing data examples and patterns', B: 'Listening to ideas that impact society', C: 'Trying hands-on practical activities', D: 'Understanding how it helps people at scale', E: 'Learning how something improves step by step' },
    { A: 'Finding patterns and relationships', B: 'Exploring new ideas and theories deeply', C: 'Building a practical working solution', D: 'Working with visual examples and images', E: 'Understanding meanings and language in text' },
    { A: 'Analyzing the information and data involved', B: 'Studying it carefully before making decisions', C: 'Building a useful practical tool', D: 'Ensuring it benefits society as a whole', E: 'Improving how it communicates and explains clearly' },
    { A: 'Discovering relationships and patterns in data', B: 'Thinking about new research possibilities', C: 'Applying it practically to real problems', D: 'Understanding visual and image aspects', E: 'Understanding written explanations and language' },
    { A: 'Working with data and finding patterns', B: 'Discovering new ideas through research', C: 'Building intelligent and useful tools', D: 'Working with images and visual systems', E: 'Working with language and communication systems' },
  ],
}

// ── SCORING FUNCTION ──
export function scoreAnswers(field, answers, goals) {
  // answers is an object like { 0: 'A', 1: 'C', 2: 'B', ... }
  const mapping = GOAL_MAPPING[field]
  if (!mapping) return goals

  const scores = {}
  goals.forEach(g => { scores[g.title] = 0 })

  Object.entries(answers).forEach(([qIndex, option]) => {
    const qMapping = mapping[parseInt(qIndex)]
    if (qMapping && qMapping[option]) {
      const goalTitle = qMapping[option]
      if (scores[goalTitle] !== undefined) {
        scores[goalTitle] += 1
      }
    }
  })

  const maxScore = Math.max(...Object.values(scores))

  return goals
    .map(g => ({
      ...g,
      score: scores[g.title] || 0,
      matchPercent: maxScore > 0 ? Math.round(((scores[g.title] || 0) / maxScore) * 100) : 50,
    }))
    .sort((a, b) => b.score - a.score)
}