"use client"

import { useState } from "react"

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} style={emptyDayStyles}></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate === day
      const isPeriodDay = [5, 6, 7, 8, 9].includes(day) // Mock period days
      const isOvulationDay = day === 14 // Mock ovulation day

      days.push(
        <div
          key={day}
          style={{
            ...dayStyles,
            ...(isSelected ? selectedDayStyles : {}),
            ...(isPeriodDay ? periodDayStyles : {}),
            ...(isOvulationDay ? ovulationDayStyles : {}),
          }}
          onClick={() => setSelectedDate(day)}
        >
          {day}
        </div>,
      )
    }

    return days
  }

  return (
    <div style={calendarContainerStyles}>
      <div style={calendarHeaderStyles}>
        <button onClick={() => navigateMonth(-1)} style={navButtonStyles}>
          ←
        </button>
        <h3 style={monthTitleStyles}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button onClick={() => navigateMonth(1)} style={navButtonStyles}>
          →
        </button>
      </div>

      <div style={weekdaysStyles}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} style={weekdayStyles}>
            {day}
          </div>
        ))}
      </div>

      <div style={calendarGridStyles}>{renderCalendarDays()}</div>

      <div style={legendStyles}>
        <div style={legendItemStyles}>
          <div style={{ ...legendColorStyles, background: "var(--accent-pink)" }}></div>
          <span>Period</span>
        </div>
        <div style={legendItemStyles}>
          <div style={{ ...legendColorStyles, background: "var(--secondary-pink)" }}></div>
          <span>Ovulation</span>
        </div>
      </div>
    </div>
  )
}

const calendarContainerStyles = {
  background: "var(--white)",
  borderRadius: "var(--border-radius)",
  padding: "20px",
  boxShadow: "var(--shadow)",
}

const calendarHeaderStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
}

const navButtonStyles = {
  background: "var(--primary-pink)",
  color: "var(--white)",
  border: "none",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  cursor: "pointer",
  fontSize: "1.2rem",
}

const monthTitleStyles = {
  color: "var(--accent-pink)",
  fontSize: "1.3rem",
  fontWeight: "600",
}

const weekdaysStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "5px",
  marginBottom: "10px",
}

const weekdayStyles = {
  textAlign: "center",
  fontWeight: "600",
  color: "var(--text-light)",
  padding: "10px",
}

const calendarGridStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "5px",
  marginBottom: "20px",
}

const dayStyles = {
  textAlign: "center",
  padding: "12px",
  cursor: "pointer",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  minHeight: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

const emptyDayStyles = {
  minHeight: "40px",
}

const selectedDayStyles = {
  background: "var(--primary-pink)",
  color: "var(--white)",
}

const periodDayStyles = {
  background: "var(--accent-pink)",
  color: "var(--white)",
}

const ovulationDayStyles = {
  background: "var(--secondary-pink)",
  color: "var(--white)",
}

const legendStyles = {
  display: "flex",
  gap: "20px",
  justifyContent: "center",
}

const legendItemStyles = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
}

const legendColorStyles = {
  width: "16px",
  height: "16px",
  borderRadius: "50%",
}

export default Calendar
