import { useCallback, useEffect, useRef } from 'react';
import type { GalleryImage } from '../data/galleryImages';
import { assetUrl } from '../lib/shared';

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}

const Lightbox = ({ images, index, onIndexChange, onClose }: LightboxProps) => {
  const touchX = useRef<number | null>(null);
  const img = images[index];

  const step = useCallback(
    (dir: 1 | -1) => onIndexChange((index + dir + images.length) % images.length),
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step, onClose]);

  return (
    <div
      className="lbx"
      role="dialog"
      aria-modal="true"
      aria-label={img.title}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="lbx__bar">
        <span className="t-meta">
          {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
        <span className="t-meta" style={{ color: 'var(--paper-40)' }}>
          {img.title} — {img.category}
        </span>
        <button className="lbx__btn" onClick={onClose}>Close</button>
      </div>

      <div className="lbx__stage" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <button className="lbx__btn lbx__nav lbx__nav--prev" onClick={() => step(-1)} aria-label="Previous">
          &larr;
        </button>
        <img src={assetUrl(img.src)} alt={img.alt} />
        <button className="lbx__btn lbx__nav lbx__nav--next" onClick={() => step(1)} aria-label="Next">
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default Lightbox;
