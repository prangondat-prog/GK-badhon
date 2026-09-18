import {
  ProfileData,
  AvailabilityDay,
  PricingPlan,
  BookingRequest,
  ReviewItem,
  GalleryItem,
  GoalkeeperItem,
  ContactSettings,
  DashboardStats
} from './types';

const BASE_URL = '/api';

// Admin token management
let adminToken = localStorage.getItem('gkbadhon_admin_token') || '';

export function getAdminToken(): string {
  return adminToken;
}

export function setAdminToken(token: string) {
  adminToken = token;
  if (token) {
    localStorage.setItem('gkbadhon_admin_token', token);
  } else {
    localStorage.removeItem('gkbadhon_admin_token');
  }
}

function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (adminToken) {
    headers['Authorization'] = `Bearer ${adminToken}`;
  }
  return headers;
}

export async function fetchProfile(): Promise<ProfileData> {
  const res = await fetch(`${BASE_URL}/profile`);
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
}

export async function updateProfile(data: Partial<ProfileData>): Promise<ProfileData> {
  const res = await fetch(`${BASE_URL}/profile`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
}

export async function fetchAvailability(): Promise<AvailabilityDay[]> {
  const res = await fetch(`${BASE_URL}/availability`);
  if (!res.ok) throw new Error('Failed to fetch availability');
  return res.json();
}

export async function updateAvailabilityDay(day: AvailabilityDay): Promise<AvailabilityDay[]> {
  const res = await fetch(`${BASE_URL}/availability`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(day),
  });
  if (!res.ok) throw new Error('Failed to update availability');
  return res.json();
}

export async function fetchPricing(): Promise<PricingPlan[]> {
  const res = await fetch(`${BASE_URL}/pricing`);
  if (!res.ok) throw new Error('Failed to fetch pricing');
  return res.json();
}

export async function updatePricing(plans: PricingPlan[]): Promise<PricingPlan[]> {
  const res = await fetch(`${BASE_URL}/pricing`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(plans),
  });
  if (!res.ok) throw new Error('Failed to update pricing');
  return res.json();
}

export async function createBookingRequest(payload: any): Promise<{ success: boolean; message: string; booking: BookingRequest }> {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to submit booking request');
  }
  return res.json();
}

export async function fetchBookings(): Promise<BookingRequest[]> {
  const res = await fetch(`${BASE_URL}/bookings`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return res.json();
}

export async function trackBookingByCode(code: string): Promise<BookingRequest> {
  const res = await fetch(`${BASE_URL}/bookings/track/${encodeURIComponent(code)}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Booking not found with this code');
  }
  return res.json();
}

export async function updateBookingStatus(
  id: string,
  status: string,
  adminNotes?: string,
  priceQuote?: number | null
): Promise<BookingRequest> {
  const res = await fetch(`${BASE_URL}/bookings/${id}/status`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ status, adminNotes, priceQuote }),
  });
  if (!res.ok) throw new Error('Failed to update booking status');
  return res.json();
}

export async function fetchReviews(): Promise<ReviewItem[]> {
  const res = await fetch(`${BASE_URL}/reviews`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}

export async function submitReview(payload: any): Promise<{ success: boolean; message: string; review: ReviewItem }> {
  const res = await fetch(`${BASE_URL}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to submit review');
  }
  return res.json();
}

export async function updateReviewStatus(id: string, status: 'approved' | 'pending'): Promise<ReviewItem> {
  const res = await fetch(`${BASE_URL}/reviews/${id}/status`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update review status');
  return res.json();
}

export async function deleteReview(id: string): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/reviews/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return res.ok;
}

export async function fetchGallery(): Promise<GalleryItem[]> {
  const res = await fetch(`${BASE_URL}/gallery`);
  if (!res.ok) throw new Error('Failed to fetch gallery');
  return res.json();
}

export async function addGalleryItem(payload: Partial<GalleryItem>): Promise<GalleryItem> {
  const res = await fetch(`${BASE_URL}/gallery`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to add gallery item');
  return res.json();
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/gallery/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return res.ok;
}

export async function fetchGoalkeepers(params?: { search?: string; location?: string; availability?: string }): Promise<GoalkeeperItem[]> {
  const q = new URLSearchParams();
  if (params?.search) q.append('search', params.search);
  if (params?.location) q.append('location', params.location);
  if (params?.availability) q.append('availability', params.availability);
  const res = await fetch(`${BASE_URL}/goalkeepers?${q.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch goalkeepers');
  return res.json();
}

export async function addGoalkeeper(payload: Partial<GoalkeeperItem>): Promise<GoalkeeperItem> {
  const res = await fetch(`${BASE_URL}/goalkeepers`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to add goalkeeper');
  return res.json();
}

export async function deleteGoalkeeper(id: string): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/goalkeepers/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return res.ok;
}

export async function fetchContactSettings(): Promise<ContactSettings> {
  const res = await fetch(`${BASE_URL}/contact`);
  if (!res.ok) throw new Error('Failed to fetch contact settings');
  return res.json();
}

export async function updateContactSettings(data: Partial<ContactSettings>): Promise<ContactSettings> {
  const res = await fetch(`${BASE_URL}/contact`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update contact settings');
  return res.json();
}

export async function adminLogin(passcode: string): Promise<{ success: boolean; token: string }> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ passcode }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Authentication failed');
  }
  const data = await res.json();
  setAdminToken(data.token);
  return data;
}

export async function verifyAdminAuth(): Promise<boolean> {
  if (!adminToken) return false;
  try {
    const res = await fetch(`${BASE_URL}/auth/verify`, {
      headers: authHeaders(),
    });
    const data = await res.json();
    return !!data.authenticated;
  } catch {
    return false;
  }
}

export async function fetchDashboardStats(): Promise<{ stats: DashboardStats; notifications: any[] }> {
  const res = await fetch(`${BASE_URL}/stats/dashboard`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch dashboard stats');
  return res.json();
}
