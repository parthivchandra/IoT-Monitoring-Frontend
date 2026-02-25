import { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const [latest, setLatest] = useState({});
  const [count, setCount] = useState(0);
  const [alerts, setAlerts] = useState([]);

 useEffect(() => {
  fetchData();
  const id = setInterval(fetchData, 3000); // refresh every 3s
  return () => clearInterval(id);
}, []);

  const fetchData = async () => {
    const res1 = await API.get("/latest");
    const res2 = await API.get("/count");
    const res3 = await API.get("/alerts");

    setLatest(res1.data);
    setCount(res2.data.count);
    setAlerts(Array.isArray(res3.data) ? res3.data.slice(0, 5) : []);
  };

  return (
    <div className="dashboard">
      <h1>IoT Monitoring Dashboard</h1>

      <div className="card-grid">
        <div className="card temperature">
          <h3>Temperature</h3>
          <p>{latest.data?.temperature ?? "--"} °C</p>
        </div>

        <div className="card humidity">
          <h3>Humidity</h3>
          <p>{latest.data?.humidity ?? "--"} %</p>
        </div>

        <div className="card voltage">
          <h3>Voltage</h3>
          <p>{latest.data?.voltage ?? "--"} V</p>
        </div>

        <div className="card total">
          <h3>Total Messages</h3>
          <p>{count}</p>
        </div>

        <div className="card alerts">
          <h3>Active Alerts</h3>
          <p>{alerts.length}</p>
        </div>
      </div>

      <div className="alerts-section">
        <h2>Recent Alerts</h2>
        {alerts.length === 0 ? (
          <p>No alerts triggered</p>
        ) : (
          alerts.map((alert, i) => (
            <div key={i} className="alert-item">
              <strong>{alert.topic}</strong>
              <p style={{ color: "red", fontWeight: "bold" }}>
                {(alert.violated_keys || []).join(", ")}
              </p>
              <small>{alert.timestamp}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;