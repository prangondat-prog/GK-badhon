import React, { useState } from 'react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, Shield, Award } from 'lucide-react';
import { GalleryItem } from '../types';

interface PlayerShowcaseProps {
  gallery: GalleryItem[];
}

export const PlayerShowcase: React.FC<PlayerShowcaseProps> = ({ gallery }) => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [activeMedia, setActiveMedia] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Match Moments', 'Saves', 'Training', 'Tournaments'];

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
              <span>Action Archive</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-neutral-950 uppercase tracking-tight">
              PLAYER SHOWCASE
            </h2>
            <p className="text-base text-neutral-600 font-medium mt-1">
              Match action, fingertip reflex saves, training drills, and tournament appearances.
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
                {cat}
              </button>
            ))}
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
                  <span>{item.category}</span>
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
                  <span className="text-yellow-600 font-bold uppercase">{item.category}</span>
                  <span>{item.date || 'Recent Match'}</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-neutral-950 line-clamp-1 group-hover:text-yellow-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-600 line-clamp-2 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200">
            <Camera className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
            <p className="text-neutral-600 font-semibold">No items currently under this category.</p>
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
                    {activeMedia.category}
                  </span>
                  <span className="text-xs text-neutral-400">{activeMedia.date}</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-white">
                  {activeMedia.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
                  {activeMedia.description}
                </p>
              </div>

              <span className="text-xs text-neutral-500 shrink-0">
                GK Badhon Match Archive
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
