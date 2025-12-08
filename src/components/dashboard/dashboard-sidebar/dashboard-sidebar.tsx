import { Link, NavLink } from "react-router-dom";
import "./dashboard-sidebar.css";

function DashboardSidebar() {
  return (
    <div className="dashboard-sidebar-container">
      <div className="dashboard-sidebar-content">
        <div className="dashboard-sidebar-title">
          <h1>
            <Link to={"/"}>Linksheet</Link>
          </h1>
        </div>
        <div className="dashboard-sidebar-menu">
          <div className="dashboard-sidebar-menu-item">
            <NavLink
              to={"/dashboard"}
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="fa-solid fa-table-columns"></i>
              <span>My Linksheet</span>
            </NavLink>
          </div>
          <div className="dashboard-sidebar-menu-item">
            <NavLink
              to={"/dashboard/appearance"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="fa-solid fa-paint-roller"></i>
              <span>Appearance</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;
