import React from 'react';
import { Phone, MessageCircle, MapPin, Lock, ExternalLink, ShieldCheck } from 'lucide-react';
import { ContactSettings } from '../types';

interface FooterProps {
  contact: ContactSettings | null;
  onOpenAdmin: () => void;
  onOpenTrackModal: () => void;
  onScrollTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  contact,
  onOpenAdmin,
  onOpenTrackModal,
  onScrollTo,
}) => {
  const currentYear = new Date().getFullYear();
  const instagramUrl = contact?.instagramUrl || 'https://www.instagram.com/mr.badhon__das/';
  const tiktokUrl = contact?.tiktokUrl || 'https://www.tiktok.com/@mr.bandhon.das';

  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 p-1 flex items-center justify-center shadow-xs overflow-hidden">
                <img
                  src="https://i.postimg.cc/nLR5WP6Y/dc6081fb-7132-4d6b-980b-45f666927356.png"
                  alt="Badhon Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white uppercase">
                BADHON
              </span>
            </div>

            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Official professional goalkeeper hiring & match booking platform. 129 tournaments played, 650 matches, and 180 decisive match saves. Available for Dhaka tournaments, league fixtures, friendly cups, and outstation championships.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Direct Line</span>
              </div>
              <span>•</span>
              <div>No Hidden Fees</div>
              <span>•</span>
              <div>Pro Gear Included</div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 text-neutral-200 hover:text-pink-400 border border-neutral-800 text-xs font-semibold transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                <span>Instagram: @mr.badhon__das</span>
                <ExternalLink className="w-3 h-3 text-neutral-500" />
              </a>

              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 text-neutral-200 hover:text-[#FFE600] border border-neutral-800 text-xs font-semibold transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.32V8.75a8.28 8.28 0 0 0 4.91 1.62V6.92a5 5 0 0 1-1-.23z"/>
                </svg>
                <span>TikTok: @mr.bandhon.das</span>
                <ExternalLink className="w-3 h-3 text-neutral-500" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3 text-xs">
            <h4 className="font-heading font-bold text-white uppercase tracking-wider text-sm">
              Navigation
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => onScrollTo('hero')} className="hover:text-yellow-400 transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('profile')} className="hover:text-yellow-400 transition-colors cursor-pointer">
                  Goalkeeper Profile & Stats
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('why-hire')} className="hover:text-yellow-400 transition-colors cursor-pointer">
                  Why Badhon
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('showcase')} className="hover:text-yellow-400 transition-colors cursor-pointer">
                  Match Showcase & Saves
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('availability')} className="hover:text-yellow-400 transition-colors cursor-pointer">
                  Availability Calendar
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Booking */}
          <div className="space-y-3 text-xs">
            <h4 className="font-heading font-bold text-white uppercase tracking-wider text-sm">
              Booking & Rates
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => onScrollTo('pricing')} className="hover:text-yellow-400 transition-colors cursor-pointer">
                  Pricing Packages
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('hiring-section')} className="hover:text-yellow-400 transition-colors cursor-pointer">
                  Hire Badhon (Form)
                </button>
              </li>
              <li>
                <button onClick={onOpenTrackModal} className="text-[#FFE600] hover:text-white font-bold transition-colors cursor-pointer">
                  Track Booking Status
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('reviews')} className="hover:text-yellow-400 transition-colors cursor-pointer">
                  Team Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Admin */}
          <div className="space-y-3 text-xs">
            <h4 className="font-heading font-bold text-white uppercase tracking-wider text-sm">
              Match Hotline
            </h4>
            <div className="space-y-2.5 text-neutral-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <a href={`tel:${contact?.phone || '+880 1712-345678'}`} className="hover:text-white">
                  {contact?.phone || '+880 1712-345678'}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{contact?.whatsapp || '+880 1712-345678'}</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span>{contact?.location || 'Dhaka, Bangladesh'}</span>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-yellow-400 border border-neutral-800 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Portal</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {currentYear} <strong>GK Badhon</strong>. Professional Football Goalkeeper Platform.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px]">Dhaka • 129 Tournaments • 650 Matches • 180 Saves</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
