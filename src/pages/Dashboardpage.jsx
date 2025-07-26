const DashboardPage = () => {
  return (
    <div style={dashboardStyles}>
      <div className="container">
        <div style={headerStyles}>
          <h1 style={titleStyles}>Your Dashboard</h1>
          <p style={subtitleStyles}>Welcome back! Here's your cycle overview.</p>
        </div>

        <div style={gridStyles}>
          <div className="card" style={cardStyles}>
            <h3 style={cardTitleStyles}>Next Period</h3>
            <p style={dateStyles}>March 15, 2024</p>
            <p style={daysStyles}>in 5 days</p>
          </div>

          <div className="card" style={cardStyles}>
            <h3 style={cardTitleStyles}>Cycle Day</h3>
            <p style={dateStyles}>Day 23</p>
            <p style={daysStyles}>of 28-day cycle</p>
          </div>

          <div className="card" style={cardStyles}>
            <h3 style={cardTitleStyles}>Ovulation</h3>
            <p style={dateStyles}>March 1, 2024</p>
            <p style={daysStyles}>9 days ago</p>
          </div>

          <div className="card" style={cardStyles}>
            <h3 style={cardTitleStyles}>Fertility</h3>
            <p style={dateStyles}>Low</p>
            <p style={daysStyles}>Safe period</p>
          </div>
        </div>

        <div style={sectionStyles}>
          <h2 style={sectionTitleStyles}>Quick Actions</h2>
          <div style={actionsStyles}>
            <button className="btn btn-primary">Log Symptoms</button>
            <button className="btn btn-secondary">Track Habits</button>
            <button className="btn btn-secondary">View Calendar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const dashboardStyles = {
  minHeight: "100vh",
  background: "var(--light-pink)",
  padding: "40px 0",
}

const headerStyles = {
  textAlign: "center",
  marginBottom: "40px",
}

const titleStyles = {
  fontSize: "2.5rem",
  color: "var(--accent-pink)",
  marginBottom: "10px",
}

const subtitleStyles = {
  color: "var(--text-light)",
  fontSize: "1.1rem",
}

const gridStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  marginBottom: "40px",
}

const cardStyles = {
  textAlign: "center",
  padding: "30px 20px",
}

const cardTitleStyles = {
  color: "var(--accent-pink)",
  marginBottom: "15px",
  fontSize: "1.1rem",
}

const dateStyles = {
  fontSize: "1.5rem",
  fontWeight: "600",
  color: "var(--text-dark)",
  marginBottom: "5px",
}

const daysStyles = {
  color: "var(--text-light)",
  fontSize: "0.9rem",
}

const sectionStyles = {
  textAlign: "center",
}

const sectionTitleStyles = {
  color: "var(--accent-pink)",
  marginBottom: "20px",
}

const actionsStyles = {
  display: "flex",
  gap: "15px",
  justifyContent: "center",
  flexWrap: "wrap",
}

export default DashboardPage
