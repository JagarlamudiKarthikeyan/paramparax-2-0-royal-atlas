import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChapterId, HeritageItem, ArtisanProduct, CartItem } from './types';
import { CHAPTERS } from './data/culturalData';

// Layout & Interactive Components
import { Header } from './components/Header';
import { ChapterBar } from './components/ChapterBar';
import { DetailFolioModal } from './components/DetailFolioModal';
import { CartDrawer } from './components/CartDrawer';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { SearchModal } from './components/SearchModal';

// Views
import { HomeView } from './views/HomeView';
import { GalleryView } from './views/GalleryView';
import { ShopView } from './views/ShopView';
import { DestinationsView } from './views/DestinationsView';
import { PerformingArtsView } from './views/PerformingArtsView';
import { FestivalsView } from './views/FestivalsView';
import { LanguagesView } from './views/LanguagesView';
import { FolkloreView } from './views/FolkloreView';
import { WildlifeView } from './views/WildlifeView';
import { ArchaeologyView } from './views/ArchaeologyView';
import { AyurvedaView } from './views/AyurvedaView';
import { ArtisansView } from './views/ArtisansView';
import { ReflectionsView } from './views/ReflectionsView';

export default function App() {
  const [currentChapter, setCurrentChapter] = useState<ChapterId>('home');
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  // Modals & Drawers
  const [selectedItem, setSelectedItem] = useState<HeritageItem | ArtisanProduct | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Currency
  const [currency, setCurrency] = useState<'INR' | 'USD'>(() => {
    const saved = localStorage.getItem('paramparax_currency');
    return (saved === 'USD' || saved === 'INR') ? saved : 'INR';
  });

  // Reduced Motion Preference
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    const saved = localStorage.getItem('paramparax_reduced_motion');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // Bookmarks state with localStorage persistence
  const [bookmarks, setBookmarks] = useState<(HeritageItem | ArtisanProduct)[]>(() => {
    try {
      const stored = localStorage.getItem('paramparax_bookmarks');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Shopping Bag state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('paramparax_bag');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('paramparax_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('paramparax_reduced_motion', String(reducedMotion));
  }, [reducedMotion]);

  useEffect(() => {
    localStorage.setItem('paramparax_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('paramparax_bag', JSON.stringify(cartItems));
  }, [cartItems]);

  // Navigate Chapters with Direction Tracking
  const handleSelectChapter = (newChapter: ChapterId) => {
    if (newChapter === currentChapter) return;
    const oldIdx = CHAPTERS.findIndex(c => c.id === currentChapter);
    const newIdx = CHAPTERS.findIndex(c => c.id === newChapter);
    setSlideDirection(newIdx > oldIdx ? 'right' : 'left');
    setCurrentChapter(newChapter);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard navigation for arrow keys and search shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing inside an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (e.key === 'ArrowRight') {
        const curIdx = CHAPTERS.findIndex(c => c.id === currentChapter);
        if (curIdx < CHAPTERS.length - 1) {
          handleSelectChapter(CHAPTERS[curIdx + 1].id);
        }
      } else if (e.key === 'ArrowLeft') {
        const curIdx = CHAPTERS.findIndex(c => c.id === currentChapter);
        if (curIdx > 0) {
          handleSelectChapter(CHAPTERS[curIdx - 1].id);
        }
      } else if (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key === 'k')) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChapter]);

  // Bookmark Toggle
  const handleToggleBookmark = (item: HeritageItem | ArtisanProduct) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.id === item.id);
      if (exists) {
        return prev.filter(b => b.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleRemoveBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  // Cart Operations
  const handleAddToCart = (product: ArtisanProduct) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.product.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const savedItemIds = bookmarks.map(b => b.id);
  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Motion animation variants for horizontal slide
  const slideVariants = {
    enter: (dir: 'left' | 'right') => ({
      x: reducedMotion ? 0 : dir === 'right' ? 80 : -80,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: reducedMotion ? 0.01 : 0.28, ease: [0.16, 1, 0.3, 1] as const }
    },
    exit: (dir: 'left' | 'right') => ({
      x: reducedMotion ? 0 : dir === 'right' ? -80 : 80,
      opacity: 0,
      transition: { duration: reducedMotion ? 0.01 : 0.22, ease: [0.4, 0, 0.2, 1] as const }
    })
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1C1814] flex flex-col font-sans bg-jaali selection:bg-[#C5A059]/30 selection:text-[#6B1724]">
      
      {/* Top Bar fulfilling 3-Zone Contract */}
      <Header
        currentChapter={currentChapter}
        onSelectChapter={handleSelectChapter}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        savedCount={bookmarks.length}
        cartCount={totalCartCount}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
      />

      {/* Horizontal Chapter Navigation Rail */}
      <ChapterBar
        currentChapter={currentChapter}
        onSelectChapter={handleSelectChapter}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
      />

      {/* Full-Page Horizontal Transitioning Main Content Container */}
      <main className="flex-1 relative overflow-x-hidden">
        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={currentChapter}
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            {currentChapter === 'home' && (
              <HomeView
                onSelectChapter={handleSelectChapter}
                onSelectItem={(item) => setSelectedItem(item)}
                onOpenSearch={() => setIsSearchOpen(true)}
              />
            )}

            {currentChapter === 'gallery' && (
              <GalleryView
                onSelectItem={(item) => setSelectedItem(item)}
                savedItemIds={savedItemIds}
                onToggleBookmark={handleToggleBookmark}
              />
            )}

            {currentChapter === 'shop' && (
              <ShopView
                onSelectItem={(item) => setSelectedItem(item)}
                onAddToCart={handleAddToCart}
                currency={currency}
                onToggleCurrency={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
                savedItemIds={savedItemIds}
                onToggleBookmark={handleToggleBookmark}
              />
            )}

            {currentChapter === 'destinations' && (
              <DestinationsView
                onSelectItem={(item) => setSelectedItem(item)}
                savedItemIds={savedItemIds}
                onToggleBookmark={handleToggleBookmark}
              />
            )}

            {currentChapter === 'performing_arts' && (
              <PerformingArtsView
                onSelectItem={(item) => setSelectedItem(item)}
                savedItemIds={savedItemIds}
                onToggleBookmark={handleToggleBookmark}
              />
            )}

            {currentChapter === 'festivals' && (
              <FestivalsView
                onSelectItem={(item) => setSelectedItem(item)}
                savedItemIds={savedItemIds}
                onToggleBookmark={handleToggleBookmark}
              />
            )}

            {currentChapter === 'languages' && (
              <LanguagesView />
            )}

            {currentChapter === 'folklore' && (
              <FolkloreView />
            )}

            {currentChapter === 'wildlife' && (
              <WildlifeView
                onSelectItem={(item) => setSelectedItem(item)}
                savedItemIds={savedItemIds}
                onToggleBookmark={handleToggleBookmark}
              />
            )}

            {currentChapter === 'archaeology' && (
              <ArchaeologyView
                onSelectItem={(item) => setSelectedItem(item)}
                savedItemIds={savedItemIds}
                onToggleBookmark={handleToggleBookmark}
              />
            )}

            {currentChapter === 'ayurveda' && (
              <AyurvedaView />
            )}

            {currentChapter === 'artisans' && (
              <ArtisansView
                onSelectChapter={handleSelectChapter}
              />
            )}

            {currentChapter === 'reflections' && (
              <ReflectionsView />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Royal Editorial Footer */}
      <footer className="bg-[#F3EBDD] border-t-2 border-[#C5A059]/40 py-10 text-xs text-[#5C4D42]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-[#C5A059]/30 pb-6">
            <div className="md:col-span-6 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-royal text-lg font-bold text-[#6B1724]">ParamparaX 2.0</span>
                <span className="text-[10px] font-mono border border-[#C5A059] px-1 py-0.2 rounded-xs text-[#C5A059]">
                  LIVING CODEX
                </span>
              </div>
              <p className="font-editorial text-sm italic text-[#735D4E]">
                A cultural discovery atlas of historic places, art forms, stories and craft traditions.
              </p>
            </div>

            <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-4 text-xs font-medium">
              <button
                onClick={() => handleSelectChapter('home')}
                className="hover:text-[#6B1724] cursor-pointer"
              >
                Atlas Gateway
              </button>
              <button
                onClick={() => handleSelectChapter('gallery')}
                className="hover:text-[#6B1724] cursor-pointer"
              >
                Visual Folio
              </button>
              <button
                onClick={() => handleSelectChapter('shop')}
                className="hover:text-[#6B1724] cursor-pointer"
              >
                Artisan Storefront
              </button>
              <button
                onClick={() => handleSelectChapter('reflections')}
                className="hover:text-[#6B1724] cursor-pointer"
              >
                Field Journal
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8C7A6B]">
            <p>
              © 2026 ParamparaX Cultural Initiative. Dedicated to the living heritage, epigraphs, and master artisans of Bharatvarsha.
            </p>
            <div className="flex items-center gap-3">
              <span>Selected records link their research and image sources</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Detail Folio Modal */}
      <DetailFolioModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        isBookmarked={selectedItem ? savedItemIds.includes(selectedItem.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onAddToCart={handleAddToCart}
        currency={currency}
      />

      {/* Artisan Bag / Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        currency={currency}
        onToggleCurrency={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
      />

      {/* Saved Folios Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={handleRemoveBookmark}
        onSelectItem={(item) => setSelectedItem(item)}
      />

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectItem={(item) => setSelectedItem(item)}
        onSelectChapter={handleSelectChapter}
      />

    </div>
  );
}
