import React from "react";

export function SidebarTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="max-w-[800px] mx-auto grid grid-cols-3 bg-white">

      {/* Sidebar */}
      <aside className="col-span-1 bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-2">{personalInfo.fullName}</h1>
        <p className="text-sm text-gray-300 mb-6">{personalInfo.title}</p>

        <div className="space-y-2 text-sm">
          {personalInfo.email && <p>{personalInfo.email}</p>}
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {personalInfo.location && <p>{personalInfo.location}</p>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mt-8">
            <h2 className="font-semibold mb-3 uppercase text-sm">Skills</h2>

            <div className="space-y-1">
              {skills.map((skill) => (
                <div key={skill.id} className="text-sm">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mt-8">
            <h2 className="font-semibold mb-3 uppercase text-sm">Education</h2>

            {education.map((edu) => (
              <div key={edu.id} className="mb-2 text-sm">
                <p>{edu.degree}</p>
                <p className="text-gray-400">{edu.school}</p>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main */}
      <main className="col-span-2 p-8">

        {personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2">Summary</h2>
            <p className="text-sm text-gray-700">{personalInfo.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-4">Experience</h2>

            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <h3 className="font-semibold">{exp.position}</h3>

                  <p className="text-sm text-gray-600">
                    {exp.company} • {exp.location}
                  </p>

                  <p className="text-xs text-gray-500 mb-1">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </p>

                  <p className="text-sm whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-4">Projects</h2>

            {projects.map((project) => (
              <div key={project.id} className="mb-3">
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}