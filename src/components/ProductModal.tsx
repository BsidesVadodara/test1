import React, { useState, useEffect } from 'react';
import { Garment } from '../types';
import { useCart } from '../context/CartContext';
import { useBrandAssets } from '../context/AssetContext';
import { X, Check, ShieldCheck, Ruler, ArrowRight, Truck, RefreshCw } from 'lucide-react';

interface ProductModalProps {
  garment: Garment | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ garment, onClose }) => {
  const { addToCart } = useCart();
  const { getAssetUrl } = useBrandAssets();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'measurements' | 'care'>('specs');
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (garment) {
      setSelectedSize(garment.sizes[0] || '');
      setActiveImageIdx(0);
      setQuantity(1);
    }
  }, [garment]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!garment) return null;

  // Resolve images dynamically through asset context
  const primaryResolved = getAssetUrl(garment.primaryAssetKey || garment.images[0]);
  const allImages = [
    primaryResolved,
    ...garment.images.filter(img => img !== primaryResolved),
  ];

  const currentStock = garment.stockPerSize[selectedSize] || 0;
  const isArchived = garment.status === 'archived';

  const handleAdd = () => {
    if (isArchived) return;
    addToCart(garment, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#09090c] border border-neutral-800 shadow-2xl overflow-hidden max-h-[95vh] flex flex-col my-auto">
        {/* Top Modal Bar */}
        <div className="px-6 py-4 border-b border-neutral-800/80 flex items-center justify-between font-mono-code text-xs text-neutral-400 bg-neutral-950/80">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold">{garment.serialCode}</span>
            <span className="text-neutral-600">/</span>
            <span>DROP {garment.drop}</span>
            {garment.editionNumber && (
              <>
                <span className="text-neutral-600">/</span>
                <span className="text-neutral-400">{garment.editionNumber}</span>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Visual Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[3/4] bg-neutral-950 border border-neutral-800/80 overflow-hidden">
              <img
                src={allImages[activeImageIdx] || primaryResolved}
                alt={garment.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-3 left-3 font-mono-code text-[10px] px-2 py-0.5 bg-black/75 backdrop-blur border border-white/10 text-neutral-300">
                FRAME: {activeImageIdx === 0 && garment.primaryAssetKey ? garment.primaryAssetKey : `VIEW_0${activeImageIdx + 1}`}
              </div>
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-20 aspect-[3/4] border overflow-hidden transition-all cursor-pointer ${
                      activeImageIdx === idx
                        ? 'border-white opacity-100 ring-1 ring-white'
                        : 'border-neutral-800 opacity-60 hover:opacity-90'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Garment Information & Sizing Matrix */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                  {garment.title}
                </h2>
                <div className="mt-2 font-mono-code text-xl font-bold text-white">
                  ${garment.price} USD
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                {garment.description}
              </p>

              {/* Navigation Tabs for In-depth Dossier */}
              <div className="pt-2 border-b border-neutral-800 flex gap-6 font-mono-code text-xs">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'specs'
                      ? 'border-b-2 border-white text-white font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  SPECIFICATIONS
                </button>
                <button
                  onClick={() => setActiveTab('measurements')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'measurements'
                      ? 'border-b-2 border-white text-white font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  MEASUREMENTS MATRIX
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'care'
                      ? 'border-b-2 border-white text-white font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  CARE & SUSTAINABILITY
                </button>
              </div>

              {/* Tab Contents */}
              {activeTab === 'specs' && (
                <div className="space-y-3 font-mono-code text-xs pt-2">
                  <div className="flex justify-between py-1.5 border-b border-neutral-900">
                    <span className="text-neutral-500">COMPOSITION</span>
                    <span className="text-neutral-200 text-right">{garment.composition}</span>
                  </div>
                  {garment.gsmWeight && (
                    <div className="flex justify-between py-1.5 border-b border-neutral-900">
                      <span className="text-neutral-500">WEIGHT / DENSITY</span>
                      <span className="text-neutral-200">{garment.gsmWeight}</span>
                    </div>
                  )}
                  <div className="py-2">
                    <span className="text-neutral-500 block mb-2">FABRICATION DETAILS:</span>
                    <ul className="space-y-1.5 text-neutral-300">
                      {garment.fabricationDetails.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-neutral-600">▫</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'measurements' && (
                <div className="space-y-3 font-mono-code text-xs pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-neutral-400 flex items-center gap-1.5">
                      <Ruler className="w-3.5 h-3.5" /> EXACT PATTERN SPEC
                    </span>
                    <div className="flex border border-neutral-800 rounded overflow-hidden">
                      <button
                        onClick={() => setUnit('cm')}
                        className={`px-2 py-0.5 text-[10px] ${unit === 'cm' ? 'bg-white text-black font-bold' : 'text-neutral-400'}`}
                      >
                        CM
                      </button>
                      <button
                        onClick={() => setUnit('in')}
                        className={`px-2 py-0.5 text-[10px] ${unit === 'in' ? 'bg-white text-black font-bold' : 'text-neutral-400'}`}
                      >
                        IN
                      </button>
                    </div>
                  </div>

                  <div className="border border-neutral-800 overflow-x-auto">
                    <table className="w-full text-left text-neutral-300">
                      <thead className="bg-neutral-900/60 text-neutral-400 text-[10px] uppercase">
                        <tr>
                          <th className="p-2">SIZE</th>
                          <th className="p-2">CHEST/WAIST</th>
                          <th className="p-2">LENGTH</th>
                          <th className="p-2">SLEEVE</th>
                          <th className="p-2">SHOULDER</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-900">
                        {garment.measurements.map(m => (
                          <tr
                            key={m.size}
                            className={selectedSize === m.size ? 'bg-neutral-900/80 text-white font-bold' : ''}
                          >
                            <td className="p-2 font-semibold text-white">{m.size}</td>
                            <td className="p-2">{m.chest}</td>
                            <td className="p-2">{m.length}</td>
                            <td className="p-2">{m.sleeve}</td>
                            <td className="p-2">{m.shoulder}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[10px] text-neutral-500">
                    Modeled true to architectural oversized fit. For closer silhouette, size down one step.
                  </p>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="space-y-3 font-mono-code text-xs pt-2">
                  <div className="p-3 bg-neutral-900/40 border border-neutral-800/80">
                    <span className="text-neutral-400 block mb-1">CARE INSTRUCTIONS</span>
                    <p className="text-neutral-200">{garment.careInstructions}</p>
                  </div>
                  <div className="p-3 bg-neutral-900/40 border border-neutral-800/80">
                    <span className="text-neutral-400 block mb-1">SUSTAINABILITY COMMITMENT</span>
                    <p className="text-neutral-200">
                      Zero deadstock protocol. Only organic GOTS certified long-staple cotton and recycled tech membranes are utilized. Finished with non-toxic closed-loop silicone softening baths.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Sizing & Add to Bag Actions */}
            <div className="pt-4 border-t border-neutral-800 space-y-4 font-mono-code">
              {!isArchived ? (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-neutral-400">SELECT SIZE:</span>
                      <span className="text-neutral-500 text-[11px]">
                        {currentStock > 0 ? `${currentStock} UNITS ALLOCATED` : 'DEPLETED'}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {garment.sizes.map(size => {
                        const stock = garment.stockPerSize[size] || 0;
                        const isAvailable = stock > 0;
                        const isSelected = selectedSize === size;

                        return (
                          <button
                            key={size}
                            disabled={!isAvailable}
                            onClick={() => setSelectedSize(size)}
                            className={`py-2.5 text-center border text-xs transition-all cursor-pointer ${
                              !isAvailable
                                ? 'border-neutral-900 bg-neutral-950 text-neutral-600 line-through cursor-not-allowed'
                                : isSelected
                                ? 'border-white bg-white text-neutral-950 font-bold'
                                : 'border-neutral-800 bg-neutral-900/40 text-neutral-300 hover:border-neutral-600'
                            }`}
                          >
                            <span className="block">{size}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quantity and CTA */}
                  <div className="flex gap-3">
                    <div className="flex items-center border border-neutral-800 bg-neutral-900">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-3 text-neutral-400 hover:text-white"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-bold text-white">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(currentStock || 5, quantity + 1))}
                        className="px-3 py-3 text-neutral-400 hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={handleAdd}
                      className="flex-1 py-3.5 bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      {added ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>ADDED TO BAG</span>
                        </>
                      ) : (
                        <span>ADD TO BAG // ${garment.price * quantity} USD</span>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-4 border border-neutral-800 bg-neutral-950 text-center">
                  <span className="text-xs text-neutral-400 block font-bold">
                    ARCHIVED COLLECTION PIECE
                  </span>
                  <span className="text-[11px] text-neutral-500 block mt-1">
                    Production run completed. Inquire via studio for archival private acquisition.
                  </span>
                </div>
              )}

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-2 text-[10px] text-neutral-500 pt-2 border-t border-neutral-900">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3 h-3 text-neutral-400" /> DISPATCH WITHIN 24 HOURS
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-neutral-400" /> CERTIFICATE OF ORIGIN INCLUDED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
