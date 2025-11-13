/**
 * CodeBridge Labs Landing Page
 *
 * A modern B2B landing page for schools looking to implement
 * comprehensive computer science education programs.
 *
 * Features:
 * - Hero section with compelling CTAs
 * - Problem/solution positioning
 * - Course catalog showcase
 * - Social proof and testimonials
 * - Flexible pricing inquiry
 * - SEO optimized
 * - Fully responsive
 * - Dark mode support
 */

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import HowItWorks from '@/components/HowItWorks';
import Courses from '@/components/Courses';
import Results from '@/components/Results';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Navigation Bar */}
      <Navigation />

      {/* Main Content */}
      <main className="overflow-hidden">
        {/* Hero Section */}
        <Hero />

        {/* Problem Section - Why Schools Choose Us */}
        <section id="why-schools">
          <Problem />
        </section>

        {/* How It Works Section */}
        <section id="how-it-works">
          <HowItWorks />
        </section>

        {/* Courses Section */}
        <section id="courses">
          <Courses />
        </section>

        {/* Results Section - Metrics & Testimonials */}
        <section id="results">
          <Results />
        </section>

        {/* Pricing Section */}
        <section id="pricing">
          <Pricing />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
