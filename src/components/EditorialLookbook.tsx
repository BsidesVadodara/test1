import React, { useState, useEffect } from 'react';
import { LookbookShot, Garment } from '../types';
import { useBrandAssets } from '../context/AssetContext';
import { Camera, MapPin, X, ChevronLeft, ChevronRight, ArrowUpRight, Layers } from 'lucide-react';

interface EditorialLookbookProps {
  shots: LookbookShot[];
  garments: Garment[];
  onSelectGarment: (garment: Garment) => void;
}

export const EditorialLookbook: React.FC<EditorialLookbookProps> = ({
  shots,
  garments,
  onSelectGarment,
}) => {
  const { getAssetUrl } = useBrandAssets();
  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const [activeShot, setActiveShot] = useState<LookbookShot | null>(null);

  const seriesTabs = [
    { id: 'all', label: 'ALL FRAMES (11)' },
    { id: 'DSC Photoshoot', label: 'DSC REEL (NIKON Z9)' },
    { id: 'Studio Fitting', label: 'STUDIO FITTINGS' },
    { id: 'Atelier Diary', label: 'ATELIER DIARY' },
  ];

  const filteredShots = shots.filter(
    s => selectedSeries === 'all' || s.series === selectedSeries
  );

  // Keyboard navigation for active lightbox
  useEffect(() => {
    if (!activeShot) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveShot(null);
      if (e.key === 'ArrowRight') {
        const idx = filteredShots.findIndex(s => s.id === activeShot.id);
        if (idx !== -1 && idx < filteredShots.length - 1) {
          setActiveShot(filteredShots[idx + 1]);
        }
      }
      if (e.key === 'ArrowLeft') {
        const idx = filteredShots.findIndex(s => s.id === activeShot.id);
        if (idx > 0) {
          setActiveShot(filteredShots[idx - 1]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeShot, filteredShots]);

  const activeIdx = activeShot ? filteredShots.findIndex(s => s.id === activeShot.id) : -1;

  return (
    <section id="editorial" className="py-24 border-b border-neutral-900 bg-[#09090c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-neutral-900">
          <div>
            <div className="flex items-center gap-2 font-mono-code text-xs text-neutral-400 mb-2">
              <Camera className="w-3.5 h-3.5 text-neutral-400" />
              <span>EDITORIAL CAMPAIGN // ARCHIVAL REEL</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              LOOKBOOK SPREAD
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono-code">
            {seriesTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedSeries(tab.id)}
                className={`px-3 py-1.5 text-xs transition-colors rounded cursor-pointer ${
                  selectedSeries === tab.id
                    ? 'bg-white text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white bg-neutral-900/60 border border-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredShots.map(shot => {
            const visualUrl = getAssetUrl(shot.filename);

            return (
              <div
                key={shot.id}
                onClick={() => setActiveShot(shot)}
                className="group relative border border-neutral-900 bg-neutral-950/60 overflow-hidden cursor-pointer flex flex-col justify-between hover:border-neutral-700 transition-all duration-300"
              >
                {/* Media Image */}
                <div
                  className={`relative overflow-hidden bg-neutral-900 ${
                    shot.aspectRatio === 'landscape'
                      ? 'aspect-[16/10]'
                      : shot.aspectRatio === 'square'
                      ? 'aspect-square'
                      : 'aspect-[3/4]'
                  }`}
                >
                  <img
                    src={visualUrl}
                    alt={shot.title}
                    className="w-full h-full object-cover filter contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-70 group-hover:opacity-90 transition-opacity pointer-events-none" />

                  {/* Frame Name Overlay */}
                  <div className="absolute top-3 left-3 font-mono-code text-[10px] px-2 py-0.5 bg-black/75 backdrop-blur border border-white/10 text-neutral-300">
                    {shot.filename}
                  </div>

                  {/* Shutter / ISO Telemetry */}
                  <div className="absolute bottom-3 left-3 font-mono-code text-[10px] text-white/90">
                    <span>{shot.cameraSpecs.lens}</span>
                    <span className="mx-1.5 text-neutral-500">·</span>
                    <span>{shot.cameraSpecs.shutter}</span>
                  </div>
                </div>

                {/* Editorial Caption Bar */}
                <div className="p-4 space-y-2 font-mono-code border-t border-neutral-900">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white truncate">{shot.title}</span>
                    <span className="text-[10px] text-neutral-500">{shot.series}</span>
                  </div>

                  <p className="text-xs text-neutral-400 font-sans line-clamp-2">
                    {shot.description}
                  </p>

                  <div className="pt-2 border-t border-neutral-900/80 flex items-center justify-between text-[11px] text-neutral-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-neutral-500" />
                      <span className="truncate max-w-[170px]">{shot.location}</span>
                    </span>
                    <span className="text-neutral-400 group-hover:text-white flex items-center gap-1 transition-colors">
                      VIEW FRAME <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeShot && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-lg flex items-center justify-center p-2 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-6xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden my-auto">
            {/* Top Bar */}
            <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between font-mono-code text-xs text-neutral-400">
              <div className="flex items-center gap-3">
                <span className="text-white font-bold">{activeShot.filename}</span>
                <span className="text-neutral-600">/</span>
                <span>{activeShot.title}</span>
                <span className="text-neutral-600">/</span>
                <span className="text-neutral-500">FRAME {activeIdx + 1} OF {filteredShots.length}</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    if (activeIdx > 0) setActiveShot(filteredShots[activeIdx - 1]);
                  }}
                  disabled={activeIdx === 0}
                  className="p-1 hover:text-white disabled:opacity-30 cursor-pointer"
                  title="Previous frame (Left arrow)"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    if (activeIdx < filteredShots.length - 1) {
                      setActiveShot(filteredShots[activeIdx + 1]);
                    }
                  }}
                  disabled={activeIdx === filteredShots.length - 1}
                  className="p-1 hover:text-white disabled:opacity-30 cursor-pointer"
                  title="Next frame (Right arrow)"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveShot(null)}
                  className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Lightbox Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[82vh]">
              {/* Image Frame */}
              <div className="lg:col-span-8 bg-black flex items-center justify-center p-4 overflow-hidden">
                <img
                  src={getAssetUrl(activeShot.filename)}
                  alt={activeShot.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain filter contrast-105"
                />
              </div>

              {/* Shot Details Sidebar */}
              <div className="lg:col-span-4 p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-neutral-800 space-y-6 overflow-y-auto font-mono-code text-xs">
                <div>
                  <span className="text-[10px] text-neutral-500 tracking-widest uppercase block mb-1">
                    FRAME IDENTIFIER
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-white tracking-tight">
                    {activeShot.title}
                  </h3>
                  <div className="text-neutral-400 mt-2 font-sans text-sm leading-relaxed">
                    {activeShot.description}
                  </div>
                </div>

                {/* Camera Technical Telemetry */}
                <div className="p-4 bg-neutral-900/50 border border-neutral-800 space-y-2">
                  <span className="text-[11px] text-white font-bold block mb-2 flex items-center gap-2">
                    <Camera className="w-3.5 h-3.5 text-neutral-300" />
                    CAMERA EXPOSURE METADATA
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-neutral-400 text-[11px]">
                    <div>
                      <span className="text-neutral-500 block">SYSTEM:</span>
                      <span className="text-white">{activeShot.cameraSpecs.camera}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">OPTICS:</span>
                      <span className="text-white">{activeShot.cameraSpecs.lens}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">SENSITIVITY:</span>
                      <span className="text-white">{activeShot.cameraSpecs.iso}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">EXPOSURE:</span>
                      <span className="text-white">
                        {activeShot.cameraSpecs.shutter} @ {activeShot.cameraSpecs.aperture}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <span className="text-[10px] text-neutral-500 tracking-widest uppercase block mb-1">
                    SHOOT LOCATION
                  </span>
                  <div className="flex items-center gap-2 text-neutral-300">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{activeShot.location}</span>
                  </div>
                </div>

                {/* Featured Silhouettes with quick-link to garment */}
                <div>
                  <span className="text-[10px] text-neutral-500 tracking-widest uppercase block mb-2">
                    FEATURED SILHOUETTES
                  </span>
                  <div className="space-y-2">
                    {activeShot.featuredGarments.map(serial => {
                      const garment = garments.find(g => g.serialCode === serial);
                      if (!garment) return null;

                      return (
                        <div
                          key={serial}
                          onClick={() => {
                            setActiveShot(null);
                            onSelectGarment(garment);
                          }}
                          className="p-2.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 cursor-pointer flex items-center justify-between transition-colors group"
                        >
                          <div>
                            <span className="block font-bold text-white group-hover:text-neutral-200">
                              {garment.serialCode}
                            </span>
                            <span className="text-[10px] text-neutral-400 truncate block max-w-[200px]">
                              {garment.title}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="block text-emerald-400 font-bold">${garment.price}</span>
                            <span className="text-[9px] text-neutral-500">INSPECT</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
