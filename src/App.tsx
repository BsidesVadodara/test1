import React, { useState } from 'react';
import { AssetProvider } from './context/AssetContext';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DropSpotlight } from './components/DropSpotlight';
import { GarmentGrid } from './components/GarmentGrid';
import { EditorialLookbook } from './components/EditorialLookbook';
import { StudioAbout } from './components/StudioAbout';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AssetVaultModal } from './components/AssetVaultModal';
import { AudioAtmosphere } from './components/AudioAtmosphere';
import { Footer } from './components/Footer';
import { GARMENTS } from './data/products';
import { LOOKBOOK_SHOTS } from './data/lookbook';
import { Garment, DropCategory } from './types';
import { Check } from 'lucide-react';

const MainContent: React.FC = () => {
  const { notification, dismissNotification } = useCart();
  const [selectedGarment, setSelectedGarment] = useState<Garment | null>(null);
  const [isAssetVaultOpen, setIsAssetVaultOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('drops');
  const [selectedDrop, setSelectedDrop] = useState<DropCategory>('all');

  // Find flagship garment
  const flagship = GARMENTS.find(g => g.featured) || GARMENTS[0];

  const handleExploreCurrent = () => {
    setSelectedDrop('0x02');
    const el = document.getElementById('drops');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreArchive = () => {
    setSelectedDrop('0x01');
    const el = document.getElementById('drops');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f4f6] relative flex flex-col justify-between selection:bg-white selection:text-black">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 bg-white text-neutral-950 font-mono-code text-xs px-4 py-3 shadow-2xl border border-neutral-200 flex items-center gap-3 animate-slide-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span className="font-bold">{notification}</span>
          <button
            onClick={dismissNotification}
            className="text-neutral-500 hover:text-black font-bold ml-2"
          >
            ×
          </button>
        </div>
      )}

      {/* Top Header */}
      <Header
        onOpenAssetVault={() => setIsAssetVaultOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreCurrent={handleExploreCurrent}
          onExploreArchive={handleExploreArchive}
        />

        {/* Flagship Garment Spotlight */}
        <DropSpotlight
          garment={flagship}
          onOpenDetails={garment => setSelectedGarment(garment)}
        />

        {/* Full Garment Registry */}
        <GarmentGrid
          garments={GARMENTS}
          onOpenDetails={garment => setSelectedGarment(garment)}
          selectedDrop={selectedDrop}
          setSelectedDrop={setSelectedDrop}
        />

        {/* Editorial Lookbook Spread */}
        <EditorialLookbook
          shots={LOOKBOOK_SHOTS}
          garments={GARMENTS}
          onSelectGarment={garment => setSelectedGarment(garment)}
        />

        {/* Studio & Manifesto (incorporates 'logo to use in about section.jpeg') */}
        <StudioAbout />
      </main>

      {/* Footer with Serial Verification */}
      <Footer />

      {/* Modals and Drawers */}
      <ProductModal
        garment={selectedGarment}
        onClose={() => setSelectedGarment(null)}
      />

      <CartDrawer />
      <CheckoutModal />

      <AssetVaultModal
        isOpen={isAssetVaultOpen}
        onClose={() => setIsAssetVaultOpen(false)}
      />

      {/* Ambient Sound Atmosphere */}
      <AudioAtmosphere />
    </div>
  );
};

export default function App() {
  return (
    <AssetProvider>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </AssetProvider>
  );
}
