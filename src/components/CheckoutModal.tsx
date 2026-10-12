import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, CheckCircle2, ShieldCheck, Lock, CreditCard, ArrowRight, Printer } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    items,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmed'>('shipping');
  const [formData, setFormData] = useState({
    fullName: 'Krish Sharma',
    email: 'sharmakrish1410@gmail.com',
    address: '14 Rue de Turenne',
    city: 'Paris',
    postalCode: '75004',
    country: 'France',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvv: '•••',
  });
  const [orderNumber, setOrderNumber] = useState('');

  if (!isCheckoutOpen) return null;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'shipping') {
      setStep('payment');
    } else if (step === 'payment') {
      const randomOrder = `0X-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(randomOrder);
      setStep('confirmed');
      clearCart();
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('shipping');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in font-mono-code">
      <div className="relative w-full max-w-2xl bg-[#09090c] border border-neutral-800 shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between text-xs text-neutral-400 bg-neutral-950">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-neutral-300" />
            <span className="font-bold text-white">0x01 ENCRYPTED CHECKOUT</span>
            <span className="text-neutral-600">/</span>
            <span>TLS 256-BIT</span>
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {step === 'confirmed' ? (
            /* Order Confirmed Screen */
            <div className="text-center space-y-6 py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-600 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs text-neutral-500 uppercase tracking-widest block mb-1">
                  DISPATCH ORDER ALLOCATED
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  SERIAL ACQUISITION CONFIRMED
                </h3>
                <div className="mt-2 text-sm text-neutral-400 font-sans">
                  Confirmation dispatch transmitted to <strong className="text-white">{formData.email}</strong>
                </div>
              </div>

              {/* Receipt Dossier Card */}
              <div className="p-5 border border-neutral-800 bg-neutral-900/40 text-left space-y-3 text-xs">
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-500">DISPATCH NUMBER:</span>
                  <span className="text-white font-bold">{orderNumber}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-500">DESTINATION:</span>
                  <span className="text-white">
                    {formData.address}, {formData.city} {formData.postalCode}, {formData.country}
                  </span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-500">DISPATCH METHOD:</span>
                  <span className="text-emerald-400 font-bold">DHL EXPRESS COURIER (AIR CARGO)</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-bold">
                  <span className="text-white">TOTAL CHARGED:</span>
                  <span className="text-white">${total} USD</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>PRINT ACQUISITION RECEIPT</span>
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 py-3 bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs uppercase cursor-pointer"
                >
                  RETURN TO ATELIER
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleNextStep} className="space-y-6 text-xs">
              {/* Stepper Tabs */}
              <div className="grid grid-cols-2 gap-2 pb-4 border-b border-neutral-800">
                <div
                  className={`p-2 text-center border ${
                    step === 'shipping'
                      ? 'border-white text-white font-bold bg-neutral-900/60'
                      : 'border-neutral-900 text-neutral-500'
                  }`}
                >
                  01 / SHIPPING DESTINATION
                </div>
                <div
                  className={`p-2 text-center border ${
                    step === 'payment'
                      ? 'border-white text-white font-bold bg-neutral-900/60'
                      : 'border-neutral-900 text-neutral-500'
                  }`}
                >
                  02 / PAYMENT ENCRYPTION
                </div>
              </div>

              {step === 'shipping' ? (
                /* Step 1: Shipping */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-400 mb-1">FULL NAME</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-neutral-600"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">EMAIL FOR DISPATCH LOG</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-neutral-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">STREET ADDRESS</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-neutral-600"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-neutral-400 mb-1">CITY</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-neutral-600"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">POSTAL CODE</label>
                      <input
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-neutral-600"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">COUNTRY</label>
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-neutral-600"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* Step 2: Payment */
                <div className="space-y-4">
                  <div className="p-4 border border-neutral-800 bg-neutral-950 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-neutral-300" />
                      <div>
                        <span className="text-white font-bold block">CREDIT / DEBIT CARD</span>
                        <span className="text-[10px] text-neutral-500">VISA · MASTERCARD · AMEX · APPLE PAY</span>
                      </div>
                    </div>
                    <span className="text-emerald-400 text-[10px] font-bold">SECURED</span>
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">CARD NUMBER</label>
                    <input
                      type="text"
                      required
                      value={formData.cardNumber}
                      onChange={e => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-neutral-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-400 mb-1">EXPIRY DATE (MM/YY)</label>
                      <input
                        type="text"
                        required
                        value={formData.expDate}
                        onChange={e => setFormData({ ...formData, expDate: e.target.value })}
                        className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-neutral-600"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">SECURITY CODE (CVV)</label>
                      <input
                        type="password"
                        required
                        value={formData.cvv}
                        onChange={e => setFormData({ ...formData, cvv: e.target.value })}
                        className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-neutral-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Order Calculation Review */}
              <div className="p-4 border border-neutral-800 bg-neutral-950/60 space-y-1.5 text-neutral-400 text-xs">
                <div className="flex justify-between">
                  <span>SUBTOTAL ({items.length} ITEMS):</span>
                  <span className="text-white">${subtotal} USD</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>VIP PRIVILEGE:</span>
                    <span>-${discountAmount} USD</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>DISPATCH:</span>
                  <span className="text-white">
                    {shippingFee === 0 ? 'FREE (DHL AIR)' : `$${shippingFee} USD`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-neutral-800 text-sm font-bold text-white">
                  <span>TOTAL TO CHARGE:</span>
                  <span>${total} USD</span>
                </div>
              </div>

              {/* Navigation Action Buttons */}
              <div className="flex gap-3">
                {step === 'payment' && (
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="px-4 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 text-xs cursor-pointer"
                  >
                    BACK
                  </button>
                )}

                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                >
                  <span>
                    {step === 'shipping' ? 'CONTINUE TO PAYMENT' : `AUTHORIZE $${total} USD`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
