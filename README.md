# 🌐 IoT Monitoring Frontend

## 📌 Overview

This frontend application is built using **React.js** and provides a real-time dashboard for monitoring IoT sensor data.  
It connects to the FastAPI backend to fetch sensor readings, alert information, and historical data.

The interface is designed to be clean, responsive, and user-friendly for both desktop and tablet views.

---

## ⚙️ Tech Stack

- **React.js** – Frontend framework
- **Axios** – API communication
- **React Router** – Client-side routing
- **Vite** – Fast development build tool
- **CSS** – Responsive UI styling

---

## 📊 Features

### 🏠 Dashboard
- Displays latest sensor readings
- Shows total messages received
- Displays active and recent alerts
- Auto-refreshes every few seconds for real-time updates

### 🚨 Alerts Page
- Lists all triggered alerts
- Shows topic/device identifier
- Displays violated parameters
- Shows timestamp and actual sensor values
- Highlights alert information clearly

### 📑 Raw Data Page
- Displays paginated historical sensor data
- Supports filtering by topic
- Supports filtering by time range
- Auto-refresh enabled

---

## 🔌 Backend Integration

The frontend connects to the FastAPI backend running at:

```
http://localhost:8000
```

Ensure the backend and Docker services are running before starting the frontend.

---

## ▶️ Running the Application

From the frontend directory:

```bash
npm install
npm run dev
```

Application will be available at:

```
http://localhost:5173
```

---

## 🏗 Architecture Highlights

- Component-based design
- Clean state management using React Hooks
- REST API integration using Axios
- Responsive layout with navigation bar
- Modular page structure (Dashboard, Alerts, Raw Data)

---

## 👨‍💻 Author

Parthiv Chandra