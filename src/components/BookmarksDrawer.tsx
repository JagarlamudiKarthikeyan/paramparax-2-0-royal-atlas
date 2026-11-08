import React from 'react';
import { X, Bookmark, Trash2, ArrowUpRight, Compass } from 'lucide-react';
import { HeritageItem, ArtisanProduct } from '../types';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: (HeritageItem | ArtisanProduct)[];
  onRemoveBookmark: (id: string) => void;
  onSelectItem: (item: HeritageItem | ArtisanProduct) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
  onSelectItem
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#FAF6EE] text-[#1C1814] h-full shadow-2xl flex flex-col border-l-2 border-[#C5A059]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bookmarks-heading"
      >
        {/* Header */}
        <div className="px-5 py-4 bg-[#F3EBDD] border-b border-[#C5A059]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[#6B1724]" />
            <h2 id="bookmarks-heading" className="font-royal font-bold text-base text-[#6B1724]">
              Saved Heritage Folios
            </h2>
            <span className="text-xs font-mono text-[#8C7A6B]">({bookmarks.length})</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-sm text-[#5C4D42] hover:text-[#6B1724] hover:bg-[#EAE0CD] cursor-pointer"
            aria-label="Close saved folios drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {bookmarks.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Compass className="w-10 h-10 text-[#C5A059] mx-auto opacity-70" />
              <p className="font-royal text-base text-[#6B1724]">No Saved Folios Yet</p>
              <p className="text-xs text-[#735D4E] max-w-xs mx-auto">
                While exploring the atlas, tap the bookmark icon on any destination, performing art, or craft folio to store it in your personal travel journal.
              </p>
            </div>
          ) : (
            <div className="space-y-3 divide-y divide-[#C5A059]/20">
              {bookmarks.map((item) => (
                <div key={item.id} className="pt-3 flex gap-3 items-center group">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover rounded-xs border border-[#C5A059]/40 shrink-0 bg-[#EAE0CD]"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-mono text-[#8C7A6B] block">
                      {item.region} India
                    </span>
                    <button
                      onClick={() => {
                        onSelectItem(item);
                        onClose();
                      }}
                      className="text-left font-royal text-xs font-bold text-[#6B1724] hover:underline truncate block w-full cursor-pointer"
                    >
                      {item.title}
                    </button>
                    <p className="text-[11px] text-[#5C4D42] truncate">
                      {'priceInr' in item ? (item as ArtisanProduct).craftTechnique : (item as HeritageItem).subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => {
                        onSelectItem(item);
                        onClose();
                      }}
                      className="p-1.5 text-[#5C4D42] hover:text-[#6B1724] bg-[#F3EBDD] hover:bg-[#EAE0CD] border border-[#C5A059]/30 rounded-xs cursor-pointer"
                      title="Inspect Folio"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRemoveBookmark(item.id)}
                      className="p-1.5 text-[#8C7A6B] hover:text-[#6B1724] hover:bg-[#F3EBDD] rounded-xs cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F3EBDD] border-t border-[#C5A059]/40 text-center text-[11px] text-[#735D4E]">
          <span>Saved to your local browser journal cache.</span>
        </div>
      </div>
    </div>
  );
};
