export type DropCategory = 'all' | '0x01' | '0x02';

export type ProductCategory = 'all' | 'outerwear' | 'tops' | 'bottoms' | 'hardware' | 'objects';

export interface Garment {
  id: string;
  serialCode: string;
  title: string;
  drop: '0x01' | '0x02';
  category: 'outerwear' | 'tops' | 'bottoms' | 'hardware' | 'objects';
  price: number;
  status: 'available' | 'low_stock' | 'archived';
  pieceCount: number; // e.g. limited to 100
  editionNumber?: string;
  description: string;
  composition: string;
  gsmWeight?: string;
  fabricationDetails: string[];
  careInstructions: string;
  sizes: ('S' | 'M' | 'L' | 'XL' | 'OS')[];
  stockPerSize: Record<string, number>;
  measurements: {
    size: string;
    chest: string;
    length: string;
    sleeve: string;
    shoulder: string;
  }[];
  images: string[];
  primaryAssetKey?: string;
  featured?: boolean;
}

export interface LookbookShot {
  id: string;
  filename: string;
  title: string;
  series: 'DSC Photoshoot' | 'Studio Fitting' | 'Atelier Diary';
  aspectRatio: 'portrait' | 'landscape' | 'square';
  cameraSpecs: {
    camera: string;
    lens: string;
    iso: string;
    shutter: string;
    aperture: string;
  };
  location: string;
  featuredGarments: string[];
  description: string;
  imageFallback: string;
}

export interface CartItem {
  id: string;
  garmentId: string;
  title: string;
  serialCode: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
}

export interface BrandAsset {
  filename: string;
  label: string;
  category: 'logo' | 'photoshoot' | 'fitting' | 'diary';
  role: string;
  customDataUrl?: string;
  defaultVisual: string;
}
