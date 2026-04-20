function ArtifactsPage() {
  const [filter, setFilter] = useState('all');
  const [preview, setPreview] = useState(null);
  const FILTERS = ['all', ...new Set(ARTIFACTS.map(a => a.level))];
  const shown = filter === 'all' ? ARTIFACTS : ARTIFACTS.filter(a => a.level === filter);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      {preview && <FileViewer artifact={preview} onClose={() => setPreview(null)} />}
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Supporting Evidence"
          title="Artifacts"
          subtitle="Six selected artifacts from across graduate preparation, each backed by a file included in this portfolio."
        />

        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter artifacts by level">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors min-h-[44px] ${filter === f ? 'bg-accent text-onaccent' : 'bg-soft text-secondary hover:bg-soft/80 hover:text-accent border border-line/70'}`}>
              {f === 'all' ? 'All Artifacts' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {shown.map(a => {
            const fileIcon = a.type === 'PDF' ? 'fa-file-pdf' : a.type === 'PPTX' ? 'fa-file-powerpoint' : 'fa-file-word';
            return (
              <div key={a.id} role="listitem">
                <LiftOnHover
                  as="button"
                  type="button"
                  onClick={() => setPreview(a)}
                  aria-label={`Preview ${a.name} — ${a.type}`}
                  className="bg-surface border border-line rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow text-left w-full focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-page"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-soft rounded-lg flex items-center justify-center shrink-0">
                      <i className={`fa-solid ${fileIcon} text-accent`} aria-hidden="true"></i>
                    </div>
                    <span className="text-xs font-bold text-tertiary uppercase tracking-wider">{a.type}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <Badge level={a.level} />
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-soft text-secondary border border-line/70">{a.abbr}</span>
                  </div>
                  <h2 className="font-serif font-bold text-primary mb-2 leading-snug text-base">{a.name}</h2>
                  <p className="text-secondary text-sm leading-relaxed flex-grow">{a.desc}</p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-accent">
                    <i className="fa-solid fa-eye text-xs" aria-hidden="true"></i>
                    <span>Preview {a.type}</span>
                  </div>
                </LiftOnHover>
              </div>
            );
          })}
        </div>

        {shown.length === 0 && (
          <p className="text-center text-secondary py-16">No artifacts found at this level.</p>
        )}
      </div>
    </div>
  );
}
