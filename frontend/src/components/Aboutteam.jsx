export default function AboutTeam() {
  return (
    <section className="bg-pink-50 py-24">
      <div className="container mx-auto px-6">
        {/* Divider */}
        <div className="border-2 border-pink-400 my-10"></div>

        {/* Content */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-14">
            About the Team
          </h2>

          {/* Quote */}
          <div className="bg-white shadow-pink-400 shadow-lg border border-pink-200 rounded-2xl p-10 mb-10">
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 italic leading-relaxed">
              "Built by Nepali students for Nepali women — to support menstrual
              health and awareness with technology."
            </p>
          </div>

          {/* Description */}
          <div className="mb-14">
            <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
              NaariCycle was created by a passionate team of Nepali students who
              recognized the need for accessible, culturally-sensitive menstrual
              health technology. Our mission is to empower women across Nepal
              with the tools and knowledge they need to understand and manage
              their reproductive health confidently.
            </p>
          </div>

          {/* Made with love */}
          <div className="flex items-center justify-center gap-2 text-pink-600 font-semibold text-xl">
            <span>Made</span>
            <span className="text-2xl animate-pulse">❤️</span>
            <span>by the NaariCycle Team</span>
          </div>
        </div>
      </div>
    </section>
  );
}
