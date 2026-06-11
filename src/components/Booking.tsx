import { useState, type ChangeEvent, type FormEvent } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const INTERESTS = [
  'Event Coverage',
  'Human-Centered Portraits',
  'Editorial & Brand Content',
  'Creative Direction',
  'Something Else',
];

const Booking = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    interest: INTERESTS[0],
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, String(v)));
      data.append('_subject', `New Inquiry: ${form.interest}`);
      data.append('_template', 'table');
      const res = await fetch('https://formsubmit.co/ajax/billy@kivarastudios.dev', {
        method: 'POST',
        body: data,
      });
      if (!res.ok) throw new Error('send failed');
      setStatus('sent');
      setForm({ name: '', email: '', organization: '', interest: INTERESTS[0], message: '' });
    } catch {
      // mail fallback so no inquiry is ever lost
      const subject = encodeURIComponent(`Inquiry: ${form.interest}`);
      const body = encodeURIComponent(
        `Hi Billy,\n\nMy name is ${form.name}${form.organization ? ` with ${form.organization}` : ''}.\n\nI'm interested in: ${form.interest}\n\n${form.message}\n\nBest,\n${form.name}\n${form.email}`,
      );
      window.location.href = `mailto:billy@kivarastudios.dev?subject=${subject}&body=${body}`;
      setStatus('sent');
    }
  };

  return (
    <section className="sect grainy" id="book" style={{ background: 'var(--ink)', borderTop: '1px solid var(--paper-12)' }}>
      <div className="sect__head">
        <span className="t-meta">(06) — Book a Shoot</span>
        <span className="t-meta" style={{ color: 'var(--red)' }}>Now booking — 2026</span>
      </div>

      <h2 className="sect__title">
        Tell me<br />your story<span style={{ color: 'var(--red)' }}>.</span>
      </h2>

      <div className="book__grid">
        <div>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--paper-60)', maxWidth: '44ch', marginBottom: '2rem' }}>
            Every project starts with a conversation. Share a bit about what
            you're envisioning — the event, the portrait, the campaign — and
            I'll get back to you within a day.
          </p>
          <a
            href="mailto:billy@kivarastudios.dev"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.2rem, 2.4vw, 1.9rem)',
              textTransform: 'uppercase',
              color: 'var(--paper)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--paper-40)',
              paddingBottom: '0.2rem',
            }}
          >
            billy@kivarastudios.dev
          </a>
        </div>

        <form onSubmit={onSubmit}>
          <div className="form__row">
            <div className="field">
              <label htmlFor="b-name">Name</label>
              <input id="b-name" name="name" type="text" required placeholder="Your name"
                value={form.name} onChange={onChange} autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="b-email">Email</label>
              <input id="b-email" name="email" type="email" required placeholder="you@company.com"
                value={form.email} onChange={onChange} autoComplete="email" />
            </div>
          </div>

          <div className="form__row">
            <div className="field">
              <label htmlFor="b-org">Organization</label>
              <input id="b-org" name="organization" type="text" placeholder="Optional"
                value={form.organization} onChange={onChange} autoComplete="organization" />
            </div>
            <div className="field">
              <label htmlFor="b-interest">I'm interested in</label>
              <select id="b-interest" name="interest" value={form.interest} onChange={onChange}>
                {INTERESTS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="b-message">The vision</label>
            <textarea id="b-message" name="message" rows={4}
              placeholder="Tell me about your project, your event, or what you're hoping to capture..."
              value={form.message} onChange={onChange} />
          </div>

          <button className="btn-book" type="submit" disabled={status === 'sending'}>
            <span className="dot" />
            {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Received — talk soon' : 'Start the conversation'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Booking;
