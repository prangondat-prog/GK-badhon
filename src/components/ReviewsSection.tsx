import React, { useState } from 'react';
import { Star, MessageSquare, Plus, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ReviewItem } from '../types';
import { submitReview } from '../api';
import { useTranslation } from './LanguageContext';

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
  const { t, lang } = useTranslation();
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
      setErrorMsg(lang === 'bn' ? 'দয়া করে আপনার নাম এবং রিভিউ বিবরণ লিখুন।' : 'Please enter your name and review details.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await submitReview({
        clientName,
        teamName,
        rating,
        review: reviewText,
        matchDate: matchDate || 'Recent Match',
        matchType,
      });

      setSuccessMsg(res.message || (lang === 'bn' ? 'রিভিউ জমা দেওয়া হয়েছে! এটি অনুমোদনের পর প্রকাশিত হবে।' : 'Review submitted! It will appear publicly after moderation approval.'));
      setClientName('');
      setTeamName('');
      setReviewText('');
      setMatchDate('');
      onRefreshReviews();
    } catch (err: any) {
      setErrorMsg(err.message || (lang === 'bn' ? 'রিভিউ জমা দিতে ব্যর্থ হয়েছে' : 'Failed to submit review'));
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
              <span>{lang === 'bn' ? 'যাচাইকৃত ম্যাচ রিভিউ' : 'Verified Match Reviews'}</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-neutral-950 uppercase tracking-tight">
              {t('reviewsTitle')}
            </h2>
            <p className="text-base text-neutral-600 font-medium mt-1">
              {t('reviewsSubtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Overall Score Pill */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-950 text-white shadow-sm">
              <div className="font-heading text-3xl font-extrabold text-yellow-400">
                ★ {averageRating || 4.9}
              </div>
              <div className="text-xs border-l border-neutral-800 pl-3">
                <div className="font-bold text-white">{t('reviewsOverall')}</div>
                <div className="text-neutral-400 font-medium">{(totalReviews || reviews.length)} {t('reviewsRatings')}</div>
              </div>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="px-5 py-3 rounded-xl bg-neutral-950 text-white border border-neutral-800 hover:border-[#FFE600] text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4 text-[#FFE600]" />
              <span>{t('reviewsLeaveBtn')}</span>
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
                    {t('reviewsVerified')}
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
                  {lang === 'bn' && rev.matchDate === 'Recent Match' ? 'সাম্প্রতিক ম্যাচ' : rev.matchDate}
                </span>
              </div>
            </div>
          ))}
        </div>

        {reviews.length === 0 && (
          <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-neutral-200">
            <MessageSquare className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-neutral-600">
              {t('reviewsNoReviews')}
            </p>
          </div>
        )}

        {/* Footer Moderation Notice */}
        <div className="mt-8 text-center text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>{t('reviewsNotice')}</span>
          <span className="hidden sm:inline">•</span>
          <button
            onClick={onOpenAdminModal}
            className="text-neutral-700 hover:text-black font-semibold underline cursor-pointer"
          >
            {t('reviewsModerationBtn')}
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
                  {t('reviewModalTitle')}
                </h3>
                <p className="text-xs text-neutral-500">
                  {t('reviewModalSub')}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  setSuccessMsg(null);
                  setErrorMsg(null);
                }}
                className="text-neutral-400 hover:text-neutral-900 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {successMsg ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-heading text-lg font-bold text-neutral-950">
                  {t('reviewSuccessTitle')}
                </h4>
                <p className="text-xs text-neutral-600">
                  {successMsg}
                </p>
                <button
                  onClick={() => {
                    setShowReviewModal(false);
                    setSuccessMsg(null);
                  }}
                  className="px-5 py-2.5 rounded-lg bg-neutral-950 text-white font-bold text-xs cursor-pointer hover:bg-neutral-800"
                >
                  {t('reviewBtnClose')}
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
                    {t('reviewLabelRating')}
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
                      {rating} / 5 {t('reviewLabelStars')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      {t('reviewLabelName')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('reviewPlaceholderName')}
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-yellow-400 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      {t('reviewLabelTeam')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('reviewPlaceholderTeam')}
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-yellow-400 outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      {t('reviewLabelMatchType')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('reviewPlaceholderMatchType')}
                      value={matchType}
                      onChange={(e) => setMatchType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-yellow-400 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      {t('reviewLabelDate')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('reviewPlaceholderDate')}
                      value={matchDate}
                      onChange={(e) => setMatchDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-yellow-400 outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                    {t('reviewLabelFeedback')}
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder={t('reviewPlaceholderFeedback')}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-yellow-400 outline-hidden"
                  />
                </div>

                <p className="text-[11px] text-neutral-500">
                  {t('reviewNoteModeration')}
                </p>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2.5 rounded-lg border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                  >
                    {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-lg bg-neutral-950 text-white border border-neutral-800 hover:border-[#FFE600] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    {submitting ? (lang === 'bn' ? 'জমা দেওয়া হচ্ছে...' : 'Submitting...') : t('reviewsLeaveBtn')}
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
