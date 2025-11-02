const FeaturesPage = () => {
  const features = [
    {
      icon: "📅",
      title: "Cycle Tracking",
      description:
        "Log your periods and get accurate predictions for your next cycle.",
      details: [
        "Track period start and end dates",
        "Monitor cycle length variations",
        "Get personalized predictions",
        "Historical cycle data analysis",
      ],
    },
    {
      icon: "📝",
      title: "Symptom Logging",
      description:
        "Keep track of symptoms, moods, and notes to understand your body better.",
      details: [
        "Log physical symptoms",
        "Track mood changes",
        "Add personal notes",
        "Identify patterns over time",
      ],
    },
    {
      icon: "🔮",
      title: "Smart Predictions",
      description:
        "Advanced algorithms predict your next period, ovulation, and fertile window.",
      details: [
        "Machine learning predictions",
        "Ovulation tracking",
        "Fertile window identification",
        "Pregnancy probability",
      ],
    },
    {
      icon: "💧",
      title: "Habit Tracking",
      description:
        "Track water intake, exercise, sleep, and other health habits.",
      details: [
        "Water intake monitoring",
        "Exercise tracking",
        "Sleep pattern analysis",
        "Medication reminders",
      ],
    },
    {
      icon: "🔒",
      title: "Privacy & Security",
      description:
        "Your data is encrypted and secure. Complete privacy guaranteed.",
      details: [
        "End-to-end encryption",
        "Local data storage options",
        "No data sharing",
        "GDPR compliant",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-pink-50 py-16 md:py-24 ">
      <div className="container mx-auto px-6 ">
        <div className=" border-2 border-pink-400 my-10"></div>
        {/* Header */}
        <div className="text-center mb-20 ">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-10 mb-4 ">
            Features to Help You Thrive
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover all the powerful features designed to support your
            menstrual health journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-10 px-15 md:gap-14 md:grid-cols-2 lg:grid-cols-3 mb-24">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 mx-2 shadow-pink-300 shadow-lg hover:shadow-2xl border border-transparent hover:border-pink-100 transition-all duration-300 feature-card"
            >
              <div className="text-5xl mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>

              <ul className="space-y-3">
                {feature.details.map((detail, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-gray-800 text-sm"
                  >
                    <span className="text-pink-600 font-bold">✓</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className=" border-2 border-pink-400 my-10">

        </div>
        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl shadow-pink-300 shadow-2xl p-5 md:p-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join thousands of women who trust <span className="text-pink-600 font-bold">NaariCycle</span> for their menstrual health tracking.
          </p>
          <div className="flex justify-center">
            <a
              href="/login"
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-4 rounded-lg shadow-md transition-all duration-300"
            >
              Get Started Free
            </a>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default FeaturesPage;
