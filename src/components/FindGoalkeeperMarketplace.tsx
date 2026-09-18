import React, { useState } from 'react';
import { Search, Filter, Shield, Star, MapPin, UserCheck, Eye, X, CheckCircle2, ArrowRight } from 'lucide-react';
import { GoalkeeperItem } from '../types';

interface FindGoalkeeperMarketplaceProps {
  goalkeepers: GoalkeeperItem[];
  onRequestBookingGk: (gk: GoalkeeperItem) => void;
  onOpenAdminModal: () => void;
}

export const FindGoalkeeperMarketplace: React.FC<FindGoalkeeperMarketplaceProps> = ({
  goalkeepers,
  onRequestBookingGk,
  onOpenAdminModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [viewingProfile, setViewingProfile] = useState<GoalkeeperItem | null>(null);

  // Filter goalkeepers
  const filtered = goalkeepers.filter((gk) => {
    const matchesSearch =
      gk.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gk.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (gk.bio && gk.bio.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLocation =
      selectedLocation === 'all' ||
      gk.location.toLowerCase().includes(selectedLocation.toLowerCase());

    const matchesAvail =
      selectedAvailability === 'all' ||
      gk.availability.toLowerCase() === selectedAvailability.toLowerCase();

    return matchesSearch && matchesLocation && matchesAvail;
  });

  return (
    <section id="marketplace" className="py-16 sm:py-24 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-100 text-yellow-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Search className="w-3.5 h-3.5" />
              Goalkeeper Network
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-neutral-950 uppercase tracking-tight">
              FIND A GOALKEEPER
            </h2>
            <p className="text-base text-neutral-600 font-medium mt-1 max-w-2xl">
              If Badhon is unavailable or you need goalkeepers for multiple simultaneous tournament fixtures, browse vetted available goalkeepers in our network.
            </p>
          </div>

          <button
            onClick={onOpenAdminModal}
            className="text-xs font-bold text-neutral-600 hover:text-black border border-neutral-300 hover:bg-neutral-50 px-4 py-2.5 rounded-xl transition-all self-start md:self-auto cursor-pointer"
          >
            + Admin: Register Goalkeeper
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="sports-card p-4 sm:p-5 bg-neutral-50/70 mb-10 space-y-3 sm:space-y-0 sm:flex items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, zone (e.g. Dhanmondi, Mirpur), or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm focus:ring-2 focus:ring-yellow-400 outline-hidden"
            />
          </div>

          {/* Location Filter */}
          <div className="flex items-center gap-2 sm:w-48">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 bg-white text-xs font-semibold text-neutral-800 focus:ring-2 focus:ring-yellow-400 outline-hidden"
            >
              <option value="all">All Locations</option>
              <option value="dhaka">Dhaka</option>
              <option value="mirpur">Mirpur</option>
              <option value="dhanmondi">Dhanmondi</option>
              <option value="uttara">Uttara</option>
              <option value="chittagong">Chittagong</option>
            </select>
          </div>

          {/* Availability Filter */}
          <div className="flex items-center gap-2 sm:w-44">
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 bg-white text-xs font-semibold text-neutral-800 focus:ring-2 focus:ring-yellow-400 outline-hidden"
            >
              <option value="all">All Availability</option>
              <option value="available">🟢 Available Only</option>
              <option value="unavailable">🔴 Unavailable</option>
            </select>
          </div>
        </div>

        {/* Goalkeeper Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((gk) => {
            const isAvail = gk.availability === 'Available';

            return (
              <div
                key={gk.id}
                className={`sports-card p-6 bg-white flex flex-col justify-between relative transition-all duration-300 ${
                  gk.isPrimary
                    ? 'border-2 border-neutral-900 ring-2 ring-yellow-400/80 shadow-md'
                    : 'border border-neutral-200/80 hover:border-neutral-400'
                }`}
              >
                {/* Primary Badhon badge */}
                {gk.isPrimary && (
                  <div className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full bg-[#FFE600] text-black text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                    Primary Featured
                  </div>
                )}

                <div>
                  {/* Top Card Avatar & Identity */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-neutral-100 border-2 border-neutral-200 shrink-0 relative">
                      <img
                        src={gk.avatarUrl}
                        alt={gk.name}
                        className="w-full h-full object-cover object-top"
                      />
                      <span className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white ${isAvail ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-heading text-lg font-bold text-neutral-950 truncate">
                          {gk.name}
                        </h3>
                      </div>
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide truncate">
                        {gk.position}
                      </p>

                      <div className="flex items-center gap-1.5 text-xs text-neutral-600 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span className="truncate">{gk.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Attributes Matrix */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 text-center my-4 text-xs">
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase block font-semibold">Experience</span>
                      <span className="font-bold text-neutral-900">{gk.experience}</span>
                    </div>
                    <div className="border-x border-neutral-200">
                      <span className="text-[10px] text-neutral-400 uppercase block font-semibold">Rating</span>
                      <span className="font-bold text-neutral-900 flex items-center justify-center gap-0.5">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {gk.rating}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase block font-semibold">Status</span>
                      <span className={`font-bold ${isAvail ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {gk.availability}
                      </span>
                    </div>
                  </div>

                  {/* Starting Price */}
                  <div className="flex items-baseline justify-between py-2 border-t border-neutral-100">
                    <span className="text-xs text-neutral-500">Starting Price</span>
                    <span className="font-heading font-extrabold text-lg text-neutral-950">
                      {gk.currency} {gk.startingPrice.toLocaleString()} <span className="text-[10px] text-neutral-400 font-normal">/ match</span>
                    </span>
                  </div>
                </div>

                {/* Card CTA Buttons: VIEW PROFILE & REQUEST BOOKING */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-neutral-100">
                  <button
                    onClick={() => setViewingProfile(gk)}
                    className="btn-black py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>VIEW PROFILE</span>
                  </button>

                  <button
                    onClick={() => onRequestBookingGk(gk)}
                    className="btn-football-yellow py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>REQUEST BOOKING</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-neutral-200">
            <Shield className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-neutral-600">
              No goalkeepers found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLocation('all');
                setSelectedAvailability('all');
              }}
              className="mt-3 text-xs font-bold text-neutral-900 underline"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Goalkeeper Detailed Profile Modal */}
      {viewingProfile && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-neutral-200 shadow-2xl space-y-6 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Goalkeeper Dossier</span>
              </div>
              <button
                onClick={() => setViewingProfile(null)}
                className="text-neutral-400 hover:text-neutral-900 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-neutral-100 border-2 border-neutral-300 shrink-0">
                <img
                  src={viewingProfile.avatarUrl}
                  alt={viewingProfile.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-neutral-950">
                  {viewingProfile.name}
                </h3>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                  {viewingProfile.position}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-neutral-600 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{viewingProfile.location}</span>
                </div>
                <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-900 text-xs font-bold">
                  ★ {viewingProfile.rating} ({viewingProfile.reviewsCount || 0} reviews)
                </div>
              </div>
            </div>

            {viewingProfile.bio && (
              <p className="text-xs text-neutral-600 leading-relaxed bg-neutral-50 p-3.5 rounded-xl border border-neutral-100">
                "{viewingProfile.bio}"
              </p>
            )}

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-100">
                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Matches Played</span>
                <span className="font-bold text-neutral-950 text-sm">{viewingProfile.matchesPlayed || 0}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-100">
                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Clean Sheets</span>
                <span className="font-bold text-neutral-950 text-sm">{viewingProfile.cleanSheets || 0}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-100">
                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Preferred Foot</span>
                <span className="font-bold text-neutral-950 text-sm">{viewingProfile.preferredFoot || "Right"}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-100">
                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Height</span>
                <span className="font-bold text-neutral-950 text-sm">{viewingProfile.height || "6 ft 0 in"}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-neutral-100">
              <div>
                <span className="text-xs text-neutral-500 block">Match Booking Rate</span>
                <span className="font-heading font-extrabold text-xl text-neutral-950">
                  {viewingProfile.currency} {viewingProfile.startingPrice.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => {
                  const gk = viewingProfile;
                  setViewingProfile(null);
                  onRequestBookingGk(gk);
                }}
                className="btn-football-yellow px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>REQUEST THIS GOALKEEPER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
