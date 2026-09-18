import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, AlertCircle, Shield, ArrowRight, UserCheck, Calendar, MapPin } from 'lucide-react';
import { trackBookingByCode } from '../api';
import { BookingRequest, BookingStatus } from '../types';

interface BookingStatusModalProps {
  initialCode?: string;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const BookingStatusModal: React.FC<BookingStatusModalProps> = ({
  initialCode = '',
  onClose,
  onOpenBooking,
}) => {
  const [trackingCode, setTrackingCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<BookingRequest | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const statusPipeline: BookingStatus[] = [
    'REQUESTED',
    'UNDER REVIEW',
    'ACCEPTED',
    'CONFIRMED',
    'COMPLETED',
  ];

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!trackingCode.trim()) {
      setErrorMsg('Please enter your booking tracking code (e.g. GKB-7821).');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await trackBookingByCode(trackingCode.trim());
      setBooking(res);
    } catch (err: any) {
      setErrorMsg(err.message || 'No booking found matching this code. Please verify the code.');
      setBooking(null);
    } finally {
      setLoading(false);
    }
  };

  // Auto trigger if initialCode passed
  React.useEffect(() => {
    if (initialCode) {
      setTrackingCode(initialCode);
      handleSearch();
    }
  }, [initialCode]);

  const getStatusIndex = (currentStatus: BookingStatus) => {
    return statusPipeline.indexOf(currentStatus);
  };

  const isCancelled = booking?.status === 'REJECTED' || booking?.status === 'CANCELLED';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-neutral-200 shadow-2xl space-y-6 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-950 text-yellow-400 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-neutral-950">
                Track Hiring Request
              </h3>
              <p className="text-xs text-neutral-500">
                Check real-time status of your match booking
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter Booking Tracking Code (e.g. GKB-7821 or GKB-9452)..."
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-300 text-sm font-mono tracking-wider uppercase focus:ring-2 focus:ring-yellow-400 outline-hidden"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-football-yellow px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0"
          >
            {loading ? 'Searching...' : 'CHECK STATUS'}
          </button>
        </form>

        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Booking Details Result */}
        {booking && (
          <div className="space-y-6 pt-2">
            
            {/* Status Pipeline Visual Tracker */}
            <div className="p-5 rounded-2xl bg-neutral-950 text-white space-y-4">
              <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-3">
                <span className="text-neutral-400 font-medium">Tracking Code:</span>
                <span className="font-mono text-yellow-400 font-bold text-sm tracking-wider">
                  {booking.trackingCode}
                </span>
              </div>

              {isCancelled ? (
                <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-center space-y-1">
                  <div className="text-rose-400 font-bold uppercase tracking-wider text-sm">
                    Status: {booking.status}
                  </div>
                  <p className="text-xs text-neutral-300">
                    This match request could not be fulfilled due to schedule clash or club restrictions.
                  </p>
                </div>
              ) : (
                <div className="py-2">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-3 text-center">
                    Booking Progress Pipeline
                  </div>

                  <div className="grid grid-cols-5 gap-1 text-center relative">
                    {statusPipeline.map((step, idx) => {
                      const currentIdx = getStatusIndex(booking.status);
                      const isPast = idx < currentIdx;
                      const isCurrent = idx === currentIdx;

                      return (
                        <div key={step} className="flex flex-col items-center gap-1.5 relative">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold transition-all ${
                              isPast
                                ? 'bg-emerald-500 text-black'
                                : isCurrent
                                ? 'bg-[#FFE600] text-black ring-4 ring-yellow-400/30 font-black scale-110'
                                : 'bg-neutral-800 text-neutral-500'
                            }`}
                          >
                            {isPast ? '✓' : idx + 1}
                          </div>
                          <span
                            className={`text-[9px] sm:text-[10px] uppercase font-bold leading-tight ${
                              isCurrent
                                ? 'text-yellow-400'
                                : isPast
                                ? 'text-emerald-400'
                                : 'text-neutral-600'
                            }`}
                          >
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Status Note explanation */}
              <div className="p-3 rounded-xl bg-neutral-900 text-xs text-neutral-300 flex items-start gap-2">
                <Clock className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Current Status Note:</span>
                  <span>{booking.adminNotes || "Badhon is reviewing the request and will communicate via phone or WhatsApp."}</span>
                </div>
              </div>
            </div>

            {/* Match Information Summary Card */}
            <div className="sports-card p-5 bg-neutral-50/60 border border-neutral-200 text-xs space-y-3">
              <div className="font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-200 pb-2">
                Match Request Dossier
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-neutral-700">
                <div className="flex justify-between py-1 border-b border-neutral-200/60">
                  <span className="text-neutral-500">Goalkeeper:</span>
                  <span className="font-bold text-neutral-950">{booking.gkName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-200/60">
                  <span className="text-neutral-500">Team / Club:</span>
                  <span className="font-bold text-neutral-950">{booking.teamName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-200/60">
                  <span className="text-neutral-500">Client Contact:</span>
                  <span className="font-bold text-neutral-950">{booking.clientName} ({booking.phone})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-200/60">
                  <span className="text-neutral-500">Match Type:</span>
                  <span className="font-bold text-neutral-950">{booking.matchType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-200/60">
                  <span className="text-neutral-500">Match Date & Time:</span>
                  <span className="font-bold text-neutral-950">{booking.matchDate} at {booking.matchTime}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-200/60">
                  <span className="text-neutral-500">Venue:</span>
                  <span className="font-bold text-neutral-950">{booking.location}</span>
                </div>
              </div>

              {booking.priceQuote && (
                <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-200 text-neutral-950 flex items-center justify-between">
                  <span className="font-bold">Quoted Match Fee:</span>
                  <span className="font-heading font-extrabold text-base text-neutral-950">
                    ৳ {booking.priceQuote.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

          </div>
        )}

        {/* Demo suggestions for quick preview */}
        {!booking && !loading && (
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-2">
            <span className="text-neutral-500 font-bold block uppercase tracking-wider">
              Quick Test Codes:
            </span>
            <div className="flex flex-wrap gap-2">
              {['GKB-7821', 'GKB-9452', 'GKB-3180', 'GKB-6029'].map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    setTrackingCode(code);
                    trackBookingByCode(code).then(setBooking).catch(() => {});
                  }}
                  className="px-2.5 py-1 rounded bg-white border border-neutral-300 font-mono text-[11px] font-bold text-neutral-800 hover:bg-yellow-50 hover:border-yellow-400 transition-colors cursor-pointer"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-neutral-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="btn-football-yellow px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            New Hiring Request
          </button>
        </div>

      </div>
    </div>
  );
};
