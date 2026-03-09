import React from "react";
import { ResumeData } from "@/lib/types";

interface ModernMinimalTemplateProps {
  data: ResumeData;
}

const ModernMinimalTemplateComponent = ({ data }: ModernMinimalTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="min-h-[297mm] mx-auto bg-white p-10 text-gray-800 font-sans">

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{personalInfo.fullName}</h1>
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
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">Summary</h2>
          <p className="text-sm text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-3">Experience</h2>

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
          <h2 className="text-lg font-semibold border-b pb-1 mb-3">Projects</h2>

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
          <h2 className="text-lg font-semibold border-b pb-1 mb-3">Education</h2>

          {education.map((edu) => (
            <div key={edu.id}>
              <h3 className="font-semibold text-sm">
                {edu.degree} in {edu.fieldOfStudy}
              </h3>

              <p className="text-sm text-gray-600">
                {edu.school} ({edu.startDate} - {edu.endDate})
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold border-b pb-1 mb-3">Skills</h2>

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
