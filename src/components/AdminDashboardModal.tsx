import React, { useState, useEffect } from 'react';
import {
  X, Lock, Shield, CheckCircle2, AlertCircle, Clock, Calendar,
  Tag, Star, Camera, Plus, Trash2, Edit3, Save, LogOut, Phone, Users
} from 'lucide-react';
import {
  BookingRequest,
  ProfileData,
  AvailabilityDay,
  PricingPlan,
  ReviewItem,
  GalleryItem,
  GoalkeeperItem,
  ContactSettings,
  DashboardStats,
  BookingStatus
} from '../types';
import {
  adminLogin,
  verifyAdminAuth,
  setAdminToken,
  fetchBookings,
  updateBookingStatus,
  fetchProfile,
  updateProfile,
  fetchAvailability,
  updateAvailabilityDay,
  fetchPricing,
  updatePricing,
  fetchReviews,
  updateReviewStatus,
  deleteReview,
  fetchGallery,
  addGalleryItem,
  deleteGalleryItem,
  fetchGoalkeepers,
  addGoalkeeper,
  deleteGoalkeeper,
  fetchContactSettings,
  updateContactSettings,
  fetchDashboardStats
} from '../api';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  onDataChanged,
}) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('badhon2026');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'bookings' | 'availability' | 'profile' | 'pricing' | 'reviews' | 'gallery' | 'goalkeepers' | 'contact'
  >('overview');

  // Admin Data States
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [availability, setAvailability] = useState<AvailabilityDay[]>([]);
  const [pricing, setPricing] = useState<PricingPlan[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [goalkeepers, setGoalkeepers] = useState<GoalkeeperItem[]>([]);
  const [contact, setContact] = useState<ContactSettings | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  // Form helpers
  const [statusActionNote, setStatusActionNote] = useState('');
  const [quotedFee, setQuotedFee] = useState<number | ''>('');
  const [selectedBookingForAction, setSelectedBookingForAction] = useState<BookingRequest | null>(null);

  // New gallery item state
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState<'Match Moments' | 'Saves' | 'Training' | 'Tournaments'>('Saves');
  const [newGalleryDesc, setNewGalleryDesc] = useState('');

  // New goalkeeper state
  const [newGkName, setNewGkName] = useState('');
  const [newGkLocation, setNewGkLocation] = useState('Dhaka');
  const [newGkPrice, setNewGkPrice] = useState(2000);
  const [newGkExp, setNewGkExp] = useState('3+ Years');

  // Availability fast editor
  const [availDate, setAvailDate] = useState(new Date().toISOString().split('T')[0]);
  const [availStatus, setAvailStatus] = useState<'available' | 'pending' | 'booked'>('available');
  const [availNote, setAvailNote] = useState('');
  const [availTimeSlot, setAvailTimeSlot] = useState('');

  // Check auth on open
  useEffect(() => {
    if (isOpen) {
      verifyAdminAuth().then((isAuth) => {
        setAuthenticated(isAuth);
        if (isAuth) loadAllAdminData();
      });
    }
  }, [isOpen]);

  const loadAllAdminData = async () => {
    try {
      const [
        bList, pData, aList, prList, rList, gList, gkList, cData, sData
      ] = await Promise.all([
        fetchBookings(),
        fetchProfile(),
        fetchAvailability(),
        fetchPricing(),
        fetchReviews(),
        fetchGallery(),
        fetchGoalkeepers(),
        fetchContactSettings(),
        fetchDashboardStats()
      ]);
      setBookings(bList);
      setProfile(pData);
      setAvailability(aList);
      setPricing(prList);
      setReviews(rList);
      setGallery(gList);
      setGoalkeepers(gkList);
      setContact(cData);
      setStats(sData.stats);
    } catch (err) {
      console.error('Error loading admin data:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      await adminLogin(passcode);
      setAuthenticated(true);
      loadAllAdminData();
    } catch (err: any) {
      setLoginError(err.message || 'Invalid passcode');
    }
  };

  const handleLogout = () => {
    setAdminToken('');
    setAuthenticated(false);
  };

  // Change booking status handler
  const handleUpdateBookingStatus = async (id: string, newStatus: BookingStatus) => {
    try {
      const updated = await updateBookingStatus(
        id,
        newStatus,
        statusActionNote || undefined,
        quotedFee === '' ? undefined : Number(quotedFee)
      );
      setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
      setSelectedBookingForAction(null);
      setStatusActionNote('');
      setQuotedFee('');
      onDataChanged();
      loadAllAdminData();
    } catch (err: any) {
      alert(err.message || 'Failed to update booking status');
    }
  };

  // Save profile updates
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    try {
      const updated = await updateProfile(profile);
      setProfile(updated);
      alert('Profile updated successfully!');
      onDataChanged();
    } catch (err: any) {
      alert(err.message || 'Failed to update profile');
    }
  };

  // Save pricing changes
  const handleSavePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await updatePricing(pricing);
      setPricing(updated);
      alert('Pricing packages updated successfully!');
      onDataChanged();
    } catch (err: any) {
      alert(err.message || 'Failed to update pricing');
    }
  };

  // Update availability day
  const handleSetAvailability = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!availDate) return;
    try {
      const updated = await updateAvailabilityDay({
        date: availDate,
        status: availStatus,
        note: availNote,
        timeSlot: availTimeSlot
      });
      setAvailability(updated);
      setAvailNote('');
      setAvailTimeSlot('');
      alert(`Date ${availDate} updated to ${availStatus.toUpperCase()}`);
      onDataChanged();
    } catch (err: any) {
      alert(err.message || 'Failed to update date availability');
    }
  };

  // Moderate review
  const handleModerateReview = async (id: string, status: 'approved' | 'pending') => {
    try {
      const updated = await updateReviewStatus(id, status);
      setReviews((prev) => prev.map((r) => (r.id === id ? updated : r)));
      onDataChanged();
      loadAllAdminData();
    } catch (err: any) {
      alert(err.message || 'Failed to moderate review');
    }
  };

  // Delete review
  const handleDeleteReview = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      await deleteReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
      onDataChanged();
    } catch (err: any) {
      alert(err.message || 'Failed to delete review');
    }
  };

  // Add gallery item
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryUrl || !newGalleryTitle) return;
    try {
      const newItem = await addGalleryItem({
        url: newGalleryUrl,
        title: newGalleryTitle,
        category: newGalleryCategory,
        description: newGalleryDesc,
        type: 'photo'
      });
      setGallery((prev) => [newItem, ...prev]);
      setNewGalleryUrl('');
      setNewGalleryTitle('');
      setNewGalleryDesc('');
      alert('Gallery item published!');
      onDataChanged();
    } catch (err: any) {
      alert(err.message || 'Failed to add gallery item');
    }
  };

  // Delete gallery item
  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Delete this showcase photo?')) return;
    try {
      await deleteGalleryItem(id);
      setGallery((prev) => prev.filter((g) => g.id !== id));
      onDataChanged();
    } catch (err: any) {
      alert(err.message || 'Failed to delete gallery item');
    }
  };

  // Add goalkeeper to network
  const handleAddGoalkeeper = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGkName.trim()) return;
    try {
      const newGk = await addGoalkeeper({
        name: newGkName,
        location: newGkLocation,
        startingPrice: newGkPrice,
        experience: newGkExp,
        availability: 'Available',
        position: 'Goalkeeper',
        rating: 4.8,
        reviewsCount: 5,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
      });
      setGoalkeepers((prev) => [...prev, newGk]);
      setNewGkName('');
      alert(`Goalkeeper ${newGk.name} registered to network!`);
      onDataChanged();
    } catch (err: any) {
      alert(err.message || 'Failed to register goalkeeper');
    }
  };

  // Delete goalkeeper
  const handleDeleteGoalkeeper = async (id: string) => {
    if (!confirm('Remove this goalkeeper from the network?')) return;
    try {
      await deleteGoalkeeper(id);
      setGoalkeepers((prev) => prev.filter((g) => g.id !== id));
      onDataChanged();
    } catch (err: any) {
      alert(err.message || 'Failed to delete goalkeeper');
    }
  };

  // Save contact settings
  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) return;
    try {
      const updated = await updateContactSettings(contact);
      setContact(updated);
      alert('Contact channels updated!');
      onDataChanged();
    } catch (err: any) {
      alert(err.message || 'Failed to update contact settings');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full h-[90vh] flex flex-col border border-neutral-300 shadow-2xl overflow-hidden animate-in zoom-in-95">
        
        {/* Top Bar */}
        <div className="bg-neutral-950 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-400 text-black flex items-center justify-center font-extrabold">
              <Shield className="w-5 h-5 fill-black stroke-neutral-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-lg text-white">
                  GK BADHON CONTROL CENTER
                </h3>
                <span className="px-2 py-0.5 rounded bg-yellow-400 text-black text-[10px] font-bold uppercase">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Bookings, Schedule, Match Pricing, Reviews & Platform Configuration
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {authenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!authenticated ? (
          /* Login Screen */
          <div className="flex-1 flex items-center justify-center p-6 bg-neutral-50">
            <div className="max-w-md w-full p-8 rounded-2xl bg-white border border-neutral-200 shadow-xl space-y-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-yellow-100 text-yellow-800 flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7" />
              </div>

              <div>
                <h4 className="font-heading text-2xl font-bold text-neutral-950">
                  Badhon Admin Portal
                </h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Enter your admin passcode to access hiring requests and dashboard controls.
                </p>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                    Passcode / Admin Key
                  </label>
                  <input
                    type="password"
                    required
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter admin passcode..."
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-yellow-400 outline-hidden font-mono"
                  />
                  <div className="mt-2 text-[11px] text-neutral-400 flex items-center justify-between">
                    <span>Default demo key: <strong className="text-neutral-800 font-mono">badhon2026</strong></span>
                    <button
                      type="button"
                      onClick={() => {
                        setPasscode('badhon2026');
                      }}
                      className="text-yellow-600 hover:text-yellow-700 font-bold underline cursor-pointer"
                    >
                      Fill Demo Key
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-football-yellow w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
                >
                  UNLOCK DASHBOARD
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard Tabs Layout */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-56 bg-neutral-900 text-neutral-300 p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto shrink-0 text-xs font-semibold border-r border-neutral-800">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'overview' ? 'bg-[#FFE600] text-black font-bold' : 'hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <span>📊</span>
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('bookings')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between gap-2.5 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'bookings' ? 'bg-[#FFE600] text-black font-bold' : 'hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span>💼</span>
                  <span>Hiring Requests</span>
                </div>
                {bookings.filter((b) => b.status === 'REQUESTED').length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-extrabold">
                    {bookings.filter((b) => b.status === 'REQUESTED').length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('availability')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'availability' ? 'bg-[#FFE600] text-black font-bold' : 'hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <span>📅</span>
                <span>Availability</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'profile' ? 'bg-[#FFE600] text-black font-bold' : 'hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <span>🧤</span>
                <span>Profile & Stats</span>
              </button>

              <button
                onClick={() => setActiveTab('pricing')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'pricing' ? 'bg-[#FFE600] text-black font-bold' : 'hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <span>💰</span>
                <span>Pricing Packages</span>
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between gap-2.5 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'reviews' ? 'bg-[#FFE600] text-black font-bold' : 'hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span>⭐</span>
                  <span>Reviews Moderation</span>
                </div>
                {reviews.filter((r) => r.status === 'pending').length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-black text-[10px] font-extrabold">
                    {reviews.filter((r) => r.status === 'pending').length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'gallery' ? 'bg-[#FFE600] text-black font-bold' : 'hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <span>📸</span>
                <span>Player Gallery</span>
              </button>

              <button
                onClick={() => setActiveTab('goalkeepers')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'goalkeepers' ? 'bg-[#FFE600] text-black font-bold' : 'hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <span>🔎</span>
                <span>GK Network</span>
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'contact' ? 'bg-[#FFE600] text-black font-bold' : 'hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <span>📱</span>
                <span>Contact Channels</span>
              </button>
            </div>

            {/* Tab Body View */}
            <div className="flex-1 p-6 overflow-y-auto bg-neutral-50">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h4 className="font-heading text-xl font-bold text-neutral-950">
                    Platform Performance & Overview
                  </h4>

                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-white border border-neutral-200">
                      <span className="text-[11px] font-bold text-neutral-400 uppercase">New Requests</span>
                      <div className="font-heading text-3xl font-extrabold text-neutral-950 mt-1">
                        {stats?.requestedBookings || bookings.filter((b) => b.status === 'REQUESTED').length}
                      </div>
                      <span className="text-[10px] text-amber-600 font-semibold">Awaiting review</span>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-neutral-200">
                      <span className="text-[11px] font-bold text-neutral-400 uppercase">Confirmed Matches</span>
                      <div className="font-heading text-3xl font-extrabold text-neutral-950 mt-1">
                        {stats?.confirmedBookings || bookings.filter((b) => b.status === 'CONFIRMED').length}
                      </div>
                      <span className="text-[10px] text-emerald-600 font-semibold">Locked in calendar</span>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-neutral-200">
                      <span className="text-[11px] font-bold text-neutral-400 uppercase">Completed</span>
                      <div className="font-heading text-3xl font-extrabold text-neutral-950 mt-1">
                        {stats?.completedBookings || bookings.filter((b) => b.status === 'COMPLETED').length}
                      </div>
                      <span className="text-[10px] text-neutral-500 font-semibold">Finished fixtures</span>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-neutral-200">
                      <span className="text-[11px] font-bold text-neutral-400 uppercase">Pending Reviews</span>
                      <div className="font-heading text-3xl font-extrabold text-neutral-950 mt-1">
                        {stats?.pendingReviews || reviews.filter((r) => r.status === 'pending').length}
                      </div>
                      <span className="text-[10px] text-yellow-600 font-semibold">Moderation queue</span>
                    </div>
                  </div>

                  {/* Upcoming / Active Bookings Preview */}
                  <div className="p-5 rounded-xl bg-white border border-neutral-200 space-y-3">
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                      <h5 className="font-heading text-base font-bold text-neutral-950">
                        Recent Hiring Requests
                      </h5>
                      <button
                        onClick={() => setActiveTab('bookings')}
                        className="text-xs font-bold text-yellow-600 hover:text-black underline"
                      >
                        Manage All ({bookings.length})
                      </button>
                    </div>

                    <div className="space-y-2">
                      {bookings.slice(0, 4).map((b) => (
                        <div
                          key={b.id}
                          className="p-3 rounded-lg border border-neutral-100 bg-neutral-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-neutral-900">{b.trackingCode}</span>
                              <span className="font-bold text-neutral-950">{b.teamName}</span>
                              <span className="text-neutral-500">• {b.clientName}</span>
                            </div>
                            <p className="text-neutral-500 mt-0.5">
                              {b.matchType} on <strong>{b.matchDate}</strong> ({b.matchTime}) at {b.location}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                              b.status === 'REQUESTED' ? 'bg-amber-100 text-amber-800' :
                              b.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800' :
                              b.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' : 'bg-neutral-200 text-neutral-800'
                            }`}>
                              {b.status}
                            </span>
                            <button
                              onClick={() => {
                                setSelectedBookingForAction(b);
                                setActiveTab('bookings');
                              }}
                              className="px-2.5 py-1 rounded bg-neutral-900 text-white text-[11px] font-bold"
                            >
                              Action
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: HIRING REQUESTS & BOOKINGS */}
              {activeTab === 'bookings' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-heading text-xl font-bold text-neutral-950">
                        Manage Match Hiring Requests
                      </h4>
                      <p className="text-xs text-neutral-500">
                        Review, accept, quote price, confirm, or reject client booking requests.
                      </p>
                    </div>
                  </div>

                  {/* Selected Booking Action Drawer */}
                  {selectedBookingForAction && (
                    <div className="p-5 rounded-2xl bg-neutral-950 text-white space-y-4 shadow-xl border border-neutral-800">
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-yellow-400 font-bold">{selectedBookingForAction.trackingCode}</span>
                          <span className="text-neutral-300 font-bold">{selectedBookingForAction.teamName}</span>
                        </div>
                        <button
                          onClick={() => setSelectedBookingForAction(null)}
                          className="text-neutral-400 hover:text-white text-xs font-bold"
                        >
                          ✕ Close Action
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="text-neutral-400 block font-semibold mb-1">Update Admin Notes for Client</label>
                          <input
                            type="text"
                            placeholder="e.g. Schedule approved. Please bring Black/Yellow jersey."
                            value={statusActionNote}
                            onChange={(e) => setStatusActionNote(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-neutral-400 block font-semibold mb-1">Set Price Quote (৳ BDT)</label>
                          <input
                            type="number"
                            placeholder="e.g. 2500"
                            value={quotedFee}
                            onChange={(e) => setQuotedFee(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
                          />
                        </div>
                      </div>

                      {/* Status Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-800">
                        <span className="text-xs text-neutral-400 mr-2 font-bold">Move to:</span>
                        <button
                          onClick={() => handleUpdateBookingStatus(selectedBookingForAction.id, 'UNDER REVIEW')}
                          className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-amber-300"
                        >
                          UNDER REVIEW
                        </button>
                        <button
                          onClick={() => handleUpdateBookingStatus(selectedBookingForAction.id, 'ACCEPTED')}
                          className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-sky-300"
                        >
                          ACCEPT
                        </button>
                        <button
                          onClick={() => handleUpdateBookingStatus(selectedBookingForAction.id, 'CONFIRMED')}
                          className="btn-football-yellow px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase"
                        >
                          CONFIRM BOOKING
                        </button>
                        <button
                          onClick={() => handleUpdateBookingStatus(selectedBookingForAction.id, 'COMPLETED')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold"
                        >
                          MARK COMPLETED
                        </button>
                        <button
                          onClick={() => handleUpdateBookingStatus(selectedBookingForAction.id, 'REJECTED')}
                          className="px-3 py-1.5 rounded-lg bg-rose-900 hover:bg-rose-800 text-rose-200 text-xs font-bold"
                        >
                          REJECT / CANCEL
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Bookings Table */}
                  <div className="bg-white rounded-xl border border-neutral-200 overflow-x-auto shadow-xs">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-neutral-100 text-neutral-600 uppercase font-bold text-[10px] tracking-wider border-b border-neutral-200">
                        <tr>
                          <th className="p-3">Code / Team</th>
                          <th className="p-3">Match Date & Time</th>
                          <th className="p-3">Venue</th>
                          <th className="p-3">Contact</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {bookings.map((b) => (
                          <tr key={b.id} className="hover:bg-neutral-50 transition-colors">
                            <td className="p-3">
                              <span className="font-mono font-bold text-neutral-900 block">{b.trackingCode}</span>
                              <span className="font-bold text-neutral-950 text-sm">{b.teamName}</span>
                              <span className="text-[11px] text-neutral-500 block">{b.matchType}</span>
                            </td>
                            <td className="p-3">
                              <div className="font-semibold text-neutral-900">{b.matchDate}</div>
                              <div className="text-neutral-500">{b.matchTime} ({b.expectedDuration})</div>
                            </td>
                            <td className="p-3">
                              <div className="text-neutral-800 font-medium max-w-[180px] truncate">{b.location}</div>
                            </td>
                            <td className="p-3">
                              <div className="font-semibold text-neutral-900">{b.clientName}</div>
                              <div className="text-neutral-500">{b.phone}</div>
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                                b.status === 'REQUESTED' ? 'bg-amber-100 text-amber-800' :
                                b.status === 'UNDER REVIEW' ? 'bg-purple-100 text-purple-800' :
                                b.status === 'ACCEPTED' ? 'bg-blue-100 text-blue-800' :
                                b.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800' :
                                b.status === 'COMPLETED' ? 'bg-neutral-900 text-white' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {b.status}
                              </span>
                              {b.priceQuote && (
                                <span className="block text-[10px] text-neutral-500 font-bold mt-1">৳ {b.priceQuote}</span>
                              )}
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => {
                                  setSelectedBookingForAction(b);
                                  setStatusActionNote(b.adminNotes || '');
                                  setQuotedFee(b.priceQuote || '');
                                }}
                                className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-black text-white text-xs font-bold cursor-pointer"
                              >
                                Manage
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

              {/* TAB 3: AVAILABILITY */}
              {activeTab === 'availability' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-heading text-xl font-bold text-neutral-950">
                      Match Availability Calendar Manager
                    </h4>
                    <p className="text-xs text-neutral-500">
                      Set match days as Available (🟢), Pending (🟡), or Booked (🔴) with time slots and notes.
                    </p>
                  </div>

                  {/* Set Date Form */}
                  <form onSubmit={handleSetAvailability} className="p-5 rounded-2xl bg-white border border-neutral-200 space-y-4 shadow-xs">
                    <h5 className="font-bold text-sm text-neutral-950">Update Single Date Availability</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="text-xs font-bold text-neutral-700 block mb-1">Select Date *</label>
                        <input
                          type="date"
                          required
                          value={availDate}
                          onChange={(e) => setAvailDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-neutral-700 block mb-1">Status *</label>
                        <select
                          value={availStatus}
                          onChange={(e: any) => setAvailStatus(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white font-bold"
                        >
                          <option value="available">🟢 Available for Booking</option>
                          <option value="pending">🟡 Pending / On Hold</option>
                          <option value="booked">🔴 Booked (No fixtures)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-neutral-700 block mb-1">Time Slot</label>
                        <input
                          type="text"
                          placeholder="e.g. 4:00 PM - 7:00 PM"
                          value={availTimeSlot}
                          onChange={(e) => setAvailTimeSlot(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-neutral-700 block mb-1">Schedule Note</label>
                        <input
                          type="text"
                          placeholder="e.g. Bashundhara Turf Match"
                          value={availNote}
                          onChange={(e) => setAvailNote(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn-football-yellow px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
                    >
                      SAVE DATE STATUS
                    </button>
                  </form>

                  {/* Scheduled entries table */}
                  <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden text-xs">
                    <div className="p-3 bg-neutral-100 font-bold text-neutral-700 uppercase text-[10px]">
                      Configured Schedule Dates ({availability.length})
                    </div>
                    <div className="divide-y divide-neutral-100 max-h-72 overflow-y-auto">
                      {availability.map((day) => (
                        <div key={day.date} className="p-3 flex items-center justify-between">
                          <div>
                            <span className="font-bold text-neutral-950 mr-3">{day.date}</span>
                            <span className="text-neutral-500">{day.note || 'No notes'}</span>
                            {day.timeSlot && <span className="text-neutral-400 ml-2 font-mono">({day.timeSlot})</span>}
                          </div>
                          <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                            day.status === 'available' ? 'bg-emerald-100 text-emerald-800' :
                            day.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {day.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: PROFILE & STATS */}
              {activeTab === 'profile' && profile && (
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div>
                    <h4 className="font-heading text-xl font-bold text-neutral-950">
                      Goalkeeper Profile & Real Match Statistics
                    </h4>
                    <p className="text-xs text-neutral-500">
                      Update official stats, physical specs, bio, and general availability status.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-4 shadow-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-bold text-neutral-700 block mb-1">Matches Played</label>
                        <input
                          type="number"
                          value={profile.matchesPlayed}
                          onChange={(e) => setProfile({ ...profile, matchesPlayed: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-neutral-700 block mb-1">Recorded Saves</label>
                        <input
                          type="number"
                          value={profile.saves}
                          onChange={(e) => setProfile({ ...profile, saves: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-neutral-700 block mb-1">Clean Sheets</label>
                        <input
                          type="number"
                          value={profile.cleanSheets}
                          onChange={(e) => setProfile({ ...profile, cleanSheets: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-bold text-neutral-700 block mb-1">Match Availability</label>
                        <select
                          value={profile.matchAvailability}
                          onChange={(e: any) => setProfile({ ...profile, matchAvailability: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-bold bg-white"
                        >
                          <option value="Available">🟢 Available</option>
                          <option value="Unavailable">🔴 Unavailable</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-neutral-700 block mb-1">Age</label>
                        <input
                          type="number"
                          value={profile.age}
                          onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-neutral-700 block mb-1">Height</label>
                        <input
                          type="text"
                          value={profile.height}
                          onChange={(e) => setProfile({ ...profile, height: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-neutral-700 block mb-1">Preferred Foot</label>
                        <input
                          type="text"
                          value={profile.preferredFoot}
                          onChange={(e) => setProfile({ ...profile, preferredFoot: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-neutral-700 block mb-1">Experience</label>
                        <input
                          type="text"
                          value={profile.experience}
                          onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-neutral-700 block mb-1">Hero Banner Image URL</label>
                        <input
                          type="text"
                          value={profile.heroImageUrl || ''}
                          onChange={(e) => setProfile({ ...profile, heroImageUrl: e.target.value })}
                          placeholder="https://...image url"
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                        />
                        <span className="text-[10px] text-neutral-400 mt-0.5 block">Used in the primary hero banner</span>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-neutral-700 block mb-1">Official TikTok Profile URL</label>
                        <input
                          type="text"
                          value={profile.tiktokUrl || ''}
                          onChange={(e) => setProfile({ ...profile, tiktokUrl: e.target.value })}
                          placeholder="https://www.tiktok.com/@mr.bandhon.das"
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                        />
                        <span className="text-[10px] text-neutral-400 mt-0.5 block">TikTok profile and match saves handle</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-700 block mb-1">Profile Bio</label>
                      <textarea
                        rows={3}
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-football-yellow px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
                    >
                      SAVE PROFILE CHANGES
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 5: PRICING PACKAGES */}
              {activeTab === 'pricing' && (
                <form onSubmit={handleSavePricing} className="space-y-6">
                  <div>
                    <h4 className="font-heading text-xl font-bold text-neutral-950">
                      Match & Tournament Pricing (৳ BDT)
                    </h4>
                    <p className="text-xs text-neutral-500">
                      Configure booking rates shown on public pricing cards.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {pricing.map((plan, idx) => (
                      <div key={plan.id} className="p-4 rounded-xl bg-white border border-neutral-200 text-xs space-y-3">
                        <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                          <span className="font-bold text-sm text-neutral-950">{plan.title}</span>
                          <span className="text-neutral-400 uppercase font-mono">{plan.categoryKey}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="text-neutral-500 block font-semibold mb-1">Price in ৳ (null for Custom Quote)</label>
                            <input
                              type="number"
                              value={plan.priceAmount ?? ''}
                              placeholder="Custom Quote"
                              onChange={(e) => {
                                const val = e.target.value === '' ? null : Number(e.target.value);
                                const copy = [...pricing];
                                copy[idx].priceAmount = val;
                                copy[idx].isCustomPrice = val === null;
                                setPricing(copy);
                              }}
                              className="w-full px-3 py-1.5 rounded-lg border border-neutral-300"
                            />
                          </div>

                          <div>
                            <label className="text-neutral-500 block font-semibold mb-1">Unit Label</label>
                            <input
                              type="text"
                              value={plan.unit}
                              onChange={(e) => {
                                const copy = [...pricing];
                                copy[idx].unit = e.target.value;
                                setPricing(copy);
                              }}
                              className="w-full px-3 py-1.5 rounded-lg border border-neutral-300"
                            />
                          </div>

                          <div>
                            <label className="text-neutral-500 block font-semibold mb-1">Description</label>
                            <input
                              type="text"
                              value={plan.description}
                              onChange={(e) => {
                                const copy = [...pricing];
                                copy[idx].description = e.target.value;
                                setPricing(copy);
                              }}
                              className="w-full px-3 py-1.5 rounded-lg border border-neutral-300"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      type="submit"
                      className="btn-football-yellow px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
                    >
                      SAVE PRICING RATES
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 6: REVIEWS MODERATION */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-heading text-xl font-bold text-neutral-950">
                      Match Reviews & Feedback Moderation
                    </h4>
                    <p className="text-xs text-neutral-500">
                      Approve legitimate reviews to display them on the website, or reject fraudulent/spam entries.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className={`p-4 rounded-xl bg-white border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          rev.status === 'pending' ? 'border-amber-300 ring-2 ring-amber-100' : 'border-neutral-200'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-neutral-950">{rev.clientName}</span>
                            <span className="text-neutral-500">({rev.teamName})</span>
                            <span className="text-yellow-500 font-bold">★ {rev.rating}</span>
                            <span className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase ${
                              rev.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {rev.status}
                            </span>
                          </div>
                          <p className="text-neutral-700 italic mt-1">
                            "{rev.review}"
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {rev.status === 'pending' ? (
                            <button
                              onClick={() => handleModerateReview(rev.id, 'approved')}
                              className="btn-football-yellow px-3 py-1.5 rounded-lg text-xs font-bold"
                            >
                              Approve
                            </button>
                          ) : (
                            <button
                              onClick={() => handleModerateReview(rev.id, 'pending')}
                              className="px-3 py-1.5 rounded-lg border border-neutral-300 text-neutral-700 text-xs font-bold"
                            >
                              Hide
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteReview(rev.id)}
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                            title="Delete Review"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: GALLERY */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-heading text-xl font-bold text-neutral-950">
                      Player Showcase Gallery Management
                    </h4>
                    <p className="text-xs text-neutral-500">
                      Add photos or match videos to showcase Badhon's saves, tournaments, and training.
                    </p>
                  </div>

                  {/* Add New Media Form */}
                  <form onSubmit={handleAddGallery} className="p-4 rounded-xl bg-white border border-neutral-200 text-xs space-y-3">
                    <h5 className="font-bold text-neutral-900 text-sm">Add New Showcase Visual</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-neutral-600 block mb-1 font-semibold">Image/Media URL *</label>
                        <input
                          type="url"
                          required
                          placeholder="https://..."
                          value={newGalleryUrl}
                          onChange={(e) => setNewGalleryUrl(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-neutral-300"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-600 block mb-1 font-semibold">Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Diving Penalty Save"
                          value={newGalleryTitle}
                          onChange={(e) => setNewGalleryTitle(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-neutral-300"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-600 block mb-1 font-semibold">Category</label>
                        <select
                          value={newGalleryCategory}
                          onChange={(e: any) => setNewGalleryCategory(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 bg-white"
                        >
                          <option value="Saves">Saves</option>
                          <option value="Match Moments">Match Moments</option>
                          <option value="Training">Training</option>
                          <option value="Tournaments">Tournaments</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-neutral-600 block mb-1 font-semibold">Description</label>
                      <input
                        type="text"
                        placeholder="Context about match or training..."
                        value={newGalleryDesc}
                        onChange={(e) => setNewGalleryDesc(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-neutral-300"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-football-yellow px-5 py-2 rounded-lg text-xs font-bold uppercase"
                    >
                      PUBLISH SHOWCASE ITEM
                    </button>
                  </form>

                  {/* Gallery Items Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {gallery.map((g) => (
                      <div key={g.id} className="relative rounded-xl overflow-hidden border border-neutral-200 group bg-neutral-900">
                        <img src={g.url} alt={g.title} className="w-full h-28 object-cover opacity-85 group-hover:opacity-100" />
                        <div className="p-2 bg-white text-[11px]">
                          <span className="font-bold text-neutral-950 block truncate">{g.title}</span>
                          <span className="text-neutral-400">{g.category}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteGallery(g.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-md bg-rose-600 text-white shadow-xs"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 8: GOALKEEPER NETWORK (MARKETPLACE) */}
              {activeTab === 'goalkeepers' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-heading text-xl font-bold text-neutral-950">
                      Goalkeeper Marketplace Registry
                    </h4>
                    <p className="text-xs text-neutral-500">
                      Expand the platform by adding verified goalkeepers to the database.
                    </p>
                  </div>

                  {/* Register New Goalkeeper Form */}
                  <form onSubmit={handleAddGoalkeeper} className="p-4 rounded-xl bg-white border border-neutral-200 text-xs space-y-3">
                    <h5 className="font-bold text-neutral-900 text-sm">Register Alternative Goalkeeper</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="text-neutral-600 block mb-1 font-semibold">Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Mahfuz Riad"
                          value={newGkName}
                          onChange={(e) => setNewGkName(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-neutral-300"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-600 block mb-1 font-semibold">Location</label>
                        <input
                          type="text"
                          value={newGkLocation}
                          onChange={(e) => setNewGkLocation(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-neutral-300"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-600 block mb-1 font-semibold">Starting Price (৳)</label>
                        <input
                          type="number"
                          value={newGkPrice}
                          onChange={(e) => setNewGkPrice(Number(e.target.value))}
                          className="w-full px-3 py-1.5 rounded-lg border border-neutral-300"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-600 block mb-1 font-semibold">Experience</label>
                        <input
                          type="text"
                          value={newGkExp}
                          onChange={(e) => setNewGkExp(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-neutral-300"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn-football-yellow px-5 py-2 rounded-lg text-xs font-bold uppercase"
                    >
                      + ADD TO GOALKEEPER NETWORK
                    </button>
                  </form>

                  {/* Registered Goalkeepers List */}
                  <div className="space-y-2">
                    {goalkeepers.map((gk) => (
                      <div key={gk.id} className="p-3 rounded-xl bg-white border border-neutral-200 text-xs flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={gk.avatarUrl} alt={gk.name} className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-neutral-950">{gk.name}</span>
                              {gk.isPrimary && <span className="px-1.5 py-0.2 rounded bg-yellow-400 text-black text-[9px] font-extrabold uppercase">Primary</span>}
                            </div>
                            <span className="text-neutral-500">{gk.location} • {gk.currency} {gk.startingPrice} • {gk.experience}</span>
                          </div>
                        </div>

                        {!gk.isPrimary && (
                          <button
                            onClick={() => handleDeleteGoalkeeper(gk.id)}
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                            title="Remove Goalkeeper"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 9: CONTACT */}
              {activeTab === 'contact' && contact && (
                <form onSubmit={handleSaveContact} className="space-y-6">
                  <div>
                    <h4 className="font-heading text-xl font-bold text-neutral-950">
                      Contact & Communication Details
                    </h4>
                    <p className="text-xs text-neutral-500">
                      Controls the official phone, WhatsApp, and emergency response notices.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-neutral-700 block mb-1">Phone Number (Call Button)</label>
                        <input
                          type="text"
                          value={contact.phone}
                          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-neutral-700 block mb-1">WhatsApp Number</label>
                        <input
                          type="text"
                          value={contact.whatsapp}
                          onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-neutral-700 block mb-1">Official Email</label>
                        <input
                          type="email"
                          value={contact.email}
                          onChange={(e) => setContact({ ...contact, email: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-neutral-700 block mb-1">Location Notice</label>
                        <input
                          type="text"
                          value={contact.location}
                          onChange={(e) => setContact({ ...contact, location: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="font-bold text-neutral-700 block mb-1">Official TikTok Profile URL</label>
                        <input
                          type="text"
                          value={contact.tiktokUrl || ''}
                          onChange={(e) => setContact({ ...contact, tiktokUrl: e.target.value })}
                          placeholder="https://www.tiktok.com/@mr.bandhon.das"
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-neutral-700 block mb-1">Emergency Match Notice</label>
                      <input
                        type="text"
                        value={contact.emergencyNotice || ''}
                        onChange={(e) => setContact({ ...contact, emergencyNotice: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-neutral-300"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-football-yellow px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
                    >
                      SAVE CONTACT SETTINGS
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
