import React, { useState } from 'react';
import { Star, MessageSquare, Plus, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { ReviewItem } from '../types';
import { submitReview } from '../api';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
  averageRating: number;
  totalReviews: number;
  onRefreshReviews: () => void;
  onOpenAdminModal: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  averageRating,
  totalReviews,
  onRefreshReviews,
  onOpenAdminModal,
}) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [clientName, setClientName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [matchDate, setMatchDate] = useState('');
  const [matchType, setMatchType] = useState('Tournament Booking');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!clientName.trim() || !reviewText.trim()) {
      setErrorMsg('Please enter your name and review details.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await submitReview({
        clientName,
        teamName,
        rating,
        review: reviewText,
        matchDate,
        matchType,
      });

      setSuccessMsg(res.message || 'Review submitted! It will appear publicly after moderation approval.');
      setClientName('');
      setTeamName('');
      setReviewText('');
      setMatchDate('');
      onRefreshReviews();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-100 text-yellow-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-yellow-500 stroke-yellow-500" />
              Verified Match Reviews
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-neutral-950 uppercase tracking-tight">
              TEAM REVIEWS
            </h2>
            <p className="text-base text-neutral-600 font-medium mt-1">
              Feedback from team captains, club managers, and tournament organizers.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Overall Score Pill */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-950 text-white shadow-sm">
              <div className="font-heading text-3xl font-extrabold text-yellow-400">
                ★ {averageRating || 4.9}
              </div>
              <div className="text-xs border-l border-neutral-800 pl-3">
                <div className="font-bold text-white">Overall Rating</div>
                <div className="text-neutral-400 font-medium">{totalReviews || reviews.length} Team Ratings</div>
              </div>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="btn-football-yellow px-5 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>LEAVE A REVIEW</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="sports-card p-6 sm:p-7 bg-white relative flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (rev.rating || 5)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-neutral-200'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Match
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-neutral-800 leading-relaxed italic mb-6">
                  "{rev.review}"
                </p>
              </div>

              {/* Client & Team Info */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-neutral-950 text-base">
                    {rev.clientName}
                  </h4>
                  <p className="text-xs font-semibold text-neutral-500">
                    {rev.teamName}
                  </p>
                </div>

                <span className="text-[11px] text-neutral-400 font-medium">
                  {rev.matchDate}
                </span>
              </div>
            </div>
          ))}
        </div>

        {reviews.length === 0 && (
          <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-neutral-200">
            <MessageSquare className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-neutral-600">
              No approved reviews yet. Be the first team to leave feedback after your match!
            </p>
          </div>
        )}

        {/* Footer Moderation Notice */}
        <div className="mt-8 text-center text-xs text-neutral-500 flex items-center justify-center gap-2">
          <span>All reviews undergo moderation to ensure authentic match bookings.</span>
          <span>•</span>
          <button
            onClick={onOpenAdminModal}
            className="text-neutral-700 hover:text-black font-semibold underline"
          >
            Admin: Review Moderation Queue
          </button>
        </div>

      </div>

      {/* Leave Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-neutral-200 shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="font-heading text-xl font-bold text-neutral-950">
                  Leave a Match Review
                </h3>
                <p className="text-xs text-neutral-500">
                  Share your squad's experience playing with GK Badhon
                </p>
              </div>
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  setSuccessMsg(null);
                  setErrorMsg(null);
                }}
                className="text-neutral-400 hover:text-neutral-900 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {successMsg ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-heading text-lg font-bold text-neutral-950">
                  Review Submitted!
                </h4>
                <p className="text-xs text-neutral-600">
                  {successMsg}
                </p>
                <button
                  onClick={() => {
                    setShowReviewModal(false);
                    setSuccessMsg(null);
                  }}
                  className="btn-black px-5 py-2.5 rounded-lg text-xs font-bold"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-rose-50 text-rose-700 text-xs">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                    Rating (1 to 5 Stars)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-neutral-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-neutral-700 ml-2">
                      {rating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Your Name / Role *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Captain Nayeem"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-yellow-400 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Team / Club Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Uttara Knights FC"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-yellow-400 outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Match Type
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tournament Final / Turf Match"
                      value={matchType}
                      onChange={(e) => setMatchType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-yellow-400 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Match Month / Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Recent Match"
                      value={matchDate}
                      onChange={(e) => setMatchDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-yellow-400 outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                    Your Review Feedback *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe how Badhon performed in the match, communication with defenders, penalty saves, etc..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-yellow-400 outline-hidden"
                  />
                </div>

                <p className="text-[11px] text-neutral-500">
                  * Note: To prevent spam or unverified submissions, reviews are briefly checked by admin before public listing.
                </p>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2.5 rounded-lg border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-football-yellow px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider"
                  >
                    {submitting ? 'Submitting...' : 'SUBMIT REVIEW'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
