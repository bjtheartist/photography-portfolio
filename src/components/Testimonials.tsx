import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const QUOTES = [
  {
    text: 'Billy captured our demo day like nobody else could. The energy, the focus, the raw excitement — all in frame.',
    name: 'Sarah K.',
    title: 'Founder, TechChi',
  },
  {
    text: "My headshots went from 'corporate LinkedIn' to 'this person actually does interesting things.' Exactly what I needed.",
    name: 'Marcus D.',
    title: 'Creative Director',
  },
  {
    text: "He didn't just photograph our event — he told its story. The team still talks about those shots.",
    name: 'Aisha R.',
    title: 'Community Manager, 1871',
  },
];

const Testimonials = () => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.quote',
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.quotes', start: 'top 85%' },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="sect grainy" style={{ paddingTop: 0 }}>
      <div className="sect__head">
        <span className="t-meta">(05) — Kind Words</span>
        <span className="t-meta">From the rooms I've covered</span>
      </div>

      <div className="quotes">
        {QUOTES.map((q) => (
          <div key={q.name} className="quote">
            <p className="quote__text">&ldquo;{q.text}&rdquo;</p>
            <p className="t-meta" style={{ color: 'var(--paper-40)' }}>
              — {q.name}, {q.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
