/**
 * How It Works Section Component
 *
 * 3-step horizontal layout explaining the CodeBridge process
 * Emphasizes simplicity and admin-friendliness
 */

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "We Provide Experienced Instructors",
      description: "Vetted software engineers with real industry experience teach your students virtually. No hiring, no training, no management required.",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "We Provide Curriculum & LMS",
      description: "Complete, production-ready course materials with interactive notebooks, projects, and assessments. Access our full learning management system.",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Students Build Real Projects",
      description: "Your students learn by doing — building websites, AI models, games, and more. Graduate with portfolio-ready work and job skills.",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-navy mb-4">
            How Our Program Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three simple steps to bring world-class CS education to your school
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-sky-blue to-transparent -ml-4 z-0"></div>
              )}

              {/* Step Card */}
              <div className="relative bg-soft-gray rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-sky-blue">
                {/* Step Number Badge */}
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-sky-blue text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-sky-blue mb-6 mt-4">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-navy mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Admin-Friendly Emphasis */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-gradient-to-r from-navy to-[#1a2f4a] rounded-2xl px-10 py-8 text-white shadow-xl">
            <p className="text-2xl font-bold mb-2">
              No Prep Required. No Hiring Needed.
            </p>
            <p className="text-lg text-gray-300">
              We handle everything from day one
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
