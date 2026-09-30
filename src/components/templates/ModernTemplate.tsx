import React from "react";
import { ResumeData } from "@/lib/types";

interface ModernTemplateProps {
  data: ResumeData;
}

const ModernTemplateComponent = ({ data }: ModernTemplateProps) => {
  const {
    personalInfo = { fullName: "", email: "", phone: "", location: "", title: "", summary: "", objective: "" },
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    additionalInfo = [],
    sectionTitles = {},
    settings,
  } = data || {};
  const primaryColor = settings?.primaryColor || "#0f172a";

  const fontSizeMap = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base",
  };
  const baseFontSize = fontSizeMap[settings?.fontSize || "medium"];
  const summaryText = personalInfo.summary || personalInfo.objective;

  const renderObjective = () => {
    if (!summaryText) return null;
    return (
      <section className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-2">
          {sectionTitles?.objective || (personalInfo.objective ? "Career Objective" : "Profile")}
        </h2>
        <p className="text-sm leading-relaxed text-slate-600 italic">
          {summaryText}
        </p>
      </section>
    );
  };

  const renderExperience = () => {
    if (experience.length === 0) return null;
    return (
      <section className="space-y-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-2">
          {sectionTitles?.experience || "Experience"}
        </h2>
        <div className="space-y-8">
          {experience.map((exp) => (
            <div
              key={exp.id}
              className="space-y-2 relative pl-4 border-l-2 border-slate-100"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900">
                  {exp.position}
                </h4>
                <span className="text-[10px] font-bold text-slate-400">
                  {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                </span>
              </div>
              <p className="text-xs font-bold" style={{ color: primaryColor }}>
                {exp.company} {exp.location && `• ${exp.location}`}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed whitespace-pre-line">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderProjects = () => {
    if (projects.length === 0) return null;
    return (
      <section className="space-y-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-2">
          {sectionTitles?.projects || "Projects"}
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 bg-slate-50 rounded-xl space-y-2"
            >
              <div className="flex justify-between items-baseline">
                <h4 className="text-sm font-bold text-slate-900">
                  {project.name}
                </h4>
                {project.organization && (
                  <span className="text-[11px] text-slate-400">{project.organization}</span>
                )}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderCertifications = () => {
    if (certifications.length === 0) return null;
    return (
      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-2">
          {sectionTitles?.certifications || "Certifications"}
        </h2>
        <div className="space-y-2">
          {certifications.map((cert) => (
            <div key={cert.id} className="text-xs text-slate-700">
              <span className="font-bold text-slate-900">• {cert.name}</span>
              {cert.issuer && <span> – {cert.issuer}</span>}
              {cert.date && <span className="text-slate-400"> ({cert.date})</span>}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderAdditionalInfo = () => {
    if (additionalInfo.length === 0) return null;
    return (
      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-2">
          {sectionTitles?.additionalInfo || "Additional Information"}
        </h2>
        <div className="space-y-2">
          {additionalInfo.map((info) => (
            <div key={info.id} className="text-xs text-slate-700">
              {info.label ? (
                <>
                  <span className="font-bold text-slate-900">• {info.label}: </span>
                  <span>{info.value}</span>
                </>
              ) : (
                <span>• {info.value}</span>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const mainSectionRenderers: Record<string, () => React.ReactNode> = {
    objective: renderObjective,
    experience: renderExperience,
    projects: renderProjects,
    certifications: renderCertifications,
    additionalInfo: renderAdditionalInfo,
  };

  const activeMainOrder = (data?.sectionOrder && data.sectionOrder.length > 0)
    ? data.sectionOrder.filter((k) => k in mainSectionRenderers)
    : ["objective", "experience", "projects", "certifications", "additionalInfo"];

  return (
    <div className={`flex h-full min-h-[297mm] bg-white text-slate-800 font-sans ${baseFontSize}`}>
      {/* Sidebar */}
      <aside className="w-[30%] text-white p-8 space-y-8" style={{ backgroundColor: primaryColor }}>
        <div className="space-y-4">
          <div className="w-24 h-24 bg-slate-700 rounded-2xl flex items-center justify-center text-3xl font-bold uppercase overflow-hidden">
            {personalInfo.fullName ? personalInfo.fullName[0] : "?"}
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              {personalInfo.fullName || "YOUR NAME"}
            </h1>

            <p className="text-slate-400 text-sm">
              {personalInfo.title || "Job Title"}
            </p>
          </div>
        </div>

        {/* Contact */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Contact
          </h3>

          <div className="space-y-2 text-sm text-slate-300">
            {personalInfo.email && (
              <p className="flex flex-col">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                  Email
                </span>
                <span className="break-all">{personalInfo.email}</span>
              </p>
            )}

            {personalInfo.phone && (
              <p className="flex flex-col">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                  Phone
                </span>
                {personalInfo.phone}
              </p>
            )}

            {personalInfo.location && (
              <p className="flex flex-col">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                  Location
                </span>
                {personalInfo.location}
              </p>
            )}
          </div>
        </section>

        {/* Education in sidebar */}
        {education.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
              {sectionTitles?.education || "Education"}
            </h3>

            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-1">
                  <h4 className="text-sm font-bold text-white">
                    {edu.degree}
                  </h4>

                  <p className="text-xs text-slate-300">
                    {edu.school}
                  </p>

                  <span className="text-[10px] text-slate-400">
                    {edu.startDate ? `${edu.startDate} - ` : ""}{edu.endDate}
                    {edu.score && ` • ${edu.score}`}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills in sidebar */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
              {sectionTitles?.skills || "Skills"}
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-2 py-0.5 bg-slate-800/80 rounded-md text-xs text-slate-200 border border-slate-700/50"
                >
                  {skill.category ? `${skill.category}: ` : ""}{skill.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-12 space-y-10">
        {activeMainOrder.map((key) => {
          const render = mainSectionRenderers[key];
          return render ? <React.Fragment key={key}>{render()}</React.Fragment> : null;
        })}
      </main>
    </div>
  );
};

export const ModernTemplate = React.memo(ModernTemplateComponent);
