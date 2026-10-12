import React, { useState } from 'react';
import { Garment } from '../types';
import { useCart } from '../context/CartContext';
import { useBrandAssets } from '../context/AssetContext';
import { Shield, Sparkles, Check, ChevronRight, Layers, Maximize2 } from 'lucide-react';

interface DropSpotlightProps {
  garment: Garment;
  onOpenDetails: (garment: Garment) => void;
}

export const DropSpotlight: React.FC<DropSpotlightProps> = ({ garment, onOpenDetails }) => {
  const { addToCart } = useCart();
  const { getAssetUrl } = useBrandAssets();
  const [selectedSize, setSelectedSize] = useState<string>(garment.sizes[0]);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [added, setAdded] = useState(false);

  // Dynamic visual resolving with asset keys
  const displayImages = [
    getAssetUrl(garment.primaryAssetKey || '_DSC5770.JPG'),
    getAssetUrl('_DSC5675.JPG'),
    getAssetUrl('_DSC5791.JPG'),
  ];

  const handleAdd = () => {
    addToCart(garment, selectedSize, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const currentStock = garment.stockPerSize[selectedSize] || 0;

  return (
    <section className="py-20 border-b border-neutral-900 bg-neutral-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-6 border-b border-neutral-900">
          <div>
            <div className="flex items-center gap-2 font-mono-code text-xs text-neutral-400 mb-2">
              <span className="w-2 h-2 bg-emerald-400 inline-block" />
              <span>COLLECTION 0x02 // FLAGSHIP PIECE</span>
              <span className="text-neutral-600">·</span>
              <span>EDITION {garment.editionNumber}</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              {garment.title}
            </h2>
          </div>

          <div className="font-mono-code text-right">
            <span className="text-2xl font-bold text-white">${garment.price} USD</span>
            <span className="block text-[11px] text-neutral-500">DUTIES & TAXES INCLUDED</span>
          </div>
        </div>

        {/* Product Feature Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Visual Gallery with Angle Thumbnails */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/5] bg-neutral-900 border border-neutral-800 overflow-hidden group">
              <img
                src={displayImages[activeImageIdx]}
                alt={garment.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />

              <div className="absolute top-4 left-4 font-mono-code text-[11px] px-2.5 py-1 bg-black/75 backdrop-blur border border-white/10 text-neutral-300">
                FRAME: {activeImageIdx === 0 ? garment.primaryAssetKey : `ANGLE_${activeImageIdx + 1}`}
              </div>

              <button
                onClick={() => onOpenDetails(garment)}
                className="absolute bottom-4 right-4 p-2.5 bg-black/80 hover:bg-black text-white border border-neutral-700 transition-colors cursor-pointer"
                title="Full Inspection Dossier"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-3 gap-3">
              {displayImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`aspect-[4/3] bg-neutral-900 border overflow-hidden transition-all cursor-pointer ${
                    activeImageIdx === idx
                      ? 'border-white opacity-100 ring-1 ring-white'
                      : 'border-neutral-800 opacity-60 hover:opacity-90'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Technical Specs & Purchase Configuration */}
          <div className="lg:col-span-5 space-y-8 font-mono-code">
            <div>
              <span className="text-xs text-neutral-500 tracking-wider uppercase block mb-1">
                MATERIAL ARCHITECTURE
              </span>
              <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                {garment.description}
              </p>
            </div>

            {/* Engineering Highlights */}
            <div className="p-5 border border-neutral-800/80 bg-neutral-900/30 space-y-3">
              <span className="text-[11px] text-neutral-400 font-semibold tracking-wider block uppercase flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-neutral-300" />
                FABRICATION ATTRIBUTES
              </span>
              <ul className="space-y-2 text-xs text-neutral-300">
                {garment.fabricationDetails.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-neutral-500 mt-0.5">▪</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400 uppercase">SELECT SIZE</span>
                <button
                  onClick={() => onOpenDetails(garment)}
                  className="text-neutral-400 hover:text-white underline underline-offset-2"
                >
                  MEASUREMENT MATRIX
                </button>
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
                      className={`py-3 text-center border font-mono-code text-xs transition-all cursor-pointer ${
                        !isAvailable
                          ? 'border-neutral-900 bg-neutral-950 text-neutral-600 line-through cursor-not-allowed'
                          : isSelected
                          ? 'border-white bg-white text-neutral-950 font-bold'
                          : 'border-neutral-800 bg-neutral-900/50 text-neutral-300 hover:border-neutral-600'
                      }`}
                    >
                      <span className="block text-sm">{size}</span>
                      <span className="block text-[9px] mt-0.5 opacity-70">
                        {isAvailable ? `${stock} LEFT` : 'DEPLETED'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Purchase CTA Island */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAdd}
                className="w-full py-4 bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>RESERVED TO BAG</span>
                  </>
                ) : (
                  <>
                    <span>ADD TO BAG // SIZE {selectedSize} (${garment.price})</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onOpenDetails(garment)}
                className="w-full py-3 bg-transparent hover:bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>VIEW COMPLETE DOSSIER & MEASUREMENTS</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-2 border-t border-neutral-900">
              <span>EXPRESS DHL GLOBAL</span>
              <span>·</span>
              <span>14-DAY ARCHIVAL RETURNS</span>
              <span>·</span>
              <span>AUTHENTICITY GUARANTEED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
