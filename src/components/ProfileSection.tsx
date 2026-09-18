import React from 'react';
import { Shield, Award, Calendar, Zap, CheckCircle2, Trophy, Activity } from 'lucide-react';
import { ProfileData } from '../types';

interface ProfileSectionProps {
  profile: ProfileData | null;
  onHireClick: () => void;
  onOpenAdminModal: () => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  profile,
  onHireClick,
  onOpenAdminModal,
}) => {
  const isAvailable = profile?.matchAvailability === 'Available';
  const matches = profile?.matchesPlayed || 650;
  const tournaments = profile?.tournamentsPlayed || 129;
  const saves = profile?.saves || 180;
  const cleanSheets = profile?.cleanSheets || 115;

  return (
    <section id="profile" className="py-16 sm:py-24 bg-neutral-50/70 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-100 text-yellow-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Shield className="w-3.5 h-3.5 fill-yellow-500 stroke-neutral-900" />
              Verified Player Profile
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-neutral-950 uppercase tracking-tight">
              GK BADHON
            </h2>
            <p className="text-base text-neutral-600 font-medium mt-1">
              Professional Goalkeeper • Shot Stopper & Defensive Commander
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onHireClick}
              className="btn-football-yellow px-6 py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider font-bold shadow-sm cursor-pointer"
            >
              BOOK BADHON FOR MATCH
            </button>
          </div>
        </div>

        {/* Profile Details Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Portrait & Quick Status (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sports-card p-6 bg-white overflow-hidden text-center relative border border-neutral-200/80 shadow-sm rounded-2xl">
              <div className="relative mx-auto w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-4 border-yellow-400 shadow-md mb-5 bg-neutral-950">
                <img
                  src={profile?.avatarUrl || "https://i.postimg.cc/kMf9mTKF/986daf46-d077-4bc4-8cf1-0558fb07fe47.png"}
                  alt="GK Badhon"
                  className="w-full h-full object-cover object-top"
                />
                <span className={`absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow ${isAvailable ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                  {isAvailable ? 'AVAILABLE' : 'BOOKED'}
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-neutral-950">
                GK Badhon
              </h3>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">
                Starting Goalkeeper • No. 1
              </p>

              {/* Verified Rating Pill */}
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-bold mb-4">
                <span className="text-[#FFE600] text-sm">★</span>
                <span>{profile?.rating || 4.9} Rating</span>
                <span className="text-neutral-400 font-normal">({profile?.totalReviews || 28} team reviews)</span>
              </div>

              {/* Bio summary */}
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed text-left border-t border-neutral-100 pt-4">
                {profile?.bio || "High-impact tournament goalkeeper with 129 tournaments played, 650 matches, and 180 decisive match saves. Renowned for fearless penalty stops, explosive 1v1 reflexes, and commanding box leadership across Dhaka and nationwide competitions."}
              </p>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span>Direct Booking Verified</span>
                <button
                  onClick={onOpenAdminModal}
                  className="text-neutral-700 hover:text-black font-semibold underline cursor-pointer"
                >
                  Manage Data
                </button>
              </div>
            </div>

            {/* Tactical Strengths Card */}
            <div className="sports-card p-5 bg-white space-y-3 border border-neutral-200/80 shadow-sm rounded-2xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Key Goalkeeping Strengths
              </h4>
              <div className="space-y-2.5 text-xs font-medium text-neutral-700">
                <div className="flex items-center justify-between py-1 border-b border-neutral-100">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-yellow-500" />
                    Reflex Diving
                  </span>
                  <span className="font-bold text-neutral-950">High Agility</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-neutral-100">
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-yellow-500" />
                    Penalty Stopping
                  </span>
                  <span className="font-bold text-neutral-950">{profile?.penaltySaveRate || "46%"}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-neutral-100">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-yellow-500" />
                    Box Communication
                  </span>
                  <span className="font-bold text-neutral-950">Vocal Leader</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-yellow-500" />
                    1v1 Shot Stopping
                  </span>
                  <span className="font-bold text-neutral-950">Decisive Sweeper</span>
                </div>
              </div>
            </div>

          </div>

          {/* Column 2: Verified Career Stats & Specifications Matrix (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 4 Core Stats Cards with Modern SVGs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              {/* Matches Played */}
              <div className="sports-card p-5 bg-white border-l-4 border-l-neutral-950 flex flex-col justify-between rounded-xl shadow-sm border border-neutral-200/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    Matches
                  </span>
                  <Calendar className="w-4 h-4 text-neutral-400" />
                </div>
                <div>
                  <div className="font-heading text-3xl sm:text-4xl font-extrabold text-neutral-950">
                    {matches}
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-0.5 font-medium">
                    Total Fixtures
                  </p>
                </div>
              </div>

              {/* Tournaments Played */}
              <div className="sports-card p-5 bg-white border-l-4 border-l-[#FFE600] flex flex-col justify-between rounded-xl shadow-sm border border-neutral-200/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    Tournaments
                  </span>
                  <Trophy className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <div className="font-heading text-3xl sm:text-4xl font-extrabold text-neutral-950">
                    {tournaments}
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-0.5 font-medium">
                    Cups & Championships
                  </p>
                </div>
              </div>

              {/* Decisive Saves */}
              <div className="sports-card p-5 bg-white border-l-4 border-l-blue-600 flex flex-col justify-between rounded-xl shadow-sm border border-neutral-200/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    Key Saves
                  </span>
                  <Zap className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-heading text-3xl sm:text-4xl font-extrabold text-neutral-950">
                    {saves}+
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-0.5 font-medium">
                    Recorded Match Stops
                  </p>
                </div>
              </div>

              {/* Clean Sheets */}
              <div className="sports-card p-5 bg-white border-l-4 border-l-emerald-500 flex flex-col justify-between rounded-xl shadow-sm border border-neutral-200/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    Clean Sheets
                  </span>
                  <Shield className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="font-heading text-3xl sm:text-4xl font-extrabold text-neutral-950">
                    {cleanSheets}
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-0.5 font-medium">
                    Zero-Goal Shutouts
                  </p>
                </div>
              </div>

            </div>

            {/* Profile Specification Table */}
            <div className="sports-card p-6 sm:p-8 bg-white space-y-6 rounded-2xl shadow-sm border border-neutral-200/80">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <h3 className="font-heading text-xl font-bold text-neutral-950 uppercase tracking-tight">
                  Player Specifications & Registry
                </h3>
                <span className="text-xs font-medium text-neutral-500">
                  Registry ID: <span className="font-mono text-neutral-900 font-bold">GKB-01</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Position</span>
                  <span className="font-bold text-neutral-950">{profile?.position || "Goalkeeper"}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Preferred Foot</span>
                  <span className="font-bold text-neutral-950">{profile?.preferredFoot || "Right"}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Experience</span>
                  <span className="font-bold text-neutral-950">{profile?.experience || "7+ Years Competitive"}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Primary Location</span>
                  <span className="font-bold text-neutral-950">{profile?.location || "Dhaka, Bangladesh"}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Height</span>
                  <span className="font-bold text-neutral-950">{profile?.height || "6 ft 1 in (185 cm)"}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Match Availability</span>
                  <span className={`inline-flex items-center gap-1.5 font-bold ${isAvailable ? 'text-emerald-600' : 'text-rose-600'}`}>
                    <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    {profile?.matchAvailability || "Available"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Decisive Saves</span>
                  <span className="font-bold text-neutral-950">{saves}+ Key Stops</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Tournaments Played</span>
                  <span className="font-bold text-neutral-950">{tournaments} Tournaments</span>
                </div>

              </div>

              {/* Tournament Readiness Statement */}
              <div className="p-4 sm:p-5 rounded-xl bg-neutral-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#FFE600] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FFE600]" />
                    Match-Ready & Professional Gear Included
                  </div>
                  <p className="text-xs text-neutral-300 mt-1">
                    Equipped with professional latex match gloves, official keeper kits, and proven shootout penalty record.
                  </p>
                </div>
                <button
                  onClick={onHireClick}
                  className="btn-football-yellow px-5 py-2.5 rounded-lg text-xs font-bold uppercase shrink-0 cursor-pointer"
                >
                  HIRE BADHON
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
