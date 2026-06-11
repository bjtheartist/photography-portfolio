import { Fragment, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChiStar } from '../lib/shared';

gsap.registerPlugin(ScrollTrigger);

const INDUSTRIES = [
  'Tech & Startups',
  'Corporate',
  'Non-Profit',
  'Social',
  'Community',
  'Creative',
];

/** Static industries index — the rooms this work shows up in */
const Industries = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.clients__name, .clients .chi-star',
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 90%' },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="clients" aria-label="Industries covered">
      <span className="clients__label t-meta">Working across</span>
      <div className="clients__list">
        {INDUSTRIES.map((industry, i) => (
          <Fragment key={industry}>
            <span className="clients__name">{industry}</span>
            {i < INDUSTRIES.length - 1 && <ChiStar size={10} />}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Industries;
