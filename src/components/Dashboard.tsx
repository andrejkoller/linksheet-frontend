import { NavLink, Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <div className="dashboard-container">
          <div className="dashboard-content">
            <div className="dashboard-sidebar">
              <DashboardSidebar />
            </div>
            <div className="dashboard-header-body-wrapper">
              <div className="dashboard-header">
                <DashboardHeader />
              </div>
              <div className="dashboard-body">
                <Outlet />
                <div className="dashboard-body-space-container">
                  <div className="dashboard-body-space-link-items">
                    <div className="dashboard-body-space-link-notification">
                      <span>No links yet. Create a few!</span>
                    </div>
                  </div>
                  <div className="dashboard-body-space-link">
                    <NavLink
                      to={"/dashboard/space"}
                      className="dashboard-body-space-link-item"
                    >
                      <span>Visit your space</span>
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
