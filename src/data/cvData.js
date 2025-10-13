export const cvData = {
  personal: {
    name: "Alexander Holzbauer",
    title: "TBA",
    email: "alexander.holzbauer1@gmail.com",
    phone: "+43 68110542959",
    location: "Siemensstraße 30/264, 1210 Wien, AT",
    website: "https://alexanderholzbauer.netlify.app",
  },
  about: "TBA",
  experience: [
    {
      id: 1,
      company: "Erich Schenkel GmbH",
      position: "Brand Manager / Projekt Manager",
      period: "06.2023 - Present",
      description: `• Internationale Markenentwicklung am österreichischen Markt (z.B.: Rummo, Kikkoman)
      • Laufende Weiterentwicklung der Kundenverkaufskanäle (Promotionen, PoS Platzierung)
      • Kommunikation, Reporting und Budgetverhandlungen mit Lieferanten
      • Leitung von diversen (internen)-Projekten (Distributorenmeetings, IT-Infrastruktur, CRM, Zeiterfassung, Office 365`,
      technologies: ["Bsp. Skill"]
    },
    {
      id: 2,
      company: "Mömax GmbH",
      position: "Abteilungsleiter Mömax Vösendorf",
      period: "04.2021 - 05.2023",
      description: `• Teamleitung, Beratung und Verkauf (8 Mitarbeiter)
      • Umsatzsteuerung
      • Präsentation und Pflege der Ware`,
      technologies: ["Bsp. Skill"]
    },
    {
      id: 3,
      company: "OVB Allfinanzvermittlungs GmbH",
      position: "Junior-Geschäftsstellenleiter",
      period: "10.2018 - 12.2020",
      description: `• Vertriebsaufbau und Teamleitung (5-7 Mitarbeiter)
        • Unterstützung bei Neukundenakquise
        • Kundenberatung und - betreuung`,
      technologies: ["Bsp. Skill"]
    },
    {
      id: 4,
      company: "Österreichisches Bundesheer",
      position: "Schreiber des dienstführenden Unteroffiziers, Gefreiter, Grundwehrdienst",
      period: "02.2018 - 08.2018",
      description: `• Administrative Tätigkeiten & Verantwortung über Kameraden der restlichen "Versogungsgruppe"`,
      technologies: ["Bsp. Skill"]
    }
  ],
  skills: {
    "Sprachen": [
      { name: "Deutsch", percentage: 100 },
      { name: "Englisch", percentage: 80 }
    ],
    "IT": [      
      { name: "HTML", percentage: 60 },
      { name: "Java", percentage: 60 },
      { name: "MS-Office", percentage: 90 },
      { name: "MySQL", percentage: 60 }
    ],
    "Stärken": [
      { name: "Ergebnisorientiert", percentage: 100 },
      { name: "Flexibel", percentage: 100 },
      { name: "Lernbereitschaft", percentage: 100 },
      { name: "Motivation", percentage: 100 }
    ],
    "Hobbies": [
      { name: "Gaming", percentage: 100 },
      { name: "Laufen", percentage: 100 },
      { name: "Tennis", percentage: 100 }
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
  voluntaryActivities: [
    {
      id: 1,
      organization: "BYT Tournaments",
      role: "CEO / Gründer",
      period: "seit 01.2025",
      description: `• Organisation und Veranstaltung von eSports Turnieren
      • Community und Teamaufbau
      • Gespräche und Verhandlungen mit eSportvereinen zur Kooperation`,
      technologies: ["Bsp. Skill"]
    },
    {
      id: 2,
      organization: "FH - Social Media Projekt - #ufstudieren",
      role: `"CEO" / Leiter der Organisation`,
      period: "02.2024 - 02.2026",
      description: `• Organisationsentwicklung
      • Recruitung, Vor- ,Einstellungsgespräche und Mitarbeitergespräche
      • Kommunikation und Reporting an die Lektoren
      • Laufende Abstimmung mit den Abteilungsleitern, die für das direkt operative (den Content) zuständig sind`,
      technologies: ["Bsp. Skill"]
    },
    {
      id: 3,
      organization: "Politisch engagiert",
      role: "Organisationsreferent",
      period: "09.2016 - 10.2021",
      description: `• Organisieren von Kampagnen im Bezirk
        • Leiter des Bezirkswahlkampfteams
        • Aufbau von Ständen
        • Koordination von Mitgliedern vor Ort`,
      technologies: ["Bsp. Skill"]
    },
    {
      id: 4,
      organization: "eSports Mount & Blade: Warband",
      role: "Clanleiter und Event Organisator",
      period: "06.2014 - 04.2022",
      description: `• Matchorganisation (auch international), Ausbildung neuer Spieler, Führung von 50 Mitgliedern
      • Eventorganisation mit bis zu 300 Teilnehmern pro Wochenende`,
      technologies: ["Bsp. Skill"]
    }
  ],
  education: [
    {
      degree: "BA Management & Entrepreneurship (5. Semester)",
      institution: "FH Wien der WK Wien",
      year: "seit 09.2023"
    },
    {
      degree: "Worex (Wohnraum-Experte) - Verkaufsausbilding",
      institution: "Mömax interne Ausbildung",
      year: "04.2022 - 09.2022"
    },
    {
      degree: "Meisterprüfung zum Versicherungsagenten (Versicherungen und Unternehmensrecht)",
      institution: "WKO Niederösterreich",
      year: "11.2019"
    },
    {
      degree: "Meisterprüfung zum gewerblichen Vermögensberater",
      institution: "WKO Steiermark",
      year: "04.2019"
    },
    {
      degree: "AHS-Matura (mündl. GPB, GWK und Chemie)",
      institution: "BG, BRG, BORG Ella Lingens",
      year: "06.2017"
    }
  ]
};














