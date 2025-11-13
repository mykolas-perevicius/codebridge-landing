/**
 * Courses Section Component
 *
 * Displays available course offerings in a responsive grid
 * Each course card links to the detailed syllabus
 */

export default function Courses() {
  const courses = [
    {
      title: "Intro to Python & Problem Solving",
      description: "Perfect first programming course. Students learn computational thinking, variables, loops, functions, and build real programs.",
      icon: "🐍",
      level: "Beginner",
      duration: "12 weeks",
      syllabusLink: "https://mykolas-perevicius.github.io/Education_Playground/easy/README_EASY.html",
    },
    {
      title: "Web Development Fundamentals",
      description: "HTML, CSS, and JavaScript from scratch. Students build responsive websites and interactive web applications.",
      icon: "🌐",
      level: "Beginner",
      duration: "14 weeks",
      syllabusLink: "https://mykolas-perevicius.github.io/Education_Playground/tools/README.html",
    },
    {
      title: "Introduction to Data Science",
      description: "Data analysis with Python, Pandas, and visualization. Real datasets, statistical thinking, and storytelling with data.",
      icon: "📊",
      level: "Intermediate",
      duration: "12 weeks",
      syllabusLink: "https://mykolas-perevicius.github.io/Education_Playground/medium/05_data_analysis_with_pandas.html",
    },
    {
      title: "AP Computer Science Principles Prep",
      description: "Comprehensive preparation for the AP CSP exam. Covers all topics with practice exams and Create Performance Task support.",
      icon: "🎓",
      level: "Intermediate",
      duration: "Full Year",
      syllabusLink: "https://mykolas-perevicius.github.io/Education_Playground/medium/README_MEDIUM.html",
    },
    {
      title: "Game Development in Python",
      description: "Build 2D games from scratch using Pygame. Learn game loops, sprites, collision detection, sound, and game design principles.",
      icon: "🎮",
      level: "Intermediate",
      duration: "10 weeks",
      syllabusLink: "https://mykolas-perevicius.github.io/Education_Playground/hard/07_project_ideas.html",
    },
    {
      title: "AI Foundations for Teens",
      description: "Machine learning, neural networks, and AI ethics. Students build classifiers, chatbots, and image recognition systems.",
      icon: "🤖",
      level: "Advanced",
      duration: "14 weeks",
      syllabusLink: "https://mykolas-perevicius.github.io/Education_Playground/hard/04_deep_learning_and_neural_networks.html",
    },
  ];

  const levelColors: Record<string, string> = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-blue-100 text-blue-800",
    Advanced: "bg-purple-100 text-purple-800",
  };

  return (
    <section className="py-20 bg-soft-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-navy mb-4">
            Courses We Offer
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Production-ready curriculum designed by industry professionals
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-br from-navy to-[#1a2f4a] p-6 text-center">
                <div className="text-6xl mb-3">{course.icon}</div>
                <h3 className="text-xl font-bold text-white">
                  {course.title}
                </h3>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Badges */}
                <div className="flex gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${levelColors[course.level]}`}>
                    {course.level}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                    {course.duration}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed flex-1">
                  {course.description}
                </p>

                {/* CTA Button */}
                <a
                  href={course.syllabusLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-6 py-3 bg-sky-blue text-white font-semibold rounded-lg hover:bg-[#2563eb] transition-colors duration-300 hover:shadow-lg"
                >
                  View Syllabus →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 text-lg mb-6">
            All courses include interactive labs, real-world projects, and portfolio-building assignments
          </p>
          <a
            href="/Education_Playground/README.html"
            className="inline-block px-8 py-3 bg-white border-2 border-navy text-navy font-semibold rounded-lg hover:bg-navy hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Enter Coding Playground →
          </a>
        </div>
      </div>
    </section>
  );
}
