const PeriodIndicator = ({ cycleDay, cycleLength = 28 }) => {
  const getPhase = (day) => {
    if (day >= 1 && day <= 5) return "menstrual"
    if (day >= 6 && day <= 13) return "follicular"
    if (day >= 14 && day <= 16) return "ovulation"
    return "luteal"
  }

  const getPhaseInfo = (phase) => {
    const phases = {
      menstrual: {
        name: "Menstrual Phase",
        color: "var(--accent-pink)",
        description: "Your period is here. Rest and take care of yourself.",
      },
      follicular: {
        name: "Follicular Phase",
        color: "var(--primary-pink)",
        description: "Your energy is building up. Great time for new activities.",
      },
      ovulation: {
        name: "Ovulation Phase",
        color: "var(--secondary-pink)",
        description: "Peak fertility window. You might feel more confident.",
      },
      luteal: {
        name: "Luteal Phase",
        color: "#B794F6",
        description: "Your body is preparing. Focus on self-care.",
      },
    }
    return phases[phase]
  }

  const currentPhase = getPhase(cycleDay)
  const phaseInfo = getPhaseInfo(currentPhase)
  const progress = (cycleDay / cycleLength) * 100

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <h3 style={titleStyles}>Cycle Overview</h3>
        <div style={dayCounterStyles}>
          Day <span style={dayNumberStyles}>{cycleDay}</span> of {cycleLength}
        </div>
      </div>

      <div style={progressContainerStyles}>
        <div style={progressBarStyles}>
          <div
            style={{
              ...progressFillStyles,
              width: `${progress}%`,
              background: phaseInfo.color,
            }}
          ></div>
        </div>
        <div style={progressLabelStyles}>{Math.round(progress)}% Complete</div>
      </div>

      <div style={phaseCardStyles}>
        <div
          style={{
            ...phaseIndicatorStyles,
            background: phaseInfo.color,
          }}
        ></div>
        <div>
          <h4 style={phaseNameStyles}>{phaseInfo.name}</h4>
          <p style={phaseDescriptionStyles}>{phaseInfo.description}</p>
        </div>
      </div>

      <div style={upcomingStyles}>
        <h4 style={upcomingTitleStyles}>Upcoming</h4>
        <div style={upcomingItemStyles}>
          <span style={upcomingDateStyles}>Next Period:</span>
          <span>March 15, 2024 (in 5 days)</span>
        </div>
        <div style={upcomingItemStyles}>
          <span style={upcomingDateStyles}>Next Ovulation:</span>
          <span>March 29, 2024 (in 19 days)</span>
        </div>
      </div>
    </div>
  )
}

const containerStyles = {
  background: "var(--white)",
  borderRadius: "var(--border-radius)",
  padding: "25px",
  boxShadow: "var(--shadow)",
}

const headerStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
}

const titleStyles = {
  color: "var(--accent-pink)",
  fontSize: "1.3rem",
  fontWeight: "600",
}

const dayCounterStyles = {
  color: "var(--text-light)",
  fontSize: "0.9rem",
}

const dayNumberStyles = {
  color: "var(--accent-pink)",
  fontWeight: "700",
  fontSize: "1.1rem",
}

const progressContainerStyles = {
  marginBottom: "25px",
}

const progressBarStyles = {
  width: "100%",
  height: "8px",
  background: "#E2E8F0",
  borderRadius: "4px",
  overflow: "hidden",
  marginBottom: "8px",
}

const progressFillStyles = {
  height: "100%",
  transition: "width 0.3s ease",
  borderRadius: "4px",
}

const progressLabelStyles = {
  textAlign: "center",
  color: "var(--text-light)",
  fontSize: "0.8rem",
}

const phaseCardStyles = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  padding: "15px",
  background: "var(--light-pink)",
  borderRadius: "var(--border-radius)",
  marginBottom: "20px",
}

const phaseIndicatorStyles = {
  width: "12px",
  height: "12px",
  borderRadius: "50%",
}

const phaseNameStyles = {
  color: "var(--accent-pink)",
  fontSize: "1.1rem",
  fontWeight: "600",
  marginBottom: "5px",
}

const phaseDescriptionStyles = {
  color: "var(--text-light)",
  fontSize: "0.9rem",
  lineHeight: "1.4",
}

const upcomingStyles = {
  borderTop: "1px solid #E2E8F0",
  paddingTop: "20px",
}

const upcomingTitleStyles = {
  color: "var(--accent-pink)",
  fontSize: "1rem",
  fontWeight: "600",
  marginBottom: "15px",
}

const upcomingItemStyles = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
  fontSize: "0.9rem",
}

const upcomingDateStyles = {
  color: "var(--text-light)",
  fontWeight: "500",
}

export default PeriodIndicator
