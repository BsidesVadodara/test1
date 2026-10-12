import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogos';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Layers, Image as ImageIcon, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenAssetVault: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAssetVault,
  activeSection,
  setActiveSection,
}) => {
  const { totalCount, setIsCartOpen } = useCart();
  const [utcTime, setUtcTime] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const mins = String(now.getUTCMinutes()).padStart(2, '0');
      const secs = String(now.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`${hours}:${mins}:${secs} UTC`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'drops', label: 'COLLECTIONS' },
    { id: 'editorial', label: 'EDITORIAL // LOOKBOOK' },
    { id: 'studio', label: 'STUDIO // MANIFESTO' },
    { id: 'archive', label: 'DROP 0x01 ARCHIVE' },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Banner Ticker */}
      <div className="bg-neutral-950 border-b border-neutral-900 text-[11px] font-mono-code text-neutral-400 py-1.5 px-4 overflow-hidden select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-neutral-200">DROP 0x02 : SYNTAX NOW LIVE</span>
            <span className="text-neutral-600 hidden sm:inline">/</span>
            <span className="text-neutral-500 hidden sm:inline">WORLDWIDE COMPLIMENTARY SHIPPING ON ORDERS OVER $500</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <span className="hidden md:inline text-neutral-500">LIVE ATELIER CLOCK</span>
            <span className="text-neutral-300 font-medium">{utcTime}</span>
            <span className="text-neutral-600">/</span>
            <button
              onClick={onOpenAssetVault}
              className="hover:text-white transition-colors flex items-center gap-1.5 text-neutral-400"
              title="Inspect or upload your 19 photo and logo files"
            >
              <ImageIcon className="w-3 h-3 text-neutral-400" />
              <span className="underline underline-offset-2">ASSET VAULT (19)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          scrolled
            ? 'bg-neutral-950/95 backdrop-blur-md border-b border-neutral-900 shadow-xl'
            : 'bg-neutral-950/80 backdrop-blur border-b border-neutral-900/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <BrandLogo variant="0x01-light" showSubtitle={true} className="h-7" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono-code tracking-wider">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`py-1 transition-all border-b ${
                  activeSection === link.id
                    ? 'border-white text-white font-medium'
                    : 'border-transparent text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Island */}
          <div className="flex items-center gap-3 sm:gap-4 font-mono-code">
            {/* Asset Vault launcher for fast access */}
            <button
              onClick={onOpenAssetVault}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-600 rounded bg-neutral-900/50 transition-colors"
              title="Manage Brand & Shoot Assets"
            >
              <Layers className="w-3.5 h-3.5 text-neutral-400" />
              <span>VAULT</span>
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-semibold rounded transition-colors group cursor-pointer"
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
              <span>BAG</span>
              {totalCount > 0 && (
                <span className="flex items-center justify-center min-w-4 h-4 px-1 text-[10px] bg-neutral-950 text-white rounded font-mono-code">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white border border-neutral-800 rounded bg-neutral-900/60"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-neutral-800 bg-neutral-950/98 backdrop-blur px-6 py-6 font-mono-code text-sm">
            <div className="flex flex-col gap-4">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="flex items-center justify-between text-left text-neutral-300 hover:text-white py-2 border-b border-neutral-900"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-600" />
                </button>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAssetVault();
                }}
                className="flex items-center justify-between text-left text-neutral-400 hover:text-white py-2 border-b border-neutral-900"
              >
                <span>OPEN ASSET VAULT (19 FILES)</span>
                <ImageIcon className="w-4 h-4 text-neutral-500" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
