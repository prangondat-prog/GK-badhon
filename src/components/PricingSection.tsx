import React from 'react';
import { Tag, Check, ArrowRight, Shield, Zap, Trophy, Users } from 'lucide-react';
import { PricingPlan } from '../types';

interface PricingSectionProps {
  pricing: PricingPlan[];
  onRequestBooking: (categoryKey: string) => void;
  onOpenAdminModal: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  pricing,
  onRequestBooking,
  onOpenAdminModal,
}) => {
  const getIconForCategory = (key: string) => {
    switch (key) {
      case 'match':
        return Shield;
      case 'tournament':
        return Trophy;
      case 'training':
        return Zap;
      default:
        return Users;
    }
  };

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-neutral-50/70 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-100 text-yellow-900 text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            Transparent Rates
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-neutral-950 uppercase tracking-tight">
            PRICING PACKAGES
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
            Professional goalkeeper rates for Dhaka and tournament events across Bangladesh. No hidden commissions.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pricing.map((plan) => {
            const CategoryIcon = getIconForCategory(plan.categoryKey);
            const isFeatured = plan.popular;

            return (
              <div
                key={plan.id}
                className={`sports-card p-6 sm:p-7 bg-white relative flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'border-2 border-neutral-950 ring-2 ring-yellow-400/80 shadow-xl lg:-translate-y-2'
                    : 'border border-neutral-200/80 shadow-xs hover:border-neutral-400'
                }`}
              >
                {/* Popular badge */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#FFE600] text-black text-[11px] font-extrabold uppercase tracking-wider shadow-xs">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 text-yellow-400 flex items-center justify-center">
                      <CategoryIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      Standard
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-neutral-950">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 min-h-[36px] leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Price Tag */}
                  <div className="my-6 py-4 border-y border-neutral-100">
                    {plan.isCustomPrice || plan.priceAmount === null ? (
                      <div>
                        <div className="font-heading text-2xl sm:text-3xl font-extrabold text-neutral-950">
                          Custom Quote
                        </div>
                        <div className="text-[11px] text-neutral-500 font-medium mt-0.5">
                          Contact for price
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-heading text-3xl sm:text-4xl font-extrabold text-neutral-950">
                            {plan.currency} {plan.priceAmount.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-[11px] text-neutral-500 font-medium mt-0.5">
                          {plan.unit}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 text-xs text-neutral-700 mb-8">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Request Booking Button */}
                <button
                  onClick={() => onRequestBooking(plan.categoryKey)}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer ${
                    isFeatured
                      ? 'btn-football-yellow shadow-sm'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-white transition-colors'
                  }`}
                >
                  <span>REQUEST BOOKING</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Pricing notice & admin trigger */}
        <div className="mt-12 text-center text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>* Transport fees may apply for matches outside metropolitan Dhaka.</span>
          <span className="hidden sm:inline">•</span>
          <button
            onClick={onOpenAdminModal}
            className="text-neutral-700 hover:text-black font-semibold underline"
          >
            Admin: Edit Pricing Rates
          </button>
        </div>

      </div>
    </section>
  );
};
