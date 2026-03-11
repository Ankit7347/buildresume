import React from "react";
import { ResumeData } from "@/lib/types";

interface ModernMinimalTemplateProps {
  data: ResumeData;
}

const ModernMinimalTemplateComponent = ({ data }: ModernMinimalTemplateProps) => {
  const { personalInfo, experience, education, skills, projects, settings } = data;
  const primaryColor = settings?.primaryColor || "#1f2937";

  const fontSizeMap = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base",
  };
  const baseFontSize = fontSizeMap[settings?.fontSize || "medium"];

  return (
    <div className={`min-h-[297mm] mx-auto bg-white p-10 text-gray-800 font-sans ${baseFontSize}`}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: primaryColor }}>{personalInfo.fullName}</h1>
        <p className="text-gray-500">{personalInfo.title}</p>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2" style={{ borderColor: `${primaryColor}40` }}>Summary</h2>
          <p className="text-sm text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-3" style={{ borderColor: `${primaryColor}40` }}>Experience</h2>

          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <h3 className="font-semibold">{exp.position}</h3>
                  <span className="text-xs text-gray-500">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>

                <p className="text-sm text-gray-600">
                  {exp.company} • {exp.location}
                </p>

                <p className="text-sm mt-1 whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-3" style={{ borderColor: `${primaryColor}40` }}>Projects</h2>

          {projects.map((project) => (
            <div key={project.id} className="mb-3">
              <h3 className="font-semibold">{project.name}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-3" style={{ borderColor: `${primaryColor}40` }}>Education</h2>

          {education.map((edu) => (
            <div key={edu.id}>
              <h3 className="font-semibold text-sm">
                {edu.degree}{edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
              </h3>

              <p className="text-sm text-gray-600">
                {edu.school} ({edu.startDate} - {edu.endDate})
                {edu.score && <span className="ml-2 font-medium italic"> • {edu.score}</span>}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold border-b pb-1 mb-3" style={{ borderColor: `${primaryColor}40` }}>Skills</h2>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="text-sm bg-gray-100 px-3 py-1 rounded"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>

  );
};

export const ModernMinimalTemplate = React.memo(ModernMinimalTemplateComponent);
