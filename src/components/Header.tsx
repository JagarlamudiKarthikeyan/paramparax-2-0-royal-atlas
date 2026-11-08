import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  Bookmark, 
  ShoppingBag, 
  Menu, 
  X, 
  Volume2, 
  VolumeX, 
  Sparkles,
  Layers
} from 'lucide-react';
import { ChapterId } from '../types';
import { tanpuraDrone } from '../utils/audioDrone';

interface HeaderProps {
  currentChapter: ChapterId;
  onSelectChapter: (id: ChapterId) => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenCart: () => void;
  savedCount: number;
  cartCount: number;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentChapter,
  onSelectChapter,
  onOpenSearch,
  onOpenBookmarks,
  onOpenCart,
  savedCount,
  cartCount,
  reducedMotion,
  onToggleReducedMotion
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleSound = () => {
    const active = tanpuraDrone.toggle();
    setIsPlayingAudio(active);
  };

  const navLinks: { label: string; chapter: ChapterId }[] = [
    { label: 'Atlas Portal', chapter: 'home' },
    { label: 'Visual Folio', chapter: 'gallery' },
    { label: 'Artisan Store', chapter: 'shop' },
    { label: 'Destinations', chapter: 'destinations' },
    { label: 'Makers', chapter: 'artisans' },
    { label: 'Community', chapter: 'reflections' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#C5A059]/40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <button 
            onClick={() => onSelectChapter('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#6B1724] rounded-sm p-1"
            aria-label="ParamparaX 2.0 Royal Atlas Home"
          >
            <div className="w-8 h-8 rounded-full bg-[#6B1724] border border-[#C5A059] flex items-center justify-center text-[#FAF6EE] shadow-xs group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div className="flex items-baseline gap-1.5 whitespace-nowrap shrink-0">
              <span className="font-royal text-xl sm:text-2xl font-bold tracking-wider text-[#6B1724]">
                ParamparaX
              </span>
              <span className="text-xs font-serif font-semibold text-[#C5A059] tracking-widest border border-[#C5A059]/50 rounded-xs px-1 py-0.2 bg-[#FAF6EE]">
                2.0
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4A3B32]">
            {navLinks.map((item) => {
              const isActive = currentChapter === item.chapter;
              return (
                <button
                  key={item.chapter}
                  onClick={() => onSelectChapter(item.chapter)}
                  className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 relative hover:text-[#6B1724] ${
                    isActive 
                      ? 'text-[#6B1724] font-semibold' 
                      : 'text-[#5C4D42]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A059] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action & utility controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search shortcut button */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-1.5 flex items-center gap-2 text-xs font-medium text-[#5C4D42] hover:text-[#6B1724] bg-[#F3EBDD] hover:bg-[#EAE0CD] border border-[#C5A059]/40 rounded-sm transition-colors cursor-pointer"
              title="Search Cultural Atlas (Press / or Cmd+K)"
              aria-label="Search Cultural Atlas"
            >
              <Search className="w-3.5 h-3.5 text-[#6B1724]" />
              <span className="hidden md:inline whitespace-nowrap">Search Atlas</span>
              <kbd className="hidden lg:inline-block text-[10px] text-[#8C7A6B] bg-[#FAF6EE] px-1 py-0.5 rounded-xs border border-[#C5A059]/30">
                /
              </kbd>
            </button>

            {/* Ambient Tanpura Drone Button */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-sm border transition-colors cursor-pointer ${
                isPlayingAudio 
                  ? 'bg-[#6B1724] text-[#FAF6EE] border-[#C5A059]' 
                  : 'bg-[#F3EBDD] text-[#5C4D42] hover:text-[#6B1724] border-[#C5A059]/40'
              }`}
              title={isPlayingAudio ? 'Mute Tanpura Acoustic Drone' : 'Unmute Sacred Tanpura Drone (Sa-Pa)'}
              aria-label="Toggle Tanpura Drone"
            >
              {isPlayingAudio ? (
                <Volume2 className="w-4 h-4 text-[#C5A059] animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#735D4E]" />
              )}
            </button>

            {/* Bookmarks / Saved Folios */}
            <button
              onClick={onOpenBookmarks}
              className="p-2 relative rounded-sm bg-[#F3EBDD] hover:bg-[#EAE0CD] text-[#5C4D42] hover:text-[#6B1724] border border-[#C5A059]/40 transition-colors cursor-pointer"
              title="Saved Heritage Folios"
              aria-label="Saved Heritage Folios"
            >
              <Bookmark className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#6B1724] text-[#FAF6EE] text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-[#C5A059] shadow-xs">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Artisan Storefront Bag */}
            <button
              onClick={onOpenCart}
              className="px-3 py-1.5 relative flex items-center gap-2 text-xs font-semibold text-[#FAF6EE] bg-[#6B1724] hover:bg-[#58111C] border border-[#C5A059] rounded-sm transition-colors cursor-pointer shadow-xs whitespace-nowrap"
              title="Artisan Shopping Bag"
              aria-label="Artisan Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
              <span className="hidden sm:inline">Royal Bag</span>
              {cartCount > 0 && (
                <span className="bg-[#C5A059] text-[#1C1814] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-sm bg-[#F3EBDD] text-[#5C4D42] border border-[#C5A059]/40 cursor-pointer"
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#C5A059]/30 bg-[#FAF6EE] px-4 py-3 shadow-md">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((item) => (
                <button
                  key={item.chapter}
                  onClick={() => {
                    onSelectChapter(item.chapter);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 text-sm font-medium rounded-sm transition-colors cursor-pointer ${
                    currentChapter === item.chapter
                      ? 'bg-[#F3EBDD] text-[#6B1724] font-semibold border-l-2 border-[#C5A059]'
                      : 'text-[#4A3B32] hover:bg-[#F3EBDD]/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-2 mt-2 border-t border-[#C5A059]/20 flex items-center justify-between text-xs text-[#735D4E] px-2">
                <span>Motion Transition</span>
                <button
                  onClick={onToggleReducedMotion}
                  className="px-2 py-1 rounded-sm border border-[#C5A059]/40 bg-[#F3EBDD] text-[#6B1724] font-medium cursor-pointer"
                >
                  {reducedMotion ? 'Calm (Reduced Motion)' : 'Dynamic Slide'}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
