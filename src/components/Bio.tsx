import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assetUrl } from '../lib/shared';

gsap.registerPlugin(ScrollTrigger);

const Bio = () => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bio__photo',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.bio', start: 'top 80%' },
        },
      );
      gsap.fromTo(
        '.bio__text',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, delay: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.bio', start: 'top 80%' },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="sect">
      <div className="sect__head">
        <span className="t-meta">(04) — Beyond the Frame</span>
        <span className="t-meta">Photographer &amp; connector</span>
      </div>

      <div className="bio">
        <div className="bio__photo">
          <img src={assetUrl('/billy-headshot.jpg')} alt="Billy Ndizeye, photographer" loading="lazy" />
        </div>

        <div className="bio__text">
          <h3 className="bio__name">My name is<br />Billy Ndizeye.</h3>
          <p className="t-meta" style={{ color: 'var(--paper-40)', marginBottom: '1.6rem', fontStyle: 'italic' }}>
            /n&middot;dee&middot;zay&middot;ey/ — &ldquo;I hope&rdquo; (Kinyarwanda)
          </p>
          <p>
            I started photography in 2022 out of curiosity. After graduating
            college, I gifted myself my first professional camera and decided
            to pay closer attention to the life happening around me.
          </p>
          <p>
            I use my lens to capture rooms and people — not only how they look,
            but how they feel. The pause before someone speaks. The way people
            lean in when an idea lands. The laughter that loosens the air. The
            images that rarely make the recap, but document the moment as it is.
          </p>
          <p>
            I see myself as a connector first and a photographer second. My
            work is shaped by my career in technology and economic development —
            it's put me in spaces where the future gets built in real time, one
            conversation at a time. Photography became my way of honoring those
            scenes with care and accuracy, without turning people into content.
          </p>
          <p>
            I capture the human stories that show us who we are at our best.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Bio;
