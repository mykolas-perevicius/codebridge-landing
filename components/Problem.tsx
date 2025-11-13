/**
 * Problem Section Component
 *
 * Highlights the key challenges schools face when trying to offer CS education
 * and positions CodeBridge as the solution.
 */

export default function Problem() {
  const problems = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "No Certified CS Teachers",
      description: "Finding qualified computer science instructors is difficult and expensive. Most schools can't afford dedicated CS faculty.",
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Outdated Curriculum",
      description: "Traditional CS curricula don't reflect modern industry practices. Students need relevant, up-to-date content.",
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Difficult to Scale",
      description: "Running quality CS programs across multiple classrooms requires infrastructure, time, and resources most schools lack.",
    },
  ];

  return (
    <section className="py-20 bg-soft-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-navy mb-4">
            Why Schools Choose CodeBridge
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We solve the biggest challenges schools face when launching CS programs
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full"
            >
              {/* Icon */}
              <div className="text-sky-blue mb-6">
                {problem.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-navy mb-4">
                {problem.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom emphasis */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-lg px-8 py-6 shadow-lg border border-sky-blue/20">
            <p className="text-2xl font-bold text-navy mb-2">
              We Handle <span className="text-sky-blue">Everything</span>
            </p>
            <p className="text-gray-600">
              From curriculum to instruction to student support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
