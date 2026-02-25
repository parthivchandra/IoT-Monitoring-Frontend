import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="logo">IoT Monitor</div>

      <div className="nav-links">
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          Dashboard
        </Link>

        <Link
          to="/alerts"
          className={location.pathname === "/alerts" ? "active" : ""}
        >
          Alerts
        </Link>

        <Link
          to="/raw"
          className={location.pathname === "/raw" ? "active" : ""}
        >
          Raw Data
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;