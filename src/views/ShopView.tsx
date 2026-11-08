import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Filter, 
  Award, 
  Check, 
  Eye, 
  Bookmark,
  Clock
} from 'lucide-react';
import { ArtisanProduct } from '../types';
import { ARTISAN_PRODUCTS, REGIONS } from '../data/culturalData';

interface ShopViewProps {
  onSelectItem: (item: ArtisanProduct) => void;
  onAddToCart: (product: ArtisanProduct) => void;
  currency: 'INR' | 'USD';
  onToggleCurrency: () => void;
  savedItemIds: string[];
  onToggleBookmark: (item: ArtisanProduct) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  onSelectItem,
  onAddToCart,
  currency,
  onToggleCurrency,
  savedItemIds,
  onToggleBookmark
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Craft Disciplines' },
    { id: 'textiles', label: 'Handloom & Silks' },
    { id: 'metalware', label: 'Bidriware & Bronzes' },
    { id: 'paintings', label: 'Thanjavur & Gold Icons' },
    { id: 'pottery', label: 'Quartz Blue Pottery' },
    { id: 'wellness', label: 'Botanical Attar & Saffron' }
  ];

  const filteredProducts = ARTISAN_PRODUCTS.filter((prod) => {
    const matchesCat = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchesReg = selectedRegion === 'all' || prod.region === selectedRegion;
    return matchesCat && matchesReg;
  });

  const formatPrice = (pInr: number, pUsd: number) => {
    return currency === 'INR' 
      ? `₹${pInr.toLocaleString('en-IN')}` 
      : `$${pUsd.toLocaleString('en-US')}`;
  };

  const handleQuickAdd = (p: ArtisanProduct) => {
    onAddToCart(p);
    setAddedNotice(p.id);
    setTimeout(() => setAddedNotice(null), 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Editorial Store Header */}
      <div className="border-b border-[#C5A059]/40 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8C7A6B]">
            <span className="text-[#6B1724] font-bold uppercase tracking-widest">
              Chapter 03 · Artisan Storefront
            </span>
            <span>·</span>
            <span className="font-serif italic text-[#C5A059] font-medium">शिल्प हाट</span>
            <span>·</span>
            <span>GI Certified Lineages</span>
          </div>
          <h1 className="font-royal text-3xl sm:text-4xl font-bold text-[#6B1724]">
            Living Royal Crafts & Master Ateliers
          </h1>
          <p className="font-editorial text-base sm:text-lg text-[#5C4D42] italic max-w-3xl">
            Acquire museum-grade heirlooms directly from registered GI custodians, national awardees, and hereditary craft guilds across the Indian subcontinent.
          </p>
        </div>

        {/* Currency Switcher & Patronage Guarantee */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center bg-[#F3EBDD] border border-[#C5A059]/50 rounded-xs p-1">
            <button
              onClick={() => currency !== 'INR' && onToggleCurrency()}
              className={`px-3 py-1 text-xs font-mono font-medium rounded-xs transition-colors cursor-pointer ${
                currency === 'INR'
                  ? 'bg-[#6B1724] text-[#FAF6EE] shadow-xs'
                  : 'text-[#5C4D42] hover:text-[#6B1724]'
              }`}
            >
              ₹ INR
            </button>
            <button
              onClick={() => currency !== 'USD' && onToggleCurrency()}
              className={`px-3 py-1 text-xs font-mono font-medium rounded-xs transition-colors cursor-pointer ${
                currency === 'USD'
                  ? 'bg-[#6B1724] text-[#FAF6EE] shadow-xs'
                  : 'text-[#5C4D42] hover:text-[#6B1724]'
              }`}
            >
              $ USD
            </button>
          </div>
        </div>
      </div>

      {/* Craft Ethics & Authenticity Banner */}
      <div className="bg-[#FAF6EE] border border-[#C5A059]/50 rounded-xs p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#382D26]">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#0F4C3A] shrink-0" />
          <div>
            <span className="font-royal font-bold text-[#6B1724] block">Geographical Indication (GI)</span>
            <span className="text-[#5C4D42]">Every craft bears legal GI registration and regional origin proof.</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Award className="w-5 h-5 text-[#C5A059] shrink-0" />
          <div>
            <span className="font-royal font-bold text-[#6B1724] block">Zero Mass-Production</span>
            <span className="text-[#5C4D42]">Individual hand-forged, pit-loomed, or natural vat-dyed pieces.</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-[#6B1724] shrink-0" />
          <div>
            <span className="font-royal font-bold text-[#6B1724] block">Direct Guild Honorarium</span>
            <span className="text-[#5C4D42]">Fair value patronage directly empowering hereditary artisan families.</span>
          </div>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-[#F3EBDD]/60 p-3 rounded-xs border border-[#C5A059]/30">
        
        {/* Category Pills (Functional Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto custom-atlas-scrollbar pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 text-xs rounded-xs whitespace-nowrap transition-colors cursor-pointer border ${
                selectedCategory === cat.id
                  ? 'bg-[#6B1724] text-[#FAF6EE] border-[#C5A059] font-medium'
                  : 'bg-[#FAF6EE] hover:bg-[#FAF6EE]/80 text-[#5C4D42] border-[#C5A059]/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Region Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-mono text-[#8C7A6B] whitespace-nowrap">Filter Origin:</span>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="text-xs bg-[#FAF6EE] border border-[#C5A059]/40 rounded-xs px-2.5 py-1 text-[#1C1814] focus:outline-hidden focus:border-[#6B1724] cursor-pointer"
          >
            {REGIONS.map(r => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((prod) => {
          const isSaved = savedItemIds.includes(prod.id);
          const justAdded = addedNotice === prod.id;

          return (
            <div
              key={prod.id}
              className="group bg-[#FAF6EE] border border-[#C5A059]/40 hover:border-[#C5A059] rounded-xs shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Product Visual Container */}
              <div 
                onClick={() => onSelectItem(prod)}
                className="relative aspect-square overflow-hidden bg-[#EAE0CD] cursor-pointer"
              >
                <img
                  src={prod.imageUrl}
                  alt={prod.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Top Overlay Badges */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono">
                  <span className="bg-[#FAF6EE]/90 backdrop-blur-xs text-[#6B1724] font-bold px-2 py-0.5 rounded-xs border border-[#C5A059]/40">
                    GI {prod.giTagLocation}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(prod);
                    }}
                    className={`p-1.5 rounded-xs backdrop-blur-xs transition-colors cursor-pointer border ${
                      isSaved 
                        ? 'bg-[#6B1724] text-[#FAF6EE] border-[#C5A059]' 
                        : 'bg-[#FAF6EE]/90 hover:bg-[#FAF6EE] text-[#5C4D42] border-[#C5A059]/40'
                    }`}
                    title={isSaved ? 'Saved in personal journal' : 'Bookmark product'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-[#C5A059]' : ''}`} />
                  </button>
                </div>

                {/* Crafting Time Pill */}
                <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-[#FAF6EE] text-[10px] font-mono px-2 py-0.5 rounded-xs flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#C5A059]" />
                  <span>{prod.timeToCraft}</span>
                </div>
              </div>

              {/* Product Meta */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="text-[11px] text-[#735D4E] flex items-center justify-between">
                    <span>{prod.giTagLocation}, {prod.state}</span>
                    <span className="font-mono text-[#8C7A6B]">{prod.stockStatus}</span>
                  </div>

                  <h3 
                    onClick={() => onSelectItem(prod)}
                    className="font-royal text-sm font-bold text-[#6B1724] group-hover:text-[#58111C] cursor-pointer line-clamp-2"
                  >
                    {prod.title}
                  </h3>

                  <p className="text-xs text-[#5C4D42] font-editorial italic truncate">
                    {prod.artisanLineage}
                  </p>

                  <p className="text-xs text-[#382D26] line-clamp-2 pt-1 font-sans">
                    {prod.craftTechnique}
                  </p>
                </div>

                {/* Price & Acquisition Button */}
                <div className="pt-3 border-t border-[#C5A059]/30 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-[#8C7A6B] block">Honorarium</span>
                    <span className="font-mono text-base font-bold text-[#6B1724]">
                      {formatPrice(prod.priceInr, prod.priceUsd)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onSelectItem(prod)}
                      className="p-1.5 bg-[#F3EBDD] hover:bg-[#EAE0CD] text-[#6B1724] border border-[#C5A059]/40 rounded-xs text-xs cursor-pointer"
                      title="Inspect Provenance Folio"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleQuickAdd(prod)}
                      className={`px-3 py-1.5 rounded-xs font-semibold text-xs border transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                        justAdded
                          ? 'bg-[#0F4C3A] text-[#FAF6EE] border-[#0F4C3A]'
                          : 'bg-[#6B1724] hover:bg-[#58111C] text-[#FAF6EE] border-[#C5A059]'
                      }`}
                    >
                      {justAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>In Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>Acquire</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
