"use client"

import { useState } from "react"

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("users")

  const mockUsers = [
    { id: 1, name: "Priya Sharma", email: "priya@example.com", joinDate: "2024-01-15", status: "Active" },
    { id: 2, name: "Sita Rai", email: "sita@example.com", joinDate: "2024-02-20", status: "Active" },
    { id: 3, name: "Maya Gurung", email: "maya@example.com", joinDate: "2024-03-01", status: "Inactive" },
  ]

  const mockStats = {
    totalUsers: 1247,
    activeUsers: 892,
    newUsersThisMonth: 156,
    averageCycleLength: 28.5,
  }

  return (
    <div style={adminStyles}>
      <div className="container">
        <div style={headerStyles}>
          <h1 style={titleStyles}>Admin Dashboard</h1>
          <p style={subtitleStyles}>Manage NaariCycle platform and user data</p>
        </div>

        <div style={tabsStyles}>
          <button className={`tab-btn ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>
            Users
          </button>
          <button
            className={`tab-btn ${activeTab === "analytics" ? "active" : ""}`}
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </button>
          <button
            className={`tab-btn ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </div>

        {activeTab === "users" && (
          <div style={contentStyles}>
            <h2 style={sectionTitleStyles}>User Management</h2>
            <div style={tableContainerStyles}>
              <table style={tableStyles}>
                <thead>
                  <tr style={tableHeaderStyles}>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Join Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr key={user.id} style={tableRowStyles}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.joinDate}</td>
                      <td>
                        <span
                          style={{
                            ...statusStyles,
                            background: user.status === "Active" ? "#10B981" : "#EF4444",
                          }}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-secondary" style={actionBtnStyles}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div style={contentStyles}>
            <h2 style={sectionTitleStyles}>Platform Analytics</h2>
            <div style={statsGridStyles}>
              <div className="card" style={statCardStyles}>
                <h3 style={statNumberStyles}>{mockStats.totalUsers}</h3>
                <p style={statLabelStyles}>Total Users</p>
              </div>
              <div className="card" style={statCardStyles}>
                <h3 style={statNumberStyles}>{mockStats.activeUsers}</h3>
                <p style={statLabelStyles}>Active Users</p>
              </div>
              <div className="card" style={statCardStyles}>
                <h3 style={statNumberStyles}>{mockStats.newUsersThisMonth}</h3>
                <p style={statLabelStyles}>New This Month</p>
              </div>
              <div className="card" style={statCardStyles}>
                <h3 style={statNumberStyles}>{mockStats.averageCycleLength}</h3>
                <p style={statLabelStyles}>Avg Cycle Length</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div style={contentStyles}>
            <h2 style={sectionTitleStyles}>Platform Settings</h2>
            <div className="card" style={settingsCardStyles}>
              <div style={settingItemStyles}>
                <h4>Email Notifications</h4>
                <label style={switchStyles}>
                  <input type="checkbox" defaultChecked />
                  <span style={sliderStyles}></span>
                </label>
              </div>
              <div style={settingItemStyles}>
                <h4>Data Backup</h4>
                <button className="btn btn-primary">Run Backup</button>
              </div>
              <div style={settingItemStyles}>
                <h4>System Maintenance</h4>
                <button className="btn btn-secondary">Schedule Maintenance</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const adminStyles = {
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

const tabsStyles = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "40px",
  gap: "10px",
}

const contentStyles = {
  maxWidth: "1000px",
  margin: "0 auto",
}

const sectionTitleStyles = {
  color: "var(--accent-pink)",
  marginBottom: "30px",
  textAlign: "center",
}

const tableContainerStyles = {
  background: "var(--white)",
  borderRadius: "var(--border-radius)",
  overflow: "hidden",
  boxShadow: "var(--shadow)",
}

const tableStyles = {
  width: "100%",
  borderCollapse: "collapse",
}

const tableHeaderStyles = {
  background: "var(--primary-pink)",
  color: "var(--white)",
}

const tableRowStyles = {
  borderBottom: "1px solid #E2E8F0",
}

const statusStyles = {
  padding: "4px 12px",
  borderRadius: "20px",
  color: "white",
  fontSize: "0.8rem",
  fontWeight: "500",
}

const actionBtnStyles = {
  padding: "6px 12px",
  fontSize: "0.8rem",
}

const statsGridStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
}

const statCardStyles = {
  textAlign: "center",
  padding: "30px 20px",
}

const statNumberStyles = {
  fontSize: "2.5rem",
  fontWeight: "700",
  color: "var(--accent-pink)",
  marginBottom: "10px",
}

const statLabelStyles = {
  color: "var(--text-light)",
  fontSize: "0.9rem",
}

const settingsCardStyles = {
  padding: "30px",
}

const settingItemStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 0",
  borderBottom: "1px solid #E2E8F0",
}

const switchStyles = {
  position: "relative",
  display: "inline-block",
  width: "60px",
  height: "34px",
}

const sliderStyles = {
  position: "absolute",
  cursor: "pointer",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "#ccc",
  transition: "0.4s",
  borderRadius: "34px",
}

export default AdminPage
