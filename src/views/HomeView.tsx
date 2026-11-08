import React from 'react';
import { 
  Compass, 
  MapPin, 
  ShoppingBag, 
  Music, 
  Sparkles, 
  Scroll, 
  Landmark, 
  ArrowRight, 
  Bookmark, 
  HeartHandshake,
  ShieldCheck,
  Award
} from 'lucide-react';
import { ChapterId, HeritageItem } from '../types';
import { 
  HERO_IMAGE, 
  TEXTILE_IMAGE, 
  KAILASA_IMAGE, 
  THANJAVUR_IMAGE, 
  CHAPTERS, 
  OVERLOOKED_DESTINATIONS 
} from '../data/culturalData';

interface HomeViewProps {
  onSelectChapter: (id: ChapterId) => void;
  onSelectItem: (item: HeritageItem) => void;
  onOpenSearch: () => void;
}



const CHAKRA_TOPIC_SLOTS: Record<ChapterId, string> = {
  home: 'core',
  gallery: 'nw',
  shop: 'n1',
  destinations: 'n2',
  performing_arts: 'ne',
  festivals: 'e1',
  languages: 'e2',
  folklore: 'se',
  wildlife: 's2',
  archaeology: 's1',
  ayurveda: 'sw',
  artisans: 'w2',
  reflections: 'w1'
};

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectChapter,
  onSelectItem,
  onOpenSearch
}) => {
  const featuredDestinations = OVERLOOKED_DESTINATIONS.slice(0, 3);

  return (
    <div className="space-y-12 pb-16">
      
      {/* Grand Hero Section - High-End Travel Journal Composition */}
      <section className="relative overflow-hidden border-b-2 border-[#C5A059]/40 bg-[#FAF6EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Curatorial Editorial Decree */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Accession & Decree Kicker */}
              <div className="flex items-center gap-2 text-xs font-mono text-[#8C7A6B]">
                <span className="text-[#6B1724] font-bold uppercase tracking-widest">
                  Folio Vol. II · Imperium Indicum
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-serif italic text-[#C5A059] font-medium">
                  शाश्वत भारत
                </span>
                <span aria-hidden="true">·</span>
                <span>Living Heritage Codex</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#6B1724] leading-[1.15] text-balance">
                  The Royal Indian Discovery Atlas & Living Artisan Storefront
                </h1>
                <p className="font-editorial text-lg sm:text-xl text-[#5C4D42] italic leading-relaxed">
                  An unhurried journey across forgotten citadels, sacred soundscapes, millennia-old scripts, and the hereditary ateliers of master craftspeople.
                </p>
              </div>

              {/* Decorative Block-Print Torn-Paper Divider */}
              <div className="relative h-4 w-full bg-repeat-x opacity-40 bg-[radial-gradient(circle,#C5A059_1px,transparent_1px)] bg-[size:12px_12px]" />

              {/* Curatorial Prose Excerpt */}
              <p className="text-sm leading-relaxed text-[#382D26] font-sans">
                India is not a static museum of marble ruins, but a breathing continuum. Across 30,000 years of ochre cave art, resonant granite pillars that sing with heptatonic scales, and the seventeen-stage indigo resist blocks of Kutch, ParamparaX 2.0 documents living traditions directly alongside the certified custodians who inherit them.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectChapter('destinations')}
                  className="px-5 py-2.5 bg-[#6B1724] hover:bg-[#58111C] text-[#FAF6EE] font-royal font-semibold text-xs sm:text-sm rounded-sm border border-[#C5A059] shadow-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Compass className="w-4 h-4 text-[#C5A059]" />
                  <span>Begin Atlas Expedition</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                </button>

                <button
                  onClick={() => onSelectChapter('shop')}
                  className="px-5 py-2.5 bg-[#F3EBDD] hover:bg-[#EAE0CD] text-[#6B1724] font-royal font-semibold text-xs sm:text-sm rounded-sm border border-[#C5A059]/60 shadow-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
                >
                  <ShoppingBag className="w-4 h-4 text-[#6B1724]" />
                  <span>Explore Artisan Storefront</span>
                </button>

                <button
                  onClick={onOpenSearch}
                  className="px-3.5 py-2.5 bg-transparent hover:bg-[#F3EBDD] text-[#735D4E] hover:text-[#6B1724] font-sans text-xs rounded-sm border border-transparent hover:border-[#C5A059]/40 transition-colors cursor-pointer"
                >
                  Quick Index
                </button>
              </div>

              {/* Trust & Provenance Strip */}
              <div className="pt-4 border-t border-[#C5A059]/30 flex flex-wrap items-center gap-6 text-xs text-[#735D4E]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0F4C3A]" />
                  <span>100% Authentic GI Tag Crafts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#C5A059]" />
                  <span>Padma Shri & Master Guild Lineages</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-[#6B1724]" />
                  <span>Direct Artisan Honorariums</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Artwork with Royal Border */}
            <div className="lg:col-span-5">
              <div className="relative p-2.5 bg-[#FAF6EE] border-2 border-[#C5A059] shadow-xl rounded-xs">
                {/* Gold corner brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#6B1724]" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#6B1724]" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#6B1724]" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#6B1724]" />

                <div className="relative overflow-hidden rounded-xs aspect-4/3 sm:aspect-16/10 bg-[#EAE0CD]">
                  <img
                    src={HERO_IMAGE}
                    alt="Royal sandstone corridor overlooking sacred ghats with manuscript maps and brass diya lamps"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                  {/* Curatorial Label Badge */}
                  <div className="absolute bottom-3 left-3 right-3 text-[#FAF6EE] space-y-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] block">
                      Plate No. 01 · Riverfront Pavilion at Dusk
                    </span>
                    <h3 className="font-royal text-sm sm:text-base font-bold text-white drop-shadow-xs">
                      Maheshwar & Orchha Heritage Corridors
                    </h3>
                  </div>
                </div>

                <div className="mt-2 text-center">
                  <p className="text-[11px] font-editorial italic text-[#735D4E]">
                    Archival accession from the Bundela & Holkar dynastic chronicles.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Twelve Living Chapters — Heritage Chakra Navigator */}
      <section className="chakra-section border-y border-[#C5A059]/30 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#8C7A6B]">
              <span className="text-[#C5A059] font-serif font-bold text-sm">द्वादश अध्याय</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#6B1724] uppercase tracking-widest font-semibold">Twelve Living Chapters</span>
            </div>
            <h2 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-bold text-[#6B1724]">
              Find Your Way Through the Atlas
            </h2>
            <p className="font-editorial text-base sm:text-lg text-[#5C4D42] italic">
              Choose a topic around the chakra to enter its chapter and discover a new thread of India’s living heritage.
            </p>
          </div>

          <div className="chakra-grid" role="group" aria-label="Twelve ParamparaX heritage chapters">
            <div className="chakra-core" aria-label="ParamparaX Royal Atlas chakra">
              <div className="chakra-wheel">
                <svg viewBox="0 0 100 100" role="img" aria-labelledby="chakra-wheel-title">
                  <title id="chakra-wheel-title">A twenty-four-spoked heritage chakra</title>
                  <circle className="chakra-wheel-ring" cx="50" cy="50" r="44" />
                  <circle className="chakra-wheel-ring chakra-wheel-ring--inner" cx="50" cy="50" r="31" />
                  <line key="spoke-0" x1="50" y1="9" x2="50" y2="27" transform="rotate(0 50 50)" />
              <line key="spoke-1" x1="50" y1="9" x2="50" y2="27" transform="rotate(15 50 50)" />
              <line key="spoke-2" x1="50" y1="9" x2="50" y2="27" transform="rotate(30 50 50)" />
              <line key="spoke-3" x1="50" y1="9" x2="50" y2="27" transform="rotate(45 50 50)" />
              <line key="spoke-4" x1="50" y1="9" x2="50" y2="27" transform="rotate(60 50 50)" />
              <line key="spoke-5" x1="50" y1="9" x2="50" y2="27" transform="rotate(75 50 50)" />
              <line key="spoke-6" x1="50" y1="9" x2="50" y2="27" transform="rotate(90 50 50)" />
              <line key="spoke-7" x1="50" y1="9" x2="50" y2="27" transform="rotate(105 50 50)" />
              <line key="spoke-8" x1="50" y1="9" x2="50" y2="27" transform="rotate(120 50 50)" />
              <line key="spoke-9" x1="50" y1="9" x2="50" y2="27" transform="rotate(135 50 50)" />
              <line key="spoke-10" x1="50" y1="9" x2="50" y2="27" transform="rotate(150 50 50)" />
              <line key="spoke-11" x1="50" y1="9" x2="50" y2="27" transform="rotate(165 50 50)" />
              <line key="spoke-12" x1="50" y1="9" x2="50" y2="27" transform="rotate(180 50 50)" />
              <line key="spoke-13" x1="50" y1="9" x2="50" y2="27" transform="rotate(195 50 50)" />
              <line key="spoke-14" x1="50" y1="9" x2="50" y2="27" transform="rotate(210 50 50)" />
              <line key="spoke-15" x1="50" y1="9" x2="50" y2="27" transform="rotate(225 50 50)" />
              <line key="spoke-16" x1="50" y1="9" x2="50" y2="27" transform="rotate(240 50 50)" />
              <line key="spoke-17" x1="50" y1="9" x2="50" y2="27" transform="rotate(255 50 50)" />
              <line key="spoke-18" x1="50" y1="9" x2="50" y2="27" transform="rotate(270 50 50)" />
              <line key="spoke-19" x1="50" y1="9" x2="50" y2="27" transform="rotate(285 50 50)" />
              <line key="spoke-20" x1="50" y1="9" x2="50" y2="27" transform="rotate(300 50 50)" />
              <line key="spoke-21" x1="50" y1="9" x2="50" y2="27" transform="rotate(315 50 50)" />
              <line key="spoke-22" x1="50" y1="9" x2="50" y2="27" transform="rotate(330 50 50)" />
              <line key="spoke-23" x1="50" y1="9" x2="50" y2="27" transform="rotate(345 50 50)" />
                  <circle className="chakra-wheel-hub" cx="50" cy="50" r="6" />
                </svg>
              </div>
              <span className="chakra-core-title">PARAMPARAX</span>
              <span className="chakra-core-caption">The Royal Atlas · Vol. II</span>
            </div>

            {CHAPTERS.filter(chap => chap.id !== 'home').map((chap) => (
              <button
                key={chap.id}
                type="button"
                onClick={() => onSelectChapter(chap.id)}
                className={`chakra-topic chakra-topic--${CHAKRA_TOPIC_SLOTS[chap.id]}`}
                aria-label={`Open ${chap.title}: ${chap.englishKicker}`}
              >
                <span className="chakra-topic-index">{String(chap.index).padStart(2, '0')}</span>
                <span className="chakra-topic-copy">
                  <span className="chakra-topic-sanskrit">{chap.sanskritSubtitle}</span>
                  <strong>{chap.title}</strong>
                  <span className="chakra-topic-description">{chap.description}</span>
                </span>
                <span className="chakra-topic-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        </div>
      </section>



      {/* Curated Highlights: Overlooked Dynastic Wonders */}
      <section className="bg-[#F3EBDD]/60 py-12 border-y border-[#C5A059]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#8C7A6B]">
                <span className="text-[#6B1724] font-bold uppercase tracking-widest">
                  Featured Destinations
                </span>
                <span>·</span>
                <span className="font-serif italic text-[#C5A059]">अज्ञात भारत</span>
              </div>
              <h2 className="font-royal text-2xl sm:text-3xl font-bold text-[#6B1724] mt-1">
                Beyond the Corridors of Mainstream Tourism
              </h2>
            </div>

            <button
              onClick={() => onSelectChapter('destinations')}
              className="text-xs font-royal font-semibold text-[#6B1724] hover:text-[#58111C] flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>View All 7 Overlooked Destinations</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredDestinations.map((dest) => (
              <div
                key={dest.id}
                onClick={() => onSelectItem(dest)}
                className="group bg-[#FAF6EE] border border-[#C5A059]/50 hover:border-[#C5A059] rounded-xs shadow-xs hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-[#EAE0CD]">
                  <img
                    src={dest.imageUrl}
                    alt={dest.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-[#FAF6EE]/90 backdrop-blur-xs px-2 py-0.5 rounded-xs border border-[#C5A059]/40 text-[10px] font-mono text-[#6B1724]">
                    {dest.region}
                  </div>
                  <div className="absolute bottom-2 left-2 text-[10px] font-serif font-bold text-[#FAF6EE] bg-black/60 px-2 py-0.5 rounded-xs">
                    {dest.vernacularTitle}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[11px] text-[#735D4E] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#6B1724]" />
                      {dest.location}, {dest.state}
                    </span>
                    <h3 className="font-royal text-base font-bold text-[#6B1724] group-hover:text-[#58111C] transition-colors mt-1">
                      {dest.title}
                    </h3>
                    <p className="text-xs text-[#5C4D42] font-editorial italic mt-0.5">
                      {dest.eraOrEpoch}
                    </p>
                    <p className="text-xs text-[#382D26] line-clamp-2 mt-2 leading-relaxed">
                      {dest.significance}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#C5A059]/20 flex items-center justify-between text-xs text-[#6B1724] font-medium">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C7A6B]">
                      {dest.accessionNumber}
                    </span>
                    <span className="flex items-center gap-1 group-hover:underline">
                      Inspect Folio <ArrowRight className="w-3 h-3 text-[#C5A059]" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Artisan Custodians Spotlight Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 bg-[#FAF6EE] border-2 border-[#C5A059] rounded-xs shadow-md relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="border-2 border-[#C5A059]/60 rounded-xs overflow-hidden shadow-sm bg-[#EAE0CD]">
                <img
                  src={TEXTILE_IMAGE}
                  alt="Master artisan block printing natural indigo onto fabric"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-[#6B1724] text-[#FAF6EE] p-3 border border-[#C5A059] rounded-xs shadow-md text-xs font-royal">
                <span>9 Generations</span>
                <span className="block text-[10px] text-[#C5A059] font-mono">Dhamadka Lineage</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#8C7A6B]">
                <span className="text-[#6B1724] font-bold uppercase tracking-widest">
                  Atelier Custodian Spotlight
                </span>
                <span>·</span>
                <span>Living Heritage Keepers</span>
              </div>

              <h2 className="font-royal text-2xl sm:text-3xl font-bold text-[#6B1724]">
                Dr. Ismail Mohammed Khatri & The Ajrakh Revival
              </h2>

              <p className="font-editorial text-base text-[#5C4D42] italic">
                "Ajrakh is not merely cloth; it is the rhythm of desert river water, winter sunlight, and natural botanical ferment."
              </p>

              <p className="text-xs sm:text-sm text-[#382D26] leading-relaxed">
                Working in Ajrakhpur, Kutch, Dr. Khatri and his sons practice the sixteen-step resist printing method using hand-carved teak wood blocks, wild indigo, madder root, hardee, and tamarind seed gum. ParamparaX works directly with certified GI artisans to preserve their lineage and provide sustainable royal patronages.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onSelectChapter('artisans')}
                  className="px-4 py-2 bg-[#6B1724] hover:bg-[#58111C] text-[#FAF6EE] font-medium text-xs rounded-sm border border-[#C5A059] cursor-pointer shadow-xs transition-colors"
                >
                  Read Master Artisan Profiles
                </button>

                <button
                  onClick={() => onSelectChapter('shop')}
                  className="px-4 py-2 bg-[#F3EBDD] hover:bg-[#EAE0CD] text-[#6B1724] font-medium text-xs rounded-sm border border-[#C5A059]/40 cursor-pointer transition-colors"
                >
                  View Ajrakh Silk Saree in Shop
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
