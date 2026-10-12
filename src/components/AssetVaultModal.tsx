import React, { useState, useRef } from 'react';
import { useBrandAssets } from '../context/AssetContext';
import {
  X,
  Upload,
  Check,
  RotateCcw,
  Layers,
  FileImage,
  Sparkles,
  Info,
  Download,
} from 'lucide-react';

interface AssetVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssetVaultModal: React.FC<AssetVaultModalProps> = ({ isOpen, onClose }) => {
  const { assets, getAssetUrl, updateAsset, resetAsset, resetAllAssets, isCustomized } =
    useBrandAssets();
  const [filter, setFilter] = useState<'all' | 'logo' | 'photoshoot' | 'fitting' | 'diary'>('all');
  const [dragOverGlobal, setDragOverGlobal] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const globalFileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const assetList = Object.values(assets);
  const filteredAssets = assetList.filter(
    a => filter === 'all' || a.category === filter
  );

  const customCount = assetList.filter(a => isCustomized(a.filename)).length;

  const handleSingleFileUpload = (filename: string, file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      if (typeof e.target?.result === 'string') {
        updateAsset(filename, e.target.result);
        setFeedback(`UPDATED [${filename}] WITH LOCAL ASSET`);
        setTimeout(() => setFeedback(null), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBatchFiles = (files: FileList | File[]) => {
    let matched = 0;
    Array.from(files).forEach(file => {
      // Find asset with matching filename or close name
      const target = assetList.find(
        a =>
          a.filename.toLowerCase() === file.name.toLowerCase() ||
          file.name.toLowerCase().includes(a.filename.toLowerCase().replace(/\.[^/.]+$/, ''))
      );

      if (target) {
        matched++;
        const reader = new FileReader();
        reader.onload = e => {
          if (typeof e.target?.result === 'string') {
            updateAsset(target.filename, e.target.result);
          }
        };
        reader.readAsDataURL(file);
      }
    });

    if (matched > 0) {
      setFeedback(`SUCCESSFULLY BENT ${matched} LOCAL FILES TO MATCHING SLOTS`);
    } else {
      setFeedback('NO EXACT FILENAME MATCH FOUND. YOU CAN CLICK INDIVIDUAL SLOTS TO BIND MANUALLY.');
    }
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleGlobalDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverGlobal(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleBatchFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in font-mono-code">
      <div className="relative w-full max-w-6xl bg-[#09090c] border border-neutral-800 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between text-xs text-neutral-400 bg-neutral-950">
          <div className="flex items-center gap-3">
            <Layers className="w-4 h-4 text-white" />
            <h2 className="text-white font-bold uppercase tracking-wider text-xs">
              0x01 BRAND ASSET VAULT (19 SLOTS)
            </h2>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-400">
              {customCount} OF 19 CUSTOM FILES LOADED
            </span>
          </div>

          <div className="flex items-center gap-3">
            {customCount > 0 && (
              <button
                onClick={resetAllAssets}
                className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>RESET ALL DEFAULTS</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Batch Drop Banner */}
        <div
          onDragOver={e => {
            e.preventDefault();
            setDragOverGlobal(true);
          }}
          onDragLeave={() => setDragOverGlobal(false)}
          onDrop={handleGlobalDrop}
          className={`px-6 py-5 border-b transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            dragOverGlobal
              ? 'bg-neutral-800 border-white text-white'
              : 'bg-neutral-900/40 border-neutral-800/80 text-neutral-300'
          }`}
        >
          <div className="flex items-start gap-3">
            <Upload className="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-white uppercase">
                DIRECT FILE BINDING ENGINE
              </p>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Drop your actual 19 uploaded files here (e.g. <code>_DSC5675.JPG</code>, <code>0x01 LOGO-w.png</code>, <code>logo to use in about section.jpeg</code>). They will be automatically matched and immediately applied across the store.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              multiple
              ref={globalFileInputRef}
              onChange={e => {
                if (e.target.files) handleBatchFiles(e.target.files);
              }}
              className="hidden"
              accept="image/*"
            />
            <button
              onClick={() => globalFileInputRef.current?.click()}
              className="px-4 py-2 bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs uppercase cursor-pointer"
            >
              BROWSE LOCAL FILES
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className="bg-emerald-950 border-b border-emerald-800 px-6 py-2.5 text-xs text-emerald-300 flex items-center justify-between">
            <span>{feedback}</span>
            <button onClick={() => setFeedback(null)}>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Category Tabs */}
        <div className="px-6 py-3 border-b border-neutral-800 bg-neutral-950/70 flex flex-wrap items-center gap-2 text-xs">
          {[
            { id: 'all', label: `ALL ASSETS (${assetList.length})` },
            { id: 'logo', label: 'LOGOS & EMBLEMS (5)' },
            { id: 'photoshoot', label: 'DSC PHOTOSHOOT (6)' },
            { id: 'fitting', label: 'STUDIO FITTINGS (2)' },
            { id: 'diary', label: 'ATELIER DIARY (6)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`px-3 py-1.5 transition-colors cursor-pointer rounded ${
                filter === tab.id
                  ? 'bg-neutral-800 text-white font-bold border border-neutral-700'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Asset Cards Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map(asset => {
            const isCustom = isCustomized(asset.filename);
            const currentUrl = getAssetUrl(asset.filename);

            return (
              <div
                key={asset.filename}
                className="border border-neutral-800 bg-neutral-950/60 p-4 flex flex-col justify-between space-y-4 hover:border-neutral-700 transition-colors"
              >
                {/* Header Information */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-bold text-white text-xs break-all">
                      {asset.filename}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 border ${
                        isCustom
                          ? 'border-emerald-600 bg-emerald-950/60 text-emerald-300'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-500'
                      }`}
                    >
                      {isCustom ? 'LOCAL ACTIVE' : 'DEFAULT'}
                    </span>
                  </div>

                  <p className="text-[11px] text-neutral-400 font-sans">{asset.label}</p>
                  <p className="text-[10px] text-neutral-500 mt-1">
                    ROLE : <span className="text-neutral-400">{asset.role}</span>
                  </p>
                </div>

                {/* Preview Frame */}
                <div className="relative aspect-[4/3] bg-neutral-900 border border-neutral-800/80 overflow-hidden group">
                  <img
                    src={currentUrl}
                    alt={asset.filename}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <span className="text-[10px] text-white text-center">
                      CLICK "BIND FILE" BELOW TO OVERRIDE
                    </span>
                  </div>
                </div>

                {/* Action Island */}
                <div className="flex items-center gap-2 pt-1 border-t border-neutral-900">
                  <label className="flex-1 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-center text-xs cursor-pointer transition-colors flex items-center justify-center gap-1.5">
                    <Upload className="w-3 h-3" />
                    <span>BIND FILE</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) handleSingleFileUpload(asset.filename, file);
                      }}
                    />
                  </label>

                  {isCustom && (
                    <button
                      onClick={() => resetAsset(asset.filename)}
                      className="p-2 text-neutral-400 hover:text-rose-400 border border-neutral-800 bg-neutral-900"
                      title="Reset to default asset"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
