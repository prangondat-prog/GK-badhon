import React, { useState, useEffect } from 'react';
import { UserCheck, Calendar, Clock, MapPin, Shield, CheckCircle2, AlertCircle, Copy, Check, ArrowRight } from 'lucide-react';
import { createBookingRequest } from '../api';
import { BookingRequest } from '../types';
import { useTranslation } from './LanguageContext';

interface HiringSectionProps {
  prefilledDate?: string;
  prefilledType?: string;
  prefilledGk?: { id: string; name: string };
  onTrackBooking: (code: string) => void;
}

export const HiringSection: React.FC<HiringSectionProps> = ({
  prefilledDate,
  prefilledType,
  prefilledGk,
  onTrackBooking,
}) => {
  const { t, lang } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    teamName: '',
    matchType: prefilledType || 'Match Booking',
    matchDate: prefilledDate || '',
    matchTime: '16:00',
    division: '',
    district: '',
    location: '',
    numberOfMatches: 1,
    expectedDuration: '90 Minutes',
    additionalMessage: '',
    gkId: prefilledGk?.id || 'badhon-01',
    gkName: prefilledGk?.name || 'GK Badhon',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedBooking, setSubmittedBooking] = useState<BookingRequest | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Sync props if changed
  useEffect(() => {
    if (prefilledDate) {
      setFormData((prev) => ({ ...prev, matchDate: prefilledDate }));
    }
    if (prefilledType) {
      setFormData((prev) => ({ ...prev, matchType: prefilledType }));
    }
    if (prefilledGk) {
      setFormData((prev) => ({ ...prev, gkId: prefilledGk.id, gkName: prefilledGk.name }));
    }
  }, [prefilledDate, prefilledType, prefilledGk]);

  const getFormattedInstagramMessage = (data: typeof formData, code: string) => {
    return `⚽ NEW GOALKEEPER HIRING REQUEST ⚽\n\n` +
      `👋 Hello GK Badhon,\n` +
      `I would like to hire you for a match! Here are the details:\n\n` +
      `👤 Name: ${data.name}\n` +
      `📞 Phone: ${data.phone}\n` +
      `📧 Email: ${data.email || 'N/A'}\n` +
      `🛡️ Team: ${data.teamName || 'N/A'}\n` +
      `🏆 Match Type: ${data.matchType}\n` +
      `📅 Date: ${data.matchDate} at ${data.matchTime}\n` +
      `🇧🇩 Division: ${data.division}\n` +
      `🏙️ District: ${data.district}\n` +
      `🏟️ Match Location: ${data.location}\n` +
      `⏱️ Duration: ${data.numberOfMatches} Match(es) (${data.expectedDuration})\n` +
      `💬 Note: ${data.additionalMessage || 'N/A'}\n\n` +
      `🔗 Tracking Code: ${code}\n\n` +
      `Please let me know if you are available. Thanks!`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name.trim()) {
      setErrorMsg(t('validationName'));
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg(t('validationPhone'));
      return;
    }
    if (!formData.matchDate) {
      setErrorMsg(t('validationDate'));
      return;
    }
    if (!formData.division) {
      setErrorMsg(t('validationDivision'));
      return;
    }
    if (!formData.district.trim()) {
      setErrorMsg(t('validationDistrict'));
      return;
    }
    if (!formData.location.trim()) {
      setErrorMsg(t('validationLocation'));
      return;
    }

    try {
      setLoading(true);
      const res = await createBookingRequest(formData);
      setSubmittedBooking(res.booking);

      // Construct and copy the detailed message to clipboard automatically
      const msgText = getFormattedInstagramMessage(formData, res.booking.trackingCode);
      try {
        await navigator.clipboard.writeText(msgText);
      } catch (clipErr) {
        console.warn('Clipboard writing failed:', clipErr);
      }

      // Open Instagram DM shortlink instantly
      window.open('https://ig.me/m/mr.badhon__das', '_blank');
    } catch (err: any) {
      setErrorMsg(err.message || 'Unable to submit booking request. Please check details and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyFullMessage = () => {
    if (!submittedBooking) return;
    const msgText = getFormattedInstagramMessage(formData, submittedBooking.trackingCode);
    navigator.clipboard.writeText(msgText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyCode = () => {
    if (!submittedBooking) return;
    navigator.clipboard.writeText(submittedBooking.trackingCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const divisionsList = [
    'Barisal',
    'Chittagong',
    'Dhaka',
    'Khulna',
    'Mymensingh',
    'Rajshahi',
    'Rangpur',
    'Sylhet',
  ];

  return (
    <section id="hiring-section" className="py-16 sm:py-24 bg-white border-b border-neutral-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-100 text-yellow-900 text-xs font-bold uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5" />
            {t('bookingSystem')}
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-neutral-950 uppercase tracking-tight">
            {t('hiringHeading')}
          </h2>
          <p className="text-base text-neutral-600 max-w-xl mx-auto">
            {t('hiringSubheading')}
          </p>
        </div>

        {/* Successful Submission View */}
        {submittedBooking ? (
          <div className="sports-card p-8 sm:p-10 bg-white border-2 border-neutral-900 text-center space-y-6 shadow-xl animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#FFE600] bg-neutral-950 px-6 py-3 rounded-xl uppercase tracking-tight inline-block">
                {t('formSuccessTitle')}
              </h3>
              <p className="text-sm sm:text-base text-neutral-800 max-w-lg mx-auto font-medium font-sans">
                {t('formSuccessDesc')}
              </p>
            </div>

            {/* Direct Instagram CTA Card */}
            <div className="max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white shadow-lg space-y-4">
              <div className="flex items-center justify-center gap-2">
                <svg className="w-8 h-8 fill-current text-white animate-bounce" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
                <span className="font-heading text-lg font-black uppercase tracking-wider">{lang === 'bn' ? 'ইনস্টাগ্রামে পাঠান' : 'Send on Instagram'}</span>
              </div>
              <p className="text-xs text-pink-100 leading-relaxed font-medium">
                {lang === 'bn' ? 'ইনস্টাগ্রাম ডিএম খুলতে নিচের বোতামে ক্লিক করুন এবং কপি করা তথ্য পেস্ট করে দিন!' : 'Click the button below to open Instagram DM. Just paste (Ctrl+V / long press) and send!'}
              </p>
              <div className="flex flex-col gap-2 pt-1">
                <a
                  href="https://ig.me/m/mr.badhon__das"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-white text-neutral-900 hover:bg-neutral-50 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                >
                  <span>{t('btnOpenInstagram')}</span>
                </a>
                
                <button
                  onClick={handleCopyFullMessage}
                  className="w-full py-2.5 bg-black/25 hover:bg-black/35 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-1.5 transition-all text-white border border-white/10"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
                  <span>{copiedCode ? t('btnCopied') : t('btnCopyAgain')}</span>
                </button>
              </div>
            </div>

            {/* Tracking ID Badge */}
            <div className="max-w-md mx-auto p-4 rounded-xl bg-neutral-900 text-white flex items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
                  {t('trackingRefCode')}
                </span>
                <span className="font-mono text-lg font-extrabold text-yellow-400 tracking-wider">
                  {submittedBooking.trackingCode}
                </span>
              </div>
              <button
                onClick={handleCopyCode}
                className="px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? t('btnCopied') : t('btnCopyCode')}</span>
              </button>
            </div>

            {/* Match Summary Review Box */}
            <div className="max-w-md mx-auto p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">{t('formGoalkeeper')}:</span>
                <span className="font-bold text-neutral-900">{submittedBooking.gkName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">{t('formTeamClub')}:</span>
                <span className="font-bold text-neutral-900">{submittedBooking.teamName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">{t('formDateTime')}:</span>
                <span className="font-bold text-neutral-900">{submittedBooking.matchDate} at {submittedBooking.matchTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">{t('formVenue')}:</span>
                <span className="font-bold text-neutral-900">{submittedBooking.location} ({submittedBooking.district}, {submittedBooking.division})</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setSubmittedBooking(null)}
                className="btn-black px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide cursor-pointer"
              >
                {t('btnSubmitAnother')}
              </button>
            </div>
          </div>
        ) : (
          /* Main Booking Form */
          <form
            onSubmit={handleSubmit}
            className="sports-card p-6 sm:p-10 bg-white border border-neutral-200/90 shadow-lg space-y-6"
          >
            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Target Keeper info tag */}
            <div className="p-3 rounded-xl bg-neutral-900 text-white flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{lang === 'bn' ? 'অনুরোধ করা হচ্ছে:' : 'Requesting:'} <strong className="text-yellow-400">{formData.gkName}</strong></span>
              </div>
              <span className="text-neutral-400">{lang === 'bn' ? 'ঢাকা ও সারা দেশ' : 'Dhaka & Traveling'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  {t('formLabelName')} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('formPlaceholderName')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-yellow-400 focus:border-neutral-950 transition-all font-sans"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  {t('formLabelPhone')} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder={t('formPlaceholderPhone')}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-yellow-400 focus:border-neutral-950 transition-all font-sans"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  {t('formLabelEmail')}
                </label>
                <input
                  type="email"
                  placeholder={t('formPlaceholderEmail')}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-yellow-400 focus:border-neutral-950 transition-all font-sans"
                />
              </div>

              {/* Team / Club Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  {t('formLabelTeamName')}
                </label>
                <input
                  type="text"
                  placeholder={t('formPlaceholderTeamName')}
                  value={formData.teamName}
                  onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-yellow-400 focus:border-neutral-950 transition-all font-sans"
                />
              </div>

              {/* Match Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  {t('formLabelMatchType')} <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.matchType}
                  onChange={(e) => setFormData({ ...formData, matchType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-yellow-400 focus:border-neutral-950 transition-all bg-white font-sans"
                >
                  <option value="Match Booking">{lang === 'bn' ? 'একক ম্যাচ বুকিং (৯০ মিনিট / টার্ফ)' : 'Single Match Booking (90 Mins / Turf)'}</option>
                  <option value="Tournament Booking">{lang === 'bn' ? 'টুর্নামেন্ট বুকিং (সারাদিন নকআউট / লীগ)' : 'Tournament Booking (Full Day Knockout / League)'}</option>
                  <option value="Training Session">{lang === 'bn' ? 'গোলকিপার ট্রেনিং সেশন' : 'Goalkeeper Training Session'}</option>
                  <option value="Custom Event">{lang === 'bn' ? 'কাস্টম চ্যাম্পিয়নশিপ / ঢাকার বাইরে খেলা' : 'Custom Event / Outstation Tournament'}</option>
                  <option value="Friendly Match">{lang === 'bn' ? 'প্রীতি ম্যাচ / প্র্যাকটিস গেম' : 'Friendly Match / Practice Game'}</option>
                </select>
              </div>

              {/* Match Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  {t('formLabelMatchDate')} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.matchDate}
                  onChange={(e) => setFormData({ ...formData, matchDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-yellow-400 focus:border-neutral-950 transition-all font-sans"
                />
              </div>

              {/* Division */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  {t('formLabelDivision')} <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={formData.division}
                  onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-yellow-400 focus:border-neutral-950 transition-all bg-white font-sans"
                >
                  <option value="">{lang === 'bn' ? 'বিভাগ নির্বাচন করুন' : 'Select Division'}</option>
                  {divisionsList.map((div) => (
                    <option key={div} value={div}>{div}</option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  {t('formLabelDistrict')} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('formPlaceholderDistrict')}
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-yellow-400 focus:border-neutral-950 transition-all font-sans"
                />
              </div>

              {/* Location */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  {t('formLabelLocation')} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('formPlaceholderLocation')}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-yellow-400 focus:border-neutral-950 transition-all font-sans"
                />
              </div>

              {/* Match Time */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  {t('formLabelMatchTime')}
                </label>
                <input
                  type="time"
                  value={formData.matchTime}
                  onChange={(e) => setFormData({ ...formData, matchTime: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-yellow-400 focus:border-neutral-950 transition-all font-sans"
                />
              </div>

              {/* Number of Matches */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  {t('formLabelMatchesCount')}
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={formData.numberOfMatches}
                  onChange={(e) => setFormData({ ...formData, numberOfMatches: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-yellow-400 focus:border-neutral-950 transition-all font-sans"
                />
              </div>

              {/* Expected Duration */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  {t('formLabelDuration')}
                </label>
                <input
                  type="text"
                  placeholder={t('formPlaceholderDuration')}
                  value={formData.expectedDuration}
                  onChange={(e) => setFormData({ ...formData, expectedDuration: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-yellow-400 focus:border-neutral-950 transition-all font-sans"
                />
              </div>

            </div>

            {/* Additional Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                {t('formLabelNotes')}
              </label>
              <textarea
                rows={3}
                placeholder={t('formPlaceholderNotes')}
                value={formData.additionalMessage}
                onChange={(e) => setFormData({ ...formData, additionalMessage: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-yellow-400 focus:border-neutral-950 transition-all font-sans"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                id="submit-hiring-btn"
                type="submit"
                disabled={loading}
                className="btn-football-yellow w-full py-4 rounded-xl text-sm sm:text-base font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm active:scale-99 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <UserCheck className="w-5 h-5" />
                    <span>{t('btnSendRequest')}</span>
                  </>
                )}
              </button>
              <p className="text-xs text-neutral-500 text-center mt-3 font-sans">
                {t('noteNoImmediatePayment')}
              </p>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
