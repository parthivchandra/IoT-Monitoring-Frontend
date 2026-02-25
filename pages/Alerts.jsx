import { useEffect, useState } from "react";
import API from "../services/api";
import "./Alerts.css";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    API.get("/alerts").then(res => setAlerts(res.data));
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
  {alerts.map((alert, index) =>
    alert.alerts.map((param, i) => (
      <tr key={`${index}-${i}`}>
        <td>{alert.topic}</td>
        <td style={{ color: "red" }}>{param}</td>
        <td>
          {param === "High Temperature"
            ? alert.data.temperature
            : param === "High Humidity"
            ? alert.data.humidity
            : "--"}
        </td>
        <td>{alert.timestamp}</td>
      </tr>
    ))
  )}
</tbody>
      </table>
    </div>
  );
}

export default Alerts;