import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Alerts from "./Pages/Alerts";
import RawData from "./Pages/RawData";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: "30px" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/raw" element={<RawData />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;