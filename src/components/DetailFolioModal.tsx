import React, { useEffect } from 'react';
import { 
  X, 
  Bookmark, 
  MapPin, 
  Landmark, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ShoppingBag,
  ExternalLink,
  Share2
} from 'lucide-react';
import { HeritageItem, ArtisanProduct } from '../types';

interface DetailFolioModalProps {
  item: HeritageItem | ArtisanProduct | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (item: HeritageItem | ArtisanProduct) => void;
  onAddToCart?: (product: ArtisanProduct) => void;
  currency: 'INR' | 'USD';
}

export const DetailFolioModal: React.FC<DetailFolioModalProps> = ({
  item,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onAddToCart,
  currency
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const isProduct = 'priceInr' in item;
  const heritage = item as HeritageItem;
  const product = item as ArtisanProduct;

  const formatPrice = (pInr: number, pUsd: number) => {
    return currency === 'INR' 
      ? `₹${pInr.toLocaleString('en-IN')}` 
      : `$${pUsd.toLocaleString('en-US')}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Royal Journal Folio Container */}
      <div 
        className="relative w-full max-w-4xl bg-[#FAF6EE] border-2 border-[#C5A059] shadow-2xl rounded-sm overflow-hidden text-[#1C1814] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="folio-title"
      >
        {/* Top Folio Header Bar */}
        <div className="px-5 py-3.5 bg-[#F3EBDD] border-b border-[#C5A059]/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8C7A6B]">
            <span className="uppercase tracking-widest text-[#6B1724] font-semibold">
              {isProduct ? 'Artisan Atelier Provenance' : 'Imperial Heritage Folio'}
            </span>
            <span>·</span>
            <span>{isProduct ? `Craft listing · ${product.giTagLocation}` : 'Cultural heritage record'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(item)}
              className={`p-1.5 rounded-sm border transition-colors cursor-pointer text-xs flex items-center gap-1 ${
                isBookmarked
                  ? 'bg-[#6B1724] text-[#FAF6EE] border-[#C5A059]'
                  : 'bg-[#FAF6EE] text-[#5C4D42] hover:text-[#6B1724] border-[#C5A059]/40'
              }`}
              title={isBookmarked ? 'Remove from Saved Folios' : 'Save Folio to Local Collection'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current text-[#C5A059]' : ''}`} />
              <span className="hidden sm:inline font-sans">
                {isBookmarked ? 'Saved' : 'Bookmark'}
              </span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-sm bg-[#FAF6EE] hover:bg-[#EAE0CD] text-[#5C4D42] hover:text-[#6B1724] border border-[#C5A059]/40 cursor-pointer"
              aria-label="Close folio"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Folio Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Main Visual & Title Block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Image / Visual Frame */}
            <div className="md:col-span-5 relative group">
              <div className="relative border-4 border-[#C5A059]/50 shadow-md overflow-hidden rounded-xs bg-[#EAE0CD]">
                <img
                  src={item.imageUrl}
                  alt={isProduct ? product.title : heritage.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                {!isProduct && heritage.imageCredit && heritage.imageCreditUrl && (
                  <a
                    href={heritage.imageCreditUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="absolute bottom-2 right-2 max-w-[72%] truncate text-[9px] text-white bg-black/70 px-1.5 py-1 rounded-xs hover:underline"
                  >
                    {heritage.imageCredit}
                  </a>
                )}
                
                {/* Visual Stamp Accent */}
                <div className="absolute bottom-2.5 left-2.5 bg-[#FAF6EE]/90 backdrop-blur-xs px-2 py-1 border border-[#C5A059] rounded-xs text-[10px] font-mono text-[#6B1724] uppercase tracking-wider">
                  {isProduct ? product.stockStatus : (heritage.preservationStatus || 'Living Heritage')}
                </div>
              </div>
            </div>

            {/* Title & Archival Meta */}
            <div className="md:col-span-7 space-y-3">
              {/* Vernacular and Region */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#735D4E]">
                {heritage.vernacularTitle && (
                  <span className="font-serif text-[#C5A059] font-bold text-sm">
                    {heritage.vernacularTitle}
                  </span>
                )}
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 font-medium text-[#6B1724]">
                  <MapPin className="w-3 h-3" />
                  {isProduct ? `${product.giTagLocation}, ${product.state}` : `${heritage.location}, ${heritage.state}`}
                </span>
                <span aria-hidden="true">·</span>
                <span>{item.region} India</span>
              </div>

              {/* Main Title */}
              <h2 id="folio-title" className="font-royal text-2xl sm:text-3xl font-bold text-[#6B1724] leading-tight">
                {item.title}
              </h2>

              {/* Subtitle / Lineage */}
              <p className="font-editorial italic text-base text-[#5C4D42]">
                {isProduct ? product.artisanLineage : heritage.subtitle}
              </p>

              {/* Architectural or Product Details definition list */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#C5A059]/30 text-xs">
                <div>
                  <span className="text-[#8C7A6B] block">Era / Lineage:</span>
                  <span className="font-medium text-[#1C1814]">
                    {isProduct ? product.craftTechnique : heritage.eraOrEpoch}
                  </span>
                </div>
                {(isProduct || heritage.preservationStatus) && (
                  <div>
                    <span className="text-[#8C7A6B] block">
                      {isProduct ? 'Craft Duration:' : 'Heritage designation:'}
                    </span>
                    <span className="font-medium text-[#1C1814]">
                      {isProduct ? product.timeToCraft : heritage.preservationStatus}
                    </span>
                  </div>
                )}
                {heritage.coordinates && (
                  <div>
                    <span className="text-[#8C7A6B] block">Coordinates:</span>
                    <span className="font-mono text-[#1C1814]">{heritage.coordinates}</span>
                  </div>
                )}
                {isProduct && (
                  <div>
                    <span className="text-[#8C7A6B] block">Custodial Artisan:</span>
                    <span className="font-medium text-[#1C1814]">{product.artisanName}</span>
                  </div>
                )}
              </div>

              {/* Product Pricing & Cart Action if Applicable */}
              {isProduct && (
                <div className="pt-2 flex flex-wrap items-center justify-between gap-4 bg-[#F3EBDD]/60 p-3 rounded-xs border border-[#C5A059]/40">
                  <div>
                    <span className="text-[11px] text-[#8C7A6B] block">Patronage Honorarium:</span>
                    <span className="text-xl font-bold text-[#6B1724]">
                      {formatPrice(product.priceInr, product.priceUsd)}
                    </span>
                  </div>

                  {onAddToCart && (
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-4 py-2 bg-[#6B1724] hover:bg-[#58111C] text-[#FAF6EE] font-semibold text-xs rounded-sm border border-[#C5A059] flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Acquire for Royal Bag</span>
                    </button>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* Deep Curatorial Essay / Provenance */}
          <div className="space-y-4 pt-2">
            <div>
              <h3 className="font-royal text-sm uppercase tracking-widest text-[#6B1724] border-b border-[#C5A059]/30 pb-1.5 flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#C5A059]" />
                <span>{isProduct ? 'Materials & Botanical Formulation' : 'Historical & Cultural Significance'}</span>
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#382D26] font-sans">
                {isProduct ? product.description : heritage.significance}
              </p>
            </div>

            {/* Curatorial Field Notes */}
            <div className="bg-[#F3EBDD]/70 p-4 rounded-xs border border-[#C5A059]/30 space-y-2">
              <h4 className="font-royal text-xs font-semibold text-[#6B1724] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{isProduct ? 'Official Provenance Certificate' : 'Curatorial Field Journal'}</span>
              </h4>
              <p className="text-xs leading-relaxed text-[#4A3B32] font-editorial italic">
                {isProduct ? product.provenanceCertificate : heritage.curatorialNotes}
              </p>
            </div>

            {/* Materials pills or tags */}
            {isProduct && product.materials && (
              <div>
                <span className="text-xs font-semibold text-[#6B1724] block mb-1.5">
                  Natural Ingredients & Substrates:
                </span>
                <div className="flex flex-wrap gap-1.5 text-xs text-[#5C4D42]">
                  {product.materials.map((mat, i) => (
                    <span 
                      key={i} 
                      className="bg-[#FAF6EE] border border-[#C5A059]/40 px-2 py-0.5 rounded-xs text-[11px]"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {!isProduct && heritage.tags && (
              <div className="flex flex-wrap gap-2 text-xs text-[#735D4E] pt-2">
                <span className="font-medium text-[#6B1724]">Field Descriptors:</span>
                {heritage.tags.map((t, idx) => (
                  <span key={idx} className="font-mono text-[11px] text-[#8C7A6B]">
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {!isProduct && heritage.sources && heritage.sources.length > 0 && (
              <section className="pt-3 border-t border-[#C5A059]/30 space-y-2" aria-label="Sources and image credits">
                <h4 className="font-royal text-xs font-semibold text-[#6B1724] uppercase tracking-wider">
                  Sources & image credits
                </h4>
                <ul className="space-y-1">
                  {heritage.sources.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#5C4D42] underline underline-offset-2 decoration-[#C5A059] hover:text-[#6B1724]"
                      >
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          </div>

        </div>

        {/* Folio Bottom Footer */}
        <div className="px-6 py-3 bg-[#F3EBDD] border-t border-[#C5A059]/40 flex items-center justify-between text-xs text-[#735D4E]">
          <span className="font-editorial italic">
            ParamparaX Cultural Atlas · Sources linked where available
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#FAF6EE] hover:bg-[#EAE0CD] text-[#6B1724] font-medium border border-[#C5A059]/50 rounded-xs cursor-pointer"
          >
            Close Folio
          </button>
        </div>

      </div>
    </div>
  );
};
