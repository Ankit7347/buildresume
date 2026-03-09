import React from 'react';

export function ModernTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="flex h-full min-h-[1056px] bg-white text-slate-800 font-sans">
      {/* Sidebar */}
      <aside className="w-[30%] bg-slate-900 text-white p-8 space-y-8">
        <div className="space-y-4">
          <div className="w-24 h-24 bg-slate-700 rounded-2xl flex items-center justify-center text-3xl font-bold uppercase overflow-hidden">
            {personalInfo.fullName ? personalInfo.fullName[0] : '?'}
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">{personalInfo.fullName || 'YOUR NAME'}</h1>
            <p className="text-slate-400 text-sm">{personalInfo.title || 'Job Title'}</p>
          </div>
        </div>

        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Contact</h3>
          <div className="space-y-2 text-sm text-slate-300">
            <p className="flex flex-col">
              <span className="text-slate-500 text-[10px] uppercase font-bold">Email</span>
              {personalInfo.email}
            </p>
            <p className="flex flex-col">
              <span className="text-slate-500 text-[10px] uppercase font-bold">Phone</span>
              {personalInfo.phone}
            </p>
            <p className="flex flex-col">
              <span className="text-slate-500 text-[10px] uppercase font-bold">Location</span>
              {personalInfo.location}
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill.id} className="px-2 py-1 bg-slate-800 rounded text-[11px] font-medium border border-slate-700">
                {skill.name}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Education</h3>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id} className="space-y-1">
                <p className="text-xs font-bold">{edu.degree}</p>
                <p className="text-[11px] text-slate-400">{edu.school}</p>
                <p className="text-[10px] text-slate-500">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        </section>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 space-y-10">
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-2">Profile</h2>
          <p className="text-sm leading-relaxed text-slate-600 italic">
            {personalInfo.summary}
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-2">Experience</h2>
          <div className="space-y-8">
            {experience.map(exp => (
              <div key={exp.id} className="space-y-2 relative pl-4 border-l-2 border-slate-100">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900">{exp.position}</h4>
                  <span className="text-[10px] font-bold text-slate-400">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-xs font-bold text-blue-600">{exp.company}</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-2">Projects</h2>
            <div className="grid grid-cols-1 gap-4">
              {projects.map(project => (
                <div key={project.id} className="p-4 bg-slate-50 rounded-xl space-y-2">
                  <h4 className="text-sm font-bold text-slate-900">{project.name}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
