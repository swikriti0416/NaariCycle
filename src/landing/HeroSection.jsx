import { Link } from "react-router-dom"

const HeroSection = () => {
  return (
    <section style={heroStyles}>
      <div className="container">
        <div style={heroContentStyles}>
          {/* Left Content */}
          <div style={heroTextStyles}>
            <div style={taglineStyles}>Built by Nepali students for Nepali women</div>

            <h1 style={heroTitleStyles}>
              Track. Predict. <span style={heroAccentStyles}>Understand.</span>
              <br />
              Your Cycle.
            </h1>

            <p style={heroSubtitleStyles}>
              A smart and simple period tracking app designed just for you. Take control of your menstrual health with
              personalized insights and predictions.
            </p>

            <div style={heroButtonsStyles}>
              <Link to="/signup" className="btn btn-primary btn-large">
                
                Get Started
                <span>→</span>
              </Link>
              <Link to="/login" className="btn btn-secondary btn-large">
                
                Login / Sign Up
              </Link>
            </div>
          </div>

          {/* Right Content - Calendar */}
          <div style={heroCalendarStyles}>
            <div style={calendarContainerStyles}>
              <div style={calendarHeaderStyles}>
                <h3 style={calendarTitleStyles}>March 2024</h3>
              </div>

              <div style={calendarGridStyles}>
                {/* Week days header */}
                <div style={weekHeaderStyles}>
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                    <div key={index} style={weekDayStyles}>
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar days */}
                <div style={daysGridStyles}>
                  {generateCalendarDays().map((day, index) => (
                    <div
                      key={index}
                      style={{
                        ...dayStyles,
                        ...(day.isPeriod ? periodDayStyles : {}),
                        ...(day.isOvulation ? ovulationDayStyles : {}),
                        ...(day.isEmpty ? emptyDayStyles : {}),
                      }}
                    >
                      {day.number}
                    </div>
                  ))}
                </div>
              </div>

              <div style={calendarFooterStyles}>
                <span style={nextPeriodStyles}>Next period in 12 days</span>
                <div style={heartIconStyles}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--primary-pink)">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Helper function to generate calendar days
const generateCalendarDays = () => {
  const days = []

  // Empty days at start
  for (let i = 0; i < 5; i++) {
    days.push({ number: "", isEmpty: true })
  }

  // Days of the month
  for (let day = 1; day <= 31; day++) {
    days.push({
      number: day,
      isPeriod: [26, 27, 28].includes(day),
      isOvulation: [17, 18].includes(day),
      isEmpty: false,
    })
  }

  return days
}

const heroStyles = {
  background: "var(--very-light-pink)",
  padding: "80px 0 120px",
  minHeight: "90vh",
  display: "flex",
  alignItems: "center",
}

const heroContentStyles = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "80px",
  alignItems: "center",
}

const heroTextStyles = {
  maxWidth: "500px",
}

const taglineStyles = {
  color: "var(--primary-pink)",
  fontSize: "16px",
  fontWeight: "600",
  marginBottom: "24px",
  letterSpacing: "0.5px",
}

const heroTitleStyles = {
  fontSize: "56px",
  fontWeight: "800",
  lineHeight: "1.1",
  marginBottom: "24px",
  color: "var(--text-dark)",
  letterSpacing: "-0.02em",
}

const heroAccentStyles = {
  color: "var(--primary-pink)",
}

const heroSubtitleStyles = {
  fontSize: "18px",
  color: "var(--text-light)",
  marginBottom: "40px",
  lineHeight: "1.6",
  fontWeight: "400",
}

const heroButtonsStyles = {
  display: "flex",
  gap: "16px",
  flexWrap: "wrap",
}

const heroCalendarStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const calendarContainerStyles = {
  background: "var(--white)",
  borderRadius: "var(--border-radius-lg)",
  padding: "24px",
  boxShadow: "var(--shadow-lg)",
  width: "100%",
  maxWidth: "400px",
}

const calendarHeaderStyles = {
  textAlign: "center",
  marginBottom: "20px",
}

const calendarTitleStyles = {
  fontSize: "18px",
  fontWeight: "600",
  color: "var(--text-dark)",
}

const calendarGridStyles = {
  marginBottom: "20px",
}

const weekHeaderStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "4px",
  marginBottom: "12px",
}

const weekDayStyles = {
  textAlign: "center",
  fontSize: "12px",
  fontWeight: "500",
  color: "var(--text-muted)",
  padding: "8px 4px",
}

const daysGridStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "4px",
}

const dayStyles = {
  textAlign: "center",
  padding: "12px 4px",
  fontSize: "14px",
  fontWeight: "500",
  color: "var(--text-dark)",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  minHeight: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

const emptyDayStyles = {
  cursor: "default",
}

const periodDayStyles = {
  background: "var(--primary-pink)",
  color: "var(--white)",
  fontWeight: "600",
}

const ovulationDayStyles = {
  background: "var(--secondary-pink)",
  color: "var(--white)",
  fontWeight: "600",
}

const calendarFooterStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: "16px",
  borderTop: "1px solid var(--border-light)",
}

const nextPeriodStyles = {
  fontSize: "14px",
  color: "var(--text-light)",
  fontWeight: "500",
}

const heartIconStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

export default HeroSection
