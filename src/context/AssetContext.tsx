import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrandAsset } from '../types';
import { INITIAL_BRAND_ASSETS } from '../data/assets';

interface AssetContextType {
  assets: Record<string, BrandAsset>;
  getAssetUrl: (filename: string) => string;
  updateAsset: (filename: string, dataUrl: string) => void;
  resetAsset: (filename: string) => void;
  resetAllAssets: () => void;
  isCustomized: (filename: string) => boolean;
}

const STORAGE_KEY = '0x01_studio_custom_assets_v1';

const AssetContext = createContext<AssetContextType | null>(null);

export const AssetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<Record<string, BrandAsset>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const merged = { ...INITIAL_BRAND_ASSETS };
        for (const [key, value] of Object.entries(parsed)) {
          if (merged[key]) {
            merged[key] = {
              ...merged[key],
              customDataUrl: (value as { customDataUrl?: string }).customDataUrl,
            };
          }
        }
        return merged;
      }
    } catch {
      // Fallback to default
    }
    return INITIAL_BRAND_ASSETS;
  });

  const getAssetUrl = (filename: string): string => {
    const asset = assets[filename];
    if (!asset) return INITIAL_BRAND_ASSETS['0x01 LOGO-w.png']?.defaultVisual || '';
    return asset.customDataUrl || asset.defaultVisual;
  };

  const updateAsset = (filename: string, dataUrl: string) => {
    setAssets(prev => {
      const next = {
        ...prev,
        [filename]: {
          ...prev[filename],
          customDataUrl: dataUrl,
        },
      };
      try {
        const toSave = Object.fromEntries(
          Object.entries(next).map(([k, v]) => [k, { customDataUrl: v.customDataUrl }])
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      } catch (err) {
        console.warn('Could not save to localStorage', err);
      }
      return next;
    });
  };

  const resetAsset = (filename: string) => {
    setAssets(prev => {
      const next = {
        ...prev,
        [filename]: {
          ...prev[filename],
          customDataUrl: undefined,
        },
      };
      try {
        const toSave = Object.fromEntries(
          Object.entries(next).map(([k, v]) => [k, { customDataUrl: v.customDataUrl }])
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const resetAllAssets = () => {
    setAssets(INITIAL_BRAND_ASSETS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const isCustomized = (filename: string): boolean => {
    return !!assets[filename]?.customDataUrl;
  };

  return (
    <AssetContext.Provider
      value={{
        assets,
        getAssetUrl,
        updateAsset,
        resetAsset,
        resetAllAssets,
        isCustomized,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

export const useBrandAssets = () => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error('useBrandAssets must be used within AssetProvider');
  }
  return context;
};
