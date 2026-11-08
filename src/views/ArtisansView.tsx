import React from 'react';
import { Hammer, Award, MapPin, Quote, ArrowRight, ShoppingBag } from 'lucide-react';
import { ARTISAN_PROFILES } from '../data/culturalData';
import { ChapterId } from '../types';

interface ArtisansViewProps {
  onSelectChapter: (id: ChapterId) => void;
}

export const ArtisansView: React.FC<ArtisansViewProps> = ({ onSelectChapter }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#C5A059]/40 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8C7A6B]">
            <span className="text-[#6B1724] font-bold uppercase tracking-widest">
              Chapter 12 · Makers & Keepers
            </span>
            <span>·</span>
            <span className="font-serif italic text-[#C5A059] font-medium">हस्तशिल्पकार</span>
            <span>·</span>
            <span>Living Lineages</span>
          </div>
          <h1 className="font-royal text-3xl sm:text-4xl font-bold text-[#6B1724]">
            Master Craftsmen, Padma Awardees & Atelier Keepers
          </h1>
          <p className="font-editorial text-base sm:text-lg text-[#5C4D42] italic max-w-3xl">
            Meet the living legends whose families have guarded the alchemy of natural dyes, Damascene silver inlays, and ritual folk canvases across generations.
          </p>
        </div>

        <button
          onClick={() => onSelectChapter('shop')}
          className="px-4 py-2 bg-[#6B1724] hover:bg-[#58111C] text-[#FAF6EE] text-xs font-royal font-semibold rounded-xs border border-[#C5A059] flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Support Living Ateliers</span>
        </button>
      </div>

      {/* Profiles */}
      <div className="space-y-8">
        {ARTISAN_PROFILES.map((artisan) => (
          <div
            key={artisan.id}
            className="p-6 sm:p-8 bg-[#FAF6EE] border-2 border-[#C5A059]/60 rounded-xs shadow-md space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Photo Frame */}
              <div className="lg:col-span-4 relative">
                <div className="border-2 border-[#C5A059] rounded-xs overflow-hidden shadow-sm aspect-4/3 sm:aspect-square bg-[#EAE0CD]">
                  <img
                    src={artisan.imageUrl}
                    alt={artisan.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-2.5 right-2.5 bg-[#FAF6EE]/95 backdrop-blur-xs px-2.5 py-1 border border-[#C5A059] rounded-xs text-[10px] font-mono text-[#6B1724]">
                  {artisan.craft}
                </div>
              </div>

              {/* Story & Accolades */}
              <div className="lg:col-span-8 space-y-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#735D4E]">
                    <span className="flex items-center gap-1 font-medium text-[#6B1724]">
                      <MapPin className="w-3.5 h-3.5" />
                      {artisan.location}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-[#8C7A6B]">{artisan.lineage}</span>
                  </div>

                  <h2 className="font-royal text-2xl sm:text-3xl font-bold text-[#6B1724]">
                    {artisan.name}
                  </h2>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0F4C3A]">
                    <Award className="w-4 h-4 text-[#C5A059]" />
                    <span>{artisan.awards}</span>
                  </div>
                </div>

                {/* Artisan Quote */}
                <div className="p-4 bg-[#F3EBDD] border-l-4 border-[#C5A059] rounded-xs space-y-1">
                  <div className="flex items-center gap-1 text-[11px] font-royal text-[#6B1724] uppercase tracking-wider">
                    <Quote className="w-3 h-3 text-[#C5A059]" />
                    <span>Voice of the Master</span>
                  </div>
                  <p className="font-editorial italic text-base sm:text-lg text-[#382D26]">
                    "{artisan.quote}"
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#382D26] leading-relaxed font-sans">
                  {artisan.story}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onSelectChapter('shop')}
                    className="px-4 py-2 bg-[#F3EBDD] hover:bg-[#EAE0CD] text-[#6B1724] font-medium text-xs rounded-xs border border-[#C5A059]/50 flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>View Handcrafted Works from this Atelier</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
