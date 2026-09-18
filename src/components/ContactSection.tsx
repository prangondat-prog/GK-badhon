import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, UserCheck, Clock, ExternalLink, AlertCircle, ShieldCheck, Copy, Check } from 'lucide-react';
import { ContactSettings } from '../types';

interface ContactSectionProps {
  contact: ContactSettings | null;
  onHireClick: () => void;
  onOpenAdminModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contact,
  onHireClick,
  onOpenAdminModal,
}) => {
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  const phone = contact?.phone || '+880 1712-345678';
  const whatsapp = contact?.whatsapp || '+880 1712-345678';
  const email = contact?.email || 'booking@gkbadhon.com';
  const location = contact?.location || 'Dhaka, Bangladesh';
  const tiktokUrl = contact?.tiktokUrl || 'https://www.tiktok.com/@mr.bandhon.das';
  const instagramUrl = contact?.instagramUrl || 'https://www.instagram.com/mr.badhon__das/';

  const cleanWaNumber = whatsapp.replace(/[^0-9]/g, '');

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-neutral-950 text-white relative overflow-hidden">
      {/* Subtle pitch texture & stadium glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-neutral-800/40 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Heading & Direct Action Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/15 text-yellow-300 text-xs font-bold uppercase tracking-wider border border-yellow-400/30">
              <Phone className="w-3.5 h-3.5 text-yellow-400" />
              <span>Direct Goalkeeper Line</span>
            </div>

            <div className="space-y-3">
              <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-tight">
                NEED A GOALKEEPER? <br />
                <span className="text-[#FFE600]">LET'S TALK ABOUT</span> YOUR NEXT MATCH.
              </h2>
              <p className="text-base sm:text-lg text-neutral-300 max-w-xl font-medium leading-relaxed">
                Whether you have an upcoming tournament knockout this weekend or need regular league backup, get in touch immediately.
              </p>
            </div>

            {/* Primary Hire CTA */}
            <div className="pt-2">
              <button
                id="contact-hire-btn"
                onClick={onHireClick}
                className="btn-football-yellow px-8 py-4 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl hover:shadow-yellow-400/30 active:scale-98 cursor-pointer transition-all w-full sm:w-auto"
              >
                <UserCheck className="w-5 h-5 text-black" />
                <span>HIRE BADHON</span>
              </button>
            </div>

            {/* Interactive UX Contact Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              
              {/* 1. CALL CARD */}
              <a
                id="contact-call-btn"
                href={`tel:${phone}`}
                className="group p-4 rounded-2xl bg-neutral-900/90 hover:bg-neutral-850 border border-neutral-800 hover:border-yellow-400/50 transition-all flex items-center justify-between shadow-sm active:scale-98 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-400/20 text-yellow-400 flex items-center justify-center shrink-0 border border-yellow-400/30 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                      Direct Phone
                    </span>
                    <span className="text-sm font-extrabold text-white group-hover:text-yellow-400 transition-colors">
                      {phone}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-yellow-400 transition-colors" />
              </a>

              {/* 2. WHATSAPP CARD */}
              <a
                id="contact-wa-btn"
                href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent("Hi GK Badhon, I'd like to check your availability for our football match.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-2xl bg-neutral-900/90 hover:bg-neutral-850 border border-neutral-800 hover:border-emerald-500/50 transition-all flex items-center justify-between shadow-sm active:scale-98 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                      WhatsApp Chat
                    </span>
                    <span className="text-sm font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                      Instant Message
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-emerald-400 transition-colors" />
              </a>

              {/* 3. INSTAGRAM CARD */}
              <a
                id="contact-instagram-btn"
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-2xl bg-neutral-900/90 hover:bg-neutral-850 border border-neutral-800 hover:border-pink-500/50 transition-all flex items-center justify-between shadow-sm active:scale-98 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 border border-pink-500/30 group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:via-rose-500 group-hover:to-purple-600 group-hover:text-white transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                      Instagram DM
                    </span>
                    <span className="text-sm font-extrabold text-white group-hover:text-pink-400 transition-colors">
                      @mr.badhon__das
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-pink-400 transition-colors" />
              </a>

              {/* 4. TIKTOK CARD */}
              <a
                id="contact-tiktok-btn"
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-2xl bg-neutral-900/90 hover:bg-neutral-850 border border-neutral-800 hover:border-yellow-400/50 transition-all flex items-center justify-between shadow-sm active:scale-98 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black text-[#FFE600] flex items-center justify-center shrink-0 border border-neutral-700 group-hover:border-yellow-400 transition-colors">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.32V8.75a8.28 8.28 0 0 0 4.91 1.62V6.92a5 5 0 0 1-1-.23z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                      Match Highlights
                    </span>
                    <span className="text-sm font-extrabold text-white group-hover:text-[#FFE600] transition-colors">
                      @mr.bandhon.das
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-[#FFE600] transition-colors" />
              </a>

            </div>

            {/* Response Notice */}
            <div className="flex items-center gap-2 text-xs text-neutral-400 pt-1">
              <Clock className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>{contact?.responseNotice || "Typically responds within 1-2 hours for match queries."}</span>
            </div>

          </div>

          {/* Right Column: Match Coordination Hub Glassmorphic Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-5 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FFE600] text-neutral-950 flex items-center justify-center font-black text-sm shadow-sm">
                    GK
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-extrabold text-white uppercase tracking-tight">
                      Match Coordination Hub
                    </h3>
                    <p className="text-[11px] text-neutral-400 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Verified Player Contacts
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                {/* Official Phone */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-neutral-400 block font-bold uppercase tracking-wider">Official Phone</span>
                      <a href={`tel:${phone}`} className="text-white hover:text-yellow-400 font-extrabold transition-colors text-sm">
                        {phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(phone, 'phone')}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                    title="Copy Phone Number"
                  >
                    {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* WhatsApp Chat */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-neutral-400 block font-bold uppercase tracking-wider">WhatsApp Line</span>
                      <a
                        href={`https://wa.me/${cleanWaNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-emerald-400 font-extrabold transition-colors text-sm"
                      >
                        {whatsapp}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(whatsapp, 'whatsapp')}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                    title="Copy WhatsApp Number"
                  >
                    {copiedField === 'whatsapp' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-neutral-400 block font-bold uppercase tracking-wider">Email Booking</span>
                      <a href={`mailto:${email}`} className="text-neutral-200 hover:text-yellow-400 font-medium transition-colors text-xs sm:text-sm">
                        {email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(email, 'email')}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Operating Base */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                  <MapPin className="w-4 h-4 text-yellow-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-neutral-400 block font-bold uppercase tracking-wider">Operating Base</span>
                    <span className="text-neutral-200 font-medium text-xs sm:text-sm">
                      {location} (Available for National Travel)
                    </span>
                  </div>
                </div>
              </div>

              {contact?.emergencyNotice && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300 font-bold">Emergency Callout:</strong> {contact.emergencyNotice}
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between text-xs text-neutral-500 border-t border-neutral-800/80">
                <span className="font-semibold text-neutral-400">Verified Direct Line</span>
                <button
                  onClick={onOpenAdminModal}
                  className="text-neutral-400 hover:text-yellow-400 font-semibold underline cursor-pointer transition-colors"
                >
                  Edit Channels
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
