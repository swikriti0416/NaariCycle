import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa"
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-16 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-around gap-12 mb-12">
        {/* Logo & Description */}
        <div className="space-y-6 mr-30 max-w-sm">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#db2777" />
                <path
                  d="M16 8c-2.2 0-4 1.8-4 4 0 2.2 1.8 4 4 4s4-1.8 4-4c0-2.2-1.8-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                  fill="white"
                />
                <path d="M12 18c-1.1 0-2 .9-2 2v4h12v-4c0-1.1-.9-2-2-2h-8z" fill="white" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-100">NaariCycle</span>
          </div>

          <p className="text-gray-400 leading-relaxed">
            Empowering Nepali women with smart period tracking, health insights, and personalized care. Your journey
            to better menstrual health starts here.
          </p>

        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 p-2 rounded-md transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>

          <a
            href="https://www.facebook.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-600 p-2 rounded-md transition-colors"
            aria-label="Facebook"
          >
            <FaFacebookF size={24} />
          </a>

          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 p-2 rounded-md transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter size={24} />
          </a>
        </div>
        </div>

        {/* Quick Links */}
        <div >
          <h4 className="text-lg font-semibold text-gray-100 mb-5 border-b-2">Quick Links</h4>
          <ul className="space-y-3">
            <li>
              <Link to="/" className="flex items-center gap-2 hover:text-pink-500">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-pink-500">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-pink-500">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/features" className="hover:text-pink-500">
                Features
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" className="hover:text-pink-500">
                How It Works
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold text-gray-100 mb-5 ">Legal</h4>
          <ul className="space-y-5">
            <li>
              <Link to="/privacy" className="flex items-center gap-2 hover:text-pink-500">
                📋 Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-pink-500">
                📜 Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/security" className="hover:text-pink-500">
                🔐 Security
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="hover:text-pink-500">
                🍪 Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-1 text-gray-400 text-sm">
          <span>© 2025 NaariCycle. Made with</span>
          <span className="text-pink-500">❤️</span>
          <span>by Nepali students for Nepali women.</span>
        </div>
        <div className="text-gray-400 italic text-sm">
          Supporting menstrual health and awareness through technology.
        </div>
      </div>
    </footer>
  );
}
