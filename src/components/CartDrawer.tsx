import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Gift, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Package
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  currency: 'INR' | 'USD';
  onToggleCurrency: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency,
  onToggleCurrency
}) => {
  const [packaging, setPackaging] = useState<'sanganeri' | 'banarasi' | 'banana_fiber'>('sanganeri');
  const [giftNote, setGiftNote] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderReference, setOrderReference] = useState('');

  if (!isOpen) return null;

  const packagingCosts = {
    sanganeri: { inr: 0, usd: 0, name: 'Sanganeri Hand-Block Printed Box (Complimentary)' },
    banarasi: { inr: 350, usd: 4, name: 'Banarasi Zari Brocade Potli Pouch (+₹350 / $4)' },
    banana_fiber: { inr: 200, usd: 2.5, name: 'Handmade Banana Fiber Archival Parcel (+₹200 / $2.5)' }
  };

  const subtotalInr = items.reduce((acc, curr) => acc + curr.product.priceInr * curr.quantity, 0);
  const subtotalUsd = items.reduce((acc, curr) => acc + curr.product.priceUsd * curr.quantity, 0);

  const packCostInr = packagingCosts[packaging].inr;
  const packCostUsd = packagingCosts[packaging].usd;

  const totalInr = subtotalInr + packCostInr;
  const totalUsd = subtotalUsd + packCostUsd;

  const formatPrice = (pInr: number, pUsd: number) => {
    return currency === 'INR' 
      ? `₹${pInr.toLocaleString('en-IN')}` 
      : `$${pUsd.toLocaleString('en-US')}`;
  };

  const handleSimulateCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      setOrderReference(`PPX-ORD-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1000);
  };

  const handleFinish = () => {
    onClearCart();
    setCheckoutComplete(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      
      {/* Drawer Container */}
      <div 
        className="w-full max-w-md bg-[#FAF6EE] text-[#1C1814] h-full shadow-2xl flex flex-col border-l-2 border-[#C5A059]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 bg-[#F3EBDD] border-b border-[#C5A059]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#6B1724]" />
            <h2 id="cart-heading" className="font-royal font-bold text-base text-[#6B1724]">
              Artisan Patronage Bag
            </h2>
            <span className="text-xs font-mono text-[#8C7A6B]">({items.length} items)</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency Switcher */}
            <button
              onClick={onToggleCurrency}
              className="text-xs font-mono font-medium px-2 py-0.5 rounded-xs bg-[#FAF6EE] border border-[#C5A059]/50 hover:bg-[#EAE0CD] text-[#6B1724] cursor-pointer"
              title="Toggle Currency (₹ INR / $ USD)"
            >
              {currency === 'INR' ? '₹ INR' : '$ USD'}
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-sm text-[#5C4D42] hover:text-[#6B1724] hover:bg-[#EAE0CD] cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {checkoutComplete ? (
            /* Order Success State */
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#165B43]/10 border border-[#165B43] flex items-center justify-center text-[#165B43]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              
              <h3 className="font-royal text-xl font-bold text-[#6B1724]">
                Patronage Registered
              </h3>
              
              <p className="text-xs text-[#5C4D42] leading-relaxed max-w-xs mx-auto">
                Your heirloom acquisition order has been logged into the royal ledger. 
                The master craftspersons have received notification of your patronage.
              </p>

              <div className="p-3 bg-[#F3EBDD] border border-[#C5A059]/50 rounded-xs text-xs font-mono text-[#6B1724]">
                <span>Imperial Ledger Ref: </span>
                <span className="font-bold">{orderReference}</span>
              </div>

              <div className="bg-[#FAF6EE] p-3 rounded-xs border border-[#C5A059]/30 text-[11px] text-[#735D4E] text-left">
                <span className="font-bold text-[#6B1724] block mb-1">
                  Illustrative Heritage Demonstration:
                </span>
                No real payments were processed. All artisan products are authentic GI crafts maintained for educational appreciation and cultural preservation.
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-2.5 bg-[#6B1724] hover:bg-[#58111C] text-[#FAF6EE] font-medium text-xs rounded-sm border border-[#C5A059] cursor-pointer shadow-xs"
              >
                Return to Cultural Atlas
              </button>
            </div>
          ) : items.length === 0 ? (
            /* Empty Bag State */
            <div className="py-16 text-center space-y-3">
              <Package className="w-10 h-10 text-[#C5A059] mx-auto opacity-70" />
              <p className="font-royal text-base text-[#6B1724]">Your Royal Bag is Empty</p>
              <p className="text-xs text-[#735D4E] max-w-xs mx-auto">
                Explore our GI-tagged artisan storefront to discover museum-grade handloom silks, Bidriware, Blue Pottery, and botanical attars.
              </p>
            </div>
          ) : (
            /* List of Cart Items */
            <div className="space-y-4">
              <div className="divide-y divide-[#C5A059]/20">
                {items.map((cartItem) => {
                  const { product, quantity } = cartItem;
                  return (
                    <div key={product.id} className="py-3.5 flex gap-3 items-center">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-xs border border-[#C5A059]/50 shrink-0 bg-[#EAE0CD]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-royal text-xs font-bold text-[#6B1724] truncate">
                          {product.title}
                        </h4>
                        <p className="text-[11px] text-[#735D4E] truncate">
                          {product.artisanName} · {product.giTagLocation}
                        </p>
                        <p className="text-xs font-semibold text-[#1C1814] mt-0.5">
                          {formatPrice(product.priceInr, product.priceUsd)}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <div className="flex items-center border border-[#C5A059]/40 rounded-xs bg-[#F3EBDD]">
                          <button
                            onClick={() => onUpdateQuantity(product.id, -1)}
                            className="p-1 hover:bg-[#EAE0CD] text-[#6B1724] cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-medium">{quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(product.id, 1)}
                            className="p-1 hover:bg-[#EAE0CD] text-[#6B1724] cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-[11px] text-[#8C7A6B] hover:text-[#6B1724] flex items-center gap-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Packaging Selection */}
              <div className="p-3.5 bg-[#F3EBDD]/60 rounded-xs border border-[#C5A059]/40 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6B1724]">
                  <Gift className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Heirloom Gift Packaging</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="packaging"
                      checked={packaging === 'sanganeri'}
                      onChange={() => setPackaging('sanganeri')}
                      className="accent-[#6B1724]"
                    />
                    <span>Sanganeri Hand-Block Printed Box (Complimentary)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="packaging"
                      checked={packaging === 'banarasi'}
                      onChange={() => setPackaging('banarasi')}
                      className="accent-[#6B1724]"
                    />
                    <span>Banarasi Brocade Potli (+₹350 / $4)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="packaging"
                      checked={packaging === 'banana_fiber'}
                      onChange={() => setPackaging('banana_fiber')}
                      className="accent-[#6B1724]"
                    />
                    <span>Banana Fiber Archival Parcel (+₹200 / $2.5)</span>
                  </label>
                </div>

                <div className="pt-2">
                  <input
                    type="text"
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Optional: Inscribe a royal gift calligraphy note..."
                    className="w-full text-xs px-2.5 py-1.5 bg-[#FAF6EE] border border-[#C5A059]/40 rounded-xs placeholder-[#9C8B7D] focus:outline-hidden focus:border-[#6B1724]"
                  />
                </div>
              </div>

              {/* Guild Welfare Contribution Notice */}
              <div className="p-2.5 bg-[#0F4C3A]/5 border border-[#0F4C3A]/30 rounded-xs text-[11px] text-[#0F4C3A] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>
                  100% of proceeds go directly to custodial artisan guilds and living heritage preservation foundations.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Totals and Checkout Button */}
        {items.length > 0 && !checkoutComplete && (
          <div className="p-5 bg-[#F3EBDD] border-t border-[#C5A059]/40 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#735D4E]">
                <span>Artisan Goods Subtotal:</span>
                <span className="font-mono">{formatPrice(subtotalInr, subtotalUsd)}</span>
              </div>
              {packCostInr > 0 && (
                <div className="flex justify-between text-[#735D4E]">
                  <span>Heirloom Packaging:</span>
                  <span className="font-mono">{formatPrice(packCostInr, packCostUsd)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#1C1814] font-bold text-sm pt-2 border-t border-[#C5A059]/30">
                <span>Total Honorarium:</span>
                <span className="font-mono text-[#6B1724]">{formatPrice(totalInr, totalUsd)}</span>
              </div>
            </div>

            <form onSubmit={handleSimulateCheckout}>
              <button
                type="submit"
                disabled={isCheckingOut}
                className="w-full py-2.5 bg-[#6B1724] hover:bg-[#58111C] text-[#FAF6EE] font-semibold text-xs rounded-sm border border-[#C5A059] flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
              >
                {isCheckingOut ? (
                  <span>Recording in Imperial Ledger...</span>
                ) : (
                  <>
                    <span>Confirm Heirloom Patronage</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                  </>
                )}
              </button>
            </form>
            <p className="text-[10px] text-center text-[#8C7A6B]">
              Heritage Preservation Demo Checkout · No credit card required
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
