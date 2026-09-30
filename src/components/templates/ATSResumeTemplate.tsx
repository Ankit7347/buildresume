import React from "react";
import { ResumeData, defaultSectionOrder } from "@/lib/types";

interface ATSResumeTemplateProps {
  data: ResumeData;
}

const ATSResumeTemplateComponent = ({ data }: ATSResumeTemplateProps) => {
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
  const primaryColor = settings?.primaryColor || "#000000";

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
      <section className="mb-4">
        <h2 className="font-bold border-b mb-1 uppercase tracking-wide">
          {sectionTitles?.objective || (personalInfo.objective ? "Career Objective" : "Summary")}
        </h2>
        <p className="text-sm">{summaryText}</p>
      </section>
    );
  };

  const renderExperience = () => {
    if (experience.length === 0) return null;
    return (
      <section className="mb-4">
        <h2 className="font-bold border-b mb-2 uppercase tracking-wide">
          {sectionTitles?.experience || "Experience"}
        </h2>
        {experience.map((exp) => (
          <div key={exp.id} className="mb-3">
            <b>{exp.position}</b> - {exp.company}
            <div className="text-xs text-gray-500">
              {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              {exp.location && ` • ${exp.location}`}
            </div>
            <p className="text-sm whitespace-pre-line">{exp.description}</p>
          </div>
        ))}
      </section>
    );
  };

  const renderProjects = () => {
    if (projects.length === 0) return null;
    return (
      <section className="mb-4">
        <h2 className="font-bold border-b mb-2 uppercase tracking-wide">
          {sectionTitles?.projects || "Projects"}
        </h2>
        {projects.map((project) => (
          <div key={project.id} className="mb-2">
            <b>{project.name}</b>
            {project.organization && <span className="text-xs text-gray-600"> ({project.organization})</span>}
            <p className="text-sm whitespace-pre-line">{project.description}</p>
          </div>
        ))}
      </section>
    );
  };

  const renderEducation = () => {
    if (education.length === 0) return null;
    return (
      <section className="mb-4">
        <h2 className="font-bold border-b mb-2 uppercase tracking-wide">
          {sectionTitles?.education || "Education"}
        </h2>
        {education.map((edu) => (
          <div key={edu.id} className="text-sm mb-1">
            {edu.degree}{edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`} — {edu.school} ({edu.startDate ? `${edu.startDate} - ` : ""}{edu.endDate})
            {edu.score && <span className="ml-2 font-semibold">• {edu.score}</span>}
          </div>
        ))}
      </section>
    );
  };

  const renderSkills = () => {
    if (skills.length === 0) return null;
    return (
      <section className="mb-4">
        <h2 className="font-bold border-b mb-2 uppercase tracking-wide">
          {sectionTitles?.skills || "Skills"}
        </h2>
        <p className="text-sm">
          {skills.map((skill) => (skill.category ? `${skill.category}: ${skill.name}` : skill.name)).join(" | ")}
        </p>
      </section>
    );
  };

  const renderCertifications = () => {
    if (certifications.length === 0) return null;
    return (
      <section className="mb-4">
        <h2 className="font-bold border-b mb-2 uppercase tracking-wide">
          {sectionTitles?.certifications || "Certifications"}
        </h2>
        <ul className="list-disc ml-5 text-sm space-y-1">
          {certifications.map((cert) => (
            <li key={cert.id}>
              <b>{cert.name}</b>
              {cert.issuer && ` - ${cert.issuer}`}
              {cert.date && ` (${cert.date})`}
            </li>
          ))}
        </ul>
      </section>
    );
  };

  const renderAdditionalInfo = () => {
    if (additionalInfo.length === 0) return null;
    return (
      <section className="mb-4">
        <h2 className="font-bold border-b mb-2 uppercase tracking-wide">
          {sectionTitles?.additionalInfo || "Additional Information"}
        </h2>
        <ul className="list-disc ml-5 text-sm space-y-1">
          {additionalInfo.map((info) => (
            <li key={info.id}>
              {info.label ? <b>{info.label}: </b> : null}
              {info.value}
            </li>
          ))}
        </ul>
      </section>
    );
  };

  const sectionRenderers: Record<string, () => React.ReactNode> = {
    objective: renderObjective,
    education: renderEducation,
    skills: renderSkills,
    experience: renderExperience,
    projects: renderProjects,
    certifications: renderCertifications,
    additionalInfo: renderAdditionalInfo,
  };

  const activeOrder = (data?.sectionOrder && data.sectionOrder.length > 0)
    ? data.sectionOrder
    : defaultSectionOrder;

  return (
    <div className={`min-h-[297mm] mx-auto bg-white p-10 text-black font-sans ${baseFontSize}`}>
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold" style={{ color: primaryColor }}>{personalInfo.fullName}</h1>
        <p className="text-sm">
          {[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join(" | ")}
        </p>
      </header>

      {activeOrder.map((key) => {
        const render = sectionRenderers[key];
        return render ? <React.Fragment key={key}>{render()}</React.Fragment> : null;
      })}
    </div>
  );
};

export const ATSResumeTemplate = React.memo(ATSResumeTemplateComponent);
