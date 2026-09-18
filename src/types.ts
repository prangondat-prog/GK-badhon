export type BookingStatus =
  | 'REQUESTED'
  | 'UNDER REVIEW'
  | 'ACCEPTED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'REJECTED'
  | 'CANCELLED';

export type AvailabilityStatus = 'available' | 'pending' | 'booked';

export interface ProfileData {
  name: string;
  role: string;
  tagline: string;
  position: string;
  preferredFoot: string;
  experience: string;
  location: string;
  age: number;
  height: string;
  matchAvailability: 'Available' | 'Unavailable';
  rating: number;
  totalReviews: number;
  matchesPlayed: number;
  tournamentsPlayed: number;
  saves: number;
  cleanSheets: number;
  savePercentage: number;
  penaltySaveRate: string;
  bio: string;
  avatarUrl: string;
  heroImageUrl: string;
  tiktokUrl?: string;
  instagramUrl?: string;
}

export interface AvailabilityDay {
  date: string; // YYYY-MM-DD
  status: AvailabilityStatus;
  note?: string;
  timeSlot?: string;
}

export interface PricingPlan {
  id: string;
  categoryKey: 'match' | 'tournament' | 'training' | 'custom';
  title: string;
  priceAmount: number | null;
  currency: string;
  isCustomPrice: boolean;
  unit: string;
  popular?: boolean;
  description: string;
  features: string[];
}

export interface BookingRequest {
  id: string;
  trackingCode: string;
  gkId: string;
  gkName: string;
  clientName: string;
  phone: string;
  email: string;
  teamName: string;
  matchType: string;
  matchDate: string;
  matchTime: string;
  location: string;
  numberOfMatches: number;
  expectedDuration: string;
  additionalMessage: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
  priceQuote?: number | null;
}

export interface ReviewItem {
  id: string;
  gkId: string;
  clientName: string;
  teamName: string;
  rating: number;
  review: string;
  matchDate: string;
  matchType?: string;
  status: 'approved' | 'pending';
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  type: 'photo' | 'video';
  category: 'Match Moments' | 'Saves' | 'Training' | 'Tournaments';
  url: string;
  title: string;
  description: string;
  date?: string;
  videoDuration?: string;
}

export interface GoalkeeperItem {
  id: string;
  name: string;
  position: string;
  location: string;
  availability: 'Available' | 'Unavailable';
  experience: string;
  rating: number;
  reviewsCount: number;
  startingPrice: number;
  currency: string;
  avatarUrl: string;
  cleanSheets?: number;
  matchesPlayed?: number;
  preferredFoot?: string;
  height?: string;
  bio?: string;
  isPrimary?: boolean;
}

export interface ContactSettings {
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  responseNotice: string;
  emergencyNotice?: string;
  tiktokUrl?: string;
  instagramUrl?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'review' | 'system';
  read: boolean;
  createdAt: string;
  relatedId?: string;
}

export interface DashboardStats {
  totalBookings: number;
  requestedBookings: number;
  underReviewBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  upcomingMatches: number;
  totalReviews: number;
  pendingReviews: number;
  averageRating: number;
}
