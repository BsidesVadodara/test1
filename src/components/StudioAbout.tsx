import React, { useState } from 'react';
import { BrandLogo } from './BrandLogos';
import { Shield, Compass, CheckCircle2, Send, Cpu, Layers } from 'lucide-react';

export const StudioAbout: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryNote, setInquiryNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail) return;
    setSubmitted(true);
    setTimeout(() => {
      setInquiryName('');
      setInquiryEmail('');
      setInquiryNote('');
    }, 1500);
  };

  return (
    <section id="studio" className="py-24 border-b border-neutral-900 bg-neutral-950/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-neutral-900">
          <div>
            <div className="flex items-center gap-2 font-mono-code text-xs text-neutral-400 mb-2">
              <Compass className="w-3.5 h-3.5 text-neutral-400" />
              <span>THE PHILOSOPHY & CRAFTSMANSHIP</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              STUDIO 0x01 MANIFESTO
            </h2>
          </div>

          <p className="text-xs font-mono-code text-neutral-400 max-w-sm">
            Investigation into reductive silhouettes, utilitarian ergonomics, and monolithic brutalist aesthetics.
          </p>
        </div>

        {/* 2-Column Atelier Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: The Emblem (Dedicated 'logo to use in about section') */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-sm">
              <BrandLogo variant="about-seal" className="w-full shadow-2xl" />
              <div className="mt-3 text-center text-[10px] font-mono-code text-neutral-500">
                OFFICIAL ATELIER SEAL · [logo to use in about section.jpeg]
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Manifesto */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
              "We strip the excess until only structural intent and human gravity remain."
            </h3>

            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              <p>
                Established as an autonomous garment lab, <strong className="text-white font-medium">0x01</strong> approaches apparel not as transient fast fashion, but as wearable brutalist architecture. Every seam is calculated; every dart engineered for kinetic articulation.
              </p>
              <p>
                We reject seasonal churn. Our collections are released in discrete, numbered drops: <strong className="text-white font-mono-code font-normal">DROP 0x01</strong> laid our foundation in heavy French terry and raw wool, while <strong className="text-white font-mono-code font-normal">DROP 0x02 "SYNTAX"</strong> pushes into technical 3-layer ultrasonic welded laminates and aerospace titanium.
              </p>
            </div>

            {/* Three Pillars Grid */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-code text-xs">
              <div className="p-4 border border-neutral-900 bg-neutral-900/40">
                <span className="text-white font-bold block mb-1">01 / DENSITY</span>
                <span className="text-neutral-400 text-[11px]">
                  500+ GSM loopback fleeces and double-faced bonded virgin wools engineered for structural drape.
                </span>
              </div>
              <div className="p-4 border border-neutral-900 bg-neutral-900/40">
                <span className="text-white font-bold block mb-1">02 / HARDWARE</span>
                <span className="text-neutral-400 text-[11px]">
                  Custom CNC-milled Grade 5 Titanium plates and genuine AustriAlpin load-bearing Cobra hardware.
                </span>
              </div>
              <div className="p-4 border border-neutral-900 bg-neutral-900/40">
                <span className="text-white font-bold block mb-1">03 / ETHICS</span>
                <span className="text-neutral-400 text-[11px]">
                  Limited to 100 pieces per run. Zero surplus stock. Transparent atelier production chains.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Private Studio Fitting & Inquiries Form */}
        <div className="border border-neutral-800 bg-neutral-900/30 p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono-code text-neutral-400 uppercase tracking-widest">
                PRIVATE ATELIER DISPATCH
              </span>
              <h3 className="font-display font-bold text-2xl text-white">
                Request Fitting or Archival Inquiries
              </h3>
              <p className="text-xs font-mono-code text-neutral-400">
                For private appointments in Paris/Tokyo or inquiries regarding retired 0x01 archival pieces.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 border border-emerald-800/80 bg-emerald-950/40 text-center font-mono-code space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">DISPATCH LOGGED</h4>
                <p className="text-xs text-emerald-300">
                  Your inquiry has been received by the atelier master. Our studio will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono-code text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-400 mb-1">YOUR NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. KRISH SHARMA"
                      value={inquiryName}
                      onChange={e => setInquiryName(e.target.value)}
                      className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">EMAIL COORDINATE</label>
                    <input
                      type="email"
                      required
                      placeholder="sharmakrish1410@gmail.com"
                      value={inquiryEmail}
                      onChange={e => setInquiryEmail(e.target.value)}
                      className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">INQUIRY OR PIECE REQUEST</label>
                  <textarea
                    rows={3}
                    placeholder="Specify sizing, piece serial number, or private fitting request..."
                    value={inquiryNote}
                    onChange={e => setInquiryNote(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT INQUIRY TO ATELIER</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
