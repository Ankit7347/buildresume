import React from "react";
import { ResumeData } from "@/lib/types";

interface CorporateTemplateProps {
  data: ResumeData;
}

const CorporateTemplateComponent = ({ data }: CorporateTemplateProps) => {
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
    small: "text-[11.5px]",
    medium: "text-[12.5px]",
    large: "text-[13.5px]",
  };
  const baseFontSize = fontSizeMap[settings?.fontSize || "medium"];

  // Helper to parse multi-line description into bullet points
  const parseBullets = (text: string) => {
    if (!text) return [];
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => line.replace(/^[•\-\*]\s*/, ""));
  };

  // Group skills by category if any categories exist
  const groupedSkills = React.useMemo(() => {
    const map: Record<string, string[]> = {};
    const uncategorized: string[] = [];

    skills.forEach((skill) => {
      if (skill.category && skill.category.trim()) {
        const cat = skill.category.trim();
        if (!map[cat]) map[cat] = [];
        map[cat].push(skill.name);
      } else {
        uncategorized.push(skill.name);
      }
    });

    return { map, uncategorized };
  }, [skills]);

  // Objective / summary text
  const objectiveText = personalInfo.objective || personalInfo.summary;

  // Section Renderers
  const renderObjective = () => {
    if (!objectiveText) return null;
    return (
      <section className="mb-3">
        <div className="border-b border-black pb-0.5 mb-1.5">
          <h2 className="text-[13.5px] font-bold uppercase tracking-wider text-black">
            {sectionTitles?.objective || "CAREER OBJECTIVE"}
          </h2>
        </div>
        <p className="text-[12.5px] leading-relaxed text-justify text-gray-900">
          {objectiveText}
        </p>
      </section>
    );
  };

  const renderEducation = () => {
    if (education.length === 0) return null;
    return (
      <section className="mb-3">
        <div className="border-b border-black pb-0.5 mb-1.5">
          <h2 className="text-[13.5px] font-bold uppercase tracking-wider text-black">
            {sectionTitles?.education || "EDUCATION"}
          </h2>
        </div>
        <div className="space-y-1">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="flex justify-between items-baseline gap-4 text-[12.5px] leading-snug"
            >
              <div className="text-gray-900">
                <span className="font-normal">
                  {edu.degree}
                  {edu.fieldOfStudy ? ` (${edu.fieldOfStudy})` : ""}
                  {edu.school ? `, ${edu.school}` : ""}
                </span>
                {edu.score && (
                  <span className="ml-1 text-gray-700">({edu.score})</span>
                )}
              </div>
              <div className="text-right whitespace-nowrap font-normal text-gray-900 shrink-0">
                {edu.startDate && edu.endDate
                  ? `${edu.startDate} – ${edu.endDate}`
                  : edu.endDate || edu.startDate}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderSkills = () => {
    if (skills.length === 0) return null;
    return (
      <section className="mb-3">
        <div className="border-b border-black pb-0.5 mb-1.5">
          <h2 className="text-[13.5px] font-bold uppercase tracking-wider text-black">
            {sectionTitles?.skills || "SKILLS"}
          </h2>
        </div>
        <div className="text-[12.5px] leading-snug">
          {Object.keys(groupedSkills.map).length > 0 ? (
            <table className="w-full border-collapse">
              <tbody>
                {Object.entries(groupedSkills.map).map(([category, items]) => (
                  <tr key={category} className="align-top">
                    <td className="whitespace-nowrap font-normal text-black pr-2.5 py-0.5 w-[1%]">
                      {category}:
                    </td>
                    <td className="text-gray-900 py-0.5 leading-snug">
                      {items.join(", ")}
                    </td>
                  </tr>
                ))}
                {groupedSkills.uncategorized.length > 0 && (
                  <tr className="align-top">
                    <td className="whitespace-nowrap font-normal text-black pr-2.5 py-0.5 w-[1%]">
                      Other Skills:
                    </td>
                    <td className="text-gray-900 py-0.5 leading-snug">
                      {groupedSkills.uncategorized.join(", ")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-900 py-0.5">
              {skills.map((s) => s.name).join(", ")}
            </p>
          )}
        </div>
      </section>
    );
  };

  const renderExperience = () => {
    if (experience.length === 0) return null;
    return (
      <section className="mb-3">
        <div className="border-b border-black pb-0.5 mb-1.5">
          <h2 className="text-[13.5px] font-bold uppercase tracking-wider text-black">
            {sectionTitles?.experience || "INTERNSHIP EXPERIENCE"}
          </h2>
        </div>
        <div className="space-y-2.5">
          {experience.map((exp) => {
            const bullets = parseBullets(exp.description);
            return (
              <div key={exp.id} className="text-[12.5px]">
                {/* Top Line: Company & Date */}
                <div className="flex justify-between items-baseline gap-4 font-normal text-black">
                  <span>{exp.company}</span>
                  <span className="whitespace-nowrap shrink-0">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>

                {/* Second Line: Position & Location */}
                <div className="flex justify-between items-baseline gap-4 text-gray-900 italic">
                  <span>{exp.position}</span>
                  {exp.location && (
                    <span className="not-italic whitespace-nowrap shrink-0 text-gray-800">
                      {exp.location}
                    </span>
                  )}
                </div>

                {/* Bullets */}
                {bullets.length > 0 && (
                  <ul className="list-disc ml-5 mt-1 space-y-0.5 text-[12px] leading-relaxed text-gray-900">
                    {bullets.map((b, idx) => (
                      <li key={idx} className="pl-0.5">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  const renderProjects = () => {
    if (projects.length === 0) return null;
    return (
      <section className="mb-3">
        <div className="border-b border-black pb-0.5 mb-1.5">
          <h2 className="text-[13.5px] font-bold uppercase tracking-wider text-black">
            {sectionTitles?.projects || "RESEARCH PROJECTS"}
          </h2>
        </div>
        <div className="space-y-2.5">
          {projects.map((proj) => {
            const bullets = parseBullets(proj.description);
            return (
              <div key={proj.id} className="text-[12.5px]">
                {/* Project Name & Organization/Subtitle */}
                <div className="flex justify-between items-baseline gap-4 font-normal text-black">
                  <span>{proj.name}</span>
                  {(proj.organization || proj.link) && (
                    <span className="whitespace-nowrap shrink-0 text-gray-800">
                      {proj.organization || proj.link}
                    </span>
                  )}
                </div>

                {/* Bullets */}
                {bullets.length > 0 && (
                  <ul className="list-disc ml-5 mt-1 space-y-0.5 text-[12px] leading-relaxed text-gray-900">
                    {bullets.map((b, idx) => (
                      <li key={idx} className="pl-0.5">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  const renderCertifications = () => {
    if (certifications.length === 0) return null;
    return (
      <section className="mb-3">
        <div className="border-b border-black pb-0.5 mb-1.5">
          <h2 className="text-[13.5px] font-bold uppercase tracking-wider text-black">
            {sectionTitles?.certifications || "CERTIFICATIONS"}
          </h2>
        </div>
        <ul className="list-disc ml-5 space-y-0.5 text-[12px] leading-relaxed text-gray-900">
          {certifications.map((cert) => (
            <li key={cert.id} className="pl-0.5">
              <span>{cert.name}</span>
              {cert.issuer && <span> – {cert.issuer}</span>}
              {cert.date && <span> ({cert.date})</span>}
            </li>
          ))}
        </ul>
      </section>
    );
  };

  const renderAdditionalInfo = () => {
    if (additionalInfo.length === 0) return null;
    return (
      <section className="mb-3">
        <div className="border-b border-black pb-0.5 mb-1.5">
          <h2 className="text-[13.5px] font-bold uppercase tracking-wider text-black">
            {sectionTitles?.additionalInfo || "ADDITIONAL INFORMATION"}
          </h2>
        </div>
        <ul className="list-disc ml-5 space-y-0.5 text-[12px] leading-relaxed text-gray-900">
          {additionalInfo.map((info) => (
            <li key={info.id} className="pl-0.5">
              {info.label ? (
                <>
                  <span className="font-normal">{info.label}:</span>{" "}
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
    "education",
    "skills",
    "experience",
    "projects",
    "certifications",
    "additionalInfo",
  ];

  const activeOrder = (data?.sectionOrder && data.sectionOrder.length > 0)
    ? data.sectionOrder
    : defaultOrder;

  return (
    <div
      className={`min-h-[297mm] mx-auto bg-white p-8 sm:p-10 text-black font-serif selection:bg-gray-200 ${baseFontSize}`}
      style={{
        fontFamily: "'Times New Roman', Times, Cambria, Georgia, serif",
        color: "#000000",
      }}
    >
      {/* Header */}
      <header className="text-center mb-3">
        <h1
          className="text-2xl font-bold uppercase tracking-wider mb-1.5"
          style={{ color: primaryColor }}
        >
          {personalInfo.fullName || "YOUR NAME"}
        </h1>
        <p className="text-[12.5px] text-gray-900 tracking-tight leading-snug">
          {[personalInfo.phone, personalInfo.email, personalInfo.location]
            .filter(Boolean)
            .join(" | ")}
        </p>
      </header>

      {/* Dynamic Sections in activeOrder */}
      {activeOrder.map((key) => {
        const render = sectionRenderers[key];
        return render ? <React.Fragment key={key}>{render()}</React.Fragment> : null;
      })}
    </div>
  );
};

export const CorporateTemplate = React.memo(CorporateTemplateComponent);
