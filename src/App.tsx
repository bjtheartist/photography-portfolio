import { useEffect, useState } from 'react';
import Tagger from './Tagger';
import { useLenis } from './lib/shared';
import Loader from './components/Loader';
import Header from './components/Header';
import Hero from './components/Hero';
import Industries from './components/Marquee';
import Gallery from './components/Gallery';
import Chicago from './components/Chicago';
import CultureStrip from './components/CultureStrip';
import Approach from './components/Approach';
import Bio from './components/Bio';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Footer from './components/Footer';
import Cursor from './components/Cursor';

const App = () => {
  const [ready, setReady] = useState(false);
  const [isTagger, setIsTagger] = useState(window.location.hash === '#tagger');
  const lenisRef = useLenis(ready);

  useEffect(() => {
    const onHash = () => setIsTagger(window.location.hash === '#tagger');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  if (isTagger) return <Tagger />;

  return (
    <div>
      <Loader onComplete={() => setReady(true)} />
      <Cursor />
      <Header />

      <main>
        <Hero ready={ready} />
        <Industries />
        <Gallery lenisRef={lenisRef} />
        <Chicago />
        <CultureStrip />
        <Approach />
        <Bio />
        <Testimonials />
        <Booking />
      </main>

      <Footer />
    </div>
  );
};

export default App;
