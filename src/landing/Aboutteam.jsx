const AboutTeam = () => {
  return (
    <section style={sectionStyles}>
      <div className="container">
        <div style={contentStyles}>
          <h2 style={titleStyles}>About the Team</h2>

          <div style={quoteContainerStyles}>
            <p style={quoteStyles}>
              "Built by Nepali students for Nepali women — to support menstrual health and awareness with technology."
            </p>
          </div>

          <div style={descriptionContainerStyles}>
            <p style={descriptionStyles}>
              NaariCycle was created by a passionate team of Nepali students who recognized the need for accessible,
              culturally-sensitive menstrual health technology. Our mission is to empower women across Nepal with the
              tools and knowledge they need to understand and manage their reproductive health confidently.
            </p>
          </div>

          <div style={madeWithLoveStyles}>
            <span>Made </span>
            <span style={heartStyles}>❤️</span>
            <span>by the NaariCycle Team</span>
          </div>
        </div>
      </div>
    </section>
  )
}

const sectionStyles = {
  background: "var(--very-light-pink)",
  padding: "100px 0",
}

const contentStyles = {
  maxWidth: "800px",
  margin: "0 auto",
  textAlign: "center",
}

const titleStyles = {
  fontSize: "48px",
  fontWeight: "800",
  color: "var(--text-dark)",
  marginBottom: "60px",
  letterSpacing: "-0.02em",
}

const quoteContainerStyles = {
  background: "rgba(233, 30, 99, 0.05)",
  borderRadius: "var(--border-radius-lg)",
  padding: "40px",
  marginBottom: "40px",
  border: "1px solid rgba(233, 30, 99, 0.1)",
}

const quoteStyles = {
  fontSize: "24px",
  fontWeight: "600",
  color: "var(--text-dark)",
  lineHeight: "1.5",
  fontStyle: "italic",
  margin: 0,
}

const descriptionContainerStyles = {
  marginBottom: "60px",
}

const descriptionStyles = {
  fontSize: "18px",
  color: "var(--text-light)",
  lineHeight: "1.7",
  fontWeight: "400",
}

const madeWithLoveStyles = {
  fontSize: "20px",
  fontWeight: "600",
  color: "var(--primary-pink)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
}

const heartStyles = {
  fontSize: "24px",
  animation: "heartbeat 1.5s ease-in-out infinite",
}

export default AboutTeam
