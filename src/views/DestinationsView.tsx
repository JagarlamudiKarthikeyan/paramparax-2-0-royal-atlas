import React, { useState } from 'react';
import { 
  MapPin, 
  Compass, 
  Calendar, 
  Bookmark, 
  ArrowRight, 
  Eye, 
  Navigation,
  Globe2,
  Sparkles
} from 'lucide-react';
import { HeritageItem } from '../types';
import { OVERLOOKED_DESTINATIONS, REGIONS } from '../data/culturalData';

interface DestinationsViewProps {
  onSelectItem: (item: HeritageItem) => void;
  savedItemIds: string[];
  onToggleBookmark: (item: HeritageItem) => void;
}

export const DestinationsView: React.FC<DestinationsViewProps> = ({
  onSelectItem,
  savedItemIds,
  onToggleBookmark
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = OVERLOOKED_DESTINATIONS.filter((d) => {
    const matchesReg = selectedRegion === 'all' || d.region === selectedRegion;
    const matchesSearch = !searchQuery || 
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesReg && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Editorial Header */}
      <div className="border-b border-[#C5A059]/40 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8C7A6B]">
            <span className="text-[#6B1724] font-bold uppercase tracking-widest">
              Chapter 04 · Overlooked Destinations
            </span>
            <span>·</span>
            <span className="font-serif italic text-[#C5A059] font-medium">अज्ञात तीर्थ</span>
            <span>·</span>
            <span>Sublime Solitude</span>
          </div>
          <h1 className="font-royal text-3xl sm:text-4xl font-bold text-[#6B1724]">
            Overlooked Sacred Sanctuaries & Citadels
          </h1>
          <p className="font-editorial text-base sm:text-lg text-[#5C4D42] italic max-w-3xl">
            Venture beyond the crowded tourist circuits into hidden riverfront cenotaphs, canyon forts, subtropical rock reliefs, and painted havelis.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#8C7A6B] bg-[#F3EBDD] px-3 py-1.5 rounded-xs border border-[#C5A059]/40 shrink-0">
          <Globe2 className="w-4 h-4 text-[#6B1724]" />
          <span>{OVERLOOKED_DESTINATIONS.length} Curated Expeditions</span>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-[#FAF6EE] p-4 border border-[#C5A059]/40 rounded-xs shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto custom-atlas-scrollbar pb-1 md:pb-0">
            <span className="text-xs font-semibold text-[#6B1724] uppercase tracking-wider mr-1 hidden sm:inline">
              Territory:
            </span>
            {REGIONS.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-3 py-1 text-xs rounded-xs whitespace-nowrap transition-colors cursor-pointer border ${
                  selectedRegion === reg.id
                    ? 'bg-[#6B1724] text-[#FAF6EE] border-[#C5A059] font-medium'
                    : 'bg-[#F3EBDD]/60 hover:bg-[#F3EBDD] text-[#5C4D42] border-[#C5A059]/30'
                }`}
              >
                {reg.label.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="w-full md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destination, river, state..."
              className="w-full text-xs bg-[#FAF6EE] border border-[#C5A059]/40 rounded-xs px-3 py-1.5 placeholder-[#9C8B7D] focus:outline-hidden focus:border-[#6B1724]"
            />
          </div>

        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((dest) => {
          const isSaved = savedItemIds.includes(dest.id);

          return (
            <div
              key={dest.id}
              className="group bg-[#FAF6EE] border border-[#C5A059]/40 hover:border-[#C5A059] rounded-xs shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div 
                onClick={() => onSelectItem(dest)}
                className="relative h-56 overflow-hidden bg-[#EAE0CD] cursor-pointer"
              >
                <img
                  src={dest.imageUrl}
                  alt={dest.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Top overlay indicators */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono">
                  <span className="bg-[#FAF6EE]/90 backdrop-blur-xs text-[#6B1724] font-bold px-2 py-0.5 rounded-xs border border-[#C5A059]/40">
                    {dest.region}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(dest);
                    }}
                    className={`p-1.5 rounded-xs backdrop-blur-xs transition-colors cursor-pointer border ${
                      isSaved 
                        ? 'bg-[#6B1724] text-[#FAF6EE] border-[#C5A059]' 
                        : 'bg-[#FAF6EE]/90 hover:bg-[#FAF6EE] text-[#5C4D42] border-[#C5A059]/40'
                    }`}
                    title={isSaved ? 'Saved in personal journal' : 'Bookmark destination'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-[#C5A059]' : ''}`} />
                  </button>
                </div>

                {dest.imageCredit && dest.imageCreditUrl && (
                  <a
                    href={dest.imageCreditUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="absolute bottom-11 right-2.5 max-w-[72%] truncate text-[9px] text-white bg-black/70 px-1.5 py-1 rounded-xs hover:underline"
                  >
                    {dest.imageCredit}
                  </a>
                )}

                {/* Coordinates & Atlas reference */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-[#FAF6EE] flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#C5A059] block">
                      Atlas entry
                    </span>
                    <span className="font-serif font-bold text-xs text-white">
                      {dest.vernacularTitle}
                    </span>
                  </div>
                  {dest.coordinates && (
                    <span className="text-[10px] font-mono text-[#D6CEBE] bg-black/50 px-1.5 py-0.5 rounded-xs">
                      {dest.coordinates}
                    </span>
                  )}
                </div>
              </div>

              {/* Destination Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-[#735D4E] font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#6B1724]" />
                    <span>{dest.location}, {dest.state}</span>
                  </div>

                  <h3 
                    onClick={() => onSelectItem(dest)}
                    className="font-royal text-lg font-bold text-[#6B1724] group-hover:text-[#58111C] cursor-pointer"
                  >
                    {dest.title}
                  </h3>

                  <p className="text-xs text-[#5C4D42] font-editorial italic">
                    {dest.eraOrEpoch}
                  </p>

                  <p className="text-xs text-[#382D26] line-clamp-3 leading-relaxed font-sans pt-1">
                    {dest.significance}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#C5A059]/20 flex items-center justify-between text-xs">
                  {dest.preservationStatus && (
                    <span className="text-[11px] text-[#8C7A6B] font-mono">
                      {dest.preservationStatus}
                    </span>
                  )}

                  <button
                    onClick={() => onSelectItem(dest)}
                    className="font-royal font-semibold text-xs text-[#6B1724] hover:text-[#58111C] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Field Notes</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
