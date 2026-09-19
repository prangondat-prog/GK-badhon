import React from 'react';
import { Zap, Eye, Users, Trophy, CalendarCheck, ShieldCheck, ArrowRight, Shield } from 'lucide-react';
import { useTranslation } from './LanguageContext';

interface WhyHireSectionProps {
  onHireClick: () => void;
}

export const WhyHireSection: React.FC<WhyHireSectionProps> = ({ onHireClick }) => {
  const { t } = useTranslation();

  const features = [
    {
      id: 'goalkeeping',
      icon: ShieldCheck,
      title: t('whyFeature1Title'),
      description: t('whyFeature1Desc'),
    },
    {
      id: 'reflexes',
      icon: Zap,
      title: t('whyFeature2Title'),
      description: t('whyFeature2Desc'),
    },
    {
      id: 'awareness',
      icon: Eye,
      title: t('whyFeature3Title'),
      description: t('whyFeature3Desc'),
    },
    {
      id: 'communication',
      icon: Users,
      title: t('whyFeature4Title'),
      description: t('whyFeature4Desc'),
    },
    {
      id: 'tournament',
      icon: Trophy,
      title: t('whyFeature5Title'),
      description: t('whyFeature5Desc'),
    },
    {
      id: 'flexible',
      icon: CalendarCheck,
      title: t('whyFeature6Title'),
      description: t('whyFeature6Desc'),
    }
  ];

  return (
    <section id="why-hire" className="py-16 sm:py-24 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-100 text-yellow-900 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 text-yellow-800" />
            <span>Competitive Advantage</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-neutral-950 uppercase tracking-tight">
            {t('whyTitle')}
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
            {t('whySubtitle')}
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={feat.id}
                className="sports-card p-6 sm:p-8 bg-white hover:bg-neutral-50/60 relative flex flex-col justify-between group transition-all duration-300 rounded-2xl border border-neutral-200/80 shadow-sm"
              >
                <div>
                  {/* Card Icon Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-neutral-950 text-yellow-400 flex items-center justify-center shadow-sm group-hover:bg-[#FFE600] group-hover:text-black transition-colors duration-300">
                      <IconComponent className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-neutral-900 transition-colors">
                      Verified
                    </span>
                  </div>

                  {/* Title & Body */}
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-neutral-950 mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Subtle highlight underline */}
                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-500 group-hover:text-neutral-950 transition-colors">
                  <span>Match Ready</span>
                  <ArrowRight className="w-4 h-4 text-yellow-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-neutral-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white">
              {t('whyBannerTitle')}
            </h3>
            <p className="text-sm text-neutral-300 mt-1">
              {t('whyBannerDesc')}
            </p>
          </div>
          <button
            onClick={onHireClick}
            className="btn-black border border-neutral-800 hover:border-[#FFE600] px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shrink-0 shadow-lg cursor-pointer transition-all"
          >
            <span>{t('whyBannerBtn')}</span>
            <ArrowRight className="w-4 h-4 text-[#FFE600]" />
          </button>
        </div>

      </div>
    </section>
  );
};
