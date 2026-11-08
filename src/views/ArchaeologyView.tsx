import React from 'react';
import { Landmark, Sparkles, MapPin, Bookmark, Eye, ArrowRight } from 'lucide-react';
import { HeritageItem } from '../types';
import { ARCHAEOLOGY_HERITAGE } from '../data/culturalData';

interface ArchaeologyViewProps {
  onSelectItem: (item: HeritageItem) => void;
  savedItemIds: string[];
  onToggleBookmark: (item: HeritageItem) => void;
}

export const ArchaeologyView: React.FC<ArchaeologyViewProps> = ({
  onSelectItem,
  savedItemIds,
  onToggleBookmark
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#C5A059]/40 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8C7A6B]">
            <span className="text-[#6B1724] font-bold uppercase tracking-widest">
              Chapter 10 · Archaeology & Heritage
            </span>
            <span>·</span>
            <span className="font-serif italic text-[#C5A059] font-medium">वास्तु विद्या</span>
            <span>·</span>
            <span>Monolithic Engineering Marvels</span>
          </div>
          <h1 className="font-royal text-3xl sm:text-4xl font-bold text-[#6B1724]">
            Basalt Excavations, Inverted Stepwells & Musical Granite
          </h1>
          <p className="font-editorial text-base sm:text-lg text-[#5C4D42] italic max-w-3xl">
            Where mathematical precision, acoustic resonance, and spiritual metaphysics coalesced into monumental stone architecture.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#8C7A6B] bg-[#F3EBDD] px-3 py-1.5 rounded-xs border border-[#C5A059]/40 shrink-0">
          <Landmark className="w-4 h-4 text-[#6B1724]" />
          <span>{ARCHAEOLOGY_HERITAGE.length} Monumental Monuments</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ARCHAEOLOGY_HERITAGE.map((monument) => {
          const isSaved = savedItemIds.includes(monument.id);

          return (
            <div
              key={monument.id}
              className="group bg-[#FAF6EE] border border-[#C5A059]/40 hover:border-[#C5A059] rounded-xs shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div 
                onClick={() => onSelectItem(monument)}
                className="relative h-64 overflow-hidden bg-[#EAE0CD] cursor-pointer"
              >
                <img
                  src={monument.imageUrl}
                  alt={monument.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono">
                  <span className="bg-[#FAF6EE]/90 backdrop-blur-xs text-[#6B1724] font-bold px-2 py-0.5 rounded-xs border border-[#C5A059]/40">
                    {monument.region} India
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(monument);
                    }}
                    className={`p-1.5 rounded-xs backdrop-blur-xs transition-colors cursor-pointer border ${
                      isSaved ? 'bg-[#6B1724] text-[#FAF6EE] border-[#C5A059]' : 'bg-[#FAF6EE]/90 text-[#5C4D42] border-[#C5A059]/40'
                    }`}
                    title={isSaved ? 'Saved' : 'Bookmark'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-[#C5A059]' : ''}`} />
                  </button>
                </div>

                <div className="absolute bottom-2.5 left-2.5 text-[#FAF6EE]">
                  <span className="font-serif font-bold text-xs text-[#C5A059] block">
                    {monument.vernacularTitle}
                  </span>
                  <span className="font-royal text-lg font-bold text-white">
                    {monument.title}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#735D4E] font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#6B1724]" />
                    <span>{monument.location}, {monument.state}</span>
                  </div>

                  <p className="font-editorial text-sm italic text-[#5C4D42]">
                    {monument.subtitle}
                  </p>

                  <div className="p-3 bg-[#F3EBDD]/60 rounded-xs border border-[#C5A059]/30 text-xs text-[#382D26]">
                    <span className="font-semibold text-[#6B1724] block mb-1">Architectural Feat:</span>
                    <p className="line-clamp-3 leading-relaxed">
                      {monument.significance}
                    </p>
                  </div>

                  <p className="text-xs text-[#4A3B32] line-clamp-2 leading-relaxed font-editorial italic pt-1">
                    {monument.curatorialNotes}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#C5A059]/20 flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-[#8C7A6B]">
                    {monument.accessionNumber} · {monument.preservationStatus}
                  </span>

                  <button
                    onClick={() => onSelectItem(monument)}
                    className="font-royal font-semibold text-xs text-[#6B1724] hover:text-[#58111C] flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Inspect Archaeological Folio</span>
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
