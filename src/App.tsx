import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProfileSection } from './components/ProfileSection';
import { WhyHireSection } from './components/WhyHireSection';
import { PlayerShowcase } from './components/PlayerShowcase';
import { HiringSection } from './components/HiringSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { BookingStatusModal } from './components/BookingStatusModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FloatingContactFab } from './components/FloatingContactFab';

import {
  fetchProfile,
  fetchAvailability,
  fetchPricing,
  fetchReviews,
  fetchGallery,
  fetchContactSettings,
} from './api';

import {
  ProfileData,
  AvailabilityDay,
  PricingPlan,
  ReviewItem,
  GalleryItem,
  ContactSettings,
} from './types';

export default function App() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [availability, setAvailability] = useState<AvailabilityDay[]>([]);
  const [pricing, setPricing] = useState<PricingPlan[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [contact, setContact] = useState<ContactSettings | null>(null);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedTrackingCode, setSelectedTrackingCode] = useState<string>('');

  // Prefill states for booking form
  const [prefilledDate, setPrefilledDate] = useState<string>('');
  const [prefilledType, setPrefilledType] = useState<string>('');
  const [prefilledGk, setPrefilledGk] = useState<{ id: string; name: string } | undefined>(undefined);

  const loadData = async () => {
    try {
      setLoading(true);
      const [pData, aData, prData, rData, gData, cData] = await Promise.all([
        fetchProfile(),
        fetchAvailability(),
        fetchPricing(),
        fetchReviews(),
        fetchGallery(),
        fetchContactSettings(),
      ]);

      setProfile(pData);
      setAvailability(aData);
      setPricing(prData);
      setReviews(rData);
      setGallery(gData);
      setContact(cData);
    } catch (err) {
      console.error('Error fetching application data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHireClick = () => {
    setPrefilledGk({ id: 'badhon-01', name: 'GK Badhon' });
    scrollToSection('hiring-section');
  };

  const handleBookDateFromCalendar = (dateStr: string) => {
    setPrefilledDate(dateStr);
    scrollToSection('hiring-section');
  };

  const handleRequestBookingFromPricing = (categoryKey: string) => {
    let typeName = 'Match Booking';
    if (categoryKey === 'tournament') typeName = 'Tournament Booking';
    if (categoryKey === 'training') typeName = 'Training Session';
    if (categoryKey === 'custom') typeName = 'Custom Event';

    setPrefilledType(typeName);
    scrollToSection('hiring-section');
  };

  const handleTrackBooking = (code: string) => {
    setSelectedTrackingCode(code);
    setIsStatusModalOpen(true);
  };

  // Average review calculation
  const approvedReviews = reviews.filter((r) => r.status === 'approved');
  const avgRating = approvedReviews.length > 0
    ? Number((approvedReviews.reduce((acc, curr) => acc + curr.rating, 0) / approvedReviews.length).toFixed(1))
    : 4.9;

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-yellow-300 selection:text-black font-sans pb-16 md:pb-0">
      
      {/* Top Navigation */}
      <Navbar
        profile={profile}
        onOpenBooking={() => handleHireClick()}
        onOpenStatusModal={() => {
          setSelectedTrackingCode('');
          setIsStatusModalOpen(true);
        }}
        onOpenAdminModal={() => setIsAdminOpen(true)}
        activeSection="hero"
      />

      {/* Main Content Layout */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection
          profile={profile}
          onHireClick={handleHireClick}
          onViewProfileClick={() => scrollToSection('profile')}
          onCheckCalendarClick={handleHireClick}
        />

        {/* 2. Profile & Specs Section */}
        <ProfileSection
          profile={profile}
          onHireClick={handleHireClick}
          onOpenAdminModal={() => setIsAdminOpen(true)}
        />

        {/* 3. Why Hire Badhon */}
        <WhyHireSection onHireClick={handleHireClick} />

        {/* 4. Player Showcase & Visuals */}
        <PlayerShowcase
          gallery={gallery}
        />

        {/* 5. Official Hiring Booking Form */}
        <HiringSection
          prefilledDate={prefilledDate}
          prefilledType={prefilledType}
          prefilledGk={prefilledGk}
          onTrackBooking={handleTrackBooking}
        />

        {/* 8. Team Reviews */}
        <ReviewsSection
          reviews={approvedReviews}
          averageRating={avgRating}
          totalReviews={approvedReviews.length}
          onRefreshReviews={loadData}
          onOpenAdminModal={() => setIsAdminOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        contact={contact}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenTrackModal={() => {
          setSelectedTrackingCode('');
          setIsStatusModalOpen(true);
        }}
        onScrollTo={scrollToSection}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        onScrollTo={scrollToSection}
        onOpenTrackModal={() => {
          setSelectedTrackingCode('');
          setIsStatusModalOpen(true);
        }}
        phone={contact?.phone || '+880 1712-345678'}
      />

      {/* Floating Contact Fav Button showing TikTok and Instagram */}
      <FloatingContactFab
        tiktokUrl={profile?.tiktokUrl || contact?.tiktokUrl}
        instagramUrl={profile?.instagramUrl || contact?.instagramUrl}
      />

      {/* Booking Status Tracker Modal */}
      {isStatusModalOpen && (
        <BookingStatusModal
          initialCode={selectedTrackingCode}
          onClose={() => setIsStatusModalOpen(false)}
          onOpenBooking={handleHireClick}
        />
      )}

      {/* Admin Dashboard Modal */}
      {isAdminOpen && (
        <AdminDashboardModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          onDataChanged={loadData}
        />
      )}

    </div>
  );
}
