/**
 * Analytics & Funnel Tracking Library
 *
 * Provides comprehensive event tracking for marketing funnel analysis
 * and conversion optimization.
 */

import posthog from 'posthog-js';

// Funnel stages for tracking user journey
export enum FunnelStage {
  PAGE_VIEW = 'page_view',
  HERO_VIEW = 'hero_view',
  PROBLEM_SECTION_VIEW = 'problem_section_view',
  HOW_IT_WORKS_VIEW = 'how_it_works_view',
  COURSES_VIEW = 'courses_section_view',
  RESULTS_VIEW = 'results_section_view',
  PRICING_VIEW = 'pricing_section_view',
  FOOTER_VIEW = 'footer_view',
}

// Conversion events
export enum ConversionEvent {
  BOOK_CALL_CLICK = 'book_call_click',
  DOWNLOAD_CATALOG_CLICK = 'download_catalog_click',
  VIEW_SYLLABUS_CLICK = 'view_syllabus_click',
  SCHEDULE_DEMO_CLICK = 'schedule_demo_click',
  EMAIL_CLICK = 'email_click',
  PHONE_CLICK = 'phone_click',
  SOCIAL_CLICK = 'social_click',
}

// User interaction events
export enum InteractionEvent {
  DARK_MODE_TOGGLE = 'dark_mode_toggle',
  MOBILE_MENU_OPEN = 'mobile_menu_open',
  NAVIGATION_CLICK = 'navigation_click',
  COURSE_CARD_HOVER = 'course_card_hover',
  TESTIMONIAL_READ = 'testimonial_read',
  PRICING_EXPAND = 'pricing_expand',
}

interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

class Analytics {
  private initialized = false;

  /**
   * Initialize PostHog analytics
   * Call this once in the app root
   */
  init(apiKey: string, options?: any) {
    if (typeof window === 'undefined' || this.initialized) return;

    posthog.init(apiKey, {
      api_host: options?.apiHost || 'https://app.posthog.com',
      autocapture: false, // We'll track manually for better control
      capture_pageview: false, // We'll handle page views manually
      session_recording: {
        enabled: true,
        recordCrossOriginIframes: false,
      },
      ...options,
    });

    this.initialized = true;
  }

  /**
   * Track funnel stage progression
   */
  trackFunnel(stage: FunnelStage, properties?: EventProperties) {
    if (typeof window === 'undefined' || !this.initialized) return;

    posthog.capture(stage, {
      funnel_stage: stage,
      timestamp: new Date().toISOString(),
      ...properties,
    });
  }

  /**
   * Track conversion events (CTAs, form submissions, etc.)
   */
  trackConversion(event: ConversionEvent, properties?: EventProperties) {
    if (typeof window === 'undefined' || !this.initialized) return;

    posthog.capture(event, {
      conversion_event: event,
      timestamp: new Date().toISOString(),
      ...properties,
    });

    // Also track as a distinct conversion for easier filtering
    posthog.capture('conversion', {
      conversion_type: event,
      ...properties,
    });
  }

  /**
   * Track user interactions
   */
  trackInteraction(event: InteractionEvent, properties?: EventProperties) {
    if (typeof window === 'undefined' || !this.initialized) return;

    posthog.capture(event, {
      interaction_type: event,
      timestamp: new Date().toISOString(),
      ...properties,
    });
  }

  /**
   * Track page views
   */
  trackPageView(properties?: EventProperties) {
    if (typeof window === 'undefined' || !this.initialized) return;

    posthog.capture('$pageview', {
      url: window.location.href,
      path: window.location.pathname,
      ...properties,
    });
  }

  /**
   * Identify user (for logged-in or known users)
   */
  identify(userId: string, properties?: EventProperties) {
    if (typeof window === 'undefined' || !this.initialized) return;

    posthog.identify(userId, properties);
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: EventProperties) {
    if (typeof window === 'undefined' || !this.initialized) return;

    posthog.people.set(properties);
  }

  /**
   * Track A/B test variant assignment
   */
  trackVariant(experimentName: string, variant: string, properties?: EventProperties) {
    if (typeof window === 'undefined' || !this.initialized) return;

    posthog.capture('experiment_viewed', {
      experiment: experimentName,
      variant,
      ...properties,
    });

    // Store variant in user properties for analysis
    this.setUserProperties({
      [`experiment_${experimentName}`]: variant,
    });
  }

  /**
   * Get A/B test variant from PostHog feature flags
   */
  getVariant(experimentName: string, defaultVariant: string = 'control'): string {
    if (typeof window === 'undefined' || !this.initialized) return defaultVariant;

    const variant = posthog.getFeatureFlag(experimentName);
    return variant ? String(variant) : defaultVariant;
  }

  /**
   * Track time spent on page/section
   */
  startTimer(timerName: string) {
    if (typeof window === 'undefined') return;

    sessionStorage.setItem(`timer_${timerName}`, Date.now().toString());
  }

  endTimer(timerName: string, properties?: EventProperties) {
    if (typeof window === 'undefined' || !this.initialized) return;

    const startTime = sessionStorage.getItem(`timer_${timerName}`);
    if (!startTime) return;

    const duration = Date.now() - parseInt(startTime);
    sessionStorage.removeItem(`timer_${timerName}`);

    posthog.capture('time_spent', {
      timer_name: timerName,
      duration_ms: duration,
      duration_seconds: Math.round(duration / 1000),
      ...properties,
    });
  }

  /**
   * Track scroll depth
   */
  trackScrollDepth(depth: number, properties?: EventProperties) {
    if (typeof window === 'undefined' || !this.initialized) return;

    posthog.capture('scroll_depth', {
      depth_percentage: depth,
      ...properties,
    });
  }

  /**
   * Reset user session (useful for testing)
   */
  reset() {
    if (typeof window === 'undefined' || !this.initialized) return;

    posthog.reset();
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Convenience functions
export const trackFunnel = analytics.trackFunnel.bind(analytics);
export const trackConversion = analytics.trackConversion.bind(analytics);
export const trackInteraction = analytics.trackInteraction.bind(analytics);
export const trackPageView = analytics.trackPageView.bind(analytics);
export const trackVariant = analytics.trackVariant.bind(analytics);
export const getVariant = analytics.getVariant.bind(analytics);
