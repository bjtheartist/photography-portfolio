import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChiStar } from '../lib/shared';

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const counter = { v: 0 };
    const texts = ['LOADING FRAMES', 'DEVELOPING', 'FIXING', 'NOTICING'];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => onCompleteRef.current() });

      if (reduceMotion) {
        tl.set(rootRef.current, { autoAlpha: 0 }, 0.15);
        return;
      }

      tl.to(counter, {
        v: 100,
        duration: 1.8,
        ease: 'power3.inOut',
        onUpdate: () => {
          const v = Math.round(counter.v);
          if (countRef.current) countRef.current.textContent = String(v).padStart(3, '0');
          if (textRef.current) {
            textRef.current.textContent = `${texts[Math.min(texts.length - 1, Math.floor((v / 100) * texts.length))]}...`;
          }
        },
      })
        .to(rootRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
        }, '+=0.15')
        .set(rootRef.current, { display: 'none' });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="ldr" aria-hidden="true">
      <div className="ldr__row t-meta">
        <span>BJN Photography&reg;</span>
        <span ref={textRef}>LOADING FRAMES...</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ChiStar size={10} /> Chicago, IL
        </span>
      </div>
      <span ref={countRef} className="ldr__count">000</span>
    </div>
  );
};

export default Loader;
