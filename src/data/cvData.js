export const cvData = {
  personal: {
    name: "Alexander Holzbauer",
    title: "TBA",
    email: "alexander.holzbauer1@gmail.com",
    phone: "+43 68110542959",
    location: "Wien, AT",
    website: "TBA",
  },
  about: "TBA",
  experience: [
    {
      id: 1,
      company: "Erich Schenkel GmbH",
      position: "Brand Manager / Projekt Manager",
      period: "06.2023 - Present",
      description: "• Internationale Markenentwicklung am österreichischen Markt (z.B.:
Rummo, Kikkoman)
• Laufende Weiterentwicklung der Kundenverkaufskanäle (Promotionen, PoS Platzierung)
• Kommunikation, Reporting und Budgetverhandlungen mit Lieferanten
• Leitung von diversen (internen)-Projekten (Distributorenmeetings, IT-Infrastruktur, CRM, Zeiterfassung, Office 365)",
      technologies: ["React", "Node.js", "AWS", "MongoDB", "Docker"]
    },
    {
      id: 2,
      company: "Digital Solutions LLC",
      position: "Full Stack Developer",
      period: "2017 - 2020",
      description: "Developed and maintained e-commerce platforms with 99.9% uptime. Improved application performance by 60% through code optimization.",
      technologies: ["Vue.js", "PHP", "MySQL", "Redis", "Linux"]
    },
    {
      id: 3,
      company: "StartUp Ventures",
      position: "Frontend Developer",
      period: "2015 - 2017",
      description: "Built responsive web applications and collaborated with UX designers to implement modern interfaces.",
      technologies: ["JavaScript", "HTML5", "CSS3", "jQuery", "Bootstrap"]
    }
  ],
  skills: {
    "Frontend": [
      { name: "React", percentage: 90 },
      { name: "Vue.js", percentage: 85 },
      { name: "TypeScript", percentage: 80 },
      { name: "Next.js", percentage: 75 },
      { name: "Tailwind CSS", percentage: 95 }
    ],
    "Backend": [
      { name: "Node.js", percentage: 88 },
      { name: "Python", percentage: 82 },
      { name: "PHP", percentage: 78 },
      { name: "Express.js", percentage: 85 },
      { name: "FastAPI", percentage: 70 }
    ],
    "Database": [
      { name: "MongoDB", percentage: 85 },
      { name: "PostgreSQL", percentage: 80 },
      { name: "MySQL", percentage: 83 },
      { name: "Redis", percentage: 75 }
    ],
    "DevOps": [
      { name: "AWS", percentage: 78 },
      { name: "Docker", percentage: 82 },
      { name: "Kubernetes", percentage: 65 },
      { name: "CI/CD", percentage: 80 },
      { name: "Git", percentage: 95 }
    ],
    "Tools": [
      { name: "Git", percentage: 95 },
      { name: "Webpack", percentage: 72 },
      { name: "Jest", percentage: 78 },
      { name: "Figma", percentage: 68 },
      { name: "Jira", percentage: 85 }
    ]
  },
  // Helper function to get skills as simple array for other components
  getSkillsArray: function() {
    return Object.values(this.skills).flat().map(skill => skill.name);
  },
  // Helper function to get skills by category as simple array
  getSkillsByCategory: function() {
    const simpleSkills = {};
    Object.keys(this.skills).forEach(category => {
      simpleSkills[category] = this.skills[category].map(skill => skill.name);
    });
    return simpleSkills;
  },
  projects: [
    {
      id: 1,
      name: "E-commerce Platform",
      description: "Full-stack e-commerce solution with real-time inventory and payment processing",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      link: "https://github.com/alexjohnson/ecommerce-platform"
    },
    {
      id: 2,
      name: "Task Management App",
      description: "Collaborative project management tool with real-time updates and analytics",
      technologies: ["Vue.js", "Firebase", "Chart.js", "PWA"],
      link: "https://github.com/alexjohnson/task-manager"
    },
    {
      id: 3,
      name: "Weather Dashboard",
      description: "Real-time weather monitoring dashboard with predictive analytics",
      technologies: ["React", "D3.js", "Weather API", "WebSocket"],
      link: "https://github.com/alexjohnson/weather-dashboard"
    }
  ],
  education: [
    {
      degree: "Master of Computer Science",
      institution: "Stanford University",
      year: "2015"
    },
    {
      degree: "Bachelor of Software Engineering",
      institution: "UC Berkeley",
      year: "2013"
    }
  ]
};


