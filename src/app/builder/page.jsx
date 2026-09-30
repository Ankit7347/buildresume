"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLocalStorageTTL } from "@/lib/hooks/use-local-storage-ttl";
import { initialResumeData, corporateSampleData } from "@/lib/types";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";
import {
  Download,
  Layout as LayoutIcon,
  ChevronLeft,
  ChevronRight,
  Eye,
  Settings,
  Trash2,
  Plus,
  Sparkles,
  Award,
  Info,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Templates
import { CorporateTemplate } from "@/components/templates/CorporateTemplate";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { ModernMinimalTemplate } from "@/components/templates/ModernMinimalTemplate";
import { ATSResumeTemplate } from "@/components/templates/ATSResumeTemplate";

export default function BuilderPage() {
  const [resumeData, setResumeData] = useLocalStorageTTL(
    "resume-data",
    initialResumeData,
  );
  const [activeTemplate, setActiveTemplate] = useState("corporate");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);

  const colorPresets = [
    { name: "Black (Corporate)", value: "#000000" },
    { name: "Slate", value: "#0f172a" },
    { name: "Blue", value: "#2563eb" },
    { name: "Indigo", value: "#4f46e5" },
    { name: "Emerald", value: "#059669" },
    { name: "Rose", value: "#e11d48" },
    { name: "Amber", value: "#d97706" },
  ];

  useEffect(() => {
    const updateScale = () => {
      const screenWidth = window.innerWidth;
      const resumeWidth = 794; // 210mm in pixels at 96dpi

      if (screenWidth < 1024) {
        // Mobile: provide a little padding
        const scale = (screenWidth - 32) / resumeWidth;
        setPreviewScale(scale);
      } else {
        // Desktop: calculate scale based on preview container
        const previewPaneWidth = (screenWidth * 0.55) - 96;
        const scale = Math.min(1, previewPaneWidth / resumeWidth);
        setPreviewScale(scale);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const componentRef = useRef(null);

  // Fallbacks to safely support older localStorage data
  const normalizedData = React.useMemo(() => {
    const data = resumeData || initialResumeData;
    return {
      ...data,
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
        title: "",
        summary: "",
        objective: "",
        ...(data.personalInfo || {}),
      },
      sectionTitles: {
        objective: "CAREER OBJECTIVE",
        education: "EDUCATION",
        skills: "SKILLS",
        experience: "INTERNSHIP EXPERIENCE",
        projects: "RESEARCH PROJECTS",
        certifications: "CERTIFICATIONS",
        additionalInfo: "ADDITIONAL INFORMATION",
        ...(data.sectionTitles || {}),
      },
      experience: data.experience || [],
      education: data.education || [],
      skills: data.skills || [],
      projects: data.projects || [],
      languages: data.languages || [],
      certifications: data.certifications || [],
      additionalInfo: data.additionalInfo || [],
      settings: {
        primaryColor: "#000000",
        fontSize: "medium",
        fileName: "My_Resume",
        ...(data.settings || {}),
      },
    };
  }, [resumeData]);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: normalizedData.settings?.fileName || `${normalizedData.personalInfo.fullName || "Resume"}_CVFlow`,
  });

  const handleUpdateField = (section, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...(prev?.[section] || {}),
        [field]: value,
      },
    }));
  };

  const resetData = () => {
    if (
      confirm("Are you sure you want to clear all data? This cannot be undone.")
    ) {
      setResumeData(initialResumeData);
    }
  };

  const loadSampleMBAData = () => {
    if (
      confirm("Load the MBA / Corporate example resume template? This will populate all sections with sample data.")
    ) {
      setResumeData(corporateSampleData);
      setActiveTemplate("corporate");
    }
  };

  const templateBtn = (key, label) => (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => setActiveTemplate(key)}
      className={
        activeTemplate === key
          ? "bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
          : "text-slate-600 hover:bg-slate-200"
      }
    >
      {label}
    </Button>
  );

  const templates = {
    corporate: CorporateTemplate,
    classic: ClassicTemplate,
    modern: ModernTemplate,
    modernminimal: ModernMinimalTemplate,
    ats: ATSResumeTemplate,
  };

  const ActiveTemplate = React.useMemo(
    () => templates[activeTemplate] || CorporateTemplate,
    [activeTemplate],
  );

  if (!mounted) return null;

  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col no-print">
        <Navbar />

        <main className="flex-1 pt-16 flex overflow-hidden lg:h-[calc(100vh-64px)] no-print">
          {/* Left Side: Form Controls */}
          <aside className="w-full lg:w-[45%] h-full overflow-y-auto border-r border-slate-200 bg-white p-6 shadow-sm">
            <div className="max-w-2xl mx-auto space-y-6 pb-20">
              <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                <div className="text-center sm:text-left">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Resume Builder
                  </h1>
                  <p className="text-slate-500 text-xs sm:text-sm">
                    Build a recruiter-approved professional resume.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadSampleMBAData}
                    className="border-amber-300 text-amber-800 bg-amber-50 hover:bg-amber-100 transition-colors font-medium shadow-xs"
                    title="Load the MBA / Corporate example from template"
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-600" /> Load Example
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetData}
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-1.5" /> Clear
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsSettingsOpen(true)}
                    className="bg-white border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <Settings className="w-4 h-4 sm:mr-1.5" /> Settings
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handlePrint()}
                    className="bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-md active:scale-95"
                  >
                    <Download className="w-4 h-4 sm:mr-1.5" />
                    <span>Download PDF</span>
                  </Button>
                </div>
              </header>

              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="bg-slate-100/70 border border-slate-200 w-full justify-start overflow-x-auto no-scrollbar mb-6 p-1 rounded-xl gap-1">
                  <TabsTrigger
                    value="personal"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg text-xs sm:text-sm font-medium"
                  >
                    Personal
                  </TabsTrigger>
                  <TabsTrigger
                    value="objective"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg text-xs sm:text-sm font-medium"
                  >
                    Objective
                  </TabsTrigger>
                  <TabsTrigger
                    value="education"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg text-xs sm:text-sm font-medium"
                  >
                    Education
                  </TabsTrigger>
                  <TabsTrigger
                    value="skills"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg text-xs sm:text-sm font-medium"
                  >
                    Skills
                  </TabsTrigger>
                  <TabsTrigger
                    value="experience"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg text-xs sm:text-sm font-medium"
                  >
                    Experience
                  </TabsTrigger>
                  <TabsTrigger
                    value="projects"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg text-xs sm:text-sm font-medium"
                  >
                    Projects
                  </TabsTrigger>
                  <TabsTrigger
                    value="certifications"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg text-xs sm:text-sm font-medium"
                  >
                    Certifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="additional"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg text-xs sm:text-sm font-medium"
                  >
                    Additional Info
                  </TabsTrigger>
                  <TabsTrigger
                    value="titles"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg text-xs sm:text-sm font-medium text-slate-600"
                  >
                    Section Titles
                  </TabsTrigger>
                </TabsList>

                {/* PERSONAL INFO TAB */}
                <TabsContent value="personal" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="Full Name"
                      value={normalizedData.personalInfo.fullName}
                      onChange={(e) =>
                        handleUpdateField(
                          "personalInfo",
                          "fullName",
                          e.target.value,
                        )
                      }
                      placeholder="e.g. RUDRANSH SRIVASTAV"
                    />
                    <FormField
                      label="Job Title / Subtitle"
                      value={normalizedData.personalInfo.title}
                      onChange={(e) =>
                        handleUpdateField("personalInfo", "title", e.target.value)
                      }
                      placeholder="e.g. MBA Candidate | Marketing & Finance"
                      isOptional
                    />
                    <FormField
                      label="Email"
                      value={normalizedData.personalInfo.email}
                      onChange={(e) =>
                        handleUpdateField("personalInfo", "email", e.target.value)
                      }
                      placeholder="e.g. rudranshsrivastav91@gmail.com"
                    />
                    <FormField
                      label="Phone"
                      value={normalizedData.personalInfo.phone}
                      onChange={(e) =>
                        handleUpdateField("personalInfo", "phone", e.target.value)
                      }
                      placeholder="e.g. +91-9696908226"
                      isOptional
                    />
                    <div className="col-span-1 md:col-span-2">
                      <FormField
                        label="Location / Address"
                        value={normalizedData.personalInfo.location}
                        onChange={(e) =>
                          handleUpdateField(
                            "personalInfo",
                            "location",
                            e.target.value,
                          )
                        }
                        placeholder="e.g. Greater Noida, Uttar Pradesh – 201310"
                        isOptional
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-slate-700">
                        Professional Summary (Optional)
                      </label>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                        Optional
                      </span>
                    </div>
                    <textarea
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 h-28 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 resize-none shadow-sm text-sm"
                      value={normalizedData.personalInfo.summary}
                      onChange={(e) =>
                        handleUpdateField(
                          "personalInfo",
                          "summary",
                          e.target.value,
                        )
                      }
                      placeholder="Brief overview of your career background..."
                    />
                  </div>
                </TabsContent>

                {/* CAREER OBJECTIVE TAB */}
                <TabsContent value="objective" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">
                        Career Objective
                      </h3>
                      <p className="text-xs text-slate-500">
                        A focused summary of your career focus and core value proposition.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <textarea
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 h-36 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 shadow-sm text-sm leading-relaxed"
                      value={normalizedData.personalInfo.objective}
                      onChange={(e) => {
                        handleUpdateField("personalInfo", "objective", e.target.value);
                        if (!normalizedData.personalInfo.summary) {
                          handleUpdateField("personalInfo", "summary", e.target.value);
                        }
                      }}
                      placeholder="e.g. Motivated and analytical MBA student specializing in Marketing & Finance with practical internship exposure in financial services (BFSI), client acquisition, investment analysis, and market research. Seeking to leverage analytical competencies, financial modeling, customer relationship skills, and AI for Managers training to drive business growth and strategic marketing excellence in a dynamic corporate environment."
                    />

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <span className="text-xs font-semibold text-slate-600">Quick Objective Presets:</span>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 bg-white"
                          onClick={() => {
                            const val = "Motivated and analytical MBA student specializing in Marketing & Finance with practical internship exposure in financial services (BFSI), client acquisition, investment analysis, and market research. Seeking to leverage analytical competencies, financial modeling, customer relationship skills, and AI for Managers training to drive business growth and strategic marketing excellence in a dynamic corporate environment.";
                            handleUpdateField("personalInfo", "objective", val);
                            handleUpdateField("personalInfo", "summary", val);
                          }}
                        >
                          MBA (Marketing & Finance)
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 bg-white"
                          onClick={() => {
                            const val = "Results-driven Software Engineer with a solid background in full-stack web development, RESTful APIs, and cloud services. Seeking to apply strong algorithmic problem-solving and clean code practices to deliver high-impact digital solutions in an agile environment.";
                            handleUpdateField("personalInfo", "objective", val);
                            handleUpdateField("personalInfo", "summary", val);
                          }}
                        >
                          Software / Tech
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 bg-white"
                          onClick={() => {
                            const val = "Detail-oriented Finance & Marketing professional with hands-on experience in financial modeling, valuation, equity analysis, and consumer market strategy. Seeking an opportunity to drive financial profitability, strategic growth, and brand leadership in a dynamic corporate environment.";
                            handleUpdateField("personalInfo", "objective", val);
                            handleUpdateField("personalInfo", "summary", val);
                          }}
                        >
                          Finance & Marketing
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* EDUCATION TAB */}
                <TabsContent value="education" className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">
                        Education
                      </h3>
                      <p className="text-xs text-slate-500">
                        Degrees, diplomas, Class XII and Class X qualifications.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg group"
                      onClick={() => {
                        const newEdu = {
                          id: Math.random().toString(36).substr(2, 9),
                          school: "",
                          degree: "",
                          fieldOfStudy: "",
                          startDate: "",
                          endDate: "",
                          score: "",
                        };
                        setResumeData((prev) => ({
                          ...prev,
                          education: [...(prev.education || []), newEdu],
                        }));
                      }}
                    >
                      <Plus className="w-3 h-3 mr-1 group-hover:rotate-90 transition-transform" />{" "}
                      Add Education
                    </Button>
                  </div>

                  {normalizedData.education.map((edu, index) => (
                    <div
                      key={edu.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 relative group shadow-sm"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                        onClick={() => {
                          setResumeData((prev) => ({
                            ...prev,
                            education: prev.education.filter((e) => e.id !== edu.id),
                          }));
                        }}
                      >
                        ×
                      </Button>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <FormField
                            label="Degree / Examination Name"
                            value={edu.degree}
                            onChange={(e) => {
                              const newEdu = [...normalizedData.education];
                              newEdu[index].degree = e.target.value;
                              setResumeData({ ...normalizedData, education: newEdu });
                            }}
                            placeholder="e.g. Master of Business Administration (Marketing & Finance)"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <FormField
                            label="School / College / University"
                            value={edu.school}
                            onChange={(e) => {
                              const newEdu = [...normalizedData.education];
                              newEdu[index].school = e.target.value;
                              setResumeData({ ...normalizedData, education: newEdu });
                            }}
                            placeholder="e.g. Greater Noida Institute of Technology"
                          />
                        </div>
                        <FormField
                          label="Start Year"
                          value={edu.startDate}
                          onChange={(e) => {
                            const newEdu = [...normalizedData.education];
                            newEdu[index].startDate = e.target.value;
                            setResumeData({ ...normalizedData, education: newEdu });
                          }}
                          placeholder="e.g. 2021"
                          isOptional
                        />
                        <FormField
                          label="End Year (or Expected)"
                          value={edu.endDate}
                          onChange={(e) => {
                            const newEdu = [...normalizedData.education];
                            newEdu[index].endDate = e.target.value;
                            setResumeData({ ...normalizedData, education: newEdu });
                          }}
                          placeholder="e.g. Expected 2027 or 2024"
                        />
                        <div className="sm:col-span-2">
                          <FormField
                            label="Percentage / CGPA"
                            value={edu.score || ""}
                            onChange={(e) => {
                              const newEdu = [...normalizedData.education];
                              newEdu[index].score = e.target.value;
                              setResumeData({ ...normalizedData, education: newEdu });
                            }}
                            placeholder="e.g. 8.5 CGPA or 85%"
                            isOptional
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                {/* SKILLS TAB */}
                <TabsContent value="skills" className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">
                        Skills
                      </h3>
                      <p className="text-xs text-slate-500">
                        Group skills by category to get the clean corporate two-column format.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg group"
                      onClick={() => {
                        const newSkill = {
                          id: Math.random().toString(36).substr(2, 9),
                          category: "Core Competencies",
                          name: "",
                          level: "Expert",
                        };
                        setResumeData((prev) => ({
                          ...prev,
                          skills: [...(prev.skills || []), newSkill],
                        }));
                      }}
                    >
                      <Plus className="w-3 h-3 mr-1 group-hover:rotate-90 transition-transform" />{" "}
                      Add Skill Group
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {normalizedData.skills.map((skill, index) => (
                      <div
                        key={skill.id}
                        className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 relative group shadow-xs"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-7 w-7 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                          onClick={() => {
                            setResumeData((prev) => ({
                              ...prev,
                              skills: prev.skills.filter((s) => s.id !== skill.id),
                            }));
                          }}
                        >
                          ×
                        </Button>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="text-xs font-semibold text-slate-700 block mb-1">
                              Category / Title:
                            </label>
                            <input
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="e.g. Technical & Tools"
                              value={skill.category || ""}
                              onChange={(e) => {
                                const newSkills = [...normalizedData.skills];
                                newSkills[index].category = e.target.value;
                                setResumeData({ ...normalizedData, skills: newSkills });
                              }}
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="text-xs font-semibold text-slate-700 block mb-1">
                              Skills (comma-separated):
                            </label>
                            <input
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="e.g. Advanced MS Excel, ADCA, MS Office Suite"
                              value={skill.name}
                              onChange={(e) => {
                                const newSkills = [...normalizedData.skills];
                                newSkills[index].name = e.target.value;
                                setResumeData({ ...normalizedData, skills: newSkills });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-600">Quick Add Category:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Sales & Acquisition",
                        "Market Research",
                        "Digital & AI",
                        "Technical & Tools",
                        "Core Competencies",
                        "Languages Known",
                      ].map((catName) => (
                        <Button
                          key={catName}
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs h-6 px-2 bg-white"
                          onClick={() => {
                            const newSkill = {
                              id: Math.random().toString(36).substr(2, 9),
                              category: catName,
                              name: "",
                              level: "Expert",
                            };
                            setResumeData((prev) => ({
                              ...prev,
                              skills: [...(prev.skills || []), newSkill],
                            }));
                          }}
                        >
                          + {catName}
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* EXPERIENCE TAB */}
                <TabsContent value="experience" className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">
                        Internship / Work Experience
                      </h3>
                      <p className="text-xs text-slate-500">
                        Separate achievements into separate lines; they will render as professional bullet points.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg group"
                      onClick={() => {
                        const newExp = {
                          id: Math.random().toString(36).substr(2, 9),
                          company: "",
                          position: "",
                          location: "",
                          startDate: "",
                          endDate: "",
                          description: "",
                          current: false,
                        };
                        setResumeData((prev) => ({
                          ...prev,
                          experience: [...(prev.experience || []), newExp],
                        }));
                      }}
                    >
                      <Plus className="w-3 h-3 mr-1 group-hover:rotate-90 transition-transform" />{" "}
                      Add Experience
                    </Button>
                  </div>

                  {normalizedData.experience.map((exp, index) => (
                    <div
                      key={exp.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 relative group shadow-sm"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                        onClick={() => {
                          setResumeData((prev) => ({
                            ...prev,
                            experience: prev.experience.filter((e) => e.id !== exp.id),
                          }));
                        }}
                      >
                        ×
                      </Button>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          label="Company / Organization"
                          value={exp.company}
                          onChange={(e) => {
                            const newExp = [...normalizedData.experience];
                            newExp[index].company = e.target.value;
                            setResumeData({ ...normalizedData, experience: newExp });
                          }}
                          placeholder="e.g. Impactra Consulting"
                        />
                        <FormField
                          label="Location"
                          value={exp.location}
                          onChange={(e) => {
                            const newExp = [...normalizedData.experience];
                            newExp[index].location = e.target.value;
                            setResumeData({ ...normalizedData, experience: newExp });
                          }}
                          placeholder="e.g. Noida, India"
                          isOptional
                        />
                        <div className="sm:col-span-2">
                          <FormField
                            label="Role / Position"
                            value={exp.position}
                            onChange={(e) => {
                              const newExp = [...normalizedData.experience];
                              newExp[index].position = e.target.value;
                              setResumeData({ ...normalizedData, experience: newExp });
                            }}
                            placeholder="e.g. Management Intern – Sales & Market Research"
                          />
                        </div>
                        <FormField
                          label="Start Date"
                          value={exp.startDate}
                          onChange={(e) => {
                            const newExp = [...normalizedData.experience];
                            newExp[index].startDate = e.target.value;
                            setResumeData({ ...normalizedData, experience: newExp });
                          }}
                          placeholder="e.g. May 2026"
                        />
                        <FormField
                          label="End Date"
                          value={exp.endDate}
                          onChange={(e) => {
                            const newExp = [...normalizedData.experience];
                            newExp[index].endDate = e.target.value;
                            setResumeData({ ...normalizedData, experience: newExp });
                          }}
                          placeholder="e.g. July 2026 or Present"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">
                          Bullet Points / Responsibilities (one per line):
                        </label>
                        <textarea
                          className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 min-h-[110px] shadow-sm leading-relaxed"
                          placeholder="• Executed direct customer outreach and pitched tailored insurance financial products...&#10;• Designed and distributed structured primary research questionnaires..."
                          value={exp.description}
                          onChange={(e) => {
                            const newExp = [...normalizedData.experience];
                            newExp[index].description = e.target.value;
                            setResumeData({ ...normalizedData, experience: newExp });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </TabsContent>

                {/* PROJECTS TAB */}
                <TabsContent value="projects" className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">
                        Research & Academic Projects
                      </h3>
                      <p className="text-xs text-slate-500">
                        Add project title, client/institution, and bulleted results.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg group"
                      onClick={() => {
                        const newProject = {
                          id: Math.random().toString(36).substr(2, 9),
                          name: "",
                          organization: "",
                          description: "",
                          technologies: [],
                        };
                        setResumeData((prev) => ({
                          ...prev,
                          projects: [...(prev.projects || []), newProject],
                        }));
                      }}
                    >
                      <Plus className="w-3 h-3 mr-1 group-hover:rotate-90 transition-transform" />{" "}
                      Add Project
                    </Button>
                  </div>

                  {normalizedData.projects.map((project, index) => (
                    <div
                      key={project.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 relative group shadow-sm"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                        onClick={() => {
                          setResumeData((prev) => ({
                            ...prev,
                            projects: prev.projects.filter((p) => p.id !== project.id),
                          }));
                        }}
                      >
                        ×
                      </Button>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          label="Project Title"
                          value={project.name}
                          onChange={(e) => {
                            const newProjects = [...normalizedData.projects];
                            newProjects[index].name = e.target.value;
                            setResumeData({ ...normalizedData, projects: newProjects });
                          }}
                          placeholder="e.g. Social Media Marketing in the BFSI Sector"
                        />
                        <FormField
                          label="Institution / Partner / Link"
                          value={project.organization || ""}
                          onChange={(e) => {
                            const newProjects = [...normalizedData.projects];
                            newProjects[index].organization = e.target.value;
                            setResumeData({ ...normalizedData, projects: newProjects });
                          }}
                          placeholder="e.g. GNIOT & Impactra Consulting"
                          isOptional
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">
                          Project Description (one bullet point per line):
                        </label>
                        <textarea
                          className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 min-h-[90px] shadow-sm leading-relaxed"
                          placeholder="• Conducted comprehensive primary research with 103 respondents...&#10;• Identified that 49% of respondents discover financial products via social platforms..."
                          value={project.description}
                          onChange={(e) => {
                            const newProjects = [...normalizedData.projects];
                            newProjects[index].description = e.target.value;
                            setResumeData({ ...normalizedData, projects: newProjects });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </TabsContent>

                {/* CERTIFICATIONS TAB */}
                <TabsContent value="certifications" className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-primary" /> Certifications & Courses
                      </h3>
                      <p className="text-xs text-slate-500">
                        Professional certificates, workshops, and certified programs.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg group"
                      onClick={() => {
                        const newCert = {
                          id: Math.random().toString(36).substr(2, 9),
                          name: "",
                          issuer: "",
                          date: "",
                        };
                        setResumeData((prev) => ({
                          ...prev,
                          certifications: [...(prev.certifications || []), newCert],
                        }));
                      }}
                    >
                      <Plus className="w-3 h-3 mr-1 group-hover:rotate-90 transition-transform" />{" "}
                      Add Certification
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {normalizedData.certifications.map((cert, index) => (
                      <div
                        key={cert.id}
                        className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 relative group shadow-xs space-y-3"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full h-7 w-7"
                          onClick={() => {
                            setResumeData((prev) => ({
                              ...prev,
                              certifications: prev.certifications.filter((c) => c.id !== cert.id),
                            }));
                          }}
                        >
                          ×
                        </Button>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="sm:col-span-2">
                            <label className="text-xs font-semibold text-slate-700 block mb-1">
                              Certification Name / Title:
                            </label>
                            <input
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="e.g. AI for Managers – Professional Certification Course"
                              value={cert.name}
                              onChange={(e) => {
                                const newCerts = [...normalizedData.certifications];
                                newCerts[index].name = e.target.value;
                                setResumeData({ ...normalizedData, certifications: newCerts });
                              }}
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-slate-700 block mb-1">
                              Issuing Institute / Org (Optional):
                            </label>
                            <input
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="e.g. IIM Rohtak"
                              value={cert.issuer || ""}
                              onChange={(e) => {
                                const newCerts = [...normalizedData.certifications];
                                newCerts[index].issuer = e.target.value;
                                setResumeData({ ...normalizedData, certifications: newCerts });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {normalizedData.certifications.length === 0 && (
                    <div className="p-8 border border-dashed border-slate-200 rounded-2xl text-center text-slate-400 space-y-2">
                      <Award className="w-8 h-8 mx-auto stroke-1" />
                      <p className="text-sm">No certifications added yet.</p>
                      <p className="text-xs">Click "Add Certification" or "Load Example" above to get started.</p>
                    </div>
                  )}
                </TabsContent>

                {/* ADDITIONAL INFO TAB */}
                <TabsContent value="additional" className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 flex items-center gap-1.5">
                        <Info className="w-4 h-4 text-primary" /> Additional Information
                      </h3>
                      <p className="text-xs text-slate-500">
                        Languages known, declaration statements, co-curricular achievements.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg group"
                      onClick={() => {
                        const newInfo = {
                          id: Math.random().toString(36).substr(2, 9),
                          label: "Languages Known",
                          value: "",
                        };
                        setResumeData((prev) => ({
                          ...prev,
                          additionalInfo: [...(prev.additionalInfo || []), newInfo],
                        }));
                      }}
                    >
                      <Plus className="w-3 h-3 mr-1 group-hover:rotate-90 transition-transform" />{" "}
                      Add Item
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {normalizedData.additionalInfo.map((info, index) => (
                      <div
                        key={info.id}
                        className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 relative group shadow-xs space-y-3"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full h-7 w-7"
                          onClick={() => {
                            setResumeData((prev) => ({
                              ...prev,
                              additionalInfo: prev.additionalInfo.filter((i) => i.id !== info.id),
                            }));
                          }}
                        >
                          ×
                        </Button>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="text-xs font-semibold text-slate-700 block mb-1">
                              Title / Label:
                            </label>
                            <input
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="e.g. Languages Known"
                              value={info.label || ""}
                              onChange={(e) => {
                                const newInfoList = [...normalizedData.additionalInfo];
                                newInfoList[index].label = e.target.value;
                                setResumeData({ ...normalizedData, additionalInfo: newInfoList });
                              }}
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="text-xs font-semibold text-slate-700 block mb-1">
                              Details / Value:
                            </label>
                            <input
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="e.g. English (Professional Working Proficiency), Hindi (Native / Fluent)"
                              value={info.value}
                              onChange={(e) => {
                                const newInfoList = [...normalizedData.additionalInfo];
                                newInfoList[index].value = e.target.value;
                                setResumeData({ ...normalizedData, additionalInfo: newInfoList });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-600">Quick Add:</span>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-xs h-7 bg-white"
                        onClick={() => {
                          const newInfo = {
                            id: Math.random().toString(36).substr(2, 9),
                            label: "Languages Known",
                            value: "English (Professional Working Proficiency), Hindi (Native / Fluent)",
                          };
                          setResumeData((prev) => ({
                            ...prev,
                            additionalInfo: [...(prev.additionalInfo || []), newInfo],
                          }));
                        }}
                      >
                        + Languages Known
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-xs h-7 bg-white"
                        onClick={() => {
                          const newInfo = {
                            id: Math.random().toString(36).substr(2, 9),
                            label: "Declaration",
                            value: "I hereby declare that all the information stated above is complete, authentic, and true to the best of my knowledge.",
                          };
                          setResumeData((prev) => ({
                            ...prev,
                            additionalInfo: [...(prev.additionalInfo || []), newInfo],
                          }));
                        }}
                      >
                        + Declaration
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* SECTION TITLES TAB */}
                <TabsContent value="titles" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 flex items-center gap-1.5">
                        <SlidersHorizontal className="w-4 h-4 text-primary" /> Section Titles Customization
                      </h3>
                      <p className="text-xs text-slate-500">
                        Customize section titles to match your institution or industry standard.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs text-slate-500 hover:text-slate-900"
                      onClick={() => {
                        setResumeData((prev) => ({
                          ...prev,
                          sectionTitles: {
                            objective: "CAREER OBJECTIVE",
                            education: "EDUCATION",
                            skills: "SKILLS",
                            experience: "INTERNSHIP EXPERIENCE",
                            projects: "RESEARCH PROJECTS",
                            certifications: "CERTIFICATIONS",
                            additionalInfo: "ADDITIONAL INFORMATION",
                          },
                        }));
                      }}
                    >
                      <RotateCcw className="w-3 h-3 mr-1" /> Reset to Defaults
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <FormField
                      label="Career Objective Title"
                      value={normalizedData.sectionTitles?.objective || "CAREER OBJECTIVE"}
                      onChange={(e) => handleUpdateField("sectionTitles", "objective", e.target.value)}
                      placeholder="e.g. CAREER OBJECTIVE"
                    />
                    <FormField
                      label="Education Title"
                      value={normalizedData.sectionTitles?.education || "EDUCATION"}
                      onChange={(e) => handleUpdateField("sectionTitles", "education", e.target.value)}
                      placeholder="e.g. EDUCATION"
                    />
                    <FormField
                      label="Skills Title"
                      value={normalizedData.sectionTitles?.skills || "SKILLS"}
                      onChange={(e) => handleUpdateField("sectionTitles", "skills", e.target.value)}
                      placeholder="e.g. SKILLS"
                    />
                    <FormField
                      label="Experience Title"
                      value={normalizedData.sectionTitles?.experience || "INTERNSHIP EXPERIENCE"}
                      onChange={(e) => handleUpdateField("sectionTitles", "experience", e.target.value)}
                      placeholder="e.g. INTERNSHIP EXPERIENCE or WORK EXPERIENCE"
                    />
                    <FormField
                      label="Projects Title"
                      value={normalizedData.sectionTitles?.projects || "RESEARCH PROJECTS"}
                      onChange={(e) => handleUpdateField("sectionTitles", "projects", e.target.value)}
                      placeholder="e.g. RESEARCH PROJECTS or KEY PROJECTS"
                    />
                    <FormField
                      label="Certifications Title"
                      value={normalizedData.sectionTitles?.certifications || "CERTIFICATIONS"}
                      onChange={(e) => handleUpdateField("sectionTitles", "certifications", e.target.value)}
                      placeholder="e.g. CERTIFICATIONS"
                    />
                    <div className="sm:col-span-2">
                      <FormField
                        label="Additional Information Title"
                        value={normalizedData.sectionTitles?.additionalInfo || "ADDITIONAL INFORMATION"}
                        onChange={(e) => handleUpdateField("sectionTitles", "additionalInfo", e.target.value)}
                        placeholder="e.g. ADDITIONAL INFORMATION"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </aside>

          {/* Right Side: Instant Preview */}
          <section className="hidden lg:block flex-1 bg-slate-200/50 overflow-y-auto p-8 scrollbar-none">
            <div className="max-w-[1024px] mx-auto space-y-4">
              <div className="flex items-center justify-between bg-white/70 backdrop-blur-md p-3 rounded-2xl border border-white shadow-sm ring-1 ring-slate-200/50">
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl flex-wrap">
                  {templateBtn("corporate", "Corporate")}
                  {templateBtn("classic", "Classic")}
                  {templateBtn("modern", "Modern")}
                  {templateBtn("modernminimal", "Minimal")}
                  {templateBtn("ats", "ATS")}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsSettingsOpen(true)}
                    className="bg-white border-slate-200 text-slate-700"
                  >
                    <Settings className="w-3.5 h-3.5 mr-1.5" /> Options
                  </Button>
                  <Button
                    size="sm"
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 shadow-md shadow-slate-900/10"
                    onClick={() => handlePrint()}
                  >
                    <Download className="w-4 h-4 mr-1.5" /> Download PDF
                  </Button>
                </div>
              </div>

              {/* Resume Preview Paper */}
              <div className="flex justify-center pb-12">
                <div
                  className="bg-white text-black shadow-2xl min-h-[297mm] print-area rounded-sm overflow-hidden transform transition-all duration-300 shadow-slate-300/50"
                  style={{
                    width: "210mm",
                    transform: `scale(${previewScale})`,
                    transformOrigin: "top center",
                  }}
                >
                  <ActiveTemplate data={normalizedData} />
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Mobile Preview Toggle */}
        <div className="lg:hidden fixed bottom-6 right-6 z-50 no-print">
          <Button
            size="icon"
            className="w-14 h-14 rounded-full shadow-2xl bg-slate-900 text-white hover:bg-slate-800 transition-all scale-110 active:scale-95"
            onClick={() => setIsPreviewOpen(true)}
          >
            <Eye className="w-6 h-6" />
          </Button>
        </div>

        {/* Mobile Preview Overlay */}
        {isPreviewOpen && (
          <div className="fixed inset-0 z-[100] bg-black p-2 sm:p-4 flex flex-col lg:hidden no-print">
            <div className="flex flex-col gap-3 mb-4 px-2">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Preview</h2>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsSettingsOpen(true)}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Settings className="w-4 h-4 sm:mr-1.5" />
                    <span className="hidden sm:inline">Settings</span>
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePrint()}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Download className="w-4 h-4 sm:mr-1.5" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setIsPreviewOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>

              {/* TEMPLATE SWITCHER */}
              <div className="flex gap-1.5 overflow-x-auto p-1 bg-white/10 rounded-xl">
                {templateBtn("corporate", "Corporate")}
                {templateBtn("classic", "Classic")}
                {templateBtn("modern", "Modern")}
                {templateBtn("modernminimal", "Minimal")}
                {templateBtn("ats", "ATS")}
              </div>
            </div>

            <div className="flex-1 bg-white rounded-xl overflow-auto w-full flex justify-center py-4 px-2">
              <div
                className="relative shadow-2xl"
                style={{
                  width: `${794 * previewScale}px`,
                  height: `${1122 * previewScale}px`,
                  overflow: 'hidden'
                }}
              >
                <div
                  className="print-area bg-white rounded-sm origin-top-left"
                  style={{
                    width: "794px",
                    height: "1122px",
                    transform: `scale(${previewScale})`,
                  }}
                >
                  <ActiveTemplate data={normalizedData} />
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-slate-900 border border-slate-800 rounded-xl text-center text-xs text-slate-400">
              Desktop view recommended for live side-by-side editing.
            </div>
          </div>
        )}

        {/* Settings Dialog */}
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Resume Settings</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              {/* File Name */}
              <div className="space-y-3">
                <Label>File Name (for PDF download)</Label>
                <Input
                  value={normalizedData.settings?.fileName || ""}
                  onChange={(e) =>
                    handleUpdateField("settings", "fileName", e.target.value)
                  }
                  placeholder="e.g. Rudransh_Srivastav_Resume"
                  className="rounded-xl border-slate-200 focus:ring-primary/20"
                />
                <p className="text-[10px] text-slate-400">Your PDF will be exported with this name.</p>
              </div>

              {/* Theme Color */}
              <div className="space-y-3">
                <Label>Primary Heading Color</Label>
                <div className="flex flex-wrap gap-2">
                  {colorPresets.map((color) => (
                    <button
                      key={color.value}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${normalizedData.settings?.primaryColor === color.value
                          ? "border-slate-900 scale-110 shadow-sm"
                          : "border-transparent"
                        }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() =>
                        handleUpdateField("settings", "primaryColor", color.value)
                      }
                      title={color.name}
                    />
                  ))}
                  <div className="relative w-8 h-8 rounded-full border-2 border-slate-200 overflow-hidden ring-offset-2 focus-within:ring-2 focus-within:ring-slate-400">
                    <input
                      type="color"
                      className="absolute inset-0 w-full h-full cursor-pointer scale-150 outline-none border-none p-0"
                      value={normalizedData.settings?.primaryColor || "#000000"}
                      onChange={(e) =>
                        handleUpdateField("settings", "primaryColor", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Font Size */}
              <div className="space-y-3">
                <Label>Font Size</Label>
                <Select
                  value={normalizedData.settings?.fontSize || "medium"}
                  onValueChange={(value) =>
                    handleUpdateField("settings", "fontSize", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (Fit more content)</SelectItem>
                    <SelectItem value="medium">Medium (Standard)</SelectItem>
                    <SelectItem value="large">Large (High legibility)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsSettingsOpen(false)} className="w-full sm:w-auto">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Printer: Isolated sibling to ensure it prints properly */}
      <div
        className="fixed top-0 left-0 -z-9999 pointer-events-none print-only"
        aria-hidden="true"
        style={{ width: "210mm", minHeight: "297mm", overflow: "visible", background: "white" }}
      >
        <div ref={componentRef} className="print-area bg-white text-black p-0 m-0">
          {mounted && <ActiveTemplate data={normalizedData} />}
        </div>
      </div>
    </>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  isOptional = false,
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <label className="text-xs font-semibold text-slate-700">{label}</label>
        {isOptional && (
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
            Optional
          </span>
        )}
      </div>
      <input
        type={type}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 shadow-xs text-sm"
      />
    </div>
  );
}
