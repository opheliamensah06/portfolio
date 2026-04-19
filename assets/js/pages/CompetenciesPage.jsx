function CompetenciesPage({ navigate }) {
  const TIERS = [
    { key: 'exemplary', icon: 'fa-star', label: 'Exemplary', desc: 'Three competencies with artifacts and narrative demonstrating advanced, integrated practice.' },
    { key: 'proficient', icon: 'fa-circle-check', label: 'Proficient', desc: 'Three competencies developed through intentional coursework, practicum, and professional experience.' },
    { key: 'foundational', icon: 'fa-layer-group', label: 'Foundational', desc: 'Three competencies establishing core professional knowledge within the ACPA/NASPA framework.' },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="ACPA/NASPA Framework"
          title="Professional Competencies"
          subtitle="A self-reflective examination of growth across the College Student Personnel program, grounded in the ACPA/NASPA professional competency areas."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14" role="list" aria-label="Competency tiers">
          {TIERS.map(t => (
            <div key={t.key} role="listitem" className={`rounded-xl p-5 border ${t.key === 'exemplary' ? 'bg-accent text-onaccent border-accent' : t.key === 'proficient' ? 'bg-secondary text-onaccent border-secondary' : 'bg-surface text-primary border-line'}`}>
              <i className={`fa-solid ${t.icon} text-xl mb-3 block ${t.key === 'foundational' ? 'text-accent' : 'text-onaccent/75'}`} aria-hidden="true"></i>
              <h2 className={`font-serif text-lg font-bold mb-1 ${t.key === 'foundational' ? 'text-primary' : ''}`}>{t.label}</h2>
              <p className={`text-xs leading-relaxed ${t.key === 'foundational' ? 'text-secondary' : 'text-onaccent/70'}`}>{t.desc}</p>
            </div>
          ))}
        </div>

        {TIERS.map(tier => {
          const list = COMPETENCIES.filter(c => c.level === tier.key);

          return (
            <section key={tier.key} aria-labelledby={`tier-${tier.key}-h`} className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <i className={`fa-solid ${tier.icon} text-accent`} aria-hidden="true"></i>
                <h2 id={`tier-${tier.key}-h`} className="font-serif text-2xl font-bold text-primary">{tier.label} Level</h2>
              </div>
              <div className="space-y-4">
                {list.map(c => (
                  <Accordion key={c.id} id={c.id} label={`${c.title} (${c.abbr})`} level={c.level} defaultOpen={true}>
                    <p className="text-secondary leading-relaxed mb-6 text-sm">{c.summary}</p>

                    <h3 className="text-xs font-bold tracking-[.14em] uppercase text-primary mb-3">Activities</h3>
                    <div className="space-y-4 mb-6">
                      {c.activities.map((a, i) => (
                        <div key={i} className="border-l-2 border-line pl-4">
                          <p className="font-semibold text-primary text-sm mb-1">{a.title}</p>
                          <p className="text-secondary text-sm leading-relaxed">{a.desc}</p>
                        </div>
                      ))}
                    </div>

                    {c.artifacts.length > 0 && (
                      <>
                        <h3 className="text-xs font-bold tracking-[.14em] uppercase text-primary mb-3">Supporting Artifacts</h3>
                        <div className="flex flex-wrap gap-2">
                          {c.artifacts.map((a, i) => (
                            <button key={i}
                              onClick={() => { navigate('artifacts'); window.scrollTo(0, 0); }}
                              aria-label={`Preview ${a.name} — ${a.type}`}
                              className="flex items-center gap-2 px-4 py-2 border border-accent text-accent rounded-lg text-xs font-semibold hover:bg-soft transition-colors min-h-[44px]">
                              <i className="fa-solid fa-eye text-sm" aria-hidden="true"></i>
                              {a.name}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {(COMPETENCY_PHOTOS[c.id] || []).length > 0 && (
                      <div className="mt-7 pt-5 border-t border-line">
                        <div className="flex items-center gap-2 mb-4">
                          <i className="fa-solid fa-images text-tertiary text-xs" aria-hidden="true"></i>
                          <h3 className="text-xs font-bold tracking-[.14em] uppercase text-primary">Related Moments</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {(COMPETENCY_PHOTOS[c.id] || []).map(photoId => {
                            const image = IMAGE_LIBRARY[photoId];
                            return (
                              <PortfolioImage
                                key={photoId}
                                image={image}
                                className="aspect-[4/3]"
                                caption={image.caption}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </Accordion>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
