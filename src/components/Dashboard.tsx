import { Outlet } from "react-router-dom";
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
