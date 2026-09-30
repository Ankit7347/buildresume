export interface CertificationItem {
  id: string;
  name: string;
  issuer?: string;
  date?: string;
  url?: string;
}

export interface AdditionalInfoItem {
  id: string;
  label?: string; // e.g. "Languages Known", "Declaration"
  value: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level?: string; // e.g., Beginner, Intermediate, Expert
  category?: string; // e.g., "Sales & Acquisition", "Technical & Tools"
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  link?: string;
  technologies?: string[];
  organization?: string; // e.g. "GNIOT & Impactra Consulting"
}

export interface SectionTitles {
  objective?: string;
  education?: string;
  skills?: string;
  experience?: string;
  projects?: string;
  certifications?: string;
  additionalInfo?: string;
}

export const defaultSectionOrder: string[] = [
  "objective",
  "education",
  "skills",
  "experience",
  "projects",
  "certifications",
  "additionalInfo",
];

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    summary: string;
    objective?: string;
    profileImage?: string;
  };
  sectionTitles?: SectionTitles;
  sectionOrder?: string[];
  experience: {
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    current: boolean;
  }[];
  education: {
    id: string;
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    description?: string;
    score?: string;
  }[];
  skills: SkillItem[];
  languages?: {
    id: string;
    name: string;
    proficiency: string;
  }[];
  projects: ProjectItem[];
  certifications?: CertificationItem[];
  additionalInfo?: AdditionalInfoItem[];
  settings: {
    primaryColor: string;
    fontSize: "small" | "medium" | "large";
    fileName?: string;
  };
}

export const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    summary: "",
    objective: "",
  },
  sectionTitles: {
    objective: "CAREER OBJECTIVE",
    education: "EDUCATION",
    skills: "SKILLS",
    experience: "INTERNSHIP EXPERIENCE",
    projects: "RESEARCH PROJECTS",
    certifications: "CERTIFICATIONS",
    additionalInfo: "ADDITIONAL INFORMATION",
  },
  sectionOrder: defaultSectionOrder,
  experience: [],
  education: [],
  skills: [],
  projects: [],
  languages: [],
  certifications: [],
  additionalInfo: [],
  settings: {
    primaryColor: "#0f172a", // Default Slate 900
    fontSize: "medium",
    fileName: "My_Resume",
  },
};

export const corporateSampleData: ResumeData = {
  personalInfo: {
    fullName: "RUDRANSH SRIVASTAV",
    email: "rudranshsrivastav91@gmail.com",
    phone: "+91-9696908226",
    location: "Greater Noida, Uttar Pradesh – 201310",
    title: "MBA Candidate | Marketing & Finance",
    summary: "Motivated and analytical MBA student specializing in Marketing & Finance with practical internship exposure in financial services (BFSI), client acquisition, investment analysis, and market research. Seeking to leverage analytical competencies, financial modeling, customer relationship skills, and AI for Managers training to drive business growth and strategic marketing excellence in a dynamic corporate environment.",
    objective: "Motivated and analytical MBA student specializing in Marketing & Finance with practical internship exposure in financial services (BFSI), client acquisition, investment analysis, and market research. Seeking to leverage analytical competencies, financial modeling, customer relationship skills, and AI for Managers training to drive business growth and strategic marketing excellence in a dynamic corporate environment.",
  },
  sectionTitles: {
    objective: "CAREER OBJECTIVE",
    education: "EDUCATION",
    skills: "SKILLS",
    experience: "INTERNSHIP EXPERIENCE",
    projects: "RESEARCH PROJECTS",
    certifications: "CERTIFICATIONS",
    additionalInfo: "ADDITIONAL INFORMATION",
  },
  sectionOrder: defaultSectionOrder,
  education: [
    {
      id: "edu-1",
      degree: "Master of Business Administration (Marketing & Finance)",
      school: "Greater Noida Institute of Technology",
      fieldOfStudy: "",
      startDate: "",
      endDate: "Expected 2027",
    },
    {
      id: "edu-2",
      degree: "Bachelor of Business Administration (BBA)",
      school: "Mahatma Gandhi Kashi Vidyapith (M.G.K.V.P.), Varanasi",
      fieldOfStudy: "",
      startDate: "2021",
      endDate: "2024",
    },
    {
      id: "edu-3",
      degree: "Senior Secondary Examination (Class XII – CBSE)",
      school: "Imperial Public School, Varanasi",
      fieldOfStudy: "",
      startDate: "",
      endDate: "2021",
    },
    {
      id: "edu-4",
      degree: "Secondary School Examination (Class X – CBSE)",
      school: "Imperial Public School, Varanasi",
      fieldOfStudy: "",
      startDate: "",
      endDate: "2019",
    },
  ],
  skills: [
    {
      id: "sk-1",
      category: "Financial Analysis & BFSI",
      name: "Financial Modeling, Ratio Analysis, Valuation, Insurance & Investment Products, Client Onboarding",
      level: "Expert",
    },
    {
      id: "sk-2",
      category: "Market Research & Marketing",
      name: "Primary Data Collection (Google Forms/Surveys), Questionnaire Design, BFSI Market Trends, Brand Strategy",
      level: "Expert",
    },
    {
      id: "sk-3",
      category: "Digital & AI",
      name: "AI for Managers, Prompt Engineering, Digital Marketing, Social Media Marketing Strategies",
      level: "Intermediate",
    },
    {
      id: "sk-4",
      category: "Technical & Tools",
      name: "Advanced MS Excel (Financial Functions, Pivot Tables, Charts, VLOOKUP), ADCA, MS Office Suite",
      level: "Expert",
    },
    {
      id: "sk-5",
      category: "Core Competencies",
      name: "Financial Planning, Consumer Behavior Analysis, Strategic Thinking, Client Communication, Problem Solving",
      level: "Expert",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Impactra Consulting",
      position: "Management Intern – Financial Services & Market Research (Reporting to Business Unit Head)",
      location: "Noida, India",
      startDate: "May 2026",
      endDate: "July 2026",
      current: false,
      description: "• Executed direct customer outreach and pitched tailored insurance and financial investment products, driving active client acquisition.\n• Analyzed individual client risk profiles, portfolio allocations, and financial requirements to provide customized product recommendations.\n• Designed and distributed structured primary research questionnaires, gathering and synthesizing responses from 103+ BFSI consumers.\n• Evaluated consumer buying patterns, financial trust metrics, and investment behaviors in MS Excel, compiling executive tables and final actionable research reports.",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Financial Product Adoption & Social Media Marketing in the BFSI Sector",
      organization: "GNIOT & Impactra Consulting",
      technologies: [],
      description: "• Conducted comprehensive primary research with 103 respondents to evaluate social media impact on financial and investment product decision-making.\n• Identified that 49% of respondents discover financial products via social platforms, establishing Instagram (58.3%) as the dominant discovery channel for retail investors.\n• Analyzed consumer trust indicators, revealing educational content and transparent digital communication as the primary drivers of investor credibility.",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AI for Managers – Professional Certification Course",
    },
    {
      id: "cert-2",
      name: "Financial Modeling & Business Analytics Workshop Course – Indian Institute of Management Rohtak (IIM Rohtak)",
    },
    {
      id: "cert-3",
      name: "Certification in Digital Marketing – Strategic Campaigning & Social Media Marketing",
    },
    {
      id: "cert-4",
      name: "Advanced Diploma in Computer Applications (ADCA) – Technical & Data Management",
    },
  ],
  additionalInfo: [
    {
      id: "info-1",
      label: "Languages Known",
      value: "English (Professional Working Proficiency), Hindi (Native / Fluent)",
    },
    {
      id: "info-2",
      label: "Declaration",
      value: "I hereby declare that all the information stated above is complete, authentic, and true to the best of my knowledge.",
    },
  ],
  settings: {
    primaryColor: "#000000",
    fontSize: "medium",
    fileName: "Rudransh_Srivastav_Resume",
  },
};

