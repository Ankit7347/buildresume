import React from "react";
import { ResumeData } from "@/lib/types";

interface ModernTemplateProps {
  data: ResumeData;
}

const ModernTemplateComponent = ({ data }: ModernTemplateProps) => {
  const { personalInfo, experience, education, skills, projects, settings } = data;
  const primaryColor = settings?.primaryColor || "#0f172a";

  const fontSizeMap = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base",
  };
  const baseFontSize = fontSizeMap[settings?.fontSize || "medium"];

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

        {/* Skills */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-2 py-1 bg-slate-800 rounded text-[11px] font-medium border border-slate-700"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Education
          </h3>

          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="space-y-1">
                <p className="text-xs font-bold">{edu.degree}{edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}</p>

                <p className="text-[11px] text-slate-400">
                  {edu.school}
                </p>

                <p className="text-[10px] text-slate-500 font-medium">
                  {edu.startDate} - {edu.endDate}
                  {edu.score && <span className="ml-1 text-slate-300 italic">• {edu.score}</span>}
                </p>
              </div>
            ))}
          </div>
        </section>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 space-y-10">

        {/* Profile */}
        {personalInfo.summary && (
          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-2">
              Profile
            </h2>

            <p className="text-sm leading-relaxed text-slate-600 italic">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-2">
              Experience
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
                    {exp.company}
                  </p>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-2">
              Projects
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 bg-slate-50 rounded-xl space-y-2"
                >
                  <h4 className="text-sm font-bold text-slate-900">
                    {project.name}
                  </h4>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>

  );
};

export const ModernTemplate = React.memo(ModernTemplateComponent);
