import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    discountCode,
    applyDiscountCode,
    removeDiscount,
    shippingFee,
    total,
    freeShippingThreshold,
    setIsCheckoutOpen,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success?: boolean; message?: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyDiscountCode(promoInput);
    setPromoFeedback(res);
    if (res.success) {
      setPromoInput('');
    }
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-mono-code">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#09090c] border-l border-neutral-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="px-6 py-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-white" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                SHOPPING BAG // ARCHIVE SELECTIONS
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress */}
          <div className="px-6 py-3 bg-neutral-900/60 border-b border-neutral-800/80 text-[11px]">
            <div className="flex justify-between items-center text-neutral-400 mb-1.5">
              <span>EXPRESS DHL GLOBAL SHIPPING</span>
              <span>
                {amountNeededForFreeShipping === 0
                  ? 'COMPLIMENTARY UNLOCKED'
                  : `$${amountNeededForFreeShipping} AWAY`}
              </span>
            </div>
            <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4 text-neutral-500">
                <div className="w-12 h-12 border border-neutral-800 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-neutral-600" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400 font-bold">BAG IS CURRENTLY EMPTY</p>
                  <p className="text-[11px] text-neutral-600 mt-1">
                    Select garments from Drop 0x02 or the 0x01 Archive.
                  </p>
                </div>
              </div>
            ) : (
              items.map(item => (
                <div
                  key={item.id}
                  className="p-3 bg-neutral-950 border border-neutral-800/80 flex gap-3 text-xs"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-18 h-22 object-cover bg-neutral-900 flex-shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-white text-xs">{item.serialCode}</span>
                        <span className="text-white font-semibold">${item.price * item.quantity}</span>
                      </div>
                      <div className="text-[11px] text-neutral-400 font-sans line-clamp-1 mt-0.5">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-neutral-500 mt-1">
                        SIZE : <span className="text-neutral-300 font-bold">{item.size}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-neutral-800 bg-neutral-900">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-1 text-neutral-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 text-[11px] text-white font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-1 text-neutral-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-neutral-500 hover:text-rose-400 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 border-t border-neutral-800 bg-neutral-950 space-y-4 text-xs">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3 h-3 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="SERIAL CODE (e.g. SYNTAX10)"
                      value={promoInput}
                      onChange={e => setPromoInput(e.target.value)}
                      className="w-full pl-8 pr-2 py-2 bg-neutral-900 border border-neutral-800 text-[11px] text-white uppercase focus:outline-none focus:border-neutral-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-[11px] font-bold cursor-pointer"
                  >
                    APPLY
                  </button>
                </div>

                {promoFeedback && (
                  <div
                    className={`text-[10px] ${
                      promoFeedback.success ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {promoFeedback.message}
                  </div>
                )}
                {discountCode && (
                  <div className="flex justify-between items-center text-[10px] text-emerald-400 pt-1">
                    <span>CODE {discountCode} ACTIVE</span>
                    <button
                      type="button"
                      onClick={removeDiscount}
                      className="underline text-neutral-400 hover:text-white"
                    >
                      REMOVE
                    </button>
                  </div>
                )}
              </form>

              {/* Subtotal & Calculations */}
              <div className="space-y-1.5 text-neutral-400 text-xs border-t border-neutral-900 pt-3">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="text-white">${subtotal} USD</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>VIP PRIVILEGE DISCOUNT</span>
                    <span>-${discountAmount} USD</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>DHL COURIER DISPATCH</span>
                  <span className="text-white">
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee} USD`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-neutral-900 text-sm font-bold text-white">
                  <span>TOTAL ESTIMATE</span>
                  <span>${total} USD</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-4 bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                <span>PROCEED TO SECURE CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 pt-1">
                <ShieldCheck className="w-3 h-3 text-neutral-400" />
                <span>AUTHENTICITY GUARANTEED · 100% SECURE ENCRYPTED</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
