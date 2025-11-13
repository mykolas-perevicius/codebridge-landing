/**
 * A/B Testing Framework
 *
 * Provides client-side A/B testing with localStorage persistence
 * and analytics integration.
 */

import { analytics, trackVariant } from './analytics';

export interface Experiment {
  name: string;
  variants: string[];
  weights?: number[]; // Optional weights for each variant (must sum to 1)
}

export interface VariantConfig {
  [key: string]: any;
}

class ABTesting {
  /**
   * Get or assign variant for an experiment
   * Persists in localStorage for consistent experience
   */
  getVariant(experiment: Experiment): string {
    if (typeof window === 'undefined') return experiment.variants[0];

    const storageKey = `experiment_${experiment.name}`;
    const existingVariant = localStorage.getItem(storageKey);

    // Return existing variant if already assigned
    if (existingVariant && experiment.variants.includes(existingVariant)) {
      return existingVariant;
    }

    // Assign new variant based on weights or random
    const variant = this.selectVariant(experiment);
    localStorage.setItem(storageKey, variant);

    // Track variant assignment in analytics
    trackVariant(experiment.name, variant);

    return variant;
  }

  /**
   * Select variant based on weights or random distribution
   */
  private selectVariant(experiment: Experiment): string {
    const { variants, weights } = experiment;

    if (!weights || weights.length !== variants.length) {
      // Random selection if no weights specified
      return variants[Math.floor(Math.random() * variants.length)];
    }

    // Weighted selection
    const random = Math.random();
    let cumulativeWeight = 0;

    for (let i = 0; i < variants.length; i++) {
      cumulativeWeight += weights[i];
      if (random <= cumulativeWeight) {
        return variants[i];
      }
    }

    return variants[0]; // Fallback
  }

  /**
   * Force a specific variant (useful for testing)
   */
  forceVariant(experimentName: string, variant: string) {
    if (typeof window === 'undefined') return;

    const storageKey = `experiment_${experimentName}`;
    localStorage.setItem(storageKey, variant);
    trackVariant(experimentName, variant);
  }

  /**
   * Clear all experiment assignments (useful for testing)
   */
  clearAllExperiments() {
    if (typeof window === 'undefined') return;

    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith('experiment_')) {
        localStorage.removeItem(key);
      }
    });
  }

  /**
   * Get all active experiment variants
   */
  getActiveExperiments(): Record<string, string> {
    if (typeof window === 'undefined') return {};

    const experiments: Record<string, string> = {};
    const keys = Object.keys(localStorage);

    keys.forEach((key) => {
      if (key.startsWith('experiment_')) {
        const experimentName = key.replace('experiment_', '');
        const variant = localStorage.getItem(key);
        if (variant) {
          experiments[experimentName] = variant;
        }
      }
    });

    return experiments;
  }
}

// Export singleton instance
export const abTesting = new ABTesting();

// Pre-defined experiments for CodeBridge landing page
export const EXPERIMENTS = {
  HERO_HEADLINE: {
    name: 'hero_headline',
    variants: ['original', 'benefit_focused', 'question_format'],
    weights: [0.34, 0.33, 0.33],
  },
  CTA_TEXT: {
    name: 'cta_text',
    variants: ['book_call', 'schedule_demo', 'get_started'],
    weights: [0.34, 0.33, 0.33],
  },
  PRICING_DISPLAY: {
    name: 'pricing_display',
    variants: ['inquiry_only', 'range_shown'],
    weights: [0.5, 0.5],
  },
} as const;

// Variant configurations for each experiment
export const VARIANT_CONFIGS: Record<string, VariantConfig> = {
  // Hero headline variants
  hero_headline_original: {
    headline: 'Bring Modern Computer Science to Your School',
    subheadline: 'Turn-key programming courses taught by real software engineers. Curriculum, LMS, and instructors included.',
  },
  hero_headline_benefit_focused: {
    headline: 'Launch CS Classes in 48 Hours — No Hiring Required',
    subheadline: 'Expert instructors, production-ready curriculum, and complete LMS. Everything you need to offer world-class computer science education.',
  },
  hero_headline_question_format: {
    headline: 'Want to Offer CS but Don\'t Have the Teachers?',
    subheadline: 'We provide experienced software engineers, complete curriculum, and LMS platform. Your students get real coding skills. You get zero hiring headaches.',
  },

  // CTA text variants
  cta_text_book_call: {
    primary: 'Book an Information Call',
    secondary: 'View Course Catalog',
    nav: 'Book a Call',
  },
  cta_text_schedule_demo: {
    primary: 'Schedule a Demo',
    secondary: 'View Course Catalog',
    nav: 'Schedule Demo',
  },
  cta_text_get_started: {
    primary: 'Get Started Today',
    secondary: 'View Course Catalog',
    nav: 'Get Started',
  },

  // Pricing display variants
  pricing_display_inquiry_only: {
    showPricing: false,
    message: 'Per-student or per-classroom pricing available. Contact us for a custom quote.',
  },
  pricing_display_range_shown: {
    showPricing: true,
    message: 'Starting at $50/student/semester or $1,500/classroom. Volume discounts available.',
  },
};

/**
 * React hook for using A/B tests in components
 */
export function useExperiment(experiment: Experiment) {
  if (typeof window === 'undefined') {
    return { variant: experiment.variants[0], config: {} };
  }

  const variant = abTesting.getVariant(experiment);
  const configKey = `${experiment.name}_${variant}`;
  const config = VARIANT_CONFIGS[configKey] || {};

  return { variant, config };
}
