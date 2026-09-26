// --- Gallery Image Types & Manifest ---

export type GalleryCategory =
  | 'Portraits'
  | 'Corporate Events'
  | 'Creative/Editorial'
  | 'Non-Profit Events'
  | 'Social Events'
  | 'Community';

export type BentoSize = 'hero' | 'feature' | 'wide' | 'tall' | 'standard';

export interface GalleryImage {
  src: string;
  category: GalleryCategory;
  size: BentoSize;
  title: string;
  alt: string;
  objectPosition?: string;
  isCover?: boolean;
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'Portraits',
  'Corporate Events',
  'Creative/Editorial',
  'Non-Profit Events',
  'Social Events',
  'Community',
];

// All 54 gallery-eligible images (excludes billy-headshot.png)
export const IMAGE_MANIFEST: string[] = [
  // Portraits (12)
  '/portraits/M_PG0660.jpg',
  '/portraits/M_PG0838.jpg',
  '/portraits/M_PG0935.jpg',
  '/portraits/M_PG1067.jpg',
  '/portraits/M_PG1323.jpg',
  '/portraits/M_PG1387.jpg',
  '/portraits/M_PG1445.jpg',
  '/portraits/PPGB0253.jpg',
  '/portraits/PPGB0342.jpg',
  '/portraits/PPGB0487.jpg',
  '/portraits/PPGB0710.jpg',
  '/portraits/PPGB0788.jpg',
  // Creative (7)
  '/creative/PPGS5140.jpg',
  '/creative/PPGS5240.jpg',
  '/creative/PPGS5242.jpg',
  '/creative/PPGS5426_2.jpg',
  '/creative/PPGS5442.jpg',
  '/creative/PPGS5490.jpg',
  '/creative/PPGS5541.jpg',
  // Events (35)
  '/events/11-SSUC9688.jpg',
  '/events/118-SSUC8221.jpg',
  '/events/148-SSUC7538.jpg',
  '/events/167-SSUC7330.jpg',
  '/events/193-SSUC7178.jpg',
  '/events/273-SSUC6920.jpg',
  '/events/28-SSUC9532.jpg',
  '/events/28-SSUC95321.jpg',
  '/events/SEAN0004.jpg',
  '/events/SEAN0007.jpg',
  '/events/SEAN0028.jpg',
  '/events/SEAN0055.jpg',
  '/events/SEAN0081.jpg',
  '/events/SEAN0089.jpg',
  '/events/SSUC2398.jpg',
  '/events/SSUC2435.jpg',
  '/events/SSUC2513.jpg',
  '/events/SSUC2516.jpg',
  '/events/SSUC2610.jpg',
  '/events/SSUC2647.jpg',
  '/events/SSUC2669.jpg',
  '/events/SSUC3054.jpg',
  '/events/SSUC9898.jpg',
  '/events/SSUC9908.jpg',
  '/events/SSUC9915.jpg',
  '/events/SSUC9933.jpg',
  '/events/SSUC9945.jpg',
  '/events/S_PG1393.jpg',
  '/events/S_PG1482.jpg',
  '/events/S_PG1525.jpg',
  '/events/S_PG1742.jpg',
  '/events/S_PG1889.jpg',
  '/events/S_PG2087.jpg',
  '/events/S_PG2103.jpg',
  '/events/S_PG2181.jpg',
  // New shoots (Sep 2026)
  '/events/casa-run-01.jpg',
  '/events/casa-run-02.jpg',
  '/events/casa-run-03.jpg',
  '/events/casa-run-04.jpg',
  '/events/casa-run-05.jpg',
  '/events/casa-run-06.jpg',
  '/events/casa-run-07.jpg',
  '/events/casa-run-08.jpg',
  '/events/casa-run-09.jpg',
  '/events/casa-run-10.jpg',
  '/events/casa-run-11.jpg',
  '/events/casa-run-12.jpg',
  '/events/casa-run-13.jpg',
  '/events/casa-run-14.jpg',
  '/events/casa-run-15.jpg',
  '/events/1871-01.jpg',
  '/events/1871-02.jpg',
  '/events/1871-03.jpg',
  '/events/1871-04.jpg',
  '/events/1871-05.jpg',
  '/events/1871-06.jpg',
  '/events/1871-07.jpg',
  '/events/1871-08.jpg',
  '/events/1871-09.jpg',
];

// Tagged gallery data — populated from tagger export
export const galleryImages: GalleryImage[] = [
  // --- Portraits (13) --- cover: PPGB0253
  { src: "/portraits/M_PG0660.jpg", category: "Portraits", size: "tall", title: "Executive Portrait", alt: "Portraits photography by BJN" },
  { src: "/portraits/M_PG0838.jpg", category: "Portraits", size: "tall", title: "Executive Portrait", alt: "Portraits photography by BJN" },
  { src: "/portraits/M_PG0935.jpg", category: "Portraits", size: "tall", title: "Executive Portrait", alt: "Portraits photography by BJN" },
  { src: "/portraits/M_PG1067.jpg", category: "Portraits", size: "tall", title: "M_PG1067", alt: "Portraits photography by BJN" },
  { src: "/portraits/M_PG1323.jpg", category: "Portraits", size: "tall", title: "M_PG1323", alt: "Portraits photography by BJN" },
  { src: "/portraits/M_PG1387.jpg", category: "Portraits", size: "tall", title: "M_PG1387", alt: "Portraits photography by BJN" },
  { src: "/portraits/M_PG1445.jpg", category: "Portraits", size: "tall", title: "Executive Portrait", alt: "Portraits photography by BJN" },
  { src: "/portraits/PPGB0253.jpg", category: "Portraits", size: "tall", title: "PPGB0253", alt: "Portraits photography by BJN", isCover: true },
  { src: "/portraits/PPGB0342.jpg", category: "Portraits", size: "tall", title: "PPGB0342", alt: "Portraits photography by BJN" },
  { src: "/portraits/PPGB0487.jpg", category: "Portraits", size: "tall", title: "PPGB0487", alt: "Portraits photography by BJN" },
  { src: "/portraits/PPGB0710.jpg", category: "Portraits", size: "tall", title: "PPGB0710", alt: "Portraits photography by BJN" },
  { src: "/portraits/PPGB0788.jpg", category: "Portraits", size: "tall", title: "PPGB0788", alt: "Portraits photography by BJN" },
  { src: "/events/SSUC3054.jpg", category: "Portraits", size: "tall", title: "Studio Portrait", alt: "Portraits photography by BJN" },

  // --- Creative/Editorial (7) --- cover: PPGS5541
  { src: "/creative/PPGS5140.jpg", category: "Creative/Editorial", size: "standard", title: "Studio Portrait", alt: "Creative/Editorial photography by BJN" },
  { src: "/creative/PPGS5240.jpg", category: "Creative/Editorial", size: "standard", title: "Studio Portrait", alt: "Creative/Editorial photography by BJN" },
  { src: "/creative/PPGS5242.jpg", category: "Creative/Editorial", size: "standard", title: "Studio Portrait", alt: "Creative/Editorial photography by BJN" },
  { src: "/creative/PPGS5426_2.jpg", category: "Creative/Editorial", size: "standard", title: "Studio Portrait", alt: "Creative/Editorial photography by BJN" },
  { src: "/creative/PPGS5442.jpg", category: "Creative/Editorial", size: "standard", title: "Studio Portrait", alt: "Creative/Editorial photography by BJN" },
  { src: "/creative/PPGS5490.jpg", category: "Creative/Editorial", size: "standard", title: "Studio Portrait", alt: "Creative/Editorial photography by BJN" },
  { src: "/creative/PPGS5541.jpg", category: "Creative/Editorial", size: "standard", title: "Studio Portrait", alt: "Creative/Editorial photography by BJN", isCover: true },

  // --- Team CASA 20 Mile Run (new, 15) ---
  { src: "/events/casa-run-01.jpg", category: "Non-Profit Events", size: "standard", title: "Team CASA 20 Mile Run", alt: "Non-Profit Events photography by BJN" },
  { src: "/events/casa-run-02.jpg", category: "Non-Profit Events", size: "standard", title: "Team CASA 20 Mile Run", alt: "Non-Profit Events photography by BJN" },
  { src: "/events/casa-run-03.jpg", category: "Non-Profit Events", size: "standard", title: "Team CASA 20 Mile Run", alt: "Non-Profit Events photography by BJN" },
  { src: "/events/casa-run-04.jpg", category: "Non-Profit Events", size: "standard", title: "Team CASA 20 Mile Run", alt: "Non-Profit Events photography by BJN" },
  { src: "/events/casa-run-05.jpg", category: "Non-Profit Events", size: "standard", title: "Team CASA 20 Mile Run", alt: "Non-Profit Events photography by BJN" },
  { src: "/events/casa-run-06.jpg", category: "Non-Profit Events", size: "standard", title: "Team CASA 20 Mile Run", alt: "Non-Profit Events photography by BJN" },
  { src: "/events/casa-run-07.jpg", category: "Non-Profit Events", size: "standard", title: "Team CASA 20 Mile Run", alt: "Non-Profit Events photography by BJN" },
  { src: "/events/casa-run-08.jpg", category: "Non-Profit Events", size: "standard", title: "Team CASA 20 Mile Run", alt: "Non-Profit Events photography by BJN" },
  { src: "/events/casa-run-09.jpg", category: "Non-Profit Events", size: "standard", title: "Team CASA 20 Mile Run", alt: "Non-Profit Events photography by BJN" },
  { src: "/events/casa-run-10.jpg", category: "Non-Profit Events", size: "standard", title: "Team CASA 20 Mile Run", alt: "Non-Profit Events photography by BJN" },
  { src: "/events/casa-run-11.jpg", category: "Non-Profit Events", size: "standard", title: "Team CASA 20 Mile Run", alt: "Non-Profit Events photography by BJN" },
  { src: "/events/casa-run-12.jpg", category: "Non-Profit Events", size: "standard", title: "Team CASA 20 Mile Run", alt: "Non-Profit Events photography by BJN" },
  { src: "/events/casa-run-13.jpg", category: "Non-Profit Events", size: "standard", title: "Team CASA 20 Mile Run", alt: "Non-Profit Events photography by BJN" },
  { src: "/events/casa-run-14.jpg", category: "Non-Profit Events", size: "standard", title: "Team CASA 20 Mile Run", alt: "Non-Profit Events photography by BJN" },
  { src: "/events/casa-run-15.jpg", category: "Non-Profit Events", size: "standard", title: "Team CASA 20 Mile Run", alt: "Non-Profit Events photography by BJN" },

  // --- Non-Profit Events (8) --- cover: 273-SSUC6920
  { src: "/events/11-SSUC9688.jpg", category: "Non-Profit Events", size: "standard", title: "CASA Cook County Chicago Marathon", alt: "Non-Profit Events photography by BJN" },
  { src: "/events/118-SSUC8221.jpg", category: "Non-Profit Events", size: "standard", title: "CASA Cook County Chicago Marathon", alt: "Non-Profit Events photography by BJN" },
  { src: "/events/148-SSUC7538.jpg", category: "Non-Profit Events", size: "standard", title: "CASA Cook County Chicago Marathon", alt: "Non-Profit Events photography by BJN" },
  { src: "/events/167-SSUC7330.jpg", category: "Non-Profit Events", size: "standard", title: "CASA Cook County Chicago Marathon", alt: "Non-Profit Events photography by BJN" },
  { src: "/events/193-SSUC7178.jpg", category: "Non-Profit Events", size: "standard", title: "CASA Cook County Chicago Marathon", alt: "Non-Profit Events photography by BJN" },
  { src: "/events/273-SSUC6920.jpg", category: "Non-Profit Events", size: "standard", title: "CASA Cook County Chicago Marathon", alt: "Non-Profit Events photography by BJN", isCover: true },
  { src: "/events/28-SSUC9532.jpg", category: "Non-Profit Events", size: "standard", title: "CASA Cook County Chicago Marathon", alt: "Non-Profit Events photography by BJN" },
  { src: "/events/28-SSUC95321.jpg", category: "Non-Profit Events", size: "standard", title: "CASA Cook County Chicago Marathon", alt: "Non-Profit Events photography by BJN" },

  // --- Social Events (7) --- cover: SEAN0007
  { src: "/events/SEAN0004.jpg", category: "Social Events", size: "standard", title: "SEAN0004", alt: "Social Events photography by BJN" },
  { src: "/events/SEAN0007.jpg", category: "Social Events", size: "standard", title: "SEAN0007", alt: "Social Events photography by BJN", isCover: true },
  { src: "/events/SEAN0028.jpg", category: "Social Events", size: "standard", title: "SEAN0028", alt: "Social Events photography by BJN" },
  { src: "/events/SEAN0055.jpg", category: "Social Events", size: "standard", title: "SEAN0055", alt: "Social Events photography by BJN" },
  { src: "/events/SEAN0081.jpg", category: "Social Events", size: "standard", title: "SEAN0081", alt: "Social Events photography by BJN" },
  { src: "/events/SEAN0089.jpg", category: "Social Events", size: "standard", title: "SEAN0089", alt: "Social Events photography by BJN" },
  { src: "/events/SSUC2398.jpg", category: "Social Events", size: "standard", title: "BLCK VC Holiday Party", alt: "Social Events photography by BJN" },

  // --- 1871 Momentum 2026 (new, 9) ---
  { src: "/events/1871-01.jpg", category: "Corporate Events", size: "standard", title: "1871 Momentum 2026", alt: "Corporate Events photography by BJN" },
  { src: "/events/1871-02.jpg", category: "Corporate Events", size: "standard", title: "1871 Momentum 2026", alt: "Corporate Events photography by BJN" },
  { src: "/events/1871-03.jpg", category: "Corporate Events", size: "standard", title: "1871 Momentum 2026", alt: "Corporate Events photography by BJN" },
  { src: "/events/1871-04.jpg", category: "Corporate Events", size: "standard", title: "1871 Momentum 2026", alt: "Corporate Events photography by BJN" },
  { src: "/events/1871-05.jpg", category: "Corporate Events", size: "standard", title: "1871 Momentum 2026", alt: "Corporate Events photography by BJN" },
  { src: "/events/1871-06.jpg", category: "Corporate Events", size: "standard", title: "1871 Momentum 2026", alt: "Corporate Events photography by BJN" },
  { src: "/events/1871-07.jpg", category: "Corporate Events", size: "standard", title: "1871 Momentum 2026", alt: "Corporate Events photography by BJN" },
  { src: "/events/1871-08.jpg", category: "Corporate Events", size: "standard", title: "1871 Momentum 2026", alt: "Corporate Events photography by BJN" },
  { src: "/events/1871-09.jpg", category: "Corporate Events", size: "standard", title: "1871 Momentum 2026", alt: "Corporate Events photography by BJN" },

  // --- Corporate Events (19) --- cover: S_PG2181
  { src: "/events/SSUC2435.jpg", category: "Corporate Events", size: "standard", title: "BLCK VC Holiday Party", alt: "Corporate Events photography by BJN" },
  { src: "/events/SSUC2513.jpg", category: "Corporate Events", size: "standard", title: "BLCK VC Holiday Party", alt: "Corporate Events photography by BJN" },
  { src: "/events/SSUC2516.jpg", category: "Corporate Events", size: "standard", title: "BLCK VC Holiday Party", alt: "Corporate Events photography by BJN" },
  { src: "/events/SSUC2610.jpg", category: "Corporate Events", size: "tall", title: "BLCK VC Holiday Party", alt: "Corporate Events photography by BJN" },
  { src: "/events/SSUC2647.jpg", category: "Corporate Events", size: "tall", title: "BLCK VC Holiday Party", alt: "Corporate Events photography by BJN" },
  { src: "/events/SSUC2669.jpg", category: "Corporate Events", size: "tall", title: "BLCK VC Holiday Party", alt: "Corporate Events photography by BJN" },
  { src: "/events/SSUC9898.jpg", category: "Corporate Events", size: "tall", title: "GBBC State of Web3 Breakfast", alt: "Corporate Events photography by BJN" },
  { src: "/events/SSUC9908.jpg", category: "Corporate Events", size: "standard", title: "GBBC State of Web3 Breakfast", alt: "Corporate Events photography by BJN" },
  { src: "/events/SSUC9915.jpg", category: "Corporate Events", size: "standard", title: "GBBC State of Web3 Breakfast", alt: "Corporate Events photography by BJN" },
  { src: "/events/SSUC9933.jpg", category: "Corporate Events", size: "tall", title: "GBBC State of Web3 Breakfast", alt: "Corporate Events photography by BJN" },
  { src: "/events/SSUC9945.jpg", category: "Corporate Events", size: "tall", title: "GBBC State of Web3 Breakfast", alt: "Corporate Events photography by BJN" },
  { src: "/events/S_PG1393.jpg", category: "Corporate Events", size: "tall", title: "Saint Clements Bi-annual Gala", alt: "Corporate Events photography by BJN" },
  { src: "/events/S_PG1482.jpg", category: "Corporate Events", size: "tall", title: "Saint Clements Bi-annual Gala", alt: "Corporate Events photography by BJN" },
  { src: "/events/S_PG1525.jpg", category: "Corporate Events", size: "tall", title: "Saint Clements Bi-annual Gala", alt: "Corporate Events photography by BJN" },
  { src: "/events/S_PG1742.jpg", category: "Corporate Events", size: "tall", title: "Saint Clements Bi-annual Gala", alt: "Corporate Events photography by BJN" },
  { src: "/events/S_PG1889.jpg", category: "Corporate Events", size: "tall", title: "Saint Clements Bi-annual Gala", alt: "Corporate Events photography by BJN" },
  { src: "/events/S_PG2087.jpg", category: "Corporate Events", size: "tall", title: "Saint Clements Bi-annual Gala", alt: "Corporate Events photography by BJN" },
  { src: "/events/S_PG2103.jpg", category: "Corporate Events", size: "tall", title: "Saint Clements Bi-annual Gala", alt: "Corporate Events photography by BJN" },
  { src: "/events/S_PG2181.jpg", category: "Corporate Events", size: "tall", title: "Saint Clements Bi-annual Gala", alt: "Corporate Events photography by BJN", isCover: true },
];
