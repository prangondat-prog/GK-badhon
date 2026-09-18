import React, { useState, useRef, useEffect } from 'react';
import { Calendar, UserCheck, Menu, X, CheckCircle2, Zap, Camera, Tag, Star, Phone, ExternalLink, MessageCircle } from 'lucide-react';
import { ProfileData } from '../types';

interface NavbarProps {
  profile: ProfileData | null;
  onOpenBooking: (prefill?: any) => void;
  onOpenStatusModal: () => void;
  onOpenAdminModal: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenBooking,
  onOpenStatusModal,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactMenuOpen, setContactMenuOpen] = useState(false);
  const contactDropdownRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Close contact menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (contactDropdownRef.current && !contactDropdownRef.current.contains(event.target as Node)) {
        setContactMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const instagramUrl = profile?.instagramUrl || 'https://www.instagram.com/mr.badhon__das/';
  const tiktokUrl = profile?.tiktokUrl || 'https://www.tiktok.com/@mr.bandhon.das';
  const logoUrl = 'https://i.postimg.cc/nLR5WP6Y/dc6081fb-7132-4d6b-980b-45f666927356.png';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Name (Subtext removed per request) */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-neutral-950 flex items-center justify-center p-1 shadow-sm border border-neutral-200 group-hover:border-neutral-400 transition-colors overflow-hidden">
              <img
                src={logoUrl}
                alt="Badhon Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-neutral-950 block leading-none">
                GK BADHON
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-neutral-700">
            <button
              onClick={() => scrollToSection('profile')}
              className={`hover:text-neutral-950 transition-colors cursor-pointer ${activeSection === 'profile' ? 'text-neutral-950 font-bold' : ''}`}
            >
              Profile
            </button>
            <button
              onClick={() => scrollToSection('why-hire')}
              className={`hover:text-neutral-950 transition-colors cursor-pointer ${activeSection === 'why-hire' ? 'text-neutral-950 font-bold' : ''}`}
            >
              Why Badhon
            </button>
            <button
              onClick={() => scrollToSection('showcase')}
              className={`hover:text-neutral-950 transition-colors cursor-pointer ${activeSection === 'showcase' ? 'text-neutral-950 font-bold' : ''}`}
            >
              Showcase
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className={`hover:text-neutral-950 transition-colors cursor-pointer ${activeSection === 'reviews' ? 'text-neutral-950 font-bold' : ''}`}
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`hover:text-neutral-950 transition-colors cursor-pointer ${activeSection === 'contact' ? 'text-neutral-950 font-bold' : ''}`}
            >
              Contact
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Soft Hire Button */}
            <button
              id="nav-hire-btn"
              onClick={() => onOpenBooking()}
              className="btn-football-yellow px-5 py-2.5 rounded-full text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-sm active:scale-98 cursor-pointer transition-all duration-200"
            >
              <UserCheck className="w-4 h-4" />
              <span>HIRE BADHON</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="btn-football-yellow px-3.5 py-1.5 rounded-full text-xs font-bold uppercase cursor-pointer"
            >
              HIRE
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            <button
              onClick={() => scrollToSection('profile')}
              className="text-left px-3 py-2 rounded-lg hover:bg-neutral-100 text-neutral-800 flex items-center gap-2"
            >
              <span className="text-xs font-bold text-neutral-700">Profile</span>
            </button>
            <button
              onClick={() => scrollToSection('why-hire')}
              className="text-left px-3 py-2 rounded-lg hover:bg-neutral-100 text-neutral-800 flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-neutral-700" />
              <span>Why Badhon</span>
            </button>
            <button
              onClick={() => scrollToSection('showcase')}
              className="text-left px-3 py-2 rounded-lg hover:bg-neutral-100 text-neutral-800 flex items-center gap-2"
            >
              <Camera className="w-4 h-4 text-neutral-700" />
              <span>Showcase</span>
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="text-left px-3 py-2 rounded-lg hover:bg-neutral-100 text-neutral-800 flex items-center gap-2"
            >
              <Star className="w-4 h-4 text-neutral-700" />
              <span>Reviews</span>
            </button>

            {/* 2 Contact Channels in Mobile */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-left px-3 py-2.5 rounded-xl bg-neutral-100 text-neutral-900 hover:bg-neutral-200 col-span-1 flex items-center justify-between font-bold text-xs"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                Instagram
              </span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>

            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-left px-3 py-2.5 rounded-xl bg-neutral-100 text-neutral-900 hover:bg-neutral-200 col-span-1 flex items-center justify-between font-bold text-xs"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 fill-current text-neutral-900" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.32V8.75a8.28 8.28 0 0 0 4.91 1.62V6.92a5 5 0 0 1-1-.23z"/>
                </svg>
                TikTok
              </span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>
          </div>

          <div className="pt-2 border-t border-neutral-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="btn-football-yellow w-full py-3 rounded-full text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              HIRE BADHON NOW
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
