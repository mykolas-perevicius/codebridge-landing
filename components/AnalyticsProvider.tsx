'use client';

/**
 * Analytics Provider Component
 *
 * Initializes analytics, A/B testing, and tracks user journey
 */

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { analytics, FunnelStage, trackPageView, trackFunnel } from '@/lib/analytics';

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize analytics on mount
  useEffect(() => {
    // Initialize PostHog (you'll need to add your API key in env variables)
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

    if (posthogKey) {
      analytics.init(posthogKey, {
        apiHost: posthogHost,
      });
    }

    // Track initial page view
    trackPageView();
    trackFunnel(FunnelStage.PAGE_VIEW);

    // Set up intersection observer for section tracking
    setupSectionTracking();

    // Set up scroll depth tracking
    setupScrollTracking();

    // Track time on page
    analytics.startTimer('page_session');

    // Clean up on unmount
    return () => {
      analytics.endTimer('page_session');
    };
  }, []);

  // Track page changes
  useEffect(() => {
    if (pathname) {
      trackPageView({ path: pathname });
      trackFunnel(FunnelStage.PAGE_VIEW, { path: pathname });
    }
  }, [pathname, searchParams]);

  return (
    <>
      {children}
      {/* Vercel Analytics for additional insights */}
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}

/**
 * Set up intersection observer to track when sections come into view
 */
function setupSectionTracking() {
  if (typeof window === 'undefined') return;

  // Wait for DOM to be ready
  setTimeout(() => {
    const sections = document.querySelectorAll('section[id]');

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const stageMap: Record<string, FunnelStage> = {
              'why-schools': FunnelStage.PROBLEM_SECTION_VIEW,
              'how-it-works': FunnelStage.HOW_IT_WORKS_VIEW,
              'courses': FunnelStage.COURSES_VIEW,
              'results': FunnelStage.RESULTS_VIEW,
              'pricing': FunnelStage.PRICING_VIEW,
            };

            const stage = stageMap[sectionId];
            if (stage) {
              trackFunnel(stage, { section_id: sectionId });
              analytics.startTimer(`section_${sectionId}`);
            }
          } else {
            const sectionId = entry.target.id;
            analytics.endTimer(`section_${sectionId}`, { section_id: sectionId });
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of section is visible
      }
    );

    sections.forEach((section) => observer.observe(section));
  }, 1000);
}

/**
 * Set up scroll depth tracking
 */
function setupScrollTracking() {
  if (typeof window === 'undefined') return;

  let maxScroll = 0;
  const thresholds = [25, 50, 75, 90, 100];
  const triggered = new Set<number>();

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const scrollPercentage = Math.round(((scrollTop + windowHeight) / documentHeight) * 100);

    // Track maximum scroll depth
    if (scrollPercentage > maxScroll) {
      maxScroll = scrollPercentage;
    }

    // Track threshold milestones
    thresholds.forEach((threshold) => {
      if (scrollPercentage >= threshold && !triggered.has(threshold)) {
        triggered.add(threshold);
        analytics.trackScrollDepth(threshold);
      }
    });
  };

  // Throttle scroll events
  let ticking = false;
  const throttledScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', throttledScroll, { passive: true });

  // Track max scroll on page unload
  window.addEventListener('beforeunload', () => {
    if (maxScroll > 0) {
      analytics.trackScrollDepth(maxScroll, { final: true });
    }
  });
}
