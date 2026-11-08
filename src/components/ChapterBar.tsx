import React, { useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Compass, 
  Image, 
  ShoppingBag, 
  MapPin, 
  Music, 
  Sparkles, 
  BookOpen, 
  Scroll, 
  Trees, 
  Landmark, 
  HeartHandshake, 
  Hammer, 
  MessageSquareText,
  SlidersHorizontal
} from 'lucide-react';
import { ChapterId } from '../types';
import { CHAPTERS } from '../data/culturalData';

interface ChapterBarProps {
  currentChapter: ChapterId;
  onSelectChapter: (id: ChapterId) => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Compass,
  Image,
  ShoppingBag,
  MapPin,
  Music,
  Sparkles,
  BookOpen,
  Scroll,
  Trees,
  Landmark,
  HeartHandshake,
  Hammer,
  MessageSquareText
};

export const ChapterBar: React.FC<ChapterBarProps> = ({
  currentChapter,
  onSelectChapter,
  reducedMotion,
  onToggleReducedMotion
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeChapterIndex = CHAPTERS.findIndex(c => c.id === currentChapter);
  const currentMeta = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  const handlePrev = () => {
    if (activeChapterIndex > 0) {
      onSelectChapter(CHAPTERS[activeChapterIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (activeChapterIndex < CHAPTERS.length - 1) {
      onSelectChapter(CHAPTERS[activeChapterIndex + 1].id);
    }
  };

  // Auto-scroll the active tab into center view
  useEffect(() => {
    if (scrollRef.current) {
      const activeBtn = scrollRef.current.querySelector(`[data-chapter-id="${currentChapter}"]`);
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentChapter]);

  return (
    <div className="bg-[#FAF6EE] border-b border-[#C5A059]/30 relative z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Chapter Bar: Prev / Next, active chapter breadcrumb & info */}
        <div className="py-2.5 flex items-center justify-between border-b border-[#C5A059]/20 gap-4 text-xs">
          
          {/* Active Chapter Details */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-[#8C7A6B] text-[11px] whitespace-nowrap">
              {String(activeChapterIndex + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')}
            </span>
            <span className="text-[#C5A059] font-serif font-semibold text-sm hidden sm:inline whitespace-nowrap">
              {currentMeta.sanskritSubtitle}
            </span>
            <span className="text-[#A39281] hidden sm:inline">·</span>
            <span className="font-royal text-sm font-bold text-[#6B1724] truncate">
              {currentMeta.title}
            </span>
            <span className="text-[#735D4E] font-editorial italic text-xs hidden md:inline truncate">
              — {currentMeta.englishKicker}
            </span>
          </div>

          {/* Navigation Controls: Prev / Next & Keyboard Indicator */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-[#8C7A6B] mr-2">
              <span>Keys:</span>
              <kbd className="bg-[#F3EBDD] border border-[#C5A059]/30 px-1.5 py-0.5 rounded-xs text-[10px] font-mono">←</kbd>
              <kbd className="bg-[#F3EBDD] border border-[#C5A059]/30 px-1.5 py-0.5 rounded-xs text-[10px] font-mono">→</kbd>
            </div>

            <button
              onClick={handlePrev}
              disabled={activeChapterIndex === 0}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-sm border transition-colors cursor-pointer ${
                activeChapterIndex === 0
                  ? 'border-transparent text-[#B5A596] cursor-not-allowed opacity-50'
                  : 'bg-[#F3EBDD] hover:bg-[#EAE0CD] text-[#6B1724] border-[#C5A059]/50 shadow-2xs'
              }`}
              title="Previous Folio (Left Arrow Key)"
              aria-label="Previous Folio"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-medium">Prev</span>
            </button>

            <button
              onClick={handleNext}
              disabled={activeChapterIndex === CHAPTERS.length - 1}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-sm border transition-colors cursor-pointer ${
                activeChapterIndex === CHAPTERS.length - 1
                  ? 'border-transparent text-[#B5A596] cursor-not-allowed opacity-50'
                  : 'bg-[#6B1724] hover:bg-[#58111C] text-[#FAF6EE] border-[#C5A059] shadow-2xs'
              }`}
              title="Next Folio (Right Arrow Key)"
              aria-label="Next Folio"
            >
              <span className="hidden sm:inline font-medium">Next</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
            </button>

            {/* Reduced motion button */}
            <button
              onClick={onToggleReducedMotion}
              className="p-1 sm:px-2 sm:py-1 rounded-sm border border-[#C5A059]/30 bg-[#F3EBDD] hover:bg-[#EAE0CD] text-[#735D4E] text-[11px] transition-colors cursor-pointer"
              title="Toggle Smooth Motion vs Instant Transition"
              aria-label="Toggle Transition Mode"
            >
              <SlidersHorizontal className="w-3 h-3 sm:hidden" />
              <span className="hidden sm:inline font-mono">
                {reducedMotion ? 'Calm' : 'Glide'}
              </span>
            </button>
          </div>
        </div>

        {/* Scrollable Chapter Tabs Rail */}
        <div 
          ref={scrollRef}
          className="flex items-center gap-1 overflow-x-auto py-2 custom-atlas-scrollbar no-scrollbar"
        >
          {CHAPTERS.map((chap) => {
            const isActive = chap.id === currentChapter;
            const Icon = iconMap[chap.iconName] || Compass;

            return (
              <button
                key={chap.id}
                data-chapter-id={chap.id}
                onClick={() => onSelectChapter(chap.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xs text-xs whitespace-nowrap shrink-0 transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#6B1724] text-[#FAF6EE] border-[#C5A059] shadow-xs font-semibold'
                    : 'bg-[#F3EBDD]/70 hover:bg-[#F3EBDD] text-[#5C4D42] hover:text-[#6B1724] border-transparent hover:border-[#C5A059]/40'
                }`}
              >
                <span className={`text-[10px] font-mono ${isActive ? 'text-[#C5A059]' : 'text-[#8C7A6B]'}`}>
                  {String(chap.index + 1).padStart(2, '0')}.
                </span>
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C5A059]' : 'text-[#735D4E]'}`} />
                <span className="font-royal">{chap.title}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
