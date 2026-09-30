import React from "react";
import { ResumeData, defaultSectionOrder } from "@/lib/types";

interface ModernMinimalTemplateProps {
  data: ResumeData;
}

const ModernMinimalTemplateComponent = ({ data }: ModernMinimalTemplateProps) => {
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
  const primaryColor = settings?.primaryColor || "#1f2937";

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
      <section className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-2" style={{ borderColor: `${primaryColor}40` }}>
          {sectionTitles?.objective || (personalInfo.objective ? "Career Objective" : "Summary")}
        </h2>
        <p className="text-sm text-gray-700">{summaryText}</p>
      </section>
    );
  };

  const renderExperience = () => {
    if (experience.length === 0) return null;
    return (
      <section className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-3" style={{ borderColor: `${primaryColor}40` }}>
          {sectionTitles?.experience || "Experience"}
        </h2>

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
    );
  };

  const renderProjects = () => {
    if (projects.length === 0) return null;
    return (
      <section className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-3" style={{ borderColor: `${primaryColor}40` }}>
          {sectionTitles?.projects || "Projects"}
        </h2>

        {projects.map((project) => (
          <div key={project.id} className="mb-3">
            <h3 className="font-semibold">{project.name}</h3>
            {project.organization && (
              <span className="text-xs text-gray-500"> ({project.organization})</span>
            )}
            <p className="text-sm text-gray-600">{project.description}</p>
          </div>
        ))}
      </section>
    );
  };

  const renderEducation = () => {
    if (education.length === 0) return null;
    return (
      <section className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-3" style={{ borderColor: `${primaryColor}40` }}>
          {sectionTitles?.education || "Education"}
        </h2>

        {education.map((edu) => (
          <div key={edu.id} className="mb-2">
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
    );
  };

  const renderSkills = () => {
    if (skills.length === 0) return null;
    return (
      <section className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-3" style={{ borderColor: `${primaryColor}40` }}>
          {sectionTitles?.skills || "Skills"}
        </h2>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className="text-sm bg-gray-100 px-3 py-1 rounded"
            >
              {skill.category ? `${skill.category}: ` : ""}{skill.name}
            </span>
          ))}
        </div>
      </section>
    );
  };

  const renderCertifications = () => {
    if (certifications.length === 0) return null;
    return (
      <section className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-3" style={{ borderColor: `${primaryColor}40` }}>
          {sectionTitles?.certifications || "Certifications"}
        </h2>
        <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
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
      <section className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-3" style={{ borderColor: `${primaryColor}40` }}>
          {sectionTitles?.additionalInfo || "Additional Information"}
        </h2>
        <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
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

      {/* Dynamic Sections in activeOrder */}
      {activeOrder.map((key) => {
        const render = sectionRenderers[key];
        return render ? <React.Fragment key={key}>{render()}</React.Fragment> : null;
      })}
    </div>
  );
};

export const ModernMinimalTemplate = React.memo(ModernMinimalTemplateComponent);
