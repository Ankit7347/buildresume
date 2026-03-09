import React from "react";
import { ResumeData } from "@/lib/types";

interface ATSResumeTemplateProps {
  data: ResumeData;
}

const ATSResumeTemplateComponent = ({ data }: ATSResumeTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="min-h-[297mm] mx-auto bg-white p-10 text-black font-sans">

      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold">{personalInfo.fullName}</h1>

        <p className="text-sm">
          {personalInfo.email} | {personalInfo.phone} | {personalInfo.location}
        </p>
      </header>

      {personalInfo.summary && (
        <section className="mb-4">
          <h2 className="font-bold border-b mb-1">Summary</h2>
          <p className="text-sm">{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-4">
          <h2 className="font-bold border-b mb-2">Experience</h2>

          {experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <b>{exp.position}</b> - {exp.company}

              <div className="text-xs text-gray-500">
                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </div>

              <p className="text-sm whitespace-pre-line">
                {exp.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-4">
          <h2 className="font-bold border-b mb-2">Projects</h2>

          {projects.map((project) => (
            <div key={project.id}>
              <b>{project.name}</b>
              <p className="text-sm">{project.description}</p>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-4">
          <h2 className="font-bold border-b mb-2">Education</h2>

          {education.map((edu) => (
            <div key={edu.id} className="text-sm">
              {edu.degree} in {edu.fieldOfStudy} — {edu.school}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 className="font-bold border-b mb-2">Skills</h2>

          <p className="text-sm">
            {skills.map((skill) => skill.name).join(", ")}
          </p>
        </section>
      )}
    </div>
  );
};

export const ATSResumeTemplate = React.memo(ATSResumeTemplateComponent);
