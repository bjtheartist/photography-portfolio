import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assetUrl, ChiStar } from '../lib/shared';

gsap.registerPlugin(ScrollTrigger);

/** Full-bleed parallax love letter to the city */
const Chicago = () => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.chi__img',
        { yPercent: -9 },
        {
          yPercent: 9,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.4 },
        },
      );
      gsap.fromTo(
        '.chi__title .reveal-line > span',
        { yPercent: 108 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.chi__title', start: 'top 82%' },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="chi" id="chicago">
      <img
        className="chi__img"
        src={assetUrl('/hero/chicago-skyline.jpg')}
        alt="The Chicago skyline at dusk"
        loading="lazy"
      />
      <div className="chi__scrim" />

      <div className="chi__content">
        <h2 className="chi__title">
          <span className="reveal-line"><span>Shot in Chicago<span style={{ color: 'var(--red)' }}>.</span></span></span>
        </h2>
        <div className="chi__meta t-meta">
          <span>The city is the studio — rooftops, summits, marathons, galas</span>
          <div className="chi__stars" aria-hidden="true">
            <ChiStar size={13} />
            <ChiStar size={13} />
            <ChiStar size={13} />
            <ChiStar size={13} />
          </div>
          <span className="hide-sm">&ldquo;Belonging&rdquo; series — 2024–ongoing</span>
        </div>
      </div>
    </section>
  );
};

export default Chicago;
