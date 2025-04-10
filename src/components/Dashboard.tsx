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
                  <div className="dashboard-body-space">
                    <NavLink
                      to={"/dashboard/space"}
                      className="dashboard-body-space-item"
                    >
                      <i className="fa-solid fa-mobile-screen"></i>{" "}
                      <span>My Space</span>
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
