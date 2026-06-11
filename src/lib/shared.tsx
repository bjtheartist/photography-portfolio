import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** GitHub Pages base path helper */
export const assetUrl = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

/** Six-pointed star from the Chicago flag */
export const ChiStar = ({ size = 14, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`chi-star ${className}`}
    aria-hidden="true"
  >
    <path d="M12 0l2.6 6.6L21 4.9l-4 5.6 4.5 5.3-6.9-.7L12 22l-2.6-6.9-6.9.7L7 10.5 3 4.9l6.4 1.7L12 0z" />
  </svg>
);

/**
 * Lenis smooth scroll on the GSAP ticker.
 * `ready=false` keeps scroll locked while the loader plays.
 */
export function useLenis(ready: boolean) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenis.stop();

    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;
    if (ready) {
      lenisRef.current.start();
      ScrollTrigger.refresh();
    } else {
      lenisRef.current.stop();
    }
  }, [ready]);

  return lenisRef;
}
