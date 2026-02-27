import { useState, useEffect, useCallback } from 'react';
import { X, Download, Eye, ChevronDown } from 'lucide-react';
import {
  IMAGE_MANIFEST,
  GALLERY_CATEGORIES,
  type GalleryCategory,
  type BentoSize,
  type GalleryImage,
} from './data/galleryImages';

// --- Types ---

interface TagData {
  category: GalleryCategory | '';
  size: BentoSize;
  title: string;
  alt: string;
  objectPosition: string;
  isCover: boolean;
}

type TagMap = Record<string, TagData>;

type FilterOption = 'All' | GalleryCategory | 'Untagged';

// --- Constants ---

const STORAGE_KEY = 'bjn-tagger-data';

const BENTO_SIZES: BentoSize[] = ['hero', 'feature', 'wide', 'tall', 'standard'];

const CATEGORY_COLORS: Record<GalleryCategory, string> = {
  'Portraits': '#3b82f6',
  'Corporate Events': '#f59e0b',
  'Creative/Editorial': '#ec4899',
  'Non-Profit Events': '#8b5cf6',
  'Social Events': '#f97316',
  'Community': '#10b981',
};

const DEFAULT_TAG: TagData = {
  category: '',
  size: 'standard',
  title: '',
  alt: '',
  objectPosition: 'center',
  isCover: false,
};

// --- Helpers ---

function loadFromStorage(): TagMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return {};
}

function saveToStorage(data: TagMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function filenameFromPath(src: string): string {
  return src.split('/').pop()?.replace('.jpg', '').replace('.png', '') ?? src;
}

function folderFromPath(src: string): string {
  const parts = src.split('/');
  return parts.length >= 2 ? parts[parts.length - 2] : '';
}

// --- Components ---

function CategoryBadge({ category }: { category: GalleryCategory | '' }) {
  if (!category) return <span className="text-[10px] font-mono text-white/30 uppercase">untagged</span>;
  return (
    <span
      className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded"
      style={{ backgroundColor: CATEGORY_COLORS[category] + '30', color: CATEGORY_COLORS[category] }}
    >
      {category}
    </span>
  );
}

function SizeBadge({ size }: { size: BentoSize }) {
  const sizeLabel: Record<BentoSize, string> = {
    hero: 'H',
    feature: 'F',
    wide: 'W',
    tall: 'T',
    standard: 'S',
  };
  return (
    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/10 text-white/60">
      {sizeLabel[size]}
    </span>
  );
}

function ImagePreviewModal({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white p-2" aria-label="Close preview">
        <X size={24} />
      </button>
      <img
        src={src}
        alt="Preview"
        className="max-w-[90vw] max-h-[90vh] object-contain"
        onClick={e => e.stopPropagation()}
      />
    </div>
  );
}

function ImageCard({
  src,
  tag,
  onUpdate,
  onPreview,
}: {
  src: string;
  tag: TagData;
  onUpdate: (updates: Partial<TagData>) => void;
  onPreview: () => void;
}) {
  const borderColor = tag.category ? CATEGORY_COLORS[tag.category] : 'rgba(255,255,255,0.1)';

  return (
    <div
      className="bg-white/[0.03] rounded overflow-hidden group"
      style={{ borderLeft: `3px solid ${borderColor}` }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] bg-white/5 overflow-hidden cursor-pointer" onClick={onPreview}>
        <img
          src={src}
          alt={tag.alt || filenameFromPath(src)}
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ objectPosition: tag.objectPosition || 'center' }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          <Eye size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        {/* Badges */}
        <div className="absolute top-1.5 left-1.5 flex gap-1">
          <CategoryBadge category={tag.category} />
          <SizeBadge size={tag.size} />
          {tag.isCover && (
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-yellow-500/30 text-yellow-400">&#9733;</span>
          )}
        </div>
        <div className="absolute bottom-1.5 right-1.5">
          <span className="text-[9px] font-mono text-white/40 bg-black/50 px-1 rounded">
            {folderFromPath(src)}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="p-2 space-y-1.5">
        <div className="font-mono text-[10px] text-white/40 truncate" title={src}>
          {filenameFromPath(src)}
        </div>

        {/* Category Select */}
        <div className="relative">
          <select
            value={tag.category}
            onChange={e => onUpdate({ category: e.target.value as GalleryCategory | '' })}
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs font-mono text-white appearance-none cursor-pointer focus:border-white/30 focus:outline-none"
          >
            <option value="" className="bg-[#111]">-- Category --</option>
            {GALLERY_CATEGORIES.map(cat => (
              <option key={cat} value={cat} className="bg-[#111]">{cat}</option>
            ))}
          </select>
          <ChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
        </div>

        {/* Size Select */}
        <div className="relative">
          <select
            value={tag.size}
            onChange={e => onUpdate({ size: e.target.value as BentoSize })}
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs font-mono text-white appearance-none cursor-pointer focus:border-white/30 focus:outline-none"
          >
            {BENTO_SIZES.map(s => (
              <option key={s} value={s} className="bg-[#111]">{s}</option>
            ))}
          </select>
          <ChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
        </div>

        {/* Title */}
        <input
          type="text"
          placeholder="Title..."
          value={tag.title}
          onChange={e => onUpdate({ title: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs font-mono text-white placeholder:text-white/20 focus:border-white/30 focus:outline-none"
        />

        {/* Alt Text */}
        <input
          type="text"
          placeholder="Alt text..."
          value={tag.alt}
          onChange={e => onUpdate({ alt: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs font-mono text-white placeholder:text-white/20 focus:border-white/30 focus:outline-none"
        />

        {/* Cover Toggle */}
        <button
          onClick={() => onUpdate({ isCover: !tag.isCover })}
          className={`w-full rounded px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider cursor-pointer transition-colors ${
            tag.isCover
              ? 'bg-yellow-500/20 border border-yellow-500/40 text-yellow-400'
              : 'bg-white/5 border border-white/10 text-white/30 hover:text-white/50 hover:border-white/20'
          }`}
        >
          {tag.isCover ? '★ Cover Photo' : '☆ Set as Cover'}
        </button>
      </div>
    </div>
  );
}

// --- Main Tagger ---

export default function Tagger() {
  const [tags, setTags] = useState<TagMap>(loadFromStorage);
  const [filter, setFilter] = useState<FilterOption>('All');
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  // Persist to localStorage on every change
  useEffect(() => {
    saveToStorage(tags);
  }, [tags]);

  const getTag = useCallback((src: string): TagData => {
    return tags[src] ?? { ...DEFAULT_TAG };
  }, [tags]);

  const updateTag = useCallback((src: string, updates: Partial<TagData>) => {
    setTags(prev => ({
      ...prev,
      [src]: { ...(prev[src] ?? { ...DEFAULT_TAG }), ...updates },
    }));
  }, []);

  // Stats
  const taggedCount = IMAGE_MANIFEST.filter(src => tags[src]?.category).length;
  const totalCount = IMAGE_MANIFEST.length;

  // Filtering
  const filtered = IMAGE_MANIFEST.filter(src => {
    if (filter === 'All') return true;
    if (filter === 'Untagged') return !tags[src]?.category;
    return tags[src]?.category === filter;
  });

  // Export
  const handleExport = () => {
    const data: GalleryImage[] = IMAGE_MANIFEST
      .filter(src => tags[src]?.category)
      .map(src => {
        const t = tags[src]!;
        return {
          src,
          category: t.category as GalleryCategory,
          size: t.size,
          title: t.title || filenameFromPath(src),
          alt: t.alt || `${t.category} photography by BJN`,
          ...(t.objectPosition !== 'center' ? { objectPosition: t.objectPosition } : {}),
          ...(t.isCover ? { isCover: true } : {}),
        };
      });

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'galleryImages.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Quick-tag: assign category to all images from a folder
  const quickTagFolder = (folder: string, category: GalleryCategory) => {
    setTags(prev => {
      const next = { ...prev };
      IMAGE_MANIFEST.filter(src => folderFromPath(src) === folder).forEach(src => {
        next[src] = { ...(next[src] ?? { ...DEFAULT_TAG }), category };
      });
      return next;
    });
  };

  // Copy as TS
  const handleCopyTS = () => {
    const data: GalleryImage[] = IMAGE_MANIFEST
      .filter(src => tags[src]?.category)
      .map(src => {
        const t = tags[src]!;
        return {
          src,
          category: t.category as GalleryCategory,
          size: t.size,
          title: t.title || filenameFromPath(src),
          alt: t.alt || `${t.category} photography by BJN`,
          ...(t.objectPosition !== 'center' ? { objectPosition: t.objectPosition } : {}),
          ...(t.isCover ? { isCover: true } : {}),
        };
      });

    const ts = `import type { GalleryImage } from './galleryImages';\n\nexport const galleryImages: GalleryImage[] = ${JSON.stringify(data, null, 2)};\n`;
    navigator.clipboard.writeText(ts);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/10 px-4 py-3">
        <div className="max-w-[1800px] mx-auto">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs bg-white/10 px-2 py-1 rounded">BJN TAGGER</span>
              <a href="#" onClick={e => { e.preventDefault(); window.location.hash = ''; window.location.reload(); }}
                className="font-mono text-[10px] text-white/40 hover:text-white/70 no-underline">
                &larr; Back to site
              </a>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyTS}
                className="font-mono text-[10px] px-3 py-1.5 border border-white/20 rounded hover:bg-white/10 transition-colors cursor-pointer"
              >
                COPY TS
              </button>
              <button
                onClick={handleExport}
                className="font-mono text-[10px] px-3 py-1.5 bg-white text-black rounded hover:bg-white/90 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Download size={12} />
                EXPORT JSON ({taggedCount})
              </button>
            </div>
          </div>

          {/* Filter Pills + Quick-Tag */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {(['All', 'Untagged', ...GALLERY_CATEGORIES] as FilterOption[]).map(opt => {
                const count = opt === 'All'
                  ? totalCount
                  : opt === 'Untagged'
                    ? totalCount - taggedCount
                    : IMAGE_MANIFEST.filter(src => tags[src]?.category === opt).length;

                const isActive = filter === opt;
                const color = opt !== 'All' && opt !== 'Untagged'
                  ? CATEGORY_COLORS[opt as GalleryCategory]
                  : undefined;

                return (
                  <button
                    key={opt}
                    onClick={() => setFilter(opt)}
                    className={`font-mono text-[10px] px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                      isActive
                        ? 'text-black border-transparent'
                        : 'text-white/60 border-white/15 hover:border-white/30'
                    }`}
                    style={isActive ? {
                      backgroundColor: color || '#fff',
                      color: '#000',
                      borderColor: 'transparent'
                    } : undefined}
                  >
                    {opt} ({count})
                  </button>
                );
              })}
            </div>

            {/* Quick-tag buttons */}
            <div className="hidden md:flex items-center gap-1.5">
              <span className="font-mono text-[9px] text-white/30 mr-1">QUICK:</span>
              {[
                { folder: 'portraits', cat: 'Portraits' as GalleryCategory },
                { folder: 'creative', cat: 'Creative/Editorial' as GalleryCategory },
              ].map(({ folder, cat }) => (
                <button
                  key={folder}
                  onClick={() => quickTagFolder(folder, cat)}
                  className="font-mono text-[9px] px-2 py-1 border border-white/10 rounded hover:bg-white/10 transition-colors cursor-pointer"
                >
                  /{folder} &rarr; {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-2.5 flex items-center gap-3">
            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${(taggedCount / totalCount) * 100}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-white/40 whitespace-nowrap">
              {taggedCount}/{totalCount} tagged
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1800px] mx-auto px-4 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filtered.map(src => (
            <ImageCard
              key={src}
              src={src}
              tag={getTag(src)}
              onUpdate={updates => updateTag(src, updates)}
              onPreview={() => setPreviewSrc(src)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 font-mono text-sm text-white/30">
            No images match this filter.
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewSrc && (
        <ImagePreviewModal src={previewSrc} onClose={() => setPreviewSrc(null)} />
      )}
    </div>
  );
}
