function RSection({ title, icon, children }) {
  return (
    <section className="mb-10" aria-labelledby={`rs-${title.replace(/\W/g, '')}`}>
      <div className="flex items-center gap-2 mb-5 pb-2 border-b-2 border-line">
        <i className={`fa-solid ${icon} text-accent`} aria-hidden="true"></i>
        <h2 id={`rs-${title.replace(/\W/g, '')}`} className="font-serif text-xl font-bold text-primary">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function ResumePage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-12">
          <SectionHeading eyebrow="Curriculum Vitae" title="Resume" />
          <a href="#" aria-label="Download PDF resume"
            className="flex items-center gap-2 px-5 py-2.5 border-2 border-accent text-accent rounded-lg font-semibold text-sm hover:bg-soft transition-colors min-h-[44px] shrink-0">
            <i className="fa-solid fa-file-pdf" aria-hidden="true"></i>Download PDF
          </a>
        </div>

        <div className="bg-accent text-onaccent rounded-xl p-5 mb-10 flex flex-wrap gap-4 justify-center text-sm">
          {[
            { icon: 'fa-envelope', text: 'ophelim@bgsu.edu', href: 'mailto:ophelim@bgsu.edu' },
            { icon: 'fa-location-dot', text: 'Bowling Green, OH', href: null },
            { icon: 'fa-brands fa-linkedin', text: 'LinkedIn', href: 'https://www.linkedin.com/in/opheliaivymensah-' },
          ].map(c => (
            <span key={c.text} className="flex items-center gap-1.5 text-onaccent/80">
              <i className={`fa-solid ${c.icon} text-xs`} aria-hidden="true"></i>
              {c.href ? <a href={c.href} className="hover:text-onaccent transition-colors">{c.text}</a> : c.text}
            </span>
          ))}
        </div>

        <RSection title="Education" icon="fa-graduation-cap">
          <div className="space-y-4">
            {[
              { deg: 'Master of Education — College Student Personnel', org: 'Bowling Green State University (BGSU)', loc: 'Bowling Green, OH', yr: 'Expected 2026' },
              { deg: 'Undergraduate Degree', org: 'University of Cape Coast', loc: 'Cape Coast, Ghana', yr: 'Completed' },
            ].map(e => (
              <div key={e.deg} className="flex flex-wrap justify-between items-start gap-2">
                <div><p className="font-semibold text-primary">{e.deg}</p><p className="text-accent text-sm">{e.org}</p></div>
                <div className="text-right shrink-0"><p className="text-secondary text-sm">{e.yr}</p><p className="text-tertiary text-xs">{e.loc}</p></div>
              </div>
            ))}
          </div>
        </RSection>

        <RSection title="Professional Experience" icon="fa-briefcase">
          <div className="space-y-8">
            {EXPERIENCE.map((e, i) => (
              <div key={i}>
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <div>
                    <p className="font-semibold text-primary">{e.role}</p>
                    <p className="text-accent text-sm font-medium">{e.dept ? `${e.dept} — ` : ''}{e.org}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-secondary text-sm">{e.period}</p>
                    <p className="text-tertiary text-xs">{e.loc}</p>
                  </div>
                </div>
                <ul className="space-y-1.5 mt-1">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2 text-secondary text-sm leading-relaxed">
                      <span className="text-tertiary mt-1 shrink-0" aria-hidden="true">◦</span><span>{b}</span>
                    </li>
                  ))}
                </ul>
                {i < EXPERIENCE.length - 1 && <hr className="mt-7 border-line" />}
              </div>
            ))}
          </div>
        </RSection>

        <RSection title="Presentations & Conference Involvement" icon="fa-chalkboard-user">
          <div className="space-y-5">
            {PRESENTATIONS.map((p, i) => (
              <div key={i} className="flex flex-wrap justify-between items-start gap-2">
                <div>
                  <p className="font-medium text-primary text-sm">{p.title}</p>
                  <p className="text-accent text-sm">{p.event}</p>
                  <p className="text-tertiary text-xs">{p.role}</p>
                </div>
                <span className="text-secondary text-sm shrink-0">{p.date}</span>
              </div>
            ))}
          </div>
        </RSection>

        <RSection title="Professional Involvement" icon="fa-users">
          <div className="space-y-3">
            {INVOLVEMENT.map((v, i) => (
              <div key={i} className="flex flex-wrap justify-between items-start gap-2">
                <p className="text-sm text-secondary"><span className="font-medium text-primary">{v.role}</span> — {v.org}</p>
                <span className="text-secondary text-sm shrink-0">{v.date}</span>
              </div>
            ))}
          </div>
        </RSection>

        <RSection title="Training & Technical Skills" icon="fa-wrench">
          <div className="flex flex-wrap gap-2">
            {SKILLS.map(s => (
              <span key={s} className="px-3 py-1.5 bg-soft text-secondary text-xs rounded-full font-medium border border-line/70">{s}</span>
            ))}
          </div>
        </RSection>
      </div>
    </div>
  );
}
