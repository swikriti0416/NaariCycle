import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-pink-50 py-10">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-pink-700 mb-2">Your Dashboard</h1>
          <p className="text-gray-600 text-lg">Welcome back! Here's your cycle overview.</p>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          <div className="bg-white shadow-md rounded-lg text-center p-6">
            <h3 className="text-pink-600 font-semibold mb-3">Next Period</h3>
            <p className="text-xl font-bold text-gray-800 mb-1">March 15, 2024</p>
            <p className="text-gray-500 text-sm">in 5 days</p>
          </div>

          <div className="bg-white shadow-md rounded-lg text-center p-6">
            <h3 className="text-pink-600 font-semibold mb-3">Cycle Day</h3>
            <p className="text-xl font-bold text-gray-800 mb-1">Day 23</p>
            <p className="text-gray-500 text-sm">of 28-day cycle</p>
          </div>

          <div className="bg-white shadow-md rounded-lg text-center p-6">
            <h3 className="text-pink-600 font-semibold mb-3">Ovulation</h3>
            <p className="text-xl font-bold text-gray-800 mb-1">March 1, 2024</p>
            <p className="text-gray-500 text-sm">9 days ago</p>
          </div>

          <div className="bg-white shadow-md rounded-lg text-center p-6">
            <h3 className="text-pink-600 font-semibold mb-3">Fertility</h3>
            <p className="text-xl font-bold text-gray-800 mb-1">Low</p>
            <p className="text-gray-500 text-sm">Safe period</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <h2 className="text-pink-600 font-semibold text-2xl mb-6">Quick Actions</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={'/symptoms'}>
              <button className="bg-pink-600 text-white px-6 py-2 rounded-lg shadow hover:bg-pink-700 transition">
                Log Symptoms
              </button>
            </Link>
            <button className="bg-white text-pink-600 border border-pink-600 px-6 py-2 rounded-lg shadow hover:bg-pink-50 transition">
              View Calendar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
