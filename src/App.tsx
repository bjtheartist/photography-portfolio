import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { ArrowDown, Menu, X, ArrowUpRight, Instagram, Linkedin, Mail, Plus, Camera, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import Tagger from './Tagger';
import { galleryImages, GALLERY_CATEGORIES, type GalleryImage, type GalleryCategory } from './data/galleryImages';

// --- Asset path helper (GitHub Pages base path) ---
const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

// --- Geometric Micrographic Symbols ---

const GeoStar = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="0.75" />
    <line x1="1" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="0.75" />
    <line x1="4.2" y1="4.2" x2="19.8" y2="19.8" stroke="currentColor" strokeWidth="0.75" />
    <line x1="19.8" y1="4.2" x2="4.2" y2="19.8" stroke="currentColor" strokeWidth="0.75" />
  </svg>
);

const GeoCross = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="0.75" />
    <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="0.5" />
    <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const GeoCompass = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="0.5" />
    <line x1="12" y1="0" x2="12" y2="7" stroke="currentColor" strokeWidth="0.75" />
    <line x1="12" y1="17" x2="12" y2="24" stroke="currentColor" strokeWidth="0.75" />
    <line x1="0" y1="12" x2="7" y2="12" stroke="currentColor" strokeWidth="0.75" />
    <line x1="17" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="0.75" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

// --- Components ---

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("LOADING FRAMES...");

  useEffect(() => {
    if (sessionStorage.getItem('bjn-loaded')) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          sessionStorage.setItem('bjn-loaded', '1');
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 100);

    const textInterval = setInterval(() => {
      const texts = ["LOADING FRAMES...", "DEVELOPING...", "FOCUSING...", "NOTICING..."];
      setText(texts[Math.floor(Math.random() * texts.length)]);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-studio-black flex flex-col justify-between p-8 font-mono text-xs text-white"
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="flex justify-between">
        <span>BJN PHOTOGRAPHY</span>
        <span>V 2.0.26</span>
      </div>

      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-between mb-2">
          <span>{text}</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
        <div className="h-1 w-full bg-white/20">
          <motion.div
            className="h-full bg-white"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <span>CHICAGO, IL</span>
        <span>EST. 2024</span>
      </div>
    </motion.div>
  );
};

const GridBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
      <div className="absolute left-6 top-0 bottom-0 w-px bg-white/20" />
      <div className="absolute right-6 top-0 bottom-0 w-px bg-white/20" />
      <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
      <div className="absolute left-2/4 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
      <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

      <div className="absolute top-24 left-6 -translate-x-1/2 -translate-y-1/2 text-white/40"><Plus size={12} /></div>
      <div className="absolute top-24 right-6 translate-x-1/2 -translate-y-1/2 text-white/40"><Plus size={12} /></div>
      <div className="absolute bottom-24 left-6 -translate-x-1/2 translate-y-1/2 text-white/40"><Plus size={12} /></div>
      <div className="absolute bottom-24 right-6 translate-x-1/2 translate-y-1/2 text-white/40"><Plus size={12} /></div>

      {/* Floating geometric marks */}
      <div className="absolute top-[18%] right-12 hidden md:flex flex-col items-center gap-1 text-white/30">
        <GeoStar size={18} />
        <span className="font-mono text-[8px] tracking-[0.25em]">BJN</span>
      </div>
      <div className="absolute top-[55%] left-12 hidden md:flex flex-col items-center gap-1 text-white/20">
        <GeoCompass size={16} />
      </div>
      <div className="absolute bottom-[30%] right-12 hidden md:block text-white/20">
        <GeoCross size={14} />
      </div>
    </div>
  );
};

const Header = ({ hidden }: { hidden?: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hasSeenLoader = sessionStorage.getItem('bjn-loaded');
  const animDelay = hasSeenLoader ? 0.3 : 2.5;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center transition-colors duration-300 ${isScrolled ? 'bg-studio-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'} ${hidden ? 'pointer-events-none opacity-0' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: animDelay }}
      >
        <button onClick={scrollToTop} className="flex items-center gap-2 group cursor-pointer bg-transparent border-none" aria-label="Scroll to top">
          <div className="w-3 h-3 bg-white rounded-full group-hover:scale-125 transition-transform duration-300" />
          <span className="font-display font-bold text-xl tracking-tight">BJN PHOTOGRAPHY</span>
        </button>

        <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-wide text-white/70">
          <a href="#gallery" className="hover:text-white transition-colors relative group">
            GALLERY
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
          </a>
          <a href="#about" className="hover:text-white transition-colors relative group">
            ABOUT
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
          </a>
          <a href="#services" className="hover:text-white transition-colors relative group">
            SERVICES
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
          </a>
          <a href="#contact" className="hover:text-white transition-colors relative group">
            CONTACT
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
          </a>
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu />
        </button>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-studio-black flex flex-col justify-center items-center"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={32} />
            </button>
            <nav className="flex flex-col gap-8 text-center font-display text-3xl font-light">
              {['GALLERY', 'ABOUT', 'SERVICES', 'CONTACT'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-white/50 transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?q=80&w=2070&auto=format&fit=crop',
  assetUrl('/hero/SEAN9753.jpg'),
  assetUrl('/hero/IMG_2511.jpg'),
  assetUrl('/hero/IMG_9784.jpg'),
  assetUrl('/hero/IMG_9768.jpg'),
  assetUrl('/hero/IMG_9441.jpg'),
  assetUrl('/hero/IMG_6535.jpg'),
];

const Hero = () => {
  const hasSeenLoader = sessionStorage.getItem('bjn-loaded');
  const delay1 = hasSeenLoader ? 0.3 : 2.8;
  const delay2 = hasSeenLoader ? 0.6 : 3.2;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const advance = () => {
      setCurrentSlide(prev => (prev + 1) % HERO_IMAGES.length);
      timer = setTimeout(advance, 5000);
    };
    timer = setTimeout(advance, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentSlide}
            src={HERO_IMAGES[currentSlide]}
            alt="Photography by BJN"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2 }, scale: { duration: 6, ease: 'linear' } }}
          />
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: delay1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <GeoStar size={16} className="text-white/40" />
            <div className="font-mono text-[9px] tracking-[0.25em] text-white/40 uppercase leading-relaxed">
              <span>CHICAGO, IL</span>
            </div>
          </div>
          <h1 className="font-display text-[15vw] md:text-[12vw] leading-[0.85] font-medium tracking-tighter mix-blend-overlay text-white" style={{ textShadow: '6px 0 12px rgba(255,255,255,0.04), 12px 0 24px rgba(255,255,255,0.02)' }}>
            PEOPLE.
            <br />
            CULTURE.
            <br />
            <span className="italic font-light text-white/90">COMMUNITY.</span>
          </h1>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-white/20 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: delay2 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-3 bg-white text-black font-mono text-xs uppercase tracking-wider px-8 py-4 w-full md:w-auto hover:bg-white/90 transition-colors no-underline"
          >
            Book Your Event <ArrowUpRight size={14} />
          </a>
          <div className="hidden md:flex items-center gap-3">
            <GeoCross size={14} className="text-white/30" />
            <div className="font-mono text-[9px] tracking-[0.25em] text-white/30 leading-relaxed">
              <span>BJN PHOTOGRAPHY</span><br />
              <span>41.8781&deg; N, 87.6298&deg; W</span>
            </div>
          </div>
        </motion.div>

        {/* Slide indicators */}
        <div className="flex gap-2 mt-8">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-[2px] rounded-full transition-all duration-500 cursor-pointer ${
                i === currentSlide ? 'w-8 bg-white/80' : 'w-4 bg-white/25 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 4.5 Blur-Up Image Placeholder ---

const BlurImage = ({ src, alt, className = '' }: { src: string; alt: string; className?: string }) => {
  const [loaded, setLoaded] = useState(false);
  const resolvedSrc = src.startsWith('http') ? src : assetUrl(src);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className={`absolute inset-0 bg-white/5 ${loaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-600`} />
      <img
        src={resolvedSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ${loaded ? 'blur-0 opacity-100' : 'blur-lg opacity-60'} ${className}`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

// --- 4.1 Collection Gallery — Cover Cards + Click-Through Viewer ---

const CollectionViewer = ({ category, images, onClose }: {
  category: GalleryCategory;
  images: GalleryImage[];
  onClose: () => void;
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  }, [lightboxIndex, images.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  }, [lightboxIndex, images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxIndex === null) onClose();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, lightboxIndex]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] bg-studio-black overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Header bar */}
      <div className="sticky top-0 z-[85] bg-studio-black/95 backdrop-blur-sm border-b border-white/10 px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="flex items-center gap-2 font-mono text-xs text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} />
              BACK
            </button>
            <div className="h-4 w-px bg-white/15" />
            <h2 className="font-display text-lg md:text-xl font-medium">{category.toUpperCase()}</h2>
          </div>
          <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
            {images.length} PHOTOS
          </span>
        </div>
      </div>

      {/* Fixed close button — always visible, above site nav */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[100] w-14 h-14 flex items-center justify-center bg-white text-black rounded-full shadow-xl shadow-black/50 hover:scale-110 transition-transform duration-200 cursor-pointer"
        aria-label="Close collection"
      >
        <X size={28} strokeWidth={3} />
      </button>

      {/* Masonry grid — respects portrait vs landscape orientation */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {images.map((img, i) => {
            const isTall = img.size === 'tall' || img.size === 'hero' || img.size === 'feature';
            return (
              <motion.div
                key={img.src}
                className="break-inside-avoid group cursor-pointer relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
                onClick={() => setLightboxIndex(i)}
              >
                <div
                  className="overflow-hidden bg-white/5"
                  style={{ aspectRatio: isTall ? '3 / 4' : '4 / 3' }}
                >
                  <BlurImage
                    src={img.src}
                    alt={img.alt}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="font-mono text-[10px] text-white/80 uppercase tracking-wider">{img.title}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox inside collection viewer */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={() => setLightboxIndex(null)} />

            <button onClick={prevImage} className="absolute left-4 md:left-8 z-10 p-3 text-white/50 hover:text-white transition-colors" aria-label="Previous image">
              <ChevronLeft size={32} />
            </button>
            <button onClick={nextImage} className="absolute right-4 md:right-8 z-10 p-3 text-white/50 hover:text-white transition-colors" aria-label="Next image">
              <ChevronRight size={32} />
            </button>
            <button onClick={() => setLightboxIndex(null)} className="fixed top-6 right-6 z-[100] w-14 h-14 flex items-center justify-center bg-white text-black rounded-full shadow-xl shadow-black/50 hover:scale-110 transition-transform duration-200 cursor-pointer" aria-label="Close lightbox">
              <X size={28} strokeWidth={3} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={lightboxIndex}
                className="relative z-10 flex flex-col items-center mx-4 md:mx-8 max-h-[90vh]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={assetUrl(images[lightboxIndex].src)}
                  alt={images[lightboxIndex].alt}
                  className="max-h-[80vh] max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="mt-4 flex justify-between items-baseline w-full max-w-3xl">
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-medium text-white">{images[lightboxIndex].title}</h3>
                    <p className="font-mono text-xs text-white/50 mt-1 uppercase tracking-wider">{category}</p>
                  </div>
                  <span className="font-mono text-xs text-white/30">{lightboxIndex + 1} / {images.length}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const COVER_SYMBOLS = [GeoStar, GeoCross, GeoCompass, GeoStar, GeoCross, GeoCompass];

const CoverCard = ({ category, images, index, onClick }: {
  category: GalleryCategory;
  images: GalleryImage[];
  index: number;
  onClick: () => void;
}) => {
  const cover = images.find(img => img.isCover) || images[0];
  const Symbol = COVER_SYMBOLS[index % COVER_SYMBOLS.length];
  const isTall = cover.size === 'tall' || cover.size === 'hero' || cover.size === 'feature';

  return (
    <motion.div
      className="group relative cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onClick={onClick}
    >
      <div
        className="overflow-hidden bg-white/5 mb-4 relative"
        style={{ aspectRatio: isTall ? '3 / 4' : '4 / 3' }}
      >
        <div className="absolute inset-0 bg-studio-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <BlurImage
          src={cover.src}
          alt={cover.alt}
          className="transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
        />
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white text-black font-mono text-xs px-3 py-1.5 flex items-center gap-1.5">
            VIEW COLLECTION <ArrowUpRight size={12} />
          </div>
        </div>
        <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/10 backdrop-blur-sm text-white font-mono text-[10px] px-2 py-1 uppercase tracking-wider">
            {images.length} PHOTOS
          </div>
        </div>
      </div>
      <div className="flex justify-between items-baseline border-b border-white/10 pb-4 group-hover:border-white/40 transition-colors">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Symbol size={10} className="text-white/30" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">
              {String(images.length).padStart(2, '0')} WORKS
            </span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-medium">{category}</h3>
        </div>
        <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1 group-hover:translate-y-0 duration-300" />
      </div>
    </motion.div>
  );
};

const BentoGallery = ({ openCategory, setOpenCategory }: { openCategory: GalleryCategory | null; setOpenCategory: (cat: GalleryCategory | null) => void }) => {

  // Group images by category
  const imagesByCategory: Record<GalleryCategory, GalleryImage[]> = {
    'Portraits': [],
    'Corporate Events': [],
    'Creative/Editorial': [],
    'Non-Profit Events': [],
    'Social Events': [],
    'Community': [],
  };
  galleryImages.forEach(img => {
    if (imagesByCategory[img.category]) {
      imagesByCategory[img.category].push(img);
    }
  });

  const activeCategories = GALLERY_CATEGORIES.filter(cat => imagesByCategory[cat].length > 0);
  const showFallback = galleryImages.length === 0;

  return (
    <section id="gallery" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GeoStar size={12} className="text-white/40" />
              <span className="font-mono text-[9px] tracking-[0.25em] text-white/40 uppercase">COLLECTED WORKS</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-8xl font-light tracking-tighter">THE<br/>GALLERY</h2>
          </div>
          <span className="font-mono text-xs text-white/50 hidden md:block uppercase tracking-widest">
            ({String(activeCategories.length).padStart(2, '0')}) COLLECTIONS
          </span>
        </div>

        {showFallback ? (
          <div className="text-center py-24 border border-white/10">
            <p className="font-mono text-sm text-white/40 mb-4">Gallery images not yet tagged.</p>
            <p className="font-mono text-xs text-white/25">
              Visit <span className="text-white/50">localhost:3000/#tagger</span> to tag images.
            </p>
          </div>
        ) : (
          <LayoutGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
              {activeCategories.map((cat, i) => (
                <motion.div
                  key={cat}
                  layout
                  className={i % 2 === 1 ? 'md:mt-24' : ''}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <CoverCard
                    category={cat}
                    images={imagesByCategory[cat]}
                    index={i}
                    onClick={() => setOpenCategory(cat)}
                  />
                </motion.div>
              ))}
            </div>
          </LayoutGroup>
        )}
      </div>

      {/* Collection Viewer Overlay */}
      <AnimatePresence>
        {openCategory && (
          <CollectionViewer
            category={openCategory}
            images={imagesByCategory[openCategory]}
            onClose={() => setOpenCategory(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

// --- 4.3 About + Services ---

const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-white text-studio-black relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="flex items-center gap-2 mb-4">
            <GeoStar size={12} className="text-black/25" />
            <span className="font-mono text-[9px] tracking-[0.25em] text-black/30 uppercase">THE APPROACH</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-8">THE ART OF NOTICING</h2>
          <p className="font-mono text-xs uppercase tracking-wide opacity-60">
            Billy Ndizeye | Chicago, IL<br/>
            Photographer &amp; Connector
          </p>
        </div>
        <div className="md:col-span-8">
          <p className="font-sans text-xl md:text-2xl lg:text-4xl leading-tight font-light">
            I believe the most important stories aren't just told&mdash;they are <span className="italic font-serif">felt</span>. Based in Chicago, I document the quiet intersections of people, culture, and community. Through a lens of respect and curiosity, I capture the moments that define who we are when we are most ourselves.
          </p>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Event Coverage",
      desc: "From high-energy tech summits to intimate community gatherings, I capture the pulse of the event. I focus on the candid interactions and the \"unscripted\" moments that truly represent your organization's culture.",
      tags: ["Corporate", "Tech", "Social", "Non-Profit"],
    },
    {
      title: "Human-Centered Portraits",
      desc: "A portrait should feel like a conversation. Whether it's a professional headshot or a creative lifestyle session, my goal is to capture your presence\u2014the version of you that is authentic, relaxed, and real.",
      tags: ["Indoor", "Outdoor", "Studio", "Creative"],
    },
    {
      title: "Narrative Editorial & Brand Content",
      desc: "Visual storytelling for brands that lead with heart. I work with founders and creatives to build a visual archive that reflects their mission, their space, and their impact on the community.",
      tags: ["Brand", "Editorial", "Lifestyle", "Campaign"],
    },
    {
      title: "Creative Direction",
      desc: "For projects that require a deeper level of vision. I partner with organizations to conceptualize and execute visual campaigns that resonate on a human level, ensuring every image serves the broader story.",
      tags: ["Concept", "Campaign", "Visual Identity", "Art Direction"],
    },
  ];

  return (
    <section id="services" className="py-24 px-6 bg-white text-studio-black border-t border-black/10 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <GeoCross size={12} className="text-black/25" />
              <span className="font-mono text-[9px] tracking-[0.25em] text-black/30 uppercase">SERVICES</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium mb-4">WAYS WE WORK TOGETHER</h2>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                className="border-t border-black/10 pt-6 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <span className="font-mono text-[10px] text-black/30 uppercase tracking-wider">{String(i + 1).padStart(2, '0')}</span>
                <h4 className="font-display text-xl font-medium mt-2 mb-3">{s.title}</h4>
                <p className="font-sans text-sm text-black/60 leading-relaxed mb-3">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map(tag => (
                    <span key={tag} className="font-mono text-[10px] uppercase tracking-wider text-black/40 border border-black/15 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center border-t border-black/10 pt-12">
          <a
            href="mailto:billy@kivarastudios.dev?subject=Let's Work Together"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-black hover:text-black/60 transition-colors no-underline"
          >
            Start a conversation <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

// --- 4.2 Social Proof Marquee ---

const SocialProof = () => {
  const orgs = ["1871", "CHISTARTUP HUB", "WORLD BUSINESS CHICAGO", "SOUTH SIDE TECH", "CHI HACK NIGHT"];
  const marqueeContent = [...orgs, ...orgs]; // Duplicate for seamless loop

  return (
    <section className="py-12 border-y border-white/10 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">AS SEEN AT</span>
      </div>
      <div className="relative">
        <div className="marquee-track whitespace-nowrap">
          {marqueeContent.map((org, i) => (
            <span
              key={i}
              className="inline-block font-mono text-sm md:text-base uppercase tracking-[0.2em] text-white/30 mx-8 md:mx-12"
            >
              {org}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

const Headshot = () => {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="aspect-[3/4] bg-white/5 border border-white/10 overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={assetUrl('/billy-headshot.jpg')}
              alt="Billy Ndizeye - Photographer"
              className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700 hover:saturate-[1.15] hover:contrast-[1.05]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-white/50 mb-6">Beyond the Frame</p>
            <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-2">
              MY NAME IS<br/>BILLY NDIZEYE.
            </h3>
            <p className="font-mono text-[11px] text-white/35 tracking-wide mb-8 italic">
              Pronounced /n&middot;dee&middot;zay&middot;ey/ &mdash; Translation: &ldquo;I hope&rdquo; (Kinyarwanda)
            </p>
            <p className="font-sans text-base md:text-lg text-white/70 leading-relaxed mb-6">
              I started photography in college as a curiosity. After graduation, I gifted myself my first professional camera and decided to pay closer attention to the life happening around me.
            </p>
            <p className="font-sans text-base md:text-lg text-white/70 leading-relaxed mb-6">
              I use my lens to capture rooms and people. Not only how they look, but how they feel. The pause before someone speaks. The way people lean in when an idea lands. The laughter that loosens the air. The steady confidence in the self portraits. And the moments that rarely make the recap, but document the night.
            </p>
            <p className="font-sans text-base md:text-lg text-white/70 leading-relaxed mb-6">
              My work is shaped by my career, and I see myself as a connector first, photographer second. Technology and economic development put me in spaces where the future gets built in real time, one conversation at a time. Photography became my way of honoring those scenes with care and accuracy, without turning people into content.
            </p>
            <p className="font-sans text-base md:text-lg text-white/70 leading-relaxed mb-6">
              I'm here to capture the human stories that show us who we are at our best.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- 4.6 Horizontal Scroll Culture Strip ---

const CultureStrip = () => {
  const images = [
    { src: "/creative/PPGS5426_2.jpg", alt: "Autumn editorial" },
    { src: "/events/SEAN0055.jpg", alt: "Rooftop event" },
    { src: "/creative/PPGS5541.jpg", alt: "Fall fashion" },
    { src: "/events/11-SSUC9688.jpg", alt: "Chicago Marathon" },
    { src: "/creative/PPGS5242.jpg", alt: "Pumpkin portrait" },
    { src: "/events/SEAN0007.jpg", alt: "DJ set" },
    { src: "/creative/PPGS5490.jpg", alt: "Berry season" },
    { src: "/events/SSUC2669.jpg", alt: "Holiday soiree" },
    { src: "/creative/PPGS5442.jpg", alt: "Creative portrait" },
  ];

  // Duplicate for seamless loop
  const doubled = [...images, ...images];

  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="px-6 mb-12 max-w-7xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl lg:text-7xl font-light tracking-tighter">THE CULTURE</h2>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mt-2">STORIES FROM THE CITY</p>
        <div className="flex items-center gap-2 mt-3">
          <GeoCompass size={14} className="text-white/30" />
          <span className="font-mono text-[9px] tracking-[0.25em] text-white/30 uppercase">&quot;BELONGING&quot; SERIES &mdash; 2024&ndash;ONGOING</span>
        </div>
      </div>

      <div className="culture-carousel">
        <div className="culture-carousel-track">
          {doubled.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[70vw] md:w-[40vw] aspect-[16/9] overflow-hidden"
            >
              <BlurImage
                src={img.src}
                alt={img.alt}
                className="grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 4.7 Testimonials Strip ---

const Testimonials = () => {
  // TODO: Replace with real testimonials
  const quotes = [
    {
      text: "Billy captured our demo day like nobody else could. The energy, the focus, the raw excitement — all in frame.",
      name: "Sarah K.",
      title: "Founder, TechChi",
    },
    {
      text: "My headshots went from 'corporate LinkedIn' to 'this person actually does interesting things.' Exactly what I needed.",
      name: "Marcus D.",
      title: "Creative Director",
    },
    {
      text: "He didn't just photograph our event — he told its story. The team still talks about those shots.",
      name: "Aisha R.",
      title: "Community Manager, 1871",
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <p className="font-sans text-lg md:text-xl italic text-white/50 leading-relaxed mb-6">
                "{q.text}"
              </p>
              <p className="font-mono text-xs text-white/30 uppercase tracking-wider">
                — {q.name}, {q.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 4.4 Booking Form (Inline) ---

const BookingForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    interest: 'Event Coverage',
    message: '',
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry: ${form.interest}`);
    const body = encodeURIComponent(
      `Hi Billy,\n\nMy name is ${form.name}${form.organization ? ` with ${form.organization}` : ''}.\n\nI'm interested in: ${form.interest}\n\n${form.message}\n\nBest,\n${form.name}\n${form.email}`
    );
    window.location.href = `mailto:billy@kivarastudios.dev?subject=${subject}&body=${body}`;
  };

  const inputClass = "w-full bg-white/5 border border-white/10 px-4 py-3 font-mono text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit} className="bg-studio-black p-8 border border-white/10 space-y-5">
      <div className="flex justify-between items-start mb-2">
        <span className="font-mono text-xs px-2 py-1 border border-white/20 rounded-full bg-white/5 flex items-center gap-2">
          <Camera size={14} />
          Inquire
        </span>
      </div>
      <h3 className="font-display text-2xl mb-2">Tell Me About Your Story</h3>
      <p className="font-mono text-[11px] text-white/40 leading-relaxed">Every project starts with a conversation. Share a bit about what you're envisioning.</p>

      <input
        type="text"
        placeholder="Your Name"
        required
        value={form.name}
        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        className={inputClass}
      />
      <input
        type="email"
        placeholder="Your Email"
        required
        value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        className={inputClass}
      />
      <input
        type="text"
        placeholder="Organization (optional)"
        value={form.organization}
        onChange={e => setForm(f => ({ ...f, organization: e.target.value }))}
        className={inputClass}
      />
      <select
        value={form.interest}
        onChange={e => setForm(f => ({ ...f, interest: e.target.value }))}
        className={`${inputClass} appearance-none`}
      >
        <option value="Event Coverage" className="bg-studio-black">Event Coverage</option>
        <option value="Human-Centered Portraits" className="bg-studio-black">Human-Centered Portraits</option>
        <option value="Editorial & Brand Content" className="bg-studio-black">Editorial & Brand Content</option>
        <option value="Creative Direction" className="bg-studio-black">Creative Direction</option>
        <option value="Something Else" className="bg-studio-black">Something Else</option>
      </select>
      <textarea
        placeholder="Tell me a bit about your project, your vision, or what you're hoping to capture..."
        value={form.message}
        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
        rows={4}
        className={`${inputClass} resize-none`}
      />

      <button
        type="submit"
        className="w-full bg-white text-black font-mono text-xs uppercase tracking-wider py-4 hover:bg-white/90 transition-colors cursor-pointer"
      >
        Start the Conversation
      </button>
    </form>
  );
};

const Connect = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    interest: '',
    date: '',
    location: '',
    guestCount: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSubmitted(true);
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('organization', form.organization);
    formData.append('interest', form.interest);
    formData.append('date', form.date);
    formData.append('location', form.location);
    formData.append('guestCount', form.guestCount);
    formData.append('message', form.message);
    formData.append('_subject', `New Inquiry: ${form.interest || 'Project'}`);
    formData.append('_template', 'table');
    await fetch('https://formsubmit.co/ajax/billy@kivarastudios.dev', {
      method: 'POST',
      body: formData,
    });
  };

  const inputClass = "w-full bg-white/5 border border-white/10 px-4 py-3.5 font-mono text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none transition-colors";

  return (
    <section id="community" className="py-24 px-6 border-b border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter">LET'S START A<br/><span className="italic">CONVERSATION.</span></h2>
          <div className="max-w-md">
            <p className="text-white/70 font-sans text-sm md:text-base leading-relaxed">Have a story that needs to be kept? Or a project that needs a thoughtful eye? I'd love to hear what you're building and how we can document it together.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-white/40 mb-2">Name *</label>
                  <input type="text" required placeholder="Your full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-white/40 mb-2">Email *</label>
                  <input type="email" required placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputClass} />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-white/40 mb-2">Organization</label>
                <input type="text" placeholder="Company, brand, or organization name" value={form.organization} onChange={e => setForm(f => ({ ...f, organization: e.target.value }))} className={inputClass} />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-white/40 mb-2">What are you looking for? *</label>
                <select required value={form.interest} onChange={e => setForm(f => ({ ...f, interest: e.target.value }))} className={`${inputClass} appearance-none`}>
                  <option value="" className="bg-studio-black">Select a service</option>
                  <option value="Event Coverage" className="bg-studio-black">Event Coverage</option>
                  <option value="Human-Centered Portraits" className="bg-studio-black">Human-Centered Portraits</option>
                  <option value="Editorial & Brand Content" className="bg-studio-black">Editorial & Brand Content</option>
                  <option value="Creative Direction" className="bg-studio-black">Creative Direction</option>
                  <option value="Something Else" className="bg-studio-black">Something Else</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-white/40 mb-2">Preferred Date</label>
                  <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-white/40 mb-2">Location</label>
                  <input type="text" placeholder="City or venue" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-white/40 mb-2">Est. Guests</label>
                  <input type="text" placeholder="e.g. 50-100" value={form.guestCount} onChange={e => setForm(f => ({ ...f, guestCount: e.target.value }))} className={inputClass} />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-white/40 mb-2">Tell me about your project</label>
                <textarea placeholder="Share a bit about your vision, the vibe you're going for, or anything else that feels important..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={5} className={`${inputClass} resize-none`} />
              </div>

              <button type="submit" disabled={submitted} className={`w-full font-mono text-xs uppercase tracking-wider py-4 transition-colors cursor-pointer ${submitted ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-white/90'}`}>
                {submitted ? 'Sent — I\'ll Be in Touch!' : 'Send Inquiry'}
              </button>
            </form>
          </div>

          <div className="md:col-span-4 md:pl-8 md:border-l md:border-white/10">
            <div className="md:sticky md:top-32 space-y-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-white/40 mb-2">Email</p>
                <a href="mailto:billy@kivarastudios.dev" className="font-mono text-sm text-white/70 hover:text-white transition-colors no-underline">billy@kivarastudios.dev</a>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-white/40 mb-2">Based in</p>
                <p className="font-mono text-sm text-white/70">Chicago, IL</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-white/40 mb-3">Follow</p>
                <div className="flex flex-col gap-3">
                  <a href="#" className="flex items-center gap-2.5 font-mono text-sm text-white/60 hover:text-white transition-colors no-underline">
                    <Instagram size={16} /> Instagram
                  </a>
                  <a href="#" className="flex items-center gap-2.5 font-mono text-sm text-white/60 hover:text-white transition-colors no-underline">
                    <Linkedin size={16} /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 4.8 Footer with Selected Clients ---

const Footer = () => {
  return (
    <footer id="contact" className="py-24 px-6 relative z-10" role="contentinfo">
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[50vh]">
        <div>
          <a href="mailto:billy@kivarastudios.dev" className="block no-underline text-white">
            <h2 className="font-display text-5xl md:text-[10vw] leading-none tracking-tighter text-white/20 hover:text-white transition-colors duration-500 cursor-pointer">
              BOOK A SHOOT
            </h2>
          </a>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="flex gap-6">
            {/* TODO: Replace with real Instagram URL */}
            <a href="#" className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            {/* TODO: Replace with real LinkedIn URL */}
            <a href="#" className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="mailto:billy@kivarastudios.dev" className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all" aria-label="Send email">
              <Mail size={20} />
            </a>
          </div>

          <div className="text-right font-mono text-xs text-white/40">
            <p>&copy; 2026 BJN PHOTOGRAPHY.</p>
            <p>CHICAGO, IL.</p>
            <p className="mt-2">ALL IMAGES COPYRIGHTED.</p>

            {/* Technical property stamp */}
            <div className="flex items-center gap-3 justify-end mt-6 pt-4 border-t border-white/10">
              <div className="text-right text-[9px] tracking-[0.25em] text-white/25 leading-relaxed uppercase">
                <span>MADE WITH PRESENCE</span><br />
                <span>BJN PHOTOGRAPHY</span><br />
                <span>CHICAGO, ILLINOIS</span>
              </div>
              <GeoCross size={18} className="text-white/20" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.classList.contains('cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full mix-blend-difference pointer-events-none z-[9999] hidden md:block"
      animate={{
        x: mousePosition.x - (isHovering ? 16 : 8),
        y: mousePosition.y - (isHovering ? 16 : 8),
        scale: isHovering ? 2 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
    />
  );
};

const NoiseOverlay = () => {
  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none opacity-[0.03] mix-blend-overlay">
      <svg className="w-full h-full">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};

const SpeedLines = () => (
  <div className="fixed inset-0 z-[45] pointer-events-none overflow-hidden">
    <div className="speed-line speed-line-1" />
    <div className="speed-line speed-line-2" />
    <div className="speed-line speed-line-3" />
  </div>
);

// --- Main App with Final Section Order ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isTagger, setIsTagger] = useState(window.location.hash === '#tagger');
  const [openCategory, setOpenCategory] = useState<GalleryCategory | null>(null);

  useEffect(() => {
    const onHash = () => setIsTagger(window.location.hash === '#tagger');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Dev-only tagger route
  if (isTagger) return <Tagger />;

  return (
    <div className="bg-studio-black min-h-screen text-white selection:bg-white selection:text-black relative overflow-x-hidden">
      <Cursor />
      <NoiseOverlay />
      <SpeedLines />
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <GridBackground />
          <Header hidden={openCategory !== null} />
          <main role="main">
            {/* 1. Hero */}
            <Hero />
            {/* 2. About */}
            <About />
            {/* 3. Social Proof Marquee (removed) */}
            {/* 4. Headshot */}
            <Headshot />
            {/* 5. Gallery (bento grid with category sections) */}
            <BentoGallery openCategory={openCategory} setOpenCategory={setOpenCategory} />
            {/* 5b. Services */}
            <Services />
            {/* 6. Culture Strip (horizontal scroll) */}
            <CultureStrip />
            {/* 7. Connect */}
            <Connect />
          </main>
          {/* 9. Footer (with selected clients) */}
          <Footer />
        </>
      )}
    </div>
  );
}
