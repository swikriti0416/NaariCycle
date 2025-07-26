"use client"

import { useState } from "react"

const WaterIntake = () => {
  const [waterIntake, setWaterIntake] = useState(0)
  const dailyGoal = 8 // 8 glasses per day

  const addWater = () => {
    if (waterIntake < dailyGoal) {
      setWaterIntake(waterIntake + 1)
    }
  }

  const removeWater = () => {
    if (waterIntake > 0) {
      setWaterIntake(waterIntake - 1)
    }
  }

  const progress = (waterIntake / dailyGoal) * 100

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <h3 style={titleStyles}>Water Intake</h3>
        <div style={goalStyles}>
          {waterIntake} / {dailyGoal} glasses
        </div>
      </div>

      <div style={visualContainerStyles}>
        <div style={bottleContainerStyles}>
          <svg width="80" height="120" viewBox="0 0 80 120" style={bottleStyles}>
            {/* Bottle outline */}
            <path
              d="M25 20 L25 10 Q25 5 30 5 L50 5 Q55 5 55 10 L55 20 L60 25 Q65 30 65 35 L65 105 Q65 110 60 115 L20 115 Q15 110 15 105 L15 35 Q15 30 20 25 Z"
              fill="none"
              stroke="var(--primary-pink)"
              strokeWidth="2"
            />

            {/* Water fill */}
            <path
              d={`M20 ${115 - progress * 0.8} L60 ${115 - progress * 0.8} L60 110 Q60 115 55 115 L25 115 Q20 115 20 110 Z`}
              fill="var(--primary-pink)"
              opacity="0.6"
            />

            {/* Bottle cap */}
            <rect x="30" y="5" width="20" height="8" rx="2" fill="var(--accent-pink)" />
          </svg>
        </div>

        <div style={progressTextStyles}>{Math.round(progress)}% of daily goal</div>
      </div>

      <div style={controlsStyles}>
        <button
          onClick={removeWater}
          style={{ ...buttonStyles, opacity: waterIntake === 0 ? 0.5 : 1 }}
          disabled={waterIntake === 0}
        >
          -
        </button>

        <div style={glassesContainerStyles}>
          {[...Array(dailyGoal)].map((_, index) => (
            <div
              key={index}
              style={{
                ...glassStyles,
                background: index < waterIntake ? "var(--primary-pink)" : "#E2E8F0",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H9L3 7V9H21ZM12 22C17.5 22 22 17.5 22 12H2C2 17.5 6.5 22 12 22Z" />
              </svg>
            </div>
          ))}
        </div>

        <button
          onClick={addWater}
          style={{ ...buttonStyles, opacity: waterIntake === dailyGoal ? 0.5 : 1 }}
          disabled={waterIntake === dailyGoal}
        >
          +
        </button>
      </div>

      {waterIntake === dailyGoal && (
        <div style={congratsStyles}>🎉 Great job! You've reached your daily water goal!</div>
      )}

      <div style={tipsStyles}>
        <h4 style={tipsTitleStyles}>Hydration Tips</h4>
        <ul style={tipsListStyles}>
          <li>Drink water first thing in the morning</li>
          <li>Keep a water bottle with you</li>
          <li>Set reminders throughout the day</li>
          <li>Eat water-rich foods like fruits</li>
        </ul>
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

const goalStyles = {
  color: "var(--text-light)",
  fontSize: "0.9rem",
  fontWeight: "500",
}

const visualContainerStyles = {
  textAlign: "center",
  marginBottom: "25px",
}

const bottleContainerStyles = {
  marginBottom: "15px",
}

const bottleStyles = {
  margin: "0 auto",
}

const progressTextStyles = {
  color: "var(--text-light)",
  fontSize: "0.9rem",
}

const controlsStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "20px",
}

const buttonStyles = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: "none",
  background: "var(--primary-pink)",
  color: "var(--white)",
  fontSize: "1.5rem",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
}

const glassesContainerStyles = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  justifyContent: "center",
}

const glassStyles = {
  width: "30px",
  height: "30px",
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--white)",
  transition: "all 0.3s ease",
}

const congratsStyles = {
  background: "linear-gradient(135deg, #10B981, #34D399)",
  color: "var(--white)",
  padding: "15px",
  borderRadius: "var(--border-radius)",
  textAlign: "center",
  fontWeight: "600",
  marginBottom: "20px",
}

const tipsStyles = {
  borderTop: "1px solid #f8f8fa", // lighter border to reduce visible line
  paddingTop: "20px",
}

const tipsTitleStyles = {
  color: "var(--accent-pink)",
  fontSize: "1rem",
  fontWeight: "600",
  marginBottom: "10px",
}

const tipsListStyles = {
  color: "var(--text-light)",
  fontSize: "0.9rem",
  lineHeight: "1.6",
  paddingLeft: "20px",
}

export default WaterIntake
