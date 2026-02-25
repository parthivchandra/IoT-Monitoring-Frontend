import { useEffect, useState } from "react";
import API from "../services/api";
import "./Alerts.css";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = async () => {
    try {
      const res = await API.get("/alerts");
      setAlerts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch alerts:", err);
      setAlerts([]);
    }
  };

useEffect(() => {
  fetchAlerts();
  const id = setInterval(fetchAlerts, 3000);
  return () => clearInterval(id);
}, []);

  return (
    <div>
      <h1>Alerts</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Device</th>
            <th>Parameter</th>
            <th>Value</th>
            <th>Timestamp</th>
          </tr>
        </thead>
       <tbody>
  {alerts.length === 0 ? (
    <tr>
      <td colSpan="4">No alerts yet</td>
    </tr>
  ) : (
    alerts.map((alert, index) => (
      alert.violated_keys.map((param, i) => (
        <tr key={`${index}-${i}`}>
          <td>{alert.topic}</td>
          <td style={{ color: "red", fontWeight: "bold" }}>{param}</td>
          <td>{alert.data?.[param] ?? "--"}</td>
          <td>{alert.timestamp}</td>
        </tr>
      ))
    ))
  )}
</tbody>
      </table>
    </div>
  );
}

export default Alerts;