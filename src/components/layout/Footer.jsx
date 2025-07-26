import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer style={footerStyles}>
      <div className="container">
        <div style={footerContentStyles}>
          {/* Logo and Description */}
          <div style={logoSectionStyles}>
            <div style={logoContainerStyles}>
              <div style={logoIconStyles}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="16" fill="var(--primary-pink)" />
                  <path
                    d="M16 8c-2.2 0-4 1.8-4 4 0 2.2 1.8 4 4 4s4-1.8 4-4c0-2.2-1.8-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                    fill="white"
                  />
                  <path d="M12 18c-1.1 0-2 .9-2 2v4h12v-4c0-1.1-.9-2-2-2h-8z" fill="white" />
                </svg>
              </div>
              <span style={logoTextStyles}>NaariCycle</span>
            </div>

            <p style={descriptionStyles}>
              Empowering Nepali women with smart period tracking, health insights, and personalized care. Your journey
              to better menstrual health starts here.
            </p>

            <div style={socialLinksStyles}>
              <a href="#" style={socialLinkStyles} aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" style={socialLinkStyles} aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" style={socialLinkStyles} aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={linksSectionStyles}>
            <h4 style={sectionTitleStyles}>Quick Links</h4>
            <ul style={linksListStyles}>
              <li>
                <Link to="/about" style={linkStyles}>
                  <span style={linkIconStyles}>🌐</span>
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" style={linkStyles}>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" style={linkStyles}>
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/features" style={linkStyles}>
                  Features
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" style={linkStyles}>
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div style={linksSectionStyles}>
            <h4 style={sectionTitleStyles}>Legal</h4>
            <ul style={linksListStyles}>
              <li>
                <Link to="/privacy" style={linkStyles}>
                  <span style={linkIconStyles}>📋</span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" style={linkStyles}>
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/security" style={linkStyles}>
                  Security
                </Link>
              </li>
              <li>
                <Link to="/cookies" style={linkStyles}>
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={footerBottomStyles}>
          <div style={copyrightStyles}>
            <span>© 2024 NaariCycle. Made with </span>
            <span style={heartStyles}>❤️</span>
            <span> by Nepali students for Nepali women.</span>
          </div>
          <div style={taglineStyles}>Supporting menstrual health and awareness through technology.</div>
        </div>
      </div>
    </footer>
  )
}

const footerStyles = {
  background: "#2c3e50",
  color: "#ecf0f1",
  padding: "60px 0 30px",
}

const footerContentStyles = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr",
  gap: "60px",
  marginBottom: "50px",
}

const logoSectionStyles = {
  maxWidth: "400px",
}

const logoContainerStyles = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "24px",
}

const logoIconStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

const logoTextStyles = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#ecf0f1",
}

const descriptionStyles = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#bdc3c7",
  marginBottom: "32px",
}

const socialLinksStyles = {
  display: "flex",
  gap: "16px",
}

const socialLinkStyles = {
  color: "#bdc3c7",
  transition: "color 0.3s ease",
  padding: "8px",
  borderRadius: "8px",
}

const linksSectionStyles = {
  display: "flex",
  flexDirection: "column",
}

const sectionTitleStyles = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#ecf0f1",
  marginBottom: "24px",
}

const linksListStyles = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}

const linkStyles = {
  color: "#bdc3c7",
  textDecoration: "none",
  fontSize: "16px",
  transition: "color 0.3s ease",
  display: "flex",
  alignItems: "center",
  gap: "8px",
}

const linkIconStyles = {
  fontSize: "14px",
}

const footerBottomStyles = {
  borderTop: "1px solid #070808ff",
  paddingTop: "30px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "20px",
}

const copyrightStyles = {
  fontSize: "14px",
  color: "#bdc3c7",
  display: "flex",
  alignItems: "center",
  gap: "4px",
}

const heartStyles = {
  color: "var(--primary-pink)",
  fontSize: "16px",
}

const taglineStyles = {
  fontSize: "14px",
  color: "#bdc3c7",
  fontStyle: "italic",
}

export default Footer
