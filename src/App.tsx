import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowDown, Menu, X, ArrowUpRight, Instagram, Twitter, Linkedin, Mail, Plus } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// --- Components ---

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("INITIALIZING...");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 100);

    const textInterval = setInterval(() => {
      const texts = ["LOADING ASSETS...", "CONNECTING TO SERVER...", "DECRYPTING...", "RENDERING UI..."];
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
        <span>BEAUCOUP STUDIOS</span>
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
        <span>AREA 17</span>
        <span>EST. 2024</span>
      </div>
    </motion.div>
  );
};

const GridBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
      {/* Vertical Lines */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-white/20" />
      <div className="absolute right-6 top-0 bottom-0 w-px bg-white/20" />
      <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
      <div className="absolute left-2/4 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
      <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
      
      {/* Crosshairs */}
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center transition-colors duration-300 ${isScrolled ? 'bg-studio-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 2.5 }} // Delayed for loader
      >
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-3 h-3 bg-white rounded-full group-hover:scale-125 transition-transform duration-300" />
          <span className="font-display font-bold text-xl tracking-tight">BEAUCOUP</span>
        </div>

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
        >
          <Menu />
        </button>
      </motion.header>

      {/* Mobile Menu Overlay */}
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

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-24 relative overflow-hidden">
      {/* Chicago Backdrop */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay for text readability */}
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
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 2.8 }}
          style={{ y: y1 }}
        >
          <h1 className="font-display text-[12vw] leading-[0.85] font-medium tracking-tighter mix-blend-overlay text-white">
            EVENTS
            <br />
            <span className="italic font-light text-white/90">PORTRAITS</span> &
            <br />
            CULTURE
          </h1>
        </motion.div>
        
        <motion.div 
          className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-white/20 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.2 }}
          style={{ y: y2 }}
        >
          <div className="max-w-md font-mono text-xs md:text-sm text-white/80 leading-relaxed uppercase tracking-wide">
            [EST. 2024] — BEAUCOUP STUDIOS<br/>
            TECH EVENTS. PORTRAITS. THE ENERGY OF CHICAGO'S CREATIVE SCENE.
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

const ProjectCard = ({ title, category, specs, image, index }: { title: string, category: string, specs: string, image: string, index: number }) => {
  return (
    <motion.div 
      className="group relative cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-white/5 mb-4 relative">
        <div className="absolute inset-0 bg-studio-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <motion.img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white text-black font-mono text-xs px-2 py-1">VIEW SERIES</div>
        </div>
        <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-white font-mono text-[10px] uppercase tracking-widest">{specs}</div>
        </div>
      </div>
      <div className="flex justify-between items-baseline border-b border-white/10 pb-4 group-hover:border-white/40 transition-colors">
        <div>
          <h3 className="font-display text-2xl md:text-3xl font-medium">{title}</h3>
          <p className="font-mono text-xs text-white/50 mt-1 uppercase tracking-wider">{category}</p>
        </div>
        <div className="flex items-center gap-2">
          <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1 group-hover:translate-y-0 duration-300" />
        </div>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const projects = [
    { title: "The Loop", category: "Urban Architecture", specs: "Sony A7R IV • 24mm f/1.4", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop" },
    { title: "West Loop Shadows", category: "Street Photography", specs: "Leica Q2 • 28mm f/1.7", image: "https://images.unsplash.com/photo-1496564203457-11bb12075d90?q=80&w=2550&auto=format&fit=crop" },
    { title: "Lakefront Haze", category: "Fine Art", specs: "Fujifilm GFX 100 • 45mm f/2.8", image: "https://images.unsplash.com/photo-1505236273191-1dce886b01e9?q=80&w=2070&auto=format&fit=crop" },
    { title: "Neon Nights", category: "Nightscapes", specs: "Sony A7S III • 35mm f/1.4", image: "https://images.unsplash.com/photo-1517260739337-6799d239ce83?q=80&w=2070&auto=format&fit=crop" },
  ];

  return (
    <section id="gallery" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <h2 className="font-display text-6xl md:text-8xl font-light tracking-tighter">VISUAL<br/>NARRATIVES</h2>
          <span className="font-mono text-xs text-white/50 hidden md:block uppercase tracking-widest">(04) COLLECTIONS</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
          {projects.map((project, index) => (
            <div key={index} className={index % 2 === 1 ? "md:mt-24" : ""}>
              <ProjectCard {...project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-white text-studio-black relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <h2 className="font-display text-4xl font-medium mb-8">BEHIND THE LENS</h2>
          <p className="font-mono text-xs uppercase tracking-wide opacity-60">
            Billy N. | Chicago, IL<br/>
            Available for Bookings
          </p>
        </div>
        <div className="md:col-span-8">
          <p className="font-sans text-2xl md:text-4xl leading-tight font-light mb-12">
            I live at the intersection of <span className="italic font-serif">tech</span> and <span className="italic font-serif">culture</span>. From startup demo days to intimate portraits, I capture the people and moments driving Chicago's creative scene forward.
          </p>

          <div id="services" className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-black/10 pt-12">
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

const Headshot = () => {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Headshot Placeholder */}
          <motion.div
            className="aspect-[3/4] bg-white/5 border border-white/10 flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Replace the src below with your headshot image */}
            <div className="w-full h-full flex flex-col items-center justify-center text-white/30 font-mono text-xs uppercase tracking-widest gap-4">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/20" />
              <span>Your Headshot Here</span>
            </div>
          </motion.div>

          {/* Personal Note */}
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
              I'm Billy — a photographer, technologist, and community builder based in Chicago. I started Beaucoup Studios because I saw a gap: the people shaping our city's tech and creative scenes deserved imagery that matched their energy.
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

const Community = () => {
  return (
    <section id="community" className="py-24 px-6 border-b border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <h2 className="font-display text-6xl md:text-7xl font-light tracking-tighter">CHICAGO<br/>CREATIVES</h2>
          <div className="max-w-md">
            <p className="text-white/70 font-mono text-sm leading-relaxed">Photography is a conversation. Join me for photo walks through the Loop, workshops on lighting, or gallery openings.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {[
            { label: "Photo Walk", title: "Shadows of the Loop", date: "OCT 12", desc: "Exploring high-contrast street photography." },
            { label: "Workshop", title: "Studio Lighting 101", date: "NOV 04", desc: "Mastering the three-point setup." },
            { label: "Exhibition", title: "Urban Decay: Opening", date: "DEC 15", desc: "Solo show at The Violet Hour." },
          ].map((item, i) => (
            <motion.div 
              key={i}
              className="bg-studio-black p-8 hover:bg-white/5 transition-colors cursor-pointer group relative overflow-hidden"
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight size={20} />
              </div>
              <div className="flex justify-between items-start mb-12">
                <span className="font-mono text-xs px-2 py-1 border border-white/20 rounded-full bg-white/5">{item.label}</span>
                <span className="font-mono text-xs text-white/50">{item.date}</span>
              </div>
              <h3 className="font-display text-2xl group-hover:underline decoration-1 underline-offset-4 mb-2">{item.title}</h3>
              <p className="font-mono text-xs text-white/40">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[50vh]">
        <div>
          <h2 className="font-display text-[10vw] leading-none tracking-tighter text-white/20 hover:text-white transition-colors duration-500 cursor-pointer">
            BOOK A SHOOT
          </h2>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="flex gap-6">
            <a href="#" className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
              <Linkedin size={20} />
            </a>
            <a href="mailto:hello@beaucoup.studio" className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
              <Mail size={20} />
            </a>
          </div>
          
          <div className="text-right font-mono text-xs text-white/40">
            <p>© 2026 BEAUCOUP STUDIOS.</p>
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

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-studio-black min-h-screen text-white selection:bg-white selection:text-black relative cursor-none overflow-x-hidden">
      <Cursor />
      <NoiseOverlay />
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <>
          <GridBackground />
          <Header />
          <main>
            <Hero />
            <About />
            <Headshot />
            <Gallery />
            <Community />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
