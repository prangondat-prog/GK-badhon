import React, { useState } from 'react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, Shield, Play } from 'lucide-react';
import { GalleryItem } from '../types';
import { useTranslation } from './LanguageContext';

interface PlayerShowcaseProps {
  gallery: GalleryItem[];
}

export const PlayerShowcase: React.FC<PlayerShowcaseProps> = ({ gallery }) => {
  const { t, lang } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('All');
  const [activeMedia, setActiveMedia] = useState<GalleryItem | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<'video1' | 'video2' | null>(null);

  const categories = ['All', 'Match Moments', 'Saves', 'Training', 'Tournaments'];

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'All': return t('tagAll');
      case 'Match Moments': return lang === 'bn' ? 'ম্যাচ মুহূর্ত' : 'Match Moments';
      case 'Saves': return lang === 'bn' ? 'সেভসমূহ' : 'Saves';
      case 'Training': return t('tagTraining');
      case 'Tournaments': return lang === 'bn' ? 'টুর্নামেন্টসমূহ' : 'Tournaments';
      default: return cat;
    }
  };

  const filteredItems = activeTab === 'All'
    ? gallery
    : gallery.filter((item) => item.category === activeTab);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeMedia) return;
    const currentIdx = filteredItems.findIndex((i) => i.id === activeMedia.id);
    const nextIdx = (currentIdx + 1) % filteredItems.length;
    setActiveMedia(filteredItems[nextIdx]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeMedia) return;
    const currentIdx = filteredItems.findIndex((i) => i.id === activeMedia.id);
    const prevIdx = (currentIdx - 1 + filteredItems.length) % filteredItems.length;
    setActiveMedia(filteredItems[prevIdx]);
  };

  return (
    <section id="showcase" className="py-16 sm:py-24 bg-neutral-50/70 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-100 text-yellow-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'অ্যাকশন আর্কাইভ' : 'Action Archive'}</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-neutral-950 uppercase tracking-tight">
              {t('showcaseTitle')}
            </h2>
            <p className="text-base text-neutral-600 font-medium mt-1">
              {t('showcaseSubtitle')}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === cat
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'bg-white text-neutral-700 hover:bg-neutral-200/70 border border-neutral-200/80'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Vertical Video Highlights (9:16 Ratio Showcase) */}
        <div className="mb-14 max-w-4xl mx-auto px-2">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FFE600]/20 text-yellow-900 text-xs font-black uppercase tracking-widest border border-yellow-400">
              {lang === 'bn' ? 'ম্যাচ হাইলাইটস ও সেভস ভিডিও' : 'Match Highlights & Saves Reels'}
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-neutral-950 mt-2 uppercase tracking-tight">
              {lang === 'bn' ? 'ম্যাচ পারফরম্যান্স ও রিফ্লেক্স রিলস' : 'Match Performance & Reflex Reels'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              {lang === 'bn' ? '৯:১৬ হাই-কোয়ালিটি রিল ভিডিওগুলোতে দেখুন বাঁধনের সেরা কিছু সেভ' : 'Watch GK Badhon\'s elite reflex saves captured in high-definition 9:16 vertical reels'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            
            {/* Reel Video 1 */}
            <div className="flex flex-col items-center">
              <div 
                onClick={() => setPlayingVideoId('video1')}
                className="w-full max-w-[310px] aspect-[9/16] rounded-3xl overflow-hidden bg-neutral-950 border-4 border-neutral-900 shadow-2xl relative group transform hover:scale-[1.01] transition-transform cursor-pointer"
              >
                {playingVideoId === 'video1' ? (
                  <iframe
                    src="https://streamable.com/e/2glj4e?autoplay=1"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    allowFullScreen
                    allow="autoplay"
                    className="absolute top-0 left-0 w-full h-full"
                    title="GK Badhon - Reflex Saves Reel"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full relative">
                    <img 
                      src="/src/assets/images/badhon_goalkeeper_hero_1789662074857.jpg" 
                      alt="GK Badhon - Flying Saves Preview" 
                      className="w-full h-full object-cover object-center filter brightness-75 group-hover:brightness-50 transition-all duration-300"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/20">
                      <div className="w-16 h-16 rounded-full bg-[#FFE600] text-black flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-7 h-7 fill-current ml-1" />
                      </div>
                      <span className="mt-4 text-xs font-black tracking-widest text-white uppercase bg-black/60 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                        {lang === 'bn' ? 'চালু করুন' : 'Click to Play'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-center mt-3">
                <span className="text-[11px] font-bold tracking-wider text-[#FFE600] bg-black px-2.5 py-0.5 rounded-full uppercase">
                  Reel 1
                </span>
                <p className="text-sm font-black text-neutral-900 mt-1">
                  {lang === 'bn' ? 'ফ্লাইং সেভস এবং রিফ্লেক্স ডেমো' : 'Flying Saves & Reflex Showcase'}
                </p>
              </div>
            </div>

            {/* Reel Video 2 */}
            <div className="flex flex-col items-center">
              <div 
                onClick={() => setPlayingVideoId('video2')}
                className="w-full max-w-[310px] aspect-[9/16] rounded-3xl overflow-hidden bg-neutral-950 border-4 border-neutral-900 shadow-2xl relative group transform hover:scale-[1.01] transition-transform cursor-pointer"
              >
                {playingVideoId === 'video2' ? (
                  <iframe
                    src="https://streamable.com/e/oqjg89?autoplay=1"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    allowFullScreen
                    allow="autoplay"
                    className="absolute top-0 left-0 w-full h-full"
                    title="GK Badhon - Dive Drills Reel"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full relative">
                    <img 
                      src="/src/assets/images/badhon_portrait_1789662091328.jpg" 
                      alt="GK Badhon - Dive Drills Preview" 
                      className="w-full h-full object-cover object-center filter brightness-75 group-hover:brightness-50 transition-all duration-300"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/20">
                      <div className="w-16 h-16 rounded-full bg-[#FFE600] text-black flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-7 h-7 fill-current ml-1" />
                      </div>
                      <span className="mt-4 text-xs font-black tracking-widest text-white uppercase bg-black/60 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                        {lang === 'bn' ? 'চালু করুন' : 'Click to Play'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-center mt-3">
                <span className="text-[11px] font-bold tracking-wider text-[#FFE600] bg-black px-2.5 py-0.5 rounded-full uppercase">
                  Reel 2
                </span>
                <p className="text-sm font-black text-neutral-900 mt-1">
                  {lang === 'bn' ? 'ডাইভিং এবং এরিয়াল গ্রিপিং' : 'Diving Clears & Aerial Gripping'}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveMedia(item)}
              className="sports-card group overflow-hidden cursor-pointer bg-white relative flex flex-col justify-between rounded-2xl border border-neutral-200/80 shadow-sm"
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-950">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 border border-white/10">
                  <Shield className="w-3 h-3 text-[#FFE600]" />
                  <span>{getCategoryLabel(item.category)}</span>
                </div>

                {/* Hover Maximize Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/95 text-neutral-950 flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5">
                <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold mb-1.5">
                  <span className="text-yellow-600 font-bold uppercase">{getCategoryLabel(item.category)}</span>
                  <span>{lang === 'bn' && item.date === 'Recent Match' ? 'সাম্প্রতিক ম্যাচ' : (item.date || 'Recent Match')}</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-neutral-950 line-clamp-1 group-hover:text-yellow-600 transition-colors">
                  {lang === 'bn' ? (item.title_bn || item.title) : item.title}
                </h3>
                <p className="text-xs text-neutral-600 line-clamp-2 mt-1 leading-relaxed">
                  {lang === 'bn' ? (item.description_bn || item.description) : item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200">
            <Camera className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
            <p className="text-neutral-600 font-semibold">{t('showcaseNoItems')}</p>
          </div>
        )}

      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeMedia && (
        <div
          onClick={() => setActiveMedia(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in"
        >
          {/* Close button */}
          <button
            onClick={() => setActiveMedia(null)}
            className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-neutral-800 text-white hover:bg-neutral-700 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-neutral-800/80 text-white hover:bg-[#FFE600] hover:text-black transition-colors cursor-pointer"
            title="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-neutral-800/80 text-white hover:bg-[#FFE600] hover:text-black transition-colors cursor-pointer"
            title="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl flex flex-col"
          >
            <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeMedia.url}
                alt={activeMedia.title}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-6 bg-neutral-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-neutral-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-[#FFE600] text-black text-[10px] font-extrabold uppercase">
                    {getCategoryLabel(activeMedia.category)}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {lang === 'bn' && activeMedia.date === 'Recent Match' ? 'সাম্প্রতিক ম্যাচ' : (activeMedia.date || 'Recent Match')}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-white">
                  {lang === 'bn' ? (activeMedia.title_bn || activeMedia.title) : activeMedia.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
                  {lang === 'bn' ? (activeMedia.description_bn || activeMedia.description) : activeMedia.description}
                </p>
              </div>

              <span className="text-xs text-neutral-500 shrink-0">
                {t('showcaseArchive')}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
