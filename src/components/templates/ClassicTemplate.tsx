import React from 'react';

export function ClassicTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="p-12 h-full font-serif text-gray-800 leading-relaxed max-w-[800px] mx-auto bg-white">
      {/* Header */}
      <header className="text-center mb-8 border-b-2 border-gray-900 pb-6">
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-2 text-black">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 font-sans">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
        {personalInfo.title && (
          <h2 className="mt-4 text-lg font-semibold text-gray-700 tracking-wide font-sans">
            {personalInfo.title}
          </h2>
        )}
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <h3 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 text-black tracking-tight">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed text-justify">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      <section className="mb-8">
        <h3 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 text-black tracking-tight">
          Experience
        </h3>
        {experience.length > 0 ? (
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
        ) : (
          <p className="text-sm text-gray-400 italic">No experience added yet.</p>
        )}
      </section>

      {/* Education */}
      <section className="mb-8">
        <h3 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 text-black tracking-tight">
          Education
        </h3>
        {education.length > 0 ? (
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-sm text-black">{edu.degree} in {edu.fieldOfStudy}</h4>
                  <span className="text-xs font-semibold text-gray-500 font-sans italic">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
                <div className="text-sm text-gray-700 italic">{edu.school}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">No education added yet.</p>
        )}
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h3 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 text-black tracking-tight">
          Professional Skills
        </h3>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <div key={skill.id} className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-800 tracking-tight">• {skill.name}</span>
                <span className="text-[10px] text-gray-400 font-sans uppercase">({skill.level})</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400 italic">No skills added yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
