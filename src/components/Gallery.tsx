import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';
import { galleryImages, GALLERY_CATEGORIES, type GalleryCategory } from '../data/galleryImages';
import { assetUrl } from '../lib/shared';
import Lightbox from './Lightbox';

gsap.registerPlugin(ScrollTrigger);

type Filter = 'All' | GalleryCategory;

const Gallery = ({ lenisRef }: { lenisRef: RefObject<Lenis | null> }) => {
  const rootRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<Filter>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const images = useMemo(
    () => (filter === 'All' ? galleryImages : galleryImages.filter((img) => img.category === filter)),
    [filter],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ph-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.045,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.masonry', start: 'top 88%' },
        },
      );
    }, rootRef);
    // images change column flow — keep trigger positions honest
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [filter]);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (openIndex !== null) {
      lenis?.stop();
      document.documentElement.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.documentElement.style.overflow = '';
    }
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = '';
    };
  }, [openIndex, lenisRef]);

  return (
    <section ref={rootRef} className="sect" id="work">
      <div className="sect__head">
        <span className="t-meta">(01) — Selected Work</span>
        <span className="t-meta">{images.length} Frames</span>
      </div>

      <h2 className="sect__title">The Work</h2>

      <div className="filters" role="tablist" aria-label="Filter gallery">
        {(['All', ...GALLERY_CATEGORIES] as Filter[]).map((f) => (
          <button
            key={f}
            className={`filter-btn${filter === f ? ' on' : ''}`}
            onClick={() => setFilter(f)}
            role="tab"
            aria-selected={filter === f}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="masonry" key={filter}>
        {images.map((img, i) => (
          <button key={img.src} className="ph-card" onClick={() => setOpenIndex(i)}>
            <figure style={{ margin: 0 }}>
              <img src={assetUrl(img.src)} alt={img.alt} loading="lazy" />
              <figcaption>
                <span className="t-meta">{img.title}</span>
                <span className="t-meta" style={{ color: 'var(--paper-40)' }}>{img.category}</span>
              </figcaption>
            </figure>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={images}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
};

export default Gallery;
