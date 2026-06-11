import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// words flagged `it` render italic safelight red
const SENTENCE: { w: string; it?: boolean }[] = [
  { w: 'The' }, { w: 'most' }, { w: 'important' }, { w: 'stories' },
  { w: "aren't" }, { w: 'just' }, { w: 'told' }, { w: '—' },
  { w: 'they', it: true }, { w: 'are', it: true }, { w: 'felt.', it: true },
  { w: 'I' }, { w: 'document' }, { w: 'the' }, { w: 'quiet' },
  { w: 'intersections' }, { w: 'of' }, { w: 'people,' }, { w: 'culture,' },
  { w: 'and' }, { w: 'community.' },
];

const SERVICES = [
  {
    name: 'Event Coverage',
    body: 'From high-energy tech summits to intimate community gatherings, I capture the pulse of the event — the candid interactions and the "unscripted" moments that truly represent your organization\'s culture.',
    tags: ['Corporate', 'Tech', 'Social', 'Non-Profit'],
  },
  {
    name: 'Human-Centered Portraits',
    body: 'A portrait should feel like a conversation. Whether it\'s a professional headshot or a creative lifestyle session, my goal is to capture your presence — authentic, relaxed, and real.',
    tags: ['Indoor', 'Outdoor', 'Studio', 'Creative'],
  },
  {
    name: 'Editorial & Brand Content',
    body: 'Visual storytelling for brands that lead with heart. I work with founders and creatives to build a visual archive that reflects their mission, their space, and their impact on the community.',
    tags: ['Brand', 'Editorial', 'Lifestyle', 'Campaign'],
  },
  {
    name: 'Creative Direction',
    body: 'For projects that require a deeper level of vision. I partner with organizations to conceptualize and execute visual campaigns that resonate on a human level.',
    tags: ['Concept', 'Campaign', 'Visual Identity', 'Art Direction'],
  },
];

/** Paper section: scroll-scrubbed approach statement + services index */
const Approach = () => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stmt .w',
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: { trigger: '.stmt', start: 'top 78%', end: 'bottom 45%', scrub: 0.4 },
        },
      );
      gsap.utils.toArray<HTMLElement>('.svc-row').forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 92%' },
          },
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="paper grainy" id="services">
      <div className="sect" id="about" style={{ paddingBottom: 0 }}>
        <div className="sect__head">
          <span className="t-meta">(02) — The Approach</span>
          <span className="t-meta">The art of noticing</span>
        </div>

        <p className="stmt">
          {SENTENCE.map((token, i) => (
            <span key={i}>
              <span className={`w${token.it ? ' it' : ''}`}>{token.w}</span>{' '}
            </span>
          ))}
        </p>

        <p className="stmt-sub">
          Through a lens of respect and curiosity, I capture the moments that
          define who we are when we are most ourselves. Billy Ndizeye —
          photographer &amp; connector, Chicago, IL.
        </p>
      </div>

      <div className="sect">
        <div className="sect__head">
          <span className="t-meta">(03) — Services</span>
          <span className="t-meta">Ways we can work together</span>
        </div>

        {SERVICES.map((s, i) => (
          <div key={s.name} className="svc-row">
            <span className="svc-row__idx">/{String(i + 1).padStart(2, '0')}</span>
            <h3 className="svc-row__name">{s.name}</h3>
            <div>
              <p className="svc-row__body">{s.body}</p>
              <div className="svc-row__tags">
                {s.tags.map((t) => <span key={t} className="svc-tag">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Approach;
