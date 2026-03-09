export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    summary: string;
    profileImage?: string;
  };
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
    description: string;
    score?: string;
  }[];
  skills: {
    id: string;
    name: string;
    level: string; // e.g., Beginner, Intermediate, Expert
  }[];
  languages: {
    id: string;
    name: string;
    proficiency: string;
  }[];
  projects: {
    id: string;
    name: string;
    description: string;
    link?: string;
    technologies: string[];
  }[];
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
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  languages: [],
  settings: {
    primaryColor: "#0f172a", // Default Slate 900
    fontSize: "medium",
    fileName: "My_Resume",
  },
};
