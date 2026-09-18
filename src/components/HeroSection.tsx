import React, { useState, useRef, useEffect } from 'react';
import { UserCheck, Calendar, Shield, Trophy, Activity, Award } from 'lucide-react';
import { ProfileData } from '../types';

interface HeroSectionProps {
  profile: ProfileData | null;
  onHireClick: () => void;
  onViewProfileClick: () => void;
  onCheckCalendarClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onHireClick,
  onCheckCalendarClick,
}) => {
  // Use the original high-quality GK Badhon goalkeeper banner image as requested
  const bannerImage = profile?.heroImageUrl || 'https://i.postimg.cc/ncMhCy1Q/4e4e9dc4-d3d3-4ca6-8f9e-63a4e6b3dda6.png';

  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const matches = profile?.matchesPlayed || 650;
  const tournaments = profile?.tournamentsPlayed || 129;
  const saves = profile?.saves || 180;
  const rating = profile?.rating || 4.9;

  // Fetch the latest unexpired direct MP4 video source URL on component mount
  useEffect(() => {
    fetch('/api/streamable-video?json=true')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to resolve video URL');
        return res.json();
      })
      .then((data) => {
        if (data && data.url) {
          setVideoSrc(data.url);
        } else {
          setVideoFailed(true);
        }
      })
      .catch((err) => {
        console.error('Video resolve error:', err);
        setVideoFailed(true);
      });
  }, []);

  // Cinematic looping mechanism: Video ends -> 7s Image banner -> Video restarts
  useEffect(() => {
    let timeoutId: any;

    if (videoEnded && !videoFailed && videoSrc) {
      timeoutId = setTimeout(() => {
        setVideoEnded(false);
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch((err) => {
            console.log('Video play interrupted:', err);
            setVideoFailed(true);
          });
        }
      }, 7000); // exactly 7 seconds
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [videoEnded, videoFailed, videoSrc]);

  return (
    <section id="hero" className="relative overflow-hidden bg-neutral-950 text-white min-h-[520px] sm:min-h-[620px] lg:min-h-[750px] flex flex-col justify-end pb-4">
      
      {/* Background Media Container with Fail-safe layering */}
      <div className="absolute inset-0 z-0">
        {/* Original High-Quality GK Badhon Banner Image (Always loaded underneath as a crisp background) */}
        <img
          src={bannerImage}
          alt="GK Badhon - Professional Goalkeeper"
          className="absolute inset-0 w-full h-full object-cover object-center lg:object-right-top filter brightness-105 contrast-105"
        />

        {/* Dynamic Unexpired Streamable Video Player (Fades in over image ONLY when active and playing successfully) */}
        {videoSrc && !videoFailed && (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            playsInline
            onError={() => {
              console.warn('Video failed to play, falling back to static high-quality image banner.');
              setVideoFailed(true);
            }}
            onEnded={() => setVideoEnded(true)}
            className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-95 contrast-105 transition-opacity duration-1000 ${
              videoEnded ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          />
        )}
      </div>

      {/* Slogan Text Overlay - Always visible at the same place over both video and image banner */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left mb-6 select-none">
        <div className="space-y-1 sm:space-y-2 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-yellow-400/20 text-[#FFE600] text-[10px] sm:text-xs font-black uppercase tracking-widest border border-yellow-400/30 backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-[#FFE600]" />
            Official Elite Goalkeeper
          </span>
          <h1 className="font-heading text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none drop-shadow-2xl">
            THE LAST <br />
            <span className="text-[#FFE600] drop-shadow-[0_2px_10px_rgba(255,230,0,0.15)]">DEFENSE</span>
          </h1>
        </div>
      </div>

      {/* Sleek Bottom Floating Action Bar */}
      <div className="relative z-10 w-full bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent pt-12 pb-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-start gap-4">
          
          {/* Hire Action Button */}
          <div className="flex items-center gap-3">
            <button
              id="hero-hire-badhon-btn"
              onClick={onHireClick}
              className="btn-football-yellow px-7 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center gap-2 shadow-xl hover:shadow-yellow-400/30 active:scale-98 cursor-pointer transition-all"
            >
              <UserCheck className="w-4 h-4 text-black" />
              <span>HIRE BADHON</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
