function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const alertRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!form.email.trim()) e.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.';
    if (!form.message.trim()) e.message = 'Message is required.';
    return e;
  };

  const change = f => e => { setForm(v => ({ ...v, [f]: e.target.value })); setErrors(v => ({ ...v, [f]: undefined })); };

  const submit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const subject = form.subject.trim() || 'Portfolio Inquiry';
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:ophelim@bgsu.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    setTimeout(() => alertRef.current?.focus(), 100);
  };

  const inputCls = f => `w-full px-4 py-3 rounded-lg border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-focusring transition ${errors[f] ? 'border-red-400' : 'border-line'}`;

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Contact"
          subtitle="I would love to connect — whether you have questions about my portfolio, experience, or are interested in collaborating."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Reveal>
            <h2 className="font-serif text-xl font-bold text-primary mb-6">Contact Information</h2>
            <div className="space-y-3 mb-8">
              {[
                { icon: 'fa-envelope', label: 'Email', val: 'ophelim@bgsu.edu', href: 'mailto:ophelim@bgsu.edu' },
                { icon: 'fa-location-dot', label: 'Location', val: 'Bowling Green, OH', href: null },
                { icon: 'fa-brands fa-linkedin', label: 'LinkedIn', val: 'linkedin.com/in/opheliaivymensah-', href: 'https://www.linkedin.com/in/opheliaivymensah-' },
              ].map(c => (
                <div key={c.label} className="flex items-start gap-4 p-4 bg-surface border border-line rounded-xl">
                  <div className="w-10 h-10 bg-soft rounded-full flex items-center justify-center shrink-0">
                    <i className={`fa-solid ${c.icon} text-accent text-sm`} aria-hidden="true"></i>
                  </div>
                  <div>
                    <p className="text-xs text-tertiary font-semibold uppercase tracking-wider mb-0.5">{c.label}</p>
                    {c.href
                      ? <a href={c.href} className="text-primary font-medium hover:text-accent transition-colors text-sm" target={c.href.startsWith('http') ? '_blank' : undefined} rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}>{c.val}</a>
                      : <p className="text-primary font-medium text-sm">{c.val}</p>}
                  </div>
                </div>
              ))}
            </div>

            <blockquote className="border-l-4 border-accent pl-5 py-1">
              <p className="font-serif italic text-secondary text-sm leading-relaxed">"Guided by faith, accountability, and integrity, I champion equity, fairness, and continuous learning, supporting each unique journey from transition to purpose."</p>
              <footer className="mt-2 text-xs text-tertiary">— Ophelia Ivy Mensah, Mission Statement</footer>
            </blockquote>
          </Reveal>

          <Reveal className="bg-surface border border-line rounded-2xl p-6 md:p-8 shadow-sm shadow-ink/5" delay={0.06}>
            <h2 className="font-serif text-xl font-bold text-primary mb-2">Send a Message</h2>
            <p className="text-sm text-secondary mb-6">Use the form below to draft an email message directly to me.</p>

            {sent && (
              <div
                ref={alertRef}
                tabIndex={-1}
                role="status"
                className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                Your email client should now be open with your message draft.
              </div>
            )}

            <form onSubmit={submit} noValidate className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-1.5">Full Name</label>
                <input id="name" type="text" value={form.name} onChange={change('name')} className={inputCls('name')} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
                {errors.name && <p id="name-error" className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-1.5">Email Address</label>
                <input id="email" type="email" value={form.email} onChange={change('email')} className={inputCls('email')} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
                {errors.email && <p id="email-error" className="mt-1.5 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-primary mb-1.5">Subject</label>
                <input id="subject" type="text" value={form.subject} onChange={change('subject')} className={inputCls('subject')} />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary mb-1.5">Message</label>
                <textarea id="message" rows="6" value={form.message} onChange={change('message')} className={inputCls('message')} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined}></textarea>
                {errors.message && <p id="message-error" className="mt-1.5 text-sm text-red-600">{errors.message}</p>}
              </div>

              <LiftOnHover as="button" type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white min-h-[48px] shadow-[0_16px_34px_rgba(121,85,72,0.28)] transition-all hover:shadow-[0_18px_40px_rgba(121,85,72,0.34)] hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, rgb(var(--color-accent)), rgb(var(--color-accent-strong)))' }}>
                <i className="fa-solid fa-paper-plane text-xs" aria-hidden="true"></i>
                Draft Email
              </LiftOnHover>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
