import { ChiStar } from '../lib/shared';

const Footer = () => (
  <footer className="footer grainy" id="contact" role="contentinfo">
    <div className="footer__cols">
      <div className="footer__col">
        <span className="t-meta">Sitemap</span>
        <a href="#work">Work</a>
        <a href="#chicago">Chicago</a>
        <a href="#about">About</a>
        <a href="#book">Book a Shoot</a>
      </div>
      <div className="footer__col">
        <span className="t-meta">Elsewhere</span>
        <a href="https://www.linkedin.com/in/billy-ndizeye/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://kivarastudios.dev" target="_blank" rel="noreferrer">Kivara Studios&reg;</a>
      </div>
      <div className="footer__col">
        <span className="t-meta">Studio</span>
        <a href="mailto:billy@kivarastudios.dev">billy@kivarastudios.dev</a>
        <span style={{ color: 'var(--paper-60)', fontWeight: 300, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ChiStar size={11} /> Chicago, Illinois
        </span>
      </div>
    </div>

    <div className="footer__mark" aria-hidden="true">BJN<sup>&reg;</sup></div>

    <div className="footer__legal t-meta">
      <span>&copy; {new Date().getFullYear()} BJN Photography — All images copyrighted</span>
      <span>Made with presence, Chicago IL</span>
    </div>
  </footer>
);

export default Footer;
