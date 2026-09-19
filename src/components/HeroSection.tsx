import React, { useState, useRef, useEffect } from 'react';
import { UserCheck, Calendar, Shield, Trophy, Activity, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProfileData } from '../types';
import { useTranslation } from './LanguageContext';

interface HeroSectionProps {
  profile: ProfileData | null;
  onHireClick: () => void;
  onViewProfileClick: () => void;
  onCheckCalendarClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onHireClick,
}) => {
  const { t, lang } = useTranslation();
  
  // Showcase all three stunning banners
  const banners = [
    'https://i.postimg.cc/W16HzPMG/2ce097ea-7b8c-4947-a9cf-2ffb22d48eaa.png',
    'https://i.postimg.cc/FH37JTRS/32d34ce2-6f00-4cfb-a7ea-b0808848ed9b.png',
    profile?.heroImageUrl || 'https://i.postimg.cc/ncMhCy1Q/4e4e9dc4-d3d3-4ca6-8f9e-63a4e6b3dda6.png'
  ];

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  
  // Dynamic greetings tailored to each banner
  const getBannerContent = () => {
    switch (currentBannerIndex) {
      case 0:
        return {
          eyebrow: lang === 'bn' ? 'শারদীয় শুভেচ্ছা' : 'Sharodiya Shubecha',
          heading: lang === 'bn' ? (
            <>শারদীয় <br /><span className="text-[#FFE600]">শুভেচ্ছা</span></>
          ) : (
            <>SHARODIYA <br /><span className="text-[#FFE600]">GREETINGS</span></>
          )
        };
      case 1:
        return {
          eyebrow: lang === 'bn' ? 'শুভ দীপাবলি' : 'Shubho Diwali',
          heading: lang === 'bn' ? (
            <>শুভ <br /><span className="text-[#FFE600]">দীপাবলি</span></>
          ) : (
            <>HAPPY <br /><span className="text-[#FFE600]">DIWALI</span></>
          )
        };
      default:
        return {
          eyebrow: lang === 'bn' ? 'অফিসিয়াল এলিট গোলকিপার' : 'Official Elite Goalkeeper',
          heading: lang === 'bn' ? (
            <>শেষ <br /><span className="text-[#FFE600]">প্রতিরক্ষা</span></>
          ) : (
            <>THE LAST <br /><span className="text-[#FFE600]">DEFENSE</span></>
          )
        };
    }
  };

  const { eyebrow, heading } = getBannerContent();

  // Automatically cycle through image banners every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <section id="hero" className="relative overflow-hidden bg-neutral-950 text-white min-h-[520px] sm:min-h-[620px] lg:min-h-[750px] flex flex-col justify-end pb-4 font-sans">
      
      {/* Background Media Container with Fail-safe layering */}
      <div className="absolute inset-0 z-0">
        {/* Layered Image Banners with smooth 1-second cross-fade */}
        {banners.map((url, index) => (
          <img
            key={url}
            src={url}
            alt={`GK Badhon - Professional Goalkeeper Banner ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-center lg:object-right-top filter brightness-105 contrast-105 transition-opacity duration-1000 ${
              currentBannerIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Manual Slide Navigation Arrows */}
      <button
        onClick={() => {
          setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white hover:text-[#FFE600] transition-all cursor-pointer backdrop-blur-md active:scale-90"
        aria-label="Previous Banner"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={() => {
          setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white hover:text-[#FFE600] transition-all cursor-pointer backdrop-blur-md active:scale-90"
        aria-label="Next Banner"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Slogan Text Overlay - Always visible at the same place over both video and image banner */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left mb-6 select-none">
        <div key={currentBannerIndex} className="space-y-1 sm:space-y-2 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-yellow-400/20 text-[#FFE600] text-[10px] sm:text-xs font-black uppercase tracking-widest border border-yellow-400/30 backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-[#FFE600]" />
            {eyebrow}
          </span>
          <h1 className="font-heading text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none drop-shadow-2xl font-sans">
            {heading}
          </h1>
        </div>
      </div>

      {/* Sleek Bottom Floating Action Bar */}
      <div className="relative z-10 w-full pt-12 pb-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Hire Action Button */}
          <div className="flex items-center gap-3">
            <button
              id="hero-hire-badhon-btn"
              onClick={onHireClick}
              className="btn-football-yellow px-7 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center gap-2 shadow-xl hover:shadow-yellow-400/30 active:scale-98 cursor-pointer transition-all"
            >
              <UserCheck className="w-4 h-4 text-black" />
              <span>{t('btnHire')}</span>
            </button>
          </div>

          {/* Banner Dots indicator */}
          <div className="flex items-center gap-1.5">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentBannerIndex(idx);
                }}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentBannerIndex === idx 
                    ? 'bg-[#FFE600] w-5 sm:w-6' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to banner ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
