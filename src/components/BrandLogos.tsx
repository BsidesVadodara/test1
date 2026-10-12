import React from 'react';
import { useBrandAssets } from '../context/AssetContext';

interface LogoProps {
  variant?: '0x01-light' | '0x01-dark' | '0x02-stylized' | '0x02-plain' | 'about-seal';
  className?: string;
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<LogoProps> = ({
  variant = '0x01-light',
  className = 'h-8',
  showSubtitle = false,
}) => {
  const { assets, getAssetUrl, isCustomized } = useBrandAssets();

  // Determine asset filename
  let filename = '0x01 LOGO-w.png';
  if (variant === '0x01-dark') filename = '0x01 PLAIN BLACK.png';
  if (variant === '0x02-stylized') filename = '0x02 logo.png';
  if (variant === '0x02-plain') filename = '0x02 plain logo.png';
  if (variant === 'about-seal') filename = 'logo to use in about section.jpeg';

  const customized = isCustomized(filename);
  const assetUrl = getAssetUrl(filename);

  // If user has provided a custom image file via the Asset Vault, render their actual uploaded file
  if (customized) {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <img
          src={assetUrl}
          alt={`0x01 ${variant}`}
          className="max-h-full max-w-full object-contain filter drop-shadow"
        />
        {showSubtitle && (
          <span className="font-mono-code text-[10px] tracking-widest text-neutral-400 uppercase">
            STUDIO ARCHIVE
          </span>
        )}
      </div>
    );
  }

  // High-concept bespoke SVG marks for the brand variants
  if (variant === '0x01-light') {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        <div className="flex items-center">
          {/* Brutalist geometric monogram */}
          <div className="relative flex items-center justify-center w-7 h-7 border border-white/90 bg-neutral-950 font-mono-code text-xs font-semibold text-white tracking-tighter">
            <span className="relative z-10 text-[11px]">01</span>
            <div className="absolute inset-0 border border-white/20 translate-x-0.5 translate-y-0.5 pointer-events-none" />
          </div>
          <span className="ml-2 font-display font-extrabold tracking-[-0.06em] text-lg text-white">
            0x01
          </span>
        </div>
        {showSubtitle && (
          <span className="font-mono-code text-[10px] tracking-[0.25em] text-neutral-400 uppercase border-l border-neutral-800 pl-3">
            ATELIER // ARCHIVE
          </span>
        )}
      </div>
    );
  }

  if (variant === '0x01-dark') {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        <div className="flex items-center">
          <div className="relative flex items-center justify-center w-7 h-7 border border-neutral-900 bg-white font-mono-code text-xs font-semibold text-neutral-900 tracking-tighter">
            <span className="relative z-10 text-[11px]">01</span>
            <div className="absolute inset-0 border border-neutral-900/40 translate-x-0.5 translate-y-0.5 pointer-events-none" />
          </div>
          <span className="ml-2 font-display font-extrabold tracking-[-0.06em] text-lg text-neutral-900">
            0x01
          </span>
        </div>
      </div>
    );
  }

  if (variant === '0x02-stylized') {
    return (
      <div className={`inline-flex items-center gap-2 select-none ${className}`}>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-neutral-900 border border-neutral-700/80">
          <div className="w-2 h-2 bg-white" />
          <span className="font-display font-bold tracking-tight text-xs text-white uppercase">
            0X02 : SYNTAX
          </span>
          <span className="font-mono-code text-[9px] text-neutral-400 ml-1">COLLECTION</span>
        </div>
      </div>
    );
  }

  if (variant === '0x02-plain') {
    return (
      <div className={`inline-flex items-center gap-2 font-mono-code text-xs text-neutral-300 tracking-wider ${className}`}>
        <span className="text-white font-bold">[0x02]</span>
        <span className="text-neutral-500">/</span>
        <span className="text-neutral-400 tracking-widest text-[10px]">DROP 02</span>
      </div>
    );
  }

  // About Seal ("logo to use in about section.jpeg")
  return (
    <div className={`relative inline-flex flex-col items-center justify-center p-6 border border-neutral-800 bg-neutral-950/80 backdrop-blur ${className}`}>
      {/* Precision atelier crest */}
      <div className="relative w-24 h-24 mb-4 flex items-center justify-center border border-neutral-700">
        <div className="absolute inset-2 border border-neutral-800" />
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-neutral-400" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-neutral-400" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-neutral-400" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-neutral-400" />
        
        <div className="text-center font-mono-code">
          <span className="block font-display font-black text-2xl tracking-tighter text-white">0x01</span>
          <span className="block text-[8px] tracking-[0.3em] text-neutral-400 mt-0.5">STUDIO</span>
        </div>
      </div>

      <div className="text-center font-mono-code">
        <p className="text-[10px] tracking-[0.25em] text-neutral-300 font-semibold uppercase">
          REDUCTIVE GARMENT ATELIER
        </p>
        <p className="text-[9px] tracking-wider text-neutral-500 mt-1">
          PARIS · TOKYO · BERLIN · REYKJAVIK
        </p>
        <div className="mt-2 text-[8px] text-neutral-600 tracking-widest border-t border-neutral-900 pt-2">
          SERIAL NUMBER SPEC: 0X-ARCHIVE-REGISTER
        </div>
      </div>
    </div>
  );
};
