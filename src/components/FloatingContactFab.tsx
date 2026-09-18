import React, { useState } from 'react';
import { MessageCircle, X, ExternalLink, ShieldCheck } from 'lucide-react';

interface FloatingContactFabProps {
  tiktokUrl?: string;
  instagramUrl?: string;
}

export const FloatingContactFab: React.FC<FloatingContactFabProps> = ({
  tiktokUrl = 'https://www.tiktok.com/@mr.bandhon.das',
  instagramUrl = 'https://www.instagram.com/mr.badhon__das/',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hidden md:block fixed bottom-6 right-5 z-50">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-neutral-950/95 backdrop-blur-md border border-neutral-800 text-white rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-hidden p-1">
                <img
                  src="https://i.postimg.cc/nLR5WP6Y/dc6081fb-7132-4d6b-980b-45f666927356.png"
                  alt="Badhon Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  GK Badhon Channels
                </h4>
                <p className="text-[11px] text-neutral-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Official Social Contacts
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors cursor-pointer"
              aria-label="Close channels"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 space-y-2.5">
            {/* 1. Instagram */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-850 border border-neutral-800/80 hover:border-pink-500/40 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-xs">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white group-hover:text-pink-400 transition-colors">
                    Instagram
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    @mr.badhon__das
                  </div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-pink-400 transition-colors" />
            </a>

            {/* 2. TikTok */}
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-850 border border-neutral-800/80 hover:border-[#FFE600]/40 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-black border border-neutral-800 flex items-center justify-center text-[#FFE600] shadow-xs">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.32V8.75a8.28 8.28 0 0 0 4.91 1.62V6.92a5 5 0 0 1-1-.23z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white group-hover:text-[#FFE600] transition-colors">
                    TikTok
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    @mr.bandhon.das
                  </div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#FFE600] transition-colors" />
            </a>
          </div>

          <div className="pt-2 border-t border-neutral-900 text-center">
            <span className="text-[10px] text-neutral-500 font-medium">
              Direct DM & Match Highlight Videos
            </span>
          </div>
        </div>
      )}

      {/* Simple, Clean Floating Trigger Button (Green dot animation removed per request) */}
      <button
        id="floating-contact-fab"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-950 hover:bg-neutral-900 text-white border border-neutral-700 shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 cursor-pointer"
        aria-label="Contact Badhon on Instagram or TikTok"
      >
        <MessageCircle className="w-4 h-4 text-[#FFE600]" />
        <span className="text-xs font-bold uppercase tracking-wider">
          Contact Channels
        </span>
      </button>
    </div>
  );
};
