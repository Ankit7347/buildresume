"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLocalStorageTTL } from "@/lib/hooks/use-local-storage-ttl";
import { initialResumeData } from "@/lib/types";
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
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { ModernMinimalTemplate } from "@/components/templates/ModernMinimalTemplate";
import { ATSResumeTemplate } from "@/components/templates/ATSResumeTemplate";

export default function BuilderPage() {
  const [resumeData, setResumeData] = useLocalStorageTTL(
    "resume-data",
    initialResumeData,
  );
  const [activeTemplate, setActiveTemplate] = useState("classic");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);
  const colorPresets = [
    { name: "Slate", value: "#0f172a" },
    { name: "Blue", value: "#2563eb" },
    { name: "Indigo", value: "#4f46e5" },
    { name: "Violet", value: "#7c3aed" },
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
        // Desktop: calculate scale based on the preview pane roughly
        // The preview pane is roughly 55% of the screen minus padding
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

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${resumeData.personalInfo.fullName || "Resume"}_CVFlow`,
  });


  const handleUpdateField = (section, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
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
  const templateBtn = (key, label) => (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => setActiveTemplate(key)}
      className={
        activeTemplate === key
          ? "bg-slate-900 text-white hover:bg-slate-800"
          : "text-slate-600 hover:bg-slate-200"
      }
    >
      {label}
    </Button>
  );
  const templates = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    modernminimal: ModernMinimalTemplate,
    ats: ATSResumeTemplate,
  };

  const ActiveTemplate = React.useMemo(
    () => templates[activeTemplate],
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
          <div className="max-w-2xl mx-auto space-y-8 pb-20">
            <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
              <div className="text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Resume Builder
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm">
                  Draft your professional footprint.
                </p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetData}
                  className="flex-1 sm:flex-none border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Clear All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSettingsOpen(true)}
                  className="flex-1 sm:flex-none bg-white border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <Settings className="w-4 h-4 sm:mr-2" /> Settings
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handlePrint()}
                  className="flex-1 sm:flex-none bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-md active:scale-95"
                >
                  <Download className="w-4 h-4 sm:mr-2" /> 
                  <span className="hidden sm:inline">Download PDF</span>
                  <span className="sm:hidden">Download</span>
                </Button>


              </div>
            </header>

            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="bg-slate-100/50 border border-slate-200 w-full justify-start overflow-x-auto no-scrollbar mb-6 p-1 rounded-xl">
                <TabsTrigger
                  value="personal"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
                >
                  Personal
                </TabsTrigger>
                <TabsTrigger
                  value="experience"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
                >
                  Experience
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
                >
                  Education
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
                >
                  Skills
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
                >
                  Projects
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                {/* Personal Info Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Full Name"
                    value={resumeData.personalInfo.fullName}
                    onChange={(e) =>
                      handleUpdateField(
                        "personalInfo",
                        "fullName",
                        e.target.value,
                      )
                    }
                    placeholder="John Doe"
                  />
                  <FormField
                    label="Job Title"
                    value={resumeData.personalInfo.title}
                    onChange={(e) =>
                      handleUpdateField("personalInfo", "title", e.target.value)
                    }
                    placeholder="Senior Developer"
                    isOptional
                  />
                  <FormField
                    label="Email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) =>
                      handleUpdateField("personalInfo", "email", e.target.value)
                    }
                    placeholder="john@example.com"
                  />
                  <FormField
                    label="Phone"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) =>
                      handleUpdateField("personalInfo", "phone", e.target.value)
                    }
                    placeholder="+1 234 567 890"
                    isOptional
                  />
                  <FormField
                    label="Location"
                    value={resumeData.personalInfo.location}
                    onChange={(e) =>
                      handleUpdateField(
                        "personalInfo",
                        "location",
                        e.target.value,
                      )
                    }
                    placeholder="New York, NY"
                    isOptional
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-600">
                      Professional Summary
                    </label>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                      Optional
                    </span>
                  </div>
                  <textarea
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 h-32 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 resize-none shadow-sm text-base sm:text-sm"
                    value={resumeData.personalInfo.summary}
                    onChange={(e) =>
                      handleUpdateField(
                        "personalInfo",
                        "summary",
                        e.target.value,
                      )
                    }
                    placeholder="Briefly describe your career goals and achievements..."
                  />
                </div>
              </TabsContent>

              <TabsContent value="experience" className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Work Experience
                    </h3>
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
                          experience: [...prev.experience, newExp],
                        }));
                      }}
                    >
                      <Plus className="w-3 h-3 mr-1 group-hover:rotate-90 transition-transform" />{" "}
                      Add Experience
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 italic">
                    Optional. Add only if relevant to your career stage.
                  </p>
                </div>

                {resumeData.experience.map((exp, index) => (
                  <div
                    key={exp.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 relative group shadow-sm"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all rounded-full"
                      onClick={() => {
                        setResumeData((prev) => ({
                          ...prev,
                          experience: prev.experience.filter(
                            (e) => e.id !== exp.id,
                          ),
                        }));
                      }}
                    >
                      ×
                    </Button>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        label="Company"
                        value={exp.company}
                        onChange={(e) => {
                          const newExp = [...resumeData.experience];
                          newExp[index].company = e.target.value;
                          setResumeData({ ...resumeData, experience: newExp });
                        }}
                      />
                      <FormField
                        label="Position"
                        value={exp.position}
                        onChange={(e) => {
                          const newExp = [...resumeData.experience];
                          newExp[index].position = e.target.value;
                          setResumeData({ ...resumeData, experience: newExp });
                        }}
                      />
                      <FormField
                        label="Start Date"
                        value={exp.startDate}
                        onChange={(e) => {
                          const newExp = [...resumeData.experience];
                          newExp[index].startDate = e.target.value;
                          setResumeData({ ...resumeData, experience: newExp });
                        }}
                      />
                      {!exp.current && (
                        <FormField
                          label="End Date"
                          value={exp.endDate}
                          onChange={(e) => {
                            const newExp = [...resumeData.experience];
                            newExp[index].endDate = e.target.value;
                            setResumeData({
                              ...resumeData,
                              experience: newExp,
                            });
                          }}
                        />
                      )}
                    </div>
                    <textarea
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 min-h-[100px] shadow-sm"
                      placeholder="Key achievements and responsibilities..."
                      value={exp.description}
                      onChange={(e) => {
                        const newExp = [...resumeData.experience];
                        newExp[index].description = e.target.value;
                        setResumeData({ ...resumeData, experience: newExp });
                      }}
                    />
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="education" className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Education
                  </h3>
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
                        education: [...prev.education, newEdu],
                      }));
                    }}
                  >
                    <Plus className="w-3 h-3 mr-1 group-hover:rotate-90 transition-transform" />{" "}
                    Add Education
                  </Button>
                </div>

                {resumeData.education.map((edu, index) => (
                  <div
                    key={edu.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 relative group shadow-sm"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all rounded-full"
                      onClick={() => {
                        setResumeData((prev) => ({
                          ...prev,
                          education: prev.education.filter(
                            (e) => e.id !== edu.id,
                          ),
                        }));
                      }}
                    >
                      ×
                    </Button>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        label="School / University"
                        value={edu.school}
                        onChange={(e) => {
                          const newEdu = [...resumeData.education];
                          newEdu[index].school = e.target.value;
                          setResumeData({ ...resumeData, education: newEdu });
                        }}
                      />
                      <FormField
                        label="Degree"
                        value={edu.degree}
                        onChange={(e) => {
                          const newEdu = [...resumeData.education];
                          newEdu[index].degree = e.target.value;
                          setResumeData({ ...resumeData, education: newEdu });
                        }}
                      />
                      <FormField
                        label="Start Year"
                        value={edu.startDate}
                        onChange={(e) => {
                          const newEdu = [...resumeData.education];
                          newEdu[index].startDate = e.target.value;
                          setResumeData({ ...resumeData, education: newEdu });
                        }}
                        placeholder="e.g. 2018"
                      />
                      <FormField
                        label="End Year (or Expected)"
                        value={edu.endDate}
                        onChange={(e) => {
                          const newEdu = [...resumeData.education];
                          newEdu[index].endDate = e.target.value;
                          setResumeData({ ...resumeData, education: newEdu });
                        }}
                        placeholder="e.g. 2022"
                      />
                      <div className="col-span-2">
                        <FormField
                          label="Percentage / CGPA"
                          value={edu.score || ""}
                          onChange={(e) => {
                            const newEdu = [...resumeData.education];
                            newEdu[index].score = e.target.value;
                            setResumeData({ ...resumeData, education: newEdu });
                          }}
                          placeholder="e.g. 8.5 CGPA or 85%"
                          isOptional={true}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Skills
                  </h3>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg group"
                    onClick={() => {
                      const newSkill = {
                        id: Math.random().toString(36).substr(2, 9),
                        name: "",
                        level: "Intermediate",
                      };
                      setResumeData((prev) => ({
                        ...prev,
                        skills: [...prev.skills, newSkill],
                      }));
                    }}
                  >
                    <Plus className="w-3 h-3 mr-1 group-hover:rotate-90 transition-transform" />{" "}
                    Add Skill
                  </Button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {resumeData.skills.map((skill, index) => (
                    <div
                      key={skill.id}
                      className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-2 gap-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all"
                    >
                      <input
                        className="bg-transparent border-none focus:outline-none text-sm flex-1 text-slate-900 font-medium px-2"
                        placeholder="e.g. React"
                        value={skill.name}
                        onChange={(e) => {
                          const newSkills = [...resumeData.skills];
                          newSkills[index].name = e.target.value;
                          setResumeData({ ...resumeData, skills: newSkills });
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                        onClick={() => {
                          setResumeData((prev) => ({
                            ...prev,
                            skills: prev.skills.filter(
                              (s) => s.id !== skill.id,
                            ),
                          }));
                        }}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="projects" className="space-y-6 pb-20">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Projects
                    </h3>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg group"
                      onClick={() => {
                        const newProject = {
                          id: Math.random().toString(36).substr(2, 9),
                          name: "",
                          description: "",
                          technologies: [],
                        };
                        setResumeData((prev) => ({
                          ...prev,
                          projects: [...prev.projects, newProject],
                        }));
                      }}
                    >
                      <Plus className="w-3 h-3 mr-1 group-hover:rotate-90 transition-transform" />{" "}
                      Add Project
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 italic">
                    Optional. Add only if relevant to your career stage.
                  </p>
                </div>

                {resumeData.projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 relative group shadow-sm"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-100 group-hover:opacity-100 transition-all rounded-full"
                      onClick={() => {
                        setResumeData((prev) => ({
                          ...prev,
                          projects: prev.projects.filter(
                            (p) => p.id !== project.id,
                          ),
                        }));
                      }}
                    >
                      ×
                    </Button>
                    <FormField
                      label="Project Name"
                      value={project.name}
                      onChange={(e) => {
                        const newProjects = [...resumeData.projects];
                        newProjects[index].name = e.target.value;
                        setResumeData({ ...resumeData, projects: newProjects });
                      }}
                    />
                    <textarea
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 min-h-[80px] shadow-sm"
                      placeholder="Project description and link..."
                      value={project.description}
                      onChange={(e) => {
                        const newProjects = [...resumeData.projects];
                        newProjects[index].description = e.target.value;
                        setResumeData({ ...resumeData, projects: newProjects });
                      }}
                    />
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </aside>

        {/* Right Side: Instant Preview */}
        <section className="hidden lg:block flex-1 bg-slate-200/50 overflow-y-auto p-12 scrollbar-none">
          <div className="max-w-[1024px] mx-auto space-y-6">
            <div className="flex items-center justify-between bg-white/50 backdrop-blur-sm p-3 rounded-2xl border border-white shadow-sm ring-1 ring-slate-200/50">
              <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl flex-wrap">
                {templateBtn("classic", "Classic")}
                {templateBtn("modern", "Modern")}
                {templateBtn("modernminimal", "Modern Minimal")}
                {templateBtn("ats", "ATS")}
              </div>
              <Button
                size="sm"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 shadow-lg shadow-slate-900/10"
                onClick={() => handlePrint()}
              >
                <Download className="w-4 h-4 mr-2" /> Download PDF
              </Button>
            </div>

            {/* Resume Preview Paper */}
            <div className="flex justify-center">
              <div
                className="bg-white text-black shadow-2xl min-h-[297mm] print-area rounded-sm overflow-hidden transform transition-all duration-300 shadow-slate-300/50"
                style={{
                  width: "210mm",
                  transform: `scale(${previewScale})`,
                  transformOrigin: "top center",
                }}
              >
                <ActiveTemplate data={resumeData} />
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
              <h2 className="text-xl font-bold">Preview</h2>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsSettingsOpen(true)}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Settings className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Settings</span>
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handlePrint()}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Download className="w-4 h-4 sm:mr-2" />
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
            <div className="flex gap-2 overflow-x-auto">
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
                <ActiveTemplate data={resumeData} />
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-slate-100 border border-slate-200 rounded-xl text-center text-xs text-slate-500">
            Swipe to explore or use Desktop for best experience.
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
            {/* Theme Color */}
            <div className="space-y-3">
              <Label>Theme Color</Label>
              <div className="flex flex-wrap gap-2">
                {colorPresets.map((color) => (
                  <button
                    key={color.value}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      resumeData.settings?.primaryColor === color.value
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
                    value={resumeData.settings?.primaryColor || "#0f172a"}
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
                value={resumeData.settings?.fontSize || "medium"}
                onValueChange={(value) =>
                  handleUpdateField("settings", "fontSize", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select font size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
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

      {/* Printer: Isolated sibling to ensure it prints even when UI is hidden */}
      <div 
        className="fixed top-0 left-0 -z-50 pointer-events-none aria-hidden:true print-only" 
        style={{ width: "210mm", minHeight: "297mm", overflow: "visible" }}
      >
        <div ref={componentRef} className="print-area bg-white">
          {mounted && resumeData && <ActiveTemplate data={resumeData} />}
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
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-slate-600">{label}</label>
        {isOptional && (
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
            Optional
          </span>
        )}
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 shadow-sm text-base sm:text-sm"
      />
    </div>
  );
}
