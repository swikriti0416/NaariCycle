"use client"

import { useState } from "react"

const PredictionsPage = () => {
  const [currentCycleDay] = useState(23)
  const [cycleLength] = useState(28)

  // Mock data - in real app this would come from your ML backend
  const predictions = {
    nextPeriod: {
      date: "March 15, 2024",
      daysUntil: 5,
      confidence: 92,
    },
    nextOvulation: {
      date: "March 29, 2024",
      daysUntil: 19,
      confidence: 88,
    },
    fertileWindow: {
      start: "March 27, 2024",
      end: "April 1, 2024",
      daysUntil: 17,
    },
    currentPhase: {
      name: "Luteal Phase",
      description: "Your body is preparing for your next cycle. You might experience PMS symptoms.",
      color: "#B794F6",
    },
  }

  const cycleHistory = [
    { month: "Feb 2024", length: 29, predicted: 28, accuracy: 96 },
    { month: "Jan 2024", length: 27, predicted: 28, accuracy: 96 },
    { month: "Dec 2023", length: 28, predicted: 28, accuracy: 100 },
    { month: "Nov 2023", length: 30, predicted: 28, accuracy: 93 },
    { month: "Oct 2023", length: 28, predicted: 29, accuracy: 96 },
  ]

  const getPhaseProgress = () => {
    return (currentCycleDay / cycleLength) * 100
  }

  return (
    <div style={pageStyles}>
      <div className="container">
        {/* Header */}
        <div style={headerStyles}>
          <h1 style={titleStyles}>Your Cycle Predictions</h1>
          <p style={subtitleStyles}>
            AI-powered predictions based on your unique cycle patterns using advanced linear regression algorithms
          </p>
        </div>

        {/* Current Cycle Overview */}
        <div style={overviewCardStyles}>
          <div style={overviewHeaderStyles}>
            <h2 style={overviewTitleStyles}>Current Cycle Overview</h2>
            <div style={cycleDayStyles}>
              Day <span style={dayNumberStyles}>{currentCycleDay}</span> of {cycleLength}
            </div>
          </div>

          <div style={progressContainerStyles}>
            <div style={progressBarStyles}>
              <div
                style={{
                  ...progressFillStyles,
                  width: `${getPhaseProgress()}%`,
                  background: predictions.currentPhase.color,
                }}
              ></div>
            </div>
            <div style={progressLabelStyles}>{Math.round(getPhaseProgress())}% Complete</div>
          </div>

          <div style={currentPhaseStyles}>
            <div
              style={{
                ...phaseIndicatorStyles,
                background: predictions.currentPhase.color,
              }}
            ></div>
            <div>
              <h3 style={phaseNameStyles}>{predictions.currentPhase.name}</h3>
              <p style={phaseDescriptionStyles}>{predictions.currentPhase.description}</p>
            </div>
          </div>
        </div>

        {/* Predictions Grid */}
        <div style={predictionsGridStyles}>
          {/* Next Period */}
          <div style={predictionCardStyles}>
            <div style={predictionIconStyles}>🩸</div>
            <h3 style={predictionTitleStyles}>Next Period</h3>
            <div style={predictionDateStyles}>{predictions.nextPeriod.date}</div>
            <div style={predictionDaysStyles}>in {predictions.nextPeriod.daysUntil} days</div>
            <div style={confidenceStyles}>
              <span style={confidenceLabelStyles}>Confidence:</span>
              <div style={confidenceBarStyles}>
                <div
                  style={{
                    ...confidenceFillStyles,
                    width: `${predictions.nextPeriod.confidence}%`,
                  }}
                ></div>
              </div>
              <span style={confidencePercentStyles}>{predictions.nextPeriod.confidence}%</span>
            </div>
          </div>

          {/* Next Ovulation */}
          <div style={predictionCardStyles}>
            <div style={predictionIconStyles}>🥚</div>
            <h3 style={predictionTitleStyles}>Next Ovulation</h3>
            <div style={predictionDateStyles}>{predictions.nextOvulation.date}</div>
            <div style={predictionDaysStyles}>in {predictions.nextOvulation.daysUntil} days</div>
            <div style={confidenceStyles}>
              <span style={confidenceLabelStyles}>Confidence:</span>
              <div style={confidenceBarStyles}>
                <div
                  style={{
                    ...confidenceFillStyles,
                    width: `${predictions.nextOvulation.confidence}%`,
                  }}
                ></div>
              </div>
              <span style={confidencePercentStyles}>{predictions.nextOvulation.confidence}%</span>
            </div>
          </div>

          {/* Fertile Window */}
          <div style={predictionCardStyles}>
            <div style={predictionIconStyles}>🌸</div>
            <h3 style={predictionTitleStyles}>Fertile Window</h3>
            <div style={predictionDateStyles}>
              {predictions.fertileWindow.start} - {predictions.fertileWindow.end}
            </div>
            <div style={predictionDaysStyles}>starts in {predictions.fertileWindow.daysUntil} days</div>
            <div style={fertilityStatusStyles}>
              <span style={fertilityLabelStyles}>Current Status:</span>
              <span style={fertilityValueStyles}>Low Fertility</span>
            </div>
          </div>
        </div>

        {/* Prediction Accuracy */}
        <div style={accuracyCardStyles}>
          <h2 style={accuracyTitleStyles}>Prediction Accuracy History</h2>
          <p style={accuracyDescriptionStyles}>
            Our machine learning algorithm continuously improves based on your cycle data
          </p>

          <div style={accuracyTableStyles}>
            <div style={tableHeaderStyles}>
              <div style={tableHeaderCellStyles}>Month</div>
              <div style={tableHeaderCellStyles}>Actual Length</div>
              <div style={tableHeaderCellStyles}>Predicted Length</div>
              <div style={tableHeaderCellStyles}>Accuracy</div>
            </div>

            {cycleHistory.map((cycle, index) => (
              <div key={index} style={tableRowStyles}>
                <div style={tableCellStyles}>{cycle.month}</div>
                <div style={tableCellStyles}>{cycle.length} days</div>
                <div style={tableCellStyles}>{cycle.predicted} days</div>
                <div style={tableCellStyles}>
                  <span style={accuracyBadgeStyles}>{cycle.accuracy}%</span>
                </div>
              </div>
            ))}
          </div>

          <div style={overallAccuracyStyles}>
            <span style={overallAccuracyLabelStyles}>Overall Accuracy:</span>
            <span style={overallAccuracyValueStyles}>96.2%</span>
          </div>
        </div>

        {/* Tips Section */}
        <div style={tipsCardStyles}>
          <h2 style={tipsTitleStyles}>Personalized Tips</h2>
          <div style={tipsGridStyles}>
            <div style={tipItemStyles}>
              <div style={tipIconStyles}>💧</div>
              <div>
                <h4 style={tipTitleStyles}>Stay Hydrated</h4>
                <p style={tipDescriptionStyles}>Increase water intake during your luteal phase to reduce bloating</p>
              </div>
            </div>
            <div style={tipItemStyles}>
              <div style={tipIconStyles}>🧘‍♀️</div>
              <div>
                <h4 style={tipTitleStyles}>Manage Stress</h4>
                <p style={tipDescriptionStyles}>Practice meditation to help regulate your cycle naturally</p>
              </div>
            </div>
            <div style={tipItemStyles}>
              <div style={tipIconStyles}>🥗</div>
              <div>
                <h4 style={tipTitleStyles}>Nutrition Focus</h4>
                <p style={tipDescriptionStyles}>Include iron-rich foods in your diet before your period</p>
              </div>
            </div>
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
  marginBottom: "60px",
}

const titleStyles = {
  fontSize: "48px",
  fontWeight: "800",
  color: "var(--text-dark)",
  marginBottom: "20px",
  letterSpacing: "-0.02em",
}

const subtitleStyles = {
  fontSize: "18px",
  color: "var(--text-light)",
  maxWidth: "700px",
  margin: "0 auto",
  lineHeight: "1.6",
}

const overviewCardStyles = {
  background: "var(--white)",
  borderRadius: "var(--border-radius-lg)",
  padding: "40px",
  boxShadow: "var(--shadow-lg)",
  marginBottom: "40px",
}

const overviewHeaderStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
}

const overviewTitleStyles = {
  fontSize: "24px",
  fontWeight: "700",
  color: "var(--text-dark)",
}

const cycleDayStyles = {
  fontSize: "16px",
  color: "var(--text-light)",
}

const dayNumberStyles = {
  color: "var(--primary-pink)",
  fontWeight: "700",
  fontSize: "20px",
}

const progressContainerStyles = {
  marginBottom: "30px",
}

const progressBarStyles = {
  width: "100%",
  height: "12px",
  background: "#E2E8F0",
  borderRadius: "6px",
  overflow: "hidden",
  marginBottom: "8px",
}

const progressFillStyles = {
  height: "100%",
  transition: "width 0.3s ease",
  borderRadius: "6px",
}

const progressLabelStyles = {
  textAlign: "center",
  color: "var(--text-light)",
  fontSize: "14px",
}

const currentPhaseStyles = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  padding: "20px",
  background: "var(--light-pink)",
  borderRadius: "var(--border-radius)",
}

const phaseIndicatorStyles = {
  width: "16px",
  height: "16px",
  borderRadius: "50%",
}

const phaseNameStyles = {
  fontSize: "20px",
  fontWeight: "600",
  color: "var(--text-dark)",
  marginBottom: "8px",
}

const phaseDescriptionStyles = {
  fontSize: "16px",
  color: "var(--text-light)",
  lineHeight: "1.5",
}

const predictionsGridStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "30px",
  marginBottom: "60px",
}

const predictionCardStyles = {
  background: "var(--white)",
  borderRadius: "var(--border-radius-lg)",
  padding: "30px",
  boxShadow: "var(--shadow)",
  textAlign: "center",
}

const predictionIconStyles = {
  fontSize: "48px",
  marginBottom: "20px",
  display: "block",
}

const predictionTitleStyles = {
  fontSize: "20px",
  fontWeight: "600",
  color: "var(--text-dark)",
  marginBottom: "16px",
}

const predictionDateStyles = {
  fontSize: "18px",
  fontWeight: "600",
  color: "var(--primary-pink)",
  marginBottom: "8px",
}

const predictionDaysStyles = {
  fontSize: "14px",
  color: "var(--text-light)",
  marginBottom: "20px",
}

const confidenceStyles = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
}

const confidenceLabelStyles = {
  fontSize: "14px",
  color: "var(--text-light)",
  minWidth: "80px",
}

const confidenceBarStyles = {
  flex: 1,
  height: "8px",
  background: "#E2E8F0",
  borderRadius: "4px",
  overflow: "hidden",
}

const confidenceFillStyles = {
  height: "100%",
  background: "var(--primary-pink)",
  borderRadius: "4px",
}

const confidencePercentStyles = {
  fontSize: "14px",
  fontWeight: "600",
  color: "var(--primary-pink)",
  minWidth: "40px",
}

const fertilityStatusStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}

const fertilityLabelStyles = {
  fontSize: "14px",
  color: "var(--text-light)",
}

const fertilityValueStyles = {
  fontSize: "14px",
  fontWeight: "600",
  color: "var(--text-dark)",
}

const accuracyCardStyles = {
  background: "var(--white)",
  borderRadius: "var(--border-radius-lg)",
  padding: "40px",
  boxShadow: "var(--shadow-lg)",
  marginBottom: "40px",
}

const accuracyTitleStyles = {
  fontSize: "24px",
  fontWeight: "700",
  color: "var(--text-dark)",
  marginBottom: "12px",
  textAlign: "center",
}

const accuracyDescriptionStyles = {
  fontSize: "16px",
  color: "var(--text-light)",
  textAlign: "center",
  marginBottom: "30px",
}

const accuracyTableStyles = {
  marginBottom: "30px",
}

const tableHeaderStyles = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  gap: "20px",
  padding: "16px 0",
  borderBottom: "2px solid var(--border-light)",
  marginBottom: "16px",
}

const tableHeaderCellStyles = {
  fontSize: "14px",
  fontWeight: "600",
  color: "var(--text-dark)",
  textAlign: "center",
}

const tableRowStyles = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  gap: "20px",
  padding: "12px 0",
  borderBottom: "1px solid var(--border-light)",
}

const tableCellStyles = {
  fontSize: "14px",
  color: "var(--text-dark)",
  textAlign: "center",
}

const accuracyBadgeStyles = {
  background: "var(--light-pink)",
  color: "var(--primary-pink)",
  padding: "4px 8px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "600",
}

const overallAccuracyStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
  padding: "20px",
  background: "var(--light-pink)",
  borderRadius: "var(--border-radius)",
}

const overallAccuracyLabelStyles = {
  fontSize: "18px",
  color: "var(--text-dark)",
}

const overallAccuracyValueStyles = {
  fontSize: "24px",
  fontWeight: "700",
  color: "var(--primary-pink)",
}

const tipsCardStyles = {
  background: "var(--white)",
  borderRadius: "var(--border-radius-lg)",
  padding: "40px",
  boxShadow: "var(--shadow-lg)",
}

const tipsTitleStyles = {
  fontSize: "24px",
  fontWeight: "700",
  color: "var(--text-dark)",
  marginBottom: "30px",
  textAlign: "center",
}

const tipsGridStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "30px",
}

const tipItemStyles = {
  display: "flex",
  alignItems: "flex-start",
  gap: "16px",
}

const tipIconStyles = {
  fontSize: "32px",
  marginTop: "4px",
}

const tipTitleStyles = {
  fontSize: "16px",
  fontWeight: "600",
  color: "var(--text-dark)",
  marginBottom: "8px",
}

const tipDescriptionStyles = {
  fontSize: "14px",
  color: "var(--text-light)",
  lineHeight: "1.5",
}

export default PredictionsPage
