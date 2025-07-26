const FeaturesPage = () => {
  const features = [
    {
      icon: "📅",
      title: "Cycle Tracking",
      description: "Log your periods and get accurate predictions for your next cycle.",
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
      description: "Keep track of symptoms, moods, and notes to understand your body better.",
      details: ["Log physical symptoms", "Track mood changes", "Add personal notes", "Identify patterns over time"],
    },
    
    {
      icon: "🔮",
      title: "Smart Predictions",
      description: "Advanced algorithms predict your next period, ovulation, and fertile window.",
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
      description: "Track water intake, exercise, sleep, and other health habits.",
      details: ["Water intake monitoring", "Exercise tracking", "Sleep pattern analysis", "Medication reminders"],
    },
    {
      icon: "🔒",
      title: "Privacy & Security",
      description: "Your data is encrypted and secure. Complete privacy guaranteed.",
      details: ["End-to-end encryption", "Local data storage options", "No data sharing", "GDPR compliant"],
    },
  ]

  return (
    <div style={pageStyles}>
      <div className="container">
        {/* Header */}
        <div style={headerStyles}>
          <h1 style={titleStyles}>Features to Help You Thrive</h1>
          <p style={subtitleStyles}>
            Discover all the powerful features designed to support your menstrual health journey
          </p>
        </div>

        {/* Features Grid */}
        <div style={featuresGridStyles}>
          {features.map((feature, index) => (
            <div key={index} style={featureCardStyles} className="feature-card">
              <div style={featureIconStyles}>{feature.icon}</div>
              <h3 style={featureTitleStyles}>{feature.title}</h3>
              <p style={featureDescriptionStyles}>{feature.description}</p>

              <ul style={featureDetailsStyles}>
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} style={featureDetailItemStyles}>
                    <span style={checkmarkStyles}>✓</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div style={ctaStyles}>
          <h2 style={ctaTitleStyles}>Ready to Start Your Journey?</h2>
          <p style={ctaDescriptionStyles}>
            Join thousands of women who trust NaariCycle for their menstrual health tracking
          </p>
          <div style={ctaButtonsStyles}>
            <a href="/signup" className="btn btn-primary btn-large">
              Get Started Free
            </a>
            
          </div>
        </div>
      </div>
    </div>
  )
}

const pageStyles = {
  minHeight: "100vh",
  background: "var(--very-light-pink)",
  paddingTop: "40px",
  paddingBottom: "80px",
}

const headerStyles = {
  textAlign: "center",
  marginBottom: "80px",
}

const titleStyles = {
  fontSize: "48px",
  fontWeight: "800",
  color: "var(--text-dark)",
  marginBottom: "20px",
  letterSpacing: "-0.02em",
}

const subtitleStyles = {
  fontSize: "20px",
  color: "var(--text-light)",
  maxWidth: "600px",
  margin: "0 auto",
  lineHeight: "1.6",
}

const featuresGridStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gap: "40px",
  marginBottom: "100px",
}

const featureCardStyles = {
  background: "var(--white)",
  borderRadius: "var(--border-radius-lg)",
  padding: "40px",
  boxShadow: "var(--shadow)",
  transition: "all 0.3s ease",
  border: "1px solid transparent",
}

const featureIconStyles = {
  fontSize: "48px",
  marginBottom: "24px",
  display: "block",
}

const featureTitleStyles = {
  fontSize: "24px",
  fontWeight: "700",
  color: "var(--text-dark)",
  marginBottom: "16px",
}

const featureDescriptionStyles = {
  fontSize: "16px",
  color: "var(--text-light)",
  lineHeight: "1.6",
  marginBottom: "24px",
}

const featureDetailsStyles = {
  listStyle: "none",
  padding: 0,
  margin: 0,
}

const featureDetailItemStyles = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "12px",
  fontSize: "14px",
  color: "var(--text-dark)",
}

const checkmarkStyles = {
  color: "var(--primary-pink)",
  fontWeight: "bold",
  fontSize: "16px",
}

const ctaStyles = {
  textAlign: "center",
  background: "var(--white)",
  borderRadius: "var(--border-radius-lg)",
  padding: "60px 40px",
  boxShadow: "var(--shadow-lg)",
}

const ctaTitleStyles = {
  fontSize: "36px",
  fontWeight: "700",
  color: "var(--text-dark)",
  marginBottom: "16px",
}

const ctaDescriptionStyles = {
  fontSize: "18px",
  color: "var(--text-light)",
  marginBottom: "32px",
  maxWidth: "500px",
  margin: "0 auto 32px",
}

const ctaButtonsStyles = {
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  flexWrap: "wrap",
}

export default FeaturesPage
