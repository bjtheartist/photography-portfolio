import { assetUrl } from '../lib/shared';

const IMAGES = [
  { src: '/creative/PPGS5426_2.jpg', alt: 'Autumn editorial' },
  { src: '/events/SEAN0055.jpg', alt: 'Rooftop event' },
  { src: '/creative/PPGS5541.jpg', alt: 'Fall fashion' },
  { src: '/events/11-SSUC9688.jpg', alt: 'Chicago Marathon' },
  { src: '/creative/PPGS5242.jpg', alt: 'Pumpkin portrait' },
  { src: '/events/SEAN0007.jpg', alt: 'DJ set' },
  { src: '/creative/PPGS5490.jpg', alt: 'Berry season' },
  { src: '/events/SSUC2669.jpg', alt: 'Holiday soiree' },
  { src: '/creative/PPGS5442.jpg', alt: 'Creative portrait' },
];

const CultureStrip = () => (
  <section className="strip" aria-label="The culture — stories from the city">
    <div className="strip__track">
      {[...IMAGES, ...IMAGES].map((img, i) => (
        <div key={i} className="strip__item" aria-hidden={i >= IMAGES.length || undefined}>
          <img src={assetUrl(img.src)} alt={i < IMAGES.length ? img.alt : ''} loading="lazy" />
        </div>
      ))}
    </div>
  </section>
);

export default CultureStrip;
