/**
 * Results Section Component
 *
 * Features:
 * - Key metrics highlighting program success
 * - Testimonials from school administrators and teachers
 * - Social proof and credibility building
 */

export default function Results() {
  const metrics = [
    {
      value: "92%",
      label: "Student Completion Rate",
      description: "Industry-leading engagement",
    },
    {
      value: "4.8/5",
      label: "Student Satisfaction",
      description: "Based on 1,200+ reviews",
    },
    {
      value: "48hrs",
      label: "Admin Onboarding Time",
      description: "From signup to first class",
    },
    {
      value: "100+",
      label: "Partner Schools",
      description: "And growing every month",
    },
  ];

  const testimonials = [
    {
      quote: "CodeBridge allowed us to offer AP Computer Science without hiring a new teacher. The instructors are fantastic and the students are thriving.",
      author: "Dr. Sarah Mitchell",
      role: "Principal, Lincoln High School",
      location: "Seattle, WA",
    },
    {
      quote: "Finally, a CS program that actually works. Our students went from zero coding experience to building real projects in just one semester.",
      author: "James Rodriguez",
      role: "STEM Coordinator, Washington District",
      location: "Phoenix, AZ",
    },
    {
      quote: "The curriculum is outstanding - modern, relevant, and engaging. Parents are asking when we'll expand to more grade levels.",
      author: "Emily Chen",
      role: "Assistant Principal, Riverside Academy",
      location: "Austin, TX",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-navy mb-4">
            Results That Speak for Themselves
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds of schools delivering world-class CS education
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="text-center p-6 bg-soft-gray rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-5xl font-bold text-sky-blue mb-2">
                {metric.value}
              </div>
              <div className="text-lg font-semibold text-navy mb-1">
                {metric.label}
              </div>
              <div className="text-sm text-gray-600">
                {metric.description}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-navy text-center mb-12">
            What School Leaders Are Saying
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-soft-gray rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 relative"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-sky-blue rounded-full flex items-center justify-center text-white text-3xl font-serif">
                  &ldquo;
                </div>

                {/* Quote */}
                <p className="text-gray-700 italic mb-6 leading-relaxed pt-4">
                  {testimonial.quote}
                </p>

                {/* Author Info */}
                <div className="border-t border-gray-300 pt-4">
                  <p className="font-bold text-navy">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center bg-gradient-to-r from-navy to-[#1a2f4a] rounded-2xl p-10 text-white">
          <h3 className="text-2xl font-bold mb-6">
            Trusted Nationwide
          </h3>
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-sky-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>FERPA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-sky-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Fully Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-sky-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Background-Checked Instructors</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-sky-blue" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
