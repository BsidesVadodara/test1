import React, { useState, useMemo } from 'react';
import { Garment, DropCategory, ProductCategory } from '../types';
import { useCart } from '../context/CartContext';
import { useBrandAssets } from '../context/AssetContext';
import { ArrowUpRight, Plus, Check, SlidersHorizontal, Search } from 'lucide-react';

interface GarmentGridProps {
  garments: Garment[];
  onOpenDetails: (garment: Garment) => void;
  selectedDrop: DropCategory;
  setSelectedDrop: (drop: DropCategory) => void;
}

export const GarmentGrid: React.FC<GarmentGridProps> = ({
  garments,
  onOpenDetails,
  selectedDrop,
  setSelectedDrop,
}) => {
  const { addToCart } = useCart();
  const { getAssetUrl } = useBrandAssets();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'ALL CATEGORIES' },
    { id: 'outerwear', label: 'OUTERWEAR' },
    { id: 'tops', label: 'TOPS & FLEECE' },
    { id: 'bottoms', label: 'TROUSERS' },
    { id: 'hardware', label: 'HARDWARE' },
    { id: 'objects', label: 'OBJECTS' },
  ];

  const filteredGarments = useMemo(() => {
    return garments.filter(g => {
      const matchDrop = selectedDrop === 'all' || g.drop === selectedDrop;
      const matchCategory = selectedCategory === 'all' || g.category === selectedCategory;
      const matchQuery =
        !searchQuery ||
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.serialCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.composition.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDrop && matchCategory && matchQuery;
    });
  }, [garments, selectedDrop, selectedCategory, searchQuery]);

  const handleQuickAdd = (e: React.MouseEvent, garment: Garment) => {
    e.stopPropagation();
    const defaultSize = garment.sizes[0];
    addToCart(garment, defaultSize, 1);
    setAddedId(garment.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section id="drops" className="py-20 border-b border-neutral-900 bg-[#08080a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-neutral-900">
          <div>
            <div className="text-xs font-mono-code text-neutral-400 mb-2 tracking-widest uppercase">
              STUDIO CATALOG // SERIAL RELEASES
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              GARMENT REGISTRY
            </h2>
          </div>

          <p className="text-xs font-mono-code text-neutral-400 max-w-md">
            All silhouettes are patterned in-house with zero seasonal obsolescence. 
            Numbered editions limited to 100 units maximum globally.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-10 font-mono-code">
          {/* Segmented Drop Selector Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex p-1 bg-neutral-900/90 border border-neutral-800 rounded">
              <button
                onClick={() => setSelectedDrop('all')}
                className={`px-4 py-2 text-xs font-semibold rounded transition-colors cursor-pointer ${
                  selectedDrop === 'all'
                    ? 'bg-white text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                ALL ARCHIVES ({garments.length})
              </button>
              <button
                onClick={() => setSelectedDrop('0x02')}
                className={`px-4 py-2 text-xs font-semibold rounded transition-colors cursor-pointer ${
                  selectedDrop === '0x02'
                    ? 'bg-white text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                DROP 0x02 [CURRENT]
              </button>
              <button
                onClick={() => setSelectedDrop('0x01')}
                className={`px-4 py-2 text-xs font-semibold rounded transition-colors cursor-pointer ${
                  selectedDrop === '0x01'
                    ? 'bg-white text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                DROP 0x01 [ARCHIVE]
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="SEARCH SERIAL OR FABRIC..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-neutral-900/60 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 rounded"
              />
            </div>
          </div>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs transition-colors rounded cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-[11px] font-mono-code text-neutral-500 mb-6 flex items-center justify-between">
          <span>SHOWING {filteredGarments.length} GARMENTS</span>
          <span>CURRENCY : USD</span>
        </div>

        {/* Garment Cards Grid */}
        {filteredGarments.length === 0 ? (
          <div className="py-20 text-center border border-neutral-900 bg-neutral-950/40 font-mono-code">
            <p className="text-neutral-400 text-sm">NO PIECES FOUND MATCHING SELECTED CRITERIA</p>
            <button
              onClick={() => {
                setSelectedDrop('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-neutral-900 text-xs text-white border border-neutral-800 hover:bg-neutral-800 cursor-pointer"
            >
              RESET FILTER PARAMETERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredGarments.map(garment => {
              const primaryImg = getAssetUrl(garment.primaryAssetKey || garment.images[0]);
              const isAdded = addedId === garment.id;

              return (
                <div
                  key={garment.id}
                  onClick={() => onOpenDetails(garment)}
                  className="group relative flex flex-col justify-between border border-neutral-900 hover:border-neutral-700 bg-neutral-950/40 transition-all duration-300 cursor-pointer"
                >
                  {/* Top Metadata Kicker (Anti-slop: clean text, no pill capsules!) */}
                  <div className="p-3.5 pb-0 flex items-center justify-between font-mono-code text-[11px] text-neutral-400 border-b border-transparent group-hover:border-neutral-900 transition-colors">
                    <span className="font-semibold text-neutral-300">{garment.serialCode}</span>
                    <div className="flex items-center gap-1.5 text-neutral-500">
                      <span>DROP {garment.drop}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-neutral-400">{garment.category.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Garment Image Showcase */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900/60 my-2">
                    <img
                      src={primaryImg}
                      alt={garment.title}
                      className="w-full h-full object-cover filter contrast-[1.02] brightness-95 transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Quick Add Overlay Button */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={e => handleQuickAdd(e, garment)}
                        disabled={garment.status === 'archived'}
                        className={`p-2.5 font-mono-code text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-lg ${
                          garment.status === 'archived'
                            ? 'bg-neutral-900 text-neutral-600 cursor-not-allowed'
                            : isAdded
                            ? 'bg-emerald-500 text-white'
                            : 'bg-white hover:bg-neutral-200 text-neutral-950'
                        }`}
                        title={
                          garment.status === 'archived'
                            ? 'Archived Piece'
                            : `Quick add default size (${garment.sizes[0]})`
                        }
                      >
                        {isAdded ? (
                          <Check className="w-4 h-4" />
                        ) : garment.status === 'archived' ? (
                          <span className="text-[10px]">ARCHIVE</span>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-bold">ADD ({garment.sizes[0]})</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Stock Status Tagging */}
                    {garment.status === 'low_stock' && (
                      <div className="absolute top-3 left-3 font-mono-code text-[10px] px-2 py-0.5 bg-amber-950/80 text-amber-300 border border-amber-800/60 backdrop-blur">
                        LOW INVENTORY
                      </div>
                    )}
                    {garment.status === 'archived' && (
                      <div className="absolute top-3 left-3 font-mono-code text-[10px] px-2 py-0.5 bg-neutral-900/90 text-neutral-400 border border-neutral-800 backdrop-blur">
                        ARCHIVED ARCHITECTURE
                      </div>
                    )}
                  </div>

                  {/* Garment Title and Price Footer */}
                  <div className="p-4 pt-1 space-y-2">
                    <h3 className="font-display font-bold text-base text-white group-hover:text-neutral-200 transition-colors">
                      {garment.title}
                    </h3>

                    {/* Composition & GSM snippet */}
                    <div className="text-xs text-neutral-400 line-clamp-1 font-sans">
                      {garment.composition}
                    </div>

                    <div className="pt-2 border-t border-neutral-900/80 flex items-center justify-between font-mono-code text-xs">
                      <span className="text-white font-semibold">${garment.price} USD</span>
                      <span className="text-neutral-500 text-[11px] group-hover:text-neutral-300 flex items-center gap-1 transition-colors">
                        DETAILS <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
