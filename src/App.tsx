import { motion, AnimatePresence, useScroll, useTransform, LayoutGroup } from 'motion/react';
import { ArrowDown, Menu, X, ArrowUpRight, Instagram, Linkedin, Mail, Plus, Camera, Users, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';

// --- Types ---

type ProjectCategory = 'All' | 'Tech Events' | 'Portraits' | 'Community' | 'Culture';

interface Project {
  title: string;
  category: ProjectCategory;
  specs: string;
  tag: string;
  image: string;
}

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
      const texts = ["LOADING FRAMES...", "DEVELOPING...", "FOCUSING...", "COMPOSING..."];
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
    </div>
  );
};

const Header = () => {
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
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center transition-colors duration-300 ${isScrolled ? 'bg-studio-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}
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
            <nav className="flex flex-col gap-8 text-center font-display text-4xl font-light">
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

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const hasSeenLoader = sessionStorage.getItem('bjn-loaded');
  const delay1 = hasSeenLoader ? 0.3 : 2.8;
  const delay2 = hasSeenLoader ? 0.6 : 3.2;

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <motion.img
          src="https://images.unsplash.com/photo-1494522855154-9297ac14b55f?q=80&w=2070&auto=format&fit=crop"
          alt="Chicago Skyline"
          className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-[2s]"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: delay1 }}
          style={{ y: y1 }}
        >
          <h1 className="font-display text-[12vw] leading-[0.85] font-medium tracking-tighter mix-blend-overlay text-white">
            PEOPLE.
            <br />
            TECH.
            <br />
            <span className="italic font-light text-white/90">CULTURE.</span>
          </h1>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-white/20 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: delay2 }}
          style={{ y: y2 }}
        >
          <div className="max-w-md font-mono text-xs md:text-sm text-white/80 leading-relaxed uppercase tracking-wide">
            [EST. 2024] — BJN PHOTOGRAPHY<br/>
            I SHOOT TECH EVENTS, PORTRAITS, AND THE CULTURE THAT MOVES CHICAGO FORWARD.
          </div>
          <div className="flex gap-4">
             <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center animate-spin-slow backdrop-blur-sm">
                <ArrowDown size={16} />
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- 4.5 Blur-Up Image Placeholder ---

const BlurImage = ({ src, alt, className = '' }: { src: string; alt: string; className?: string }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className={`absolute inset-0 bg-white/5 ${loaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-600`} />
      <img
        src={src}
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

// --- 4.1 Gallery with Lightbox + Category Filter + Hover Tags ---

const ProjectCard = ({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) => {
  return (
    <motion.div
      layout
      className="group relative cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onClick={onClick}
    >
      <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-white/5 mb-4 relative">
        <div className="absolute inset-0 bg-studio-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <BlurImage
          src={project.image}
          alt={project.title}
          className="transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
        />
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white text-black font-mono text-xs px-2 py-1">VIEW</div>
        </div>
        {/* Hover tag overlay: location + year + tag */}
        <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-end">
          <div className="text-white font-mono text-[10px] uppercase tracking-widest">{project.specs}</div>
          <div className="bg-white/10 backdrop-blur-sm text-white font-mono text-[10px] px-2 py-1 uppercase tracking-wider">{project.tag}</div>
        </div>
      </div>
      <div className="flex justify-between items-baseline border-b border-white/10 pb-4 group-hover:border-white/40 transition-colors">
        <div>
          <h3 className="font-display text-2xl md:text-3xl font-medium">{project.title}</h3>
          <p className="font-mono text-xs text-white/50 mt-1 uppercase tracking-wider">{project.category}</p>
        </div>
        <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1 group-hover:translate-y-0 duration-300" />
      </div>
    </motion.div>
  );
};

const Lightbox = ({ projects, currentIndex, onClose, onNext, onPrev }: {
  projects: Project[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) => {
  const project = projects[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Navigation */}
      <button
        onClick={onPrev}
        className="absolute left-4 md:left-8 z-10 p-3 text-white/50 hover:text-white transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 md:right-8 z-10 p-3 text-white/50 hover:text-white transition-colors"
        aria-label="Next image"
      >
        <ChevronRight size={32} />
      </button>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-2 text-white/50 hover:text-white transition-colors"
        aria-label="Close lightbox"
      >
        <X size={28} />
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="relative z-10 w-full max-w-5xl mx-4 md:mx-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <div className="aspect-[4/3] md:aspect-[16/10] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="mt-4 flex justify-between items-baseline">
            <div>
              <h3 className="font-display text-xl md:text-2xl font-medium text-white">{project.title}</h3>
              <p className="font-mono text-xs text-white/50 mt-1 uppercase tracking-wider">
                {project.category} — {project.specs}
              </p>
            </div>
            <span className="font-mono text-xs text-white/30">{currentIndex + 1} / {projects.length}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const Gallery = () => {
  const categories: ProjectCategory[] = ['All', 'Tech Events', 'Portraits', 'Community', 'Culture'];
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // TODO: Replace Unsplash images with Billy's real photos
  const projects: Project[] = [
    { title: "Demo Day", category: "Tech Events", specs: "Chicago, 2024", tag: "Keynote", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop" },
    { title: "Pitch Night", category: "Tech Events", specs: "1871, 2025", tag: "Startup", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop" },
    { title: "Faces of the Scene", category: "Portraits", specs: "Ongoing Series", tag: "Street Portrait", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop" },
    { title: "Creative Headshots", category: "Portraits", specs: "Studio, 2025", tag: "Headshot", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2070&auto=format&fit=crop" },
    { title: "South Side Stories", category: "Community", specs: "Southeast Chicago", tag: "Documentary", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop" },
    { title: "Block Party", category: "Community", specs: "Bronzeville, 2024", tag: "Community", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2070&auto=format&fit=crop" },
    { title: "After Hours", category: "Culture", specs: "Chicago", tag: "Nightlife", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2070&auto=format&fit=crop" },
    { title: "The Art of Food", category: "Culture", specs: "West Loop, 2025", tag: "Lifestyle", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop" },
  ];

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const openLightbox = (filteredIndex: number) => {
    setLightboxIndex(filteredIndex);
  };

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  return (
    <section id="gallery" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <h2 className="font-display text-6xl md:text-8xl font-light tracking-tighter">THE<br/>WORK</h2>
          <span className="font-mono text-xs text-white/50 hidden md:block uppercase tracking-widest">({String(filtered.length).padStart(2, '0')}) COLLECTIONS</span>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`font-mono text-xs px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
                activeFilter === cat
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-white/60 border-white/20 hover:border-white/50 hover:text-white'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        <LayoutGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
            {filtered.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                className={index % 2 === 1 ? "md:mt-24" : ""}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  onClick={() => openLightbox(index)}
                />
              </motion.div>
            ))}
          </div>
        </LayoutGroup>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            projects={filtered}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

// --- 4.3 Services Section with Pricing ---

const About = () => {
  const serviceCards = [
    {
      title: "Tech Events",
      desc: "Event coverage, keynotes, demos",
      price: "Starting at $500",
    },
    {
      title: "Portraits",
      desc: "Headshots, creative portraits, lifestyle",
      price: "Starting at $250",
    },
    {
      title: "Culture & Editorial",
      desc: "Community events, brand storytelling",
      price: "Starting at $400",
    },
  ];

  return (
    <section id="about" className="py-24 px-6 bg-white text-studio-black relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <h2 className="font-display text-4xl font-medium mb-8">THE PHOTOGRAPHER</h2>
          <p className="font-mono text-xs uppercase tracking-wide opacity-60">
            Billy N. | Chicago, IL<br/>
            Available for Bookings
          </p>
        </div>
        <div className="md:col-span-8">
          <p className="font-sans text-2xl md:text-4xl leading-tight font-light mb-12">
            I live where <span className="italic font-serif">tech</span> meets <span className="italic font-serif">culture</span>. Startup demo days, intimate portraits, community moments — I capture the people and energy driving Chicago forward.
          </p>

          {/* Service Cards with Pricing */}
          <div id="services" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {serviceCards.map((service) => (
              <div key={service.title} className="border border-black/10 p-6 hover:border-black/30 transition-colors group">
                <h4 className="font-display text-xl font-medium mb-2">{service.title}</h4>
                <p className="font-sans text-sm text-black/60 mb-4">{service.desc}</p>
                <p className="font-mono text-xs uppercase tracking-wider text-black/40 mb-6">{service.price}</p>
                <a
                  href={`mailto:billy@kivarastudios.dev?subject=Quote Request: ${service.title}&body=Hi Billy, I'd like to request a quote for ${service.title.toLowerCase()} services.`}
                  className="font-mono text-xs uppercase tracking-wider text-black hover:text-black/60 transition-colors inline-flex items-center gap-1 group-hover:gap-2"
                >
                  Request a Quote <ArrowUpRight size={12} />
                </a>
              </div>
            ))}
          </div>

          {/* Existing Services/Spaces/Clients lists */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-black/10 pt-12">
            <div>
              <h4 className="font-mono text-xs uppercase mb-4 opacity-50">Services</h4>
              <ul className="space-y-2 font-display text-lg">
                <li className="hover:translate-x-2 transition-transform cursor-default">Event Coverage</li>
                <li className="hover:translate-x-2 transition-transform cursor-default">Portraits</li>
                <li className="hover:translate-x-2 transition-transform cursor-default">Brand Content</li>
                <li className="hover:translate-x-2 transition-transform cursor-default">Creative Direction</li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase mb-4 opacity-50">Spaces</h4>
              <ul className="space-y-2 font-display text-lg">
                <li className="hover:translate-x-2 transition-transform cursor-default">Tech Events</li>
                <li className="hover:translate-x-2 transition-transform cursor-default">Startup Culture</li>
                <li className="hover:translate-x-2 transition-transform cursor-default">Community</li>
                <li className="hover:translate-x-2 transition-transform cursor-default">Lifestyle</li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase mb-4 opacity-50">Clients</h4>
              <ul className="space-y-2 font-display text-lg">
                <li className="hover:translate-x-2 transition-transform cursor-default">Founders</li>
                <li className="hover:translate-x-2 transition-transform cursor-default">Creatives</li>
                <li className="hover:translate-x-2 transition-transform cursor-default">Organizations</li>
              </ul>
            </div>
          </div>
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
          {/* TODO: Replace with Billy's real headshot image */}
          <motion.div
            className="aspect-[3/4] bg-white/5 border border-white/10 flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              <div className="w-28 h-28 rounded-full bg-white/10 flex items-center justify-center">
                <span className="font-display text-4xl font-medium text-white/40">BN</span>
              </div>
              <span className="font-mono text-xs text-white/20 uppercase tracking-widest">Photo coming soon</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-white/50 mb-6">The Person</p>
            <h3 className="font-display text-4xl md:text-5xl font-light tracking-tight mb-8">
              NICE TO<br/>MEET YOU.
            </h3>
            <p className="font-sans text-lg text-white/70 leading-relaxed mb-6">
              I'm Billy — a photographer, technologist, and community builder based in Chicago. I started BJN Photography because I saw a gap: the people shaping our city's tech and creative scenes deserved imagery that matched their energy.
            </p>
            <p className="font-sans text-lg text-white/70 leading-relaxed">
              Whether it's a packed demo day, a quiet portrait session, or the controlled chaos of a launch event — I'm there to make sure the moment lives beyond the room.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- 4.6 Horizontal Scroll Culture Strip ---

const CultureStrip = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  // TODO: Replace with real Chicago culture photos
  const images = [
    { src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2070&auto=format&fit=crop", alt: "Chicago Architecture" },
    { src: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop", alt: "Concert crowd" },
    { src: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=2070&auto=format&fit=crop", alt: "Street art" },
    { src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2070&auto=format&fit=crop", alt: "Community gathering" },
    { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop", alt: "Night event" },
  ];

  return (
    <section ref={sectionRef} className="py-24 relative z-10 culture-scroll overflow-hidden">
      <div className="px-6 mb-12 max-w-7xl mx-auto">
        <h2 className="font-display text-5xl md:text-7xl font-light tracking-tighter">THE CULTURE</h2>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mt-2">CHICAGO'S CREATIVE SCENE</p>
      </div>

      <motion.div
        className="flex gap-4 md:gap-6 pl-6"
        style={{ x }}
      >
        {images.map((img, i) => (
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
      </motion.div>
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
    shootType: 'Event',
    date: '',
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Booking Request: ${form.shootType} Shoot`);
    const body = encodeURIComponent(
      `Hi Billy,\n\nI'd like to book a shoot.\n\nName: ${form.name}\nEmail: ${form.email}\nShoot Type: ${form.shootType}\nPreferred Date: ${form.date}\n\nLooking forward to hearing from you!`
    );
    window.location.href = `mailto:billy@kivarastudios.dev?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="bg-studio-black p-8 border border-white/10 space-y-6">
      <div className="flex justify-between items-start mb-4">
        <span className="font-mono text-xs px-2 py-1 border border-white/20 rounded-full bg-white/5 flex items-center gap-2">
          <Camera size={14} />
          Book a Shoot
        </span>
      </div>
      <h3 className="font-display text-2xl mb-6">Let's Create Together</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Your Name"
          required
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="bg-white/5 border border-white/10 px-4 py-3 font-mono text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none transition-colors"
        />
        <input
          type="email"
          placeholder="Your Email"
          required
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="bg-white/5 border border-white/10 px-4 py-3 font-mono text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none transition-colors"
        />
        <select
          value={form.shootType}
          onChange={e => setForm(f => ({ ...f, shootType: e.target.value }))}
          className="bg-white/5 border border-white/10 px-4 py-3 font-mono text-sm text-white focus:border-white/40 focus:outline-none transition-colors appearance-none"
        >
          <option value="Event" className="bg-studio-black">Event</option>
          <option value="Portrait" className="bg-studio-black">Portrait</option>
          <option value="Brand" className="bg-studio-black">Brand</option>
          <option value="Other" className="bg-studio-black">Other</option>
        </select>
        <input
          type="date"
          value={form.date}
          onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
          className="bg-white/5 border border-white/10 px-4 py-3 font-mono text-sm text-white focus:border-white/40 focus:outline-none transition-colors"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-white text-black font-mono text-xs uppercase tracking-wider py-4 hover:bg-white/90 transition-colors cursor-pointer"
      >
        Send Booking Request
      </button>
    </form>
  );
};

const Connect = () => {
  return (
    <section id="community" className="py-24 px-6 border-b border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <h2 className="font-display text-6xl md:text-7xl font-light tracking-tighter">LET'S<br/>CONNECT</h2>
          <div className="max-w-md">
            <p className="text-white/70 font-mono text-sm leading-relaxed">Ready to work together or just want to say what's up? Pick your lane.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {/* Inline Booking Form replaces first card */}
          <BookingForm />

          {/* Instagram */}
          <motion.a
            href="#" // TODO: Replace with real Instagram URL
            className="bg-studio-black p-8 hover:bg-white/5 transition-colors cursor-pointer group relative overflow-hidden block no-underline text-white"
            whileHover={{ y: -5 }}
            aria-label="Instagram"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={20} />
            </div>
            <div className="flex justify-between items-start mb-12">
              <span className="font-mono text-xs px-2 py-1 border border-white/20 rounded-full bg-white/5 flex items-center gap-2">
                <Instagram size={14} />
                Follow Along
              </span>
            </div>
            <h3 className="font-display text-2xl group-hover:underline decoration-1 underline-offset-4 mb-2">Behind the Scenes</h3>
            <p className="font-mono text-xs text-white/40">Work in progress, BTS moments, and the Chicago creative scene.</p>
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            href="#" // TODO: Replace with real LinkedIn URL
            className="bg-studio-black p-8 hover:bg-white/5 transition-colors cursor-pointer group relative overflow-hidden block no-underline text-white"
            whileHover={{ y: -5 }}
            aria-label="LinkedIn"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={20} />
            </div>
            <div className="flex justify-between items-start mb-12">
              <span className="font-mono text-xs px-2 py-1 border border-white/20 rounded-full bg-white/5 flex items-center gap-2">
                <Users size={14} />
                Connect
              </span>
            </div>
            <h3 className="font-display text-2xl group-hover:underline decoration-1 underline-offset-4 mb-2">Let's Link Up</h3>
            <p className="font-mono text-xs text-white/40">Professional inquiries, collaborations, and community.</p>
          </motion.a>
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
            <h2 className="font-display text-[10vw] leading-none tracking-tighter text-white/20 hover:text-white transition-colors duration-500 cursor-pointer">
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
            <p className="text-white/20 mb-2 uppercase tracking-[0.2em]">Selected Clients: 1871 &bull; ChiStartup Hub &bull; World Business Chicago</p>
            <p>&copy; 2026 BJN PHOTOGRAPHY.</p>
            <p>CHICAGO, IL.</p>
            <p className="mt-2">ALL IMAGES COPYRIGHTED.</p>
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

// --- Main App with Final Section Order ---

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-studio-black min-h-screen text-white selection:bg-white selection:text-black relative overflow-x-hidden">
      <Cursor />
      <NoiseOverlay />
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <GridBackground />
          <Header />
          <main role="main">
            {/* 1. Hero */}
            <Hero />
            {/* 2. About (with enhanced services cards) */}
            <About />
            {/* 3. Social Proof Marquee */}
            <SocialProof />
            {/* 4. Headshot */}
            <Headshot />
            {/* 5. Gallery (with filter + lightbox) */}
            <Gallery />
            {/* 6. Culture Strip (horizontal scroll) */}
            <CultureStrip />
            {/* 7. Testimonials */}
            <Testimonials />
            {/* 8. Connect (with inline booking form) */}
            <Connect />
          </main>
          {/* 9. Footer (with selected clients) */}
          <Footer />
        </>
      )}
    </div>
  );
}
