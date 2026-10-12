import React, { useState } from 'react';
import { BrandLogo } from './BrandLogos';
import { ShieldCheck, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { GARMENTS } from '../data/products';

export const Footer: React.FC = () => {
  const [verifyInput, setVerifyInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    status: 'idle' | 'valid' | 'invalid';
    garmentTitle?: string;
    drop?: string;
  }>({ status: 'idle' });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = verifyInput.trim().toUpperCase();
    const found = GARMENTS.find(g => g.serialCode === clean);

    if (found) {
      setVerificationResult({
        status: 'valid',
        garmentTitle: found.title,
        drop: found.drop,
      });
    } else {
      setVerificationResult({
        status: 'invalid',
      });
    }
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 font-mono-code text-xs">
      {/* Top Serial Verification Section */}
      <div className="border-b border-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-1">
            <span className="text-[11px] text-neutral-500 uppercase tracking-widest block">
              AUTHENTICITY VERIFICATION PROTOCOL
            </span>
            <h4 className="font-display font-bold text-lg text-white">
              Verify Garment Serial Authenticity
            </h4>
            <p className="text-neutral-400 max-w-md font-sans text-xs">
              Every authentic 0x01 piece carries an etched laser serial. Verify against the central archive registry.
            </p>
          </div>

          {/* Verification Form */}
          <div className="w-full md:w-auto min-w-[320px]">
            <form onSubmit={handleVerify} className="flex gap-2">
              <input
                type="text"
                placeholder="ENTER SERIAL (e.g. 0X02-PRK-01)"
                value={verifyInput}
                onChange={e => {
                  setVerifyInput(e.target.value);
                  setVerificationResult({ status: 'idle' });
                }}
                className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 uppercase focus:outline-none focus:border-neutral-600"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-white hover:bg-neutral-200 text-neutral-950 font-bold uppercase cursor-pointer"
              >
                VERIFY
              </button>
            </form>

            {verificationResult.status === 'valid' && (
              <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  AUTHENTIC REGISTERED PIECE // {verificationResult.garmentTitle} [DROP {verificationResult.drop}]
                </span>
              </div>
            )}

            {verificationResult.status === 'invalid' && (
              <div className="mt-2 text-[11px] text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>SERIAL NOT LOCATED IN THE CENTRAL 0X01 REGISTER</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links & Colophon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Colophon */}
        <div className="space-y-4 md:col-span-1">
          <BrandLogo variant="0x01-light" showSubtitle={false} className="h-6" />
          <p className="text-neutral-400 font-sans text-xs leading-relaxed">
            Autonomous apparel design studio focused on brutalist forms, technical membranes, and archival editions.
          </p>
          <div className="text-[11px] text-neutral-400 space-y-1">
            <div>CENTRAL STUDIO : PARIS, FRANCE</div>
            <div>FABRICATION : AICHI PREFECTURE, JAPAN</div>
          </div>
        </div>

        {/* Archives & Releases */}
        <div className="space-y-3">
          <span className="text-white font-bold tracking-wider block">COLLECTIONS</span>
          <ul className="space-y-2 text-neutral-400 text-xs">
            <li>
              <a href="#drops" className="hover:text-white transition-colors">DROP 0x02 : SYNTAX (LIVE)</a>
            </li>
            <li>
              <a href="#drops" className="hover:text-white transition-colors">DROP 0x01 : GENESIS (ARCHIVE)</a>
            </li>
            <li>
              <a href="#editorial" className="hover:text-white transition-colors">EDITORIAL CAMPAIGN REEL</a>
            </li>
            <li>
              <a href="#studio" className="hover:text-white transition-colors">ATELIER MANIFESTO</a>
            </li>
          </ul>
        </div>

        {/* Global Operations */}
        <div className="space-y-3">
          <span className="text-white font-bold tracking-wider block">LOGISTICS & CLIENTS</span>
          <ul className="space-y-2 text-neutral-400 text-xs">
            <li>GLOBAL DISPATCH VIA DHL AIR EXPRESS</li>
            <li>14-DAY ARCHIVAL RETURNS</li>
            <li>CUSTOMS DUTIES INCLUDED WORLDWIDE</li>
            <li>CARE & REPAIR GUARANTEE</li>
          </ul>
        </div>

        {/* Legal & Coordinates */}
        <div className="space-y-3">
          <span className="text-white font-bold tracking-wider block">ATELIER DISPATCH</span>
          <p className="text-neutral-400 text-xs font-sans">
            Direct atelier contact: <br />
            <span className="text-white">studio@0x01atelier.com</span>
          </p>
          <p className="text-[11px] text-neutral-500">
            REGISTERED ENTITY // REYKJAVIK · PARIS · TOKYO
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-900 py-6 px-4 sm:px-6 lg:px-8 text-neutral-400 text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © 2026 STUDIO 0x01 ATELIER. ALL RIGHTS RESERVED. ZERO PILL DISCIPLINE ENFORCED.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">PRIVACY POLICY</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">TERMS OF DISPATCH</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">SECURITY PROTOCOL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
