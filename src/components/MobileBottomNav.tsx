import React from 'react';
import { Home, Camera, Tag, Phone } from 'lucide-react';

interface MobileBottomNavProps {
  onScrollTo: (id: string) => void;
  onOpenTrackModal: () => void;
  phone: string;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onScrollTo,
  phone,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 px-3 py-2">
      <div className="flex items-center justify-around flex-nowrap">
        
        {/* Home */}
        <button
          onClick={() => onScrollTo('hero')}
          className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white p-1 text-[10px] font-bold uppercase transition-colors cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        {/* Showcase */}
        <button
          onClick={() => onScrollTo('showcase')}
          className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white p-1 text-[10px] font-bold uppercase transition-colors cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          <span>Showcase</span>
        </button>

        {/* HIRE BADHON (Centered Prominent Yellow Action with Stylized Letter Icon Badge "B") */}
        <button
          onClick={() => onScrollTo('hiring-section')}
          className="flex flex-col items-center -mt-5 cursor-pointer group shrink-0"
          aria-label="Hire Badhon Goalkeeper"
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#FFE600] via-yellow-400 to-amber-400 text-neutral-950 flex items-center justify-center font-heading font-black text-lg shadow-lg shadow-yellow-400/40 border-2 border-neutral-950 group-hover:scale-105 transition-transform">
            <span>B</span>
          </div>
          <span className="text-[9px] font-extrabold text-[#FFE600] uppercase mt-0.5 tracking-wider">
            Hire Badhon
          </span>
        </button>

        {/* Call Now */}
        <a
          href={`tel:${phone || '+8801712345678'}`}
          className="flex flex-col items-center gap-1 text-neutral-400 hover:text-yellow-400 p-1 text-[10px] font-bold uppercase transition-colors cursor-pointer"
        >
          <Phone className="w-4 h-4" />
          <span>Call</span>
        </a>

      </div>
    </div>
  );
};
