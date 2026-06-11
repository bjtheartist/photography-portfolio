import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const LINKS = [
  { label: 'Work', target: '#work' },
  { label: 'Chicago', target: '#chicago' },
  { label: 'About', target: '#about' },
  { label: 'Services', target: '#services' },
  { label: 'Book', target: '#book' },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const goTo = (target: string) => {
    setOpen(false);
    setTimeout(() => {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (open) {
      gsap.set(menu, { visibility: 'visible' });
      gsap.to(menu, { clipPath: 'inset(0% 0 0% 0)', duration: 0.8, ease: 'power4.inOut' });
      gsap.fromTo(
        itemRefs.current.filter(Boolean),
        { yPercent: 110 },
        { yPercent: 0, duration: 0.7, stagger: 0.05, delay: 0.25, ease: 'power3.out' },
      );
    } else {
      gsap.to(menu, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.65,
        ease: 'power4.inOut',
        onComplete: () => gsap.set(menu, { visibility: 'hidden' }),
      });
    }
  }, [open]);

  return (
    <>
      <header className="hdr">
        <a
          className="hdr__brand"
          href="#top"
          onClick={(e) => { e.preventDefault(); goTo('#top'); }}
        >
          BJN<span style={{ color: 'var(--red)' }}>.</span>
        </a>

        <nav className="hdr__links t-meta" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.label}
              className="hdr__link"
              href={l.target}
              onClick={(e) => { e.preventDefault(); goTo(l.target); }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          className="hdr__burger t-meta"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </header>

      <div ref={menuRef} className="menu" role="dialog" aria-label="Menu">
        <div>
          {LINKS.map((l, i) => (
            <span key={l.label} className="reveal-line">
              <a
                ref={(el) => { itemRefs.current[i] = el; }}
                className="menu__item"
                href={l.target}
                onClick={(e) => { e.preventDefault(); goTo(l.target); }}
              >
                <span className="idx">0{i + 1}</span>
                {l.label}
              </a>
            </span>
          ))}
          <p className="t-meta" style={{ color: 'var(--paper-25)', marginTop: '2.2rem' }}>
            billy@kivarastudios.dev — Chicago, IL
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
