export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Sign up and create your profile",
      description:
        "Create your account and set up your personal health profile in minutes.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          <path d="M18 8h2v2h-2zm0 4h2v2h-2z" />
        </svg>
      ),
    },
    {
      number: "2",
      title: "Add your cycle details & symptoms",
      description:
        "Input your cycle history and start logging daily symptoms and moods.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      ),
    },
    {
      number: "3",
      title: "Get predictions",
      description:
        "Receive accurate predictions for your next period, ovulation, and fertile window.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
          <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.25l1.41-1.41L19.5 16.43l-1.41 1.41L16.68 16.43 15.27 17.84l1.41 1.41L18.09 20.66l1.41-1.41L20.91 20.66 22.32 19.25 20.91 17.84 19.5 19.25z" />
        </svg>
      ),
    },
    {
      number: "4",
      title: "Track habits and learn about your body",
      description:
        "Build healthy habits and gain insights about your unique cycle patterns.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 7H16c-.8 0-1.54.37-2.01.99l-2.54 3.38c-.74.99-.74 2.31 0 3.3l1.04 1.38V18c0 .55.45 1 1 1s1-.45 1-1v-2.5c0-.28-.11-.53-.29-.71L12.8 13.4c-.37-.49-.37-1.15 0-1.64L14.5 10h1.5l2.5 7.5V22z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-pink-50 py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Get started with NaariCycle in just a few simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-16 lg:gap-20 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center max-w-xs transition-transform duration-300 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-linear-to-r from-pink-600 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                  {step.icon}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold border-4 border-white">
                  {step.number}
                </div>
              </div>

              {/* Text */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
