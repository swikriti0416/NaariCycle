const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Sign up and create your profile",
      description: "Create your account and set up your personal health profile in minutes.",
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
      description: "Input your cycle history and start logging daily symptoms and moods.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      ),
    },
    {
      number: "3",
      title: "Get predictions",
      description: "Receive accurate predictions for your next period, ovulation, and fertile window.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
          <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.25l1.41-1.41L19.5 16.43l-1.41 1.41L16.68 16.43 15.27 17.84l1.41 1.41L18.09 20.66l1.41-1.41L20.91 20.66 22.32 19.25 20.91 17.84 19.5 19.25z" />
        </svg>
      ),
    },
    {
      number: "4",
      title: "Track habits and learn about your body",
      description: "Build healthy habits and gain insights about your unique cycle patterns.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 7H16c-.8 0-1.54.37-2.01.99l-2.54 3.38c-.74.99-.74 2.31 0 3.3l1.04 1.38V18c0 .55.45 1 1 1s1-.45 1-1v-2.5c0-.28-.11-.53-.29-.71L12.8 13.4c-.37-.49-.37-1.15 0-1.64L14.5 10h1.5l2.5 7.5V22z" />
        </svg>
      ),
    },
  ]

  return (
    <section style={sectionStyles}>
      <div className="container">
        <div style={headerStyles}>
          <h2 style={titleStyles}>How It Works</h2>
          <p style={subtitleStyles}>Get started with NaariCycle in just a few simple steps</p>
        </div>

        <div style={stepsContainerStyles}>
          {steps.map((step, index) => (
            <div key={index} style={stepStyles}>
              <div style={stepIconContainerStyles}>
                <div style={stepIconStyles}>{step.icon}</div>
                <div style={stepNumberStyles}>{step.number}</div>
              </div>
              <h3 style={stepTitleStyles}>{step.title}</h3>
              <p style={stepDescriptionStyles}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const sectionStyles = {
  background: "var(--very-light-pink)",
  padding: "100px 0",
}

const headerStyles = {
  textAlign: "center",
  marginBottom: "80px",
}

const titleStyles = {
  fontSize: "48px",
  fontWeight: "800",
  color: "var(--text-dark)",
  marginBottom: "16px",
  letterSpacing: "-0.02em",
}

const subtitleStyles = {
  fontSize: "18px",
  color: "var(--text-light)",
  fontWeight: "400",
}

const stepsContainerStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "60px",
  maxWidth: "1200px",
  margin: "0 auto",
}

const stepStyles = {
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}

const stepIconContainerStyles = {
  position: "relative",
  marginBottom: "32px",
}

const stepIconStyles = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  background: "var(--gradient-primary)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "var(--shadow)",
}

const stepNumberStyles = {
  position: "absolute",
  bottom: "-8px",
  right: "-8px",
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  background: "var(--primary-pink)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  fontWeight: "700",
  border: "3px solid white",
}

const stepTitleStyles = {
  fontSize: "20px",
  fontWeight: "700",
  color: "var(--text-dark)",
  marginBottom: "16px",
  lineHeight: "1.3",
}

const stepDescriptionStyles = {
  fontSize: "16px",
  color: "var(--text-light)",
  lineHeight: "1.6",
  maxWidth: "280px",
}

export default HowItWorks
