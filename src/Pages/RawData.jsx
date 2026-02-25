import { useEffect, useState } from "react";
import API from "../services/api";

function RawData() {
  const [data, setData] = useState([]);
  const [topicFilter, setTopicFilter] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [page, setPage] = useState(0);
  const limit = 10;

  useEffect(() => {
    let url = "/messages";

    const params = [];

    if (startTime) params.push(`start=${new Date(startTime).toISOString().slice(0,19)}`);
    if (endTime) params.push(`end=${new Date(endTime).toISOString().slice(0,19)}`);

    if (params.length > 0) {
      url += "?" + params.join("&");
    }

    API.get(url)
      .then(res => {
        if (Array.isArray(res.data)) {
          setData(res.data);
          setFilteredData(res.data);
        } else {
          console.error("Unexpected response:", res.data);
          setData([]);
          setFilteredData([]);
        }
      })
      .catch(err => {
        console.error("API error:", err);
        setData([]);
        setFilteredData([]);
      });
  }, [startTime, endTime, page]);

  useEffect(() => {
    let temp = data;

    if (topicFilter) {
      temp = temp.filter(item =>
        item.topic?.toLowerCase().includes(topicFilter.toLowerCase())
      );
    }

    setFilteredData(temp);
  }, [topicFilter, data]);

  return (
    <div>
      <h1>Raw Sensor Data</h1>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Filter by topic..."
          value={topicFilter}
          onChange={(e) => setTopicFilter(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Start Time: </label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label style={{ marginLeft: "15px" }}>End Time: </label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Voltage</th>
            <th>Current</th>
            <th>Pressure</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                No data available
              </td>
            </tr>
          ) : (
            filteredData.map((d, i) => (
              <tr key={i}>
                <td>{d.topic}</td>
                <td>{d.data?.temperature ?? "--"}</td>
                <td>{d.data?.humidity ?? "--"}</td>
                <td>{d.data?.voltage ?? "--"}</td>
                <td>{d.data?.current ?? "--"}</td>
                <td>{d.data?.pressure ?? "--"}</td>
                <td>{d.timestamp ?? "--"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage(prev => Math.max(prev - 1, 0))}>
          Previous
        </button>

        <span style={{ margin: "0 15px" }}>
          Page {page + 1}
        </span>

        <button onClick={() => setPage(prev => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default RawData;