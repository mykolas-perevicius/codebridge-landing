/**
 * Pricing Section Component
 *
 * Simple pricing inquiry section without specific numbers
 * Emphasizes flexibility and encourages schools to contact for quotes
 */

export default function Pricing() {
  return (
    <section className="py-20 bg-soft-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-navy mb-4">
            Flexible Pricing for Schools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Affordable options designed to fit your budget and scale with your needs
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-sky-blue">
            {/* Header */}
            <div className="bg-gradient-to-r from-navy to-[#1a2f4a] px-8 py-10 text-center text-white">
              <h3 className="text-3xl font-bold mb-2">
                Custom School Solutions
              </h3>
              <p className="text-lg text-gray-300">
                Per-student or per-classroom pricing available
              </p>
            </div>

            {/* Body */}
            <div className="p-10">
              {/* Pricing Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="text-center p-6 bg-soft-gray rounded-xl">
                  <div className="text-sky-blue mb-3">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-navy mb-2">Per-Student</h4>
                  <p className="text-gray-600">Perfect for smaller class sizes or trial programs</p>
                </div>

                <div className="text-center p-6 bg-soft-gray rounded-xl">
                  <div className="text-sky-blue mb-3">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-navy mb-2">Per-Classroom</h4>
                  <p className="text-gray-600">Ideal for full class implementations</p>
                </div>
              </div>

              {/* What's Included */}
              <div className="mb-10">
                <h4 className="text-2xl font-bold text-navy mb-6 text-center">
                  What's Included
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Expert Software Engineer Instructors",
                    "Complete Curriculum & Course Materials",
                    "Learning Management System Access",
                    "Student Progress Tracking & Analytics",
                    "Interactive Labs & Projects",
                    "Grading & Assessment Tools",
                    "Parent/Admin Dashboards",
                    "24/7 Technical Support",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-sky-blue flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bulk Pricing Note */}
              <div className="bg-sky-blue/10 border-2 border-sky-blue rounded-xl p-6 mb-8 text-center">
                <p className="text-lg font-semibold text-navy mb-2">
                  🎓 District Pricing Available
                </p>
                <p className="text-gray-700">
                  Bulk pricing and custom packages for multi-school districts
                </p>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <a
                  href="https://calendly.com/codebridge-labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 bg-sky-blue text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-[#2563eb] transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  Schedule a Call to Discuss Pricing
                </a>
                <p className="text-sm text-gray-600 mt-4">
                  Get a custom quote tailored to your school's needs
                </p>
              </div>
            </div>
          </div>

          {/* Trust Statement */}
          <div className="mt-8 text-center text-gray-600">
            <p className="text-sm">
              💡 <span className="font-semibold">Money-back guarantee:</span> Not satisfied after the first month? Full refund, no questions asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
