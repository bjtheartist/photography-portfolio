import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.set(dot, { opacity: 0 });
    const xTo = gsap.quickTo(dot, 'x', { duration: 0.18, ease: 'power2.out' });
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.18, ease: 'power2.out' });

    let shown = false;
    const move = (e: MouseEvent) => {
      if (!shown) {
        shown = true;
        gsap.to(dot, { opacity: 1, duration: 0.3 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
      const interactive = (e.target as HTMLElement).closest('a, button, input, textarea, select');
      gsap.to(dot, { scale: interactive ? 2.6 : 1, duration: 0.25 });
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
};

export default Cursor;
