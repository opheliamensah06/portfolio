function AboutPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start mb-20">
          <div className="lg:col-span-3">
            <SectionHeading eyebrow="About Me" title="Ophelia Ivy Mensah" />
            <p className="text-secondary leading-relaxed mb-4">I am an international student from Ghana and M.Ed. candidate in Bowling Green State University's College of Student Personnel program. My journey into student affairs began with a deep belief that education is transformational — that it shapes not only what students know, but who they become.</p>
            <p className="text-secondary leading-relaxed mb-4">As an introvert, I thrive in one-on-one conversations where depth and presence are at the core. This has made academic advising a natural fit — a space to build intentional relationships and support students through academic, personal, and career transitions.</p>
            <p className="text-secondary leading-relaxed mb-4">My international background as a student navigating an unfamiliar system has sharpened my sensitivity to the experiences of others in similar positions, and intensified my commitment to advocating for policies and structures that genuinely serve all students — not just symbolically.</p>
            <p className="text-secondary leading-relaxed">Having personally benefited from guidance within student affairs, I feel a profound responsibility to provide similar meaningful support to current and future students — grounded in equity, integrity, and a commitment to holistic student development.</p>
          </div>
          <div className="lg:col-span-2 space-y-5">
            <PortfolioImage image={IMAGE_LIBRARY.bgsuMascot} className="aspect-[4/5] max-w-sm mx-auto lg:mx-0" imgClassName="object-[52%_20%]" />
            <div className="bg-surface border border-line rounded-xl p-5 space-y-3">
              {[
                { icon: 'fa-envelope', label: 'Email', text: 'ophelim@bgsu.edu', href: 'mailto:ophelim@bgsu.edu' },
                { icon: 'fa-location-dot', label: 'Location', text: 'Bowling Green, OH', href: null },
                { icon: 'fa-brands fa-linkedin', label: 'LinkedIn', text: 'opheliaivymensah-', href: 'https://www.linkedin.com/in/opheliaivymensah-' },
              ].map(c => (
                <div key={c.label} className="flex items-center gap-3">
                  <i className={`fa-solid ${c.icon} text-accent text-sm w-4 shrink-0`} aria-hidden="true"></i>
                  {c.href
                    ? <a href={c.href} className="text-sm text-secondary hover:text-accent transition-colors" target={c.href.startsWith('http') ? '_blank' : undefined} rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}>{c.text}</a>
                    : <span className="text-sm text-secondary">{c.text}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Reveal as="section" aria-labelledby="mission-h" className="bg-accent text-onaccent rounded-2xl p-8 md:p-12 mb-20">
          <p className="text-xs font-bold tracking-[.22em] uppercase text-onaccent/50 mb-3">My Professional Mission</p>
          <h2 id="mission-h" className="font-serif text-2xl font-bold text-onaccent mb-6">Mission Statement</h2>
          <blockquote className="font-serif text-lg md:text-xl italic leading-relaxed text-onaccent/90 border-l-4 border-onaccent/30 pl-6">
            "My mission is to empower diverse students towards autonomy and self-discovery through empathetic guidance, fostering deep relationships, and collaborative communities. Guided by faith, accountability, and integrity, I champion equity, fairness, and continuous learning, supporting each unique journey from transition to purpose and navigating the evolving educational landscape with unwavering service."
          </blockquote>
        </Reveal>

        <section aria-labelledby="about-break-professional" className="mb-20">
          <div className="max-w-4xl mx-auto">
            <PortfolioImage
              image={IMAGE_LIBRARY.ocpaBackdropSolo}
              className="aspect-[16/9] md:aspect-[2.2/1]"
              imgClassName="object-[50%_26%]"
              caption="Professional identity shaped through conference learning and reflection."
            />
          </div>
        </section>

        <section aria-labelledby="pv-h" className="mb-20">
          <h2 id="pv-h" className="font-serif text-3xl font-bold text-primary mb-2">Personal Values</h2>
          <p className="text-secondary mb-8 text-xs font-bold tracking-[.18em] uppercase">Core Beliefs</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PERSONAL_VALUES.map(v => (
              <LiftOnHover key={v.name} className="bg-surface border border-line rounded-xl p-6 hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 bg-soft rounded-full flex items-center justify-center mb-4">
                  <i className={`fa-solid ${v.icon} text-accent`} aria-hidden="true"></i>
                </div>
                <h3 className="font-serif font-bold text-primary mb-2">{v.name}</h3>
                <p className="text-secondary text-sm leading-relaxed">{v.desc}</p>
              </LiftOnHover>
            ))}
          </div>
        </section>

        <section aria-labelledby="about-break-community" className="mb-20">
          <div className="max-w-4xl mx-auto">
            <PortfolioImage
              image={IMAGE_LIBRARY.museumPeers}
              className="aspect-[16/9] md:aspect-[2.2/1]"
              imgClassName="object-[58%_40%]"
              caption="Community, reflection, and experiential learning remain central to my practice."
            />
          </div>
        </section>

        <section aria-labelledby="profv-h">
          <h2 id="profv-h" className="font-serif text-3xl font-bold text-primary mb-2">Professional Values</h2>
          <p className="text-secondary mb-8 text-xs font-bold tracking-[.18em] uppercase">Professional Commitments</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROFESSIONAL_VALUES.map(v => (
              <LiftOnHover key={v.name} className="bg-surface border border-line rounded-xl p-6 hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 bg-soft rounded-full flex items-center justify-center mb-4">
                  <i className={`fa-solid ${v.icon} text-accent`} aria-hidden="true"></i>
                </div>
                <h3 className="font-serif font-bold text-primary mb-2">{v.name}</h3>
                <p className="text-secondary text-sm leading-relaxed">{v.desc}</p>
              </LiftOnHover>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
