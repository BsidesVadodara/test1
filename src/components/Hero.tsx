import React from 'react';
import { ArrowDown, ArrowUpRight, ShieldCheck, Cpu, Terminal } from 'lucide-react';
import { BrandLogo } from './BrandLogos';
import { useBrandAssets } from '../context/AssetContext';

interface HeroProps {
  onExploreCurrent: () => void;
  onExploreArchive: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCurrent, onExploreArchive }) => {
  const { getAssetUrl } = useBrandAssets();

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between border-b border-neutral-900 bg-subtle-grid overflow-hidden">
      {/* Background atmospheric gradient */}
      <div className="absolute inset-0 bg-radial-at-t from-neutral-900/40 via-neutral-950/80 to-[#08080a] pointer-events-none" />

      {/* Decorative Technical Grid Coordinates */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10 pb-6 flex items-center justify-between text-[10px] font-mono-code text-neutral-500">
        <div className="flex items-center gap-3">
          <Terminal className="w-3.5 h-3.5 text-neutral-400" />
          <span>MANIFEST : [BUILD.0X01.STU]</span>
          <span className="hidden sm:inline text-neutral-700">|</span>
          <span className="hidden sm:inline">COORDINATES : 48.8566° N, 2.3522° E</span>
        </div>
        <div className="flex items-center gap-4">
          <span>RUN : 100 SERIALIZED RUNS</span>
          <span className="text-neutral-700">|</span>
          <span className="text-emerald-400">STATUS : ACTIVE DISPATCH</span>
        </div>
      </div>

      {/* Main Hero Stage */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-16 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Manifesto & Brand Heading */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <BrandLogo variant="0x02-stylized" />
                <span className="text-neutral-500 font-mono-code text-xs">/</span>
                <span className="text-xs font-mono-code tracking-widest text-neutral-400 uppercase">
                  AUTUMN ARCHIVAL CHAPTER
                </span>
              </div>

              <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.05em] text-white leading-[0.92]">
                ARCHIVAL
                <span className="block text-neutral-400">GARMENT</span>
                <span className="block italic text-white/90">SYNTAX.</span>
              </h1>
            </div>

            <p className="max-w-xl text-neutral-300 text-base sm:text-lg leading-relaxed font-light">
              <strong className="text-white font-medium">0x01</strong> operates as a reductive apparel atelier. 
              We engineer technical silhouettes at the boundary of brutalist architecture and human ergonomics. 
              Milled in limited serial batches using Japanese membranes and cold-treated raw fibers.
            </p>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono-code">
              <button
                onClick={onExploreCurrent}
                className="px-6 py-3.5 bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-2 group cursor-pointer shadow-lg"
              >
                <span>DISCOVER DROP 0x02</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={onExploreArchive}
                className="px-6 py-3.5 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 text-xs font-medium tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>DROP 0x01 ARCHIVE</span>
                <span className="text-neutral-500">[5 ITEMS]</span>
              </button>
            </div>

            {/* Atelier Verification Pillars */}
            <div className="pt-6 border-t border-neutral-900/80 grid grid-cols-3 gap-6 text-xs font-mono-code text-neutral-400">
              <div>
                <span className="block text-white font-semibold text-sm">320-680 GSM</span>
                <span className="text-neutral-500 text-[11px]">Heavyweight Density</span>
              </div>
              <div>
                <span className="block text-white font-semibold text-sm">GRADE 5 TI</span>
                <span className="text-neutral-500 text-[11px]">Industrial Hardware</span>
              </div>
              <div>
                <span className="block text-white font-semibold text-sm">LIMITED 100</span>
                <span className="text-neutral-500 text-[11px]">Serialized Edition</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Monolith */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none border border-neutral-800 bg-neutral-900/40 p-3 backdrop-blur">
              {/* Corner brackets */}
              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-white" />
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-white" />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white" />

              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-950 group">
                <img
                  src={getAssetUrl('_DSC5675.JPG')}
                  alt="0x01 Editorial Campaign Monolith"
                  className="w-full h-full object-cover filter contrast-105 brightness-95 transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Visual Overlay Tagging */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/20 pointer-events-none" />

                <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono-code text-white/90 drop-shadow">
                  <span className="px-2 py-0.5 bg-black/60 backdrop-blur border border-white/20">
                    CAMPAIGN FRAME : _DSC5675.JPG
                  </span>
                  <span className="px-2 py-0.5 bg-black/60 backdrop-blur border border-white/20">
                    NIKON Z9 // 50MM
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono-code text-white drop-shadow">
                  <div className="p-3 bg-neutral-950/85 backdrop-blur border border-neutral-800">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-semibold text-white">0X02-PRK-01</span>
                      <span className="text-emerald-400 text-[11px]">$740 USD</span>
                    </div>
                    <div className="text-[11px] text-neutral-400 truncate">
                      SYNTAX WELDED SEAM STORM PARKA
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Caption Bar */}
              <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono-code text-neutral-500 px-1">
                <span>STUDIO SHOT ARCHIVE</span>
                <span>LOOK 01 OF 14</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Runway Continuous Scrolling Marquee */}
      <div className="relative z-10 border-t border-neutral-900 bg-neutral-950 py-3 overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite] gap-8 text-xs font-mono-code tracking-[0.2em] text-neutral-400">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-white font-semibold">0X01 ATELIER</span>
              <span className="text-neutral-600">///</span>
              <span>DROP 0x02 "SYNTAX" IS LIVE</span>
              <span className="text-neutral-600">///</span>
              <span>JAPANESE TECHNICAL LAMINATE</span>
              <span className="text-neutral-600">///</span>
              <span>GRADE 5 TITANIUM HARDWARE</span>
              <span className="text-neutral-600">///</span>
              <span>520 GSM LOOPBACK FLEECE</span>
              <span className="text-neutral-600">///</span>
              <span>LIMITED SERIALIZED RUNS</span>
              <span className="text-neutral-600">///</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
