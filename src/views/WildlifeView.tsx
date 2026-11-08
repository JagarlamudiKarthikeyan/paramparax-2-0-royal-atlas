import React from 'react';
import { Trees, ShieldCheck, MapPin, Bookmark, Eye } from 'lucide-react';
import { HeritageItem } from '../types';
import { WILDLIFE_NATURE } from '../data/culturalData';

interface WildlifeViewProps {
  onSelectItem: (item: HeritageItem) => void;
  savedItemIds: string[];
  onToggleBookmark: (item: HeritageItem) => void;
}

export const WildlifeView: React.FC<WildlifeViewProps> = ({
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
              Chapter 09 · Sacred Wildlife & Nature
            </span>
            <span>·</span>
            <span className="font-serif italic text-[#C5A059] font-medium">वन्य जीवन</span>
            <span>·</span>
            <span>Sacred Ecology</span>
          </div>
          <h1 className="font-royal text-3xl sm:text-4xl font-bold text-[#6B1724]">
            Sacred Groves, Apex Predators & Mountain Screes
          </h1>
          <p className="font-editorial text-base sm:text-lg text-[#5C4D42] italic max-w-3xl">
            Where natural ecosystems are woven into sacred tribal taboos, from the ancient Mawphlang virgin forest to the elusive snow leopards of Ladakh.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#8C7A6B] bg-[#F3EBDD] px-3 py-1.5 rounded-xs border border-[#C5A059]/40 shrink-0">
          <Trees className="w-4 h-4 text-[#0F4C3A]" />
          <span>Ecological Sanctuaries</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {WILDLIFE_NATURE.map((sanctuary) => {
          const isSaved = savedItemIds.includes(sanctuary.id);

          return (
            <div
              key={sanctuary.id}
              className="group bg-[#FAF6EE] border border-[#C5A059]/40 hover:border-[#C5A059] rounded-xs shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div 
                onClick={() => onSelectItem(sanctuary)}
                className="relative h-60 overflow-hidden bg-[#EAE0CD] cursor-pointer"
              >
                <img
                  src={sanctuary.imageUrl}
                  alt={sanctuary.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono">
                  <span className="bg-[#FAF6EE]/90 backdrop-blur-xs text-[#0F4C3A] font-bold px-2 py-0.5 rounded-xs border border-[#C5A059]/40">
                    {sanctuary.region}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(sanctuary);
                    }}
                    className={`p-1.5 rounded-xs backdrop-blur-xs transition-colors cursor-pointer border ${
                      isSaved ? 'bg-[#6B1724] text-[#FAF6EE] border-[#C5A059]' : 'bg-[#FAF6EE]/90 text-[#5C4D42] border-[#C5A059]/40'
                    }`}
                    title={isSaved ? 'Saved' : 'Bookmark'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-[#C5A059]' : ''}`} />
                  </button>
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-[#FAF6EE]">
                  <span className="font-serif font-bold text-xs text-[#C5A059] block">
                    {sanctuary.vernacularTitle}
                  </span>
                  <span className="font-royal text-base font-bold text-white">
                    {sanctuary.title}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-[#735D4E] font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#0F4C3A]" />
                    <span>{sanctuary.location}, {sanctuary.state}</span>
                  </div>

                  <p className="font-editorial text-xs italic text-[#5C4D42]">
                    {sanctuary.subtitle}
                  </p>

                  <p className="text-xs text-[#382D26] line-clamp-3 leading-relaxed font-sans pt-1">
                    {sanctuary.curatorialNotes}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#C5A059]/20 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-[#0F4C3A]">
                    Conservation: {sanctuary.preservationStatus}
                  </span>

                  <button
                    onClick={() => onSelectItem(sanctuary)}
                    className="font-royal font-semibold text-xs text-[#6B1724] hover:text-[#58111C] flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Inspect Ecological Record</span>
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
