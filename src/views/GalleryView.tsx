import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  MapPin, 
  Sparkles, 
  Filter, 
  Eye, 
  Bookmark, 
  ZoomIn,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { HeritageItem, IndianRegion } from '../types';
import { 
  OVERLOOKED_DESTINATIONS, 
  ARCHAEOLOGY_HERITAGE, 
  FESTIVALS_CUSTOMS, 
  REGIONS, 
  HERO_IMAGE, 
  TEXTILE_IMAGE, 
  KAILASA_IMAGE, 
  THANJAVUR_IMAGE 
} from '../data/culturalData';

interface GalleryViewProps {
  onSelectItem: (item: HeritageItem) => void;
  savedItemIds: string[];
  onToggleBookmark: (item: HeritageItem) => void;
}

// Compile Gallery Folios from Destinations, Archaeology, and Living Traditions
const ALL_GALLERY_FOLIOS: HeritageItem[] = [
  ...ARCHAEOLOGY_HERITAGE,
  ...OVERLOOKED_DESTINATIONS,
  ...FESTIVALS_CUSTOMS
];

export const GalleryView: React.FC<GalleryViewProps> = ({
  onSelectItem,
  savedItemIds,
  onToggleBookmark
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedMedium, setSelectedMedium] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const mediums = [
    { id: 'all', label: 'All Mediums' },
    { id: 'Architecture', label: 'Rock-Cut & Stone' },
    { id: 'Murals', label: 'Frescoes & Pigments' },
    { id: 'Woodcraft', label: 'Teak & Bamboo' },
    { id: 'Sacred Fire', label: 'Ritual Living Light' }
  ];

  const filteredFolios = ALL_GALLERY_FOLIOS.filter((item) => {
    const matchesRegion = selectedRegion === 'all' || item.region === selectedRegion;
    const matchesMedium = selectedMedium === 'all' || item.tags.some(t => t.toLowerCase().includes(selectedMedium.toLowerCase()));
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.eraOrEpoch.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesMedium && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Editorial Header */}
      <div className="border-b border-[#C5A059]/40 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8C7A6B]">
            <span className="text-[#6B1724] font-bold uppercase tracking-widest">
              Chapter 02 · Visual Folio
            </span>
            <span>·</span>
            <span className="font-serif italic text-[#C5A059] font-medium">चित्रावली</span>
            <span>·</span>
            <span>Museum Archive</span>
          </div>
          <h1 className="font-royal text-3xl sm:text-4xl font-bold text-[#6B1724]">
            Visual Folio of Living Indian Traditions
          </h1>
          <p className="font-editorial text-base sm:text-lg text-[#5C4D42] italic max-w-3xl">
            A photographic and architectural compendium of monolithic basalt temples, subterranean stepwells, palm-leaf scriptures, and sacred riverfront ceremonies.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-mono text-[#8C7A6B] bg-[#F3EBDD] px-3 py-1.5 rounded-xs border border-[#C5A059]/40">
            {filteredFolios.length} Living Exhibits
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FAF6EE] p-4 border border-[#C5A059]/40 rounded-xs shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto custom-atlas-scrollbar pb-1 md:pb-0">
            <span className="text-xs font-semibold text-[#6B1724] uppercase tracking-wider mr-1 hidden sm:inline">
              Region:
            </span>
            {REGIONS.slice(0, 5).map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-2.5 py-1 text-xs rounded-xs whitespace-nowrap transition-colors cursor-pointer border ${
                  selectedRegion === reg.id
                    ? 'bg-[#6B1724] text-[#FAF6EE] border-[#C5A059] font-medium'
                    : 'bg-[#F3EBDD]/60 hover:bg-[#F3EBDD] text-[#5C4D42] border-[#C5A059]/30'
                }`}
              >
                {reg.label.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Medium Filter & Search */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={selectedMedium}
              onChange={(e) => setSelectedMedium(e.target.value)}
              className="text-xs bg-[#FAF6EE] border border-[#C5A059]/40 rounded-xs px-2.5 py-1.5 text-[#1C1814] focus:outline-hidden focus:border-[#6B1724] cursor-pointer"
            >
              {mediums.map(m => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plate or location..."
              className="text-xs bg-[#FAF6EE] border border-[#C5A059]/40 rounded-xs px-3 py-1.5 placeholder-[#9C8B7D] focus:outline-hidden focus:border-[#6B1724] flex-1 md:w-48"
            />
          </div>

        </div>
      </div>

      {/* Gallery Grid */}
      {filteredFolios.length === 0 ? (
        <div className="py-16 text-center space-y-3 bg-[#FAF6EE] border border-[#C5A059]/30 rounded-xs">
          <p className="font-royal text-base text-[#6B1724]">No Folios Match Your Criteria</p>
          <p className="text-xs text-[#735D4E]">
            Reset your filters to explore the complete catalog of dynastic temples and monuments.
          </p>
          <button
            onClick={() => {
              setSelectedRegion('all');
              setSelectedMedium('all');
              setSearchQuery('');
            }}
            className="px-3 py-1.5 bg-[#6B1724] text-[#FAF6EE] text-xs font-medium rounded-xs cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFolios.map((item) => {
            const isBookmarked = savedItemIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="group bg-[#FAF6EE] border border-[#C5A059]/40 hover:border-[#C5A059] rounded-xs shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Visual Canvas Frame */}
                <div 
                  onClick={() => onSelectItem(item)}
                  className="relative aspect-4/3 overflow-hidden bg-[#EAE0CD] cursor-pointer"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Top Bar on Image */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono">
                    <span className="bg-[#FAF6EE]/90 backdrop-blur-xs text-[#6B1724] font-bold px-2 py-0.5 rounded-xs border border-[#C5A059]/40">
                      {item.region}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(item);
                      }}
                      className={`p-1.5 rounded-xs backdrop-blur-xs transition-colors cursor-pointer border ${
                        isBookmarked 
                          ? 'bg-[#6B1724] text-[#FAF6EE] border-[#C5A059]' 
                          : 'bg-[#FAF6EE]/90 hover:bg-[#FAF6EE] text-[#5C4D42] border-[#C5A059]/40'
                      }`}
                      title={isBookmarked ? 'Saved to personal collection' : 'Save folio'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current text-[#C5A059]' : ''}`} />
                    </button>
                  </div>

                  {/* Bottom Accession Label on Image */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-[#FAF6EE]">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] block">
                      {item.accessionNumber}
                    </span>
                    <h3 className="font-royal text-sm font-bold text-white drop-shadow-xs line-clamp-1">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Card Editorial Deck */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-[#735D4E]">
                      <span className="flex items-center gap-1 font-medium">
                        <MapPin className="w-3 h-3 text-[#6B1724]" />
                        {item.location}, {item.state}
                      </span>
                      {item.vernacularTitle && (
                        <span className="font-serif text-[#C5A059] font-bold text-xs">
                          {item.vernacularTitle}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#5C4D42] font-editorial italic">
                      {item.eraOrEpoch}
                    </p>

                    <p className="text-xs text-[#382D26] line-clamp-2 leading-relaxed">
                      {item.significance}
                    </p>
                  </div>

                  {/* Card Bottom Strip */}
                  <div className="pt-2 border-t border-[#C5A059]/20 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#8C7A6B]">
                      Status: {item.preservationStatus}
                    </span>

                    <button
                      onClick={() => onSelectItem(item)}
                      className="text-xs font-royal font-semibold text-[#6B1724] hover:text-[#58111C] flex items-center gap-1 cursor-pointer"
                    >
                      <ZoomIn className="w-3 h-3 text-[#C5A059]" />
                      <span>Inspect Folio</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
