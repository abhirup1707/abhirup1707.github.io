// Portfolio Data for Abhirup Chakrabarti
window.PORTFOLIO_DATA = {
  profile: {
    name: "Abhirup Chakrabarti",
    title: "Full-Stack Web Developer & Mathematics Undergraduate",
    location: "Kolkata, West Bengal, India",
    email: "achakrabarti168@gmail.com",
    phone: "+91 9123737425",
    whatsapp: "9123737425",
    github: "abhirup1707",
    instagram: "belle_abhi_2005",
    linkedin: "abhirupchakrabarti",
    tagline: "Building scalable real-time systems, AI-powered applications & immersive web experiences.",
    bio: "Full-stack web developer and Mathematics undergraduate at Jadavpur University with hands-on experience building AI-powered and real-time web applications using HTML, CSS, JavaScript, React, and Node.js. Completed two web development internships delivering production-ready projects including multiplayer games, geolocation apps, space-themed portfolios, and synchronized media platforms.",
    stats: [
      { label: "Projects Built", value: "8+" },
      { label: "Internships", value: "2" },
      { label: "Live Demos", value: "6+" },
      { label: "Certifications", value: "1" }
    ]
  },
  
  socials: {
    email: {
      url: "mailto:achakrabarti168@gmail.com",
      display: "achakrabarti168@gmail.com",
      label: "Email"
    },
    phone: {
      url: "tel:+919123737425",
      display: "+91 9123737425",
      label: "Call"
    },
    whatsapp: {
      url: "https://wa.me/919123737425?text=Hi%20Abhirup%2C%20I%20came%20across%20your%20portfolio!",
      display: "+91 9123737425",
      label: "WhatsApp"
    },
    github: {
      url: "https://github.com/abhirup1707",
      display: "github.com/abhirup1707",
      username: "abhirup1707",
      label: "GitHub"
    },
    linkedin: {
      url: "https://linkedin.com/in/abhirupchakrabarti",
      display: "linkedin.com/in/abhirupchakrabarti",
      username: "abhirupchakrabarti",
      label: "LinkedIn"
    },
    instagram: {
      url: "https://instagram.com/belle_abhi_2005",
      display: "@belle_abhi_2005",
      username: "belle_abhi_2005",
      label: "Instagram"
    }
  },

  skills: {
    languages: [
      { name: "JavaScript (ES6+)", level: 95, icon: "code" },
      { name: "Python", level: 88, icon: "terminal" },
      { name: "HTML5 / CSS3", level: 96, icon: "layout" },
      { name: "C", level: 82, icon: "cpu" },
      { name: "C#", level: 75, icon: "layers" },
      { name: "SQL", level: 85, icon: "database" },
      { name: "MATLAB", level: 80, icon: "activity" }
    ],
    frameworks: [
      { name: "React.js", category: "Frontend", level: 92 },
      { name: "Node.js", category: "Backend", level: 88 },
      { name: "REST APIs", category: "Backend", level: 90 },
      { name: "WebSockets", category: "Real-Time", level: 89 },
      { name: "Responsive UI", category: "Frontend", level: 95 },
      { name: "YouTube API", category: "Integration", level: 85 }
    ],
    tools: [
      "Git", "GitHub", "VS Code", "Render", "Vercel", "Firebase",
      "Geolocation APIs", "AI API Integration", "Postman", "Peer-to-Peer Streaming"
    ],
    concepts: [
      "Real-Time Systems", "Object-Oriented Programming (OOP)",
      "Data Structures & Algorithms", "Cybersecurity Fundamentals",
      "Discrete & Applied Mathematics", "Peer-to-Peer Media Streaming"
    ]
  },

  projects: [
    {
      id: "orbitfolio",
      title: "OrbitFolio – Space-Themed Interactive Portfolio",
      category: "frontend",
      featured: true,
      period: "June 2026 – July 2026",
      tagline: "Immersive 3D solar-system UI with drill-down celestial navigation.",
      description: "Designed and developed a fully interactive space-themed personal portfolio using HTML, CSS, JavaScript, and React.js, featuring a solar system UI where each planet represents a career category (experience, education, projects, skills). Implemented a drill-down navigation system where clicking a planet reveals its moons, each representing a specific item within that category.",
      highlights: [
        "Interactive solar system UI with orbiting planetary bodies",
        "Drill-down orbital navigation representing career categories & milestones",
        "Integrated an AI-powered chatbot that answers natural language questions in real time"
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "React.js", "AI Chatbot API"],
      demoUrl: "https://abhirup-space.vercel.app",
      githubUrl: "https://github.com/abhirup1707"
    },
    {
      id: "echotown",
      title: "EchoTown – Collaborative Media Streaming Platform",
      category: "fullstack",
      featured: true,
      period: "July 2026",
      tagline: "Real-time synchronized media room with WebSockets, YouTube API & P2P streaming.",
      description: "Built a real-time synchronized media platform allowing multiple users in a shared room to listen to music together and watch videos simultaneously, with playback state kept in sync across all connected clients via WebSockets. Features YouTube integration, direct peer-to-peer file streaming, and interactive mini-games.",
      highlights: [
        "WebSocket-powered real-time synchronization of play, pause, and seek states",
        "YouTube API integration to search, queue, and co-watch content seamlessly",
        "P2P local file streaming directly to participants without server uploads",
        "In-room interactive mini-games system to play while enjoying synchronized media"
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "Node.js", "WebSockets", "YouTube API", "P2P WebRTC"],
      demoUrl: "https://echo-town.vercel.app",
      githubUrl: "https://github.com/abhirup1707"
    },
    {
      id: "repolens",
      title: "RepoLens – AI-Powered GitHub Repository Analyzer",
      category: "ai",
      featured: true,
      period: "2026",
      tagline: "Deep repository intelligence with AI-driven architectural insights and chat.",
      description: "Built a full-stack web application that analyzes GitHub repositories and generates structured insights into their codebase, architecture, technologies, and project structure. Integrated an AI-powered contextual chat assistant to allow users to interactively query and understand repository contents.",
      highlights: [
        "Automated architecture and dependency extraction from repository URLs",
        "Contextual AI chat assistant to ask questions directly about any codebase",
        "Microservice architecture with frontend on Vercel and backend services on Render"
      ],
      tech: ["JavaScript", "Node.js", "AI API Integration", "REST APIs", "Vercel", "Render"],
      demoUrl: "https://repolens-github.vercel.app",
      githubUrl: "https://github.com/abhirup1707"
    },
    {
      id: "footyverse",
      title: "FootyVerse – Real-Time Football PvP Game",
      category: "games",
      featured: true,
      period: "2026",
      tagline: "Action-packed multiplayer soccer PvP showdown playable directly in browser.",
      description: "Fast-paced online multiplayer football battle where players compete in real-time PvP matches with dynamic physics, goal celebrations, and competitive scoring.",
      highlights: [
        "Real-time multiplayer soccer physics and ball handling mechanics",
        "PvP multiplayer matchmaking and interactive spectator mode",
        "Responsive controls optimized for both desktop and mobile web"
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "Canvas 2D", "Physics Engine", "Vercel"],
      demoUrl: "https://footyverse-pvp.vercel.app",
      githubUrl: "https://github.com/abhirup1707"
    },
    {
      id: "rocketleague",
      title: "Rocket League Web – High-Octane Car Soccer",
      category: "games",
      featured: true,
      period: "2026",
      tagline: "Acrobatic rocket-powered vehicular football action built for the web.",
      description: "A fast, thrilling web rendition of rocket-powered vehicular soccer featuring turbo boosts, aerial acrobatics, arena collision physics, and instant-play accessibility.",
      highlights: [
        "Vehicle physics with acceleration, drift, and supersonic aerial boosts",
        "Arena bounds, stadium goals, and dynamic particle effects",
        "Smooth 60 FPS in-browser rendering with zero install needed"
      ],
      tech: ["HTML5", "JavaScript", "Physics", "WebGL / Canvas", "Vercel"],
      demoUrl: "https://rocket-league-one.vercel.app",
      githubUrl: "https://github.com/abhirup1707"
    },
    {
      id: "atlas",
      title: "Atlas – Real-Time Multiplayer Word Game",
      category: "fullstack",
      featured: true,
      period: "July 2025 – November 2025",
      tagline: "Fast-paced multiplayer geographical word battle with live score calculation.",
      description: "Designed and developed a real-time online multiplayer place-guessing game using HTML, CSS, JavaScript, and Node.js with WebSocket-based communication for live player interactions. Built a timer-based scoring engine that calculates and updates player points dynamically, along with a feature that fetches and displays location images matching each guessed place name.",
      highlights: [
        "Low-latency multiplayer WebSocket lobby and live gameplay events",
        "Dynamic timer-based scoring engine with combo multipliers",
        "Live image fetcher rendering landmark visuals for each guessed location"
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "Node.js", "WebSockets", "Render"],
      demoUrl: "https://atlas-game-4w24.onrender.com",
      githubUrl: "https://github.com/abhirup1707"
    },
    {
      id: "weatherapp",
      title: "TruWeather – Geolocation Weather Web App",
      category: "ai",
      featured: false,
      period: "July 2025",
      tagline: "Precision meteorological data with AI-assisted atmospheric forecasts.",
      description: "Built a weather application using HTML, CSS, and JavaScript that uses the browser's Geolocation API to fetch and display real-time weather data for the user's current location with responsive mobile-first layouts.",
      highlights: [
        "Native browser Geolocation API integration with automatic fallback",
        "Dynamic meteorological conditions visualization and forecasting",
        "Clean, responsive glassmorphism user interface"
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "Geolocation API", "Weather API", "Vercel"],
      demoUrl: "https://truweather.vercel.app",
      githubUrl: "https://github.com/abhirup1707"
    },
    {
      id: "calculator",
      title: "AI-Powered Smart Calculator",
      category: "ai",
      featured: false,
      period: "August 2025",
      tagline: "Intelligent computational engine extending classical arithmetic with AI.",
      description: "Developed an intelligent calculator web app with AI-assisted computation capabilities, supporting standard arithmetic and advanced mathematical operations with conversational step-by-step problem breakdown.",
      highlights: [
        "Seamless blend of instant client-side arithmetic with AI-powered step solving",
        "Responsive, intuitive user interface designed during CodSoft internship",
        "Support for complex mathematical notation and expressions"
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "AI API Integration"],
      demoUrl: "https://github.com/abhirup1707",
      githubUrl: "https://github.com/abhirup1707"
    },
    {
      id: "portfolio-v1",
      title: "AI-Powered Dynamic Portfolio (v1)",
      category: "frontend",
      featured: false,
      period: "July 2025",
      tagline: "Early portfolio prototype built during AI Wallah internship.",
      description: "Created a dynamic portfolio site with AI-integrated content rendering to professionally present projects, technical skills, and work experience.",
      highlights: [
        "Dynamic content rendering using modern JavaScript",
        "Full cross-device mobile responsiveness",
        "Deployed to Firebase Hosting"
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "Firebase Hosting"],
      demoUrl: "https://abhirup1707-d8691.web.app",
      githubUrl: "https://github.com/abhirup1707"
    }
  ],

  experience: [
    {
      role: "Web Development Intern",
      company: "CodSoft",
      location: "Remote",
      period: "August 2025 – October 2025",
      points: [
        "Developed an AI-powered calculator web application using HTML, CSS, and JavaScript, enabling users to perform general and complex arithmetic calculations.",
        "Integrated AI API capabilities to extend standard calculator functionality, delivering a responsive and user-friendly interface.",
        "Collaborated on iterative development cycles, testing and debugging JavaScript logic to ensure accurate computation results."
      ],
      skills: ["JavaScript", "HTML/CSS", "AI APIs", "Testing & Debugging"]
    },
    {
      role: "Web Development Intern",
      company: "AI Wallah",
      location: "Remote",
      period: "July 2025",
      points: [
        "Built an AI-powered personal portfolio website using HTML, CSS, and JavaScript, enabling dynamic content rendering to showcase skills and projects.",
        "Developed a geolocation-based weather web application that detects the user's current location via browser APIs and displays real-time weather information.",
        "Implemented responsive layouts ensuring cross-device compatibility across desktop and mobile platforms."
      ],
      skills: ["JavaScript", "Geolocation API", "Responsive Web Design", "AI Integration"]
    }
  ],

  education: [
    {
      degree: "Bachelor of Science (Hons.) in Mathematics",
      institution: "Jadavpur University",
      location: "Kolkata, West Bengal",
      period: "2023 – 2027 (Expected)",
      highlight: "Specializing in pure & applied mathematics, discrete algorithms, numerical analysis & computational logic."
    },
    {
      degree: "Senior Secondary Certificate (Class XII) – Science",
      institution: "Nava Nalanda High School",
      location: "Kolkata, West Bengal",
      period: "2023",
      highlight: "WBCHSE Board — Secured 84% with core focus on Mathematics, Physics & Chemistry."
    },
    {
      degree: "Secondary School Certificate (Class X)",
      institution: "Nava Nalanda High School",
      location: "Kolkata, West Bengal",
      period: "2021",
      highlight: "WBCSE Board — Secured 87% with academic distinction."
    }
  ],

  certifications: [
    {
      title: "Cybersecurity Certificate",
      issuer: "Coursera (Online)",
      period: "February 2025 – May 2025",
      details: "Completed in-depth professional training covering network security, threat modeling and analysis, vulnerability assessment, cryptography fundamentals, and secure coding practices."
    }
  ],

  botKnowledge: [
    {
      triggers: ["who", "about", "abhirup", "intro", "introduce", "background"],
      response: "Abhirup Chakrabarti is a Full-Stack Web Developer and Mathematics undergraduate at Jadavpur University, Kolkata. He specializes in building real-time systems (WebSockets, P2P), AI-integrated web applications, and interactive frontends with React and Node.js."
    },
    {
      triggers: ["contact", "email", "phone", "whatsapp", "reach", "hire", "touch", "call"],
      response: "You can reach Abhirup immediately via:\n• WhatsApp: +91 9123737425\n• Phone: +91 9123737425\n• Email: achakrabarti168@gmail.com\n• LinkedIn: linkedin.com/in/abhirupchakrabarti\n• GitHub: github.com/abhirup1707\n• Instagram: @belle_abhi_2005"
    },
    {
      triggers: ["project", "projects", "work", "built", "portfolio", "echotown", "orbitfolio", "repolens", "atlas"],
      response: "Abhirup has built several impressive production projects:\n1. 🪐 OrbitFolio (Space-themed 3D portfolio)\n2. 🎵 EchoTown (Real-time synchronized media + P2P streaming)\n3. 🔍 RepoLens (AI GitHub repository analyzer)\n4. 🎮 Atlas (Multiplayer WebSockets word game)\n5. 🌦️ Geolocation Weather App\nAll have live demos available in the Projects app!"
    },
    {
      triggers: ["skill", "skills", "tech", "stack", "language", "framework"],
      response: "Abhirup's technical toolkit includes:\n• Languages: JavaScript (ES6+), Python, C, C#, SQL, MATLAB, HTML5, CSS3\n• Frameworks/Libs: React.js, Node.js, WebSockets, REST APIs\n• Tools & Cloud: Git, GitHub, Render, Vercel, Firebase, Geolocation APIs, AI APIs\n• Core: Algorithms, Discrete Math, Real-Time Architecture, Cybersecurity."
    },
    {
      triggers: ["experience", "intern", "internship", "codsoft", "ai wallah"],
      response: "Abhirup has completed 2 high-impact web development internships:\n• CodSoft (Aug - Oct 2025): Developed an AI-powered computational calculator web application.\n• AI Wallah (July 2025): Created an AI-powered dynamic portfolio and a geolocation weather platform."
    },
    {
      triggers: ["education", "college", "university", "school", "degree", "jadavpur"],
      response: "Abhirup is pursuing his B.Sc. (Hons.) in Mathematics at Jadavpur University (2023–2027). He completed Class XII (84%) and Class X (87%) at Nava Nalanda High School."
    },
    {
      triggers: ["cert", "certificate", "cyber", "security"],
      response: "Abhirup holds a professional Cybersecurity Certificate from Coursera (May 2025), covering network security protocols, vulnerability scanning, threat analysis, and secure coding practices."
    }
  ],

  inPhoneApps: [
    {
      id: "repolens",
      name: "RepoLens",
      category: "AI Tool",
      url: "https://repolens-github.vercel.app",
      iconClass: "fa-solid fa-code-fork",
      gradient: "linear-gradient(135deg, #7928ca, #4338ca)",
      badge: "AI App"
    },
    {
      id: "echotown",
      name: "EchoTown",
      category: "Media Stream",
      url: "https://echo-town.vercel.app",
      iconClass: "fa-solid fa-headphones",
      gradient: "linear-gradient(135deg, #ec4899, #8b5cf6)",
      badge: "Stream"
    },
    {
      id: "footyverse",
      name: "FootyVerse",
      category: "PvP Soccer",
      url: "https://footyverse-pvp.vercel.app",
      iconClass: "fa-solid fa-futbol",
      gradient: "linear-gradient(135deg, #10b981, #059669)",
      badge: "PvP Game"
    },
    {
      id: "rocketleague",
      name: "Rocket League",
      category: "Car Soccer",
      url: "https://rocket-league-one.vercel.app",
      iconClass: "fa-solid fa-rocket",
      gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
      badge: "3D Game"
    }
  ]
};
