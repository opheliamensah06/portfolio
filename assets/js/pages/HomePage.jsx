function HomePage({ navigate }) {
  const go = p => { navigate(p); window.scrollTo(0, 0); };

  return (
    <div>
      {/* ── Hero ── */}
      <section
        aria-labelledby="hero-name"
        className="relative overflow-hidden px-4 sm:px-6 lg:px-8"
        style={{ background: 'radial-gradient(circle at top left, rgba(var(--color-soft),0.96), rgba(var(--color-page),0.98) 42%, rgba(var(--color-page),1) 100%)' }}
      >
        <div className="absolute inset-x-0 top-0 h-48" style={{ background: 'linear-gradient(180deg, rgba(var(--color-accent),0.1), transparent)' }} aria-hidden="true"></div>
        <div className="max-w-6xl mx-auto w-full py-14 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] gap-10 lg:gap-14 items-center">
            <div className="max-w-xl lg:pr-4">
              <p className="text-xs font-bold tracking-[.25em] uppercase text-tertiary mb-4">Student Affairs Portfolio · BGSU</p>
              <h1 id="hero-name" className="font-serif text-5xl md:text-6xl xl:text-7xl font-bold text-primary leading-[0.98] mb-5">
                Ophelia<br /><span className="text-accent">Ivy Mensah</span>
              </h1>
              <p className="font-serif text-xl md:text-2xl italic text-secondary leading-relaxed mb-5">
                Empowering students, championing equity, and building community with care.
              </p>
              <p className="text-secondary leading-relaxed text-sm md:text-base mb-8 max-w-lg">
                Graduate Student Affairs Professional and M.Ed. candidate at BGSU, committed to advising, inclusive programming, and student-centered practice grounded in empathy, integrity, and continuous learning.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => go('competencies')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white min-h-[48px] shadow-[0_16px_34px_rgba(121,85,72,0.28)] transition-all hover:shadow-[0_18px_40px_rgba(121,85,72,0.34)] hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, rgb(var(--color-accent)), rgb(var(--color-accent-strong)))' }}>
                  <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
                  View My Work
                </button>
                <button onClick={() => go('about')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm min-h-[48px] text-accent hover:text-accent-strong transition-all"
                  style={{ border: '1px solid rgba(var(--color-accent), 0.18)', background: 'linear-gradient(135deg, rgba(var(--color-soft), 0.96), rgb(var(--color-surface)))' }}>
                  <i className="fa-solid fa-user text-xs" aria-hidden="true"></i>
                  About Me
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-10 top-8 hidden md:block h-40 w-40 rounded-full blur-3xl bg-accent/10" aria-hidden="true"></div>
              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_220px] gap-4 items-end">
                <div className="space-y-4">
                  <PortfolioImage
                    image={IMAGE_LIBRARY.chicagoPortrait}
                    className="aspect-[4/5] md:aspect-[5/6] shadow-[0_28px_80px_rgba(61,46,38,0.16)]"
                    imgClassName="object-[56%_20%]"
                    priority={true}
                  />
                  <div className="rounded-[1.5rem] border border-line bg-surface/92 backdrop-blur-sm px-5 py-5 shadow-[0_18px_36px_rgba(61,46,38,0.08)]">
                    <p className="text-[11px] font-bold tracking-[.18em] uppercase text-tertiary mb-2">In Practice</p>
                    <p className="font-serif text-xl text-primary mb-2">Student support grounded in care, equity, and presence.</p>
                    <p className="text-sm text-secondary leading-relaxed">
                      Advising, conference presentation, and community-building work that stays focused on belonging and student growth.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                  <PortfolioImage
                    image={IMAGE_LIBRARY.ocpaPresentation}
                    className="aspect-[4/5] shadow-[0_20px_50px_rgba(61,46,38,0.12)]"
                    imgClassName="object-[50%_30%]"
                  />
                  <PortfolioImage
                    image={IMAGE_LIBRARY.honorsLounge}
                    className="aspect-[4/5] shadow-[0_20px_50px_rgba(61,46,38,0.12)]"
                    imgClassName="object-[52%_38%]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission teaser ── */}
      <section aria-labelledby="mission-teaser" className="bg-accent text-onaccent py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[.22em] uppercase text-onaccent/50 mb-4">Mission Statement</p>
          <h2 id="mission-teaser" className="sr-only">Mission Statement</h2>
          <blockquote className="font-serif text-xl md:text-2xl italic leading-relaxed text-onaccent/90">
            "My mission is to empower diverse students towards autonomy and self-discovery through empathetic guidance, fostering deep relationships, and collaborative communities."
          </blockquote>
          <button onClick={() => go('about')}
            className="mt-6 text-sm font-semibold text-onaccent/60 hover:text-onaccent underline underline-offset-4 transition-colors"
            aria-label="Read full mission statement on About Me page">
            Read full statement →
          </button>
        </div>
      </section>

      {/* ── Three pillars ── */}
      <section aria-labelledby="pillars-heading" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[.22em] uppercase text-tertiary mb-3">Professional Identity</p>
            <h2 id="pillars-heading" className="font-serif text-3xl md:text-4xl font-bold text-primary">Four Pillars of My Practice</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'fa-compass', title: 'Advisor', desc: 'Guiding undecided students, student-athletes, and Honors students through academic exploration, registration, and holistic development with equity-minded, culturally responsive practice.' },
              { icon: 'fa-scale-balanced', title: 'Advocate', desc: 'Examining and challenging institutional policies that disproportionately burden marginalized students — presenting findings at professional conferences and collaborating across campus.' },
              { icon: 'fa-people-group', title: 'Leader', desc: 'Building mentoring systems, co-curricular programming curricula, and feedback cultures that extend leadership impact, center student voice, and foster a sense of belonging.' },
              { icon: 'fa-clipboard-list', title: 'Program Coordinator', desc: 'Designing and coordinating large-scale events, experiential trips, co-curricular programming series, and recognition ceremonies that build community, belonging, and student engagement.' },
            ].map(p => (
              <div key={p.title} className="bg-surface border border-line rounded-xl p-8 text-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-soft rounded-full flex items-center justify-center mx-auto mb-5">
                  <i className={`fa-solid ${p.icon} text-accent text-xl`} aria-hidden="true"></i>
                </div>
                <h3 className="font-serif text-xl font-bold text-primary mb-3">{p.title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick nav cards ── */}
      <section aria-labelledby="quicknav-heading" className="py-12 px-4 sm:px-6 lg:px-8 bg-soft/45">
        <div className="max-w-6xl mx-auto">
          <h2 id="quicknav-heading" className="sr-only">Quick Navigation</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { p: 'resume', icon: 'fa-file-lines', label: 'Resume' },
              { p: 'competencies', icon: 'fa-star', label: 'Competencies' },
              { p: 'artifacts', icon: 'fa-folder-open', label: 'Artifacts' },
              { p: 'gallery', icon: 'fa-images', label: 'Gallery' },
              { p: 'contact', icon: 'fa-envelope', label: 'Contact' },
            ].map(item => (
              <button key={item.p} onClick={() => go(item.p)}
                className="flex flex-col items-center gap-3 p-6 bg-surface border border-line rounded-xl hover:border-accent hover:shadow-sm transition-all group min-h-[44px]">
                <i className={`fa-solid ${item.icon} text-2xl text-tertiary group-hover:text-accent transition-colors`} aria-hidden="true"></i>
                <span className="font-semibold text-sm text-secondary group-hover:text-accent transition-colors">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
