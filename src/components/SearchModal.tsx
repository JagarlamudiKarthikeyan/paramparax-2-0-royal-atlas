import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, ShoppingBag, Music, Landmark, Sparkles, BookOpen, Scroll, ArrowRight } from 'lucide-react';
import { 
  OVERLOOKED_DESTINATIONS, 
  ARTISAN_PRODUCTS, 
  PERFORMING_ARTS, 
  ARCHAEOLOGY_HERITAGE, 
  FESTIVALS_CUSTOMS, 
  LANGUAGES_DATA, 
  FOLKLORE_DATA, 
  AYURVEDA_HERBS,
  CHAPTERS
} from '../data/culturalData';
import { HeritageItem, ArtisanProduct, ChapterId } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: HeritageItem | ArtisanProduct) => void;
  onSelectChapter: (id: ChapterId) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectItem,
  onSelectChapter
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search through all categories
  const matchedDestinations = q ? OVERLOOKED_DESTINATIONS.filter(d => 
    d.title.toLowerCase().includes(q) || 
    d.location.toLowerCase().includes(q) || 
    d.state.toLowerCase().includes(q) ||
    d.region.toLowerCase().includes(q) ||
    d.significance.toLowerCase().includes(q)
  ) : [];

  const matchedProducts = q ? ARTISAN_PRODUCTS.filter(p => 
    p.title.toLowerCase().includes(q) || 
    p.craftTechnique.toLowerCase().includes(q) || 
    p.artisanName.toLowerCase().includes(q) ||
    p.giTagLocation.toLowerCase().includes(q)
  ) : [];

  const matchedArts = q ? PERFORMING_ARTS.filter(a => 
    a.title.toLowerCase().includes(q) || 
    a.keyFeature.toLowerCase().includes(q) ||
    a.traditionType.toLowerCase().includes(q)
  ) : [];

  const matchedArchaeology = q ? ARCHAEOLOGY_HERITAGE.filter(ar => 
    ar.title.toLowerCase().includes(q) || 
    ar.significance.toLowerCase().includes(q)
  ) : [];

  const matchedFestivals = q ? FESTIVALS_CUSTOMS.filter(f => 
    f.title.toLowerCase().includes(q) || 
    f.significance.toLowerCase().includes(q)
  ) : [];

  const matchedLanguages = q ? LANGUAGES_DATA.filter(l => 
    l.name.toLowerCase().includes(q) || 
    l.historicalNote.toLowerCase().includes(q)
  ) : [];

  const matchedFolklore = q ? FOLKLORE_DATA.filter(fl => 
    fl.title.toLowerCase().includes(q) || 
    fl.moralOrMetaphor.toLowerCase().includes(q)
  ) : [];

  const matchedHerbs = q ? AYURVEDA_HERBS.filter(h => 
    h.sanskritName.toLowerCase().includes(q) || 
    h.englishName.toLowerCase().includes(q) ||
    h.doshaAffinity.toLowerCase().includes(q)
  ) : [];

  const totalResults = 
    matchedDestinations.length + 
    matchedProducts.length + 
    matchedArts.length + 
    matchedArchaeology.length + 
    matchedFestivals.length + 
    matchedLanguages.length + 
    matchedFolklore.length + 
    matchedHerbs.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:pt-20 animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-[#FAF6EE] text-[#1C1814] rounded-sm border-2 border-[#C5A059] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 bg-[#F3EBDD] border-b border-[#C5A059]/40 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#6B1724] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search royal destinations, crafts, classical dance, Sanskrit, Ayurveda, folklore..."
            className="flex-1 bg-transparent text-sm sm:text-base placeholder-[#8C7A6B] focus:outline-hidden font-sans text-[#1C1814]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#8C7A6B] hover:text-[#6B1724] px-1 cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-[#735D4E] hover:text-[#6B1724] hover:bg-[#EAE0CD] cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results / Suggestion Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {!query ? (
            /* Suggested Quick Atlas Jumps */
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase text-[#8C7A6B] tracking-wider block">
                Expedition Folios Quick Jump
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CHAPTERS.slice(0, 9).map((chap) => (
                  <button
                    key={chap.id}
                    onClick={() => {
                      onSelectChapter(chap.id);
                      onClose();
                    }}
                    className="p-2.5 bg-[#F3EBDD]/70 hover:bg-[#F3EBDD] border border-[#C5A059]/30 rounded-xs text-left cursor-pointer transition-colors"
                  >
                    <span className="font-royal text-xs font-bold text-[#6B1724] block truncate">
                      {chap.title}
                    </span>
                    <span className="text-[10px] text-[#735D4E] truncate block">
                      {chap.sanskritSubtitle}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <span className="text-xs font-mono uppercase text-[#8C7A6B] tracking-wider block mb-2">
                  Popular Cultural Inquiries
                </span>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {['Kailasa Temple', 'Ajrakh Block Print', 'Kathakali Mudras', 'Bidriware Silver', 'Unakoti', 'Vedic Sanskrit', 'Ashwagandha'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-2.5 py-1 rounded-xs bg-[#FAF6EE] border border-[#C5A059]/40 text-[#6B1724] hover:bg-[#F3EBDD] cursor-pointer text-xs"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : totalResults === 0 ? (
            /* No Results */
            <div className="py-12 text-center space-y-2">
              <p className="font-royal text-base text-[#6B1724]">No Inscriptions Found</p>
              <p className="text-xs text-[#735D4E]">
                No cultural records matched "{query}". Try searching for regional names like "Kerala", "Kutch", "Hampi", or craft types like "Silk", "Bronze".
              </p>
            </div>
          ) : (
            /* Grouped Results */
            <div className="space-y-6">
              
              {/* Destinations */}
              {matchedDestinations.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-royal font-bold text-[#6B1724] uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Overlooked Royal Destinations ({matchedDestinations.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedDestinations.map((d) => (
                      <div
                        key={d.id}
                        onClick={() => {
                          onSelectItem(d);
                          onClose();
                        }}
                        className="p-2.5 rounded-xs bg-[#F3EBDD]/60 hover:bg-[#F3EBDD] border border-[#C5A059]/30 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="font-royal text-xs font-bold text-[#6B1724]">{d.title}</div>
                          <div className="text-[11px] text-[#735D4E]">{d.location}, {d.state} · {d.eraOrEpoch}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Artisan Store Products */}
              {matchedProducts.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-royal font-bold text-[#6B1724] uppercase tracking-wider">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Artisan Crafts & Heirlooms ({matchedProducts.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectItem(p);
                          onClose();
                        }}
                        className="p-2.5 rounded-xs bg-[#F3EBDD]/60 hover:bg-[#F3EBDD] border border-[#C5A059]/30 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="font-royal text-xs font-bold text-[#6B1724]">{p.title}</div>
                          <div className="text-[11px] text-[#735D4E]">{p.craftTechnique} · {p.artisanName}</div>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#6B1724]">₹{p.priceInr.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Performing Arts */}
              {matchedArts.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-royal font-bold text-[#6B1724] uppercase tracking-wider">
                    <Music className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Performing Arts Traditions ({matchedArts.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedArts.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => {
                          onSelectItem(a);
                          onClose();
                        }}
                        className="p-2.5 rounded-xs bg-[#F3EBDD]/60 hover:bg-[#F3EBDD] border border-[#C5A059]/30 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="font-royal text-xs font-bold text-[#6B1724]">{a.title}</div>
                          <div className="text-[11px] text-[#735D4E]">{a.traditionType} · {a.keyFeature}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Archaeology */}
              {matchedArchaeology.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-royal font-bold text-[#6B1724] uppercase tracking-wider">
                    <Landmark className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Archaeological Feats ({matchedArchaeology.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedArchaeology.map((ar) => (
                      <div
                        key={ar.id}
                        onClick={() => {
                          onSelectItem(ar);
                          onClose();
                        }}
                        className="p-2.5 rounded-xs bg-[#F3EBDD]/60 hover:bg-[#F3EBDD] border border-[#C5A059]/30 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="font-royal text-xs font-bold text-[#6B1724]">{ar.title}</div>
                          <div className="text-[11px] text-[#735D4E]">{ar.location}, {ar.state}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {matchedLanguages.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-royal font-bold text-[#6B1724] uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Classical Languages ({matchedLanguages.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedLanguages.map((l) => (
                      <div
                        key={l.id}
                        onClick={() => {
                          onSelectChapter('languages');
                          onClose();
                        }}
                        className="p-2.5 rounded-xs bg-[#F3EBDD]/60 hover:bg-[#F3EBDD] border border-[#C5A059]/30 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="font-royal text-xs font-bold text-[#6B1724]">{l.name} ({l.vernacularScript})</div>
                          <div className="text-[11px] text-[#735D4E]">{l.family} · {l.scriptName}</div>
                        </div>
                        <span className="text-xs text-[#6B1724] font-medium">Jump to View →</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Folklore */}
              {matchedFolklore.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-royal font-bold text-[#6B1724] uppercase tracking-wider">
                    <Scroll className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Folklore & Allegories ({matchedFolklore.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedFolklore.map((fl) => (
                      <div
                        key={fl.id}
                        onClick={() => {
                          onSelectChapter('folklore');
                          onClose();
                        }}
                        className="p-2.5 rounded-xs bg-[#F3EBDD]/60 hover:bg-[#F3EBDD] border border-[#C5A059]/30 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="font-royal text-xs font-bold text-[#6B1724]">{fl.title}</div>
                          <div className="text-[11px] text-[#735D4E]">{fl.tradition} · {fl.theme}</div>
                        </div>
                        <span className="text-xs text-[#6B1724] font-medium">Jump to View →</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ayurveda Herbs */}
              {matchedHerbs.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-royal font-bold text-[#6B1724] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Ayurveda Herbs ({matchedHerbs.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedHerbs.map((h) => (
                      <div
                        key={h.id}
                        onClick={() => {
                          onSelectChapter('ayurveda');
                          onClose();
                        }}
                        className="p-2.5 rounded-xs bg-[#F3EBDD]/60 hover:bg-[#F3EBDD] border border-[#C5A059]/30 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="font-royal text-xs font-bold text-[#6B1724]">{h.sanskritName} — {h.englishName}</div>
                          <div className="text-[11px] text-[#735D4E]">Dosha Affinity: {h.doshaAffinity} · {h.rasaTaste}</div>
                        </div>
                        <span className="text-xs text-[#6B1724] font-medium">Jump to View →</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 bg-[#F3EBDD] border-t border-[#C5A059]/30 flex items-center justify-between text-[11px] text-[#735D4E]">
          <span>Tip: Press ESC to exit or click any record to open full folio.</span>
          <span className="font-mono">{totalResults} matches found</span>
        </div>
      </div>
    </div>
  );
};
