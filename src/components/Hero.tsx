import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { assetUrl, ChiStar } from '../lib/shared';

const SLIDES = [
  '/hero/chicago-skyline.jpg',
  '/hero/SEAN9753.jpg',
  '/hero/IMG_2511.jpg',
  '/hero/IMG_9784.jpg',
  '/hero/IMG_9768.jpg',
  '/hero/IMG_9441.jpg',
  '/hero/IMG_6535.jpg',
];

const Hero = ({ ready }: { ready: boolean }) => {
  const rootRef = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);
  const played = useRef(false);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 6000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!ready || played.current) return;
    played.current = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(
        '.hero__title .reveal-line > span',
        { yPercent: 108 },
        { yPercent: 0, duration: 1.15, stagger: 0.12, ease: 'power4.out' },
      ).fromTo(
        '.hero__meta',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.55',
      );
    }, rootRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={rootRef} className="hero" id="top">
      <div className="hero__slides" aria-hidden="true">
        {SLIDES.map((src, i) => (
          <img
            key={src}
            src={assetUrl(src)}
            alt=""
            className={`hero__slide${i === slide ? ' on' : ''}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : undefined}
          />
        ))}
      </div>
      <div className="hero__scrim" />

      <div className="hero__content">
        <h1 className="hero__title">
          <span className="reveal-line"><span>People.</span></span>
          <span className="reveal-line"><span>Culture.</span></span>
          <span className="reveal-line"><span className="thin">Community.</span></span>
        </h1>

        <div className="hero__meta t-meta">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <ChiStar size={11} /> Chicago, IL — 41.8781&deg; N, 87.6298&deg; W
          </span>
          <span className="hide-sm">Events — Portraits — Editorial</span>
          <div className="hero__dots" role="tablist" aria-label="Hero images">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`hero__dot${i === slide ? ' on' : ''}`}
                onClick={() => setSlide(i)}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
          <a
            className="btn-book hide-sm"
            href="#book"
            onClick={(e) => { e.preventDefault(); document.querySelector('#book')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            <span className="dot" /> Book a shoot
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
