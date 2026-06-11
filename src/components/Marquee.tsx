import { Fragment, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChiStar } from '../lib/shared';

gsap.registerPlugin(ScrollTrigger);

const ORGS = [
  '1871',
  'ChiStartup Hub',
  'World Business Chicago',
  'South Side Tech',
  'Chi Hack Night',
  'BLCK VC',
  'CASA Cook County',
];

/** Static client index — replaces the old scrolling banner */
const Clients = () => {
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
    <div ref={rootRef} className="clients" aria-label="As seen at">
      <span className="clients__label t-meta">As seen at</span>
      <div className="clients__list">
        {ORGS.map((org, i) => (
          <Fragment key={org}>
            <span className="clients__name">{org}</span>
            {i < ORGS.length - 1 && <ChiStar size={10} />}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Clients;
