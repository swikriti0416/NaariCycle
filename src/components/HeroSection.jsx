import { Link } from "react-router-dom";

const HeroSection = () => {
  const generateCalendarDays = () => {
    const days = [];

    // Empty days at start
    for (let i = 0; i < 5; i++) {
      days.push({ number: "", isEmpty: true });
    }

    // Days of the month
    for (let day = 1; day <= 31; day++) {
      days.push({
        number: day,
        isPeriod: [26, 27, 28].includes(day),
        isOvulation: [17, 18].includes(day),
        isEmpty: false,
      });
    }

    return days;
  };

  const days = generateCalendarDays();

  return (
    <section className="bg-pink-50 py-5 min-h-[90vh] flex items-center">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        {/* LEFT: Text Content */}
        <div className="max-w-lg pl-10">
          <p className="text-pink-600 text-sm md:text-base font-semibold mb-6 tracking-wide uppercase">
            Built by Nepali students for Nepali women
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900">
            Track. Predict.{" "}
            <span className="text-pink-600">Understand.</span>
            <br />
            Your Cycle.
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            A smart and simple period tracking app designed just for you. Take
            control of your menstrual health with personalized insights and
            predictions.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/login"
              className="bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-pink-700 transition-all duration-200 flex items-center gap-2"
            >
              Get Started <span>→</span>
            </Link>

            <Link
              to="/prediction"
              className="border border-pink-600 text-pink-600 font-bold px-6 py-3 rounded-lg hover:bg-pink-50 transition-all duration-200"
            >
              Predict Your Cycle
            </Link>
          </div>
        </div>

        {/* RIGHT: Calendar */}
        
        <div className="flex flex-col items-center px-4 sm:px-20 py-10 bg-pink-50 min-h-screen">
          {/* Dashboard Button */}
          <Link
            to="/dashboard"
            className="bg-pink-600 text-white text-lg font-bold tracking-wider px-20 py-3 rounded-xl shadow-lg hover:bg-pink-700 transition flex items-center mb-4 animate-bounce"
          >
            Dashboard
          </Link>

          {/* Calendar Card */}
          <div className="bg-white rounded-3xl p-6 shadow-xl w-full max-w-md border border-pink-300">
            
            {/* Calendar Header */}
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Nov 2025</h3>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-2 mb-4 ">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <div
                  key={i}
                  className="text-center text-sm font-medium text-gray-500 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {days.map((day, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-center h-10 w-10 rounded-lg text-sm font-medium transition-all
                    ${
                      day.isEmpty
                        ? "bg-transparent cursor-default"
                        : day.isPeriod
                        ? "bg-pink-600 text-white font-semibold shadow-md"
                        : day.isOvulation
                        ? "bg-pink-300 text-white font-semibold shadow-sm"
                        : "text-gray-800 hover:bg-pink-100 cursor-pointer"
                    }`}
                >
                  {day.number}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center border-t border-gray-200 pt-4">
              <span className="text-sm text-gray-600 font-medium">
                Next period in 12 days
              </span>
              <div className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-pink-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
