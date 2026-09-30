import React from 'react';
import { ResumeData } from '@/lib/types';

interface ClassicTemplateProps {
  data: ResumeData;
}

const ClassicTemplateComponent = ({ data }: ClassicTemplateProps) => {
  const {
    personalInfo = { fullName: "", email: "", phone: "", location: "", title: "", summary: "", objective: "" },
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    additionalInfo = [],
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
      <section className="mb-8">
        <h3 className="text-lg font-bold uppercase border-b mb-3 tracking-tight" style={{ color: primaryColor, borderBottomColor: `${primaryColor}40` }}>
          {personalInfo.objective ? "Career Objective" : "Professional Summary"}
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed text-justify">
          {summaryText}
        </p>
      </section>
    );
  };

  const renderExperience = () => {
    if (experience.length === 0) return null;
    return (
      <section className="mb-8">
        <h3 className="text-lg font-bold uppercase border-b mb-4 tracking-tight" style={{ color: primaryColor, borderBottomColor: `${primaryColor}40` }}>
          Experience
        </h3>
        <div className="space-y-6">
          {experience.map((exp) => (
            <div key={exp.id} className="relative">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-base text-black">{exp.position}</h4>
                <span className="text-xs font-semibold text-gray-500 font-sans italic">
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm font-semibold text-gray-700 italic">{exp.company}</span>
                <span className="text-xs text-gray-400 font-sans">{exp.location}</span>
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-line leading-snug">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderEducation = () => {
    if (education.length === 0) return null;
    return (
      <section className="mb-8">
        <h3 className="text-lg font-bold uppercase border-b mb-4 tracking-tight" style={{ color: primaryColor, borderBottomColor: `${primaryColor}40` }}>
          Education
        </h3>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-sm text-black">
                  {edu.degree}{edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                  {edu.score && <span className="ml-2 font-normal text-xs text-gray-500">({edu.score})</span>}
                </h4>
                <span className="text-xs font-semibold text-gray-500 font-sans italic">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              <div className="text-sm text-gray-700 italic">{edu.school}</div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderProjects = () => {
    if (projects.length === 0) return null;
    return (
      <section className="mb-8">
        <h3 className="text-lg font-bold uppercase border-b mb-4 tracking-tight" style={{ color: primaryColor, borderBottomColor: `${primaryColor}40` }}>
          Key Projects
        </h3>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-sm text-black">{project.name}</h4>
                {project.organization && (
                  <span className="text-xs text-gray-500 italic">{project.organization}</span>
                )}
              </div>
              <p className="text-sm text-gray-600 leading-snug whitespace-pre-line">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderSkills = () => {
    if (skills.length === 0) return null;
    return (
      <section className="mb-8">
        <h3 className="text-lg font-bold uppercase border-b mb-3 tracking-tight" style={{ color: primaryColor, borderBottomColor: `${primaryColor}40` }}>
          Professional Skills
        </h3>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-800 tracking-tight">
                • {skill.category ? `${skill.category}: ` : ""}{skill.name}
              </span>
              {skill.level && (
                <span className="text-[10px] text-gray-400 font-sans uppercase">({skill.level})</span>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderCertifications = () => {
    if (certifications.length === 0) return null;
    return (
      <section className="mb-8">
        <h3 className="text-lg font-bold uppercase border-b mb-3 tracking-tight" style={{ color: primaryColor, borderBottomColor: `${primaryColor}40` }}>
          Certifications
        </h3>
        <ul className="list-disc ml-5 space-y-1.5 text-sm text-gray-700">
          {certifications.map((cert) => (
            <li key={cert.id}>
              <span className="font-semibold text-black">{cert.name}</span>
              {cert.issuer && <span> – {cert.issuer}</span>}
              {cert.date && <span className="text-gray-500 italic"> ({cert.date})</span>}
            </li>
          ))}
        </ul>
      </section>
    );
  };

  const renderAdditionalInfo = () => {
    if (additionalInfo.length === 0) return null;
    return (
      <section className="mb-8">
        <h3 className="text-lg font-bold uppercase border-b mb-3 tracking-tight" style={{ color: primaryColor, borderBottomColor: `${primaryColor}40` }}>
          Additional Information
        </h3>
        <ul className="list-disc ml-5 space-y-1.5 text-sm text-gray-700">
          {additionalInfo.map((info) => (
            <li key={info.id}>
              {info.label ? (
                <>
                  <span className="font-semibold text-black">{info.label}:</span>{" "}
                  <span>{info.value}</span>
                </>
              ) : (
                <span>{info.value}</span>
              )}
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

  const defaultOrder = [
    "objective",
    "experience",
    "education",
    "projects",
    "skills",
    "certifications",
    "additionalInfo",
  ];

  const activeOrder = (data?.sectionOrder && data.sectionOrder.length > 0)
    ? data.sectionOrder
    : defaultOrder;

  return (
    <div className={`p-12 min-h-[297mm] font-serif text-gray-800 leading-relaxed bg-white ${baseFontSize}`}>
      {/* Header */}
      <header className="text-center mb-8 pb-6" style={{ borderBottom: `2px solid ${primaryColor}` }}>
        <h1 className="text-3xl font-bold uppercase tracking-widest mb-2" style={{ color: primaryColor }}>
          {personalInfo.fullName || "YOUR NAME"}
        </h1>
        <div className="flex justify-center flex-wrap gap-x-3 gap-y-1 text-sm text-gray-600 font-sans">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && (
            <>
              {personalInfo.email && <span className="text-gray-300">•</span>}
              <span>{personalInfo.phone}</span>
            </>
          )}
          {personalInfo.location && (
            <>
              {(personalInfo.email || personalInfo.phone) && <span className="text-gray-300">•</span>}
              <span>{personalInfo.location}</span>
            </>
          )}
        </div>
        {personalInfo.title && (
          <h2 className="mt-4 text-lg font-semibold text-gray-700 tracking-wide font-sans">
            {personalInfo.title}
          </h2>
        )}
      </header>

      {/* Dynamic Sections in activeOrder */}
      {activeOrder.map((key) => {
        const render = sectionRenderers[key];
        return render ? <React.Fragment key={key}>{render()}</React.Fragment> : null;
      })}
    </div>
  );
};

export const ClassicTemplate = React.memo(ClassicTemplateComponent);
