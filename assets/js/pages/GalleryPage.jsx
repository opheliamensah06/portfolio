function GalleryPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Visual Portfolio"
          title="Gallery"
          subtitle="A visual record of professional experiences, events, and milestones throughout graduate training at BGSU."
        />

        {GALLERY_SECTIONS.map(sec => (
          <section key={sec.id} aria-labelledby={`gal-${sec.id}`} className="mb-16">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-line">
              <div className="w-9 h-9 bg-soft rounded-full flex items-center justify-center shrink-0">
                <i className={`fa-solid ${sec.icon} text-accent text-sm`} aria-hidden="true"></i>
              </div>
              <div>
                <h2 id={`gal-${sec.id}`} className="font-serif text-2xl font-bold text-primary">{sec.label}</h2>
                <p className="text-sm text-secondary mt-1">{sec.intro}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sec.photoIds.map(photoId => {
                const image = IMAGE_LIBRARY[photoId];
                return (
                  <article key={photoId} className="space-y-3">
                    <PortfolioImage image={image} className="aspect-[4/3]" />
                    <div className="px-1">
                      <h3 className="font-serif text-lg text-primary">{image.caption}</h3>
                      <p className="text-sm text-secondary mt-1">
                        {sec.label === 'Professional Development' ? 'A portfolio moment showing professional growth in action.' :
                         sec.label === 'Conferences & Travel' ? 'A travel experience that deepened community and perspective.' :
                         sec.label === 'Campus Life' ? 'An everyday scene from student connection and campus belonging.' :
                         'A program or event environment centered on student engagement.'}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
