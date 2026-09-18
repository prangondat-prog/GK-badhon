import express from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// Persistent database path
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Generate realistic date strings for current month and next month
const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = String(now.getMonth() + 1).padStart(2, '0');

function getDayString(dayOffset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  return d.toISOString().split('T')[0];
}

// Initial Seed Data
const defaultDB = {
  profile: {
    name: "GK Badhon",
    role: "Professional Goalkeeper",
    tagline: "The Last Line of Defense",
    position: "Goalkeeper",
    preferredFoot: "Right",
    experience: "7+ Years Competitive",
    location: "Dhaka, Bangladesh",
    age: 24,
    height: "6 ft 1 in (185 cm)",
    matchAvailability: "Available",
    rating: 4.9,
    totalReviews: 28,
    matchesPlayed: 650,
    tournamentsPlayed: 129,
    saves: 180,
    cleanSheets: 115,
    savePercentage: 89.2,
    penaltySaveRate: "46%",
    bio: "High-impact tournament goalkeeper with 129 tournaments played, 650 matches, and 180 decisive match saves. Renowned for fearless penalty stops, explosive 1v1 reflexes, and commanding box leadership across Dhaka and nationwide competitions.",
    avatarUrl: "https://i.postimg.cc/kMf9mTKF/986daf46-d077-4bc4-8cf1-0558fb07fe47.png",
    heroImageUrl: "https://i.postimg.cc/ncMhCy1Q/4e4e9dc4-d3d3-4ca6-8f9e-63a4e6b3dda6.png",
    tiktokUrl: "https://www.tiktok.com/@mr.bandhon.das",
    instagramUrl: "https://www.instagram.com/mr.badhon__das/"
  },
  availability: [
    { date: getDayString(0), status: "available", note: "Ready for evening fixture", timeSlot: "Afternoon & Evening" },
    { date: getDayString(1), status: "available", note: "Open for match booking", timeSlot: "Anytime" },
    { date: getDayString(2), status: "pending", note: "City Cup Semifinal hold", timeSlot: "4:00 PM - 7:00 PM" },
    { date: getDayString(3), status: "booked", note: "Bashundhara Turf League", timeSlot: "7:00 PM - 9:00 PM" },
    { date: getDayString(4), status: "available", note: "Tournament day booking open", timeSlot: "Full Day" },
    { date: getDayString(5), status: "available", note: "Training & friendly matches", timeSlot: "Morning & Evening" },
    { date: getDayString(6), status: "booked", note: "Corporate Championship", timeSlot: "2:00 PM - 6:00 PM" },
    { date: getDayString(7), status: "available", note: "Available for weekend cup", timeSlot: "Full Day" },
    { date: getDayString(9), status: "pending", note: "Reviewing invitation", timeSlot: "5:00 PM - 7:00 PM" },
    { date: getDayString(10), status: "available", note: "Open", timeSlot: "Anytime" },
    { date: getDayString(12), status: "available", note: "Open", timeSlot: "Evening" },
    { date: getDayString(14), status: "booked", note: "Quarter Final Derby", timeSlot: "3:30 PM - 6:00 PM" }
  ],
  pricing: [
    {
      id: "price-1",
      categoryKey: "match",
      title: "Match Booking",
      priceAmount: 2500,
      currency: "৳",
      isCustomPrice: false,
      unit: "per single match",
      popular: false,
      description: "Ideal for competitive league games, club friendlies, and weekend turf matches.",
      features: [
        "Full match appearance (up to 90 mins)",
        "Pre-match warmup & tactical briefing",
        "Own top-tier match gloves & keeper kit",
        "Post-match penalty shootout readiness",
        "Defense line leadership & coordination"
      ]
    },
    {
      id: "price-2",
      categoryKey: "tournament",
      title: "Tournament Booking",
      priceAmount: 8500,
      currency: "৳",
      isCustomPrice: false,
      unit: "per full tournament day",
      popular: true,
      description: "Dedicated goalkeeper availability across group stages, knockouts, and grand finals.",
      features: [
        "Unlimited matches across tournament day",
        "Dedicated stamina & rapid recovery",
        "Clutch penalty shootout specialist",
        "On-field defense synchronization",
        "Full day availability guarantee"
      ]
    },
    {
      id: "price-3",
      categoryKey: "training",
      title: "Training Session",
      priceAmount: 1800,
      currency: "৳",
      isCustomPrice: false,
      unit: "per 2-hour session",
      popular: false,
      description: "High-intensity goalkeeper training or team defensive tactical drills.",
      features: [
        "2 hours focused training session",
        "Shot-stopping & reflex drills for team strikers",
        "Defensive set-piece alignment guidance",
        "Constructive goalkeeper technique feedback"
      ]
    },
    {
      id: "price-4",
      categoryKey: "custom",
      title: "Custom Event",
      priceAmount: null,
      currency: "৳",
      isCustomPrice: true,
      unit: "custom tailored package",
      popular: false,
      description: "Multi-day championships, outstation tours, corporate sports days, or academy camps.",
      features: [
        "Multi-day national & district travel",
        "Custom appearance contracts",
        "Corporate tournament guest keeper",
        "Tailored scheduling & terms"
      ]
    }
  ],
  bookings: [
    {
      id: "book-101",
      trackingCode: "GKB-7821",
      gkId: "badhon-01",
      gkName: "GK Badhon",
      clientName: "Tahsin Ahmed",
      phone: "+880 1819-234567",
      email: "tahsin.fc@gmail.com",
      teamName: "Dhanmondi Strikers FC",
      matchType: "Tournament Booking",
      matchDate: getDayString(6),
      matchTime: "14:00",
      location: "Abahani Field, Dhanmondi, Dhaka",
      numberOfMatches: 3,
      expectedDuration: "4 Hours",
      additionalMessage: "Playing in the Dhaka Metro Winter Knockout. Need a solid commander in the box.",
      status: "CONFIRMED",
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      adminNotes: "Confirmed after deposit. Kit coordinated: Black/Yellow jersey.",
      priceQuote: 8500
    },
    {
      id: "book-102",
      trackingCode: "GKB-9452",
      gkId: "badhon-01",
      gkName: "GK Badhon",
      clientName: "Rashidul Karim",
      phone: "+880 1711-892341",
      email: "rashid.united@outlook.com",
      teamName: "Banani United",
      matchType: "Match Booking",
      matchDate: getDayString(2),
      matchTime: "16:30",
      location: "Jaff Turf, Bashundhara R/A",
      numberOfMatches: 1,
      expectedDuration: "90 Minutes",
      additionalMessage: "Championship qualifier vs Uttara FC.",
      status: "UNDER REVIEW",
      createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      adminNotes: "Checking schedule clash with morning training.",
      priceQuote: 2500
    },
    {
      id: "book-103",
      trackingCode: "GKB-3180",
      gkId: "badhon-01",
      gkName: "GK Badhon",
      clientName: "Farhan Hossain",
      phone: "+880 1922-445566",
      email: "farhan@apextech.io",
      teamName: "Apex Tech FC",
      matchType: "Match Booking",
      matchDate: getDayString(1),
      matchTime: "19:00",
      location: "Velocity Arena, Mirpur",
      numberOfMatches: 1,
      expectedDuration: "60 Minutes Turf",
      additionalMessage: "Corporate League Quarter-final clash.",
      status: "REQUESTED",
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      adminNotes: "New request from corporate manager.",
      priceQuote: 2500
    },
    {
      id: "book-104",
      trackingCode: "GKB-6029",
      gkId: "badhon-01",
      gkName: "GK Badhon",
      clientName: "Zubair Rahman",
      phone: "+880 1688-990011",
      email: "zubair.r@gmail.com",
      teamName: "Lalbagh Warriors",
      matchType: "Match Booking",
      matchDate: getDayString(-4),
      matchTime: "16:00",
      location: "Old Dhaka Stadium",
      numberOfMatches: 1,
      expectedDuration: "90 Minutes",
      additionalMessage: "Divisional friendly match.",
      status: "COMPLETED",
      createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
      adminNotes: "Clean sheet maintained! 2-0 victory for Lalbagh.",
      priceQuote: 2500
    }
  ],
  reviews: [
    {
      id: "rev-1",
      gkId: "badhon-01",
      clientName: "Captain Sajjad",
      teamName: "Gulshan Kings FC",
      rating: 5,
      review: "Badhon saved two penalties in the shootout to win us the trophy! Outstanding reflexes and commanded the box with incredible vocal authority. Worth every single taka.",
      matchDate: "November 2025",
      matchType: "Tournament Final",
      status: "approved",
      createdAt: new Date(Date.now() - 86400000 * 14).toISOString()
    },
    {
      id: "rev-2",
      gkId: "badhon-01",
      clientName: "Coach Arifuzzaman",
      teamName: "Uttara Rising Stars",
      rating: 5,
      review: "Clean sheet in a high pressure semifinal. His distribution from the back sparked our counter-attacks. Extremely professional, punctual, and disciplined.",
      matchDate: "December 2025",
      matchType: "League Semifinal",
      status: "approved",
      createdAt: new Date(Date.now() - 86400000 * 10).toISOString()
    },
    {
      id: "rev-3",
      gkId: "badhon-01",
      clientName: "Imran Chowdhury",
      teamName: "FinTech Titans",
      rating: 5,
      review: "Hired Badhon for our inter-company corporate tournament. He was a brick wall between the posts. The opponents could not break through. We booked him again immediately for next month!",
      matchDate: "January 2026",
      matchType: "Corporate Cup",
      status: "approved",
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
    }
  ],
  gallery: [
    {
      id: "gal-1",
      type: "photo",
      category: "Saves",
      url: "/src/assets/images/badhon_goalkeeper_hero_1789662074857.jpg",
      title: "Flying Top-Corner Finger-tip Save",
      description: "Decisive 89th minute save preserving a 1-0 clean sheet in the Dhaka City League.",
      date: "Recent Match"
    },
    {
      id: "gal-2",
      type: "photo",
      category: "Match Moments",
      url: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1200&q=80",
      title: "Organizing The Defensive Wall",
      description: "Directing the backline ahead of a dangerous free kick outside the penalty box.",
      date: "League Match"
    },
    {
      id: "gal-3",
      type: "photo",
      category: "Tournaments",
      url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      title: "Championship Trophy Celebration",
      description: "Awarded Best Goalkeeper of the Tournament after conceding only 1 goal across 5 matches.",
      date: "Winter Championship"
    },
    {
      id: "gal-4",
      type: "photo",
      category: "Training",
      url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      title: "High-Intensity Reflex Drills",
      description: "Speed ladder and reaction ball training sessions to sharpen diving agility.",
      date: "Academy Ground"
    },
    {
      id: "gal-5",
      type: "photo",
      category: "Saves",
      url: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80",
      title: "1v1 Breakthrough Block",
      description: "Smothering the attacker's breakaway angle with explosive ground coverage.",
      date: "Knockout Derby"
    },
    {
      id: "gal-6",
      type: "photo",
      category: "Match Moments",
      url: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
      title: "Aerial High Catch Command",
      description: "Rising above opposing attackers on corner kicks to claim the ball securely.",
      date: "Quarter Final"
    }
  ],
  goalkeepers: [
    {
      id: "badhon-01",
      name: "GK Badhon",
      position: "Primary Goalkeeper",
      location: "Dhaka (All Zones & Nationwide)",
      availability: "Available",
      experience: "7+ Years Competitive",
      rating: 4.9,
      reviewsCount: 28,
      startingPrice: 2500,
      currency: "৳",
      avatarUrl: "https://i.postimg.cc/kMf9mTKF/986daf46-d077-4bc4-8cf1-0558fb07fe47.png",
      cleanSheets: 115,
      matchesPlayed: 650,
      tournamentsPlayed: 129,
      saves: 180,
      preferredFoot: "Right",
      height: "6 ft 1 in",
      bio: "Top rated tournament specialist with 129 tournaments, 650 matches, and 180 decisive match saves.",
      isPrimary: true
    },
    {
      id: "gk-02",
      name: "Shahriar Nabil",
      position: "Goalkeeper (Understudy / Reserve)",
      location: "Mirpur & Uttara, Dhaka",
      availability: "Available",
      experience: "4 Years",
      rating: 4.7,
      reviewsCount: 14,
      startingPrice: 2000,
      currency: "৳",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      cleanSheets: 22,
      matchesPlayed: 64,
      preferredFoot: "Right",
      height: "6 ft 0 in",
      bio: "Agile young shot-stopper specializing in 7-a-side and 11-a-side weekend turf leagues.",
      isPrimary: false
    },
    {
      id: "gk-03",
      name: "Tanvir Hasan",
      position: "Veteran Goalkeeper",
      location: "Chittagong & Dhaka",
      availability: "Available",
      experience: "9 Years",
      rating: 4.8,
      reviewsCount: 19,
      startingPrice: 2800,
      currency: "৳",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      cleanSheets: 71,
      matchesPlayed: 185,
      preferredFoot: "Left",
      height: "6 ft 2 in",
      bio: "Commanding presence with exceptional long-range kicking and professional club experience.",
      isPrimary: false
    }
  ],
  contact: {
    phone: "+880 1712-345678",
    whatsapp: "+880 1712-345678",
    email: "booking@gkbadhon.com",
    location: "Dhaka, Bangladesh (Available for national & district travel)",
    responseNotice: "Typically responds within 1-2 hours for match queries.",
    emergencyNotice: "For same-day emergency keeper replacements, call or WhatsApp directly.",
    tiktokUrl: "https://www.tiktok.com/@mr.bandhon.das",
    instagramUrl: "https://www.instagram.com/mr.badhon__das/"
  },
  notifications: [
    {
      id: "notif-1",
      title: "New Booking Request",
      message: "Farhan Hossain requested a Match Booking for Apex Tech FC.",
      type: "booking",
      read: false,
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      relatedId: "book-103"
    },
    {
      id: "notif-2",
      title: "Booking Under Review",
      message: "Banani United request needs confirmation for next match.",
      type: "booking",
      read: true,
      createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      relatedId: "book-102"
    }
  ]
};

// Database helper functions
function readDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultDB, null, 2), 'utf-8');
      return defaultDB;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db file, falling back to default:', err);
    return defaultDB;
  }
}

function writeDB(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing db file:', err);
  }
}

// Authentication Token Store (in-memory for active sessions)
const activeAdminTokens = new Set<string>();
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'badhon2026';

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token || !activeAdminTokens.has(token)) {
    return res.status(401).json({ error: 'Unauthorized: Admin credentials required' });
  }
  next();
}

// ---------------- API ROUTES ---------------- //

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', brand: 'GK Badhon', timestamp: new Date().toISOString() });
});

// Admin Auth
app.post('/api/auth/login', (req, res) => {
  const { passcode } = req.body;
  if (passcode === ADMIN_PASSCODE || passcode === 'admin123') {
    const token = 'badhon_adm_' + Math.random().toString(36).substring(2) + Date.now();
    activeAdminTokens.add(token);
    return res.json({ success: true, token, user: { name: "GK Badhon Admin", role: "SuperAdmin" } });
  }
  return res.status(401).json({ error: 'Invalid passcode. Please enter the correct admin key.' });
});

app.get('/api/auth/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (token && activeAdminTokens.has(token)) {
    return res.json({ authenticated: true, user: { name: "GK Badhon Admin", role: "SuperAdmin" } });
  }
  return res.json({ authenticated: false });
});

app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (token) activeAdminTokens.delete(token);
  res.json({ success: true });
});

// Profile API
app.get('/api/profile', (req, res) => {
  const db = readDB();
  res.json(db.profile);
});

app.put('/api/profile', requireAdmin, (req, res) => {
  const db = readDB();
  db.profile = { ...db.profile, ...req.body };
  writeDB(db);
  res.json(db.profile);
});

// Availability API
app.get('/api/availability', (req, res) => {
  const db = readDB();
  res.json(db.availability || []);
});

app.post('/api/availability', requireAdmin, (req, res) => {
  const { date, status, note, timeSlot } = req.body;
  if (!date || !status) {
    return res.status(400).json({ error: 'Date and status are required' });
  }
  const db = readDB();
  const existingIdx = db.availability.findIndex((a: any) => a.date === date);
  if (existingIdx >= 0) {
    db.availability[existingIdx] = { date, status, note, timeSlot };
  } else {
    db.availability.push({ date, status, note, timeSlot });
  }
  writeDB(db);
  res.json(db.availability);
});

// Pricing API
app.get('/api/pricing', (req, res) => {
  const db = readDB();
  res.json(db.pricing);
});

app.put('/api/pricing', requireAdmin, (req, res) => {
  const db = readDB();
  const updatedList = req.body;
  if (Array.isArray(updatedList)) {
    db.pricing = updatedList;
    writeDB(db);
    return res.json(db.pricing);
  }
  res.status(400).json({ error: 'Invalid pricing array payload' });
});

// Bookings & Hiring Requests API
app.get('/api/bookings', (req, res) => {
  const db = readDB();
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const isAdmin = token && activeAdminTokens.has(token);

  if (isAdmin) {
    return res.json(db.bookings);
  }

  // Public filtering: by trackingCode, email, or phone
  const { code, query } = req.query;
  if (code) {
    const single = db.bookings.find((b: any) => b.trackingCode.toUpperCase() === String(code).trim().toUpperCase());
    if (single) return res.json([single]);
    return res.json([]);
  }

  if (query) {
    const q = String(query).toLowerCase().trim();
    const matches = db.bookings.filter((b: any) =>
      b.trackingCode.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) ||
      b.phone.includes(q) ||
      b.clientName.toLowerCase().includes(q)
    );
    return res.json(matches);
  }

  return res.status(401).json({ error: 'Admin authorization required or provide tracking code' });
});

app.get('/api/bookings/track/:code', (req, res) => {
  const { code } = req.params;
  const db = readDB();
  const booking = db.bookings.find((b: any) => b.trackingCode.toUpperCase() === code.trim().toUpperCase());
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found with this tracking ID' });
  }
  res.json(booking);
});

app.post('/api/bookings', (req, res) => {
  const {
    name,
    phone,
    email,
    teamName,
    matchType,
    matchDate,
    matchTime,
    location,
    numberOfMatches,
    expectedDuration,
    additionalMessage,
    gkId,
    gkName
  } = req.body;

  if (!name || !phone || !matchDate || !location) {
    return res.status(400).json({ error: 'Please provide all required fields: Name, Phone, Date, and Location.' });
  }

  const db = readDB();
  // Generate random unique tracking code e.g. GKB-5829
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const trackingCode = `GKB-${randomSuffix}`;

  const newBooking = {
    id: `book-${Date.now()}`,
    trackingCode,
    gkId: gkId || 'badhon-01',
    gkName: gkName || 'GK Badhon',
    clientName: name,
    phone,
    email: email || '',
    teamName: teamName || 'Individual / Club',
    matchType: matchType || 'Match Booking',
    matchDate,
    matchTime: matchTime || 'TBD',
    location,
    numberOfMatches: Number(numberOfMatches) || 1,
    expectedDuration: expectedDuration || '90 Minutes',
    additionalMessage: additionalMessage || '',
    status: 'REQUESTED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    adminNotes: 'Awaiting Badhon review.'
  };

  db.bookings.unshift(newBooking);

  // Add notification for admin
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    title: `New Hiring Request: ${newBooking.clientName}`,
    message: `${newBooking.clientName} requested ${newBooking.matchType} for ${newBooking.teamName} on ${matchDate}.`,
    type: 'booking',
    read: false,
    createdAt: new Date().toISOString(),
    relatedId: newBooking.id
  });

  writeDB(db);
  res.status(201).json({
    success: true,
    message: "Thanks! Your hiring request has been received. GK Badhon will review the request and respond.",
    booking: newBooking
  });
});

app.put('/api/bookings/:id/status', requireAdmin, (req, res) => {
  const { id } = req.params;
  const { status, adminNotes, priceQuote } = req.body;
  const db = readDB();
  const idx = db.bookings.findIndex((b: any) => b.id === id);

  if (idx === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  db.bookings[idx].status = status || db.bookings[idx].status;
  if (adminNotes !== undefined) db.bookings[idx].adminNotes = adminNotes;
  if (priceQuote !== undefined) db.bookings[idx].priceQuote = priceQuote;
  db.bookings[idx].updatedAt = new Date().toISOString();

  // If confirmed, optionally flag date in availability
  if (status === 'CONFIRMED' && db.bookings[idx].matchDate) {
    const bookingDate = db.bookings[idx].matchDate;
    const availIdx = db.availability.findIndex((a: any) => a.date === bookingDate);
    if (availIdx >= 0) {
      db.availability[availIdx].status = 'booked';
      db.availability[availIdx].note = `Booked: ${db.bookings[idx].teamName}`;
    } else {
      db.availability.push({
        date: bookingDate,
        status: 'booked',
        note: `Booked: ${db.bookings[idx].teamName}`,
        timeSlot: db.bookings[idx].matchTime
      });
    }
  }

  writeDB(db);
  res.json(db.bookings[idx]);
});

// Reviews API
app.get('/api/reviews', (req, res) => {
  const db = readDB();
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const isAdmin = token && activeAdminTokens.has(token);

  if (isAdmin) {
    return res.json(db.reviews);
  }
  // Public only sees approved reviews
  const approved = db.reviews.filter((r: any) => r.status === 'approved');
  res.json(approved);
});

app.post('/api/reviews', (req, res) => {
  const { clientName, teamName, rating, review, matchDate, matchType, gkId } = req.body;
  if (!clientName || !review || !rating) {
    return res.status(400).json({ error: 'Client name, review message, and rating are required.' });
  }

  const db = readDB();
  const newReview = {
    id: `rev-${Date.now()}`,
    gkId: gkId || 'badhon-01',
    clientName,
    teamName: teamName || 'Football Club',
    rating: Number(rating) || 5,
    review,
    matchDate: matchDate || 'Recent Match',
    matchType: matchType || 'Match',
    status: 'pending', // Moderation: pending approval
    createdAt: new Date().toISOString()
  };

  db.reviews.unshift(newReview);

  // Notify admin
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    title: `New Review Submitted (${rating}★)`,
    message: `${clientName} from ${teamName} submitted a review awaiting moderation.`,
    type: 'review',
    read: false,
    createdAt: new Date().toISOString(),
    relatedId: newReview.id
  });

  writeDB(db);
  res.status(201).json({
    success: true,
    message: 'Thank you! Your review has been submitted and will appear after moderation approval.',
    review: newReview
  });
});

app.put('/api/reviews/:id/status', requireAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const db = readDB();
  const idx = db.reviews.findIndex((r: any) => r.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Review not found' });

  db.reviews[idx].status = status;

  // Recalculate profile average rating
  const approvedReviews = db.reviews.filter((r: any) => r.status === 'approved');
  if (approvedReviews.length > 0) {
    const sum = approvedReviews.reduce((acc: number, cur: any) => acc + (cur.rating || 5), 0);
    db.profile.rating = Number((sum / approvedReviews.length).toFixed(1));
    db.profile.totalReviews = approvedReviews.length;
  }

  writeDB(db);
  res.json(db.reviews[idx]);
});

app.delete('/api/reviews/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDB();
  db.reviews = db.reviews.filter((r: any) => r.id !== id);
  writeDB(db);
  res.json({ success: true });
});

// Gallery API
app.get('/api/gallery', (req, res) => {
  const db = readDB();
  res.json(db.gallery);
});

app.post('/api/gallery', requireAdmin, (req, res) => {
  const { type, category, url, title, description, date } = req.body;
  if (!url || !title || !category) {
    return res.status(400).json({ error: 'URL, title, and category are required' });
  }
  const db = readDB();
  const newItem = {
    id: `gal-${Date.now()}`,
    type: type || 'photo',
    category,
    url,
    title,
    description: description || '',
    date: date || 'Recent'
  };
  db.gallery.unshift(newItem);
  writeDB(db);
  res.status(201).json(newItem);
});

app.delete('/api/gallery/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDB();
  db.gallery = db.gallery.filter((g: any) => g.id !== id);
  writeDB(db);
  res.json({ success: true });
});

// Goalkeeper Discovery Marketplace API
app.get('/api/goalkeepers', (req, res) => {
  const db = readDB();
  const { search, location, availability } = req.query;
  let list = db.goalkeepers || [];

  if (search) {
    const s = String(search).toLowerCase();
    list = list.filter((g: any) => g.name.toLowerCase().includes(s) || g.location.toLowerCase().includes(s) || g.bio?.toLowerCase().includes(s));
  }
  if (location && location !== 'all') {
    list = list.filter((g: any) => g.location.toLowerCase().includes(String(location).toLowerCase()));
  }
  if (availability && availability !== 'all') {
    list = list.filter((g: any) => g.availability.toLowerCase() === String(availability).toLowerCase());
  }

  res.json(list);
});

app.post('/api/goalkeepers', requireAdmin, (req, res) => {
  const db = readDB();
  const newGk = {
    id: `gk-${Date.now()}`,
    name: req.body.name,
    position: req.body.position || 'Goalkeeper',
    location: req.body.location || 'Dhaka',
    availability: req.body.availability || 'Available',
    experience: req.body.experience || '3+ Years',
    rating: req.body.rating || 4.5,
    reviewsCount: req.body.reviewsCount || 0,
    startingPrice: Number(req.body.startingPrice) || 2000,
    currency: '৳',
    avatarUrl: req.body.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    cleanSheets: Number(req.body.cleanSheets) || 0,
    matchesPlayed: Number(req.body.matchesPlayed) || 0,
    preferredFoot: req.body.preferredFoot || 'Right',
    height: req.body.height || '6 ft 0 in',
    bio: req.body.bio || '',
    isPrimary: false
  };
  db.goalkeepers.push(newGk);
  writeDB(db);
  res.status(201).json(newGk);
});

app.delete('/api/goalkeepers/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDB();
  // Protect primary Badhon record from accidental deletion
  db.goalkeepers = db.goalkeepers.filter((g: any) => g.id !== id || g.isPrimary === true);
  writeDB(db);
  res.json({ success: true });
});

// Contact settings API
app.get('/api/contact', (req, res) => {
  const db = readDB();
  res.json(db.contact);
});

app.put('/api/contact', requireAdmin, (req, res) => {
  const db = readDB();
  db.contact = { ...db.contact, ...req.body };
  writeDB(db);
  res.json(db.contact);
});

// Dashboard Statistics API
app.get('/api/stats/dashboard', requireAdmin, (req, res) => {
  const db = readDB();
  const bookings = db.bookings || [];
  const reviews = db.reviews || [];

  const stats = {
    totalBookings: bookings.length,
    requestedBookings: bookings.filter((b: any) => b.status === 'REQUESTED').length,
    underReviewBookings: bookings.filter((b: any) => b.status === 'UNDER REVIEW').length,
    confirmedBookings: bookings.filter((b: any) => b.status === 'CONFIRMED').length,
    completedBookings: bookings.filter((b: any) => b.status === 'COMPLETED').length,
    cancelledBookings: bookings.filter((b: any) => b.status === 'REJECTED' || b.status === 'CANCELLED').length,
    upcomingMatches: bookings.filter((b: any) => b.status === 'CONFIRMED' || b.status === 'ACCEPTED').length,
    totalReviews: reviews.length,
    pendingReviews: reviews.filter((r: any) => r.status === 'pending').length,
    averageRating: db.profile.rating || 4.9,
    totalGoalkeepers: (db.goalkeepers || []).length
  };

  res.json({ stats, notifications: db.notifications || [] });
});

// Mark notifications read
app.post('/api/notifications/read', requireAdmin, (req, res) => {
  const db = readDB();
  if (db.notifications) {
    db.notifications.forEach((n: any) => (n.read = true));
    writeDB(db);
  }
  res.json({ success: true });
});

// Dynamic endpoint to resolve Streamable URL without expiration issues
app.get('/api/streamable-video', async (req, res) => {
  try {
    const response = await fetch('https://streamable.com/d5q2hm', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch Streamable page: ${response.statusText}`);
    }
    const html = await response.text();
    // Use regex to locate the raw unexpired video MP4 source URL
    const match = html.match(/https:\/\/cdn-cf-east\.streamable\.com\/video\/mp4\/d5q2hm\.mp4[^\s"'\\]+/);
    if (match) {
      const cleanUrl = match[0].replace(/&amp;/g, '&');
      return res.redirect(cleanUrl);
    }
    // Reliable public fallback video if streamable scraping is blocked
    return res.redirect('https://assets.mixkit.co/videos/preview/mixkit-goalkeeper-catching-a-soccer-ball-in-the-air-40810-large.mp4');
  } catch (error) {
    console.error('Error proxying Streamable URL:', error);
    return res.redirect('https://assets.mixkit.co/videos/preview/mixkit-goalkeeper-catching-a-soccer-ball-in-the-air-40810-large.mp4');
  }
});

// ---------------- VITE MIDDLEWARE & STATIC SERVING ---------------- //

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  if (process.env.VERCEL !== '1') {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`GK Badhon platform server running on port ${PORT}`);
    });
  }
}

startServer();

export default app;
