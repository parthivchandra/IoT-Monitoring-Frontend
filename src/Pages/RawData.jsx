import { useEffect, useMemo, useState } from "react";
import API from "../services/api";

function RawData() {
  const [rows, setRows] = useState([]);
  const [topicFilter, setTopicFilter] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [page, setPage] = useState(0);
  const limit = 10;
  const [pageSize, setPageSize] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset pagination whenever filters change
  useEffect(() => {
    setPage(0);
  }, [topicFilter, startTime, endTime]);

  const queryString = useMemo(() => {
    const params = [];

    if (topicFilter) params.push(`topic=${encodeURIComponent(topicFilter)}`);
    if (startTime) params.push(`start=${new Date(startTime).toISOString()}`);
    if (endTime) params.push(`end=${new Date(endTime).toISOString()}`);

    params.push(`limit=${limit}`);
    params.push(`offset=${page * limit}`);

    return params.length ? `?${params.join("&")}` : "";
  }, [topicFilter, startTime, endTime, page]);

  useEffect(() => {
    let isMounted = true;

    const fetchPage = async () => {
      try {
        setError("");
        setLoading(true);

        const url = `/messages/paginated${queryString}`;
        const res = await API.get(url);

        const list = Array.isArray(res.data) ? res.data : [];
        if (!isMounted) return;

        setRows(list);
        setPageSize(list.length);
      } catch (err) {
        console.error("Raw data fetch error:", err);
        if (!isMounted) return;
        setRows([]);
        setPageSize(0);
        setError("Failed to load raw data. Make sure backend is running and data is being published.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    // Initial fetch + auto-refresh
    fetchPage();
    const id = setInterval(fetchPage, 3000);

    return () => {
      isMounted = false;
      clearInterval(id);
    };
  }, [queryString]);

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

      {error && (
        <div style={{ marginBottom: 12, color: "red", fontWeight: 600 }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: 10, color: "#666" }}>
        {loading ? "Loading…" : ""}
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
          {rows.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                {loading ? "Loading…" : "No data available"}
              </td>
            </tr>
          ) : (
            rows.map((d, i) => (
              <tr key={i}>
                <td>{d.topic ?? "--"}</td>
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
        <button
          disabled={page === 0}
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        >
          Previous
        </button>

        <span style={{ margin: "0 15px" }}>Page {page + 1}</span>

        <button
          disabled={pageSize < limit}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default RawData;