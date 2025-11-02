# 🌸 Naaricycle – Menstrual Cycle & Fertility Tracker

**Naaricycle** is a modern web application that helps users track their menstrual cycle, ovulation, and fertile window using personalized predictions.  
This repository contains the **frontend** built with **React + Vite**, offering a clean, intuitive, and responsive interface for cycle tracking.

> 🌺 *Empowering Women’s Health — Naaricycle combines data-driven insights with a simple, elegant experience.*

---

## 🚀 Features

- ⚛️ **React + Vite** for fast, lightweight frontend performance  
- 🗓️ **Cycle Tracking** – log periods and symptoms easily  
- 🤖 **Predictive Insights** – ovulation, fertile window, and next period prediction  
- 💬 **Detailed Guidance** – health tips and reminders based on cycle data  
- 🎨 **Modern UI/UX** – Tailwind CSS styling, clean forms, and smooth animations  
- 🔔 **Notifications & Reminders** – upcoming periods and fertile days  

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend Framework** | React (Vite) |
| **Styling** | Tailwind CSS |
| **Icons** | React Icons |
| **API Communication** | Fetch / Axios |
| **Backend (Prediction)** | Flask (Python) |
| **ML Libraries (Backend)** | Scikit-learn, Pandas, NumPy |

---

## 🔗 API Integration

The frontend communicates with a Flask backend for predicting periods, ovulation, and fertile windows.

Create a `.env` file in your project root and add your backend URL:

```bash
VITE_API_URL=http://127.0.0.1:5000
```