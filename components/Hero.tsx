'use client';

/**
 * Hero Section Component with A/B Testing
 *
 * Features:
 * - Modern gradient background
 * - A/B tested headlines and CTAs
 * - Conversion tracking on all CTAs
 * - Responsive design with mobile optimization
 * - Links to Education Playground content
 */

import { useEffect, useState } from 'react';
import { EXPERIMENTS, useExperiment } from '@/lib/ab-testing';
import { ConversionEvent, trackConversion, FunnelStage, trackFunnel } from '@/lib/analytics';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { config: headlineConfig } = useExperiment(EXPERIMENTS.HERO_HEADLINE);
  const { config: ctaConfig } = useExperiment(EXPERIMENTS.CTA_TEXT);

  useEffect(() => {
    setMounted(true);
    // Track hero view
    trackFunnel(FunnelStage.HERO_VIEW);
  }, []);

  const handlePrimaryCTA = () => {
    trackConversion(ConversionEvent.BOOK_CALL_CLICK, {
      cta_variant: ctaConfig.primary || 'Book an Information Call',
      location: 'hero',
    });
  };

  const handleSecondaryCTA = () => {
    trackConversion(ConversionEvent.DOWNLOAD_CATALOG_CLICK, {
      cta_variant: ctaConfig.secondary || 'View Course Catalog',
      location: 'hero',
    });
  };

  // Avoid hydration mismatch
  const headline = mounted ? (headlineConfig.headline || 'Bring Modern Computer Science to Your School') : 'Bring Modern Computer Science to Your School';
  const subheadline = mounted ? (headlineConfig.subheadline || 'Turn-key programming courses taught by real software engineers. Curriculum, LMS, and instructors included.') : 'Turn-key programming courses taught by real software engineers. Curriculum, LMS, and instructors included.';
  const primaryCTA = mounted ? (ctaConfig.primary || 'Book an Information Call') : 'Book an Information Call';
  const secondaryCTA = mounted ? (ctaConfig.secondary || 'View Course Catalog') : 'View Course Catalog';

  return (
    <section className="relative bg-gradient-to-br from-navy via-navy to-[#1a2f4a] text-white overflow-hidden">
      {/* Geometric background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-64 h-64 bg-sky-blue rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-sky-blue rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-2">
              CodeBridge <span className="text-sky-blue">Labs</span>
            </h1>
            <div className="h-1 w-32 bg-sky-blue mx-auto rounded-full"></div>
          </div>

          {/* Main Headline - A/B Tested */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {headline}
          </h2>

          {/* Subheadline - A/B Tested */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            {subheadline}
          </p>

          {/* CTA Buttons - A/B Tested */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary CTA */}
            <a
              href="https://calendly.com/codebridge-labs"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handlePrimaryCTA}
              className="group relative px-8 py-4 bg-sky-blue text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-[#2563eb] transition-all duration-300 hover:shadow-xl hover:scale-105 w-full sm:w-auto"
            >
              <span className="relative z-10">{primaryCTA}</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
            </a>

            {/* Secondary CTA */}
            <a
              href="https://mykolas-perevicius.github.io/Education_Playground/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSecondaryCTA}
              className="px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white hover:text-navy transition-all duration-300 hover:shadow-lg w-full sm:w-auto"
            >
              {secondaryCTA}
            </a>
          </div>

          {/* Trust Badge */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-sm text-gray-400 mb-3">Trusted by forward-thinking schools nationwide</p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-sky-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>No Hiring Required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-sky-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Ready in 48 Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-sky-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Real Industry Engineers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
